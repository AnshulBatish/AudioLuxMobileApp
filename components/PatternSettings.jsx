import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useConnectivity } from "../utils/useConnectivity";
import { getPattern, updatePattern } from "../utils/api";
import useInterval from "../utils/useInterval";
import SmoothingSlider from "./Sliders/Smoothing";
import Brightness from "./Sliders/Brightness";
import Hue from "./Sliders/Hue";

export default function PatternSettings({ patternID }) {
  console.log("PATTERN ID: ", patternID);
  const scrollViewRef = useRef(null);

  // Checks if the web app is connected to the device.
  const { isConnected } = useConnectivity();

  // Flag representing if initial data has been obtained from
  // the device.
  const [loading, setLoading] = useState(true);

  // Flag that tells the object to update the NanoLux device with new data.
  const [updated, setUpdated] = useState(false);

  // Pattern-level data structure
  const [data, setData] = useState({
    idx: patternID,
    hue_max: 255,
    hue_min: 0,
    brightness: 255,
    smoothing: 0,
    postprocess: 0,
  });

  /**
   * @description Updates the pattern index in the data structure with the new patternID.
   */
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      idx: patternID,
    }));
  }, [patternID]); // Add patternID to the dependency array

  /**
   * @brief Manages initial querying of the data from the NanoLux device.
   * 		  Sets the loading flag to false when done.
   */
  useEffect(() => {
    if (isConnected) {
      getPattern(num)
        .then((data) => {
          setData(data);
        })
        .then(setLoading(false));
    }
  }, [isConnected]);

  /**
   * @brief Updates the pattern on the Nanolux device
   * if it is connected and has modified data,
   * then flags the data structure.
   */
  useInterval(() => {
    if (isConnected && updated) {
      updatePattern(num, data);
      setUpdated(false);
    }
  }, 100);

  /**
   * @brief Updates a parameter in the pattern data structure with a new value.
   * @param ref The string reference to update in the data structure
   * @param value The new value to update the data structure with
   */
  const update = (ref, value) => {
    console.log(
      "REF: " + ref + ",   VALUE: " + value,
      ",   INDEX: " + data.idx
    );
    if (!loading) {
      setData((oldData) => {
        let newData = Object.assign({}, oldData);
        newData[ref] = value;
        return newData;
      });
    }

    setUpdated(true);
  };

  // console.log("Brightness Data: ", data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
    >
      {/* <View style={styles.contentContainer}> */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Hue data={data} update={update} />
        <Brightness data={data} update={update} />
        <SmoothingSlider data={data} update={update} />
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
