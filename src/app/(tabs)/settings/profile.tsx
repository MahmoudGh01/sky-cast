import { StyleSheet } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import Screen from "#design/patterns/Screen"

const App: React.FC = () => {
  return (
    <Screen>
      <Typography variant="heading">Profile</Typography>
      <Typography variant="subtitle" style={styles.subtitle}>
        Sky watcher: M. Gharbi
      </Typography>
    </Screen>
  )
}

export default App

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.sm,
  },
})
