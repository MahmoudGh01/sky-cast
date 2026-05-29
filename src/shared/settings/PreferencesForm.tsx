import { StyleSheet, Switch, TextInput, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"

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
      <View style={styles.field}>
        <Typography variant="label">Display name</Typography>
        <TextInput
          value={preferences.displayName}
          onChangeText={onDisplayNameChange}
          placeholder="Your display name"
          placeholderTextColor={colors.subtle}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Typography variant="label">Home city</Typography>
        <TextInput
          value={preferences.homeCity}
          onChangeText={onHomeCityChange}
          placeholder="City"
          placeholderTextColor={colors.subtle}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Typography variant="label">Daily summary time</Typography>
        <TextInput
          value={preferences.dailySummaryTime}
          onChangeText={onDailySummaryTimeChange}
          placeholder="07:30"
          placeholderTextColor={colors.subtle}
          keyboardType="numbers-and-punctuation"
          style={[styles.input, timeError ? styles.inputError : undefined]}
        />
        {timeError ? (
          <Typography variant="muted" style={styles.errorText}>
            {timeError}
          </Typography>
        ) : undefined}
      </View>

      <View style={styles.switchRow}>
        <View>
          <Typography variant="label">Use metric units</Typography>
          <Typography variant="muted">Celsius and km/h</Typography>
        </View>
        <Switch
          value={preferences.useMetricUnits}
          onValueChange={onUseMetricUnitsChange}
          thumbColor={colors.surface}
          trackColor={{ false: colors.subtle, true: colors.brand }}
        />
      </View>

      <View style={styles.switchRow}>
        <View>
          <Typography variant="label">Severe alerts only</Typography>
          <Typography variant="muted">
            Filter routine weather notices
          </Typography>
        </View>
        <Switch
          value={preferences.severeAlertsOnly}
          onValueChange={onSevereAlertsOnlyChange}
          thumbColor={colors.surface}
          trackColor={{ false: colors.subtle, true: colors.brand }}
        />
      </View>
    </View>
  )
}

export default PreferencesForm

const styles = StyleSheet.create({
  form: {
    width: "100%",
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  field: {
    gap: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.subtle,
    backgroundColor: colors.surface,
    color: colors.body,
    borderRadius: shapes.radiusSm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    width: "100%",
  },
  inputError: {
    borderColor: "#b63a3a",
  },
  errorText: {
    color: "#b63a3a",
  },
  switchRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
})
