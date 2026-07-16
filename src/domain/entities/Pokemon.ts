export interface Pokemon {
    id: string;
    name: string;
    imageUrl: string;
}

export interface PokemonPage {
    items: Pokemon[];
    nextOffset: number | null;
}

