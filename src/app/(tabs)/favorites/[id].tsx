import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

import { CurrentWeather, Forecast } from "#shared/weather"

const locations: Record<
  string,
  { name: string; latitude: number; longitude: number }
> = {
  lisbon: { name: "Lisbon", latitude: 38.7223, longitude: -9.1393 },
  tokyo: { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  dakar: { name: "Dakar", latitude: 14.7167, longitude: -17.4677 },
}

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const location = locations[id ?? ""] ?? locations.lisbon

  return (
    <>
      <Stack.Screen options={{ title: location.name }} />

      <View style={styles.container}>
        <Text style={styles.badge}>Saved city</Text>
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
  badge: {
    marginBottom: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#d9ecf7",
    color: "#0b4f6c",
    fontSize: 12,
    fontWeight: "600",
  },
})
