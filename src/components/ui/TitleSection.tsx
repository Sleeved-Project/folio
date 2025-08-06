import { Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function TitleSection({ title }: { title: string }) {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.colors.text.black,
          fontWeight: theme.typography.fontWeights.bold,
          fontSize: theme.typography.fontSizes.xl,
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.sm,
        },
      ]}
    >
      {title}
    </Text>
  );
}
