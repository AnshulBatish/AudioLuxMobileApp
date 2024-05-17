import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StripLength from "./Sliders/StripLength";
import UpdateTime from "./Sliders/UpdateTime";
import { updateDeviceSettings } from "../utils/api";
import { useConnectivity } from "../utils/useConnectivity";
import { Divider, useTheme } from "@rneui/themed";

export default function SystemSettings() {
  // Checks if the web app is connected to the device.
  const { isConnected } = useConnectivity();

  // Flag representing if initial data has been obtained from
  // the device.
  const [loading, setLoading] = useState(true);

  // Flag that tells the object to update the NanoLux device with new data.
  const [updated, setUpdated] = useState(false);

  // System settings data structure
  const [data, setData] = useState({
    length: 60,
    loop: 40,
    debug: 0,
  });

  /**
   * @brief Manages initial querying of the data from the NanoLux device.
   * 		  Sets the loading flag to false when done.
   */
  useEffect(() => {
    if (isConnected) {
      getDeviceSettings()
        .then((data) => setData(data))
        .then(setLoading(false));
    }
  }, [isConnected]);

  /**
   * @brief Updates the pattern on the Nanolux device
   * if it is connected and has modified data,
   * then flags the data structure.
   */
  useEffect(() => {
    if (isConnected && updated) {
      updateDeviceSettings(data);
      setUpdated(false);
    }
  }, [updated]);

  /**
   * @brief Updates a parameter in the subpattern data structure with a new value.
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
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <Text style={styles.horizontalText}>System Settings</Text>
        <Divider
          width={5}
          color="black"
          style={{ width: "90%", alignSelf: "center" }}
        />
      </View>
      <StripLength data={data} update={update} />
      <UpdateTime data={data} update={update} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  horizontal: {
    marginVertical: 20,
    alignItems: "flex-start",
  },
  horizontalText: {
    textAlign: "start",
    fontSize: 22,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
