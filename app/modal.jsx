import { Text, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TextInputComponent from "../components/TextInput";

export default function Modal() {
  const isPresented = router.canGoBack();
  const params = useLocalSearchParams();

  const { DeviceName } = params;

  return (
    <View>
      <Text>Device Name:</Text>
      <TextInputComponent placeholder={DeviceName} />
      <StatusBar style='auto'/>
    </View>
  );
}
