import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable>
          <Image
            // source={require("../assets/images/Horizontal-CymaSpace.png")}
            source={require("../assets/images/Transparent-Cymaspace-Logo.png")}
            style={styles.logo}
          />
        </Pressable>
        <Pressable>
          <Text style={styles.fontStyle}>AudioLux</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1F1F1F",
  },
  container: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "outset",
    borderBottomWidth: 2,
  },
  logo: {
    height: 35,
    width: 100,
  },
  titleContainer: {
    flex: 1,
  },
  fontStyle: {
    fontFamily: "KSRegular",
    color: 'white',
    margin: 2,

  },
});
