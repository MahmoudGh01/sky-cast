import { ScrollView, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import GradientBackground from "#design/elements/GradientBackground"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

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
  const insets = useSafeAreaInsets()

  return (
    <GradientBackground weatherCode={1} isNight={false}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 100,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Typography variant="title2">Settings</Typography>
          <Typography variant="bodySecondary" style={styles.subtitle}>
            Personalize your forecast experience.
          </Typography>
        </View>

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
      </ScrollView>
    </GradientBackground>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // Padding is set dynamically with safe area insets
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
})
