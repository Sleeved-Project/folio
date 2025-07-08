import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';
import CardGridLayout from './CardGridLayout';

interface CardPlaceholderGridProps {
  onAddCard?: () => void;
  numPlaceholders?: number;
}

export default function CardPlaceholderGrid({
  onAddCard,
  numPlaceholders = 6,
}: CardPlaceholderGridProps) {
  const theme = useTheme();

  return (
    <CardGridLayout
      itemCount={numPlaceholders}
      renderItem={({ index, width, height }) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.placeholder,
            {
              width,
              height,
              backgroundColor: theme.colors.background.tertiary,
              borderColor: theme.colors.border.medium,
              borderRadius: theme.borderRadius.medium,
              borderStyle: 'dashed',
              borderWidth: 2,
            },
          ]}
          activeOpacity={0.7}
          onPress={onAddCard}
        >
          <Plus size={40} color={theme.colors.text.tertiary} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
