import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { PencilIcon } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';

interface ReviewSectionLayoutProps {
  title: string;
  isEditable?: boolean;
  onEdit?: () => void;
  hasSeparator?: boolean;
  children: ReactNode;
  containerStyle?: ViewStyle;
}

export default function ReviewSectionLayout({
  title,
  isEditable = false,
  onEdit,
  hasSeparator = false,
  children,
  containerStyle,
}: ReviewSectionLayoutProps) {
  const theme = useTheme();

  return (
    <View style={[containerStyle]}>
      <View style={[{ marginBottom: theme.spacing.md }, styles.headerRow]}>
        <Text
          style={{
            fontSize: theme.typography.fontSizes.lg,
            fontWeight: theme.typography.fontWeights.semiBold,
            color: theme.colors.text.primary,
          }}
        >
          {title}
        </Text>
        {isEditable && (
          <TouchableOpacity onPress={onEdit}>
            <PencilIcon color={theme.colors.text.primary} size={20} />
          </TouchableOpacity>
        )}
      </View>
      <View>{children}</View>
      {hasSeparator && (
        <View
          style={{
            height: 1,
            backgroundColor: theme.colors.border.light,
            marginTop: theme.spacing.md,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
