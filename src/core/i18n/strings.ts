import { AppErrorCode } from '../errors/AppError';
import { Region } from '../../domain/entities/Region';
import { ThemeName } from '../theme/palettes';
import { TextScale } from '../theme/typography';

export enum Language {
    Es = 'es',
    En = 'en',
}

export const es = {
    tabs: { home: 'Pokedex', favorites: 'Favoritos', settings: 'Ajustes' },
    common: { retry: 'Reintentar' },
    errors: {
        [AppErrorCode.Network]: 'Sin conexión, revisa tu internet',
        [AppErrorCode.Timeout]: 'La red tardó demasiado, intenta de nuevo',
        [AppErrorCode.Server]: 'El servidor no respondió bien, intenta más tarde',
        [AppErrorCode.NotFound]: 'No encontramos lo que buscabas',
        [AppErrorCode.Validation]: 'Revisa los datos ingresados',
        [AppErrorCode.Unknown]: 'Algo salió mal, intenta más tarde',
    } as Record<AppErrorCode, string>,
    regions: {
        [Region.National]: 'Nacional',
        [Region.Kanto]: 'Kanto',
        [Region.Johto]: 'Johto',
        [Region.Hoenn]: 'Hoenn',
        [Region.Sinnoh]: 'Sinnoh',
        [Region.Unova]: 'Unova',
        [Region.Kalos]: 'Kalos',
        [Region.Alola]: 'Alola',
        [Region.Galar]: 'Galar',
        [Region.Paldea]: 'Paldea',
    } as Record<Region, string>,
    home: { title: 'Pokedex', empty: 'No hay pokémon para mostrar' },
    favorites: { title: 'Favoritos', empty: 'Aún no tienes favoritos: márcalos con la estrella en el detalle' },
    detail: {
        abilities: 'Habilidades',
        hidden: 'Oculta',
        stats: 'Estadísticas',
        weight: 'Peso',
        height: 'Altura',
        baseExp: 'Exp. base',
    },
    settings: {
        title: 'Ajustes',
        theme: 'Tema',
        language: 'Idioma',
        textSize: 'Tamaño de texto',
        themes: {
            [ThemeName.Pokeball]: 'Pokébola · claro',
            [ThemeName.Ultraball]: 'Ultra Ball · oscuro',
        } as Record<ThemeName, string>,
        languages: { [Language.Es]: 'Español', [Language.En]: 'English' } as Record<Language, string>,
        textScales: { normal: 'Normal', large: 'Grande', xlarge: 'Extra grande' } as Record<TextScale, string>,
    },
};

export type Strings = typeof es;

export const en: Strings = {
    tabs: { home: 'Pokedex', favorites: 'Favorites', settings: 'Settings' },
    common: { retry: 'Retry' },
    errors: {
        [AppErrorCode.Network]: 'No connection, check your internet',
        [AppErrorCode.Timeout]: 'The network took too long, try again',
        [AppErrorCode.Server]: 'The server had a problem, try later',
        [AppErrorCode.NotFound]: 'We could not find that',
        [AppErrorCode.Validation]: 'Check the data you entered',
        [AppErrorCode.Unknown]: 'Something went wrong, try later',
    } as Record<AppErrorCode, string>,
    regions: {
        [Region.National]: 'National',
        [Region.Kanto]: 'Kanto',
        [Region.Johto]: 'Johto',
        [Region.Hoenn]: 'Hoenn',
        [Region.Sinnoh]: 'Sinnoh',
        [Region.Unova]: 'Unova',
        [Region.Kalos]: 'Kalos',
        [Region.Alola]: 'Alola',
        [Region.Galar]: 'Galar',
        [Region.Paldea]: 'Paldea',
    } as Record<Region, string>,
    home: { title: 'Pokedex', empty: 'No pokémon to show' },
    favorites: { title: 'Favorites', empty: 'No favorites yet: mark them with the star in the detail' },
    detail: {
        abilities: 'Abilities',
        hidden: 'Hidden',
        stats: 'Stats',
        weight: 'Weight',
        height: 'Height',
        baseExp: 'Base exp.',
    },
    settings: {
        title: 'Settings',
        theme: 'Theme',
        language: 'Language',
        textSize: 'Text size',
        themes: {
            [ThemeName.Pokeball]: 'Poké Ball · light',
            [ThemeName.Ultraball]: 'Ultra Ball · dark',
        } as Record<ThemeName, string>,
        languages: { [Language.Es]: 'Español', [Language.En]: 'English' } as Record<Language, string>,
        textScales: { normal: 'Normal', large: 'Large', xlarge: 'Extra large' } as Record<TextScale, string>,
    },
};