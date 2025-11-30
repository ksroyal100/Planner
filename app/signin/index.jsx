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
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inner}
      >
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          Login to continue planning your budget!
        </Text>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Email Address"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[
            styles.btn,
            (!email || !password || loading) && styles.btnDisabled,
          ]}
          disabled={!email || !password || loading}
          onPress={onClickSignIn}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Register */}
        <TouchableOpacity onPress={() => router.push("/form")}>
          <Text style={styles.link}>New Account? Register</Text>
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
  link: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 16,
    color: colors.PRIMARY,
    fontWeight: "500",
  },
});
