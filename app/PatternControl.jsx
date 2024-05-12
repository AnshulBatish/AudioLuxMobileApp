import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import PagerView from "react-native-pager-view";
import Animated from "react-native-reanimated";
import PatternSplitting from "../components/PatternSplitting";
import DropdownPicker from "../components/DropdownPicker";
import { ToggleButton } from "react-native-paper";

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

export default function HeadphonesCarouselExample() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // State to hold the dynamic list of pages
  const [pages, setPages] = useState([
    <View key="1">
      <DropdownPicker />
    </View>,
  ]);

  // Function to add a new page
  const addPage = () => {
    const newPage = (
      <View key={pages.length + 1}>
        <DropdownPicker />
      </View>
    );
    setPages([...pages, newPage]); // Add the new page to the list
  };

  // Function to remove the last page
  const removePage = () => {
    if (pages.length > 1) {
      setPages(pages.slice(0, -1)); // Remove the last page
    }
  };

  return (
    <>
      <PatternSplitting isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />

      <View style={isSwitchOn ? styles.viewContainer : styles.singlePatternViewContainer}>
        <AnimatedPager
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position); // Update current page on page selection
          }}
        >
          {isSwitchOn ? (
            pages
          ) : (
            <View key="1">
              <DropdownPicker />
            </View>
          )}
        </AnimatedPager>

        {isSwitchOn && (
          <PaginationDots currentPage={currentPage} totalPages={pages.length} />
        )}
      </View>

      {isSwitchOn && (
        <>
          {/* Add/Remove Buttons */}          
          <SafeAreaView style={styles.buttonContainer}>
            {(pages.length < 4) ? <Button title="Add Pattern" onPress={addPage} /> : <Button title="Add Pattern" onPress={addPage} disabled/>}
            {(pages.length > 1) ? <Button title="Remove Pattern" onPress={removePage} color="red" /> : <Button title="Remove Pattern" onPress={removePage} color="red" disabled/>}
          </SafeAreaView>
        </>
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
  },
  toggleButton: {
    borderColor: "black",
    borderWidth: 1,
    width: 100,
  }
});
