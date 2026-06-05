import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import toWeather, { type Weather } from "./toWeather"
import { type WeatherLocation } from "./types"
import WeatherIcon from "./WeatherIcon"

export const CurrentWeather: React.FC<{
  location: WeatherLocation
  useMetricUnits?: boolean
}> = ({ location, useMetricUnits = true }) => {
  const [data, setData] = useState<{
    condition: Weather
    temperature: number
    wind: number
    humidity: number
    uv: number
    weatherCode: number
  }>()

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`,
      )
      const data = (await response.json()) as {
        current: {
          weather_code: number
          temperature_2m: number
          wind_speed_10m: number
          relative_humidity_2m: number
          uv_index: number
        }
      }

      setData({
        condition: toWeather(data.current.weather_code),
        temperature: data.current.temperature_2m,
        wind: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m,
        uv: data.current.uv_index,
        weatherCode: data.current.weather_code,
      })
    })()
  }, [location])

  const tempCelsius = data?.temperature ?? 0
  const tempFahrenheit = (tempCelsius * 9) / 5 + 32
  const displayTemp = useMetricUnits
    ? tempCelsius.toFixed(0)
    : tempFahrenheit.toFixed(0)
  const tempUnit = useMetricUnits ? "°" : "°"

  return (
    <View style={styles.container}>
      {/* Location Name */}
      <View style={styles.header}>
        <Typography variant="title2">{location.name}</Typography>
        <Typography variant="large">{data?.condition ?? "--"}</Typography>
      </View>

      {/* Large Temperature Display */}
      <View style={styles.temperatureSection}>
        <View style={styles.temperatureRow}>
          <Typography variant="displayLarge" style={styles.temperature}>
            {data ? displayTemp : "--"}
          </Typography>
          <Typography variant="displaySmall" style={styles.unit}>
            {tempUnit}
          </Typography>
        </View>
        {data && (
          <WeatherIcon
            weatherCode={data.weatherCode}
            size={100}
            style={styles.weatherIcon}
          />
        )}
      </View>

      {/* Weather Details Cards */}
      <View style={styles.detailsGrid}>
        <Card variant="glass" style={styles.detailCard}>
          <Typography variant="caption" style={styles.detailLabel}>
            WIND
          </Typography>
          <Typography variant="title3" style={styles.detailValue}>
            {data
              ? `${
                  useMetricUnits
                    ? data.wind.toFixed(0)
                    : (data.wind * 0.621371).toFixed(0)
                } ${useMetricUnits ? "km/h" : "mph"}`
              : "--"}
          </Typography>
        </Card>

        <Card variant="glass" style={styles.detailCard}>
          <Typography variant="caption" style={styles.detailLabel}>
            HUMIDITY
          </Typography>
          <Typography variant="title3" style={styles.detailValue}>
            {data ? `${data.humidity.toFixed(0)}%` : "--"}
          </Typography>
        </Card>

        <Card variant="glass" style={styles.detailCard}>
          <Typography variant="caption" style={styles.detailLabel}>
            UV INDEX
          </Typography>
          <Typography variant="title3" style={styles.detailValue}>
            {data?.uv.toFixed(0) ?? "--"}
          </Typography>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xxl,
    marginTop: spacing.xxxl,
  },
  temperatureSection: {
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },
  temperatureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  temperature: {
    lineHeight: 96,
  },
  unit: {
    marginTop: spacing.md,
    lineHeight: 48,
  },
  weatherIcon: {
    marginTop: spacing.lg,
  },
  detailsGrid: {
    flexDirection: "row",
    gap: spacing.md,
    flexWrap: "wrap",
  },
  detailCard: {
    flex: 1,
    minWidth: 100,
    alignItems: "flex-start",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  detailLabel: {
    marginBottom: spacing.xs,
    opacity: 0.8,
  },
  detailValue: {
    fontWeight: "600",
  },
})
