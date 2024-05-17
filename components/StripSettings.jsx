import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StripLength from "./Sliders/StripLength";
import UpdateTime from "./Sliders/UpdateTime";
import {
  getStripSettings,
  updateDeviceSettings,
  updateStripSettings,
} from "../utils/api";
import { useConnectivity } from "../utils/useConnectivity";
import { Divider, useTheme } from "@rneui/themed";
import NoiseThresholdSlider from "./Sliders/NoiseThreshold";
import TransparencySlider from "./Sliders/Transparency";
import useInterval from "../utils/useInterval";

export default function StripSettings() {
  // Checks if the web app is connected to the device.
  const { isConnected } = useConnectivity();

  // Flag representing if initial data has been obtained from
  // the device.
  const [loading, setLoading] = useState(true);

  // Flag that tells the object to update the NanoLux device with new data.
  const [updated, setUpdated] = useState(false);

  // Strip-level data structure
  const [data, setData] = useState({
    pattern_count: 1,
    alpha:100,
    mode: 0,
    noise: 50,
  });

  /**
   * @brief Manages initial querying of the data from the NanoLux device.
   * 		  Sets the loading flag to false when done.
   */
  useEffect(() => {
    if (isConnected) {
      getStripSettings()
        .then((data) => setData(data))
        .then(setLoading(false));
    }
  }, [isConnected]);

  /**
   * @brief Updates the pattern on the Nanolux device
   * if it is connected and has modified data,
   * then flags the data structure.
   */
  // useInterval(() => {
  //   if (isConnected && updated) {
  //     updateStripSettings(data);
  //     setUpdated(false);
  //   }
  // }, 100);
  useEffect(() => {
    if (isConnected && updated) {
      updateStripSettings(data);
      setUpdated(false);
    }
  }, [updated]);

  /**
   * @brief Updates a parameter in the pattern data structure with a new value.
   * @param ref The string reference to update in the data structure
   * @param value The new value to update the data structure with
   */
  const update = (ref, value) => {
    console.log("REF: " + ref + ",   VALUE: " + value);
    if (!loading) {
      setData((oldData) => {
        let newData = Object.assign({}, oldData);
        newData[ref] = value;
        return newData;
      });
    }
    setUpdated(true);
  };

  return (
    <View>
      <View style={styles.horizontal}>
        <Text style={styles.horizontalText}>Pattern Settings</Text>
        <Divider
          width={5}
          color="black"
          style={{ width: "90%" , alignSelf: "center"}}
        />
      </View>
      <TransparencySlider data={data} update={update}/>
      <NoiseThresholdSlider data={data} update={update} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  horizontalText: {
    textAlign: "start",
    fontSize: 22,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
