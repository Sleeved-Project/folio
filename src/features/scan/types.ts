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
  extractedTempImageUrl: string;
}

export interface CardIdentifyResult {
  id: string;
  name: string;
  potentialMatchedCard: string;
  extractedTempImageUrl: string;
}

export interface ScanResponse {
  data: CardScanResult[];
}
