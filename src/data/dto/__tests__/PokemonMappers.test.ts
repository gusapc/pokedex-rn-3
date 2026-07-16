import { idFromUrl, toPokemon, toPokemonDetail } from '../PokemonMappers';
import { PokemonType } from '../../../domain/entities/PokemonDetail';
import { PokemonResponseDTO } from '../PokemonDTO';

describe('PokemonMappers', () => {
    it('extrae el id desde la url del recurso', () => {
        expect(idFromUrl('https://pokeapi.co/api/v2/pokemon-species/25/')).toBe('25');
    });

    it('mapea item de lista a entidad con sprite y nombre capitalizado', () => {
        const pokemon = toPokemon({ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' });
        expect(pokemon).toEqual({
            id: '25',
            name: 'Pikachu',
            imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        });
    });

    it('convierte unidades y degrada tipos desconocidos', () => {
        const dto: PokemonResponseDTO = {
            id: 25,
            name: 'pikachu',
            weight: 60,
            height: 4,
            base_experience: null,
            types: [{ slot: 1, type: { name: 'electric' } }, { slot: 2, type: { name: 'plasma' } }],
            abilities: [{ is_hidden: false, ability: { name: 'static' } }],
            stats: [{ base_stat: 35, stat: { name: 'hp' } }],
        };
        const detail = toPokemonDetail(dto);
        expect(detail.weightKg).toBe(6);
        expect(detail.heightM).toBe(0.4);
        expect(detail.baseExperience).toBe(0);
        expect(detail.types).toEqual([PokemonType.Electric, PokemonType.Unknown]);
    });
});