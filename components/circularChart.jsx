import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

const screenWidth = Dimensions.get("window").width;

export default function CircularChart({ categoryList }) {
  const [chartData, setChartData] = useState([]);
  const [totalEstimate, setTotalEstimate] = useState(0);

  useEffect(() => {
    prepareChartData();
  }, [categoryList]);

  const prepareChartData = () => {
    let total = 0;
    const data = categoryList.map((category, index) => {
      let cost = 0;

      category.CategoryItems?.forEach((item) => {
        if (typeof item.cost === "number") {
          cost += item.cost;
        }
      });

      total += cost;

      return {
        name: category.name,
        cost,
        color: colors.COLOR_LIST[index % colors.COLOR_LIST.length],
        legendFontColor: "#333",
        legendFontSize: 14,
      };
    });

    if (data.length === 0 || total === 0) {
      setChartData([
        {
          name: "NA",
          cost: 1,
          color: colors.GRAY,
          legendFontColor: "#333",
          legendFontSize: 14,
        },
      ]);
      setTotalEstimate(0);
    } else {
      setChartData(data);
      setTotalEstimate(total);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Total Estimate: <Text style={styles.bold}>₹{totalEstimate}</Text>
      </Text>

      <PieChart
        data={chartData}
        width={screenWidth - 60}
        height={220}
        chartConfig={{
          color: () => `#000`,
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
        }}
        accessor={"cost"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[0, 0]}
        absolute
      />
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
  headerText: {
    fontSize: 20,
    fontFamily: "outfit",
  },
  bold: {
    fontFamily: "outfit-bold",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  legendText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
