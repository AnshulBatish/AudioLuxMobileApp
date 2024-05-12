import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Text } from "react-native-paper";

const NoiseThresholdSlider = () => {
  const [noiseThreshold, setNoiseThreshold] = useState(0);

  const handleSliderChange = (newValue) => {
    setNoiseThreshold(newValue);
  };

  const handleInputChange = (inputValue) => {
    setNoiseThreshold(inputValue);
  };

  return (
    <>
      <Text variant="titleMedium" style={styles.title}>Noise Threshold</Text>
      <View style={styles.container}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          minimumTrackTintColor="#38d860"
          value={noiseThreshold}
          onValueChange={handleSliderChange}
        />
        <TextInput
          style={styles.textInput}
          value={noiseThreshold.toString()}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
      </View>
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

export default NoiseThresholdSlider;
