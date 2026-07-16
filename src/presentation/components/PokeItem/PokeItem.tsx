import React, { memo, useState } from 'react';
import { Image, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import TextComponent from '../TextComponent/TextComponent';
import { useTheme } from '../../../core/theme/useTheme';
import styles from './PokeItemStyle';

interface PokeItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

function PokeItem({ id, name, imageUrl }: PokeItemProps) {
    const { palette } = useTheme();
    const [failed, setFailed] = useState(false);

    return (
        <View style={styles.row} accessibilityLabel={`${name}, número ${id}`}>
            <View style={styles.left}>
                <View style={[styles.imageWrapper, { backgroundColor: palette.background }]}>
                    {failed ? (
                        <Feather name="help-circle" size={28} color={palette.textMuted} />
                    ) : (
                        <Image source={{ uri: imageUrl }} style={styles.image} onError={() => setFailed(true)} />
                    )}
                </View>
                <TextComponent text={name} size="title" />
            </View>
            <View style={styles.left}>
                <TextComponent text={`#${id}`} size="title" color="textMuted" />
                <Feather name="chevron-right" size={22} color={palette.textMuted} />
            </View>
        </View>
    );
}

export default memo(PokeItem);