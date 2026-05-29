import { StyleSheet, View } from "react-native"

import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"
import { CurrentWeather, Forecast } from "#shared/weather"

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
    <Screen>
      <View style={styles.header}>
        <Typography variant="title">SkyCast</Typography>
        <Typography variant="subtitle">Welcome, {displayName}</Typography>
        <Typography variant="muted">
          Daily summary: {dailySummaryTime} • Alerts:{" "}
          {severeAlertsOnly ? "Severe" : "All"}
        </Typography>
      </View>

      {!isHydrated ? (
        <Typography variant="muted">
          Loading your saved preferences...
        </Typography>
      ) : (
        <>
          <CurrentWeather location={location} useMetricUnits={useMetricUnits} />
          <Forecast location={location} useMetricUnits={useMetricUnits} />

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
        </>
      )}
    </Screen>
  )
}

export default HomeScreen

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
