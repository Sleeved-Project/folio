import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View
        style={styles.container}
        accessible
        accessibilityLabel="Not Found Screen"
        accessibilityHint="Indicates that the page could not be found"
      >
        <Link
          href="/"
          style={styles.button}
          accessible
          accessibilityRole="link"
          accessibilityLabel="Go back to Home screen"
          accessibilityHint="Navigates to the home screen"
        >
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
