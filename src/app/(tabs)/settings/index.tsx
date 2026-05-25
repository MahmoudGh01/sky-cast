import { StyleSheet, Text, View } from "react-native"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Tune units and app behavior in class later.
      </Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7fbff",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0b4f6c",
  },
  subtitle: {
    marginTop: 8,
    color: "#4b6b7c",
    textAlign: "center",
  },
})
