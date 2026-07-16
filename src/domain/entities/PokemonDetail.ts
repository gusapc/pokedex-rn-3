export enum PokemonType {
    Normal = 'normal',
    Fire = 'fire',
    Water = 'water',
    Electric = 'electric',
    Grass = 'grass',
    Ice = 'ice',
    Fighting = 'fighting',
    Poison = 'poison',
    Ground = 'ground',
    Flying = 'flying',
    Psychic = 'psychic',
    Bug = 'bug',
    Rock = 'rock',
    Ghost = 'ghost',
    Dragon = 'dragon',
    Dark = 'dark',
    Steel = 'steel',
    Fairy = 'fairy',
    Unknown = 'unknown',
}

export interface PokemonStat {
    name: string;
    value: number;
}

export interface PokemonAbility {
    name: string;
    isHidden: boolean;
}

export interface PokemonDetail {
    id: string;
    name: string;
    imageUrl: string;
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
    weightKg: number;
    heightM: number;
    baseExperience: number;
}