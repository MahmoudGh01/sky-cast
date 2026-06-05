import { Stack, useLocalSearchParams } from "expo-router"
import { ScrollView, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import GradientBackground from "#design/elements/GradientBackground"
import { citiesById, useFavorites } from "#shared/favorites"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { allCities } = useFavorites()
  const insets = useSafeAreaInsets()
  const location =
    allCities.find((city) => city.id === id) ??
    ({ id: "lisbon", ...citiesById.lisbon } as const)

  const weatherCode = 1 // Partly cloudy as default
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6

  return (
    <>
      <Stack.Screen
        options={{
          title: location.name,
          headerTransparent: true,
          headerBlurEffect: "dark",
        }}
      />

      <GradientBackground weatherCode={weatherCode} isNight={isNight}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: insets.top + 60, // Account for transparent header
              paddingBottom: insets.bottom + 100,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <CurrentWeather location={location} />
          <Forecast location={location} />
        </ScrollView>
      </GradientBackground>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // Padding is set dynamically with safe area insets
  },
})
