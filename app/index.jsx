import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  ScrollView,
} from "react-native";

import Device from "../components/devices";
import { StatusBar } from "expo-status-bar";
import { AddDevice } from "../components/buttons";
// import { FAB, AnimatedFAB } from "react-native-paper";
import { DarkTheme } from "@react-navigation/native";
import { AnimatedFAB } from "react-native-paper";
import { useState } from "react";

const Home = ({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) => {
  const [isExtended, setIsExtended] = useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <Device onScroll={onScroll}/>
      <AnimatedFAB
        icon={"plus"}
        label={"Add Device"}
        color="black"
        extended={isExtended}
        onPress={() => console.log("Pressed")}
        visible={visible}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 10,
    backgroundColor: "white",
    borderWidth: 7,
    borderColor: "red",
  },
  fabStyle: {
    marginBottom: 10,
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: "white",
  },
});
