import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import login from "../../assets/images/loginimg.png";
import Colors from "../../utils/colors.jsx";
import { client } from "../../utils/kindeConfig.jsx";
import services from "../../utils/services.jsx";
import { useRouter } from "expo-router";
import * as Keychain from "react-native-keychain";


export default function LoginScreen() { 
  const router = useRouter();

const handleSignIn = async () => {
  try {
    const token = await client.login();
    if (token) {
      await services.storeData("login", "true");
      console.log("token", token);
      router.replace("/");
    } else {
      console.log("Login failed: No token received");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

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
          marginTop: -30,
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
        <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
          <Text
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              color: Colors.PRIMARY,
              fontSize: 20,
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Log In
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