import { Stack } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"

import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"
import { useFavorites } from "#shared/favorites"

const App: React.FC = () => {
  const { favorites, allCities, isHydrated, toggleFavorite } = useFavorites()

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <Screen>
        <Typography variant="heading">Favorite Cities</Typography>
        <Typography variant="subtitle" style={styles.subtitle}>
          Choose your list. We save it on this device.
        </Typography>

        {!isHydrated ? (
          <Typography variant="muted">Loading your saved cities...</Typography>
        ) : (
          <>
            <View style={styles.toggleList}>
              {allCities.map((city) => {
                const isFavorite = favorites.some(
                  (favorite) => favorite.id === city.id,
                )

                return (
                  <Pressable
                    key={city.id}
                    onPress={() => {
                      toggleFavorite(city.id)
                    }}
                    style={[
                      styles.toggle,
                      isFavorite ? styles.toggleActive : styles.toggleInactive,
                    ]}
                  >
                    <Typography
                      variant={isFavorite ? "strongLabel" : "label"}
                      style={
                        isFavorite ? styles.toggleTextActive : styles.toggleText
                      }
                    >
                      {isFavorite ? "Saved" : "Add"} {city.name}
                    </Typography>
                  </Pressable>
                )
              })}
            </View>

            <Typography variant="muted" style={styles.sectionLabel}>
              Tap a saved city for details
            </Typography>

            {favorites.map((city) => (
              <LinkButton
                key={city.id}
                href={`/favorites/${city.id}`}
                label={city.name.toUpperCase()}
              />
            ))}
          </>
        )}
      </Screen>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  toggleList: {
    width: "100%",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  toggle: {
    borderRadius: shapes.radiusSm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  toggleActive: {
    borderColor: colors.brand,
    backgroundColor: colors.surfaceAccent,
  },
  toggleInactive: {
    borderColor: colors.subtle,
    backgroundColor: colors.surface,
  },
  toggleText: {
    color: colors.body,
  },
  toggleTextActive: {
    color: colors.brand,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
})
