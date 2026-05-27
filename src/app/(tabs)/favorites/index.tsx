import { StyleSheet } from "react-native"

import LinkButton from "#design/elements/LinkButton"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"

const favoriteCities = ["lisbon", "tokyo", "dakar"]

const App: React.FC = () => {
  return (
    <Screen>
      <Typography variant="heading">Favorite Cities</Typography>
      <Typography variant="subtitle" style={styles.subtitle}>
        Pick one for a detailed forecast
      </Typography>

      {favoriteCities.map((city) => (
        <LinkButton
          key={city}
          href={`/favorites/${city}`}
          label={city.toUpperCase()}
        />
      ))}
    </Screen>
  )
}

export default App

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
})
