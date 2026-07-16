import { createPokemonRepository } from '../../data/repositories/PokemonRepositoryImpl';
import { GetPokemonPage, makeGetPokemonPage } from '../../domain/usecases/GetPokemonPage';
import { GetPokemonDetail, makeGetPokemonDetail } from '../../domain/usecases/GetPokemonDetail';
import { GetPokemonByRegion, makeGetPokemonByRegion } from '../../domain/usecases/GetPokemonByRegion';

export interface AppContainer {
    getPokemonPage: GetPokemonPage;
    getPokemonDetail: GetPokemonDetail;
    getPokemonByRegion: GetPokemonByRegion;
}

const createAppContainer = (): AppContainer => {
    const pokemonRepository = createPokemonRepository();

    return {
        getPokemonPage: makeGetPokemonPage(pokemonRepository),
        getPokemonDetail: makeGetPokemonDetail(pokemonRepository),
        getPokemonByRegion: makeGetPokemonByRegion(pokemonRepository),
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