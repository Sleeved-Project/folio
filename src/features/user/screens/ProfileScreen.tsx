import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import ProfileInformation from '../components/profile/ProfileInformation';
import { useState } from 'react';
import UserAdList from '../components/profile/UserAdList';
import { useUserProfile } from '../hooks/queries/useUserInfo';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserOrderList from '../components/profile/UserOrderList';

const tabOptions: TabOption<'ads' | 'orders'>[] = [
  { id: 'ads', label: 'Ads' },
  { id: 'orders', label: 'Orders' },
];

interface ProfileScreenProps {
  isUserProfile?: boolean;
  userId: string;
}

export default function ProfileScreen({ isUserProfile = false, userId }: ProfileScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'ads' | 'orders'>('ads');
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
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        {isUserProfile && (
          <TabSwitcher
            options={tabOptions}
            activeTabId={activeTab}
            onTabChange={setActiveTab}
            containerStyle={{ marginVertical: 16 }}
          />
        )}
        {activeTab === 'ads' ? (
          <UserAdList userId={userId} shouldShowTitle={!isUserProfile} />
        ) : (
          <UserOrderList userId={userId} />
        )}
      </View>
    </View>
  );
}
