import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  Text,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
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
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const { email, setEmail } = useContext(AuthContext);

  useEffect(() => {
    NetInfo.fetch().then((state) => setIsConnected(state.isConnected));
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        getCategoryList();
      }
    });

    checkUserAuth();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (email) {
      getCategoryList();
    }
  }, [email]);

  const checkUserAuth = async () => {
    try {
      const result = await services.getData("login");
      const storedEmail = await services.getData("user_email");

      if (!result || result !== "true") {
        router.replace("/");
      } else if (storedEmail) {
        setEmail(storedEmail);
      }
    } catch (e) {
      console.log("Auth check error:", e); 
    }
  };

  const getCategoryList = async () => {
    try {
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
    } catch (e) {
      console.log("getCategoryList error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
  <ProtectedRoute>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,backgroundColor: colors.YELLOW}}>
          <Text>✅ Just In Case</Text>
      </View>
</ProtectedRoute>
    );
  }

 return (
<ProtectedRoute>
  <View style={{ flex: 1, backgroundColor: "transparent" }}>
      
      {!isConnected && (
        <View style={styles.noInternet}>
          <Ionicons name="wifi-off" size={24} color="white" />
          <Text style={styles.noInternetText}>No Internet Connection</Text>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: "transparent" }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getCategoryList} />
        }
      >
        <View style={styles.headerWrapper}>
          <Headers />
        </View>

        <View style={styles.bodyWrapper}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>

      <Link href="/add-new-category" style={styles.fabContainer}>
        <View style={styles.fabButton}>
          <Ionicons name="add" size={40} color="#fff" />
        </View>
      </Link>

   </View>
</ProtectedRoute>

);
};

const styles = StyleSheet.create({
  headerWrapper: {
    height: 180,
    paddingHorizontal: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: colors.PRIMARY,
    elevation: 8,
  },

  bodyWrapper: {
    padding: 20,
    marginTop: -60,
  },

  fabContainer: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },

  fabButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#4C6FFF",
  },

  noInternet: {
    backgroundColor: "#FF4B4B",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  noInternetText: {
    color: "white",
    marginLeft: 8,
  },
});