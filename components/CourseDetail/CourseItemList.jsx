import { View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import {EvilIcons} from '@expo/vector-icons'
import {supabase} from "../../utils/SuperbaseConfig"

export default function CourseItemList({ categoryData,setUpdateRecord }) {
const [expandItem,setExpandItem] = React.useState()

const onDeleteItem=async(id)=>{
const {error} = await supabase.from('CategoryItems').delete().eq('id',id)
ToastAndroid.show("Item Deleted!",ToastAndroid.SHORT)
setUpdateRecord(true)

}

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        Item List{" "}
      </Text>
      <View style={{ marginTop: 20 }}>
        {
          categoryData?.CategoryItems?.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
onPress={()=>setExpandItem(index)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 90, height: 90, borderRadius: 15 }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 20,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      color: colors.GRAY,
                    }}
numberOfLines={2}
                  >
                    {item.url}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 20,
                    marginLeft: 10,
                  }}
                >
                  ₹{item.cost}
                </Text>
              </TouchableOpacity>
{expandItem==index&&
<View style={{display:"flex",flexDirection:"row",gap:10,justifyContent:"flex-end"}}>
<TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
<EvilIcons name="trash" size={34} color="red"/>
</TouchableOpacity>
</View>}
              {categoryData?.CategoryItems.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.5,
                    marginTop: 10,
                    marginBottom:10,
                    borderColor: colors.GRAY,
                  }}
                ></View>
              )}
            </View>
          ))
          // <Text style={{fontFamily:"outfit-bold",fontSize:25,color:colors.GRAY,textAlign:"center"}}>No Item Found</Text>
        }
      </View>
    </View>
  );
}
