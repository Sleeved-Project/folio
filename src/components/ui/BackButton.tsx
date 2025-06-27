import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function BackButton() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <ChevronLeft color={theme.colors.text.primary} size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
