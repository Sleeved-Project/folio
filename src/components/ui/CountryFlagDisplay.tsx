import React from 'react';
import CountryFlag from 'react-native-country-flag';
import { COUNTRIES_LIST, Country } from '../../lib/utils/countries';

interface CountryFlagDisplayProps {
  countryCode: string;
  size?: number;
}

export default function CountryFlagDisplay({ countryCode, size = 12 }: CountryFlagDisplayProps) {
  const country: Country | undefined = COUNTRIES_LIST.find((c) => c.code === countryCode);

  if (!country) {
    return null;
  }

  return <CountryFlag isoCode={country.code} size={size} />;
}
