import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreDependencies: [
    "expo-updates",
    "expo-system-ui",
    // Jest dependencies used in jest.config.cjs
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
    "@react-native/jest-preset",
    "@testing-library/jest-native",
    "babel-preset-expo",
  ],
}

export default config
