import { render } from "@testing-library/react-native"

import Badge from "../Badge"

describe("Badge", () => {
  it("renders without crashing (smoke test)", () => {
    const { getByText } = render(<Badge>Test Badge</Badge>)
    expect(getByText("Test Badge")).toBeTruthy()
  })

  it("displays children correctly", () => {
    const { getByText } = render(<Badge>Premium</Badge>)
    expect(getByText("Premium")).toBeTruthy()
  })
})
