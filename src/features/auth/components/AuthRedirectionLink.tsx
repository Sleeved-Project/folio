import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

interface AuthRedirectLinkProps {
  type: 'signup' | 'signin';
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthRedirectLink: React.FC<AuthRedirectLinkProps> = ({ type, containerStyle }) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handlePress = () => {
    if (type === 'signup') {
      return navigation.navigate('SignUp');
    }
    return navigation.navigate('SignIn');
  };

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={handlePress}>
      <Text style={styles.text}>
        {type === 'signup' ? "Don't have an account? " : 'Already have an account? '}
        <Text style={styles.boldText}>{type === 'signup' ? 'Sign Up' : 'Sign In'}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#666',
    fontSize: 16,
  },
  boldText: {
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default AuthRedirectLink;
