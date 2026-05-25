import { Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

import CurrentWeather from "../../src/CurrentWeather"
import Forecast from "../../src/Forecast"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>SkyCast</Text>
          <Text style={styles.subtitle}>Morning breeze check</Text>
        </View>

        <CurrentWeather location={location} />
        <Forecast location={location} />
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fbff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0b4f6c",
  },
  subtitle: {
    fontSize: 13,
    color: "#4b6b7c",
  },
})
