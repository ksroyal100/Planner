import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import login from "../assets/images/starter.png";
import Colors from "../utils/colors";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image source={login} style={style.bgimage} />
      <View
        style={{
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          height: "100%",
          padding: 20,
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit",
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            marginTop: 20,
          }}
        >
          Personal Budget Planner
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "white",
            marginTop: 20,
          }}
        >
          Stay on Track, Event by Event: Your Personal Planner App!
        </Text>
        <TouchableOpacity onPress={()=> router.replace({
  pathname: "/form"
})} activeOpacity={0.7}>
          <Text
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              color: Colors.PRIMARY,
              fontSize: 25,
              fontFamily:"outfit",
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Get Started
          </Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  bgimage: {
    width: 340,
    height: 340,
    marginTop: 60,
  },
});
