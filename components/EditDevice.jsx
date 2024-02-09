import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInputComponent from "./TextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function EditDevice({ modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <View>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
          >
            <MaterialCommunityIcons name="close" size={24} style={styles.buttonClose} />
          </Pressable>
          <Text style={styles.headerText}>Edit Device</Text>
        </View>
        <TextInputComponent placeholder={"Device Name"} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 100,
    backgroundColor: "white",
    padding: 35,
  },
  buttonClose: {
    padding: 10,
    backgroundColor: "#2196F3",
    position: 'absolute',
    top: -35,
    left: -35,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText: {
    fontFamily: "Times New Roman",
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50,

  },
});
