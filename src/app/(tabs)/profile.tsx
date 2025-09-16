import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../features/auth/context/AuthContext';
import ProfileScreen from '../../features/user/screens/ProfileScreen';
import { useTheme } from '../../theme/useTheme';

export default function Profile() {
  const theme = useTheme();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <ProfileScreen userId={user.id} isUserProfile={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
