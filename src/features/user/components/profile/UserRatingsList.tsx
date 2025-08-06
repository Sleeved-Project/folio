import { View, Text } from 'react-native';

interface UserRatingsListProps {
  userId: string;
}

export default function UserRatingsList({ userId }: UserRatingsListProps) {
  return (
    <View>
      <Text>3 ratings {userId}</Text>
    </View>
  );
}
