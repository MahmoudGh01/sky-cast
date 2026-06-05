import { useState } from "react"
import { RefreshControl, SectionList, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

type AlertSeverity = "severe" | "moderate" | "minor"

type WeatherAlert = {
  id: string
  title: string
  description: string
  time: string
  severity: AlertSeverity
}

type AlertSection = {
  title: string
  severity: AlertSeverity
  data: WeatherAlert[]
}

// Static data for weather alerts organized by severity
const weatherAlerts: AlertSection[] = [
  {
    title: "Severe Alerts",
    severity: "severe",
    data: [
      {
        id: "s1",
        title: "Tornado Warning",
        description:
          "Tornado warning in effect until 6:00 PM. Seek shelter immediately.",
        time: "2 min ago",
        severity: "severe",
      },
      {
        id: "s2",
        title: "Flash Flood Warning",
        description:
          "Flash flooding possible in low-lying areas. Avoid travel.",
        time: "15 min ago",
        severity: "severe",
      },
    ],
  },
  {
    title: "Moderate Alerts",
    severity: "moderate",
    data: [
      {
        id: "m1",
        title: "Thunderstorm Watch",
        description: "Severe thunderstorms possible this evening. Stay alert.",
        time: "1 hour ago",
        severity: "moderate",
      },
      {
        id: "m2",
        title: "High Wind Advisory",
        description:
          "Winds gusting up to 45 mph expected. Secure loose objects.",
        time: "2 hours ago",
        severity: "moderate",
      },
      {
        id: "m3",
        title: "Heat Advisory",
        description:
          "High temperatures may cause heat-related illness. Stay hydrated.",
        time: "3 hours ago",
        severity: "moderate",
      },
    ],
  },
  {
    title: "Minor Alerts",
    severity: "minor",
    data: [
      {
        id: "mn1",
        title: "Air Quality Alert",
        description:
          "Moderate air quality. Sensitive groups should limit outdoor activity.",
        time: "5 hours ago",
        severity: "minor",
      },
      {
        id: "mn2",
        title: "Frost Advisory",
        description: "Frost expected overnight. Protect sensitive plants.",
        time: "6 hours ago",
        severity: "minor",
      },
      {
        id: "mn3",
        title: "Beach Hazard",
        description: "Strong rip currents possible. Swim near lifeguards.",
        time: "8 hours ago",
        severity: "minor",
      },
      {
        id: "mn4",
        title: "UV Index Warning",
        description:
          "Very high UV levels. Use sunscreen and protective clothing.",
        time: "10 hours ago",
        severity: "minor",
      },
    ],
  },
]

const severityColors: Record<AlertSeverity, { icon: string; color: string }> = {
  severe: {
    icon: "⚠️",
    color: colors.alerts.severe,
  },
  moderate: {
    icon: "⚡",
    color: colors.alerts.moderate,
  },
  minor: {
    icon: "ℹ️",
    color: colors.alerts.minor,
  },
}

export const WeatherAlerts: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate fetching new alerts
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  const renderSectionHeader = ({ section }: { section: AlertSection }) => (
    <View style={styles.sectionHeader}>
      <Typography variant="caption" style={styles.sectionTitle}>
        {section.title.toUpperCase()}
      </Typography>
      <Typography variant="caption" style={styles.badgeText}>
        {section.data.length}
      </Typography>
    </View>
  )

  const renderItem = ({ item }: { item: WeatherAlert }) => {
    const colorScheme = severityColors[item.severity]

    return (
      <Card variant="glass" style={styles.alertCard}>
        <View style={styles.alertContent}>
          <View
            style={[
              styles.severityIndicator,
              { backgroundColor: colorScheme.color },
            ]}
          />
          <View style={styles.alertBody}>
            <View style={styles.alertHeader}>
              <Typography variant="heading" style={styles.alertTitle}>
                {item.title}
              </Typography>
              <Typography variant="caption" style={styles.alertTime}>
                {item.time}
              </Typography>
            </View>
            <Typography variant="bodySecondary" style={styles.alertDescription}>
              {item.description}
            </Typography>
          </View>
        </View>
      </Card>
    )
  }

  const renderSectionFooter = ({ section }: { section: AlertSection }) => (
    <View style={styles.sectionFooter} />
  )

  return (
    <SectionList
      sections={weatherAlerts}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      renderSectionFooter={renderSectionFooter}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      stickySectionHeadersEnabled={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.brand}
          colors={[colors.brand]}
        />
      }
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <Typography variant="title">Weather Alerts</Typography>
          <Typography variant="muted" style={styles.headerSubtitle}>
            Pull down to refresh
          </Typography>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Typography variant="muted">No active weather alerts</Typography>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  listHeader: {
    alignItems: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  headerSubtitle: {
    marginTop: spacing.xs,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    flex: 1,
    opacity: 0.6,
  },
  badgeText: {
    opacity: 0.6,
  },
  sectionFooter: {
    height: spacing.lg,
  },
  alertCard: {
    marginBottom: spacing.md,
    padding: 0,
    overflow: "hidden",
  },
  alertContent: {
    flexDirection: "row",
  },
  severityIndicator: {
    width: 4,
  },
  alertBody: {
    flex: 1,
    padding: spacing.lg,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  alertTitle: {
    flex: 1,
    marginRight: spacing.sm,
    fontSize: 17,
  },
  alertTime: {
    opacity: 0.6,
  },
  alertDescription: {
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl * 2,
  },
})
