import { Stack } from "expo-router"

const Layout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Favorites" }} />
      <Stack.Screen name="[id]" options={{ title: "City forecast" }} />
    </Stack>
  )
}

export default Layout
