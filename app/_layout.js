import * as React from "react";
import { Stack, router } from "expo-router";

import CustomHeader from "../components/CustomHeader";
import { Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";

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
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
            contentStyle: {
              backgroundColor: "black",
            },
          }}
        />
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
        <Stack.Screen name="controlDevice" />
      </Stack>
    </PaperProvider>
  );
}
