import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Custom hook to refetch data when the screen is focused.
 * This is useful for ensuring that the data is up-to-date when the user navigates back to the screen.
 *
 * @param refetchFns - Array of functions to call when the screen is focused.
 */
export function useRefetchOnFocus(...refetchFns: Array<() => void>) {
  useFocusEffect(
    useCallback(() => {
      refetchFns.forEach((fn) => fn());
    }, refetchFns)
  );
}
