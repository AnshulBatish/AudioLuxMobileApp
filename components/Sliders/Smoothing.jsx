import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Portal, Snackbar, Text } from "react-native-paper";

const SmoothingSlider = ({ data, update }) => {
  const [smoothing, setSmoothing] = useState(data.smoothing);
  const [visible, setVisible] = useState(false);

  const handleSliderChange = (newValue) => {
    setSmoothing(newValue);
  };

  const handleInputChange = (input) => {
    // Convert the input to a number
    const inputValue = parseFloat(input);

    console.log("Input Value: ", inputValue);

    // Validate that it's a number and within 0-100
    if (isNaN(inputValue)) {
      setSmoothing(0);
    } else if (inputValue < 0 || inputValue > 255) {
      setSmoothing(Math.min(Math.max(inputValue, 0), 255)); // Ensure the value is between 0 and 255
      setVisible(true); // Show error message
    } else {
      setSmoothing(inputValue);
      setVisible(false);
    }
  };

  useEffect(() => {
    update("smoothing", smoothing);
  }, [smoothing]);

  return (
    <>
      <Text variant="titleMedium" style={styles.title}>
        Smoothing
      </Text>
      <View style={styles.container}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          minimumTrackTintColor="#427bff"
          value={smoothing}
          onValueChange={handleSliderChange}
        />
        <TextInput
          style={styles.textInput}
          value={smoothing.toString()}
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
    fontWeight: "600",
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

export default SmoothingSlider;
