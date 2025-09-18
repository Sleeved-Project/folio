import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import ProfilePicture from './ProfilePicture';
// import StarRating from './StarRating';
import { Edit, LogOut } from 'lucide-react-native';
import { Button } from '../../../../components/ui';
import { useAuth } from '../../../auth/context/AuthContext';

interface ProfileInformationProps {
  firstname: string | null;
  lastname: string | null;
  username: string;
  profilePictureUrl: string | null;
  rating: number | null;
  ratingCount: number | null;
  isUserProfile?: boolean;
}

export default function ProfileInformation({
  firstname,
  lastname,
  username,
  profilePictureUrl,
  // rating,
  // ratingCount,
  isUserProfile = false,
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
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
          padding: theme.spacing.md,
          ...theme.shadows.small,
          borderColor: theme.colors.border.light,
          marginBottom: theme.spacing.md,
        },
      ]}
    >
      {isUserProfile && (
        <Button
          title="Logout"
          variant="danger"
          leftIcon={<LogOut size={16} />}
          onPress={handleLogout}
          buttonStyle={{
            position: 'absolute',
            top: theme.spacing.xs,
            right: theme.spacing.xs,
            height: 36,
            paddingHorizontal: 12,
          }}
          textStyle={{
            fontSize: theme.typography.fontSizes.sm,
          }}
        />
      )}

      <ProfilePicture username={username} uri={profilePictureUrl} size="large" />

      {firstname && lastname ? (
        <Text
          style={[
            styles.name,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.bold,
            },
          ]}
        >
          {`${firstname} ${lastname}`}
        </Text>
      ) : null}

      <Text
        style={[
          styles.username,
          {
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.medium,
          },
        ]}
      >
        @{username}
      </Text>

      {isUserProfile && (
        <Button
          title="EDIT PROFILE"
          leftIcon={<Edit color={theme.colors.background.primary} size={16} />}
          onPress={() => router.push('/(profile)/edit-profile')}
          fullWidth={true}
          variant="gradient"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    borderWidth: 1,
  },
  name: {
    marginTop: 8,
  },
  username: {
    marginBottom: 8,
  },
  logoutButton: {
    position: 'absolute',
    zIndex: 5,
  },
});
