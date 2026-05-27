import { type TextStyle } from "react-native"

import {
  body as bodyColor,
  brand as brandColor,
  muted as mutedColor,
  subtle as subtleColor,
} from "./colors"

const baseSize = 16

export const title: TextStyle = {
  fontSize: baseSize * 1.75,
  fontWeight: "700",
  color: brandColor,
}

export const subtitle: TextStyle = {
  fontSize: baseSize * 0.8125,
  color: mutedColor,
}

export const heading: TextStyle = {
  fontSize: baseSize * 1.5,
  fontWeight: "700",
  color: brandColor,
}

export const body: TextStyle = {
  fontSize: baseSize,
  color: bodyColor,
}

export const large: TextStyle = {
  fontSize: baseSize * 1.25,
  color: bodyColor,
}

export const muted: TextStyle = {
  fontSize: baseSize,
  color: mutedColor,
}

export const label: TextStyle = {
  fontSize: baseSize * 0.75,
  fontWeight: "600",
  color: subtleColor,
}

export const strongLabel: TextStyle = {
  fontSize: baseSize,
  fontWeight: "700",
  color: brandColor,
  letterSpacing: 0.5,
}

export const badge: TextStyle = {
  fontSize: baseSize * 0.75,
  fontWeight: "600",
  color: brandColor,
}
