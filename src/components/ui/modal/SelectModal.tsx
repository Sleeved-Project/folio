import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { X, Check } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';
import { SelectOption } from '../inputs/FormSelectInput';

interface SelectModalProps {
  isVisible: boolean;
  onClose: () => void;
  options: SelectOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  title: string;
}

export default function SelectModal({
  isVisible,
  onClose,
  options,
  selectedValue,
  onSelect,
  title,
}: SelectModalProps) {
  const theme = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropTransitionOutTiming={0}
      style={styles.modalView}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      statusBarTranslucent
      accessibilityViewIsModal
      accessible
    >
      <View
        style={[
          styles.modalContent,
          {
            backgroundColor: theme.colors.background.primary,
            borderTopLeftRadius: theme.borderRadius.large,
            borderTopRightRadius: theme.borderRadius.large,
            padding: theme.spacing.md,
          },
        ]}
        accessible
        accessibilityLabel="Select option modal"
        accessibilityHint={`Choose an option from the list of ${options.length} items`}
      >
        <View
          style={[
            styles.modalHandle,
            {
              borderRadius: theme.borderRadius.small,
              backgroundColor: theme.colors.border.light,
              marginBottom: theme.spacing.md,
            },
          ]}
        />

        <View
          style={[styles.modalHeader, { marginBottom: theme.spacing.md }]}
          accessible
          accessibilityRole="header"
        >
          <Text
            style={{
              color: theme.colors.primaryForeground,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
            accessibilityRole="header"
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Close modal"
            accessibilityHint="Closes the options selection modal"
          >
            <X size={20} color={theme.colors.primaryForeground} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => {
            const isSelected = item.value === selectedValue;

            return (
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.variants.primaryAlpha10
                      : theme.colors.variants.transparent,
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.md,
                    borderRadius: theme.borderRadius.medium,
                  },
                ]}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
                activeOpacity={0.7}
                accessible
                accessibilityRole="button"
                accessibilityLabel={item.label}
                accessibilityHint={
                  isSelected
                    ? `${item.label} is currently selected`
                    : `Select ${item.label}`
                }
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isSelected
                        ? theme.colors.primaryForeground
                        : theme.colors.text.primary,
                      fontSize: theme.typography.fontSizes.md,
                      fontWeight: isSelected
                        ? theme.typography.fontWeights.semiBold
                        : theme.typography.fontWeights.regular,
                    },
                  ]}
                >
                  {item.label}
                </Text>
                {isSelected && (
                  <Check size={24} color={theme.colors.primaryForeground} strokeWidth={2} />
                )}
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing.md }}
          accessible
          accessibilityLabel="Options list"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    maxHeight: '80%',
  },
  modalHandle: {
    alignSelf: 'center',
    height: 4,
    width: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    textAlign: 'left',
    flex: 1,
  },
});
