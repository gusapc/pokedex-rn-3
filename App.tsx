import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from './src/core/query/queryClient';
import { ThemeName } from './src/core/theme/palettes';
import { useTheme } from './src/core/theme/useTheme';
import Router from './src/presentation/navigation/Router';

function ThemedStatusBar() {
  const { themeName } = useTheme();
  return <StatusBar style={themeName === ThemeName.Ultraball ? 'light' : 'dark'} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemedStatusBar />
        <Router />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}