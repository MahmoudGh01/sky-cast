import { render, fireEvent } from "@testing-library/react-native"

import PreferencesForm from "../PreferencesForm"

const mockPreferences = {
  displayName: "John Doe",
  homeCity: "New York",
  dailySummaryTime: "07:30",
  useMetricUnits: true,
  severeAlertsOnly: false,
}

describe("PreferencesForm", () => {
  it("renders without crashing (smoke test)", () => {
    const mockHandlers = {
      onDisplayNameChange: jest.fn(),
      onHomeCityChange: jest.fn(),
      onDailySummaryTimeChange: jest.fn(),
      onUseMetricUnitsChange: jest.fn(),
      onSevereAlertsOnlyChange: jest.fn(),
    }

    const { getByDisplayValue } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError={undefined}
        {...mockHandlers}
      />,
    )

    expect(getByDisplayValue("John Doe")).toBeTruthy()
  })

  it("calls onDisplayNameChange when display name is updated", () => {
    const mockOnDisplayNameChange = jest.fn()
    const mockHandlers = {
      onDisplayNameChange: mockOnDisplayNameChange,
      onHomeCityChange: jest.fn(),
      onDailySummaryTimeChange: jest.fn(),
      onUseMetricUnitsChange: jest.fn(),
      onSevereAlertsOnlyChange: jest.fn(),
    }

    const { getByDisplayValue } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError={undefined}
        {...mockHandlers}
      />,
    )

    const displayNameInput = getByDisplayValue("John Doe")
    fireEvent.changeText(displayNameInput, "Jane Smith")

    expect(mockOnDisplayNameChange).toHaveBeenCalledWith("Jane Smith")
  })

  it("calls onHomeCityChange when home city is updated", () => {
    const mockOnHomeCityChange = jest.fn()
    const mockHandlers = {
      onDisplayNameChange: jest.fn(),
      onHomeCityChange: mockOnHomeCityChange,
      onDailySummaryTimeChange: jest.fn(),
      onUseMetricUnitsChange: jest.fn(),
      onSevereAlertsOnlyChange: jest.fn(),
    }

    const { getByDisplayValue } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError={undefined}
        {...mockHandlers}
      />,
    )

    const homeCityInput = getByDisplayValue("New York")
    fireEvent.changeText(homeCityInput, "Los Angeles")

    expect(mockOnHomeCityChange).toHaveBeenCalledWith("Los Angeles")
  })

  it("calls onDailySummaryTimeChange when time is updated", () => {
    const mockOnDailySummaryTimeChange = jest.fn()
    const mockHandlers = {
      onDisplayNameChange: jest.fn(),
      onHomeCityChange: jest.fn(),
      onDailySummaryTimeChange: mockOnDailySummaryTimeChange,
      onUseMetricUnitsChange: jest.fn(),
      onSevereAlertsOnlyChange: jest.fn(),
    }

    const { getByDisplayValue } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError={undefined}
        {...mockHandlers}
      />,
    )

    const timeInput = getByDisplayValue("07:30")
    fireEvent.changeText(timeInput, "08:00")

    expect(mockOnDailySummaryTimeChange).toHaveBeenCalledWith("08:00")
  })

  it("displays time error when provided", () => {
    const mockHandlers = {
      onDisplayNameChange: jest.fn(),
      onHomeCityChange: jest.fn(),
      onDailySummaryTimeChange: jest.fn(),
      onUseMetricUnitsChange: jest.fn(),
      onSevereAlertsOnlyChange: jest.fn(),
    }

    const { getByText } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError="Invalid time format"
        {...mockHandlers}
      />,
    )

    expect(getByText("Invalid time format")).toBeTruthy()
  })

  it("calls onUseMetricUnitsChange when switch is toggled", () => {
    const mockOnUseMetricUnitsChange = jest.fn()
    const mockHandlers = {
      onDisplayNameChange: jest.fn(),
      onHomeCityChange: jest.fn(),
      onDailySummaryTimeChange: jest.fn(),
      onUseMetricUnitsChange: mockOnUseMetricUnitsChange,
      onSevereAlertsOnlyChange: jest.fn(),
    }

    const { getByTestId } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError={undefined}
        {...mockHandlers}
      />,
    )

    const useMetricSwitch = getByTestId("useMetricUnitsSwitch")
    fireEvent(useMetricSwitch, "onValueChange", false)

    expect(mockOnUseMetricUnitsChange).toHaveBeenCalledWith(false)
  })

  it("calls onSevereAlertsOnlyChange when switch is toggled", () => {
    const mockOnSevereAlertsOnlyChange = jest.fn()
    const mockHandlers = {
      onDisplayNameChange: jest.fn(),
      onHomeCityChange: jest.fn(),
      onDailySummaryTimeChange: jest.fn(),
      onUseMetricUnitsChange: jest.fn(),
      onSevereAlertsOnlyChange: mockOnSevereAlertsOnlyChange,
    }

    const { getByTestId } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError={undefined}
        {...mockHandlers}
      />,
    )

    const severeAlertsSwitch = getByTestId("severeAlertsOnlySwitch")
    fireEvent(severeAlertsSwitch, "onValueChange", true)

    expect(mockOnSevereAlertsOnlyChange).toHaveBeenCalledWith(true)
  })

  it("renders all form fields with correct values", () => {
    const mockHandlers = {
      onDisplayNameChange: jest.fn(),
      onHomeCityChange: jest.fn(),
      onDailySummaryTimeChange: jest.fn(),
      onUseMetricUnitsChange: jest.fn(),
      onSevereAlertsOnlyChange: jest.fn(),
    }

    const { getByDisplayValue, getByText } = render(
      <PreferencesForm
        preferences={mockPreferences}
        timeError={undefined}
        {...mockHandlers}
      />,
    )

    expect(getByDisplayValue("John Doe")).toBeTruthy()
    expect(getByDisplayValue("New York")).toBeTruthy()
    expect(getByDisplayValue("07:30")).toBeTruthy()
    expect(getByText("Use metric units")).toBeTruthy()
    expect(getByText("Severe alerts only")).toBeTruthy()
  })
})
