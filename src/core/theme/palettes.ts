export enum ThemeName {
    Pokeball = 'pokeball', // modo claro
    Ultraball = 'ultraball', // modo oscuro
}

export interface ThemePalette {
    primary: string;
    onPrimary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    divider: string;
    accent: string;
    danger: string;
}

export const PALETTES: Record<ThemeName, ThemePalette> = {
    [ThemeName.Pokeball]: {
        primary: '#EB3F3F',
        onPrimary: '#FFFFFF',
        background: '#F2F2F2',
        surface: '#FFFFFF',
        text: '#364350',
        textMuted: '#5C6C7C',
        divider: '#E0E0E0',
        accent: '#1E88E5',
        danger: '#F44336',
    },
    [ThemeName.Ultraball]: {
        primary: '#F5C93F',
        onPrimary: '#16181D',
        background: '#121417',
        surface: '#1C1F24',
        text: '#ECEFF3',
        textMuted: '#9AA5B1',
        divider: '#2A2F36',
        accent: '#F5C93F',
        danger: '#FF6B6B',
    },
};