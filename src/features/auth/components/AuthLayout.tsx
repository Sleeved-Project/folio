import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import AuthRedirectLink from './AuthRedirectLink';
import { Button } from '../../../components/ui';
import logoImage from '../../../../assets/logo.png';
import { useTheme } from '../../../theme/useTheme';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  buttonTitle: string;
  isLoading: boolean;
  onSubmit: () => void;
  redirectType: 'signin' | 'signup';
  footerContent?: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  children,
  buttonTitle,
  isLoading,
  onSubmit,
  redirectType,
  footerContent,
}) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background.primary }]}>
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
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
          </View>

          <View style={styles.formContainer}>{children}</View>

          {footerContent}

          <View style={styles.flexSpace} />
        </ScrollView>

        <View
          style={[styles.actionsContainer, { backgroundColor: theme.colors.background.primary }]}
        >
          <Button
            title={isLoading ? `${buttonTitle}...` : buttonTitle}
            onPress={onSubmit}
            loading={isLoading}
            disabled={isLoading}
            buttonStyle={styles.actionButton}
          />
          <AuthRedirectLink type={redirectType} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 10,
  },
  flexSpace: {
    flex: 1,
    minHeight: 20,
  },
  actionsContainer: {
    width: '100%',
    padding: 24,
    paddingTop: 12,
  },
  actionButton: {
    width: '100%',
  },
});

export default AuthLayout;
