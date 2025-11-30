import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import colors from "../utils/colors";

export default function CategoryList({ categoryList }) {
  const router = useRouter();

  const onCategoryClick = (category) => {
    router.push({
      pathname: "/category-detail",
      params: {
        categoryId: category.id,
      },
    });
  };

  const calculateTotalCost = (categoryItems) => {
    let totalCost = 0;
    categoryItems.forEach((item) => {
      totalCost = totalCost + item.cost;
    });
    return totalCost;
  };

  return (
    <View style={styles.sectionWrapper}>
      <Text style={styles.title}>Latest Budget</Text>
      <View style={styles.divider} />

      <View>
        {categoryList?.map((category, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
            android_ripple={{
              color: "rgba(255,255,255,0.15)",
              borderless: false,
            }}
            onPress={() => onCategoryClick(category)}
          >
            <View style={[styles.iconBox, { backgroundColor: category.color }]}>
              <Text style={styles.icon}>{category.icon}</Text>
            </View>

            <View style={styles.textBlock}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.itemCount}>
                {category.CategoryItems?.length} Items
              </Text>
            </View>

            <Text style={styles.cost}>
              ₹{calculateTotalCost(category.CategoryItems)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 sectionWrapper: {
  backgroundColor: "rgba(255,255,255,0.12)",
  borderRadius: 20,
  marginTop: 20,
  // padding: 12,           
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.25)",
  overflow: "hidden",
},

  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  marginLeft: 15,
    color: "gray",
  },

  divider: {
    width: "100%",
    backgroundColor: colors.GRAY,
    height: 2,
    borderRadius: 99,
    marginTop: 12,
    marginBottom: 20,
  },

  card: {
  flexDirection: "row",
  alignItems: "center",
  padding: 15,
  borderRadius: 18,
  backgroundColor: "rgba(185, 197, 223, 0.1)", 
  borderColor: "rgba(62, 89, 126, 0.2)",
  borderWidth: 2,
  marginBottom: 12,
},
  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 26,
  },

  textBlock: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 10,
  },

  categoryName: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    color: colors.TEXT_DARK,
  },

  itemCount: {
    fontFamily: "outfit",
    fontSize: 14,
    color: colors.TEXT_LIGHT,
  },

  cost: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    minWidth: 70,
    textAlign: "right",
    flexShrink: 0, // prevents cutting
  },
});
