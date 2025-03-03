import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function TabLayout() {
  return (
   <Tabs screenOptions={{
    headerShown: false,
   }}>
    <Tabs.Screen name='index'
    options={{
// tabBarIcon:false
        // title: 'Home',
        // tabBarIcon: ({color}) => <FontAwesome name="home" size={24} color={color} />
    }} />
    {/* <Tabs.Screen name='history'
    options={{
        title: 'History',
        tabBarIcon: ({color}) => <FontAwesome name="history" size={24} color={color} />
    }} />
    <Tabs.Screen name='profile'
    options={{
        title: 'Profile',
        tabBarIcon: ({color}) => <FontAwesome name="user" size={24} color={color} />
    }} /> */}
    
   </Tabs>
  )
}