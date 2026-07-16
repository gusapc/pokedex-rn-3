import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import TextComponent from '../TextComponent/TextComponent';
import { useTheme } from '../../../core/theme/useTheme';
import styles from './StatsItemStyle';

const MAX_STAT = 255;

interface StatsItemProps {
    name: string;
    value: number;
}

export default function StatsItem({ name, value }: StatsItemProps) {
    const { palette } = useTheme();
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progress, {
            toValue: Math.min(value / MAX_STAT, 1),
            duration: 600,
            useNativeDriver: false,
        }).start();
    }, [value, progress]);

    const width = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

    return (
        <View style={styles.row} accessibilityLabel={`${name}: ${value}`}>
            <View style={styles.name}>
                <TextComponent text={name} size="label" color="textMuted" />
            </View>
            <View style={styles.value}>
                <TextComponent text={String(value)} size="label" weight="bold" />
            </View>
            <View style={[styles.track, { backgroundColor: palette.divider }]}>
                <Animated.View style={[styles.fill, { backgroundColor: palette.primary, width }]} />
            </View>
        </View>
    );
}