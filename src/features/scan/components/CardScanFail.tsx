import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import cardVerso from '../../../../assets/card-verso.png';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/ui';
import { useTheme } from '../../../theme/useTheme';

export default function CardScanFail() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      accessible
      accessibilityRole="alert"
      accessibilityLabel="Card scan failed screen"
    >
      <Image
        source={cardVerso}
        style={[styles.image, { borderRadius: theme.borderRadius.medium }]}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Card back image"
      />
      <View style={styles.actionContainer}>
        <Text
          style={[styles.text, { color: theme.colors.text.primary }]}
          accessible
          accessibilityRole="text"
        >
          Oops no card match found!
        </Text>
        <Button
          title="Scan again"
          variant="scan"
          onPress={() => router.replace('/scan')}
          buttonStyle={styles.actionButton}
          textStyle={[styles.textStyle, { color: theme.colors.text.primary }]}
          accessibilityLabel="Scan again"
          accessibilityHint="Press to retry scanning a card"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    width: '100%',
  },
  actionButton: {
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  textStyle: {
    fontSize: 16,
  },
  image: {
    width: 345,
    height: 480,
  },
});
