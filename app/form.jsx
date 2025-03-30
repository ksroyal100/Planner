import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import colors from "../utils/colors";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { supabase } from "../utils/SuperbaseConfig";
import services from "../utils/services";

export default function Form() {
  const router = useRouter();
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);


  const onClickRegister = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("Users")
      .insert([
        {
          name: name,
          email: email,
          password: password,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting user:", error);
      ToastAndroid.show("Registration failed", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      const user = data[0];
      console.log("user", user);

      await services.storeData("login", "true");
      await services.storeData("user_email", user.email);
await  services.storeData("user_name", user.name);
      router.replace({
        pathname: "/",
        params: {
          userId: user.id,
          email: user.email,
          name: user.name,
        },
      });

      ToastAndroid.show("Successfully registered", ToastAndroid.SHORT);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "outfit",
          textAlign: "center",
          marginTop: 200,
          fontSize: 30,
        }}
      >
        Welcome!{" "}
      </Text>

      <View
        style={{
          padding: 10,
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          gap: 5,
          alignItems: "center",
          borderColor: colors.GRAY,
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="Your Name"
          style={{ fontSize: 17, width: "100%" }}
          onChangeText={(value) => setName(value)}
        />
      </View>
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          gap: 5,
          alignItems: "center",
          borderColor: colors.GRAY,
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="Your Email Address"
          style={{ fontSize: 17, width: "100%" }}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View
        style={{
          padding: 10,
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          gap: 5,
          alignItems: "center",
          borderColor: colors.GRAY,
          borderRadius: 10,
        }}
      >
        <TextInput
          placeholder="Your Password"
          style={{ fontSize: 17, width: "100%" }}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: colors.PRIMARY,
          borderRadius: 99,
          marginTop: 25,
        }}
        disabled={!name || !email || !password || loading}
        onPress={() => onClickRegister()}
      >
        {loading ? (
          <ActivityIndicator color={colors.WHITE} />
        ) : (
          <Text
            style={{
              color: colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 20,
            }}
          >
            Register
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signin")}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 15,
            color: colors.PRIMARY,
          }}
        >
          Already have Account? SignIn
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
