import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableRipple, ProgressBar, MD3Colors } from "react-native-paper";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Jordan's AudioLux",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Lux of the Irish",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    title: "Fourth Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "Fifth Item",
  },
];

export default function Device({ onScroll }) {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  let intervalId;

  const startProgress = () => {
    setIsPressing(true);
    intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 1) {
            return prevProgress + 0.1; // Increase progress by 1% each interval
        } else {
          console.log("Reached: ", prevProgress, progress)
          // stopProgress();
          clearInterval(intervalId); // Stop interval when progress reaches 100%
          setProgress(0);
          router.push(href = "/modal")
          return 1;
        }
      });
    }, 100); // Interval time in milliseconds (adjust as needed)
  };

  const stopProgress = () => {
    setProgress(0); // Reset progress when touch is released
    setIsPressing(false);
    clearInterval(intervalId); // Stop the interval when touch is released
    console.log(" ====Stopping Progress Function Invoked: ", isPressing, progress)
  };

  
/**
 * 
 * Put an editable badge to edit the devices instead of trying animation
 */


  const AudioLux = ({ title }) => (
    <SafeAreaView style={{ flex: 1 }}>
      <Link href="/connectDevice" asChild>
        <Pressable
          // onPressOut={stopProgress} // Stop progress when touch ends
          // onLongPress={startProgress} // Start progress when long press begins
          onLongPress={() => (router.push('./modal'))}
        >
          <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </Pressable>
      </Link>
    </SafeAreaView>
  );

  return (
    <SafeAreaView>
      {isPressing && <ProgressBar progress={progress} color={MD3Colors.error50} />}
      <FlatList
        data={DATA}
        renderItem={({ item }) => <AudioLux title={item.title} />}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flexBasis: "100%",
  },
  container: {
    width: "80%",
    height: 140,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 12,
    borderColor: "#EA5C5C",
    borderRadius: 9,
    marginTop: 30,
    padding: 15,
    backgroundColor: "#EFF1ED",
  },
  text: {
    fontFamily: "KSBold",
    fontSize: 30,
  },
});
