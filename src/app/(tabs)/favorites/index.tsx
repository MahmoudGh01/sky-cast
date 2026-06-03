import { Stack } from "expo-router"
import { useCallback, useState } from "react"
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native"

import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"
import { useFavorites } from "#shared/favorites"

const App: React.FC = () => {
  const { favorites, allCities, isHydrated, toggleFavorite } = useFavorites()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    // Simulate refresh delay (in real app, would refetch data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }, [])

  const renderToggleItem = useCallback(
    ({ item: city }: { item: (typeof allCities)[0] }) => {
      const isFavorite = favorites.some((favorite) => favorite.id === city.id)

      return (
        <Pressable
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
            style={isFavorite ? styles.toggleTextActive : styles.toggleText}
          >
            {isFavorite ? "Saved" : "Add"} {city.name}
          </Typography>
        </Pressable>
      )
    },
    [favorites, toggleFavorite],
  )

  const renderFavoriteItem = useCallback(
    ({ item: city }: { item: (typeof favorites)[0] }) => (
      <LinkButton
        href={`/favorites/${city.id}`}
        label={city.name.toUpperCase()}
      />
    ),
    [],
  )

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.header}>
        <Typography variant="heading">Favorite Cities</Typography>
        <Typography variant="subtitle" style={styles.subtitle}>
          Choose your list. We save it on this device.
        </Typography>

        {isHydrated && (
          <>
            <Typography variant="label" style={styles.sectionTitle}>
              All Cities
            </Typography>
            <FlatList
              data={allCities}
              renderItem={renderToggleItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.toggleList}
              scrollEnabled={false}
            />

            <Typography variant="muted" style={styles.sectionLabel}>
              Tap a saved city for details
            </Typography>
            <Typography variant="label" style={styles.sectionTitle}>
              Your Favorites
            </Typography>
          </>
        )}
      </View>
    ),
    [isHydrated, allCities, renderToggleItem],
  )

  const ListEmptyComponent = useCallback(
    () => (
      <Typography variant="muted" style={styles.emptyText}>
        No favorite cities yet. Add some above!
      </Typography>
    ),
    [],
  )

  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />

      <Screen style={styles.screen}>
        {!isHydrated ? (
          <Typography variant="muted">Loading your saved cities...</Typography>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.brand}
                colors={[colors.brand]}
              />
            }
          />
        )}
      </Screen>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: spacing.xl,
    alignItems: "center",
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  sectionTitle: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.brand,
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
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  emptyText: {
    textAlign: "center",
    marginTop: spacing.md,
  },
})
