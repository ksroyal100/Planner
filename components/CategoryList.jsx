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
        marginBottom:20,
        color:'gray',
      }}>Latest Budget</Text>
      <View>
        {categoryList?.map((category,index)=>(
          <View key={index} style={style.container}>
            <View style={style.iconContainer}>
              <Text style={[style.iconText,{backgroundColor:category.color}]}>
                {category.icon}</Text>
            </View>
            <View style={style.subContainer}>
            <View>
              <Text style={style.categoryText}>{category.name}</Text>
              <Text style={style.itemCount}> {category?.CategoryItems?.length} Items</Text>
            </View>
            <Text>5000</Text>
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
    display:"flex",
    flexDirection:"row",
    gap:10,
    alignItems:"center",

  },
  subContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"70%"
  },
  iconContainer:{
    justifyContent:'center',
    alignItems:"baseline"
  },
  iconText:{
    fontSize:30,
    padding:16,
    borderRadius:15
  },
  categoryText:{
    fontFamily:"outfit-bold",
    fontSize:17,
  },
  itemCount:{
    fontFamily:"outfit"
  }
})