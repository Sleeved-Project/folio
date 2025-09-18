import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface BackButtonProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export default function BackButton({ accessibilityLabel, accessibilityHint }: BackButtonProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.back()}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? 'Back'}
      accessibilityHint={accessibilityHint ?? 'Navigates back'}
    >
      <ChevronLeft color={theme.colors.text.primary} size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 4 },
});
