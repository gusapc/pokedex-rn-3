import { FONT_SIZES, FontSize, TEXT_SCALES, TextScale } from './typography';
import { useSettingsStore } from '../stores/useSettingsStore';

interface TypographyValue {
    textScale: TextScale;
    setTextScale: (scale: TextScale) => void;
    scaledSize: (size: FontSize) => number;
}


export const useTypography = (): TypographyValue => {
    const textScale = useSettingsStore((state) => state.textScale);
    const setTextScale = useSettingsStore((state) => state.setTextScale);
    return {
        textScale,
        setTextScale,
        scaledSize: (size) => Math.round(FONT_SIZES[size] * TEXT_SCALES[textScale]),
    };
};