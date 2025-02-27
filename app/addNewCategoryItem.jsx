import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import colors from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/SuperbaseConfig";
import { decode } from "base64-arraybuffer";

const placeholder =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";
export default function AddNewCategoryItem() {
  const [image, setImage] = React.useState(placeholder);
  const [previewImage, setPreviewImage] = React.useState(placeholder);

  const [name, setName] = React.useState();
  const [uri, setUri] = React.useState();
  const [cost, setCost] = React.useState();
  const [note, setNote] = React.useState();

  const onImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  const onClickAdd = async () => {
    const fileName = Date.now();
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName + ".png", decode(image), {
        contentType: "image/png",
      });

    if (data) {
const fileUrl = "https://gjlwbqugbiqwrohmgcnr.supabase.co/storage/v1/object/public/images/"+data.path
      console.log("File Upload:", fileUrl);
    } else {
      console.log("Upload Error", error);
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => onImagePicker()}>
          <Image
            source={{ uri: previewImage }}
            style={{
              width: 150,
              height: 150,
              backgroundColor: colors.GRAY,
              borderRadius: 15,
            }}
          />
        </TouchableOpacity>
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
          <Ionicons name="pricetag" size={24} color="gray" />
          <TextInput
            placeholder="Item Name"
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
          <FontAwesome name="rupee" size={24} color="gray" />
          <TextInput
            placeholder="Cost"
            style={{ fontSize: 17, width: "100%" }}
            keyboardType="number-pad"
            onChangeText={(value) => setCost(value)}
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
          <Feather name="link-2" size={24} color="gray" />
          <TextInput
            placeholder="Url"
            style={{ fontSize: 17, width: "100%" }}
            onChangeText={(value) => setUri(value)}
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
          <FontAwesome name="pencil-square-o" size={24} color="gray" />
          <TextInput
            placeholder="Note"
            style={{ fontSize: 17, width: "100%" }}
            numberOfLines={4}
            onChangeText={(value) => setNote(value)}
          />
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: colors.PRIMARY,
            borderRadius: 99,
            marginTop: 25,
          }}
          disabled={!name || !cost}
          onPress={() => onClickAdd()}
        >
          <Text
            style={{
              color: colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 20,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
