// TabHeader.tsx
import { Text, StyleSheet, View } from 'react-native';
import BackButton from './BackButton';
import { useTheme } from '../../theme/useTheme';

interface TabHeaderProps {
  title?: string;
  displayBackButton?: boolean;
}

export default function TabHeader({ title, displayBackButton }: TabHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="header"
      accessibilityLabel={title ?? 'Screen header'}
    >
      <View style={styles.side}>{displayBackButton && <BackButton />}</View>
      {title && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.text,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.lg,
            },
          ]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={title}
        >
          {title}
        </Text>
      )}
      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    position: 'relative',
  },
  text: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    width: '100%',
    zIndex: 0,
    paddingHorizontal: 50,
    fontWeight: '500',
  },
  side: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
