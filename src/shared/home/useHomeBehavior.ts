import { useMemo } from "react"

import { citiesById, useFavorites } from "#shared/favorites"
import { useUserPreferences } from "#shared/settings"
import { type WeatherLocation } from "#shared/weather"

function normalizeCityLookup(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-")
}

export function useHomeBehavior(): {
  isHydrated: boolean
  location: WeatherLocation
  displayName: string
  dailySummaryTime: string
  severeAlertsOnly: boolean
  useMetricUnits: boolean
  favorites: Array<{ id: string; name: string }>
} {
  const { favorites, allCities, isHydrated: favoritesHydrated } = useFavorites()
  const { preferences, isHydrated: preferencesHydrated } = useUserPreferences()

  const location = useMemo<WeatherLocation>(() => {
    const normalizedHomeCity = normalizeCityLookup(preferences.homeCity)

    const byId = Object.hasOwn(citiesById, normalizedHomeCity)
      ? citiesById[normalizedHomeCity as keyof typeof citiesById]
      : undefined
    if (byId) return byId

    const byName = allCities.find(
      (city) =>
        city.name.toLowerCase() === preferences.homeCity.trim().toLowerCase(),
    )
    if (byName) return byName

    return favorites[0] ?? citiesById.barcelona
  }, [allCities, favorites, preferences.homeCity])

  return {
    isHydrated: favoritesHydrated && preferencesHydrated,
    location,
    displayName: preferences.displayName,
    dailySummaryTime: preferences.dailySummaryTime,
    severeAlertsOnly: preferences.severeAlertsOnly,
    useMetricUnits: preferences.useMetricUnits,
    favorites: favorites.map((favorite) => ({
      id: favorite.id,
      name: favorite.name,
    })),
  }
}
