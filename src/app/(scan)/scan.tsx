import { useLocalSearchParams } from 'expo-router';
import CardScanner from '../../features/scan/screens/CardScanner';

export default function Scan() {
  const params = useLocalSearchParams();
  const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;

  return <CardScanner mode={mode} />;
}
