import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import colors from "../../utils/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { supabase } from "../../utils/SuperbaseConfig";
import { useRouter } from "expo-router";

export default function CourseInfo({ categoryData }) {
  const [totalCost, setTotalCost] = React.useState();
  const [percTotal, setPercTotal] = React.useState(0);

  const router = useRouter();

  useEffect(() => {
    calculateTotalPerc();
  }, [categoryData]);

  const calculateTotalPerc = () => {
    let total = 0;
    categoryData?.CategoryItems?.forEach((item) => {
      total = total + item.cost;
    });
    setTotalCost(total);
    let perc = (total / categoryData.assigned_budget) * 100;
    if (perc > 100) {
      perc = 100;
    }
    setPercTotal(perc);
  };

  const onDeleteCategory = () => {
    Alert.alert("Are you sure", "Do you want to Delete?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase
            .from("CategoryItems")
            .delete()
            .eq("category_id", categoryData.id);

          await supabase.from("Category").delete().eq("id", categoryData.id);

          ToastAndroid.show("Category deleted!", ToastAndroid.SHORT);

          router.replace("/home");
        },
      },
    ]);
  };

  return (
    <View>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "baseline" }}>
          <Text
            style={[
              { fontSize: 25, padding: 20, borderRadius: 15 },
              { backgroundColor: categoryData.color },
            ]}
          >
            {categoryData.icon}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 24 }}>
            {categoryData.name}
          </Text>
          <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
            {categoryData.CategoryItems?.length} Item
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDeleteCategory()}>
          <EvilIcons name="trash" size={44} color="red" />
        </TouchableOpacity>
      </View>
      {/* Progress Bar  */}
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Text style={{ fontFamily: "outfit-bold" }}>{totalCost}₹</Text>
        <Text style={{ fontFamily: "outfit" }}>
          Total Budget:{categoryData.assigned_budget}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: colors.GRAY,
          height: 15,
          borderRadius: 99,
          marginTop: 7,
        }}
      >
        <View
          style={[
            { backgroundColor: colors.PRIMARY, borderRadius: 99, height: 15 },
            { width: percTotal + "%" },
          ]}
        ></View>
      </View>
    </View>
  );
}
