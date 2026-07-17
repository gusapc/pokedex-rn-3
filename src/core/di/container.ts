import { createPokemonRepository } from '../../data/repositories/PokemonRepositoryImpl';
import { createFavoritesRepository } from '../../data/repositories/FavoritesRepositoryImpl';
import { GetPokemonPage, makeGetPokemonPage } from '../../domain/usecases/GetPokemonPage';
import { GetPokemonDetail, makeGetPokemonDetail } from '../../domain/usecases/GetPokemonDetail';
import { GetPokemonByRegion, makeGetPokemonByRegion } from '../../domain/usecases/GetPokemonByRegion';
import { GetFavorites, makeGetFavorites, makeToggleFavorite, ToggleFavorite } from '../../domain/usecases/Favorites';

export interface AppContainer {
    getPokemonPage: GetPokemonPage;
    getPokemonDetail: GetPokemonDetail;
    getPokemonByRegion: GetPokemonByRegion;
    getFavorites: GetFavorites;
    toggleFavorite: ToggleFavorite;
}

const createAppContainer = (): AppContainer => {
    const pokemonRepository = createPokemonRepository();
    const favoritesRepository = createFavoritesRepository();

    return {
        getPokemonPage: makeGetPokemonPage(pokemonRepository),
        getPokemonDetail: makeGetPokemonDetail(pokemonRepository),
        getPokemonByRegion: makeGetPokemonByRegion(pokemonRepository),
        getFavorites: makeGetFavorites(favoritesRepository),
        toggleFavorite: makeToggleFavorite(favoritesRepository),
    };
};

let container: AppContainer | null = null;

export const getContainer = (): AppContainer => {
    if (container === null) container = createAppContainer();
    return container;
};

// Solo para tests: permite inyectar un container con mocks
export const setContainer = (custom: AppContainer): void => {
    container = custom;
};