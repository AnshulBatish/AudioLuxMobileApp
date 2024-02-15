import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button, HelperText } from "react-native-paper";

export default function ConnectDevice() {
  const [text, setText] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true); // State to manage password visibility
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const correctPassword = "";

  const handleTextSubmit = () => {
    if (text !== correctPassword) {
      setIsIncorrectPassword(true); // Set state to indicate incorrect password

      // Start the shake animation
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setIsIncorrectPassword(false); // Reset state if password is correct
      setPasswordVisible(passwordIsVisible => !passwordIsVisible)
      router.push("controlDevice");
    }
  };

  const hasErrors = () => {
    return isIncorrectPassword; // Return true if password is incorrect, false otherwise
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-mode" />
      <Text style={styles.header}>Enter Device Password</Text>
      <View>
        <TextInput
          label="Password"
          secureTextEntry={passwordVisible}
          value={text}
          onChangeText={(text) => setText(text)}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"} // Toggle eye icon based on passwordVisible state
              onPress={() => setPasswordVisible(false)} // Toggle password visibility on press
            />
          }
          onSubmitEditing={handleTextSubmit} // Call handleTextSubmit when "Enter" is pressed
          style={styles.textInput}
        />
        <Animated.View
          style={[
            styles.helperTextContainer,
            { transform: [{ translateX: shakeAnimation }] },
          ]}
        >
          <HelperText type="error" visible={hasErrors()}>
            Incorrect Password!
          </HelperText>
        </Animated.View>
      </View>
      <Button
        mode="elevated"
        buttonColor="red"
        textColor="white"
        labelStyle={styles.buttonLabel}
        style={styles.button}
        onPress={handleTextSubmit}
      >
        Connect To Device
      </Button>
    </View>
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
