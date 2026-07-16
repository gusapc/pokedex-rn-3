import { en, es, Language, Strings } from './strings';
import { useSettingsStore } from '../stores/useSettingsStore';

const CATALOG: Record<Language, Strings> = { [Language.Es]: es, [Language.En]: en };

interface I18nValue {
    language: Language;
    strings: Strings;
    setLanguage: (language: Language) => void;
}


export const useStrings = (): I18nValue => {
    const language = useSettingsStore((state) => state.language);
    const setLanguage = useSettingsStore((state) => state.setLanguage);
    return { language, strings: CATALOG[language], setLanguage };
};