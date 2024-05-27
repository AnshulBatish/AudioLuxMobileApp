import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import NetInfo from "@react-native-community/netinfo";

export default function AddNewDevice() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ipAddress, setIpAddress] = useState(null); // New state for SSID
  const [isWifiConnected, setIsWifiConnected] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    console.log("IPADDRESS: " + ipAddress);
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("---------------------------------------------------------------\n")
      console.log("Connection", state);
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      // console.log("Details:", state.details);
      // if (state.type === "wifi" && state.isConnected) {
        setIpAddress(state.details.ipAddress); // Set IP Address if connected to Wi-Fi
      // }
    });

    return () => {
      unsubscribe(); // Cleanup
    };
  }, [ipAddress]);

  return (
    <View style={styles.container}>
      {ipAddress ? <Text style={styles.paragraph}>Please Connect to an AudioLux Device through your WiFi Page</Text> : <Text style={styles.paragraph}>Waiting...</Text>}
      <Text>{ipAddress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontFamily: "KSBold",
    fontSize: 30,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 30,
  },
});
