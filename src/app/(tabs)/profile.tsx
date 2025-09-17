import { useAuth } from '../../features/auth/context/AuthContext';
import ProfileScreen from '../../features/user/screens/ProfileScreen';
import ScreenContainer from '../../components/ui/ScreenContainer';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <ScreenContainer>
      <ProfileScreen userId={user.id} isUserProfile={true} />
    </ScreenContainer>
  );
}
