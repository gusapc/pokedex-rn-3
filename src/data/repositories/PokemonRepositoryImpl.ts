import { AppErrorCode, createAppError, toAppError } from '../../core/errors/AppError';
import { REGION_POKEDEX_ID } from '../../domain/entities/Region';
import { PokemonRepository } from '../../domain/repositories/PokemonRepository';
import { fetchPokedex, fetchPokemon, fetchPokemonPage } from '../api/PokeApiDataSource';
import { readFromStore, writeToStore } from '../local/LocalStore';
import { toPokemon, toPokemonDetail } from '../dto/PokemonMappers';

interface Cached<T> {
    savedAt: number;
    data: T;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const createPokemonRepository = (): PokemonRepository => {
    const cacheFirst = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
        const cached = await readFromStore<Cached<T>>(key);
        const isFresh = cached !== null && Date.now() - cached.savedAt < DAY_MS;
        if (cached && isFresh) return cached.data;
        try {
            const data = await fetcher();
            await writeToStore<Cached<T>>(key, { savedAt: Date.now(), data });
            return data;
        } catch (error) {
            if (cached) return cached.data;
            throw toAppError(error);
        }
    };

    return {
        getPage: (offset, limit) =>
            cacheFirst(`@pokedex/list/${offset}-${limit}`, async () => {
                const dto = await fetchPokemonPage(offset, limit);
                const items = dto.results.map(toPokemon);
                const nextOffset = offset + limit < dto.count ? offset + limit : null;
                return { items, nextOffset };
            }),

        getDetail: (id) =>
            cacheFirst(`@pokedex/detail/${id}`, async () => toPokemonDetail(await fetchPokemon(id))),

        getByRegion: async (region) => {
            const pokedexId = REGION_POKEDEX_ID[region];
            if (pokedexId === null) throw createAppError(AppErrorCode.Validation, 'region_sin_pokedex');
            return cacheFirst(`@pokedex/region/${region}`, async () => {
                const dto = await fetchPokedex(pokedexId);
                return dto.pokemon_entries.map((entry) => toPokemon(entry.pokemon_species));
            });
        },
    };
};