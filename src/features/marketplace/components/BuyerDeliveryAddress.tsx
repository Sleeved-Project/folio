import { StyleSheet, View } from 'react-native';
import { Button, FormTextInput } from '../../../components/ui';
import { useForm } from 'react-hook-form';
import { BuyerAddressFormValues, buyerAddress } from '../schemas/sellerAddressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import FilledInput from '../../../components/ui/FilledInput';
import { theme } from '../../../theme/theme';
import { useToaster } from '../../../components/ui/ToasterProvider';
import { useCreateBuyerAddress } from '../hooks/mutations/useCreateBuyerAddress';
import { queryClient } from '../../../lib/query/query-client';
import { Address } from '../types';

interface BuyerDeliveryAddressProps {
  isModifying: boolean;
  buyerAddressData?: Address;
  setIsModifying?: () => void;
}

export default function BuyerDeliveryAddress({
  isModifying,
  buyerAddressData,
  setIsModifying,
}: BuyerDeliveryAddressProps) {
  const { mutateAsync: updateDeliveryAddress, isPending } = useCreateBuyerAddress();

  const { showToast } = useToaster();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerAddressFormValues>({
    resolver: zodResolver(buyerAddress),
    defaultValues: {
      road: '',
      additionalInfo: '',
      city: '',
      zipcode: '',
      country: '',
      countrycode: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: BuyerAddressFormValues) => {
    try {
      const response = await updateDeliveryAddress(data);

      if (response) {
        queryClient.invalidateQueries({ queryKey: ['address'] });
        showToast({ message: response.message, type: 'success' });
        if (setIsModifying) {
          setIsModifying();
        }
      }
    } catch {
      showToast({ message: 'Updating the address failed.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {!isModifying && buyerAddressData ? (
          <View style={{ gap: theme.spacing.sm }}>
            <FilledInput label="Address" value={buyerAddressData.road} />
            <FilledInput label="Additional Info" value={buyerAddressData.additionalInfo} />
            <FilledInput label="City" value={buyerAddressData.city} />
            <FilledInput label="Zip Code" value={buyerAddressData.zipcode} />
            <FilledInput label="Country" value={buyerAddressData.country} />
            <FilledInput label="Country Code" value={buyerAddressData.countrycode} />
          </View>
        ) : (
          <>
            <FormTextInput
              control={control}
              name="road"
              label="Road"
              placeholder="Enter your address"
              inputType="text"
              error={typeof errors.road?.message === 'string' ? errors.road?.message : undefined}
              returnKeyType="next"
            />
            <FormTextInput
              control={control}
              name="additionalInfo"
              label="Additional Info"
              placeholder="Enter additional information"
              inputType="text"
              error={
                typeof errors.additionalInfo?.message === 'string'
                  ? errors.additionalInfo?.message
                  : undefined
              }
              returnKeyType="next"
            />
            <FormTextInput
              control={control}
              name="city"
              label="City"
              placeholder="Enter your city"
              inputType="text"
              error={typeof errors.city?.message === 'string' ? errors.city?.message : undefined}
              returnKeyType="next"
            />
            <FormTextInput
              control={control}
              name="zipcode"
              label="Zip Code"
              placeholder="Enter your zip code"
              inputType="text"
              error={
                typeof errors.zipcode?.message === 'string' ? errors.zipcode?.message : undefined
              }
              returnKeyType="next"
            />
            <FormTextInput
              control={control}
              name="country"
              label="Country"
              placeholder="Enter your country"
              inputType="text"
              error={
                typeof errors.country?.message === 'string' ? errors.country?.message : undefined
              }
              returnKeyType="next"
            />
            <FormTextInput
              control={control}
              name="countrycode"
              label="Country Code"
              placeholder="Enter your country code"
              inputType="text"
              error={
                typeof errors.countrycode?.message === 'string'
                  ? errors.countrycode?.message
                  : undefined
              }
              returnKeyType="done"
            />
            <Button
              title="Use this address"
              onPress={handleSubmit(onSubmit)}
              loading={isPending}
              disabled={isPending}
              buttonStyle={{ width: '100%', height: 40 }}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  input: {
    height: 30,
    justifyContent: 'center',
    borderWidth: 1,
    paddingLeft: 8,
  },
});
