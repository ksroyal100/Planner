import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import colors from '../utils/colors';
import ColorPicker from '../components/ColorPicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { supabase, superbase } from '../utils/SuperbaseConfig';
import {client } from './../utils/kindeConfig'
import { useRouter } from 'expo-router';

export default function AddNewCategory() {
  const [selectedIcons, setSelectedIcons] = React.useState('IC');
  const [selectColor, setSelectColor] = React.useState(colors.YELLOW);
  const [categoryName, setCategoryName] = React.useState();
  const [totalBudget, setTotalBudget] = React.useState();

  const router = useRouter()


    const onCreateCategory = async () => {
      try {
        // const user = await client.getUserDetails();
        const { data, error } = await supabase
          .from("Category")
          .insert([
            {
              name: categoryName,
              icon: selectedIcons,
              assigned_budget: totalBudget,
              color: selectColor,
              // created_at: new Date(),
              // created_by: user.email
            },
          ])
          .select();
    
        if (error) {
          console.log("Error:", error);
          return { success: false, error };
        }
        router.replace({
          pathname: '/category-detail', 
          params:{
            categoryId:data[0].id
          }
        })
        ToastAndroid.show("Category Added Successfully", ToastAndroid.SHORT);
        return { success: true, data };
      } catch (err) {
        console.error("Unexpected Error:", err);
        return { success: false, error: err };
      }
    };
    
    
  return (
    <View style={{marginTop:20,padding:20}}>
      <View style={{
        justifyContent:"center",
        alignItems:"center",
      }}>
      <TextInput 
      style={[styles.iconInput,{backgroundColor:selectColor}]}
      maxLength={2}
      onChangeText={(value)=>setSelectedIcons(value)}
      >{selectedIcons}</TextInput>
      <ColorPicker selectColor={selectColor} setSelectColor={(color)=>setSelectColor(color)}/>
      </View>
      <View style={styles.inputView}>
      <MaterialIcons name="local-offer" size={24} color={colors.GRAY} />
      <TextInput onChangeText={(value) =>setCategoryName(value)} placeholder="Category Name" style={{width:"100%",fontSize:20}}/>
      </View>
      <View style={styles.inputView}>
      <FontAwesome name="rupee" size={24} color={colors.GRAY} />
      <TextInput placeholder="Total Bugdet"
      onChangeText={(value)=>setTotalBudget(value)}
      keyboardType='numeric' style={{width:"100%",fontSize:20}}/>
      </View>

      <TouchableOpacity
      onPress={()=>onCreateCategory()}
      style={{backgroundColor:colors.PRIMARY,padding:10,marginTop:20,borderRadius:10}} disabled={!categoryName&&!totalBudget}>
        <Text style={{textAlign:"center",color:colors.WHITE,fontSize:20}}>Add Category</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  iconInput:{
    textAlign:"center",
    fontSize:30,
    padding:20,
    borderRadius:99,
    paddingHorizontal:28,
    color:colors.WHITE,
  },
  inputView:{
    borderWidth:1,
    display:"flex",
    flexDirection:"row",
    gap:5,
    padding:8,
    borderRadius:10,
    borderColor:colors.GRAY,
    backgroundColor:colors.WHITE,
    alignItems:"center",
    marginTop:20
  }
})