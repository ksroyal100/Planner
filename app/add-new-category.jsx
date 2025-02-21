import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../utils/colors';

export default function AddNewCategory() {
  const [selectedIcons, setSelectedIcons] = React.useState('IC');
  const [selectcolor, setSelectColor] = React.useState(colors.GRAY);
  return (
    <View style={{marginTop:20,padding:20}}>
      <View style={{
        justifyContent:"center",
        alignItems:"center",
      }}>
      <TextInput 
      style={[styles.iconInput,{backgroundColor:selectcolor}]}
      maxLength={2}
      >{selectedIcons}</TextInput>
      </View>
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
  }
})