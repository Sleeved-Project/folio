import { Search } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface SearchButtonProps {
  placeholderText?: string;
  onPress?: () => void;
}

export default function SearchButton({ placeholderText = 'Search', onPress }: SearchButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background.tertiary,
            shadowColor: theme.shadows.small.shadowColor,
            shadowOffset: theme.shadows.small.shadowOffset,
            shadowOpacity: theme.shadows.small.shadowOpacity,
            shadowRadius: theme.shadows.small.shadowRadius,
            elevation: theme.shadows.small.elevation,
            borderRadius: theme.borderRadius.round,
            marginTop: theme.spacing.sm,
            marginBottom: theme.spacing.lg,
            height: 50,
          },
        ]}
      >
        <Search size={20} color={theme.colors.text.secondary} style={styles.searchIcon} />
        <Text
          style={[
            styles.placeholderText,
            {
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSizes.md,
            },
          ]}
        >
          {placeholderText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  searchIcon: {
    marginRight: 12,
  },
  placeholderText: {
    flex: 1,
  },
});
