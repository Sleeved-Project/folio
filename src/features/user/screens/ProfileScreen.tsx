// import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import ProfileInformation from '../components/profile/ProfileInformation';
// import { useState } from 'react';
import UserAdList from '../components/profile/UserAdList';
// import UserRatingsList from '../components/profile/UserRatingsList';
import { useUserProfile } from '../hooks/queries/useUserInfo';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { User } from 'lucide-react-native';

// const tabOptions: TabOption<'ads' | 'ratings'>[] = [
//   { id: 'ads', label: 'Ads' },
//   { id: 'ratings', label: 'Ratings' },
// ];

interface ProfileScreenProps {
  isUserProfile?: boolean;
  userId: string;
}

export default function ProfileScreen({ isUserProfile = false, userId }: ProfileScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  // const [activeTab, setActiveTab] = useState<'ads' | 'ratings'>('ads');
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

      {/* <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        containerStyle={{ marginVertical: 16 }}
      /> */}

      {/* {activeTab === 'ads' ? <UserAdList userId={userId} /> : <UserRatingsList userId={userId} />} */}
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
