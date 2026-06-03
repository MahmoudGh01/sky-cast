import { render, waitFor } from "@testing-library/react-native"

import { CurrentWeather } from "../CurrentWeather"

const mockLocation = {
  name: "New York",
  latitude: 40.7128,
  longitude: -74.006,
}

const mockWeatherResponse = {
  current: {
    weather_code: 0,
    temperature_2m: 20,
    wind_speed_10m: 10,
    relative_humidity_2m: 65,
    uv_index: 5,
  },
}

describe("CurrentWeather", () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherResponse),
      }),
    ) as jest.Mock
  })

  it("renders without crashing (smoke test)", async () => {
    const { getByText } = render(<CurrentWeather location={mockLocation} />)

    await waitFor(() => {
      expect(getByText("New York")).toBeTruthy()
    })
  })

  it("displays location name", async () => {
    const { getByText } = render(<CurrentWeather location={mockLocation} />)

    await waitFor(() => {
      expect(getByText("New York")).toBeTruthy()
    })
  })

  it("fetches and displays weather data with metric units", async () => {
    const { getByText } = render(
      <CurrentWeather location={mockLocation} useMetricUnits={true} />,
    )

    await waitFor(() => {
      expect(getByText("20 C")).toBeTruthy()
      expect(getByText("Clear")).toBeTruthy()
      expect(getByText("10 km/h")).toBeTruthy()
      expect(getByText("65%")).toBeTruthy()
      expect(getByText("5")).toBeTruthy()
    })
  })

  it("fetches and displays weather data with imperial units", async () => {
    const { getByText } = render(
      <CurrentWeather location={mockLocation} useMetricUnits={false} />,
    )

    await waitFor(() => {
      expect(getByText("68 F")).toBeTruthy()
      expect(getByText("6 mph")).toBeTruthy()
    })
  })

  it("calls fetch with correct API URL", async () => {
    render(<CurrentWeather location={mockLocation} />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `latitude=${mockLocation.latitude}&longitude=${mockLocation.longitude}`,
        ),
      )
    })
  })

  it("displays loading state initially", () => {
    const { getByText, getAllByText } = render(
      <CurrentWeather location={mockLocation} />,
    )

    // Should have multiple "--" placeholders for loading state
    const loadingPlaceholders = getAllByText("--")
    expect(loadingPlaceholders.length).toBeGreaterThan(0)
    expect(getByText("New York")).toBeTruthy()
  })
})
