import { StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"

const App: React.FC = () => {
  return (
    <Screen>
      <Typography variant="heading">Settings</Typography>
      <Typography variant="subtitle" style={styles.subtitle}>
        Tune units and app behavior in class later.
      </Typography>
    </Screen>
  )
}

export default App

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.sm,
    textAlign: "center",
  },
})
