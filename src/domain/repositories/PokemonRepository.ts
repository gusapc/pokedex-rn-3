import { PokemonPage } from 'pokedex-rn-3/src/domain/entities/Pokemon';

export interface PokemonRepository {
    getPage(offset: number, limit: number): Promise<PokemonPage>;
}