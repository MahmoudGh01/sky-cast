import { LinearGradient } from "expo-linear-gradient"
import { type StyleProp, type ViewStyle, StyleSheet } from "react-native"

import { getGradientForWeather } from "../../foundations/gradients"

type GradientBackgroundProps = {
  weatherCode: number
  isNight?: boolean
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  weatherCode,
  isNight = false,
  style,
  children,
}) => {
  const gradient = getGradientForWeather(weatherCode, isNight)

  return (
    <LinearGradient
      colors={gradient.colors as [string, string, ...string[]]}
      locations={gradient.locations as [number, number, ...number[]]}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {children}
    </LinearGradient>
  )
}

export default GradientBackground

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
