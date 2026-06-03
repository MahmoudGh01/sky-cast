import { render } from "@testing-library/react-native"

import LinkButton from "../LinkButton"

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}))

describe("LinkButton", () => {
  it("renders without crashing (smoke test)", () => {
    const { getByText } = render(<LinkButton href="/" label="Test Button" />)
    expect(getByText("Test Button")).toBeTruthy()
  })

  it("displays the label correctly", () => {
    const { getByText } = render(<LinkButton href="/" label="Go Home" />)
    expect(getByText("Go Home")).toBeTruthy()
  })
})
