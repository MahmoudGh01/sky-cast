import { Stack } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"
import { CurrentWeather, Forecast } from "#shared/weather"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <Screen>
        <View style={styles.header}>
          <Typography variant="title">SkyCast</Typography>
          <Typography variant="subtitle">Weather, your way</Typography>
        </View>

        <CurrentWeather location={location} />
        <Forecast location={location} />
      </Screen>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
})
