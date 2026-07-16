import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ExampleScreen from './src/presentation/screens/ExampleScreen/ExampleScreen';


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ExampleScreen />
    </SafeAreaProvider>
  );
}