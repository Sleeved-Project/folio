import { View, Text } from 'react-native';

interface UserAdListProps {
  userId: string;
}

export default function UserAdList({ userId }: UserAdListProps) {
  return (
    <View>
      <Text>14 Ads {userId}</Text>
    </View>
  );
}
