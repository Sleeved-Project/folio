import { Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function TitleSection({ title, style }: { title: string; style?: object }) {
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
    >
      {title}
    </Text>
  );
}
