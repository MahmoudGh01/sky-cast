import { StyleSheet, View } from "react-native"

import { colors, shapes, spacing } from "#design/foundations"

import Typography from "../Typography"

type BadgeProps = {
  children: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Typography variant="badge">{children}</Typography>
    </View>
  )
}

export default Badge

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.md - 2,
    paddingVertical: spacing.xs,
    borderRadius: shapes.pill,
    backgroundColor: colors.surfaceAccent,
  },
})
