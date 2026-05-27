import { type LinkProps, Link } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"

import { colors, shapes, spacing } from "#design/foundations"

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
        <View>
          <Typography variant="strongLabel">{label}</Typography>
        </View>
      </Pressable>
    </Link>
  )
}

export default LinkButton

const styles = StyleSheet.create({
  button: {
    width: 220,
    backgroundColor: colors.surfaceAccent,
    borderRadius: shapes.radiusSm,
    paddingVertical: spacing.md,
    marginVertical: spacing.xs + 2,
    alignItems: "center",
  },
})
