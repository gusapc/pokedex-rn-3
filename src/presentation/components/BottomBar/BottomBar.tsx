import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import styles from './BottomBarStyle';

const TAB_ICONS: Record<string, keyof typeof Feather.glyphMap> = {
    HomeScreen: 'home',
    FavoritesScreen: 'star',
    SettingsScreen: 'settings',
};

interface TabItemProps {
    label: string;
    icon: keyof typeof Feather.glyphMap;
    isFocused: boolean;
    color: string;
    onPress: () => void;
}

function TabItem({ label, icon, isFocused, color, onPress }: TabItemProps) {
    const progress = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: isFocused ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, [isFocused, progress]);

    const maxWidth = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 90] });
    const opacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

    return (
        <Pressable
            onPress={onPress}
            style={styles.item}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={label}
        >
            <Feather name={icon} size={24} color={color} />
            <Animated.View style={{ maxWidth, opacity, overflow: 'hidden' }}>
                <Animated.Text numberOfLines={1} style={[styles.label, { color }]}>
                    {label}
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
}

export default function BottomBar({ state, navigation }: BottomTabBarProps) {
    const { palette } = useTheme();
    const { strings } = useStrings();
    const insets = useSafeAreaInsets();

    const labels: Record<string, string> = {
        HomeScreen: strings.tabs.home,
        FavoritesScreen: strings.tabs.favorites,
        SettingsScreen: strings.tabs.settings,
    };

    return (
        <View style={[styles.bar, { backgroundColor: palette.primary, paddingBottom: insets.bottom }]}>
            <View style={[styles.stripe, { backgroundColor: palette.ballStripe }]} />
            <View style={[styles.pokePoint, { backgroundColor: palette.ballPoint, borderColor: palette.ballStripe }]} />
            <View style={styles.row}>
                {state.routes.map((route, index) => (
                    <TabItem
                        key={route.key}
                        label={labels[route.name] ?? route.name}
                        icon={TAB_ICONS[route.name] ?? 'circle'}
                        isFocused={state.index === index}
                        color={palette.onPrimary}
                        onPress={() => navigation.navigate(route.name)}
                    />
                ))}
            </View>
        </View>
    );
}