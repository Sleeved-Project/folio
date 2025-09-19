import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';

interface AuthRedirectLinkProps {
  type: 'signup' | 'signin';
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthRedirectLink: React.FC<AuthRedirectLinkProps> = ({ type, containerStyle }) => {
  const router = useRouter();
  const theme = useTheme();

  const handlePress = () => {
    if (type === 'signup') {
      return router.push('/sign-up');
    }
    return router.push('/sign-in');
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={type === 'signup' ? 'Sign up link' : 'Sign in link'}
      accessibilityHint={type === 'signup' ? 'Navigate to sign up screen' : 'Navigate to sign in screen'}
    >
      <Text style={[styles.text, { color: theme.colors.primaryForeground }]}>
        {type === 'signup' ? "Don't have an account? " : 'Already have an account? '}
        <Text style={[styles.boldText, { color: theme.colors.secondary }]}>
          {type === 'signup' ? 'Sign Up' : 'Sign In'}
        </Text>
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
    fontSize: 16,
  },
  boldText: {
    fontWeight: '600',
  },
});

export default AuthRedirectLink;
