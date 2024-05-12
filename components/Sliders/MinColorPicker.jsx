import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ColorPicker, {
  colorKit,
  HueSlider,
  BrightnessSlider,
  PreviewText,
  InputWidget,
} from "reanimated-color-picker";
import { Text } from "react-native-paper";

export default function MinColorPickerSlider({ scrollViewRef }) {
  const [brightness, setBrightness] = useState(0); // State to store brightness value

  const onColorSelect = (color) => {
    selectedColor.value = color.hex;
    const newBrightness = colorKit.getBrightness(color.hex); // Get brightness value
    setBrightness(newBrightness); // Update brightness state
  };

  const customSwatches = new Array(6)
    .fill("#fff")
    .map(() => colorKit.randomRgbColor().hex());

  const selectedColor = useSharedValue(customSwatches[0]);

  /**
   * TODO: Have minimum and maximum hue value on the same slider 
   */

  /**
   * TODO: Map and remap functino to convert 0-255 values to 0-100% 
   */


  return (
    <View style={styles.container}>
      <ColorPicker
        value={selectedColor.value}
        sliderThickness={25}
        thumbSize={24}
        thumbShape="circle"
        onChange={onColorSelect}
        adaptSpectrum
        boundedThumb
      >
        <Text variant="titleMedium" style={styles.sliderTitle}>
          Minimum Hue
        </Text>
        <HueSlider style={styles.sliderStyle} />

        <View style={styles.previewTxtContainer}>
          <InputWidget inputStyle={{ color: "#000000" }} />
        </View>
      </ColorPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 4,
    marginLeft: 16,
  },
  sliderTitle: {
    color: "#000",
    fontWeight: "600",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sliderStyle: {
    borderRadius: 20,
    marginBottom: 15,
    width: 355,
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxtContainer: {
    marginTop: 10,
    borderColor: "#030203",
  },
  textInput: {
    alignSelf: "center",
    width: 350,
    height: 30,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 20,
    borderColor: "#030203",
    textAlign: "center",
  },
});
