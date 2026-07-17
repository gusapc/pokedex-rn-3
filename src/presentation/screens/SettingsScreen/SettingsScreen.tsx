import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PALETTES, ThemeName } from '../../../core/theme/palettes';
import { Language } from '../../../core/i18n/strings';
import { TEXT_SCALES, TextScale } from '../../../core/theme/typography';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../../core/theme/useTheme';
import { useTypography } from '../../../core/theme/useTypography';
import { useStrings } from '../../../core/i18n/useStrings';
import TextComponent from '../../components/TextComponent/TextComponent';
import Divider from '../../components/Divider/Divider';
import styles from './SettingsScreenStyle';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
function BallSwatch({ name, isSelected, onPress }: { name: ThemeName; isSelected: boolean; onPress: () => void }) {
    const { palette } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            style={[styles.swatchWrapper, isSelected && { borderColor: palette.accent }]}
        >
            <View style={styles.ball}>
                <View style={[styles.ballTop, { backgroundColor: PALETTES[name].primary }]} />
                <View style={styles.ballBottom} />
                <View style={styles.ballBand} />
                <View style={styles.ballButton} />
            </View>
        </TouchableOpacity>
    );
}

export default function SettingsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { themeName, setThemeName, palette } = useTheme();
    const { language, strings, setLanguage } = useStrings();
    const { textScale, setTextScale } = useTypography();
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            style={{ backgroundColor: palette.background }}
            contentContainerStyle={[styles.container, { paddingTop: insets.top }]}
        >
            <TextComponent text={strings.settings.title} size="huge" weight="bold" align="center" />

            <TextComponent text={strings.settings.theme} size="subtitle" weight="bold" />
            <View style={styles.swatchesRow}>
                {Object.values(ThemeName).map((name) => (
                    <View key={name} style={styles.swatchColumn}>
                        <BallSwatch name={name} isSelected={themeName === name} onPress={() => setThemeName(name)} />
                        <TextComponent text={strings.settings.themes[name]} size="label" align="center" color="textMuted" />
                    </View>
                ))}
            </View>
            <Divider />

            <TextComponent text={strings.settings.language} size="subtitle" weight="bold" />
            <View style={styles.languagesRow}>
                {Object.values(Language).map((value) => {
                    const isSelected = language === value;
                    return (
                        <TouchableOpacity
                            key={value}
                            onPress={() => setLanguage(value)}
                            accessibilityRole="radio"
                            accessibilityState={{ selected: isSelected }}
                            style={[
                                styles.languageChip,
                                {
                                    backgroundColor: isSelected ? palette.primary : palette.surface,
                                    borderColor: isSelected ? palette.primary : palette.divider,
                                },
                            ]}
                        >
                            <TextComponent
                                text={strings.settings.languages[value]}
                                weight="bold"
                                color={isSelected ? 'onPrimary' : 'textMuted'}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>

            <Divider />

            <TextComponent text={strings.settings.textSize} size="subtitle" weight="bold" />
            <View style={styles.languagesRow}>
                {(Object.keys(TEXT_SCALES) as TextScale[]).map((scale) => {
                    const isSelected = textScale === scale;
                    return (
                        <TouchableOpacity
                            key={scale}
                            onPress={() => setTextScale(scale)}
                            accessibilityRole="radio"
                            accessibilityState={{ selected: isSelected }}
                            style={[
                                styles.languageChip,
                                {
                                    backgroundColor: isSelected ? palette.primary : palette.surface,
                                    borderColor: isSelected ? palette.primary : palette.divider,
                                },
                            ]}
                        >
                            <TextComponent
                                text={strings.settings.textScales[scale]}
                                weight="bold"
                                color={isSelected ? 'onPrimary' : 'textMuted'}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Divider />
            <PrimaryBtn text="ExampleScreen" variant="outline" onPress={() => navigation.navigate('Example')} />
        </ScrollView >
    );
}