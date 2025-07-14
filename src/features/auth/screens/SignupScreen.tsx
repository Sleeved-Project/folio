import React, { useState, useCallback, useMemo } from 'react';
import { Alert, SafeAreaView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../../../lib/errors/errors-utils';

import SignupEmailStep from '../components/steps/SignupEmailStep';
import SignupPseudoStep from '../components/steps/SignupPseudoStep';
import SignupPasswordStep from '../components/steps/SignupPasswordStep';
import { useTheme } from '../../../theme/useTheme';

type EmailStepProps = {
  onContinue: (email: string) => void;
  defaultValue: string;
};

type PseudoStepProps = {
  onContinue: (pseudo: string) => void;
  onBack: () => void;
  defaultValue: string;
};

type PasswordStepProps = {
  onSubmit: ({ password }: { password: string }) => Promise<void>;
  onBack: () => void;
  isLoading?: boolean;
};

type StepProps = EmailStepProps | PseudoStepProps | PasswordStepProps;

type StepConfig = {
  key: string;
  component: React.ComponentType<StepProps>;
  getProps: () => StepProps;
};

const SignupScreen: React.FC = () => {
  const { signup } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [isLoading, setLoading] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  const nextStep = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleEmailContinue = useCallback(
    (email: string) => {
      // @TODO: Validate email uniqueness with API call
      setEmail(email);
      nextStep();
    },
    [nextStep]
  );

  const handlePseudoContinue = useCallback(
    (pseudo: string) => {
      // @TODO: Validate pseudo uniqueness with API call
      setPseudo(pseudo);
      nextStep();
    },
    [nextStep]
  );

  const handlePasswordSubmit = useCallback(
    async ({ password }: { password: string }) => {
      try {
        setLoading(true);
        const result = await signup(email, password, pseudo);
        if (result && result.requiresVerification) {
          router.replace({
            pathname: '/verify-email',
            params: { email: result.email },
          });
        }
      } catch (err) {
        Alert.alert('Signup Failed', getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [signup, email, pseudo, router]
  );

  const steps: StepConfig[] = useMemo(
    () => [
      {
        key: 'email',
        component: SignupEmailStep as React.ComponentType<StepProps>,
        getProps: (): EmailStepProps => ({
          onContinue: handleEmailContinue,
          defaultValue: email,
        }),
      },
      {
        key: 'pseudo',
        component: SignupPseudoStep as React.ComponentType<StepProps>,
        getProps: (): PseudoStepProps => ({
          onContinue: handlePseudoContinue,
          onBack: prevStep,
          defaultValue: pseudo,
        }),
      },
      {
        key: 'password',
        component: SignupPasswordStep as React.ComponentType<StepProps>,
        getProps: (): PasswordStepProps => ({
          onSubmit: handlePasswordSubmit,
          onBack: prevStep,
          isLoading,
        }),
      },
    ],
    [
      email,
      pseudo,
      isLoading,
      handleEmailContinue,
      handlePseudoContinue,
      handlePasswordSubmit,
      prevStep,
    ]
  );

  const StepComponent = steps[stepIndex].component;
  const stepProps = steps[stepIndex].getProps();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ flex: 1 }}>
          <StepComponent {...stepProps} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
