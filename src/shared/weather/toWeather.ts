const codeMap = {
  0: "Clear",
  1: "Cloudy",
  2: "Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "LightRain",
  53: "ModerateRain",
  55: "HeavyRain",
  61: "LightRain",
  63: "ModerateRain",
  65: "HeavyRain",
  80: "LightRain",
  81: "ModerateRain",
  82: "HeavyRain",
  56: "LightRain",
  57: "HeavyRain",
  66: "LightRain",
  67: "HeavyRain",
  71: "LightSnow",
  73: "ModerateSnow",
  75: "HeavySnow",
  77: "LightSnow",
  85: "LightSnow",
  86: "HeavySnow",
} as const

type WeatherCode = keyof typeof codeMap
export type Weather = (typeof codeMap)[WeatherCode]

function toWeather(input: number): Weather {
  if (input in codeMap) {
    return codeMap[input as WeatherCode]
  }

  throw new Error("toWeather: Invalid input.")
}

export default toWeather
