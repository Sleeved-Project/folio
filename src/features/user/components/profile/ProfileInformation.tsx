import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import ProfilePicture from './ProfilePicture';
import { Edit, LogOut } from 'lucide-react-native';
import { Button } from '../../../../components/ui';
import { useAuth } from '../../../auth/context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProfileInformationProps {
  firstname: string | null;
  lastname: string | null;
  username: string;
  profilePictureUrl: string | null;
  rating?: number | null;
  ratingCount?: number | null;
  isUserProfile?: boolean;
}

export default function ProfileInformation({
  firstname,
  lastname,
  username,
  profilePictureUrl,
  isUserProfile = false,
}: ProfileInformationProps) {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
          padding: theme.spacing.md,
          ...theme.shadows.small,
          borderColor: theme.colors.border.light,
          marginBottom: theme.spacing.md,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          position: 'relative',
        },
      ]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`Profile information for ${firstname ?? ''} ${lastname ?? ''}`}
    >
      {isUserProfile && (
        <Button
          title="Logout"
          variant="danger"
          leftIcon={<LogOut size={16} />}
          onPress={handleLogout}
          buttonStyle={{
            position: 'absolute',
            top: theme.spacing.xs + insets.top,
            right: theme.spacing.md,
            height: 36,
            paddingHorizontal: 12,
          }}
          textStyle={{ fontSize: theme.typography.fontSizes.sm }}
          accessibilityLabel="Logout"
          accessibilityHint="Log out of your account"
        />
      )}

      <ProfilePicture
        username={username}
        uri={profilePictureUrl}
        size="large"
        accessible
        accessibilityRole="image"
        accessibilityLabel={`${firstname ?? ''} ${lastname ?? ''} profile picture`}
      />

      {firstname && lastname ? (
        <Text
          style={{
            marginTop: 8,
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.lg,
            fontWeight: theme.typography.fontWeights.bold,
          }}
          accessible
          accessibilityRole="text"
        >
          {`${firstname} ${lastname}`}
        </Text>
      ) : null}

      <Text
        style={{
          marginBottom: 8,
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSizes.md,
          fontWeight: theme.typography.fontWeights.medium,
        }}
        accessible
        accessibilityRole="text"
      >
        @{username}
      </Text>

      {isUserProfile && (
        <Button
          title="EDIT PROFILE"
          leftIcon={<Edit color={theme.colors.background.primary} size={16} />}
          onPress={() => router.push('/(profile)/edit-profile')}
          fullWidth
          variant="gradient"
          accessibilityLabel="Edit Profile"
          accessibilityHint="Navigate to edit your profile information"
        />
      )}
    </View>
  );
}
