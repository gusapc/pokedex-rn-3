import { httpGet } from 'pokedex-rn-3/src/data/api/HttpClient';
import { PokeListResponseDTO } from 'pokedex-rn-3/src/data/dto/PokemonDTO';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonPage = (offset: number, limit: number): Promise<PokeListResponseDTO> =>
    httpGet<PokeListResponseDTO>(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);