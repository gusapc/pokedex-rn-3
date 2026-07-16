import { Pokemon } from '../entities/Pokemon';
import { Region } from '../entities/Region';
import { PokemonRepository } from '../repositories/PokemonRepository';

export type GetPokemonByRegion = (region: Region) => Promise<Pokemon[]>;

export const makeGetPokemonByRegion =
    (repository: PokemonRepository): GetPokemonByRegion =>
        async (region) =>
            repository.getByRegion(region);