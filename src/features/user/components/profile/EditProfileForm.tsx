import { View, StyleSheet, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { FormTextInput, Button } from '../../../../components/ui';
import { userProfileSchema, UserProfileFormValues } from '../../schemas/userSchema';
import { useTheme } from '../../../../theme/useTheme';
import { useUpdateUserProfile } from '../../hooks/mutations/useEditUser';
import { UserProfileData } from '../../hooks/queries/useUserInfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FormPhoneInput from '../../../../components/ui/inputs/FormPhoneInput';

interface EditProfileFormProps {
  userData: UserProfileData;
}

export default function EditProfileForm({ userData }: EditProfileFormProps) {
  const theme = useTheme();
  const router = useRouter();
  const { mutate: updateProfile, isPending } = useUpdateUserProfile();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstname: userData.firstname || '',
      lastname: userData.lastname || '',
      description: userData.description || '',
      phone: userData.phone || '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: UserProfileFormValues) => {
    const updatedData = {
      ...data,
      profilePictureUrl: null,
    };

    updateProfile(updatedData, {
      onSuccess: () => {
        router.back();
      },
      onError: () => {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      },
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        accessible
        accessibilityLabel="Edit Profile Form"
        accessibilityHint="Edit your personal information and save changes"
      >
        <ScrollView style={styles.container}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSizes.xl,
                fontWeight: theme.typography.fontWeights.medium,
              },
            ]}
            accessible
            accessibilityRole="header"
          >
            Personal Informations
          </Text>

          <FormTextInput
            control={control}
            name="firstname"
            label="First name"
            placeholder="Enter your first name"
            error={errors.firstname?.message}
          />

          <FormTextInput
            control={control}
            name="lastname"
            label="Last name"
            placeholder="Enter your last name"
            error={errors.lastname?.message}
          />

          <FormTextInput
            control={control}
            name="description"
            label="About me"
            placeholder="Tell others about yourself..."
            error={errors.description?.message}
            multiline
          />

          <FormPhoneInput
            control={control}
            name="phone"
            label="Phone number"
            placeholder="Enter your phone number"
            error={errors.phone?.message}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={[
          styles.buttonsContainer,
          {
            backgroundColor: theme.colors.background.primary,
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => router.back()}
            buttonStyle={[styles.button]}
            accessibilityRole="button"
            accessibilityLabel="Cancel"
            accessibilityHint="Discard changes and go back"
          />
          <Button
            title="Save Changes"
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty || isPending}
            buttonStyle={[styles.button]}
            accessibilityRole="button"
            accessibilityLabel="Save Changes"
            accessibilityHint="Save your edited profile information"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, padding: 16 },
  sectionTitle: { paddingBottom: 16 },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonRow: { flexDirection: 'row', gap: 12, alignItems: 'stretch' },
  button: { flex: 1, flexBasis: 0, minWidth: 0 },
});
