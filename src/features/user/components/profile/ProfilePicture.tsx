import { Image, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../../../../theme/useTheme';

interface ProfilePictureProps {
  username: string;
  uri: string | null;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: 40,
  medium: 60,
  large: 100,
};

export default function ProfilePicture({ username, uri, size = 'medium' }: ProfilePictureProps) {
  const theme = useTheme();
  const initials = useMemo(() => {
    return `${username[0] ?? ''}${username[1] ?? ''}`.toUpperCase();
  }, [username]);

  const dimension = sizeMap[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.light,
        },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            { width: dimension, height: dimension, borderRadius: dimension / 2 },
          ]}
          resizeMode="cover"
        />
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
                fontSize: dimension / 2.5, // Ajuste la taille des initiales
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
    overflow: 'hidden',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
