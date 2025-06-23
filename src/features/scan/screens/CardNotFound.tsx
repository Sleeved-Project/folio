import React from 'react';
import { Text, StyleSheet, View, Modal, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../../components/ui';
import cardVerso from '../../../../assets/card-verso.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/useTheme';

interface CardNotFoundProps {
  visible?: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function CardNotFound({ visible, setIsVisible }: CardNotFoundProps) {
  const theme = useTheme();

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <SafeAreaView style={styles.safeAreaView}>
        <LinearGradient
          colors={['black', theme.colors.background.primary]}
          style={styles.container}
          locations={[0.5, 0.8]}
        >
          <Image
            source={cardVerso}
            style={[styles.image, { borderRadius: theme.borderRadius.medium }]}
          />
          <View style={styles.actionContainer}>
            <Text style={[styles.text, { color: theme.colors.text.primary }]}>
              Oops no card match found!
            </Text>
            <Button
              title="Scan again"
              variant="scan"
              onPress={() => setIsVisible(false)}
              buttonStyle={styles.actionButton}
              textStyle={{ color: theme.colors.text.primary }}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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
  image: {
    width: 345,
    height: 480,
  },
});
