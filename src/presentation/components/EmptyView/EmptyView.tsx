import React from 'react';
import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import TextComponent from '../TextComponent/TextComponent';
import { useTheme } from '../../../core/theme/useTheme';
import styles from './EmptyViewStyle';

export default function EmptyView({ message }: { message: string }) {
    const { palette } = useTheme();
    return (
        <View style={styles.container}>
            <Feather name="inbox" size={48} color={palette.textMuted} />
            <TextComponent text={message} size="subtitle" align="center" color="textMuted" />
        </View>
    );
}