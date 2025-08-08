import { z } from 'zod';

export const phoneNumberSchema = z
  .string()
  .trim()
  .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Phone number must follow E.164 format (e.g. +33612345678)');

export interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export const COUNTRIES_LIST: Country[] = [
  { name: 'France', flag: '🇫🇷', code: 'FR', dial_code: '+33' },
  { name: 'United States', flag: '🇺🇸', code: 'US', dial_code: '+1' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dial_code: '+44' },
  { name: 'Germany', flag: '🇩🇪', code: 'DE', dial_code: '+49' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT', dial_code: '+39' },
  { name: 'Spain', flag: '🇪🇸', code: 'ES', dial_code: '+34' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA', dial_code: '+1' },
  { name: 'Switzerland', flag: '🇨🇭', code: 'CH', dial_code: '+41' },
  { name: 'Belgium', flag: '🇧🇪', code: 'BE', dial_code: '+32' },
];
