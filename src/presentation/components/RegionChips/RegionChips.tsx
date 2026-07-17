import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Region } from '../../../domain/entities/Region';
import TextComponent from '../TextComponent/TextComponent';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import styles from './RegionChipsStyle';

interface RegionChipsProps {
    selected: Region;
    onSelect: (region: Region) => void;
}

export default function RegionChips({ selected, onSelect }: RegionChipsProps) {
    const { palette } = useTheme();
    const { strings } = useStrings();

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
            contentContainerStyle={styles.container}
            accessibilityRole="tablist"
        >
            {Object.values(Region).map((region) => {
                const isSelected = region === selected;
                return (
                    <TouchableOpacity
                        key={region}
                        onPress={() => onSelect(region)}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: isSelected }}
                        style={[
                            styles.chip,
                            {
                                backgroundColor: isSelected ? palette.primary : palette.surface,
                                borderColor: isSelected ? palette.primary : palette.divider,
                            },
                        ]}
                    >
                        <TextComponent
                            text={strings.regions[region]}
                            size="body"
                            weight="bold"
                            color={isSelected ? 'onPrimary' : 'textMuted'}
                            numberOfLines={1}
                        />
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}