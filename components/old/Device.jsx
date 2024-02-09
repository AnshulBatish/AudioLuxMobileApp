import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import EditDevice from "../EditDevice";
import { Link, useNavigation } from "expo-router";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Jordan's AudioLux",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Lux of the Irish",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function Device() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const AudioLux = ({ title }) => (
    <Link href="/connectDevice" asChild>
      <Pressable>
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          {/* {modalVisible && (
            <EditDevice
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )} */}
        </View>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <AudioLux title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    borderWidth: 5,
    borderColor: "#EA5C5C",
    borderRadius: 2,
    marginTop: 30,
    padding: 15,
  },
  text: {
    fontFamily: "Times New Roman",
    fontSize: 24,
  },
});
