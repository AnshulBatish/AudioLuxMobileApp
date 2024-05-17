import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const Hue = ({ data, update }) => {
  enableScroll = () => this.setState({ scrollEnabled: true });
  disableScroll = () => this.setState({ scrollEnabled: false });

  const [nonCollidingMultiSliderValue, setNonCollidingMultiSliderValue] =
    useState([data.hue_min, data.hue_max]);

  nonCollidingMultiSliderValuesChange = (values) =>
    setNonCollidingMultiSliderValue(values);

  useEffect(() => {
    update("hue_min", nonCollidingMultiSliderValue[0]);
  }, [nonCollidingMultiSliderValue[0]]);

  useEffect(() => {
    update("hue_max", nonCollidingMultiSliderValue[1]);
  }, [nonCollidingMultiSliderValue[1]]);

  return (
    <>
      <Text variant="titleMedium" style={styles.title}>
        Min and Max Hue
      </Text>
      <View style={styles.container}>
        <MultiSlider
          values={[
            nonCollidingMultiSliderValue[0],
            nonCollidingMultiSliderValue[1],
          ]}
          sliderLength={325}
          onValuesChange={nonCollidingMultiSliderValuesChange}
          min={0}
          max={255}
          step={1}
          allowOverlap={false}
          snapped
          enableLabel
          minMarkerOverlapDistance={40}
          imageBackgroundSource={{
            uri: "https://processing.org//static/f7959df7dadb51b4250e21927323e2b1/e916b/color.png",
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    color: "black",
    marginHorizontal: 22,
    fontWeight: "600",
    marginBottom: 40,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginBottom: 20,
  },
  textInput: {
    textAlign: "center",
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Hue;
