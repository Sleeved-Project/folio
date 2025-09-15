// import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import ProfileInformation from '../components/profile/ProfileInformation';
// import { useState } from 'react';
import UserAdList from '../components/profile/UserAdList';
// import UserRatingsList from '../components/profile/UserRatingsList';
import { useUserProfile } from '../hooks/queries/useUserInfo';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
// import { User } from 'lucide-react-native';
import TitleSection from '../../../components/ui/TitleSection';

// const tabOptions: TabOption<'ads' | 'ratings'>[] = [
//   { id: 'ads', label: 'Ads' },
//   { id: 'ratings', label: 'Ratings' },
// ];

interface ProfileScreenProps {
  isUserProfile?: boolean;
  userId: string;
}

export default function ProfileScreen({ isUserProfile = false, userId }: ProfileScreenProps) {
  // const [activeTab, setActiveTab] = useState<'ads' | 'ratings'>('ads');
  const { data: userData, isLoading, error } = useUserProfile(isUserProfile ? undefined : userId);

  if (isLoading) return <LoadingState />;
  if (error || !userData) return <ErrorState message={error?.message} />;

  return (
    <>
      <ProfileInformation
        firstname={userData.firstname}
        lastname={userData.lastname}
        username={userData.username}
        profilePictureUrl={userData.profilePictureUrl}
        rating={5}
        ratingCount={25}
        isUserProfile={isUserProfile}
      />

      {/* <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        containerStyle={{ marginVertical: 16 }}
      /> */}

      {/* {activeTab === 'ads' ? <UserAdList userId={userId} /> : <UserRatingsList userId={userId} />} */}
      <TitleSection title="Ads" />
      <UserAdList userId={userId} />
    </>
  );
}
