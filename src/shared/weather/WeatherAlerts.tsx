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

const severityColors: Record<
  AlertSeverity,
  { border: string; background: string; text: string }
> = {
  severe: {
    border: "#dc2626",
    background: "#fee2e2",
    text: "#991b1b",
  },
  moderate: {
    border: "#f59e0b",
    background: "#fef3c7",
    text: "#92400e",
  },
  minor: {
    border: "#3b82f6",
    background: "#dbeafe",
    text: "#1e3a8a",
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
      <Typography variant="heading" style={styles.sectionTitle}>
        {section.title}
      </Typography>
      <View
        style={[
          styles.badge,
          { backgroundColor: severityColors[section.severity].background },
        ]}
      >
        <Typography
          variant="label"
          style={[
            styles.badgeText,
            { color: severityColors[section.severity].text },
          ]}
        >
          {section.data.length} {section.data.length === 1 ? "alert" : "alerts"}
        </Typography>
      </View>
    </View>
  )

  const renderItem = ({ item }: { item: WeatherAlert }) => {
    const colorScheme = severityColors[item.severity]

    return (
      <Card
        style={[
          styles.alertCard,
          {
            borderLeftWidth: 4,
            borderLeftColor: colorScheme.border,
            backgroundColor: colorScheme.background,
          },
        ]}
      >
        <View style={styles.alertHeader}>
          <Typography variant="strongLabel" style={styles.alertTitle}>
            {item.title}
          </Typography>
          <Typography variant="muted" style={styles.alertTime}>
            {item.time}
          </Typography>
        </View>
        <Typography variant="body" style={styles.alertDescription}>
          {item.description}
        </Typography>
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
    paddingHorizontal: spacing.md,
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
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    flex: 1,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sectionFooter: {
    height: spacing.lg,
  },
  alertCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
    alignItems: "flex-start",
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: spacing.xs,
  },
  alertTitle: {
    flex: 1,
    marginRight: spacing.sm,
  },
  alertTime: {
    fontSize: 11,
  },
  alertDescription: {
    width: "100%",
    textAlign: "left",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl * 2,
  },
})
