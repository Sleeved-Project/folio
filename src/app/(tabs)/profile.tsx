import { useAuth } from '../../features/auth/context/AuthContext';
import ProfileScreen from '../../features/user/screens/ProfileScreen';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <ProfileScreen userId={user.id} isUserProfile={true} />;
}
