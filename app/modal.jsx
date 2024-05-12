import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-paper";

export default function Modal() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>Device Name</Text>
        <TextInput
          mode="outlined"
          label="Edit Device Name"
          textColor="black"
          selectionColor="black"
          activeOutlineColor="black"
          outlineColor="black"
          style={styles.textInput}
        />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  header: {
    fontFamily: "KSBold",
    fontSize: 40,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 30,
  },
  textInput: {
    margin: 20,
    backgroundColor: "#fff",
  },
  button: {
    margin: 20,
  },
  buttonLabel: {
    fontFamily: "KSBold",
    fontSize: 18, // Example font size for the button label (text)
    padding: 5,
  },
});
