export type ScannerState =
  | 'ready'
  | 'capturing'
  | 'analyzing'
  | 'error_not_detected'
  | 'error_capture_failed'
  | 'error_analysis_failed';

export interface CardScanResult {
  id: string;
  imageSmall: string;
  imageLarge: string;
  bestTrendPrice: string;
  similarity: number;
}

export interface ScanResponse {
  data: CardScanResult[];
}
