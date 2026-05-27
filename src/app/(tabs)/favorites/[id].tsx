import { Stack, useLocalSearchParams } from "expo-router"

import Badge from "#design/elements/Badge"
import Screen from "#design/patterns/Screen"
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

      <Screen>
        <Badge>Saved city</Badge>
        <CurrentWeather location={location} />
        <Forecast location={location} />
      </Screen>
    </>
  )
}

export default App
