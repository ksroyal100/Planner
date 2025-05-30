import { View, StatusBar } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { AuthProvider } from '../context/AuthContext';

export default function HomeLayout() {
  const [fontsLoaded, fonterror] = useFonts({
    "outfit": require('./../assets/fonts/Outfit-Regular.ttf'),
    "outfit-bold": require('./../assets/fonts/Outfit-Bold.ttf'),
    "outfit-medium": require('./../assets/fonts/Outfit-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />
      
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="add-new-category"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Add New Category',
            }}
          />
          <Stack.Screen
            name='addNewCategoryItem'
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Add New Item",
            }}
          />
        </Stack>
      </AuthProvider>
    </>
  );
}
