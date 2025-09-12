export type ScannerState =
  | 'ready'
  | 'capturing'
  | 'analyzing'
  | 'error_not_detected'
  | 'error_capture_failed'
  | 'error_analysis_failed'
  | { type: 'error_custom'; message: string };

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
  is_back_side: boolean;
}

export interface ScanResponse {
  data: CardScanResult[];
}
