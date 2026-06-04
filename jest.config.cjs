module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-typescript", { allowDeclareFields: true }],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|react-native-reanimated|@react-navigation|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|@react-native-async-storage)/)",
  ],
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/shared/design/elements/**/*.{ts,tsx}",
    "src/shared/design/patterns/**/*.{ts,tsx}",
    "src/shared/weather/**/*.{ts,tsx}",
    "src/shared/settings/PreferencesForm.tsx",
    "!src/shared/**/index.ts",
    "!src/shared/weather/types.ts",
    "!src/shared/weather/HourlyForecast.tsx",
    "!src/shared/weather/WeatherAlerts.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  moduleNameMapper: {
    "^#shared/(.*)$": "<rootDir>/src/shared/$1/index.ts",
    "^#design/(.*)$": "<rootDir>/src/shared/design/$1/index.ts",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
}
