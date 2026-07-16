import { PALETTES, ThemeName, ThemePalette } from './palettes';
import { useSettingsStore } from '../stores/useSettingsStore';

interface ThemeValue {
    themeName: ThemeName;
    palette: ThemePalette;
    setThemeName: (name: ThemeName) => void;
}


export const useTheme = (): ThemeValue => {
    const themeName = useSettingsStore((state) => state.themeName);
    const setThemeName = useSettingsStore((state) => state.setThemeName);
    return { themeName, palette: PALETTES[themeName], setThemeName };
};