export interface CreateAccountResponse {
  linkingUrl: string;
}

export interface CreatePaymentSheetResponse {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}

export interface CancelPaymentSheetResponse {
  hasBeenCancelled: boolean;
}

export interface FetchPublishableKeyResponse {
  publishableKey: string;
}
