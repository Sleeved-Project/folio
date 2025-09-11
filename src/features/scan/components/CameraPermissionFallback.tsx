import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraOff } from 'lucide-react-native';
import { Button } from '../../../components/ui';
import { useTheme } from '../../../theme/useTheme';

interface Props {
  onRequestPermission: () => void | Promise<void>;
  description?: string;
}

export default function CameraPermissionFallback({ onRequestPermission, description }: Props) {
  const theme = useTheme();

  const openSettings = async () => {
    await Linking.openSettings().catch((e) => {
      console.warn('Impossible to open settings', e);
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <CameraOff color={theme.colors.text.tertiary} size={48} />
        </View>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>Camera required</Text>
        <Text style={[styles.description, { color: theme.colors.text.tertiary }]}>
          {description ?? 'This feature needs access to your camera to take photos of the card.'}
        </Text>

        <View style={styles.buttons}>
          <Button title="Grant permission" onPress={onRequestPermission} />
          <View style={{ height: 12 }} />
          <Button title="Open Settings" variant="outline" onPress={openSettings} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconBox: {
    marginBottom: 20,
    padding: 18,
    borderRadius: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  buttons: {
    width: '100%',
    maxWidth: 360,
  },
});
