import { STORE_CONFIG } from '../config/storeConfig';

export interface OnlinePaymentInitRequest {
  orderReference: string;
  amountDH: number;
  customerName: string;
  customerPhone: string;
}

export interface OnlinePaymentInitResponse {
  connected: boolean;
  gateway: 'CMI / Payzone Maroc';
  redirectUrl?: string;
  message: string;
}

export async function initiateMoroccanOnlinePayment(
  payload: OnlinePaymentInitRequest
): Promise<OnlinePaymentInitResponse> {
  if (!STORE_CONFIG.apiBaseUrl) {
    return {
      connected: false,
      gateway: 'CMI / Payzone Maroc',
      message:
        'Passerelle de paiement en ligne non encore connectée : configurez VITE_API_BASE_URL et votre endpoint serveur CMI / Payzone pour activer le paiement par carte bancaire.',
    };
  }

  const res = await fetch(`${STORE_CONFIG.apiBaseUrl}/api/payments/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Erreur lors de l’initialisation du paiement en ligne.');
  }

  return res.json();
}
