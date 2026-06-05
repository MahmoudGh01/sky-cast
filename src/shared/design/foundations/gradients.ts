import { gradients as colorGradients } from "./colors"

// Weather condition mapping for gradients
export type WeatherCondition =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "snowy"
  | "night"
  | "nightClear"

export type GradientColors = {
  colors: string[]
  locations?: number[]
}

export const getWeatherGradient = (
  condition: WeatherCondition,
): GradientColors => {
  const gradient = colorGradients[condition]
  return {
    colors: [gradient.start, gradient.middle, gradient.end],
    locations: [0, 0.5, 1],
  }
}

// Get gradient based on weather code and time
export const getGradientForWeather = (
  weatherCode: number,
  isNight: boolean,
): GradientColors => {
  if (isNight) {
    // Clear night
    if (weatherCode === 0 || weatherCode === 1) {
      return getWeatherGradient("nightClear")
    }
    // Any other night condition
    return getWeatherGradient("night")
  }

  // Daytime conditions
  if (weatherCode === 0) return getWeatherGradient("sunny") // Clear sky
  if (weatherCode === 1 || weatherCode === 2)
    return getWeatherGradient("partlyCloudy") // Partly cloudy
  if (weatherCode === 3) return getWeatherGradient("cloudy") // Cloudy
  if (weatherCode >= 45 && weatherCode <= 48)
    return getWeatherGradient("cloudy") // Fog
  if (weatherCode >= 51 && weatherCode <= 67) return getWeatherGradient("rainy") // Rain
  if (weatherCode >= 71 && weatherCode <= 77) return getWeatherGradient("snowy") // Snow
  if (weatherCode >= 80 && weatherCode <= 82) return getWeatherGradient("rainy") // Rain showers
  if (weatherCode >= 85 && weatherCode <= 86) return getWeatherGradient("snowy") // Snow showers
  if (weatherCode >= 95 && weatherCode <= 99)
    return getWeatherGradient("stormy") // Thunderstorm

  // Default to partly cloudy
  return getWeatherGradient("partlyCloudy")
}
