import { type StyleProp, type ViewStyle, StyleSheet, View } from "react-native"

import { colors, spacing } from "#design/foundations"

type ScreenProps = {
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>
}

export default Screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
})
