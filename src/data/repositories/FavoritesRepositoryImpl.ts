import { Pokemon } from '../../domain/entities/Pokemon';
import { FavoritesRepository } from '../../domain/repositories/FavoritesRepository';
import { readFromStore, writeToStore } from '../local/LocalStore';

const FAVORITES_KEY = '@pokedex/favorites';

type FavoritesRecord = Record<string, Pokemon>;

const sortById = (favorites: Pokemon[]): Pokemon[] =>
    [...favorites].sort((a, b) => Number(a.id) - Number(b.id));

export const createFavoritesRepository = (): FavoritesRepository => {
    const read = async (): Promise<FavoritesRecord> => (await readFromStore<FavoritesRecord>(FAVORITES_KEY)) ?? {};

    return {
        getFavorites: async () => sortById(Object.values(await read())),

        toggleFavorite: async (pokemon) => {
            const record = await read();
            if (record[pokemon.id]) {
                delete record[pokemon.id];
            } else {
                record[pokemon.id] = pokemon;
            }
            await writeToStore(FAVORITES_KEY, record);
            return sortById(Object.values(record));
        },
    };
};