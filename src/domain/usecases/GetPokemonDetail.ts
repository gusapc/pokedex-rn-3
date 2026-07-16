import { PokemonDetail } from '../entities/PokemonDetail';
import { PokemonRepository } from '../repositories/PokemonRepository';

export type GetPokemonDetail = (id: string) => Promise<PokemonDetail>;

export const makeGetPokemonDetail =
    (repository: PokemonRepository): GetPokemonDetail =>
        async (id) =>
            repository.getDetail(id);