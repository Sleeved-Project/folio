import { View } from 'react-native';
import { Text, StyleSheet } from 'react-native';
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
    <View key={id} style={styles.container}>
      <ProfilePicture username={username} uri={profilePictureUrl} />
      <Text style={[styles.name, { color: theme.colors.text.primary }]}>@{username}</Text>
      <Text style={[styles.sales, { color: theme.colors.text.secondary }]}>
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
