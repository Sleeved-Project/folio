import type { CardIdentifyResult } from './types';
import { ContextScanCardData } from './context/ScanContext';
import { Card } from '../cards/types';
import { Router } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';

export class ScanService {
  static async processFrontSideScan(
    cardIdentify: CardIdentifyResult,
    router: Router,
    setScanCardData: Dispatch<SetStateAction<ContextScanCardData | null>>
  ) {
    // if needed, we can download the image from the temp URL
    // but for now, we'll just use the URL directly
    // because the image is hosted on cloudinary and can be accessed directly
    // const localImageUri = await downloadTempImage(cardIdentify.extractedTempImageUrl);

    setScanCardData((prevData: ContextScanCardData | null) => ({
      ...prevData,
      id: cardIdentify.id,
      frontCardCroppedImage: cardIdentify.extractedTempImageUrl,
      name: cardIdentify.name,
      potentialMatchedCard: cardIdentify.potentialMatchedCard,
    }));

    router.push('/scan-identify');
  }

  static async processBackSideScan(
    cardIdentify: CardIdentifyResult,
    router: Router,
    setScanCardData: Dispatch<SetStateAction<ContextScanCardData | null>>
  ) {
    // const localImageUri = await downloadTempImage(cardIdentify.extractedTempImageUrl);

    setScanCardData((prevData: ContextScanCardData | null) => ({
      ...prevData,
      backCardCroppedImage: cardIdentify.extractedTempImageUrl,
    }));

    router.back();
  }

  static processFullScan(cards: Card[], router: Router) {
    if (cards && cards.length > 0) {
      router.push({
        pathname: '/scan-result',
        params: {
          resultType: 'success',
          cards: JSON.stringify(cards),
          highlightedCardId: cards[0].id,
        },
      });
      return true;
    }
    return false;
  }
}
