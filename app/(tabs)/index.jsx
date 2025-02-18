import { View, Text, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from '../../utils/services'
import {client} from '../../utils/kindeConfig'
import {superbase} from '../../utils/superbase'

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   checkUserAuth();
  // },[])

  // const checkUserAuth = async () => {
  //   const result = await services.getData('login');
  //   if(result!=="true"){
  //     router.replace('/login');
  //   }
  //   console.log("result",result);
  // }

  const handleLogout = async () => {
    const loggout = await client.logout();
    if(loggout){
      await services.storeData('login', 'false');
      router.replace('/login');
  }
  }
  const getCategoryList = async () => {
    const { data, error } = await superbase.from('Category').select('*');
    if(error){
      console.log("error",error);
    }else{
      console.log("data",data);
  }


}
  return (
    <View>
      <Text>Home</Text>
      <Button title='Logout' onPress={handleLogout}/>
      
    </View>
  )
}