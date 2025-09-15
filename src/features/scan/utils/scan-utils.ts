import { ScannerState } from '../types';

/**
 * Determine the status text to display based on scanner state
 */
export function getScannerStatusText(scannerState: ScannerState): string {
  if (typeof scannerState === 'object' && scannerState.type === 'error_custom') {
    return scannerState.message;
  }

  switch (scannerState) {
    case 'ready':
      return 'Place your card here';
    case 'capturing':
      return 'Capturing...';
    case 'analyzing':
      return 'Analyzing...';
    case 'error_not_detected':
      return 'Card not detected.';
    case 'error_capture_failed':
      return 'Unable to take a photo.';
    default:
      return 'Place your card here';
  }
}

/**
 * Check if the current scanner state is an error state
 */
export function isErrorState(scannerState: ScannerState): boolean {
  if (typeof scannerState === 'object') {
    return scannerState.type.startsWith('error_');
  }
  return scannerState.startsWith('error_');
}
/**
 * Check if the current scanner state is a loading state
 */
export function isLoadingState(scannerState: ScannerState): boolean {
  return scannerState === 'capturing' || scannerState === 'analyzing';
}
