import { Pokemon } from '../entities/Pokemon';
import { FavoritesRepository } from '../repositories/FavoritesRepository';

export type GetFavorites = () => Promise<Pokemon[]>;
export type ToggleFavorite = (pokemon: Pokemon) => Promise<Pokemon[]>;

export const makeGetFavorites =
    (repository: FavoritesRepository): GetFavorites =>
        async () =>
            repository.getFavorites();

export const makeToggleFavorite =
    (repository: FavoritesRepository): ToggleFavorite =>
        async (pokemon) =>
            repository.toggleFavorite(pokemon);