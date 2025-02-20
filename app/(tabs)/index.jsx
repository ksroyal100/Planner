import { View, Text, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from '../../utils/services'
import {client} from '../../utils/kindeConfig'
import {superbase} from '../../utils/SuperbaseConfig'
import Headers from '../../components/headers'
import colors, { Colors } from '../../utils/colors'
import CircularChart from '../../components/circularChart'
export default function Home() {
  const router = useRouter();

  useEffect(() => {
  //   // checkUserAuth();
    getCategoryList();
  },[])

  const checkUserAuth = async () => {
    const result = await services.getData('login');
    if(result!=="true"){
      router.replace('/login');
    }
    console.log("result",result);
  }

  const handleLogout = async () => {
    const loggout = await client.logout();
    if(loggout){
      await services.storeData('login', 'false');
      router.replace('/login');
  }
  }
  const getCategoryList = async () => {
    const user = await client.getUserDetails()
    const { data, error } = await superbase.from('Category')
    .select('*')
    .eq('created_by',user.email )
    if(error){
      console.log("error",error);
    }else{
      console.log("data",data);
  }


}
  return (
    <View style={{marginTop:20,padding:20,backgroundColor:colors.PRIMARY,height:150}}>
    <Headers /> 
    <CircularChart />
    </View>
  ) 
}