import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toAppError } from 'pokedex-rn-3/src/core/errors/AppError';
import { httpGet } from 'pokedex-rn-3/src/data/api/HttpClient';
import styles from './ExampleScreenStyle';

const MAX_PAYLOAD_CHARS = 4000;

interface LabResult {
    label: string;
    ms: number;
    payload: string;
}

interface LabProbe {
    label: string;
    request: () => Promise<unknown>;
}

const probes: LabProbe[] = [
    {
        label: 'GET /pokemon?limit=20',
        request: () => httpGet<unknown>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'),
    },
    {
        label: 'GET /pokemon/25',
        request: () => httpGet<unknown>('https://pokeapi.co/api/v2/pokemon/25'),
    },
];

export default function ExampleScreen() {
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<LabResult | null>(null);

    const probe = async ({ label, request }: LabProbe) => {
        if (isLoading) return;
        setIsLoading(true);
        const startedAt = Date.now();
        try {
            const data = await request();
            setResult({
                label,
                ms: Date.now() - startedAt,
                payload: JSON.stringify(data, null, 2).slice(0, MAX_PAYLOAD_CHARS),
            });
        } catch (error) {
            const appError = toAppError(error);
            setResult({
                label,
                ms: Date.now() - startedAt,
                payload: `ERROR ${appError.code}: ${appError.message}`,
            });
        }
        setIsLoading(false);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: insets.top + 8, padding: 16 }}>
            <Text style={styles.title}>Example</Text>
            <Text style={styles.subtitle}>pokedex-rn-3 · pruebas de api y componentes</Text>
            {probes.map((item) => (
                <Pressable key={item.label} style={styles.btn} onPress={() => probe(item)}>
                    <Text style={styles.btnText}>▶ {item.label}</Text>
                </Pressable>
            ))}
            {isLoading && <Text style={styles.meta}>cargando…</Text>}
            {result && (
                <View>
                    <Text style={styles.meta}>
                        {result.label} · {result.ms} ms
                    </Text>
                    <Text selectable style={styles.json}>
                        {result.payload}
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}