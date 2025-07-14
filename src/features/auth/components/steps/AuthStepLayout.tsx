import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../../../../components/ui';
import { theme } from '../../../../theme/theme';
import { ArrowLeft } from 'lucide-react-native';

interface AuthStepLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  buttonText: string;
  onButtonPress: () => void;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  logoSrc?: string;
  bottomContent?: React.ReactNode;
}

export function AuthStepLayout({
  title,
  subtitle,
  children,
  buttonText,
  onButtonPress,
  buttonDisabled,
  buttonLoading,
  onBack,
  bottomContent,
}: AuthStepLayoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={28} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={{ width: '100%' }}>{children}</View>
      </View>
      <View style={styles.bottomContent}>
        <Button
          title={buttonText}
          onPress={onButtonPress}
          disabled={buttonDisabled}
          loading={buttonLoading}
        />
        {bottomContent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  topContent: {
    width: '100%',
    marginTop: theme.spacing.md,
    flex: 1,
  },
  backButton: {
    marginBottom: theme.spacing.lg,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'left',
  },
  bottomContent: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
});
