import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import colors from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { BlurView } from "expo-blur";

import { supabase } from "../utils/SuperbaseConfig";
import { decode } from "base64-arraybuffer";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

const placeholder =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

export default function AddNewCategoryItem() {
  const [image, setImage] = React.useState(placeholder);
  const [previewImage, setPreviewImage] = React.useState(placeholder);
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = React.useState();
  const [url, setUrl] = React.useState();
  const [cost, setCost] = React.useState();
  const [note, setNote] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const onImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  const onClickAdd = async () => {
    setLoading(true);
    const fileName = Date.now();

    try {
      const { error } = await supabase.storage
        .from("images")
        .upload(fileName + ".png", decode(image), {
          contentType: "image/png",
        });

      if (error) {
        console.error("Upload Error:", error);
        return;
      }

      const fileUrl = `https://gjlwbqugbiqwrohmgcnr.supabase.co/storage/v1/object/public/images/${fileName}.png`;

      const { error: insertError } = await supabase.from("CategoryItems").insert([
        {
          name,
          cost,
          url,
          image: fileUrl,
          note,
          category_id: categoryId,
        },
      ]);

      if (insertError) {
        console.error("Insert Error:", insertError);
        return;
      }

      ToastAndroid.show("Item Added!", ToastAndroid.SHORT);

      router.replace({
        pathname: "/category-detail",
        params: { categoryId },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGE PICKER */}
        <TouchableOpacity style={styles.imageWrapper} onPress={onImagePicker}>
          <BlurView intensity={50} tint="light" style={styles.imageBlur}>
            <Image source={{ uri: previewImage }} style={styles.image} />
          </BlurView>
        </TouchableOpacity>

        {/* FORM FIELDS */}
        <View style={styles.inputWrapper}>
          <Ionicons name="pricetag" size={22} color={colors.TEXT_LIGHT} />
          <TextInput
            placeholder="Item Name"
            placeholderTextColor={colors.TEXT_LIGHT}
            style={styles.input}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputWrapper}>
          <FontAwesome name="rupee" size={22} color={colors.TEXT_LIGHT} />
          <TextInput
            placeholder="Cost"
            placeholderTextColor={colors.TEXT_LIGHT}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={setCost}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Feather name="link-2" size={22} color={colors.TEXT_LIGHT} />
          <TextInput
            placeholder="Url (Optional)"
            placeholderTextColor={colors.TEXT_LIGHT}
            style={styles.input}
            onChangeText={setUrl}
          />
        </View>

        <View style={[styles.inputWrapper, { height: 120, alignItems: "flex-start" }]}>
          <FontAwesome name="pencil-square-o" size={22} color={colors.TEXT_LIGHT} />
          <TextInput
            placeholder="Note"
            placeholderTextColor={colors.TEXT_LIGHT}
            style={[styles.input, { height: "100%", textAlignVertical: "top" }]}
            multiline
            onChangeText={setNote}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[
            styles.button,
            (!name || !cost || loading) && { opacity: 0.6 },
          ]}
          disabled={!name || !cost || loading}
          onPress={onClickAdd}
        >
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            <Text style={styles.buttonText}>Add Item</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  imageWrapper: {
    alignSelf: "center",
    width: 160,
    height: 160,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 25,
  },

  imageBlur: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 22,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    borderWidth:2,
    borderColor: "rgba(31, 26, 26, 0.25)",
    
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 14,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "rgba(31, 26, 26, 0.25)",
    backgroundColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },

  input: {
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
    color: colors.TEXT_DARK,
  },

  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    marginTop: 30,
    shadowColor: colors.PRIMARY,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },

  buttonText: {
    color: colors.WHITE,
    fontSize: 19,
    textAlign: "center",
    fontWeight: "600",
  },
});
