import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"
import { useFavorites } from "#shared/favorites"
import { CurrentWeather, Forecast } from "#shared/weather"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  const { favorites, isHydrated } = useFavorites()

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <Screen>
        <View style={styles.header}>
          <Typography variant="title">SkyCast</Typography>
          <Typography variant="subtitle">Weather, your way</Typography>
        </View>

        <CurrentWeather location={location} />
        <Forecast location={location} />

        <View style={styles.favoritesSection}>
          <Typography variant="label">Quick jump to favorites</Typography>
          {!isHydrated ? (
            <Typography variant="muted">Loading saved cities...</Typography>
          ) : (
            favorites.map((favorite) => (
              <LinkButton
                key={favorite.id}
                href={`/favorites/${favorite.id}`}
                label={favorite.name.toUpperCase()}
              />
            ))
          )}
        </View>
      </Screen>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  favoritesSection: {
    marginTop: spacing.md,
    alignItems: "center",
  },
})
