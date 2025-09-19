import ProfileInformation from '../components/profile/ProfileInformation';
import UserAdList from '../components/profile/UserAdList';
import { useUserProfile } from '../hooks/queries/useUserInfo';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleSection from '../../../components/ui/TitleSection';

interface ProfileScreenProps {
  isUserProfile?: boolean;
  userId: string;
}

export default function ProfileScreen({ isUserProfile = false, userId }: ProfileScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { data: userData, isLoading, error } = useUserProfile(isUserProfile ? undefined : userId);

  if (isLoading) return <LoadingState />;
  if (error || !userData) return <ErrorState message={error?.message} />;

  return (
    <View style={{ flex: 1 }}>
      <ProfileInformation
        firstname={userData.firstname}
        lastname={userData.lastname}
        username={userData.username}
        profilePictureUrl={userData.profilePictureUrl}
        rating={5}
        ratingCount={25}
        isUserProfile={isUserProfile}
        style={{
          ...(isUserProfile ? { paddingTop: insets.top + theme.spacing.md } : {}),
        }}
      />

      <TitleSection
        title="Ads"
        accessible
        accessibilityRole="header"
        accessibilityLabel="Ads section"
        accessibilityHint="View the list of ads posted by this user"
      />

      <UserAdList
        userId={userId}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.lg,
        }}
      />
    </View>
  );
}
