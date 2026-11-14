import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Check,
  Copy,
  CreditCard,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  STORE_CONFIG,
  buildWhatsAppUrl,
  formatPriceDH,
} from '../config/storeConfig';
import {
  OrderCustomerInput,
  OrderPayload,
  OrderSubmissionResult,
  PaymentMethod,
} from '../types/store';
import {
  formatOrderForWhatsApp,
  submitOrder,
} from '../services/orderService';

function isValidMoroccanPhone(raw: string): boolean {
  const cleaned = raw.replace(/[\s.-]/g, '');
  return /^(?:\+212|0)([5-7])\d{8}$/.test(cleaned);
}

export const CheckoutPage: React.FC = () => {
  const { items, subtotalDH, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const [form, setForm] = useState<OrderCustomerInput>({
    fullName: '',
    phone: '',
    city: 'Casablanca',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<OrderSubmissionResult | null>(null);
  const [preparedPayload, setPreparedPayload] = useState<OrderPayload | null>(
    null
  );
  const [copiedSummary, setCopiedSummary] = useState(false);

  const shippingDH = useMemo(() => {
    if (items.length === 0) return 0;
    if (subtotalDH >= STORE_CONFIG.shipping.freeThresholdDH) return 0;
    return form.city === 'Casablanca'
      ? STORE_CONFIG.shipping.casablancaFeeDH
      : STORE_CONFIG.shipping.otherCitiesFeeDH;
  }, [items.length, subtotalDH, form.city]);

  const totalDH = subtotalDH + shippingDH;

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (form.fullName.trim().length < 3) {
      next.fullName = 'Veuillez renseigner votre nom et prénom.';
    }
    if (!isValidMoroccanPhone(form.phone)) {
      next.phone =
        'Numéro marocain invalide (ex : 06 12 34 56 78 ou +212 6 12 34 56 78).';
    }
    if (!form.city) {
      next.city = 'Veuillez sélectionner votre ville.';
    }
    if (form.address.trim().length < 8) {
      next.address = 'Veuillez saisir une adresse de livraison complète.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !validate()) return;

    const payload: OrderPayload = {
      customer: form,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        size: item.size,
        color: item.color.name,
        quantity: item.quantity,
        unitPriceDH: item.product.priceDH,
      })),
      subtotalDH,
      shippingDH,
      totalDH,
      currency: 'MAD',
      source: 'really-to-wear-web',
    };

    setSubmitting(true);
    try {
      const result = await submitOrder(payload);
      setPreparedPayload(payload);
      setSubmissionResult(result);

      if (result.mode === 'backend_connected') {
        if (result.redirectPaymentUrl) {
          window.location.href = result.redirectPaymentUrl;
          return;
        }
        clearCart();
      }
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : 'Erreur lors du traitement de la demande.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!preparedPayload) return;
    await navigator.clipboard.writeText(
      formatOrderForWhatsApp(preparedPayload)
    );
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  if (items.length === 0 && submissionResult?.mode !== 'backend_connected') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-brand-muted/60 mb-5 stroke-[1.25]" />
        <h1 className="font-serif text-4xl mb-3">Votre panier est vide</h1>
        <p className="text-sm text-brand-muted mb-8">
          Parcourez notre catalogue pour sélectionner vos pièces REALLY TO WEAR.
        </p>
        <Link
          to="/catalogue"
          className="inline-block px-8 py-3.5 bg-brand-black text-white text-xs uppercase tracking-[0.2em]"
        >
          Explorer le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-6 border-b border-brand-border mb-10">
        <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-2">
          Finalisation
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal">
          Panier &amp; Commande
        </h1>
      </div>

      {submissionResult?.mode === 'backend_connected' ? (
        <div className="max-w-2xl mx-auto border border-brand-border bg-brand-cream/40 p-8 text-center space-y-4">
          <Check className="w-10 h-10 mx-auto text-emerald-700" />
          <h2 className="font-serif text-3xl">Commande transmise</h2>
          {submissionResult.orderReference && (
            <p className="text-xs uppercase tracking-[0.2em] font-semibold tabular-nums">
              Référence : {submissionResult.orderReference}
            </p>
          )}
          <p className="text-sm text-brand-muted">{submissionResult.message}</p>
          <Link
            to="/catalogue"
            className="inline-block mt-4 px-7 py-3.5 bg-brand-black text-white text-xs uppercase tracking-[0.2em]"
          >
            Continuer mes achats
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold pb-3 border-b border-brand-border">
                01. Informations de livraison
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                    Nom et prénom *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="Ex : Salma Benali"
                    className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-black"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                    Téléphone marocain *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-black"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                    Ville *
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 border border-brand-border text-sm bg-white focus:outline-none focus:border-brand-black"
                  >
                    {STORE_CONFIG.moroccanCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                    Adresse de livraison *
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Quartier, rue, immeuble, appartement"
                    className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-black"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                  Informations complémentaires (optionnel)
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Créneau horaire souhaité, point de repère..."
                  className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-black"
                />
              </div>

              <div className="pt-4 space-y-4">
                <h2 className="text-xs uppercase tracking-[0.2em] font-semibold pb-3 border-b border-brand-border">
                  02. Mode de paiement
                </h2>

                {(
                  [
                    {
                      id: 'cod',
                      title: 'Paiement à la livraison (Cash on Delivery)',
                      desc: 'Réglez en espèces directement au livreur lors de la réception de votre colis partout au Maroc.',
                      icon: Truck,
                    },
                    {
                      id: 'online_cmi_payzone',
                      title:
                        'Paiement en ligne par carte (CMI / Payzone Maroc — à connecter)',
                      desc: 'Option préparée pour connexion future à un prestataire bancaire marocain via votre serveur API.',
                      icon: CreditCard,
                    },
                  ] as Array<{
                    id: PaymentMethod;
                    title: string;
                    desc: string;
                    icon: React.FC<{ className?: string }>;
                  }>
                ).map((method) => {
                  const Icon = method.icon;
                  const active = form.paymentMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
                        active
                          ? 'border-brand-black bg-brand-cream/50'
                          : 'border-brand-border hover:border-brand-black/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={active}
                        onChange={() =>
                          setForm({ ...form, paymentMethod: method.id })
                        }
                        className="mt-1 accent-brand-black"
                      />
                      <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{method.title}</p>
                        <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                          {method.desc}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {errors.submit && (
                <p className="text-xs text-red-600">{errors.submit}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-brand-black text-white text-xs uppercase tracking-[0.22em] font-semibold hover:bg-brand-charcoal transition-colors disabled:opacity-60 tabular-nums"
              >
                {submitting
                  ? 'Préparation en cours...'
                  : `Préparer ma commande (${formatPriceDH(totalDH)})`}
              </button>

              {submissionResult?.mode === 'preview_no_backend' &&
                preparedPayload && (
                  <div className="p-6 border border-amber-300 bg-amber-50/70 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-1.5">
                        <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-amber-950">
                          Mode vitrine — Aucun backend connecté
                        </h3>
                        <p className="text-xs text-amber-900 leading-relaxed">
                          {submissionResult.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <a
                        href={buildWhatsAppUrl(
                          formatOrderForWhatsApp(preparedPayload)
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-700 text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" />
                        Envoyer la commande via WhatsApp
                      </a>

                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center justify-center gap-2 py-3.5 px-5 border border-brand-black bg-white text-brand-black text-xs uppercase tracking-[0.18em] hover:bg-brand-light transition-colors whitespace-nowrap"
                      >
                        <Copy className="w-4 h-4 shrink-0" />
                        {copiedSummary ? 'Copié' : 'Copier le détail'}
                      </button>
                    </div>
                  </div>
                )}
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-brand-border p-6 bg-brand-cream/30 sticky top-28">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold pb-4 border-b border-brand-border tabular-nums">
                Récapitulatif ({items.reduce((s, i) => s + i.quantity, 0)}{' '}
                articles)
              </h2>

              <div className="divide-y divide-brand-border max-h-[380px] overflow-y-auto my-2">
                {items.map((item) => (
                  <div key={item.key} className="py-4 flex gap-3.5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-22 object-cover bg-brand-light shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <p className="text-xs font-medium truncate">
                          {item.product.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          aria-label="Retirer"
                          className="text-brand-muted hover:text-brand-black"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-brand-muted mt-0.5">
                        {item.size} · {item.color.name}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-brand-border bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.key, item.quantity - 1)
                            }
                            aria-label="Diminuer la quantité"
                            className="p-1.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.key, item.quantity + 1)
                            }
                            aria-label="Augmenter la quantité"
                            className="p-1.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold tabular-nums">
                          {formatPriceDH(item.product.priceDH * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-brand-border space-y-2.5 text-xs tabular-nums">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Sous-total</span>
                  <span>{formatPriceDH(subtotalDH)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">
                    Livraison estimée ({form.city})
                  </span>
                  <span>
                    {shippingDH === 0 ? 'Offerte' : formatPriceDH(shippingDH)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-brand-border text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPriceDH(totalDH)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
