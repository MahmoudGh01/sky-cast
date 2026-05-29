import { Stack, useLocalSearchParams } from "expo-router"

import Badge from "#design/elements/Badge"
import Screen from "#design/patterns/Screen"
import { citiesById, useFavorites } from "#shared/favorites"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { allCities } = useFavorites()
  const location =
    allCities.find((city) => city.id === id) ??
    ({ id: "lisbon", ...citiesById.lisbon } as const)

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
