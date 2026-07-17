import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamList, RootStackParamList } from './types';
import BottomBar from '../components/BottomBar/BottomBar';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import ExampleScreen from '../screens/ExampleScreen/ExampleScreen';

const Tabs = createBottomTabNavigator<MainTabsParamList>();

function MainTabs() {
    return (
        <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomBar {...props} />}>
            <Tabs.Screen name="HomeScreen" component={HomeScreen} />
            <Tabs.Screen name="FavoritesScreen" component={FavoritesScreen} />
            <Tabs.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tabs.Navigator>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
                <Stack.Screen name="Example" component={ExampleScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}