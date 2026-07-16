import { httpGet } from './HttpClient';
import { PokedexResponseDTO, PokeListResponseDTO, PokemonResponseDTO } from '../dto/PokemonDTO';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonPage = (offset: number, limit: number): Promise<PokeListResponseDTO> =>
    httpGet<PokeListResponseDTO>(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

export const fetchPokemon = (id: string): Promise<PokemonResponseDTO> =>
    httpGet<PokemonResponseDTO>(`${BASE_URL}/pokemon/${id}`);

export const fetchPokedex = (pokedexId: number): Promise<PokedexResponseDTO> =>
    httpGet<PokedexResponseDTO>(`${BASE_URL}/pokedex/${pokedexId}`);