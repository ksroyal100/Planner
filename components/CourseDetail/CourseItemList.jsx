import { View, Text, Image } from "react-native";
import React from "react";
import colors from "../../utils/colors";

export default function CourseItemList({ categoryData }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        Item List{" "}
      </Text>
      <View style={{ marginTop: 20 }}>
        {
          categoryData?.CategoryItems?.map((item, index) => (
            <View key={index}>
              <View
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
                  {item.cost}₹
                </Text>
              </View>
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
