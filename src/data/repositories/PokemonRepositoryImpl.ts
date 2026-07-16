import { toAppError } from 'pokedex-rn-3/src/core/errors/AppError';
import { PokemonRepository } from 'pokedex-rn-3/src/domain/repositories/PokemonRepository';
import { fetchPokemonPage } from 'pokedex-rn-3/src/data/api/PokeApiDataSource';
import { readFromStore, writeToStore } from 'pokedex-rn-3/src/data/local/LocalStore';
import { toPokemon } from 'pokedex-rn-3/src/data/dto/PokemonMappers';

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
    };
};