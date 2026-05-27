import { type LinkProps, Link } from "expo-router"
import { type StyleProp, type TextStyle, StyleSheet, Text } from "react-native"

import {
  badge,
  body,
  heading,
  label,
  large,
  muted,
  strongLabel,
  subtitle,
  title,
} from "../../foundations/typography"

const variants = {
  title,
  subtitle,
  heading,
  body,
  large,
  muted,
  label,
  strongLabel,
  badge,
}

type TypographyProps = {
  variant?: keyof typeof variants
  style?: StyleProp<TextStyle>
  children: React.ReactNode
} & (
  | { href?: never }
  | Pick<LinkProps, "href" | "replace" | "push" | "dismissTo">
)

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  style,
  children,
  ...props
}) => {
  if ("href" in props && props.href) {
    return (
      <Link {...props} style={[styles[variant], style]}>
        {children}
      </Link>
    )
  }

  return (
    <Text {...props} style={[styles[variant], style]}>
      {children}
    </Text>
  )
}

export default Typography

const styles = StyleSheet.create(variants)
