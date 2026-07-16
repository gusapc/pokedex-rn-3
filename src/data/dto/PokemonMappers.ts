import { Pokemon } from '../../domain/entities/Pokemon';
import {
    PokemonAbility,
    PokemonDetail,
    PokemonStat,
    PokemonType,
} from '../../domain/entities/PokemonDetail';
import { PokeListItemDTO, PokemonResponseDTO } from './PokemonDTO';

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

const toPokemonType = (name: string): PokemonType =>
    (Object.values(PokemonType) as string[]).includes(name) ? (name as PokemonType) : PokemonType.Unknown;

export const toPokemonDetail = (dto: PokemonResponseDTO): PokemonDetail => {
    const stats: PokemonStat[] = dto.stats.map((item) => ({
        name: item.stat.name,
        value: item.base_stat,
    }));
    const abilities: PokemonAbility[] = dto.abilities.map((item) => ({
        name: capitalize(item.ability.name),
        isHidden: item.is_hidden,
    }));
    return {
        id: String(dto.id),
        name: capitalize(dto.name),
        imageUrl: spriteUrlFor(String(dto.id)),
        types: dto.types.sort((a, b) => a.slot - b.slot).map((item) => toPokemonType(item.type.name)),
        abilities,
        stats,
        weightKg: dto.weight / 10,
        heightM: dto.height / 10,
        baseExperience: dto.base_experience ?? 0,
    };
};