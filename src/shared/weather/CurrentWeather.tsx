import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import toWeather, { type Weather } from "./toWeather"
import { type WeatherLocation } from "./types"

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
      })
    })()
  }, [location])

  return (
    <Card>
      <View style={styles.current}>
        <Typography variant="title">
          {data
            ? `${
                useMetricUnits
                  ? data.temperature.toFixed(0)
                  : ((data.temperature * 9) / 5 + 32).toFixed(0)
              } ${useMetricUnits ? "C" : "F"}`
            : "--"}
        </Typography>
        <Typography variant="muted">{location.name}</Typography>
        <Typography variant="label">{data?.condition ?? "--"}</Typography>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Typography variant="large">
            {data
              ? `${
                  useMetricUnits
                    ? data.wind.toFixed(0)
                    : (data.wind * 0.621371).toFixed(0)
                } ${useMetricUnits ? "km/h" : "mph"}`
              : "--"}
          </Typography>
          <Typography variant="label">Wind</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">
            {data?.humidity.toFixed(0) ?? "--"}%
          </Typography>
          <Typography variant="label">Humidity</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">{data?.uv.toFixed(0) ?? "--"}</Typography>
          <Typography variant="label">UV</Typography>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  current: { alignItems: "center", marginBottom: spacing.xl },
  stats: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "center" },
})
