import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export function AddDevice() {
  return (
    <Pressable style={styles.add}>
      <LinearGradient
        colors={['#003cf4', '#fd1d1d']}
        start={{ x: 0.2, y: 0.5 }}
        end={{ x: 0.8, y: 0.4 }}
        style={styles.addButton}
      >
        <View style={styles.addDisplay}>
          <Ionicons name="add" size={40} color={"white"} />
          <Text style={styles.addText}>Add Device</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function SaveName() {
  return (
    <Pressable>
      <Text>buttons</Text>
    </Pressable>
  );
}

export function ConnectToDevice() {
  return (
    <Pressable style={styles.connect}>
      <Text style={styles.addText}>Connect To Device</Text>
    </Pressable>
  );
}

export function DisconnectDevice() {
  return (
    <Pressable>
      <Text>buttons</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  add: {
    width: 250,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "fixed",
    bottom: '25%',
  },
  addButton: {
    width: '100%',
    height: '100%',
    borderWidth: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontWeight: "bold",
    fontSize: 27,
    color: "white",
  },
  addDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  connect: {
    width: 230,
    height: 90,
    alignItems: "center",
    backgroundColor: 'red'
  }
});
