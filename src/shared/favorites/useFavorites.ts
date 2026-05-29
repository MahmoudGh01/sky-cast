import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useMemo, useState } from "react"

import { type WeatherLocation } from "#shared/weather"

const STORAGE_KEY = "favorites"

export const citiesById = {
  barcelona: { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 },
  lisbon: { name: "Lisbon", latitude: 38.7223, longitude: -9.1393 },
  tokyo: { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  dakar: { name: "Dakar", latitude: 14.7167, longitude: -17.4677 },
} as const satisfies Record<string, WeatherLocation>

type CityId = keyof typeof citiesById

const defaultFavoriteIds: CityId[] = ["lisbon", "tokyo", "dakar"]

type FavoriteCity = {
  id: CityId
} & WeatherLocation

type UseFavoritesResult = {
  favorites: FavoriteCity[]
  allCities: FavoriteCity[]
  isHydrated: boolean
  toggleFavorite: (cityId: CityId) => void
}

function sanitizeIds(ids: unknown): CityId[] {
  if (!Array.isArray(ids)) return defaultFavoriteIds

  const filtered = ids.filter(
    (id): id is CityId =>
      typeof id === "string" && Object.hasOwn(citiesById, id),
  )

  const unique = [...new Set(filtered)]
  if (unique.length === 0) return defaultFavoriteIds

  return unique
}

export function useFavorites(): UseFavoritesResult {
  const [favoriteIds, setFavoriteIds] = useState<CityId[]>(defaultFavoriteIds)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    void (async () => {
      const cached = await AsyncStorage.getItem(STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached) as unknown
        setFavoriteIds(sanitizeIds(parsed))
      }

      setIsHydrated(true)
    })()
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds, isHydrated])

  const allCities = useMemo<FavoriteCity[]>(
    () =>
      Object.entries(citiesById).map(([id, location]) => ({
        id: id as CityId,
        ...location,
      })),
    [],
  )

  const favorites = useMemo<FavoriteCity[]>(
    () =>
      favoriteIds.map((id) => ({
        id,
        ...citiesById[id],
      })),
    [favoriteIds],
  )

  const toggleFavorite = useCallback((cityId: CityId) => {
    setFavoriteIds((current) => {
      if (current.includes(cityId)) {
        if (current.length === 1) return current
        return current.filter((id) => id !== cityId)
      }

      return [...current, cityId]
    })
  }, [])

  return { favorites, allCities, isHydrated, toggleFavorite }
}
