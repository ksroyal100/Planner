import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../utils/colors'

export default function ColorPicker({selectColor,setSelectColor}) {
  return (
    <View style={{
        display:"flex",
        flexDirection:"row",
        gap:20,
        marginTop:10,
    }}>
        {colors.COLOR_LIST.map((color,index) => (
            <TouchableOpacity key={index} style={[{
                height:30,
                width:30,
                backgroundColor:color,
                borderRadius:99,
            },selectColor === color &&{borderWidth:4}]} onPress={() => setSelectColor(color)}>

                </TouchableOpacity>
        ))}
    </View>
  )
}