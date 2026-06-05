import { Ionicons } from "@expo/vector-icons"
import { Stack } from "expo-router"
import { useCallback, useState } from "react"
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import GradientBackground from "#design/elements/GradientBackground"
import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import { useFavorites } from "#shared/favorites"

const App: React.FC = () => {
  const { favorites, allCities, isHydrated, toggleFavorite } = useFavorites()
  const [refreshing, setRefreshing] = useState(false)
  const insets = useSafeAreaInsets()

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    // Simulate refresh delay (in real app, would refetch data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }, [])

  const renderFavoriteItem = useCallback(
    ({ item: city }: { item: (typeof favorites)[0] }) => (
      <LinkButton href={`/favorites/${city.id}`} label={city.name} />
    ),
    [],
  )

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.header}>
        <Typography variant="title2" style={styles.title}>
          My Locations
        </Typography>

        {isHydrated && (
          <>
            <Card variant="glass" style={styles.citiesCard}>
              <Typography variant="caption" style={styles.sectionTitle}>
                ALL CITIES
              </Typography>
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
                      style={styles.toggleRow}
                    >
                      <Typography variant="body">{city.name}</Typography>
                      <Ionicons
                        name={
                          isFavorite ? "checkmark-circle" : "add-circle-outline"
                        }
                        size={24}
                        color={isFavorite ? colors.success : colors.muted}
                      />
                    </Pressable>
                  )
                })}
              </View>
            </Card>

            <Typography variant="caption" style={styles.favoritesLabel}>
              YOUR FAVORITES
            </Typography>
          </>
        )}
      </View>
    ),
    [isHydrated, allCities, favorites, toggleFavorite],
  )

  const ListEmptyComponent = useCallback(
    () => (
      <Card variant="glass" style={styles.emptyCard}>
        <Typography variant="bodySecondary" style={styles.emptyText}>
          No favorite cities yet. Add some above!
        </Typography>
      </Card>
    ),
    [],
  )

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <GradientBackground weatherCode={1} isNight={false}>
        {!isHydrated ? (
          <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
            <Typography variant="muted">
              Loading your saved cities...
            </Typography>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={[
              styles.listContent,
              {
                paddingTop: insets.top,
                paddingBottom: insets.bottom + 100,
              },
            ]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.body}
                colors={[colors.body]}
              />
            }
          />
        )}
      </GradientBackground>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xxl,
  },
  citiesCard: {
    marginBottom: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    opacity: 0.6,
  },
  toggleList: {
    width: "100%",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.subtle,
  },
  favoritesLabel: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    opacity: 0.6,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    // Padding is set dynamically with safe area insets
  },
  emptyCard: {
    padding: spacing.xxl,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
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
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
})
