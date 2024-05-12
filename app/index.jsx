import { StyleSheet, SafeAreaView, Platform, ScrollView } from "react-native";

import Device from "../components/Devices";
import { StatusBar } from "expo-status-bar";
import { FAB, Portal, PaperProvider } from "react-native-paper";
// import { AnimatedFAB } from "react-native-paper";
import { useState } from "react";
import { router } from "expo-router";

const Home = () => {
  const [isExtended, setIsExtended] = useState(true);

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <Device onScroll={onScroll} />
        <Portal>
          <FAB.Group
            open={open}
            visible
            label={(isExtended && !open) ? "Add Device" : ""}
            icon={open ? "close" : "plus"}
            variant="tertiary"
            color="black"
            style={styles.fab}
            fabStyle={styles.fabStyle}
            actions={[
              {
                icon: "import",
                label: "Import Existing Device",
                onPress: () => router.push("AddNewDevice"),
              },
              {
                icon: "plus",
                label: "Add New Device",
                onPress: () => router.navigate("AddNewDevice"),
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: 770,
  },
  fab: {
    position: "absolute",
    bottom: 0,
  },
  fabStyle: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "red",
  }
});
