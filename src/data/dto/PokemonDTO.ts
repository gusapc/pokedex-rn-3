export interface PokeListItemDTO {
    name: string;
    url: string;
}

export interface PokeListResponseDTO {
    count: number;
    results: PokeListItemDTO[];
}

export interface PokemonResponseDTO {
    id: number;
    name: string;
    weight: number;
    height: number;
    base_experience: number | null;
    types: { slot: number; type: { name: string } }[];
    abilities: { is_hidden: boolean; ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
}

export interface PokedexEntryDTO {
    entry_number: number;
    pokemon_species: PokeListItemDTO;
}

export interface PokedexResponseDTO {
    pokemon_entries: PokedexEntryDTO[];
}