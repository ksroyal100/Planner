import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        if (value === null || value === undefined) {
            await AsyncStorage.removeItem(key); 
            console.warn(`Removed key: ${key} because value was null/undefined`);
            return;
        }
        await AsyncStorage.setItem(key, JSON.stringify(value)); 
    } catch (e) {
        console.error(`Error storing data for key: ${key}`, e);
    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null; 
    } catch (e) {
        console.error(`Error retrieving data for key: ${key}`, e);
        return null;
    }
};

export default { storeData, getData };
