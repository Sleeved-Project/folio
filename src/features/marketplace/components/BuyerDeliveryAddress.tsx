import { StyleSheet, View } from 'react-native';
import { Button, FormTextInput } from '../../../components/ui';
import { useForm } from 'react-hook-form';
import { BuyerAddressFormValues, buyerAddress } from '../schemas/sellerAddressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBuyerDeliveryAddress } from '../hooks/mutations/useBuyerDeliveryAddress';
import FilledInput from '../../../components/ui/FilledInput';
import { theme } from '../../../theme/theme';
import { useCreateBuyerAddress } from '../hooks/queries/useCreateBuyerAddress';
import { useToaster } from '../../../components/ui/ToasterProvider';

interface BuyerDeliveryAddressProps {
  isModifying: boolean;
  buyerAddressId: string;
}

export default function BuyerDeliveryAddress({
  buyerAddressId,
  isModifying,
}: BuyerDeliveryAddressProps) {
  const { mutate: updateDeliveryAddress, isPending } = useBuyerDeliveryAddress();
  const { data: buyerAddressData } = useCreateBuyerAddress(buyerAddressId);
  const { showToast } = useToaster();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerAddressFormValues>({
    resolver: zodResolver(buyerAddress),
    defaultValues: {
      address: buyerAddressData?.address || '',
      additionalInfo: buyerAddressData?.additionalInfo || '',
      city: buyerAddressData?.city || '',
      zipCode: buyerAddressData?.zipCode || '',
      country: buyerAddressData?.country || '',
      countryCode: buyerAddressData?.countryCode || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: BuyerAddressFormValues) => {
    try {
      updateDeliveryAddress(data);
    } catch {
      showToast({ message: 'Updating the address failed.', type: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {!isModifying && buyerAddressData ? (
          <View style={{ gap: theme.spacing.sm }}>
            <FilledInput label="Address" value={buyerAddressData.address} />
            <FilledInput label="Additional Info" value={buyerAddressData.additionalInfo} />
            <FilledInput label="City" value={buyerAddressData.city} />
            <FilledInput label="Zip Code" value={buyerAddressData.zipCode} />
            <FilledInput label="Country" value={buyerAddressData.country} />
            <FilledInput label="Country Code" value={buyerAddressData.countryCode} />
          </View>
        ) : (
          <>
            <FormTextInput
              control={control}
              name="address"
              label="Address"
              placeholder="Enter your address"
              inputType="text"
              error={
                typeof errors.address?.message === 'string' ? errors.address?.message : undefined
              }
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
              name="zipCode"
              label="Zip Code"
              placeholder="Enter your zip code"
              inputType="text"
              error={
                typeof errors.zipCode?.message === 'string' ? errors.zipCode?.message : undefined
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
              name="countryCode"
              label="Country Code"
              placeholder="Enter your country code"
              inputType="text"
              error={
                typeof errors.countryCode?.message === 'string'
                  ? errors.countryCode?.message
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
