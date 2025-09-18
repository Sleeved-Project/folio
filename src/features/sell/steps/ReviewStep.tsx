import React from 'react';
import { View } from 'react-native';
import StepLayout from '../../../components/ui/multistepsform/StepLayout';
import StepHeader from '../../../components/ui/multistepsform/StepHeader';
import { useTheme } from '../../../theme/useTheme';
import { useSellForm } from '../context/SellFormContext';
import ReviewSectionLayout from '../../../components/ui/multistepsform/ReviewSectionLayout';
import ReviewItem from '../../../components/ui/multistepsform/ReviewItem';
import { useSubmitSellForm } from '../hooks/mutations/useSubmitSellForm';
import { useToaster } from '../../../components/ui/ToasterProvider';
import { useRouter } from 'expo-router';
import { useScanContext } from '../../scan/context/ScanContext';
import { useQueryClient } from '@tanstack/react-query';

export default function ReviewStep() {
  const theme = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { showToast } = useToaster();
  const { dispatch, formData } = useSellForm();
  const { mutate: submitForm, isPending } = useSubmitSellForm();
  const { clearScanData } = useScanContext();

  const onSubmit = () => {
    submitForm(formData, {
      onSuccess: () => {
        showToast({
          message: `Your ad has been successfully created!`,
          type: 'success',
        });
        clearScanData();
        queryClient.invalidateQueries({ queryKey: ['ads'] });
        router.replace('/');
      },
      onError: (error) => {
        showToast({
          message: error.message || 'Failed to submit the form.',
          type: 'error',
        });
      },
    });
  };

  const onPrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const onEditStep = (stepIndex: number) => {
    dispatch({ type: 'GO_TO_STEP', payload: stepIndex });
  };

  return (
    <StepLayout
      onNext={onSubmit}
      onPrev={onPrev}
      nextButtonText="Publish"
      showPrevButton={true}
      isPrevDisabled={isPending}
      isNextDisabled={isPending}
    >
      <View accessible accessibilityRole="header" accessibilityLabel="Review your listing before publishing">
        <StepHeader
          title="Ready to go?"
          description="Make sure everything looks good before publishing. A clean listing builds trust."
        />
      </View>

      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel="Card photos section"
        accessibilityHint="Review the front and back images of your card"
      >
        <ReviewSectionLayout title="Card photos" isEditable hasSeparator onEdit={() => onEditStep(0)}>
          <ReviewItem label="Recto" imageUri={formData.rectoImage} />
          <ReviewItem label="Verso" imageUri={formData.versoImage} />
        </ReviewSectionLayout>
      </View>

      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel="Card informations section"
        accessibilityHint="Review the condition and finish of your card"
      >
        <ReviewSectionLayout
          title="Card informations"
          isEditable
          hasSeparator
          onEdit={() => onEditStep(1)}
          containerStyle={{ marginTop: theme.spacing.lg }}
        >
          <ReviewItem label="Card’s condition" textValue={formData.condition} />
          <ReviewItem label="Card’s finish" textValue={formData.finish} />
        </ReviewSectionLayout>
      </View>

      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel="Card price section"
        accessibilityHint="Review the price you have set for your card"
      >
        <ReviewSectionLayout
          title="Card Certification"
          isEditable
          hasSeparator
          onEdit={() => onEditStep(2)}
          containerStyle={{ marginTop: theme.spacing.lg }}
        >
          <ReviewItem label="Your price" textValue={`${formData.price} €`} />
        </ReviewSectionLayout>
      </View>

      {formData.certification && (
        <View
          accessible
          accessibilityRole="summary"
          accessibilityLabel="Card certification section"
          accessibilityHint="Review the certification details of your card"
        >
          <ReviewSectionLayout
            title="Card Certification"
            isEditable
            onEdit={() => onEditStep(3)}
            containerStyle={{ marginTop: theme.spacing.lg }}
          >
            <ReviewItem label="Grade number" textValue={formData.certification.id} />
            <ReviewItem label="Global rate" textValue={formData.certification.globalRate} />
            <ReviewItem label="Grade label" textValue={formData.certification.label} />
          </ReviewSectionLayout>
        </View>
      )}
    </StepLayout>
  );
}
