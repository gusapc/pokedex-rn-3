import { Pokemon } from '../entities/Pokemon';

export interface FavoritesRepository {
    getFavorites(): Promise<Pokemon[]>;
    toggleFavorite(pokemon: Pokemon): Promise<Pokemon[]>;
}