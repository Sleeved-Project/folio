import React from 'react';
import StepLayout from '../../../components/ui/multistepsform/StepLayout';
import StepHeader from '../../../components/ui/multistepsform/StepHeader';
import { useSellForm } from '../context/SellFormContext';
import CertificationGenerator from '../components/CertificationGenerator';
import { Certification } from '../hooks/mutations/useCertificate';

export default function GradeStep() {
  const { formData, dispatch } = useSellForm();

  const handleCertificationGenerated = (certification: Certification) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: {
        certification,
      },
    });
  };

  const onNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const onPrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <StepLayout onNext={onNext} onPrev={onPrev} showPrevButton={true}>
      <StepHeader
        title="Earn the sleeved certification"
        description="Certify your card’s condition to gain credibility and attract more buyers."
        infoField="3 certifications are included with the free plan."
      />

      <CertificationGenerator
        onCertificationGenerated={handleCertificationGenerated}
        existingCertification={formData.certification}
      />
    </StepLayout>
  );
}
