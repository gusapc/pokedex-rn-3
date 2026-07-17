import React from 'react';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../navigation/types';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { useFavorites, useToggleFavorite } from '../../hooks/useFavorites';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import TextComponent from '../../components/TextComponent/TextComponent';
import StatsItem from '../../components/StatsItem/StatsItem';
import ErrorView from '../../components/ErrorView/ErrorView';
import Divider from '../../components/Divider/Divider';
import styles from './PokemonDetailsScreenStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetails'>;

export default function PokemonDetailsScreen({ navigation, route }: Props) {
    const { id, name } = route.params;
    const { palette } = useTheme();
    const { strings } = useStrings();
    const insets = useSafeAreaInsets();
    const { detail, isLoading, error, retry } = usePokemonDetail(id);
    const { favorites } = useFavorites();
    const toggleFavorite = useToggleFavorite();
    const isFavorite = favorites.some((pokemon) => pokemon.id === id);

    const onToggleFavorite = () => {
        if (!detail || toggleFavorite.isPending) return;
        toggleFavorite.mutate({ id, name, imageUrl: detail.imageUrl });
    };

    return (
        <View style={[styles.container, { backgroundColor: palette.background }]}>
            <View style={[styles.header, { backgroundColor: palette.primary, paddingTop: insets.top }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="regresar">
                    <Feather name="chevron-left" size={32} color={palette.onPrimary} />
                </TouchableOpacity>
                <TextComponent text={name} size="title" weight="bold" color="onPrimary" />
                <TouchableOpacity
                    onPress={onToggleFavorite}
                    disabled={!detail}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: isFavorite }}
                    accessibilityLabel="favorito"
                >
                    <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={26} color={palette.onPrimary} />
                </TouchableOpacity>
            </View>

            {isLoading && (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={palette.primary} />
                </View>
            )}
            {error && <ErrorView error={error} onRetry={() => retry()} />}
            {detail && (
                <ScrollView contentContainerStyle={styles.content}>
                    <Image source={{ uri: detail.imageUrl }} style={styles.image} accessibilityLabel={detail.name} />

                    <View style={styles.typesRow}>
                        {detail.types.map((type) => (
                            <View key={type} style={[styles.typeChip, { backgroundColor: palette.primary }]}>
                                <TextComponent text={type} size="label" weight="bold" color="onPrimary" />
                            </View>
                        ))}
                    </View>

                    <View style={styles.measuresRow}>
                        <Measure label={strings.detail.weight} value={`${detail.weightKg} kg`} />
                        <Measure label={strings.detail.height} value={`${detail.heightM} m`} />
                        <Measure label={strings.detail.baseExp} value={String(detail.baseExperience)} />
                    </View>
                    <Divider inset />

                    <TextComponent text={strings.detail.abilities} size="subtitle" weight="bold" />
                    {detail.abilities.map((ability) => (
                        <View key={ability.name} style={styles.abilityRow}>
                            <Feather name={ability.isHidden ? 'star' : 'sun'} size={18} color={palette.textMuted} />
                            <TextComponent text={ability.name} />
                            {ability.isHidden && <TextComponent text={strings.detail.hidden} size="label" color="accent" />}
                        </View>
                    ))}
                    <Divider inset />

                    <TextComponent text={strings.detail.stats} size="subtitle" weight="bold" />
                    {detail.stats.map((stat) => (
                        <StatsItem key={stat.name} name={stat.name} value={stat.value} />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

function Measure({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.measure}>
            <TextComponent text={value} size="subtitle" weight="bold" align="center" />
            <TextComponent text={label} size="label" color="textMuted" align="center" />
        </View>
    );
}