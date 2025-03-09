import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import services from "../../utils/services";
import { client } from "../../utils/kindeConfig";
import { supabase } from "../../utils/SuperbaseConfig";
import Headers from "../../components/headers";
import colors from "../../utils/colors";
import CircularChart from "../../components/circularChart";
import Ionicons from "@expo/vector-icons/Ionicons";
import CategoryList from "../../components/CategoryList";
export default function Home() {

  const router = useRouter();
  const [categoryList, setCategoryList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
      checkUserAuth();
    getCategoryList();
  }, []);

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login"); 
    }
  };

  const handleLogout = async () => {
    const loggout = await client.logout();
    if (loggout) {
      await services.storeData("login", "false");
      router.replace("/login");
    }
  };
  const getCategoryList = async () => {
    setLoading(true);
    // const user = await client.getUserDetails()
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryItems(*)");
    // .eq('created_by',user.email )
    if (error) {
      console.log("error", error);
    } else {
      setCategoryList(data);
    }
    data && setLoading(false);
  };
  return (
    <View style={{ marginTop: 30, flex: 1 }}>
      <ScrollView
showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategoryList()}
            refreshing={loading}
          />
        }
      >
        <View
          style={{ padding: 20, backgroundColor: colors.PRIMARY, height: 150 }}
        >
          <Headers />
        </View>
        <View style={{ padding: 20, marginTop: -75 }}>
          <CircularChart categoryList={categoryList}/>
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <Link href={"/add-new-category"} style={styles.container}>
        <Ionicons name="add-circle" size={64} color={colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
