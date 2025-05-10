import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import colors from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/SuperbaseConfig";
import { decode } from 'base64-arraybuffer'
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
setLoading(true)
    const fileName = Date.now();

 

    // Ensuring the image is a valid base64 string
    if (!image) {
      console.error("No image data available.");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName + ".png", decode(image), {
          contentType: "image/png",
        });

      if (error) {
        console.error("Error uploading image:", error);
        return;
      }

      // If the image upload is successful, insert into the database
      const fileUrl =
        "https://gjlwbqugbiqwrohmgcnr.supabase.co/storage/v1/object/public/images/" +
        fileName +
        ".png";

      const { data: insertData, error: insertError } = await supabase
        .from("CategoryItems")
        .insert([
          {
            name: name,
            cost: cost,
            url: url,
            image: fileUrl,
            note: note,
            category_id: categoryId,
          },
        ])
        .select();

      if (insertError) {
        console.error("Error inserting data into CategoryItems:", insertError);
        return;
      }

      ToastAndroid.show("New Item Added!!!", ToastAndroid.SHORT);
      router.replace({
        pathname: "/category-detail",
        params: {
          categoryId: categoryId,
        },
      });
    } catch (error) {
      console.error("An error occurred:", error);
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
            style={{ fontSize: 17, width: "100%" , height: 40}}
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
            style={{ fontSize: 17, width: "100%" , height: 40}}
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
            style={{ fontSize: 17, width: "100%", height: 40  }}
            onChangeText={(value) => setUrl(value)}
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
            style={{ fontSize: 17, width: "100%", height: 70  }}
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
          disabled={!name || !cost || loading}
          onPress={() => onClickAdd()}
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
              Add
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
