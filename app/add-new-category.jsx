import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../utils/colors';
import ColorPicker from '../components/ColorPicker';

export default function AddNewCategory() {
  const [selectedIcons, setSelectedIcons] = React.useState('IC');
  const [selectColor, setSelectColor] = React.useState(colors.YELLOW);
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