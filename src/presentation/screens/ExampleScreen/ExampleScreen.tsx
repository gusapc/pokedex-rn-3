import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Region } from '../../../domain/entities/Region';
import { toAppError } from '../../../core/errors/AppError';
import { getContainer } from '../../../core/di/container';
import { ThemeName } from '../../../core/theme/palettes';
import { Language } from '../../../core/i18n/strings';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import styles from './ExampleScreenStyle';

const MAX_PAYLOAD_CHARS = 4000;

interface LabResult {
    label: string;
    ms: number;
    payload: string;
}

interface LabProbe {
    label: string;
    request: () => Promise<unknown>;
}

const probes: LabProbe[] = [
    { label: 'getPokemonPage(0)', request: () => getContainer().getPokemonPage(0) },
    { label: 'getPokemonPage(20)', request: () => getContainer().getPokemonPage(20) },
    { label: 'getPokemonDetail(25)', request: () => getContainer().getPokemonDetail('25') },
    { label: 'getPokemonByRegion(Kanto)', request: () => getContainer().getPokemonByRegion(Region.Kanto) },
];

export default function ExampleScreen() {
    const insets = useSafeAreaInsets();
    const { themeName, palette, setThemeName } = useTheme();
    const { language, strings, setLanguage } = useStrings();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<LabResult | null>(null);

    const toggleTheme = () =>
        setThemeName(themeName === ThemeName.Pokeball ? ThemeName.Ultraball : ThemeName.Pokeball);

    const toggleLanguage = () => setLanguage(language === Language.Es ? Language.En : Language.Es);

    const probe = async ({ label, request }: LabProbe) => {
        if (isLoading) return;
        setIsLoading(true);
        const startedAt = Date.now();
        try {
            const data = await request();
            setResult({
                label,
                ms: Date.now() - startedAt,
                payload: JSON.stringify(data, null, 2).slice(0, MAX_PAYLOAD_CHARS),
            });
        } catch (error) {
            const appError = toAppError(error);
            setResult({
                label,
                ms: Date.now() - startedAt,
                payload: `ERROR ${appError.code}: ${appError.message}`,
            });
        }
        setIsLoading(false);
    };


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: insets.top + 8, padding: 16 }}>
            <Text style={styles.title}>ExampleScreen</Text>
            <Text style={styles.subtitle}>pokedex-rn-3 · pruebas de api y componentes</Text>
            {probes.map((item) => (
                <Pressable key={item.label} style={styles.btn} onPress={() => probe(item)}>
                    <Text style={styles.btnText}>▶ {item.label}</Text>
                </Pressable>
            ))}
            {isLoading && <Text style={styles.meta}>cargando…</Text>}
            {result && (
                <View>
                    <Text style={styles.meta}>
                        {result.label} · {result.ms} ms
                    </Text>
                    <Text selectable style={styles.json}>
                        {result.payload}
                    </Text>
                </View>
            )}

            <Text style={[styles.title, styles.panelTitle]}>Ajustes </Text>
            <Pressable style={styles.btn} onPress={toggleTheme}>
                <Text style={styles.btnText}>◐ tema: {strings.settings.themes[themeName]}</Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={toggleLanguage}>
                <Text style={styles.btnText}>⇄ idioma: {strings.settings.languages[language]}</Text>
            </Pressable>
            <View style={[styles.themeCard, { backgroundColor: palette.background }]}>
                <Text style={{ color: palette.text, fontWeight: 'bold' }}>
                    {strings.tabs.home} · {strings.tabs.favorites} · {strings.tabs.settings}
                </Text>
                <Text style={{ color: palette.textMuted, fontSize: 12 }}>{strings.favorites.empty}</Text>
                <View style={[styles.themeChip, { backgroundColor: palette.primary }]}>
                    <Text style={{ color: palette.onPrimary, fontWeight: 'bold', fontSize: 12 }}>primary / onPrimary</Text>
                </View>
            </View>
        </ScrollView>
    );
}