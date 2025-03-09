import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import colors from '../utils/colors'

export default function CategoryList({categoryList}) {

  const router = useRouter()

  const onCategoryClick = (category) => {
    router.push({
      pathname:'/category-detail',
      params:{
        categoryId:category.id
      }
    })
  }

const calculateTotalCost =(categoryItems)=>{
let totalCost = 0
categoryItems.forEach(item=>{
totalCost = totalCost+item.cost
})
return totalCost
}
  return (
    <View style={{
      marginTop:20,
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        // marginBottom:20,
        color:'gray',
      }}>Latest Budget</Text>
<View style={{
          width: "100%",
          backgroundColor: colors.GRAY,
          height: 2,
          borderRadius: 99,
          marginTop:12,
marginBottom:20
        }}>
</View>
      <View>
        {categoryList&&categoryList?.map((category,index)=>(
          <TouchableOpacity key={index} style={style.container}
          onPress={()=>onCategoryClick(category)}>
            <View style={style.iconContainer}>
              <Text style={[style.iconText,{backgroundColor:category.color}]}>
                {category.icon}</Text>
            </View>
            <View style={style.subContainer}>
            <View>
              <Text style={style.categoryText}>{category.name}</Text>
              <Text style={style.itemCount}> {category?.CategoryItems?.length} Items</Text>
            </View>
            <Text style={{fontFamily:"outfit-bold", fontSize:17}}>₹{calculateTotalCost(category?.CategoryItems)}</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor:"white",
    padding:10,
    borderRadius:15,

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