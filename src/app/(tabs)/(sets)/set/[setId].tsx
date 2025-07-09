import { useLocalSearchParams } from 'expo-router';
import { ErrorState } from '../../../../components/ui/StatusIndicators';
import SetDetail from '../../../../features/sets/screens/SetDetail';

export default function SetDetailPage() {
  const { setId } = useLocalSearchParams();

  if (!setId) {
    return <ErrorState message="Missing set ID" />;
  }

  return <SetDetail setId={setId as string} />;
}
