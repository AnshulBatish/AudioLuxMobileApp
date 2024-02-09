import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

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
  const AudioLux = ({ title }) => (
    <SafeAreaView style={{flex: 1,}}>
      <Link href="/connectDevice" asChild>
        <Pressable onLongPress={() => router.push((href = "/modal"))}>
            <View>

          <View style={styles.container}>
      {/* <LinearGradient
        colors={['#003cf4', '#fd1d1d']}
        start={{ x: 0.2, y: 0.5 }}
        end={{ x: 0.8, y: 0.4 }}
        style={styles.device}
        > */}
            <Text style={styles.text}>{title}</Text>
      {/* </LinearGradient> */}
          </View>
        </View>
        </Pressable>
      </Link>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.view}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <AudioLux title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  device: {
    width: '121%',
    height: '163%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  view: {
    flex: 1,
    flexBasis: "100%"
  },
  container: {
    width: "80%",
    height: 140,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 12,
    borderColor: "#EA5C5C",
    borderRadius: 9,
    marginTop: 30,
    padding: 15,
    backgroundColor: "#EFF1ED",
  },
  text: {
    fontFamily: "KSBold",
    fontSize: 30,
  },
});
