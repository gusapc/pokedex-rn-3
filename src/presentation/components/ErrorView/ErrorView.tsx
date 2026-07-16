import React from 'react';
import { View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { AppError } from '../../../core/errors/AppError';
import TextComponent from '../TextComponent/TextComponent';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import { useTheme } from '../../../core/theme/useTheme';
import { useStrings } from '../../../core/i18n/useStrings';
import styles from './ErrorViewStyle';

interface ErrorViewProps {
    error: AppError;
    onRetry: () => void;
}

export default function ErrorView({ error, onRetry }: ErrorViewProps) {
    const { palette } = useTheme();
    const { strings } = useStrings();
    return (
        <View style={styles.container}>
            <Feather name="wifi-off" size={48} color={palette.textMuted} />
            <TextComponent text={strings.errors[error.code]} size="subtitle" align="center" color="textMuted" />
            <PrimaryBtn text={strings.common.retry} onPress={onRetry} />
        </View>
    );
}