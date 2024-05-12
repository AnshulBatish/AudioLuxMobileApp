import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TransparencySlider from "./Sliders/Transparency";
import NoiseThresholdSlider from "./Sliders/NoiseThreshold";
import SmoothingSlider from "./Sliders/Smoothing";
import ColorPickerSlider from "./Sliders/ColorPicker";
import Brightness from "./Sliders/Brightness";
import MinColorPickerSlider from "./Sliders/MinColorPicker";
import { getLoadedPatternSettings } from "../utils/api";
import Hue from "./Sliders/Hue";

export default function PatternSettings({ pattern }) {
  const scrollViewRef = useRef(null);

  // Flag representing if initial data has been obtained from
  // the device.
  const [loading, setLoading] = useState(true);

  // Flag that tells the object to update the NanoLux device with new data.
  const [updated, setUpdated] = useState(false);

  const [isConnected, setIsConnected] = useState(true);

  // Subpattern data structure
  const [data, setData] = useState({
    idx: 0,
    hue_max: 255,
    hue_min: 0,
    brightness: 127,
    smoothing: 100,
    direction: 0,
  });

  // Fetch initial data once
  useEffect(() => {
    getLoadedPatternSettings()
      .then((fetchedData) => setData(fetchedData))
      .finally(() => setLoading(false));
  }, []);

  console.log("Brightness Data: ", data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
    >
      {/* <View style={styles.contentContainer}> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Hue data={data} setData={setData} />
        <Brightness data={data} setData={setData} />
        <SmoothingSlider data={data} setData={setData} />
        <NoiseThresholdSlider />
      </ScrollView>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginBottom: 60,
    height: "100%",
  },
  scrollView: {
    marginBottom: 120, //
    marginTop: 5,
  },
  contentContainer: {
    paddingVertical: 20, // Padding around the content inside the scroll view
    marginBottom: 60, //
  },
});
