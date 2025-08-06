import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useAuth } from '../../features/auth/context/AuthContext';
import ProfileScreen from '../../features/user/screens/ProfileScreen';

export default function Profile() {
  const theme = useTheme();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch {
            Alert.alert('Logout Failed', 'There was a problem logging out. Please try again.');
          }
        },
      },
    ]);
  };

  if (!user) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <ProfileScreen isUserProfile={true} />
        <TouchableOpacity onPress={handleLogout} style={{ marginTop: 24 }}>
          <Text style={{ color: theme.colors.danger, textAlign: 'center' }}>Logout</Text>
        </TouchableOpacity>
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
