import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { BlurView } from "expo-blur";
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
        cost: cost,
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
      return;
    }

    setChartData(data);
    setTotalEstimate(total);
  };

  return (
    <BlurView intensity={70} tint="light" style={styles.chartCard}>
      <Text style={styles.headerText}>
        Total Estimate: <Text style={styles.bold}>₹{totalEstimate}</Text>
      </Text>

      <PieChart
        data={chartData.map((item) => ({
          name: item.name,
          population: item.cost,
          color: item.color,
          legendFontColor: "#333",
          legendFontSize: 14,
        }))}
        width={screenWidth - 40}
        height={210}
        chartConfig={{
          color: () => "white",
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="40"
        hasLegend={false} 
      />

      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendRow}>
            <View
              style={[styles.legendDot, { backgroundColor: item.color }]}
            />

            <Text style={styles.legendLabel} numberOfLines={1}>
              {item.name}
            </Text>

            <Text style={styles.legendValue}>₹{item.cost}</Text>
          </View>
        ))}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: "rgba(146, 151, 219, 0.15)",
    borderRadius: 20,
    borderColor: "rgba(48, 56, 121, 0.25)",
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 15,
    marginTop: -15,
    overflow: "hidden",
  },

  headerText: {
    fontSize: 22,
    fontFamily: "outfit",
    marginBottom: 10,
  },

  bold: {
    fontFamily: "outfit-bold",
  },

  legendContainer: {
    width: "100%",
    marginTop: 10,
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  legendLabel: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
  },

  legendValue: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
});
