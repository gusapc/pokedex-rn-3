export const FONT_SIZES = {
    huge: 28,
    title: 22,
    subtitle: 18,
    body: 15,
    label: 12,
} as const;

export type FontSize = keyof typeof FONT_SIZES;

export const TEXT_SCALES = {
    normal: 1,
    large: 1.15,
    xlarge: 1.3,
} as const;

export type TextScale = keyof typeof TEXT_SCALES;