import { Ionicons } from "@expo/vector-icons"
import { type StyleProp, type TextStyle } from "react-native"

import { colors } from "#design/foundations"

type WeatherIconProps = {
  weatherCode: number
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

// Map Open-Meteo weather codes to Ionicons
const getIconName = (weatherCode: number): keyof typeof Ionicons.glyphMap => {
  // Clear sky
  if (weatherCode === 0) return "sunny"

  // Partly cloudy
  if (weatherCode === 1 || weatherCode === 2) return "partly-sunny"

  // Cloudy / Overcast
  if (weatherCode === 3) return "cloudy"

  // Fog
  if (weatherCode >= 45 && weatherCode <= 48) return "cloudy"

  // Drizzle
  if (weatherCode >= 51 && weatherCode <= 55) return "rainy"

  // Freezing drizzle
  if (weatherCode >= 56 && weatherCode <= 57) return "rainy"

  // Rain
  if (weatherCode >= 61 && weatherCode <= 65) return "rainy"

  // Freezing rain
  if (weatherCode >= 66 && weatherCode <= 67) return "rainy"

  // Snow
  if (weatherCode >= 71 && weatherCode <= 77) return "snow"

  // Rain showers
  if (weatherCode >= 80 && weatherCode <= 82) return "rainy"

  // Snow showers
  if (weatherCode >= 85 && weatherCode <= 86) return "snow"

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) return "thunderstorm"

  // Default to partly sunny
  return "partly-sunny"
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  weatherCode,
  size = 64,
  color = colors.body,
  style,
}) => {
  const iconName = getIconName(weatherCode)

  return <Ionicons name={iconName} size={size} color={color} style={style} />
}

export default WeatherIcon
