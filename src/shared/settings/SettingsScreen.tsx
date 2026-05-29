import { StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"

import PreferencesForm from "./PreferencesForm"
import { useUserPreferences } from "./useUserPreferences"

const SettingsScreen: React.FC = () => {
  const {
    preferences,
    isHydrated,
    timeError,
    setDisplayName,
    setHomeCity,
    setDailySummaryTime,
    setUseMetricUnits,
    setSevereAlertsOnly,
  } = useUserPreferences()

  return (
    <Screen>
      <Typography variant="heading">Settings</Typography>
      <Typography variant="subtitle" style={styles.subtitle}>
        Personalize your forecast experience.
      </Typography>

      {!isHydrated ? (
        <Typography variant="muted">Loading saved preferences...</Typography>
      ) : (
        <PreferencesForm
          preferences={preferences}
          timeError={timeError}
          onDisplayNameChange={setDisplayName}
          onHomeCityChange={setHomeCity}
          onDailySummaryTimeChange={setDailySummaryTime}
          onUseMetricUnitsChange={setUseMetricUnits}
          onSevereAlertsOnlyChange={setSevereAlertsOnly}
        />
      )}
    </Screen>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.sm,
    textAlign: "center",
  },
})
