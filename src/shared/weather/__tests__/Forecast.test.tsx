import { render, waitFor } from "@testing-library/react-native"

import { Forecast } from "../Forecast"

const mockLocation = {
  name: "New York",
  latitude: 40.7128,
  longitude: -74.006,
}

const mockForecastResponse = {
  daily: {
    time: ["2026-06-04", "2026-06-05", "2026-06-06"],
    temperature_2m_max: [25, 28, 22],
    temperature_2m_min: [15, 18, 12],
    weather_code: [0, 1, 3],
  },
}

describe("Forecast", () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockForecastResponse),
      }),
    ) as jest.Mock
  })

  it("renders without crashing (smoke test)", async () => {
    const { getByText } = render(<Forecast location={mockLocation} />)

    await waitFor(() => {
      expect(getByText("25 C")).toBeTruthy()
    })
  })

  it("fetches and displays forecast data with metric units", async () => {
    const { getByText } = render(
      <Forecast location={mockLocation} useMetricUnits={true} />,
    )

    await waitFor(() => {
      expect(getByText("25 C")).toBeTruthy()
      expect(getByText("15 C")).toBeTruthy()
      expect(getByText("Clear")).toBeTruthy()
      expect(getByText("28 C")).toBeTruthy()
      expect(getByText("18 C")).toBeTruthy()
      expect(getByText("Cloudy")).toBeTruthy()
    })
  })

  it("fetches and displays forecast data with imperial units", async () => {
    const { getByText } = render(
      <Forecast location={mockLocation} useMetricUnits={false} />,
    )

    await waitFor(() => {
      expect(getByText("77 F")).toBeTruthy()
      expect(getByText("59 F")).toBeTruthy()
    })
  })

  it("calls fetch with correct API URL", async () => {
    render(<Forecast location={mockLocation} />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `latitude=${mockLocation.latitude}&longitude=${mockLocation.longitude}`,
        ),
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "daily=temperature_2m_max,temperature_2m_min,weather_code",
        ),
      )
    })
  })

  it("displays multiple forecast days", async () => {
    const { getByText } = render(<Forecast location={mockLocation} />)

    await waitFor(() => {
      expect(getByText("25 C")).toBeTruthy()
      expect(getByText("28 C")).toBeTruthy()
      expect(getByText("22 C")).toBeTruthy()
    })
  })
})
