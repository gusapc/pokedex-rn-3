import { Pokemon, PokemonPage } from '../entities/Pokemon';
import { PokemonDetail } from '../entities/PokemonDetail';
import { Region } from '../entities/Region';

export interface PokemonRepository {
    getPage(offset: number, limit: number): Promise<PokemonPage>;
    getDetail(id: string): Promise<PokemonDetail>;
    getByRegion(region: Region): Promise<Pokemon[]>;
}