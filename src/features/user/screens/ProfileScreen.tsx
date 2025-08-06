import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import ProfileInformation from '../components/profile/ProfileInformation';
import { useState } from 'react';
import UserAdList from '../components/profile/UserAdList';
import UserRatingsList from '../components/profile/UserRatingsList';

const userData = {
  id: '12345',
  firstname: 'John',
  lastname: 'Doe',
  username: 'superpoke22',
  profilePictureUrl: null,
  rating: 5,
  ratingCount: 10,
};

const tabOptions: TabOption<'ads' | 'ratings'>[] = [
  { id: 'ads', label: 'Ads' },
  { id: 'ratings', label: 'Ratings' },
];

export default function ProfileScreen({ isUserProfile = false }) {
  const [activeTab, setActiveTab] = useState<'ads' | 'ratings'>('ads');

  return (
    <>
      <ProfileInformation
        firstname={userData.firstname}
        lastname={userData.lastname}
        username={userData.username}
        profilePictureUrl={userData.profilePictureUrl}
        rating={userData.rating}
        ratingCount={userData.ratingCount}
        isUserProfile={isUserProfile}
      />

      <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        containerStyle={{ marginVertical: 16 }}
      />

      {activeTab === 'ads' ? (
        <UserAdList userId={userData.id} />
      ) : (
        <UserRatingsList userId={userData.id} />
      )}
    </>
  );
}
