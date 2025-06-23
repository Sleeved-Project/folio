import { Text, StyleSheet, View } from 'react-native';
import BackButton from './BackButton';
import UserMenu from '../../features/auth/components/UserMenu';
import { useTheme } from '../../theme/useTheme';

interface TabHeaderProps {
  title?: string;
  displayBackButton?: boolean;
}

export default function TabHeader({ title, displayBackButton }: TabHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.side}>{displayBackButton && <BackButton />}</View>
      <View style={styles.center}>
        {title && (
          <Text
            style={[
              styles.text,
              {
                color: theme.colors.text.primary,
                backgroundColor: theme.colors.background.primary,
                fontSize: theme.typography.fontSizes.lg,
              },
            ]}
          >
            {title}
          </Text>
        )}
      </View>
      <View style={styles.side}>
        <UserMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
  },
  side: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
