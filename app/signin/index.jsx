import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import colors from "../../utils/colors";
import { useRouter } from "expo-router";
import React from "react";
import { supabase } from "../../utils/SuperbaseConfig";
import services from "../../utils/services";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);

const onClickSignIn = async () => {
  if (!email || !password) {
    ToastAndroid.show("Please enter email and password", ToastAndroid.SHORT);
    setLoading(false);
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await supabase
      .from("Users")
      .select("id, email, name, password")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      console.error("User not found or incorrect password:", error);
      ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    await services.storeData("login", "true");
    await services.storeData("user_email", data.email);
    await services.storeData("user_name", data.name);

    router.replace({
      pathname: "/home",
      params: {
        userId: data.id,
        email: data.email,
        name: data.name,
      },
    });
  } catch (err) {
    console.error("Unexpected Error:", err);
    ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
  } finally {
    setLoading(false); 
  }
};


  return (
    <KeyboardAvoidingView style={{padding:20}}>
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
secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: colors.PRIMARY,
          borderRadius: 99,
          marginTop: 25,
        }}
        disabled={ !email || !password || loading}
        onPress={() => onClickSignIn()}
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
            SignIn
          </Text>
        )}
      </TouchableOpacity>
<TouchableOpacity onPress={()=> router.push('/form')}>
<Text style={{textAlign:"center",marginTop:10,fontSize:15,color:colors.PRIMARY}}>New Account? Register</Text>
</TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
