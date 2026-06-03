import { ScrollView, StyleSheet, View } from "react-native"

import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"
import {
  CurrentWeather,
  Forecast,
  HourlyForecast,
  WeatherAlerts,
} from "#shared/weather"

import { useHomeBehavior } from "./useHomeBehavior"

const HomeScreen: React.FC = () => {
  const {
    isHydrated,
    location,
    displayName,
    dailySummaryTime,
    severeAlertsOnly,
    useMetricUnits,
    favorites,
  } = useHomeBehavior()

  return (
    <Screen style={styles.screen}>
      {!isHydrated ? (
        <Typography variant="muted">
          Loading your saved preferences...
        </Typography>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Typography variant="title">SkyCast</Typography>
            <Typography variant="subtitle">Welcome, {displayName}</Typography>
            <Typography variant="muted">
              Daily summary: {dailySummaryTime} • Alerts:{" "}
              {severeAlertsOnly ? "Severe" : "All"}
            </Typography>
          </View>

          <CurrentWeather location={location} useMetricUnits={useMetricUnits} />

          <View style={styles.section}>
            <Typography variant="heading" style={styles.sectionTitle}>
              Hourly Forecast
            </Typography>
            <HourlyForecast
              location={location}
              useMetricUnits={useMetricUnits}
            />
          </View>

          <Forecast location={location} useMetricUnits={useMetricUnits} />

          <View style={styles.section}>
            <Typography variant="heading" style={styles.sectionTitle}>
              Active Alerts
            </Typography>
            <View style={styles.alertsContainer}>
              <WeatherAlerts />
            </View>
          </View>

          <View style={styles.favoritesSection}>
            <Typography variant="label">Quick jump to favorites</Typography>
            {favorites.map((favorite) => (
              <LinkButton
                key={favorite.id}
                href={`/favorites/${favorite.id}`}
                label={favorite.name.toUpperCase()}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </Screen>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  section: {
    marginVertical: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    textAlign: "center",
  },
  alertsContainer: {
    height: 400,
  },
  favoritesSection: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: "center",
  },
})
