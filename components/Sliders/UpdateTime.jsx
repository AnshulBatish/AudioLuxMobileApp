import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Portal, Snackbar, Text } from "react-native-paper";

const UpdateTime = ({data, update}) => {
  const [updateTime, setUpdateTime] = useState(data.loop);
  const [visible, setVisible] = useState(false);

  const handleSliderChange = (newValue) => {
    setUpdateTime(newValue);
  };

  const handleInputChange = (input) => {
    // Convert the input to a number
    const inputValue = parseFloat(input);

    console.log("Input Value: ", inputValue);

    // Validate that it's a number and within 0-100
    if (isNaN(inputValue)) {
      setUpdateTime(0);
    } else if (inputValue < 0 || inputValue > 255) {
      setUpdateTime(Math.min(Math.max(inputValue, 0), 255)); // Ensure the value is between 0 and 255
      setVisible(true); // Show error message
    } else {
      setUpdateTime(inputValue);
      setVisible(false);
    }
  };

  useEffect(() => {
    update("loop", updateTime);
  }, [updateTime]);

  return (
    <>
      <Text variant="titleMedium" style={styles.title}>LED Update Time (ms)</Text>
      <View style={styles.container}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          minimumTrackTintColor="#ff4242"
          value={updateTime}
          onValueChange={handleSliderChange}
        />
        <TextInput
          style={styles.textInput}
          value={updateTime.toString()}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
      </View>
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          action={{
            label: "close",
          }}
          duration={3000}
          style={{ backgroundColor: "white", borderColor: "red", borderWidth: "3px" }}
        >
          Input must be between 0 and 255.
        </Snackbar>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  slider: {
    width: "75%",
  },
  title: {
    color: "black",
    marginHorizontal: 22,
    fontWeight: "600"
  },
  textInput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default UpdateTime;
