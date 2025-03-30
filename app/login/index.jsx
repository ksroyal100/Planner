import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import login from "../../assets/images/loginimg.png";
import Colors from "../../utils/colors.jsx";
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
          marginTop: -10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 35,
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
            fontSize: 20,
            textAlign: "center",
            color: "white",
            marginTop: 20,
          }}
        >
          Stay on Track, Event by Event: Your Personal Planner App!
        </Text>
        <TouchableOpacity onPress={()=> router.push('/form')} activeOpacity={0.7}>
          <Text
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              color: Colors.PRIMARY,
              fontSize: 25,
              textAlign: "center",
              marginTop: 30,
              // fontFamily:"outfit-bold"
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
    width: 400,
    height: 400,
    marginTop: 20,
  },
});
