import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../utils/kindeConfig';
import colors from '../utils/colors';
import {Ionicons } from '@expo/vector-icons';

export default function Headers() {
    const [user, setUser] =useState();
    useEffect(() => {
        getUserData();
    },[])
    const getUserData = async () => {
        const user = await client.getUserDetails()
        setUser(user);
    }
  return (
    <View style={{
        display:"flex",
        flexDirection:"row",
        gap:8,
        alignItems:"center",
    }}>
     <Image source={{uri:user?.picture}} 
     style={{width:50,height:50,borderRadius:99,marginRight:10}}
     />
     <View style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",    
            justifyContent:"space-between",
            width:"85%",
     }}>
        <View>
            <Text style={{color:colors.WHITE,fontSize:16,fontFamily:"outfit"}}>Welcome</Text>
            <Text style={{color:colors.WHITE,fontSize:20,fontWeight:"outfit-bold"}}>{user?.given_name}</Text>
        </View>
        <Ionicons style={{marginRight:"10"}} name='notifications' size={24} color={colors.WHITE} />
     </View>
    </View>
  )
}