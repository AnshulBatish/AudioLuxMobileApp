import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StripLength from '../components/Sliders/StripLength'
import UpdateTime from '../components/Sliders/UpdateTime'

export default function SystemSettings() {
  return (
    <View>
      <StripLength />
      <UpdateTime />
    </View>
  )
}

const styles = StyleSheet.create({})