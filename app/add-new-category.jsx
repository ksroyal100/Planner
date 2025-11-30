import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import colors from "../utils/colors";
import ColorPicker from "../components/ColorPicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { supabase } from "../utils/SuperbaseConfig";
import { useRouter } from "expo-router";
import services from "../utils/services";

export default function AddNewCategory() {
  const [selectedIcons, setSelectedIcons] = React.useState("IC");
  const [selectColor, setSelectColor] = React.useState(colors.PRIMARY);
  const [categoryName, setCategoryName] = React.useState();
  const [totalBudget, setTotalBudget] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const onCreateCategory = async () => {
    const Lemail = await services.getData("user_email");
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("Category")
        .insert([
          {
            name: categoryName,
            icon: selectedIcons,
            assigned_budget: totalBudget,
            color: selectColor,
            created_by: Lemail,
          },
        ])
        .select();

      if (error) {
        console.log("Error:", error);
        setLoading(false);
        return;
      }

      setLoading(false);
      router.replace("/home");
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* <Text style={styles.heading}>Create New Category</Text> */}

        <View style={styles.iconWrapper}>
          <TextInput
            style={[styles.iconInput, { backgroundColor: selectColor }]}
            maxLength={2}
            onChangeText={(value) => setSelectedIcons(value)}
          >
            {selectedIcons}
          </TextInput>

          <View style={styles.pickerBox}>
            <ColorPicker
              selectColor={selectColor}
              setSelectColor={(color) => setSelectColor(color)}
            />
          </View>
        </View>

        {/* INPUTS */}
        <View style={styles.inputCard}>
          <MaterialIcons name="local-offer" size={22} color={colors.TEXT_LIGHT} />
          <TextInput
            placeholder="Category Name"
            maxLength={15}
            onChangeText={(value) => setCategoryName(value)}
            style={styles.inputField}
            placeholderTextColor={colors.TEXT_LIGHT}
          />
        </View>

        <View style={styles.inputCard}>
          <FontAwesome name="rupee" size={22} color={colors.TEXT_LIGHT} />
          <TextInput
            placeholder="Total Budget"
            keyboardType="numeric"
            onChangeText={(value) => setTotalBudget(value)}
            style={styles.inputField}
            placeholderTextColor={colors.TEXT_LIGHT}
          />
        </View>

        {/* BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.8 },
          ]}
          onPress={onCreateCategory}
          disabled={!categoryName || !totalBudget || loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            <Text style={styles.buttonText}>Add Category</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },

  heading: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    marginBottom: 25,
    textAlign: "center",
    color: colors.TEXT_DARK,
  },

  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  iconInput: {
    textAlign: "center",
    fontSize: 34,
    width: 110,
    height: 110,
    textAlignVertical: "center",
    borderRadius: 25,
    color: colors.WHITE,
    fontFamily: "outfit-bold",
    marginBottom: 15,
    elevation: 5,
  },

  pickerBox: {
    width: "95%",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 18,
    borderRadius: 20,
    marginTop: 10,
    borderColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
  },

  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginTop: 20,
    elevation: 2,
  },

  inputField: {
    fontSize: 18,
    flex: 1,
    fontFamily: "outfit",
    color: colors.TEXT_DARK,
  },

  button: {
    marginTop: 35,
    backgroundColor: colors.PRIMARY,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
  },

  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontFamily: "outfit",
  },
});

