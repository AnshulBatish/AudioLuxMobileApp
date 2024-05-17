import { CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons, Switch, Text } from "react-native-paper";

const PatternSplitting = ({isSwitchOn, setIsSwitchOn}) => {
  const [value, setValue] = useState("");

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={styles.segmentContainer}>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.title}>
          Multiple Pattern Mode
        </Text>
        <Switch
          value={isSwitchOn}
          color="green"
          onValueChange={onToggleSwitch}
          style={styles.switch}
        />
      </View>

      {isSwitchOn ? (
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          style={styles.segmentedButtons}
          buttons={[
            {
              value: "split-strip",
              icon: "view-agenda-outline",
              label: "Strip Splitting",
              uncheckedColor: "black",
              checkedColor: "white",
              onPress: () => console.log("Strip Splitting"),
            },
            {
              value: "train",
              icon: "layers-outline",
              label: "Z-Layering",
              uncheckedColor: "black",
              checkedColor: "white",
              onPress: () => console.log("Z-layering"),
            },
          ]}
          theme={{ colors: { primary: "red" } }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  segmentContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  container: {
    flexDirection: "row",
  },
  title: {
    color: "black",
    marginHorizontal: 22,
    fontWeight: "600",
  },
  switch: {
    alignSelf: "flex-end",
    marginLeft: 100,
  },
  segmentedButtons: {
    width: "85%",
    padding: 10,
    alignSelf: "center",
    marginTop: 7,
  },
});

export default PatternSplitting;
