import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "user-preferences"

export type UserPreferences = {
  displayName: string
  homeCity: string
  dailySummaryTime: string
  useMetricUnits: boolean
  severeAlertsOnly: boolean
}

const defaultPreferences: UserPreferences = {
  displayName: "Sky watcher",
  homeCity: "Barcelona",
  dailySummaryTime: "07:30",
  useMetricUnits: true,
  severeAlertsOnly: false,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object"
}

function normalizeText(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback

  const trimmed = value.trim()
  if (!trimmed) return fallback

  return trimmed
}

function normalizeTime(value: unknown): string {
  if (typeof value !== "string") return defaultPreferences.dailySummaryTime

  const trimmed = value.trim()
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(trimmed)) {
    return defaultPreferences.dailySummaryTime
  }

  return trimmed
}

function normalizePreferences(value: unknown): UserPreferences {
  if (!isRecord(value)) return defaultPreferences

  return {
    displayName: normalizeText(
      value.displayName,
      defaultPreferences.displayName,
    ),
    homeCity: normalizeText(value.homeCity, defaultPreferences.homeCity),
    dailySummaryTime: normalizeTime(value.dailySummaryTime),
    useMetricUnits:
      typeof value.useMetricUnits === "boolean"
        ? value.useMetricUnits
        : defaultPreferences.useMetricUnits,
    severeAlertsOnly:
      typeof value.severeAlertsOnly === "boolean"
        ? value.severeAlertsOnly
        : defaultPreferences.severeAlertsOnly,
  }
}

function preferencesToPersist(value: UserPreferences): UserPreferences {
  return {
    displayName: normalizeText(
      value.displayName,
      defaultPreferences.displayName,
    ),
    homeCity: normalizeText(value.homeCity, defaultPreferences.homeCity),
    dailySummaryTime: isDailySummaryTimeValid(value.dailySummaryTime)
      ? value.dailySummaryTime.trim()
      : defaultPreferences.dailySummaryTime,
    useMetricUnits: value.useMetricUnits,
    severeAlertsOnly: value.severeAlertsOnly,
  }
}

function isDailySummaryTimeValid(value: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value.trim())
}

export function useUserPreferences(): {
  preferences: UserPreferences
  isHydrated: boolean
  timeError: string | undefined
  setDisplayName: (value: string) => void
  setHomeCity: (value: string) => void
  setDailySummaryTime: (value: string) => void
  setUseMetricUnits: (value: boolean) => void
  setSevereAlertsOnly: (value: boolean) => void
} {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    void (async () => {
      const cached = await AsyncStorage.getItem(STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached) as unknown
        setPreferences(normalizePreferences(parsed))
      }

      setIsHydrated(true)
    })()
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const prepared = preferencesToPersist(preferences)
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prepared))
  }, [preferences, isHydrated])

  const setDisplayName = useCallback((value: string) => {
    setPreferences((current) => ({ ...current, displayName: value }))
  }, [])

  const setHomeCity = useCallback((value: string) => {
    setPreferences((current) => ({ ...current, homeCity: value }))
  }, [])

  const setDailySummaryTime = useCallback((value: string) => {
    setPreferences((current) => ({ ...current, dailySummaryTime: value }))
  }, [])

  const setUseMetricUnits = useCallback((value: boolean) => {
    setPreferences((current) => ({ ...current, useMetricUnits: value }))
  }, [])

  const setSevereAlertsOnly = useCallback((value: boolean) => {
    setPreferences((current) => ({ ...current, severeAlertsOnly: value }))
  }, [])

  const timeError = useMemo(() => {
    if (isDailySummaryTimeValid(preferences.dailySummaryTime)) return undefined
    return "Use 24-hour format HH:MM"
  }, [preferences.dailySummaryTime])

  return {
    preferences,
    isHydrated,
    timeError,
    setDisplayName,
    setHomeCity,
    setDailySummaryTime,
    setUseMetricUnits,
    setSevereAlertsOnly,
  }
}
