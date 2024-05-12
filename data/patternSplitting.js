import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PatternSplitting from "../components/PatternSplitting";
import ControlDevice from "../app/pattern/ControlDevice";
import { SegmentedButtons } from "react-native-paper";

const Page = () => {
  const [counter, setCounter] = useState(1);
  // Flag representing if initial data has been obtained from
  // the device.
  const [loading, setLoading] = useState(true);

  // Flag that tells the object to update the NanoLux device with new data.
  const [updated, setUpdated] = useState(false);

  // Stores the subpattern currently selected as an object state.
  const [selectedSubpattern, setSubpattern] = useState(0);

  // Pattern-level data structure
  const [data, setData] = useState({
    subpattern_count: 1,
    alpha: 0,
    mode: 0,
    noise: 20,
  });

  /**
   * @brief Updates a parameter in the subpattern data structure with a new value.
   * @param ref The string reference to update in the data structure
   * @param value The new value to update the data structure with
   */
  const update = (ref, value) => {
    if (!loading) {
      setData((oldData) => {
        let newData = Object.assign({}, oldData);
        newData[ref] = value;
        return newData;
      });
    }
    setUpdated(true);
  };

  /**
   * @brief Increments the amount of subpatterns displayed. If the pattern is at
   * maximum subpatterns, the function will refuse to increment.
   */
  const incrementSubpatterns = async () => {
    if (data.subpattern_count < RANGE_CONSTANTS.SUBPATTERN_MAX) {
      update("subpattern_count", data.subpattern_count + 1);
    }
  };

  useEffect(() => {
    console.log("Counter updated:", counter);
  }, [counter]);

  function incrementCount() {
    const count = counter + 1;
    setCounter(count);
  }

  function decrementCount() {
    const count = counter - 1;
    setCounter(count);
  }

  // State to hold the value of the selected segmented button
  const [selectedValue, setSelectedValue] = useState("");

  // Initial set of buttons
  const initialButtons = [];

  // State to hold the dynamic list of buttons
  const [buttons, setButtons] = useState(initialButtons);

  // Function to add a new button to the list
  const addButton = () => {
    const newButton = {
      value: `${buttons.length + 1}`,
      label: `Pattern ${buttons.length + 1}`,
      uncheckedColor: "black",
      checkedColor: "white",
    };
    setButtons([...buttons, newButton]);

    incrementCount();
  };

  // Function to remove the last button from the list
  const removeButton = () => {
    if (buttons.length > 0) {
      setButtons(buttons.slice(0, -1)); // Remove the last element from the list
    }

    decrementCount();
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <View>
      <PatternSplitting isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn}/>
      {/* <ControlDevice /> */}

      {isSwitchOn && (
      <>
        <SegmentedButtons
          value={selectedValue}
          onValueChange={setSelectedValue}
          buttons={buttons}
          style={styles.segmentedButtons}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Option" onPress={addButton} />
          <Button title="Remove Option" onPress={removeButton} color="red" />
        </View>
      </>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row", // Allows multiple buttons to be displayed in a row
    justifyContent: "center",
    marginTop: 20,
  },
  segmentedButtons: {
    padding: 8,
    alignSelf: "center",
    marginTop: 7,
  },
});

export default Page;
