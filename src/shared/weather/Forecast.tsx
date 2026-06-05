import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

import toWeather, { type Weather } from "./toWeather"
import { type WeatherLocation } from "./types"
import WeatherIcon from "./WeatherIcon"

export const Forecast: React.FC<{
  location: WeatherLocation
  useMetricUnits?: boolean
}> = ({ location, useMetricUnits = true }) => {
  const [data, setData] = useState<
    Array<{
      day: string
      temperatureMax: number
      temperatureMin: number
      condition: Weather
      weatherCode: number
    }>
  >()

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      )
      const data = (await response.json()) as {
        daily: {
          time: string[]
          temperature_2m_max: number[]
          temperature_2m_min: number[]
          weather_code: number[]
        }
      }

      const forecast = []
      for (let i = 0; i < data.daily.time.length; i++) {
        forecast.push({
          day: data.daily.time[i],
          temperatureMax: data.daily.temperature_2m_max[i],
          temperatureMin: data.daily.temperature_2m_min[i],
          condition: toWeather(data.daily.weather_code[i]),
          weatherCode: data.daily.weather_code[i],
        })
      }

      setData(forecast)
    })()
  }, [location])

  const getDayName = (dateString: string, index: number): string => {
    if (index === 0) return "Today"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  return (
    <Card variant="glass" style={styles.container}>
      <View style={styles.header}>
        <Typography variant="label">7-DAY FORECAST</Typography>
      </View>
      {data?.map(
        (
          { day, temperatureMax, temperatureMin, condition, weatherCode },
          index,
        ) => (
          <View key={day} style={styles.dayRow}>
            <Typography variant="body" style={styles.dayName}>
              {getDayName(day, index)}
            </Typography>
            <View style={styles.weatherInfo}>
              <WeatherIcon
                weatherCode={weatherCode}
                size={28}
                color={colors.body}
              />
            </View>
            <View style={styles.temperatureRange}>
              <Typography variant="bodySecondary" style={styles.tempMin}>
                {useMetricUnits
                  ? `${temperatureMin.toFixed(0)}°`
                  : `${((temperatureMin * 9) / 5 + 32).toFixed(0)}°`}
              </Typography>
              <View style={styles.temperatureBar} />
              <Typography variant="body" style={styles.tempMax}>
                {useMetricUnits
                  ? `${temperatureMax.toFixed(0)}°`
                  : `${((temperatureMax * 9) / 5 + 32).toFixed(0)}°`}
              </Typography>
            </View>
          </View>
        ),
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.lg,
    paddingVertical: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.subtle,
  },
  dayName: {
    flex: 1,
    fontWeight: "500",
  },
  weatherInfo: {
    marginHorizontal: spacing.lg,
  },
  temperatureRange: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 120,
  },
  tempMin: {
    width: 35,
    textAlign: "right",
    opacity: 0.6,
  },
  temperatureBar: {
    height: 4,
    flex: 1,
    backgroundColor: colors.surfaceStrong,
    borderRadius: 2,
    marginHorizontal: spacing.sm,
  },
  tempMax: {
    width: 35,
    textAlign: "left",
    fontWeight: "600",
  },
})
