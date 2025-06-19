import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '../../../components/ui';
import { useResendVerification } from '../hooks/mutations/useResendVerification';
import VerificationCodeInput from '../components/VerificationCodeInput';
import { useVerifyEmailCode } from '../hooks/mutations/useVerifyEmailCode';

export const EmailVerificationScreen: React.FC = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const { mutate: resendVerification, isPending: isResending } = useResendVerification();
  const { mutate: verifyEmailCode, isPending: isVerifying } = useVerifyEmailCode();

  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendVerification = () => {
    if (!email) {
      Alert.alert('Error', 'Email address is missing');
      return;
    }

    resendVerification(email, {
      onSuccess: (response) => {
        Alert.alert('Success', response.message || 'Verification code has been resent.');
        setCanResend(false);
        setCountdown(60);
      },
      onError: (error) => {
        Alert.alert('Error', 'Failed to resend verification code. Please try again later.');
        console.error('Failed to resend verification:', error);
      },
    });
  };

  const handleCodeVerification = () => {
    if (!email || !verificationCode) {
      Alert.alert('Error', 'Email address or verification code is missing');
      return;
    }

    verifyEmailCode(
      { email, code: verificationCode },
      {
        onSuccess: (response) => {
          Alert.alert('Success', response.message || 'Email verified successfully!', [
            {
              text: 'Continue',
              onPress: () => {
                router.replace('/(tabs)');
              },
            },
          ]);
        },
        onError: (error) => {
          Alert.alert('Verification Failed', 'Invalid or expired code. Please try again.');
          console.error('Email verification failed:', error);
        },
      }
    );
  };

  const handleCodeFilled = (code: string) => {
    setVerificationCode(code);
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
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Verify Your Email</Text>

            <Text style={styles.message}>We&#39;ve sent a verification code to:</Text>
            <Text style={styles.email}>{email}</Text>

            <Text style={styles.instructions}>
              Enter the 6-digit code below to verify your account.
            </Text>

            <VerificationCodeInput length={6} onCodeFilled={handleCodeFilled} />
          </View>
        </ScrollView>

        <View style={styles.actionsContainer}>
          <Button
            title={isVerifying ? 'Verifying...' : 'Verify email'}
            onPress={handleCodeVerification}
            disabled={!verificationCode || verificationCode.length < 6 || isVerifying}
          />

          <TouchableOpacity
            onPress={handleResendVerification}
            disabled={!canResend || isResending}
            style={[
              styles.resendButton,
              (!canResend || isResending) && styles.resendButtonDisabled,
            ]}
          >
            <Text style={styles.resendButtonText}>
              {isResending
                ? 'Sending...'
                : canResend
                  ? 'Resend code'
                  : `Resend code in ${countdown}s`}
            </Text>
          </TouchableOpacity>
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
    marginTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'left',
    color: '#333',
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 24,
    color: '#666',
    lineHeight: 22,
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  resendButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  resendButtonDisabled: {
    backgroundColor: '#f0f0f0',
    opacity: 0.7,
  },
  resendButtonText: {
    color: '#2196F3',
    fontWeight: '600',
    fontSize: 16,
  },
});
