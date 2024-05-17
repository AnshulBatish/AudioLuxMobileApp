import * as React from "react";
import { Stack, router } from "expo-router";

import CustomHeader from "../components/CustomHeader";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { IconButton, PaperProvider } from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    KSBold: require("../assets/fonts/Kumbh_Sans/static/KumbhSans-Bold.ttf"),
    KSMedium: require("../assets/fonts/Kumbh_Sans/static/KumbhSans-Medium.ttf"),
    KSRegular: require("../assets/fonts/Kumbh_Sans/static/KumbhSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                header: () => <CustomHeader />,
                contentStyle: {
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen name="AddNewDevice" />
            <Stack.Screen
              name="modal"
              options={{
                // Set the presentation mode to modal for our modal route.
                presentation: "modal",
                headerTitle: "Edit Device",
                headerLeft: () => (
                  <Pressable
                    onPress={() => {
                      router.back();
                    }}
                  >
                    <Ionicons name="close" size={30} marginLeft={10} />
                  </Pressable>
                ),
                contentStyle: {
                  backgroundColor: "#EFF1ED",
                },
              }}
            />
            <Stack.Screen
              name="StripControlWrapper"
              options={{
                headerBackTitle: "Password",
                headerTitle: "",
                headerRight: () => (
                  <View style={{ justifyContent: "center" }}>
                    <IconButton
                      icon="cog"
                      iconColor={"black"}
                      size={25}
                      onPress={() => router.navigate("SystemControl")}
                    />
                  </View>
                ),
                headerBackground: () => (
                  <SafeAreaView style={styles.container}>
                    <Image
                      source={require("../assets/images/Transparent-Cymaspace-Logo.png")}
                      style={styles.logo}
                    />
                  </SafeAreaView>
                ),
              }}
            />
            <Stack.Screen
              name="SystemControl"
              options={{
                headerTitle: "Device Settings",
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  logo: {
    height: 35,
    width: 100,
  },
});
