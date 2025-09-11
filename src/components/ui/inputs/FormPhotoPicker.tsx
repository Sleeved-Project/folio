import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { CloudUploadIcon, Trash2Icon } from 'lucide-react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { CARD_ASPECT_RATIO, SCREEN_DIMENSIONS } from '../../../constants';

const CONTAINER_HEIGHT = SCREEN_DIMENSIONS.WIDTH / CARD_ASPECT_RATIO;

interface FormPhotoPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
  disabled?: boolean;
  mode?: 'full' | 'identify-front-side' | 'identify-back-side';
  onOpenScanner?: (mode?: 'full' | 'identify-front-side' | 'identify-back-side') => void;
}

export default function FormPhotoPicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Tap to take photo',
  error,
  isRequired = false,
  disabled = false,
  mode,
  onOpenScanner,
}: FormPhotoPickerProps<T>) {
  const theme = useTheme();

  const handleOpen = () => {
    if (disabled) return;
    onOpenScanner?.(mode);
  };

  const removeImage = (onChange: (value: string) => void) => {
    if (disabled) return;
    onChange('');
  };

  return (
    <View style={[styles.container, { marginBottom: theme.spacing.md }]}>
      <Text
        style={[
          styles.label,
          {
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.medium,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.sm,
          },
        ]}
      >
        {label}
        {isRequired && <Text style={{ color: theme.colors.danger }}>*</Text>}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            {value ? (
              <TouchableOpacity
                style={[styles.photoContainer, { borderRadius: theme.borderRadius.medium }]}
                onPress={handleOpen}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: value }} style={styles.image} resizeMode="contain" />
                  {!disabled && (
                    <TouchableOpacity
                      style={[
                        styles.removeButton,
                        {
                          backgroundColor: theme.colors.danger,
                          borderRadius: theme.borderRadius.round,
                        },
                      ]}
                      onPress={() => removeImage(onChange)}
                    >
                      <Trash2Icon color={theme.colors.text.onPrimary} size={24} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.emptyContainer,
                  {
                    borderRadius: theme.borderRadius.medium,
                    borderColor: theme.colors.border.light,
                  },
                ]}
                onPress={handleOpen}
              >
                <View style={styles.placeholder}>
                  <CloudUploadIcon
                    style={{ marginBottom: theme.spacing.sm }}
                    color={theme.colors.text.tertiary}
                    size={24}
                  />
                  <Text
                    style={[
                      styles.placeholderText,
                      {
                        color: theme.colors.text.tertiary,
                        fontSize: theme.typography.fontSizes.sm,
                      },
                    ]}
                  >
                    {placeholder}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      />

      {error && (
        <Text
          style={{
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.danger,
            marginTop: theme.spacing.xs,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
  },
  photoContainer: {
    width: '100%',
    height: CONTAINER_HEIGHT,
    overflow: 'hidden',
  },
  emptyContainer: {
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
  },
});
