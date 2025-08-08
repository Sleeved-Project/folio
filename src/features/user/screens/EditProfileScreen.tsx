import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabHeader from '../../../components/ui/TabHeader';
import { useTheme } from '../../../theme/useTheme';
import EditProfileForm from '../components/profile/EditProfileForm';
import { useUserProfile } from '../hooks/queries/useUserInfo';
import { LoadingState, ErrorState } from '../../../components/ui/StatusIndicators';

export default function EditProfileScreen() {
  const theme = useTheme();
  const { data: userData, isLoading, error } = useUserProfile();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !userData) {
    return <ErrorState message="Failed to load user data" />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <TabHeader title="Edit profile" displayBackButton={true} />
      <EditProfileForm userData={userData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
    flex: 1,
  },
});
