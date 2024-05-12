import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { Stack, router, useNavigation } from "expo-router";

export default function ControlDevice() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Button
        mode="contained-tonal"
        buttonColor="#ff0000"
        textColor="#fff"
        uppercase
        style={styles.addPattern}
        onPress={() => router.push("Patterns")}
      >
        Add Pattern
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addPattern: {
    width: "80%",
    alignSelf: "center",
  },
});
