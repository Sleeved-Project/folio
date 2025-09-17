import { SafeAreaView } from 'react-native-safe-area-context';
import TitleScreen from './TitleScreen';
import { useTheme } from '../../theme/useTheme';

export default function ScreenContainer({
  children,
  title,
  style,
}: {
  children: React.ReactNode;
  title?: string;
  style?: object;
}) {
  const theme = useTheme();
  return (
    <SafeAreaView
      edges={['left', 'right', 'top']}
      style={{
        flex: 1,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.background.primary,
        ...style,
      }}
    >
      {title && <TitleScreen title={title} />}
      {children}
    </SafeAreaView>
  );
}
