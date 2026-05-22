import { Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

import CurrentWeather from "../src/CurrentWeather"
import Forecast from "../src/Forecast"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <View style={styles.container}>
        <Text style={styles.title}>SkyCast</Text>

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
    backgroundColor: "#f2f6fb",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
})
