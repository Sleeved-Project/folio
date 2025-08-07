import { StyleSheet, Text, View } from 'react-native';
import ProfilePicture from './ProfilePicture';
import { useTheme } from '../../../../theme/useTheme';
import StarRating from './StarRating';
import { Button } from '../../../../components/ui';

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
  rating,
  ratingCount,
  isUserProfile = false,
}: ProfileInformationProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ProfilePicture username={username} uri={profilePictureUrl} size="large" />
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
      >
        @{username}
      </Text>
      {rating && ratingCount && (
        <StarRating style={styles.ratingContainer} rating={rating} count={ratingCount} />
      )}

      {isUserProfile && (
        <Button buttonStyle={styles.editButton} title="Edit Profile" onPress={() => {}} />
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
  editButton: {
    marginTop: 16,
    width: '100%',
  },
});
