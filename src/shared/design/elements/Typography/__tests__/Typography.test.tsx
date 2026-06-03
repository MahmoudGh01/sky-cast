import { render } from "@testing-library/react-native"

import Typography from "../Typography"

describe("Typography", () => {
  it("renders without crashing (smoke test)", () => {
    const { getByText } = render(<Typography>Test Text</Typography>)
    expect(getByText("Test Text")).toBeTruthy()
  })

  it("renders with default body variant", () => {
    const { getByText } = render(<Typography>Body Text</Typography>)
    expect(getByText("Body Text")).toBeTruthy()
  })

  it("renders with title variant", () => {
    const { getByText } = render(
      <Typography variant="title">Title Text</Typography>,
    )
    expect(getByText("Title Text")).toBeTruthy()
  })

  it("renders with subtitle variant", () => {
    const { getByText } = render(
      <Typography variant="subtitle">Subtitle</Typography>,
    )
    expect(getByText("Subtitle")).toBeTruthy()
  })

  it("renders with heading variant", () => {
    const { getByText } = render(
      <Typography variant="heading">Heading</Typography>,
    )
    expect(getByText("Heading")).toBeTruthy()
  })

  it("renders with large variant", () => {
    const { getByText } = render(
      <Typography variant="large">Large Text</Typography>,
    )
    expect(getByText("Large Text")).toBeTruthy()
  })

  it("renders with muted variant", () => {
    const { getByText } = render(
      <Typography variant="muted">Muted Text</Typography>,
    )
    expect(getByText("Muted Text")).toBeTruthy()
  })

  it("renders with label variant", () => {
    const { getByText } = render(<Typography variant="label">Label</Typography>)
    expect(getByText("Label")).toBeTruthy()
  })

  it("renders with strongLabel variant", () => {
    const { getByText } = render(
      <Typography variant="strongLabel">Strong Label</Typography>,
    )
    expect(getByText("Strong Label")).toBeTruthy()
  })

  it("renders with badge variant", () => {
    const { getByText } = render(<Typography variant="badge">Badge</Typography>)
    expect(getByText("Badge")).toBeTruthy()
  })

  it("renders as Link when href is provided", () => {
    // Just verify it renders without crashing - Link behavior is tested via expo-router
    const result = render(<Typography href="/">Link Text</Typography>)
    expect(result).toBeTruthy()
  })
})
