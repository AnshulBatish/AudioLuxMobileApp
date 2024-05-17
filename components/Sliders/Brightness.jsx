import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Portal, Snackbar, Text } from "react-native-paper";

const Brightness = ({ data, update }) => {
  const convertToPercentage = (value) => {
    return Math.round((value / 255) * 100);
  };

  const [brightness, setBrightness] = useState(data.brightness);
  const [percentage, setPercentage] = useState(convertToPercentage(brightness));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // console.log("Slider change 2.0: ", brightness);
    update("brightness", brightness);
  }, [brightness]);

  const handleSliderChange = async (input) => {
    setPercentage(input);
    setBrightness(Math.round((input / 100) * 255));
    setVisible(false);
  };

  const handleInputChange = (input) => {
    // Convert the input to a number
    const inputValue = parseFloat(input);

    console.log("Input Value: ", inputValue);

    // Validate that it's a number and within 0-100
    if (isNaN(inputValue)) {
      setPercentage(0);
      setBrightness(0);
    } else if (inputValue < 0 || inputValue > 100) {
      setPercentage(Math.min(Math.max(inputValue, 0), 100));
      setBrightness(Math.min(Math.max(inputValue, 0), 255));
      setVisible(true);
    } else {
      setPercentage(inputValue);
      setBrightness(Math.round((inputValue / 100) * 255));
      setVisible(false);
    }
  };

  return (
    <>
      <Text variant="titleMedium" style={styles.title}>
        Brightness (%)
      </Text>
      <View style={styles.container}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          minimumTrackTintColor="#e5b62a"
          value={percentage}
          onValueChange={handleSliderChange}
        />
        <TextInput
          style={styles.textInput}
          value={percentage.toString()}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
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
            Input must be between 0 and 100.
          </Snackbar>
        </Portal>
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

export default Brightness;
