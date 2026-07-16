import { PokemonPage } from 'pokedex-rn-3/src/domain/entities/Pokemon';
import { PokemonRepository } from 'pokedex-rn-3/src/domain/repositories/PokemonRepository';

export const PAGE_SIZE = 20;

export type GetPokemonPage = (offset?: number) => Promise<PokemonPage>;

//recibe la dependencia y regresa el caso de uso listo para usar
export const makeGetPokemonPage =
    (repository: PokemonRepository): GetPokemonPage =>
        async (offset = 0) =>
            repository.getPage(offset, PAGE_SIZE);