import { SafeAreaView, View } from "react-native";
import Device from "../components/devices";
import { StatusBar } from "expo-status-bar";
import { AddDevice } from "../components/buttons";

const Home = () => {
  return (
    <View>
      <StatusBar style="light" />
      <SafeAreaView>
        <Device />
        <AddDevice />
      </SafeAreaView>
    </View>
  );
};

export default Home;
