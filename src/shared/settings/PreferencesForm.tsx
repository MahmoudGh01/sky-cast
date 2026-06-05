import { StyleSheet, Switch, TextInput, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import { type UserPreferences } from "./useUserPreferences"

type PreferencesFormProps = {
  preferences: UserPreferences
  timeError: string | undefined
  onDisplayNameChange: (value: string) => void
  onHomeCityChange: (value: string) => void
  onDailySummaryTimeChange: (value: string) => void
  onUseMetricUnitsChange: (value: boolean) => void
  onSevereAlertsOnlyChange: (value: boolean) => void
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({
  preferences,
  timeError,
  onDisplayNameChange,
  onHomeCityChange,
  onDailySummaryTimeChange,
  onUseMetricUnitsChange,
  onSevereAlertsOnlyChange,
}) => {
  return (
    <View style={styles.form}>
      <Card variant="glass" style={styles.section}>
        <Typography variant="caption" style={styles.sectionTitle}>
          PROFILE
        </Typography>
        <View style={styles.field}>
          <Typography variant="body" style={styles.label}>
            Display name
          </Typography>
          <TextInput
            value={preferences.displayName}
            onChangeText={onDisplayNameChange}
            placeholder="Your display name"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>
      </Card>

      <Card variant="glass" style={styles.section}>
        <Typography variant="caption" style={styles.sectionTitle}>
          LOCATION
        </Typography>
        <View style={styles.field}>
          <Typography variant="body" style={styles.label}>
            Home city
          </Typography>
          <TextInput
            value={preferences.homeCity}
            onChangeText={onHomeCityChange}
            placeholder="City"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>
      </Card>

      <Card variant="glass" style={styles.section}>
        <Typography variant="caption" style={styles.sectionTitle}>
          NOTIFICATIONS
        </Typography>
        <View style={styles.field}>
          <Typography variant="body" style={styles.label}>
            Daily summary time
          </Typography>
          <TextInput
            value={preferences.dailySummaryTime}
            onChangeText={onDailySummaryTimeChange}
            placeholder="07:30"
            placeholderTextColor={colors.muted}
            keyboardType="numbers-and-punctuation"
            style={[styles.input, timeError ? styles.inputError : undefined]}
          />
          {timeError ? (
            <Typography variant="caption" style={styles.errorText}>
              {timeError}
            </Typography>
          ) : undefined}
        </View>
      </Card>

      <Card variant="glass" style={styles.section}>
        <Typography variant="caption" style={styles.sectionTitle}>
          PREFERENCES
        </Typography>
        <View style={styles.switchRow}>
          <View style={styles.switchLabel}>
            <Typography variant="body">Use metric units</Typography>
            <Typography
              variant="bodySecondary"
              style={styles.switchDescription}
            >
              Celsius and km/h
            </Typography>
          </View>
          <Switch
            testID="useMetricUnitsSwitch"
            value={preferences.useMetricUnits}
            onValueChange={onUseMetricUnitsChange}
            thumbColor={colors.body}
            trackColor={{
              false: colors.muted,
              true: colors.success,
            }}
          />
        </View>

        <View style={[styles.switchRow, styles.lastSwitchRow]}>
          <View style={styles.switchLabel}>
            <Typography variant="body">Severe alerts only</Typography>
            <Typography
              variant="bodySecondary"
              style={styles.switchDescription}
            >
              Filter routine weather notices
            </Typography>
          </View>
          <Switch
            testID="severeAlertsOnlySwitch"
            value={preferences.severeAlertsOnly}
            onValueChange={onSevereAlertsOnlyChange}
            thumbColor={colors.body}
            trackColor={{
              false: colors.muted,
              true: colors.success,
            }}
          />
        </View>
      </Card>
    </View>
  )
}

export default PreferencesForm

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    paddingVertical: spacing.lg,
    alignItems: "stretch",
  },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    opacity: 0.6,
  },
  field: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  label: {
    fontWeight: "500",
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
    backgroundColor: "transparent",
    color: colors.body,
    paddingHorizontal: 0,
    paddingVertical: spacing.sm,
    fontSize: 17,
  },
  inputError: {
    borderBottomColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.subtle,
  },
  lastSwitchRow: {
    borderBottomWidth: 0,
  },
  switchLabel: {
    flex: 1,
    marginRight: spacing.lg,
  },
  switchDescription: {
    marginTop: spacing.xxs,
    opacity: 0.8,
  },
})
