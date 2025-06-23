import { Link } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function BackButton() {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container}>
      <Link href="/" style={styles.link}>
        <ChevronLeft color={theme.colors.text.primary} size={24} />
      </Link>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  link: {
    padding: 6,
  },
});
