import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseInfo from "../components/CourseDetail/CourseInfo";
import { supabase } from "../utils/SuperbaseConfig";
import CourseItemList from "../components/CourseDetail/CourseItemList";
import colors from "../utils/colors";

export default function CategoryDetail() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setCategoryData] = React.useState([]);
  const router = useRouter()
  useEffect(() => {
    console.log("categoryId", categoryId);
    categoryId && getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("id", categoryId)
      .single();
    if (data) {
      setCategoryData(data);
      console.log("data", data);
    } else {
      console.log("error", error);
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 20,flex:1 }}>
        <TouchableOpacity onPress={()=>router.back()}>
      <Ionicons name="arrow-back-circle" size={44} color="black" />
        </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
      <CourseItemList categoryData={categoryData} />

      <Link
      href={{
        pathname:'/addNewCategoryItem',
        param:{
          categoryId:categoryData.id
        }
      }}
      style={{position:"absolute",bottom:16,right:16}}>
      <Ionicons name="add-circle" size={64} color={colors.PRIMARY} />
      </Link>
    </View>
  );
}
