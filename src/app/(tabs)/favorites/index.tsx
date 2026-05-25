import { Link } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"

const favoriteCities = ["lisbon", "tokyo", "dakar"]

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>
      <Text style={styles.subtitle}>Pick one for a detailed forecast</Text>

      {favoriteCities.map((city) => (
        <Link key={city} href={`/favorites/${city}`} asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>{city.toUpperCase()}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fbff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0b4f6c",
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 20,
    color: "#4b6b7c",
  },
  link: {
    width: 220,
    backgroundColor: "#d9ecf7",
    borderRadius: 14,
    paddingVertical: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  linkText: {
    color: "#0b4f6c",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
})
