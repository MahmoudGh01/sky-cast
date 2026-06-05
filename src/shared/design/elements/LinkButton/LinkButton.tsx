import { type LinkProps, Link } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"

import { colors, shadows, shapes, spacing } from "#design/foundations"

import Typography from "../Typography"

type LinkButtonProps = Pick<
  LinkProps,
  "href" | "replace" | "push" | "dismissTo"
> & {
  label: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, ...props }) => {
  return (
    <Link {...props} asChild>
      <Pressable style={styles.button}>
        <View style={styles.content}>
          <Typography variant="body">{label}</Typography>
        </View>
      </Pressable>
    </Link>
  )
}

export default LinkButton

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: shapes.radiusLg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.xs,
    ...shadows.card,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
