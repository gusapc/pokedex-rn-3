import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';

export default function Divider({ inset = false }: { inset?: boolean }) {
    const { palette } = useTheme();
    return <View style={{ height: 1, backgroundColor: palette.divider, marginHorizontal: inset ? 16 : 0 }} />;
}