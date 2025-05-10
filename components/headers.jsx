import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../utils/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import services from '../utils/services';
import { useRouter } from 'expo-router';

export default function Headers() {
    const [user, setUser] =useState("Guest");
    useEffect(() => {
        getUserData();
    },[])
    const router = useRouter();
    const getUserData = async () => {
    const storedEmail = await services.getData("user_name");
        setUser(storedEmail);
    }
const handleLogout = async () => {
    await services.storeData("login", "false");
    await services.storeData("user_name", "");
    await services.storeData("user_email", "");

    console.log("Logging out...");

    setTimeout(() => {
        router.replace("/home");
    }, 100);
};


  return (
    <View style={{
        display:"flex",
        flexDirection:"row",
        gap:8,
        alignItems:"center",
    }}>

     <View style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",    
            justifyContent:"space-between",
            width:"98%",
     }}>
        <View >

            <Text style={{color:colors.WHITE,fontSize:16,fontFamily:"outfit"}}>Welcome</Text>
            <Text style={{color:colors.WHITE,fontSize:20,fontWeight:"outfit-bold"}}>{user}</Text>
        </View>

<TouchableOpacity onPress={handleLogout}>
<FontAwesome name="power-off" size={24} color={colors.WHITE}  />
</TouchableOpacity>

     </View> 
    </View>
  )
}