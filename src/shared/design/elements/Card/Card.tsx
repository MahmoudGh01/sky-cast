import { type StyleProp, type ViewStyle, StyleSheet, View } from "react-native"

import { colors, shadows, shapes, spacing } from "#design/foundations"

type CardProps = {
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ style, children, ...props }) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    margin: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: shapes.radiusMd,
    backgroundColor: colors.surface,
    ...shadows.main,
  },
})
