import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import Screen from "../Screen"

describe("Screen", () => {
  it("renders without crashing (smoke test)", () => {
    const { getByText } = render(
      <Screen>
        <Text>Screen Content</Text>
      </Screen>,
    )
    expect(getByText("Screen Content")).toBeTruthy()
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <Screen>
        <Text>Test Child</Text>
      </Screen>,
    )
    expect(getByText("Test Child")).toBeTruthy()
  })
})
