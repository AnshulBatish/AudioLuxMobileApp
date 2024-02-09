import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextInputComponent from '../components/TextInput'

export default function ConnectDevice({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Device Password</Text>
      <TextInputComponent placeholder={"ex. password123"} style={styles.input}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%",
  },
  header: {
    fontFamily: "Times New Roman",
    fontWeight: 'bold',
    fontSize: 40,
  },
})