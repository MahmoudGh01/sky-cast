import { useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import toWeather, { type Weather } from "./toWeather"
import { type WeatherLocation } from "./types"

type HourData = {
  hour: string
  temperature: number
  condition: Weather
  precipitation: number
}

// Generate initial 24 hours of forecast data
const generateHourlyData = (startHour: number, count: number): HourData[] => {
  const weatherCodes = [0, 1, 2, 3, 51, 53, 61, 71]
  const data: HourData[] = []

  for (let i = 0; i < count; i++) {
    const hour = (startHour + i) % 24
    const randomTemp = 15 + Math.random() * 15
    const randomCode =
      weatherCodes[Math.floor(Math.random() * weatherCodes.length)]
    const randomPrecip = Math.random() * 100

    data.push({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      temperature: Math.round(randomTemp),
      condition: toWeather(randomCode),
      precipitation: Math.round(randomPrecip),
    })
  }

  return data
}

export const HourlyForecast: React.FC<{
  location: WeatherLocation
  useMetricUnits?: boolean
}> = ({ location, useMetricUnits = true }) => {
  const [data, setData] = useState<HourData[]>(() =>
    generateHourlyData(new Date().getHours(), 24),
  )
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreData = async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate next 12 hours
    const lastHour = parseInt(data[data.length - 1].hour.split(":")[0])
    const newData = generateHourlyData((lastHour + 1) % 24, 12)

    setData((prev) => [...prev, ...newData])
    setIsLoadingMore(false)

    // Stop loading more after 72 hours (3 days)
    if (data.length + newData.length >= 72) {
      setHasMore(false)
    }
  }

  const renderItem = ({ item, index }: { item: HourData; index: number }) => {
    const isNow = index === 0

    return (
      <Card style={[styles.hourCard, isNow && styles.currentHourCard]}>
        <Typography
          variant={isNow ? "strongLabel" : "label"}
          style={styles.hour}
        >
          {isNow ? "Now" : item.hour}
        </Typography>
        <Typography variant="title" style={styles.temperature}>
          {useMetricUnits
            ? `${item.temperature}°C`
            : `${Math.round((item.temperature * 9) / 5 + 32)}°F`}
        </Typography>
        <Typography variant="body" style={styles.condition}>
          {item.condition}
        </Typography>
        <View style={styles.precipRow}>
          <Typography variant="muted" style={styles.precipIcon}>
            💧
          </Typography>
          <Typography variant="muted" style={styles.precipitation}>
            {item.precipitation}%
          </Typography>
        </View>
      </Card>
    )
  }

  const renderFooter = () => {
    if (!isLoadingMore) return null

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.brand} />
        <Typography variant="muted" style={styles.loadingText}>
          Loading more hours...
        </Typography>
      </View>
    )
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <Typography variant="heading">Hourly Forecast</Typography>
      <Typography variant="muted">{location.name}</Typography>
      <Typography variant="muted" style={styles.headerSubtitle}>
        Scroll for more hours
      </Typography>
    </View>
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.hour}-${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  header: {
    alignItems: "center",
    marginRight: spacing.lg,
    paddingRight: spacing.lg,
    borderRightWidth: 2,
    borderRightColor: colors.brand,
  },
  headerSubtitle: {
    marginTop: spacing.xs,
    fontSize: 11,
  },
  hourCard: {
    width: 100,
    padding: spacing.md,
    alignItems: "center",
  },
  currentHourCard: {
    borderWidth: 2,
    borderColor: colors.brand,
    backgroundColor: colors.surfaceAccent,
  },
  hour: {
    marginBottom: spacing.xs,
  },
  temperature: {
    marginVertical: spacing.xs,
    fontSize: 24,
  },
  condition: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  precipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  precipIcon: {
    marginRight: 2,
    fontSize: 10,
  },
  precipitation: {
    fontSize: 11,
  },
  footer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  loadingText: {
    marginTop: spacing.xs,
    fontSize: 11,
    textAlign: "center",
  },
})
