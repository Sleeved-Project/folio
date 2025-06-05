import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput } from '../../../components/ui';
import { signinSchema, type SigninFormValues } from '../schemas/userSchema';
import AuthRedirectLink from '../components/AuthRedirectionLink';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import logoImage from '../../../../assets/logo.png';

const SigninScreen: React.FC = () => {
  const { signin, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      await signin(data.email, data.password);
    } catch (err: unknown) {
      Alert.alert('Sign In Failed', getErrorMessage(err));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign in to Sleeved</Text>
          </View>

          <View style={styles.formContainer}>
            <FormInput
              control={control}
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              inputType="email"
              error={errors.email?.message}
              returnKeyType="next"
            />

            <FormInput
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              inputType="password"
              error={errors.password?.message}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <View style={styles.flexSpace} />
        </ScrollView>

        <View style={styles.actionsContainer}>
          <Button
            title={isLoading ? 'Signing In...' : 'Sign In'}
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            buttonStyle={styles.actionButton}
          />
          <AuthRedirectLink type="signup" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  flexSpace: {
    flex: 1,
    minHeight: 20,
  },
  actionsContainer: {
    width: '100%',
    padding: 24,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  actionButton: {
    width: '100%',
  },
});

export default SigninScreen;
