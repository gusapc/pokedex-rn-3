import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import styles from './SkeletonRowStyle';

export default function SkeletonRow() {
    const { palette } = useTheme();
    const pulse = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
                Animated.timing(pulse, { toValue: 0.4, duration: 600, useNativeDriver: true }),
            ]),
        );
        loop.start();
        return () => loop.stop();
    }, [pulse]);

    return (
        <View style={styles.row}>
            <Animated.View style={[styles.circle, { backgroundColor: palette.divider, opacity: pulse }]} />
            <Animated.View style={[styles.bar, { backgroundColor: palette.divider, opacity: pulse }]} />
        </View>
    );
}