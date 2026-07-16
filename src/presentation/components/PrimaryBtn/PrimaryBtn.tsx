import React from 'react';
import { TouchableOpacity } from 'react-native';
import TextComponent from '../TextComponent/TextComponent';
import { useTheme } from '../../../core/theme/useTheme';
import styles from './PrimaryBtnStyle';

interface PrimaryBtnProps {
    text: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'solid' | 'outline';
}

export default function PrimaryBtn({ text, onPress, disabled = false, variant = 'solid' }: PrimaryBtnProps) {
    const { palette } = useTheme();
    const isSolid = variant === 'solid';
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={text}
            accessibilityState={{ disabled }}
            style={[
                styles.button,
                {
                    backgroundColor: isSolid ? palette.primary : 'transparent',
                    borderColor: palette.primary,
                    opacity: disabled ? 0.5 : 1,
                },
            ]}
        >
            <TextComponent text={text} size="subtitle" align="center" color={isSolid ? 'onPrimary' : 'primary'} />
        </TouchableOpacity>
    );
}