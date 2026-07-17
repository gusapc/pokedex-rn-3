export enum Region {
    National = 'national',
    Kanto = 'kanto',
    Johto = 'johto',
    Hoenn = 'hoenn',
    Sinnoh = 'sinnoh',
    Unova = 'unova',
    Kalos = 'kalos',
    Alola = 'alola',
    Galar = 'galar',
    Paldea = 'paldea',
}

// Id del pokedex por región en PokéAPI (https://pokeapi.co/api/v2/pokedex)
export const REGION_POKEDEX_ID: Record<Region, number | null> = {
    [Region.National]: null,
    [Region.Kanto]: 2,
    [Region.Johto]: 3,
    [Region.Hoenn]: 4,
    [Region.Sinnoh]: 5,
    [Region.Unova]: 8,
    [Region.Kalos]: 12,
    [Region.Alola]: 16,
    [Region.Galar]: 27,
    [Region.Paldea]: 31,
};