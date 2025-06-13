import { CardScanResult } from '../types';
import { Card } from '../../cards/types';
import { displayScanPrice } from '../utils/scan-price-utils';

export function mapScanResultToCards(scanResults: CardScanResult[]): Card[] {
  if (!scanResults || !Array.isArray(scanResults)) {
    console.error('Invalid scan results format:', scanResults);
    return [];
  }

  return scanResults.map((result) => ({
    id: result.id,
    imageSmall: result.imageSmall,
    imageLarge: result.imageLarge,
    bestTrendPrice: displayScanPrice(result.bestTrendPrice),
    similarity: result.similarity,
  }));
}
