import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo"; 
import { Link, useRouter } from "expo-router";
import services from "../../utils/services";
import { supabase } from "../../utils/SuperbaseConfig";
import Headers from "../../components/headers";
import colors from "../../utils/colors";
import CircularChart from "../../components/circularChart";
import Ionicons from "@expo/vector-icons/Ionicons";
import CategoryList from "../../components/CategoryList";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";



export default function Home() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Track internet status

const { email,setEmail } = useContext(AuthContext);

  useEffect(() => {
    // Fetch initial internet connection status
    NetInfo.fetch().then((state) => setIsConnected(state.isConnected));

    // Subscribe to internet status changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        getCategoryList(); // Auto-refresh data when internet restores
      }
    });

    checkUserAuth();
    
    return () => {
      unsubscribe(); // Cleanup listener when component unmounts
    };
  }, []);

  useEffect(() => {
    if (email) {
      getCategoryList();
    }
  }, [email]);

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    const storedEmail = await services.getData("user_email");

    if (!result || result !== "true") {
      router.replace("/");
    } else {
      if (storedEmail) {
        setEmail(storedEmail);     
 }
    }
  };

  const getCategoryList = async () => {
    if (!isConnected) {
      Alert.alert("No Internet", "Please check your internet connection.");
      return;
    }

    setLoading(true);
    const storedEmail = await services.getData("user_email");
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)")
      .eq("created_by", storedEmail);

    if (error) {
      console.log("Error fetching categories:", error);
    } else {
      setCategoryList(data || []);
    }
    setLoading(false);
  };

  return (
<ProtectedRoute>
    <View style={{ marginTop: 30, flex: 1 }}>
      {/* No Internet Connection Warning */}
      {!isConnected && (
        <View style={styles.noInternet}>
          <Ionicons name="wifi-off" size={24} color="white" />
          <Text style={styles.noInternetText}>No Internet Connection</Text>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={() => getCategoryList()} refreshing={loading} />
        }
      >
        <View style={{ padding: 20, backgroundColor: colors.PRIMARY, height: 150 }}>
          <Headers />
        </View>
        <View style={{ padding: 20, marginTop: -75 }}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>

      {/* Add Category Button */}
      <Link href={"/add-new-category"} style={styles.container}>
        <Ionicons name="add-circle" size={64} color={colors.PRIMARY} />
      </Link>
    </View>
</ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  noInternet: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 1,
  },
  noInternetText: {
    color: "white",
    marginLeft: 8,
  },
});
