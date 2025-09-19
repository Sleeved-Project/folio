import { useAuth } from '../../features/auth/context/AuthContext';
import ProfileScreen from '../../features/user/screens/ProfileScreen';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function Profile() {
  const { user } = useAuth();
  const theme = useTheme();

  if (!user) {
    return null;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      accessible
      accessibilityLabel="Profile Screen"
      accessibilityHint="View your user profile information"
    >
      <View
        style={[styles.content, { backgroundColor: theme.colors.background.primary }]}
        accessible
        accessibilityLabel="Profile Content"
        accessibilityHint="Displays user profile details and settings"
      >
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
