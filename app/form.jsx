import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import colors from "../utils/colors";
import { useRouter } from "expo-router";
import React from "react";
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
      .insert([{ name, email, password }])
      .select();

    if (error) {
      console.error("Error inserting user:", error);
      ToastAndroid.show("Registration failed", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      const user = data[0];

      await services.storeData("login", "true");
      await services.storeData("user_email", user.email);
      await services.storeData("user_name", user.name);

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inner}
      >
        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join us to start planning your personal budget easily!
        </Text>

        {/* Input Fields */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Email Address"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[
            styles.btn,
            (!name || !email || !password || loading) && styles.btnDisabled,
          ]}
          disabled={!name || !email || !password || loading}
          onPress={onClickRegister}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            <Text style={styles.btnText}>Register</Text>
          )}
        </TouchableOpacity>

        {/* Already account */}
        <TouchableOpacity onPress={() => router.push("/signin")}>
          <Text style={styles.signInLink}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.TEXT_DARK,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.TEXT_LIGHT,
    marginBottom: 30,
    lineHeight: 22,
  },
  inputWrapper: {
    marginTop: 18,
    backgroundColor: colors.WHITE,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  input: {
    height: 45,
    fontSize: 17,
    color: colors.TEXT_DARK,
  },
  btn: {
    backgroundColor: colors.PRIMARY,
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 35,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: colors.WHITE,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  signInLink: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 16,
    color: colors.PRIMARY,
    fontWeight: "500",
  },
});
