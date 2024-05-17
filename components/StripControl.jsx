import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import PagerView from "react-native-pager-view";
import Animated from "react-native-reanimated";
import PatternSplitting from "./PatternSplitting";
import DropdownPicker from "./PatternPicking";
import useInterval from "../utils/useInterval";
import { getStripSettings, updateStripSettings } from "../utils/api";
import { useConnectivity } from "../utils/useConnectivity";

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

// Pagination Dots Component
const PaginationDots = ({ currentPage, totalPages }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentPage ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

export default function StripControl() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // State to hold the dynamic list of pages
  const [pages, setPages] = useState([
      <DropdownPicker key="1"/>
  ]);

  // Checks if the web app is connected to the device.
  const { isConnected } = useConnectivity();

  // Flag representing if initial data has been obtained from
  // the device.
  const [loading, setLoading] = useState(true);

  // Flag that tells the object to update the NanoLux device with new data.
  const [updated, setUpdated] = useState(false);

  // Stores the subpattern currently selected as an object state.
  const [selectedPattern, setPattern] = useState(0);

  // Strip-level data structure
  const [data, setData] = useState({
    pattern_count: 1,
    alpha: 0,
    mode: 0,
    noise: 20,
  });

  /**
   * @brief Manages initial querying of the data from the NanoLux device.
   * 		  Sets the loading flag to false when done.
   */
  useEffect(() => {
    if (isConnected) {
      getStripSettings()
        .then((data) => setData(data))
        .then(setLoading(false));
    }
  }, [isConnected]);

  /**
   * @brief Updates the pattern on the Nanolux device
   * if it is connected and has modified data,
   * then flags the data structure.
   */
  useInterval(() => {
    if (isConnected && updated) {
      updateStripSettings(data);
      setUpdated(false);
    }
  }, 100);

  /**
   * @brief Updates a parameter in the pattern data structure with a new value.
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
   * @brief Increments the amount of patterns displayed. If the device is at
   * maximum patterns, the function will refuse to increment.
   */
  // Function to add a new page
  const incrementPattern = async () => {
    if (pages.length < 4) {
      setPages([...pages, <DropdownPicker key={pages.length + 1} />]);
      update("pattern_count", data.pattern_count + 1);
    }
  };

  /**
   * @brief Decrements the amount of patterns displayed. If the device is at
   * 1 pattern, the function will refuse to decrement. Moves to the
   * previous pattern if the existing one is deleted.
   */
  // Function to remove the last page
  const decrementPattern = async () => {
    if (pages.length > 1) {
      setPages(pages.slice(0, -1));
      update("pattern_count", data.pattern_count - 1);
    }
  };

  return (
    <>
      <PatternSplitting isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />

      <View
        style={
          isSwitchOn ? styles.viewContainer : styles.singlePatternViewContainer
        }
      >
        <AnimatedPager
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position); // Update current page on page selection
          }}
        >
          {isSwitchOn ? pages : <DropdownPicker key={"1"}/>}
        </AnimatedPager>

        {isSwitchOn && (
          <PaginationDots currentPage={currentPage} totalPages={pages.length} />
        )}
      </View>

      {isSwitchOn && (
        <SafeAreaView style={styles.buttonContainer}>
          <Button
            title="Add Pattern"
            onPress={incrementPattern}
            disabled={pages.length >= 4}
          />
          <Button
            title="Remove Pattern"
            onPress={decrementPattern}
            color="red"
            disabled={pages.length <= 1}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  singlePatternViewContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 10,
    marginVertical: 30,
    borderColor: "black",
    borderWidth: 4,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  viewContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 4,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  pagerView: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10, // Some padding at the bottom for pagination dots
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "black", // Active dot style
  },
  inactiveDot: {
    backgroundColor: "lightgray", // Inactive dot style
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  toggleButton: {
    borderColor: "black",
    borderWidth: 1,
    width: 100,
  },
});
