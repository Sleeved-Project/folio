import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ViewStyle,
  TextInputProps,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTheme } from '../../../theme/useTheme';
import { ChevronDown, X } from 'lucide-react-native';
import Modal from 'react-native-modal';
import { COUNTRIES_LIST, Country } from '../../../lib/utils/countries';

type FormPhoneInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  containerStyle?: ViewStyle;
  isRequired?: boolean;
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  onFocus?: (y: number) => void;
};

// CONST TO LIMIT PHONE NUMBER LENGTH
// Assuming a maximum of 10 digits for the phone number excluding the country code
const MAX_PHONE_LENGTH = 10;

const FormPhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Enter your phone number',
  error,
  containerStyle,
  isRequired = false,
  returnKeyType,
  onSubmitEditing,
}: FormPhoneInputProps<T>) => {
  const theme = useTheme();
  const containerRef = useRef<View>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES_LIST[0]);
  const [phoneNumberWithoutDialCode, setPhoneNumberWithoutDialCode] = useState('');

  const onChangeRef = useRef<((value: string) => void) | undefined>(undefined);

  // Handle country selection and update the phone number with dial code
  const handleSelectCountry = useCallback(
    (country: Country, onChange?: (value: string) => void) => {
      setSelectedCountry(country);
      setShowCountryModal(false);

      if (onChange && phoneNumberWithoutDialCode) {
        const fullNumber = country.dial_code + phoneNumberWithoutDialCode;
        onChange(fullNumber);
      }
    },
    [phoneNumberWithoutDialCode]
  );

  // Extract the phone number without the dial code
  const extractNumberWithoutDialCode = useCallback((fullNumber: string) => {
    for (const country of COUNTRIES_LIST) {
      if (fullNumber.startsWith(country.dial_code)) {
        return fullNumber.slice(country.dial_code.length);
      }
    }
    return fullNumber;
  }, []);

  // Format the phone number to remove any non-digit characters
  const formatPhoneNumber = (value: string) => {
    return value.replace(/[^\d\s+]/g, '');
  };

  // Open the native selector on iOS and show the modal on Android because ActionSheetIOS is not available on Android
  const openCountrySelector = useCallback(
    (onChange?: (value: string) => void) => {
      if (Platform.OS === 'ios') {
        const options = COUNTRIES_LIST.map(
          (country) => `${country.flag}  ${country.name} (${country.dial_code})`
        );
        options.push('Cancel');

        ActionSheetIOS.showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex: options.length - 1,
            title: 'Select Country',
          },
          (buttonIndex) => {
            if (buttonIndex !== options.length - 1) {
              handleSelectCountry(COUNTRIES_LIST[buttonIndex], onChange);
            }
          }
        );
      } else {
        setShowCountryModal(true);
      }
    },
    [handleSelectCountry]
  );

  return (
    <View style={[styles.container, containerStyle]} ref={containerRef}>
      {label && (
        <Text
          style={[styles.label, { color: theme.colors.text.primary }]}
          accessible
          accessibilityRole="header"
        >
          {label}
          {isRequired && <Text style={{ color: theme.colors.danger }}>*</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          // Store the onChange function in the ref so it can be accessed from anywhere
          onChangeRef.current = onChange;

          // Quand la valeur change depuis l'extérieur, extrait le numéro sans préfixe
          useEffect(() => {
            if (value) {
              const numberWithoutCode = extractNumberWithoutDialCode(value.toString());
              setPhoneNumberWithoutDialCode(numberWithoutCode);

              const country = COUNTRIES_LIST.find((c) => value.toString().startsWith(c.dial_code));
              if (country) {
                setSelectedCountry(country);
              }
            }
          }, [value]);

          return (
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                style={[
                  styles.countrySelector,
                  {
                    borderColor: theme.colors.border.light,
                    backgroundColor: theme.colors.background.secondary,
                    borderTopLeftRadius: theme.borderRadius.medium,
                    borderBottomLeftRadius: theme.borderRadius.medium,
                    borderRightWidth: 0,
                  },
                  isFocused && {
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.states.focus,
                  },
                  error && { borderColor: theme.colors.danger },
                ]}
                onPress={() => openCountrySelector(onChange)}
                activeOpacity={0.7}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`Selected country: ${selectedCountry.name}`}
                accessibilityHint="Opens country selection list"
              >
                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                <Text style={[styles.dialCode, { color: theme.colors.text.primary }]}>
                  {selectedCountry.dial_code}
                </Text>
                <ChevronDown size={16} color={theme.colors.text.secondary} />
              </TouchableOpacity>

              <View style={{ flex: 1, position: 'relative' }}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: theme.colors.border.light,
                      backgroundColor: theme.colors.background.secondary,
                      color: theme.colors.text.primary,
                      borderTopRightRadius: theme.borderRadius.medium,
                      borderBottomRightRadius: theme.borderRadius.medium,
                      paddingRight: 16,
                    },
                    isFocused && {
                      borderColor: theme.colors.primary,
                      backgroundColor: theme.colors.states.focus,
                    },
                    error && { borderColor: theme.colors.danger },
                  ]}
                  placeholder={placeholder}
                  placeholderTextColor={theme.colors.text.tertiary}
                  value={phoneNumberWithoutDialCode}
                  onChangeText={(text) => {
                    // Limit the phone number length
                    if (text.length > MAX_PHONE_LENGTH) return;

                    const formattedText = formatPhoneNumber(text);
                    setPhoneNumberWithoutDialCode(formattedText);
                    const fullNumber = selectedCountry.dial_code + formattedText;
                    onChange(fullNumber);
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                  }}
                  onFocus={() => setIsFocused(true)}
                  keyboardType="number-pad"
                  returnKeyType={returnKeyType}
                  onSubmitEditing={() => onSubmitEditing?.()}
                  maxLength={MAX_PHONE_LENGTH}
                  accessible
                  accessibilityLabel="Phone number input"
                  accessibilityHint="Enter your phone number without country code"
                />
              </View>
            </View>
          );
        }}
      />

      {error && (
        <Text
          style={[styles.errorText, { color: theme.colors.danger }]}
          accessible
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}

      {Platform.OS !== 'ios' && (
        <Modal
          isVisible={showCountryModal}
          onBackdropPress={() => setShowCountryModal(false)}
          onBackButtonPress={() => setShowCountryModal(false)}
          backdropTransitionOutTiming={0}
          style={styles.modalView}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          useNativeDriver
          statusBarTranslucent
          accessible
          accessibilityViewIsModal
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.background.primary,
                borderTopLeftRadius: theme.borderRadius.large,
                borderTopRightRadius: theme.borderRadius.large,
              },
            ]}
          >
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text
                style={[styles.modalTitle, { color: theme.colors.text.primary }]}
                accessible
                accessibilityRole="header"
              >
                Select Country
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCountryModal(false)}
                hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
                accessible
                accessibilityRole="button"
                accessibilityLabel="Close country selection"
              >
                <X size={20} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={COUNTRIES_LIST}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    selectedCountry.code === item.code && {
                      backgroundColor: theme.colors.states.hover,
                    },
                  ]}
                  onPress={() => {
                    if (onChangeRef.current) {
                      const updatedValue = item.dial_code + phoneNumberWithoutDialCode;
                      onChangeRef.current(updatedValue);
                      handleSelectCountry(item, onChangeRef.current);
                    }
                  }}
                  activeOpacity={0.7}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${item.name} with dial code ${item.dial_code}`}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={[styles.countryName, { color: theme.colors.text.primary }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.countryCode, { color: theme.colors.text.secondary }]}>
                    {item.dial_code}
                  </Text>
                </TouchableOpacity>
              )}
              initialNumToRender={15}
              maxToRenderPerBatch={20}
              windowSize={10}
              accessible
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 54,
    borderWidth: 1,
    minWidth: 110,
  },
  flag: {
    fontSize: 18,
    marginRight: 6,
  },
  dialCode: {
    fontSize: 16,
    marginRight: 6,
  },
  input: {
    height: 54,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    width: '100%',
  },
  validIconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  errorText: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 4,
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    maxHeight: '80%',
    padding: 20,
    paddingTop: 10,
  },
  modalHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  countryFlag: {
    fontSize: 22,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FormPhoneInput;
