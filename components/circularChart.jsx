import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import PieChart from "react-native-pie-chart";
import colors from "../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CircularChart({ categoryList }) {
  const widthAndHeight = 150;
  const [value, setValue] = React.useState([1]);
  const [sliceColor, setSliceColor] = React.useState([colors.ORANGE]);
const [totalCalculatedEstimate,setTotalCalulatedEstimate] = React.useState(0)

  // const series = [
  //   { value: 123, color: colors.GRAY },
  // ]

  // useEffect(() => {
  //   updateCircularChart();
  // }, []);

  // const updateCircularChart = () => {
//     setSliceColor([]);
//     setValue([]);
// let totalEstimate = 0
//     categoryList.forEach((item, index) => {
//       let itemTotalCost = 0;
//       item.CategoryItems?.forEach((item_) => {
//         itemTotalCost = itemTotalCost + item_.cost;
// totalEstimate = totalEstimate+item_.cost
//       });
// setTotalCalulatedEstimate(totalEstimate)
//       setSliceColor((sliceColor) => [...sliceColor, colors.COLOR_LIST[index]]);
//       setValue((value) => [...value, itemTotalCost]);
//     });
//   };

useEffect(() => {
  updateCircularChart();
}, [updateCircularChart]);

const updateCircularChart = () => {
  let totalEstimate = 0;
  let newSliceColor = [];
  let newValues = [];

  if (!categoryList || categoryList.length === 0) {
    return;
  }

  categoryList.forEach((item, index) => {
    let itemTotalCost = 0;
    
    if (item.CategoryItems && item.CategoryItems.length > 0) {
      item.CategoryItems.forEach((item_) => {
        if (item_.cost && typeof item_.cost === "number") {
          itemTotalCost += item_.cost;
          totalEstimate += item_.cost;
        }
      });
    }

    newSliceColor.push(colors.COLOR_LIST[index]);
    newValues.push(itemTotalCost);
  });

  if (totalEstimate === 0) {
    return;
  }

  setSliceColor(newSliceColor);
  setValue(newValues);
  setTotalCalulatedEstimate(totalEstimate);
};



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: "outfit" }}>
        Total Estimate: <Text style={{ fontFamily: "outfit-bold" }}>₹{totalCalculatedEstimate}</Text>
      </Text>
      <View style={styles.subcontainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={value}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#fff"}
        />
        {categoryList.length == 0 ? 
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              marginTop: 10,
            }}
          >
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={colors.GRAY}
            />
            <Text>NA</Text>
          </View>
         : 
          <View>
{categoryList.map((category,index)=>(
<View key={index} style={{
              display: "flex",
              flexDirection: "row",
              // gap: 5,
              marginTop: 8,
marginRight:10
            }}>
 <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={colors.COLOR_LIST[index]}
            />
            <Text>{category.name}</Text>
</View>
))}
</View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  subcontainer: {
    display: "flex",
    marginTop: 20,
    flexDirection: "row",
    gap: 50,
  },
});
