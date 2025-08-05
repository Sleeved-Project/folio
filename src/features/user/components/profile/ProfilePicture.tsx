import { Image, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../../../../theme/useTheme';

interface ProfilePictureProps {
  firstname: string;
  lastname: string;
  profilePictureUrl?: string;
}

export default function ProfilePicture({
  firstname,
  lastname,
  profilePictureUrl,
}: ProfilePictureProps) {
  const theme = useTheme();
  const initials = useMemo(() => {
    return `${firstname[0] ?? ''}${lastname[0] ?? ''}`.toUpperCase();
  }, [firstname, lastname]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.light,
        },
      ]}
    >
      {profilePictureUrl ? (
        <Image source={{ uri: profilePictureUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              backgroundColor: theme.colors.background.secondary,
            },
          ]}
        >
          <Text
            style={[
              {
                color: theme.colors.text.black,
                fontSize: theme.typography.fontSizes.xxl,
                fontWeight: theme.typography.fontWeights.bold,
              },
            ]}
          >
            {initials}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
