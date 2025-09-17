import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface FilledInputProps {
  value: string;
  label?: string;
}

export default function FilledInput({ label, value }: FilledInputProps) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.spacing.xs }}>
      {label && <Text style={{ fontWeight: theme.typography.fontWeights.bold }}>{label}</Text>}
      <View
        style={[
          styles.input,
          {
            borderColor: theme.colors.border.light,
            backgroundColor: theme.colors.background.secondary,
            borderRadius: theme.borderRadius.medium,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.md,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    justifyContent: 'center',
    borderWidth: 1,
    paddingLeft: 8,
  },
});
