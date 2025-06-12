import { Text, StyleSheet, View } from 'react-native';
import BackButton from './BackButton';

interface TabHeaderProps {
  title?: string;
  displayBackButton?: boolean;
}

export default function TabHeader({ title, displayBackButton }: TabHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>{displayBackButton && <BackButton />}</View>
      <View style={styles.center}>{title && <Text style={styles.text}>{title}</Text>}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  side: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
