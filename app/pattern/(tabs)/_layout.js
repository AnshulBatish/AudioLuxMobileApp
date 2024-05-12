import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs screenOptions={{swipeEnabled: false}}>
      <MaterialTopTabs.Screen name="singlePattern" options={{ title: "Single Pattern"}}/>
      <MaterialTopTabs.Screen name="updatedPatternSplitting" options={{ title: "Multiple Patterns 2.0"}} />
    </MaterialTopTabs>
  );
}
