import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Portal, Snackbar, Text } from "react-native-paper";

const Brightness = ({data, setData}) => {
  const convertToPercentage = (value) => {
    return Math.round((value / 255) * 100);
  }

  const [brightness, setBrightness] = useState(data.brightness);
  const [percentage, setPercentage] = useState(convertToPercentage(brightness));
  const [visible, setVisible] = useState(false);

  // console.log("Brightness Data: ", data);

  const onDismissSnackBar = () => setVisible(false);

  const handleSliderChange = (input) => {
    setPercentage(input);
    setBrightness(Math.round((input / 100) * 255));
    setVisible(false);
  };

  useEffect(() => {
    setData({
     ...data,
      brightness: brightness,
    });
  }, [brightness])

  const handleInputChange = (input) => {
    if (input === "") {
      setPercentage(0);
      setBrightness(0);
    }

    // Convert the input to a number
    const inputValue = parseFloat(input);

    // Validate that it's a number and within 0-100
    if (isNaN(inputValue) || inputValue < 0 || inputValue > 100) {
      // console.error("Input must be between 0 and 100");
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
        {/* <TextInput
          style={styles.textInput}
          value={brightness.toString()}
          onChangeText={handleInputChange}
          keyboardType="numeric"
          editable={false}
        /> */}
        <TextInput
          style={styles.textInput}
          value={percentage.toString()}
          onChangeText={handleInputChange}
          keyboardType="numeric"
        />
        <Portal>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={3000}
            style={{position: "relative", top: -500}}
          >
            Input must be between 0 and 100 and a whole number.
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
