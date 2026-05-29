import { Stack } from "expo-router"

import { SettingsScreen } from "#shared/settings"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />

      <SettingsScreen />
    </>
  )
}

export default App
