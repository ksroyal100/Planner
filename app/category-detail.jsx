import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";

import CourseInfo from "../components/CourseDetail/CourseInfo";
import CourseItemList from "../components/CourseDetail/CourseItemList";
import { supabase } from "../utils/SuperbaseConfig";
import colors from "../utils/colors";

export default function CategoryDetail() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = React.useState([]);
  const router = useRouter();

  useEffect(() => {
    if (categoryId) getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("id", categoryId)
      .single();

    data ? setCategoryData(data) : console.log("error", error);
  };

  return (
    <View style={styles.container}>
      {/* TOP Floating Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <BlurView intensity={40} tint="light" style={styles.backBlur}>
            <Ionicons name="chevron-back" size={30} color={colors.TEXT_DARK} />
          </BlurView>
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        bounces
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <CourseInfo categoryData={categoryData} />
        <CourseItemList
          categoryData={categoryData}
          setUpdateRecord={() => getCategoryDetail()}
        />
      </ScrollView>

      {/* Floating Add Button */}
      <Link
        href={{
          pathname: "/addNewCategoryItem",
          params: { categoryId: categoryData.id },
        }}
        style={styles.fabWrapper}
      >
       
          <Ionicons name="add-circle" size={80} color={colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 60,
  },

  header: {
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 20,
    left: 20,
    zIndex: 20,
  },

  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },

  backBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },

  fabWrapper: {
    position: "absolute",
    bottom: 28,
    right: 20,
  },

  fabBlur: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
});
