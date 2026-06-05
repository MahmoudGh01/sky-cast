import { type StyleProp, type ViewStyle, StyleSheet, View } from "react-native"

import { colors, shadows, shapes, spacing } from "#design/foundations"

type CardProps = {
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  variant?: "default" | "glass" | "solid"
  noPadding?: boolean
}

const Card: React.FC<CardProps> = ({
  style,
  children,
  variant = "glass",
  noPadding = false,
  ...props
}) => {
  const variantStyle =
    variant === "glass"
      ? styles.glass
      : variant === "solid"
        ? styles.solid
        : styles.default

  return (
    <View
      {...props}
      style={[
        styles.container,
        variantStyle,
        noPadding && styles.noPadding,
        style,
      ]}
    >
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: shapes.radiusLg,
    overflow: "hidden",
  },
  glass: {
    backgroundColor: colors.surface,
    backdropFilter: "blur(20px)",
    ...shadows.card,
  },
  solid: {
    backgroundColor: colors.surfaceStrong,
    ...shadows.card,
  },
  default: {
    backgroundColor: colors.surface,
    ...shadows.main,
  },
  noPadding: {
    padding: 0,
  },
})
