import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeName } from '../theme/palettes';
import { Language } from '../i18n/strings';
import { TextScale } from '../theme/typography';

interface SettingsState {
    themeName: ThemeName;
    language: Language;
    textScale: TextScale;
    setThemeName: (themeName: ThemeName) => void;
    setLanguage: (language: Language) => void;
    setTextScale: (textScale: TextScale) => void;
}


export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            themeName: ThemeName.Pokeball,
            language: Language.Es,
            textScale: 'normal',
            setThemeName: (themeName) => set({ themeName }),
            setLanguage: (language) => set({ language }),
            setTextScale: (textScale) => set({ textScale }),
        }),
        {
            name: '@pokedex/settings',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);