import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';

export default function HomeScreen() {
    const { palette } = useTheme();
    const { strings } = useStrings();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.background }}>
            <Text style={{ color: palette.text, fontSize: 24, fontWeight: 'bold' }}>{strings.tabs.home}</Text>
        </View>
    );
}