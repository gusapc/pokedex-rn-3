import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pokemon } from '../../../domain/entities/Pokemon';
import { Region } from '../../../domain/entities/Region';
import { RootStackParamList } from '../../navigation/types';
import TextComponent from '../../components/TextComponent/TextComponent';
import PokeItem from '../../components/PokeItem/PokeItem';
import RegionChips from '../../components/RegionChips/RegionChips';
import SkeletonRow from '../../components/SkeletonRow/SkeletonRow';
import ErrorView from '../../components/ErrorView/ErrorView';
import EmptyView from '../../components/EmptyView/EmptyView';
import Divider from '../../components/Divider/Divider';
import { usePokemonList } from '../../hooks/usePokemonList';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import styles from './HomeScreenStyle';

const SKELETON_COUNT = 8;

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { palette } = useTheme();
    const { strings } = useStrings();
    const insets = useSafeAreaInsets();
    const [region, setRegion] = useState<Region>(Region.National);
    const { items, isLoading, error, isLoadingMore, retry, loadMore } = usePokemonList(region);
    const listRef = useRef<FlatList<Pokemon>>(null);

    const scrollToTop = useCallback(() => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, []);

    const handleSelectRegion = useCallback(
        (next: Region) => {
            if (next === region) {
                scrollToTop();
                return;
            }
            setRegion(next);
            scrollToTop();
        },
        [region, scrollToTop],
    );

    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<Pokemon>) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('PokemonDetails', { id: item.id, name: item.name })}
                accessibilityRole="button"
            >
                <PokeItem id={item.id} name={item.name} imageUrl={item.imageUrl} />
            </TouchableOpacity>
        ),
        [navigation],
    );

    return (
        <View style={[styles.container, { backgroundColor: palette.background, paddingTop: insets.top }]}>
            <TextComponent text={strings.home.title} size="huge" weight="bold" align="center" />
            <TextComponent text={strings.regions[region]} size="label" weight="bold" align="center" color="textMuted" />
            <RegionChips selected={region} onSelect={handleSelectRegion} />
            {error ? (
                <ErrorView error={error} onRetry={() => retry()} />
            ) : (
                <FlatList
                    ref={listRef}
                    data={isLoading ? [] : items}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Divider inset />}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.4}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        isLoading ? (
                            <View>
                                {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                                    <SkeletonRow key={index} />
                                ))}
                            </View>
                        ) : (
                            <EmptyView message={strings.home.empty} />
                        )
                    }
                    ListFooterComponent={isLoadingMore ? <SkeletonRow /> : null}
                />
            )}
        </View>
    );
}