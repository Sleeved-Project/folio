import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProfilePicture from '../../user/components/profile/ProfilePicture';

interface TopSellerItemProps {
  id: number;
  username: string;
  rate: number | null;
  sales: number;
  profilePictureUrl: string | null;
}

export default function TopSellerItem({
  id,
  username,
  rate,
  sales,
  profilePictureUrl,
}: TopSellerItemProps) {
  const theme = useTheme();

  return (
    <View
      key={id}
      style={styles.container}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Top seller ${username}`}
      accessibilityHint={`Rated ${rate ?? 'N/A'}, with ${sales} sales`}
    >
      <ProfilePicture username={username} uri={profilePictureUrl} size="medium" />
      <Text
        style={[styles.name, { color: theme.colors.text.primary }]}
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Username: ${username}`}
      >
        @{username}
      </Text>
      <Text
        style={[styles.sales, { color: theme.colors.text.secondary }]}
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Rating: ${rate ?? 'N/A'}, Sales: ${sales}`}
      >
        {rate ?? 'N/A'} - {sales} sales
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4,
    width: 100,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 4,
  },
  sales: {
    fontWeight: '400',
    fontSize: 12,
    marginTop: 2,
  },
});
