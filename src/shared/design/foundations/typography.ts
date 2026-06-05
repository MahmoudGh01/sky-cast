import { type TextStyle } from "react-native"

import {
  body as bodyColor,
  bodySecondary as bodySecondaryColor,
  muted as mutedColor,
} from "./colors"

const baseSize = 16

// Apple Weather uses SF Pro font (system font on iOS)
// Large display sizes for temperature
export const displayLarge: TextStyle = {
  fontSize: 96,
  fontWeight: "200", // Ultra Light
  color: bodyColor,
  letterSpacing: -2,
}

export const displayMedium: TextStyle = {
  fontSize: 64,
  fontWeight: "300", // Light
  color: bodyColor,
  letterSpacing: -1.5,
}

export const displaySmall: TextStyle = {
  fontSize: 48,
  fontWeight: "300",
  color: bodyColor,
  letterSpacing: -1,
}

// Title hierarchy
export const title: TextStyle = {
  fontSize: baseSize * 2.125, // 34px
  fontWeight: "700",
  color: bodyColor,
  letterSpacing: 0.4,
}

export const title2: TextStyle = {
  fontSize: baseSize * 1.75, // 28px
  fontWeight: "600",
  color: bodyColor,
}

export const title3: TextStyle = {
  fontSize: baseSize * 1.375, // 22px
  fontWeight: "600",
  color: bodyColor,
}

export const subtitle: TextStyle = {
  fontSize: baseSize * 0.9375, // 15px
  color: bodySecondaryColor,
  fontWeight: "400",
}

export const heading: TextStyle = {
  fontSize: baseSize * 1.0625, // 17px
  fontWeight: "600",
  color: bodyColor,
}

export const body: TextStyle = {
  fontSize: baseSize * 1.0625, // 17px
  color: bodyColor,
  fontWeight: "400",
}

export const bodySecondary: TextStyle = {
  fontSize: baseSize * 0.9375, // 15px
  color: bodySecondaryColor,
  fontWeight: "400",
}

export const large: TextStyle = {
  fontSize: baseSize * 1.25, // 20px
  color: bodyColor,
  fontWeight: "500",
}

export const muted: TextStyle = {
  fontSize: baseSize * 0.9375, // 15px
  color: mutedColor,
  fontWeight: "400",
}

export const label: TextStyle = {
  fontSize: baseSize * 0.8125, // 13px
  fontWeight: "400",
  color: mutedColor,
  textTransform: "uppercase" as const,
  letterSpacing: 0.5,
}

export const strongLabel: TextStyle = {
  fontSize: baseSize * 0.9375, // 15px
  fontWeight: "600",
  color: bodyColor,
  letterSpacing: 0.2,
}

export const badge: TextStyle = {
  fontSize: baseSize * 0.6875, // 11px
  fontWeight: "600",
  color: bodyColor,
  textTransform: "uppercase" as const,
  letterSpacing: 0.6,
}

export const caption: TextStyle = {
  fontSize: baseSize * 0.75, // 12px
  color: mutedColor,
  fontWeight: "400",
}
