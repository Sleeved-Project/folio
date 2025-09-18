import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, View, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../../../lib/errors/errors-utils';
import { useTheme } from '../../../theme/useTheme';

import SignupEmailStep from '../components/steps/SignupEmailStep';
import SignupUsernameStep from '../components/steps/SignupUsernameStep';
import SignupPasswordStep from '../components/steps/SignupPasswordStep';

type StepConfig<T> = {
  key: string;
  component: React.ComponentType<T>;
  props: T;
};

const SignupScreen: React.FC = () => {
  const { signup } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const theme = useTheme();
  const router = useRouter();

  // Passe à l'étape suivante
  const nextStep = useCallback(() => setStepIndex((i) => Math.min(i + 1, 2)), []);
  // Retour à l'étape précédente
  const prevStep = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  const handleEmailContinue = useCallback((email: string) => {
    // @TODO: Validate email uniqueness with API call
    setEmail(email);
    nextStep();
  }, [nextStep]);

  const handleUsernameContinue = useCallback((username: string) => {
    // @TODO: Validate username uniqueness with API call
    setUsername(username);
    nextStep();
  }, [nextStep]);

  const handlePasswordSubmit = useCallback(
    async ({ password }: { password: string }) => {
      try {
        setLoading(true);
        const result = await signup(email, password, username);
        if (result && result.requiresVerification) {
          router.replace({
            pathname: '/verify-email',
            params: { email: result.email },
          });
        }
      } catch (err) {
        const message = getErrorMessage(err);
        setAlertMessage(message);
      } finally {
        setLoading(false);
      }
    },
    [signup, email, username, router]
  );

  const steps: StepConfig<any>[] = useMemo(
    () => [
      {
        key: 'email',
        component: SignupEmailStep,
        props: {
          onContinue: handleEmailContinue,
          defaultValue: email,
        },
      },
      {
        key: 'username',
        component: SignupUsernameStep,
        props: {
          onContinue: handleUsernameContinue,
          onBack: prevStep,
          defaultValue: username,
        },
      },
      {
        key: 'password',
        component: SignupPasswordStep,
        props: {
          onSubmit: handlePasswordSubmit,
          onBack: prevStep,
          isLoading,
        },
      },
    ],
    [email, username, isLoading, handleEmailContinue, handleUsernameContinue, handlePasswordSubmit, prevStep]
  );

  const StepComponent = steps[stepIndex].component;
  const stepProps = steps[stepIndex].props;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ flex: 1 }}>
          <StepComponent {...(stepProps as any)} />
          {/* Texte invisible pour alertes */}
          {alertMessage ? (
            <Text
              style={{ position: 'absolute', height: 0, width: 0 }}
              accessibilityLiveRegion="polite"
            >
              {alertMessage}
            </Text>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
