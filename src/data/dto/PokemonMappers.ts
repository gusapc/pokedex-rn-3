import { Pokemon } from 'pokedex-rn-3/src/domain/entities/Pokemon';
import { PokeListItemDTO } from 'pokedex-rn-3/src/data/dto/PokemonDTO';

export const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export const spriteUrlFor = (id: string): string => `${SPRITE_URL}/${id}.png`;

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

// La API no regresa el id en el listado: se extrae de la url (…/pokemon/25/)
export const idFromUrl = (url: string): string => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
};

export const toPokemon = (dto: PokeListItemDTO): Pokemon => {
    const id = idFromUrl(dto.url);
    return {
        id,
        name: capitalize(dto.name),
        imageUrl: spriteUrlFor(id),
    };
};