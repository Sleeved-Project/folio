import { CardScanResult } from '../types';
import { Card } from '../../cards/types';

export function mapScanResultToCards(scanResults: CardScanResult[]): Card[] {
  if (!scanResults || !Array.isArray(scanResults)) {
    console.error('Invalid scan results format:', scanResults);
    return [];
  }

  return scanResults.map((result) => ({
    id: result.id,
    imageSmall: result.imageSmall,
    imageLarge: result.imageLarge,
    price: parseFloat(result.bestTrendPrice || '0'),
    similarity: result.similarity,
  }));
}
