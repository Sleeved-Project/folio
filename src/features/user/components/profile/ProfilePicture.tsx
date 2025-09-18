import { Image, StyleSheet, Text, View, ViewProps } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../../../../theme/useTheme';

interface ProfilePictureProps extends ViewProps {
  username: string;
  uri: string | null;
  size?: 'small' | 'medium' | 'large';
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'image' | 'text' | 'button';
}

const sizeMap = {
  small: 40,
  medium: 60,
  large: 100,
};

export default function ProfilePicture({
  username,
  uri,
  size = 'medium',
  accessible = true,
  accessibilityLabel,
  accessibilityRole = 'image',
  ...rest
}: ProfilePictureProps) {
  const theme = useTheme();

  const initials = useMemo(() => {
    return `${username[0] ?? ''}${username[1] ?? ''}`.toUpperCase();
  }, [username]);

  const dimension = sizeMap[size];

  const generatedAccessibilityLabel =
    accessibilityLabel || `${username}'s profile picture`;

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
      accessible={accessible}
      accessibilityLabel={generatedAccessibilityLabel}
      accessibilityRole={accessibilityRole}
      {...rest}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}
          resizeMode="cover"
          accessible={false}
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
            style={{
              color: theme.colors.text.black,
              fontSize: dimension / 2.5,
              fontWeight: theme.typography.fontWeights.bold,
            }}
            accessible={false}
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
