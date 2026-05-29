import { Stack } from "expo-router"

import { HomeScreen } from "#shared/home"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <HomeScreen />
    </>
  )
}

export default App
