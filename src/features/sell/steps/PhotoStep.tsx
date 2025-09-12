// ...existing code...
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StepPhotoFormData, stepPhotoSchema } from '../schemas/sellFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import StepLayout from '../../../components/ui/multistepsform/StepLayout';
import StepHeader from '../../../components/ui/multistepsform/StepHeader';
import FormPhotoPicker from '../../../components/ui/inputs/FormPhotoPicker';
import { useSellForm } from '../context/SellFormContext';
import { useScanContext } from '../../../features/scan/context/ScanContext';
import { useRouter } from 'expo-router';

export default function PhotoStep() {
  const { dispatch, formData: defaultValues } = useSellForm();
  const { scanCardData } = useScanContext();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StepPhotoFormData>({
    resolver: zodResolver(stepPhotoSchema),
    defaultValues: {
      rectoImage: scanCardData?.frontCardCroppedImage || defaultValues?.rectoImage || '',
      versoImage: scanCardData?.backCardCroppedImage || defaultValues?.versoImage || '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (scanCardData?.frontCardCroppedImage || scanCardData?.backCardCroppedImage) {
      reset({
        rectoImage: scanCardData.frontCardCroppedImage || defaultValues?.rectoImage || '',
        versoImage: scanCardData.backCardCroppedImage || defaultValues?.versoImage || '',
      });
    }
  }, [scanCardData, reset, defaultValues]);

  const onSubmit = (data: StepPhotoFormData) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
    dispatch({ type: 'NEXT_STEP' });
  };

  const openScanner = (mode?: 'full' | 'identify-front-side' | 'identify-back-side') => {
    router.push({ pathname: '/scan', params: { mode } });
  };

  return (
    <StepLayout onNext={handleSubmit(onSubmit)}>
      <StepHeader
        title="Highlight your card"
        description="Crisp photos of both sides help present your card in the best possible light."
        infoField="* Required fields"
      />

      <FormPhotoPicker
        control={control}
        name="rectoImage"
        label="Front Side"
        placeholder="Tap to take front side photo"
        error={errors.rectoImage?.message}
        isRequired
        mode="identify-front-side"
        onOpenScanner={openScanner}
      />

      <FormPhotoPicker
        control={control}
        name="versoImage"
        label="Back Side"
        placeholder="Tap to take back side photo"
        error={errors.versoImage?.message}
        isRequired
        mode="identify-back-side"
        onOpenScanner={openScanner}
      />
    </StepLayout>
  );
}
