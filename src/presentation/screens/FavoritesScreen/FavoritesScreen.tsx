import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pokemon } from '../../../domain/entities/Pokemon';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import TextComponent from '../../components/TextComponent/TextComponent';
import PokeItem from '../../components/PokeItem/PokeItem';
import EmptyView from '../../components/EmptyView/EmptyView';
import Divider from '../../components/Divider/Divider';
import { useFavorites } from '../../hooks/useFavorites';
import styles from './FavoritesScreenStyle';

export default function FavoritesScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { palette } = useTheme();
    const { strings } = useStrings();
    const insets = useSafeAreaInsets();
    const { favorites } = useFavorites();

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
            <TextComponent text={strings.favorites.title} size="huge" weight="bold" align="center" />
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <Divider inset />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<EmptyView message={strings.favorites.empty} />}
            />
        </View>
    );
}