import React from 'react';
import { Text, TextStyle } from 'react-native';
import { ThemePalette } from '../../../core/theme/palettes';
import { FontSize } from '../../../core/theme/typography';
import { useTheme } from '../../../core/theme/useTheme';
import { useTypography } from '../../../core/theme/useTypography';

type TextColor = keyof Pick<ThemePalette, 'text' | 'textMuted' | 'primary' | 'onPrimary' | 'accent' | 'danger'>;

interface TextComponentProps {
    text: string;
    size?: FontSize;
    color?: TextColor;
    weight?: TextStyle['fontWeight'];
    align?: TextStyle['textAlign'];
    numberOfLines?: number;
}

export default function TextComponent({
    text,
    size = 'body',
    color = 'text',
    weight = 'normal',
    align = 'left',
    numberOfLines,
}: TextComponentProps) {
    const { palette } = useTheme();
    const { scaledSize } = useTypography();
    return (
        <Text
            allowFontScaling
            numberOfLines={numberOfLines}
            style={{ fontSize: scaledSize(size), color: palette[color], fontWeight: weight, textAlign: align }}
        >
            {text}
        </Text>
    );
}