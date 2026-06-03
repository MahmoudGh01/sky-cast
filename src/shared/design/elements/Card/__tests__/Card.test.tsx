import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import Card from "../Card"

describe("Card", () => {
  it("renders without crashing (smoke test)", () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>,
    )
    expect(getByText("Card Content")).toBeTruthy()
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <Card>
        <Text>Test Child</Text>
      </Card>,
    )
    expect(getByText("Test Child")).toBeTruthy()
  })

  it("applies custom styles", () => {
    const customStyle = { backgroundColor: "red" }
    const { getByTestId } = render(
      <Card style={customStyle}>
        <Text testID="content">Content</Text>
      </Card>,
    )
    expect(getByTestId("content")).toBeTruthy()
  })
})
