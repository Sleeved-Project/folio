import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import ProfilePicture from './ProfilePicture';
// import StarRating from './StarRating';
import { Edit, LogOut } from 'lucide-react-native';
import { Button } from '../../../../components/ui';
import { theme } from '../../../../theme/theme';
import { useAuth } from '../../../auth/context/AuthContext';

interface ProfileInformationProps {
  firstname: string | null;
  lastname: string | null;
  username: string;
  profilePictureUrl: string | null;
  rating: number | null;
  ratingCount: number | null;
  isUserProfile?: boolean;

  // Props d’accessibilité
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export default function ProfileInformation({
  firstname,
  lastname,
  username,
  profilePictureUrl,
  // rating,
  // ratingCount,
  isUserProfile = false,
  accessible,
  accessibilityLabel,
  accessibilityHint,
}: ProfileInformationProps) {
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <ProfilePicture
        username={username}
        uri={profilePictureUrl}
        size="large"
        accessible
        accessibilityLabel={`${firstname ?? ''} ${lastname ?? ''} profile picture`}
      />

      {firstname && lastname && (
        <Text
          style={[
            styles.name,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.bold,
            },
          ]}
          accessible
          accessibilityRole="text"
        >
          {`${firstname} ${lastname}`}
        </Text>
      )}

      <Text
        style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSizes.md,
          fontWeight: theme.typography.fontWeights.medium,
        }}
        accessible
        accessibilityRole="text"
      >
        @{username}
      </Text>

      {/* {rating && ratingCount && (
        <StarRating style={styles.ratingContainer} rating={rating} count={ratingCount} />
      )} */}

      {isUserProfile && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Button
            buttonStyle={[styles.editButton, styles.button]}
            title="Edit Profile"
            leftIcon={<Edit color="white" size={16} />}
            onPress={() => router.push('/(profile)/edit-profile')}
            accessibilityRole="button"
            accessibilityLabel="Edit Profile"
            accessibilityHint="Navigate to edit your profile information"
          />

          <Button
            buttonStyle={[styles.logoutButton, styles.button]}
            title="Logout"
            onPress={handleLogout}
            leftIcon={<LogOut color="white" size={16} />}
            accessibilityRole="button"
            accessibilityLabel="Logout"
            accessibilityHint="Log out of your account"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    marginTop: 8,
  },
  ratingContainer: {
    marginTop: 4,
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
  },
  logoutButton: {
    backgroundColor: theme.colors.danger,
  },
});
