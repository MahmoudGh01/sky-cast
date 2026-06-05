import { ScrollView, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import GradientBackground from "#design/elements/GradientBackground"
import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import {
  CurrentWeather,
  Forecast,
  HourlyForecast,
  WeatherAlerts,
} from "#shared/weather"

import { useHomeBehavior } from "./useHomeBehavior"

const HomeScreen: React.FC = () => {
  const { isHydrated, location, useMetricUnits, favorites } = useHomeBehavior()
  const insets = useSafeAreaInsets()

  // Get current weather code for gradient background
  // For now, using a default sunny day (code 0)
  // This should be fetched from the weather API in a real implementation
  const weatherCode = 1 // Partly cloudy as default
  const isNight = new Date().getHours() >= 18 || new Date().getHours() < 6

  return (
    <GradientBackground weatherCode={weatherCode} isNight={isNight}>
      {!isHydrated ? (
        <View style={[styles.loadingContainer, { paddingTop: insets.top }]}>
          <Typography variant="muted">
            Loading your saved preferences...
          </Typography>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom + 100,
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <CurrentWeather location={location} useMetricUnits={useMetricUnits} />

          <HourlyForecast location={location} useMetricUnits={useMetricUnits} />

          <Forecast location={location} useMetricUnits={useMetricUnits} />

          <View style={styles.section}>
            <View style={styles.alertsContainer}>
              <WeatherAlerts />
            </View>
          </View>

          <View style={styles.favoritesSection}>
            <Typography variant="caption" style={styles.favoritesLabel}>
              MY LOCATIONS
            </Typography>
            {favorites.map((favorite) => (
              <LinkButton
                key={favorite.id}
                href={`/favorites/${favorite.id}`}
                label={favorite.name}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </GradientBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Padding is set dynamically with safe area insets
  },
  section: {
    marginVertical: spacing.lg,
  },
  alertsContainer: {
    minHeight: 400,
  },
  favoritesSection: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  favoritesLabel: {
    marginBottom: spacing.lg,
    opacity: 0.6,
  },
})
