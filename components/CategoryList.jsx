import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CategoryList({categoryList}) {
  return (
    <View style={{
      marginTop:20,
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        color:'gray',
      }}>Latest Budget</Text>
      <View>
        {categoryList?.map((category,index)=>(
          <View key={index} style={style.container}>
            <View style={style.iconContainer}>
              <Text style={[style.iconText,{color:category?.color}]}>
                {category.icon}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    marginBottom:10,

  },
  iconContainer:{
    justifyContent:'center',
    alignItems:"baseline"
  },
  iconText:{
    fontSize:30,
    padding:15,
    borderRadius:15
  }
})