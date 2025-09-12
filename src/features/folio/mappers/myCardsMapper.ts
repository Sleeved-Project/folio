import { Card } from '../../cards/types';
import { RawMyCard } from '../types';

export function mapMyCardsApiToCards(data: RawMyCard[]): Card[] {
  return data.map((item) => ({
    id: item.id,
    imageSmall: item.card?.imageSmall ?? '',
    occurrence: item.occurrence ?? 1,
    extractedTempImageUrl: item.card?.extractedTempImageUrl ?? '',
    ...item.card,
  }));
}
