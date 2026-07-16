import { createPokemonRepository } from 'pokedex-rn-3/src/data/repositories/PokemonRepositoryImpl';
import { GetPokemonPage, makeGetPokemonPage } from 'pokedex-rn-3/src/domain/usecases/GetPokemonPage';

export interface AppContainer {
    getPokemonPage: GetPokemonPage;
}

const createAppContainer = (): AppContainer => {
    const pokemonRepository = createPokemonRepository();

    return {
        getPokemonPage: makeGetPokemonPage(pokemonRepository),
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