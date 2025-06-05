import { Text, View, StyleSheet } from 'react-native';
import { useAuth } from '../../auth/context/AuthContext';
import { Button } from '../../../components/ui';

export default function HomeScreen() {
  const { logout, user, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {user && <Text style={styles.welcomeText}>Welcome {user.email}!</Text>}

      <Button
        title={isLoading ? 'Logging out...' : 'Logout'}
        onPress={handleLogout}
        loading={isLoading}
        disabled={isLoading}
        buttonStyle={styles.logoutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 18,
    marginTop: 10,
    color: '#555',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#f44336',
  },
});
