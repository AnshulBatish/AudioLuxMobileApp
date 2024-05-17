import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnlineConnectivityProvider } from '../utils/useConnectivity'
import SystemSettings from '../components/SystemSettings'
import StripSettings from '../components/StripSettings'

export default function SystemControl() {
  return (
    <OnlineConnectivityProvider>
        <SystemSettings />
        <StripSettings />
    </OnlineConnectivityProvider>
  )
}

const styles = StyleSheet.create({})