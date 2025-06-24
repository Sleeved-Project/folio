import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import defaultFolioIcon from '../../../../assets/icons/icon-1.png';

interface FolioIconProps {
  iconPath?: string;
  size?: number;
}

export default function FolioIcon({ iconPath, size = 60 }: FolioIconProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: theme.colors.background.tertiary,
          borderRadius: theme.borderRadius.medium,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        },
      ]}
    >
      <Image
        source={iconPath ? { uri: iconPath } : defaultFolioIcon}
        style={[
          styles.icon,
          {
            width: size * 0.55,
            height: '100%',
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // This will be adjusted dynamically based on the size prop
  },
});
