import { Tabs } from "expo-router"

const Layout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0b4f6c",
        tabBarStyle: { backgroundColor: "#f7fbff" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  )
}

export default Layout
