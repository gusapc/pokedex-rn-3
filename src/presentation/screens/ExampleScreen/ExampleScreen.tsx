import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Region } from '../../../domain/entities/Region';
import { AppErrorCode, createAppError, toAppError } from '../../../core/errors/AppError';
import { getContainer } from '../../../core/di/container';
import { ThemeName } from '../../../core/theme/palettes';
import { Language } from '../../../core/i18n/strings';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import { spriteUrlFor } from '../../../data/dto/PokemonMappers';
import TextComponent from '../../components/TextComponent/TextComponent';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PokeItem from '../../components/PokeItem/PokeItem';
import StatsItem from '../../components/StatsItem/StatsItem';
import Divider from '../../components/Divider/Divider';
import SkeletonRow from '../../components/SkeletonRow/SkeletonRow';
import ErrorView from '../../components/ErrorView/ErrorView';
import EmptyView from '../../components/EmptyView/EmptyView';
import RegionChips from '../../components/RegionChips/RegionChips';
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
    const [demoRegion, setDemoRegion] = useState<Region>(Region.National);

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
            <Text style={styles.title}>Example</Text>
            <Text style={styles.subtitle}>pokedex-rn-3  pruebas de api y componentes</Text>
            <Text style={[styles.title, styles.panelTitle]}>Galería de componentes</Text>
            <View style={[styles.gallery, { backgroundColor: palette.background }]}>
                <TextComponent text="TextComponent huge / bold" size="huge" weight="bold" />
                <TextComponent text="subtitle en textMuted" size="subtitle" color="textMuted" />
                <TextComponent text="label centrado en primary" size="label" color="primary" align="center" />
                <Divider />
                <PrimaryBtn text="PrimaryBtn solid" onPress={() => { }} />
                <PrimaryBtn text="PrimaryBtn outline" variant="outline" onPress={() => { }} />
                <PrimaryBtn text="disabled" onPress={() => { }} disabled />
                <Divider />
                <PokeItem id="25" name="Pikachu" imageUrl={spriteUrlFor('25')} />
                <PokeItem id="150" name="Mewtwo" imageUrl={spriteUrlFor('150')} />
                <Divider />
                <StatsItem name="attack" value={120} />
                <StatsItem name="hp" value={45} />
                <Divider />
                <SkeletonRow />
                <RegionChips selected={demoRegion} onSelect={setDemoRegion} />
                <View style={styles.stateDemo}>
                    <ErrorView error={createAppError(AppErrorCode.Network)} onRetry={() => { }} />
                </View>
                <View style={styles.stateDemo}>
                    <EmptyView message="EmptyView de demostración" />
                </View>
            </View>

            <Text style={[styles.title, styles.panelTitle]}>Ajustes</Text>
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
        </ScrollView>
    );
}