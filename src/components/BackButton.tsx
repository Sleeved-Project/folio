import { Link } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function BackButton() {
  return (
    <Link href="/" style={{ padding: 10 }}>
      <ChevronLeft />
    </Link>
  );
}
