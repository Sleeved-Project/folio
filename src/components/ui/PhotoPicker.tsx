import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import PhotoCaptureModal from './scan/PhotoCaptureModal';
import { CloudUploadIcon, Trash2Icon } from 'lucide-react-native';

interface PhotoPickerProps {
  label: string;
  image?: string;
  onImageChange: (image: string) => void;
  error?: string;
  placeholder?: string;
  isRequired?: boolean;
  disabled?: boolean;
}

export default function PhotoPicker({
  label,
  image,
  onImageChange,
  error,
  placeholder = 'Tap to take photo',
  isRequired = false,
  disabled = false,
}: PhotoPickerProps) {
  const theme = useTheme();
  const [showCamera, setShowCamera] = useState(false);

  const handleTakePhoto = () => {
    if (disabled) return;
    setShowCamera(true);
  };

  const handlePhotoTaken = (uri: string) => {
    onImageChange(uri);
    setShowCamera(false);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const removeImage = () => {
    if (disabled) return;
    onImageChange('');
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

      {image ? (
        <TouchableOpacity
          style={[
            styles.imageContainer,
            {
              borderRadius: theme.borderRadius.medium,
            },
          ]}
          onPress={handleTakePhoto}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            {!disabled && (
              <TouchableOpacity
                style={[
                  styles.removeButton,
                  { backgroundColor: theme.colors.danger, borderRadius: theme.borderRadius.round },
                ]}
                onPress={removeImage}
              >
                <Trash2Icon color={theme.colors.text.onPrimary} size={24} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.imageContainerEmpty,
            { borderRadius: theme.borderRadius.medium, borderColor: theme.colors.border.light },
          ]}
          onPress={handleTakePhoto}
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

      {error && (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.danger,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {error}
        </Text>
      )}

      {/* Modal pour la caméra */}
      <Modal visible={showCamera} animationType="slide" presentationStyle="fullScreen">
        <PhotoCaptureModal onPhotoTaken={handlePhotoTaken} onClose={handleCloseCamera} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {},
  imageContainerEmpty: {
    height: 120,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 250,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
  },
  error: {
    fontSize: 14,
  },
});
