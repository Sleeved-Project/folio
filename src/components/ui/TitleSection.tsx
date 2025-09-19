import { Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function TitleSection({
  title,
  style,
  accessible,
  accessibilityRole,
  accessibilityLabel,
  accessibilityHint,
}: {
  title: string;
  style?: object;
  accessible?: boolean;
  accessibilityRole?: 'header' | 'text';
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.colors.primaryForeground,
          fontWeight: theme.typography.fontWeights.bold,
          fontSize: theme.typography.fontSizes.xl,
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.sm,
        },
        style,
      ]}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
    >
      {title}
    </Text>
  );
}
