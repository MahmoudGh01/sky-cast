import { Stack } from "expo-router"

import { SettingsScreen } from "#shared/settings"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SettingsScreen />
    </>
  )
}

export default App
