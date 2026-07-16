export interface PokeListItemDTO {
    name: string;
    url: string;
}

export interface PokeListResponseDTO {
    count: number;
    results: PokeListItemDTO[];
}