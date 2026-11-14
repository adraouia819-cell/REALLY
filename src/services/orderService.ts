import { STORE_CONFIG, formatPriceDH } from '../config/storeConfig';
import { OrderPayload, OrderSubmissionResult } from '../types/store';
import { initiateMoroccanOnlinePayment } from './paymentService';

export async function submitOrder(
  payload: OrderPayload
): Promise<OrderSubmissionResult> {
  if (!STORE_CONFIG.apiBaseUrl) {
    return {
      mode: 'preview_no_backend',
      message:
        'Aucun serveur backend n’est actuellement connecté. La commande n’a pas été enregistrée en base de données : utilisez le bouton WhatsApp ci-dessous pour transmettre directement votre commande à la boutique.',
    };
  }

  const response = await fetch(`${STORE_CONFIG.apiBaseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      'Une erreur est survenue lors de l’envoi de votre commande au serveur.'
    );
  }

  const savedOrder: { id: string; reference: string } = await response.json();

  if (payload.customer.paymentMethod === 'online_cmi_payzone') {
    const payment = await initiateMoroccanOnlinePayment({
      orderReference: savedOrder.reference,
      amountDH: payload.totalDH,
      customerName: payload.customer.fullName,
      customerPhone: payload.customer.phone,
    });

    return {
      mode: 'backend_connected',
      orderReference: savedOrder.reference,
      redirectPaymentUrl: payment.redirectUrl,
      message: payment.message,
    };
  }

  return {
    mode: 'backend_connected',
    orderReference: savedOrder.reference,
    message: 'Commande enregistrée auprès de notre boutique.',
  };
}

export function formatOrderForWhatsApp(payload: OrderPayload): string {
  const lines = payload.items.map(
    (item) =>
      `• ${item.name} | Taille: ${item.size} | Couleur: ${item.color} | Qté: ${item.quantity} — ${formatPriceDH(
        item.unitPriceDH * item.quantity
      )}`
  );

  const paymentLabel =
    payload.customer.paymentMethod === 'cod'
      ? 'Paiement à la livraison (Cash on Delivery)'
      : 'Paiement en ligne (à confirmer)';

  return [
    `Bonjour *${STORE_CONFIG.brandName}*`,
    `Je souhaite passer la commande suivante :`,
    ``,
    `*Articles :*`,
    ...lines,
    ``,
    `Sous-total : ${formatPriceDH(payload.subtotalDH)}`,
    `Livraison estimée (${payload.customer.city}) : ${
      payload.shippingDH === 0 ? 'Offerte' : formatPriceDH(payload.shippingDH)
    }`,
    `*Total : ${formatPriceDH(payload.totalDH)}*`,
    ``,
    `*Coordonnées de livraison :*`,
    `Nom : ${payload.customer.fullName}`,
    `Téléphone : ${payload.customer.phone}`,
    `Ville : ${payload.customer.city}`,
    `Adresse : ${payload.customer.address}`,
    payload.customer.notes ? `Infos complémentaires : ${payload.customer.notes}` : '',
    `Mode de paiement : ${paymentLabel}`,
  ]
    .filter(Boolean)
    .join('\n');
}
