import AsyncStorage from '@react-native-async-storage/async-storage';

export const readFromStore = async <T>(key: string): Promise<T | null> => {
    try {
        const raw = await AsyncStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    } catch {
        return null;
    }
};

export const writeToStore = async <T>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStore = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
};