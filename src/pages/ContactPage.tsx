import React, { useState } from 'react';
import {
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { STORE_CONFIG, buildWhatsAppUrl } from '../config/storeConfig';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleQuickWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Bonjour ${STORE_CONFIG.brandName},`,
      name ? `Nom : ${name}` : '',
      phone ? `Téléphone : ${phone}` : '',
      message ? `Message : ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const anchor = document.createElement('a');
    anchor.href = buildWhatsAppUrl(text);
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-14">
        <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-2">
          Casablanca · Maroc
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal mb-4 text-balance">
          Contact &amp; Boutique
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed">
          Notre équipe vous accueille à Casablanca pour un conseil personnalisé,
          des essayages privés ou le suivi de vos commandes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div className="border border-brand-border p-6 sm:p-8 space-y-6 bg-brand-cream/40">
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] font-semibold mb-1">
                  Localisation
                </h2>
                <p className="text-sm font-medium">
                  {STORE_CONFIG.location.city}, {STORE_CONFIG.location.country}
                </p>
                <p className="text-xs text-brand-muted mt-1">
                  {STORE_CONFIG.location.addressLine}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] font-semibold mb-1">
                  Horaires d’ouverture
                </h2>
                <p className="text-xs text-brand-charcoal tabular-nums">
                  {STORE_CONFIG.location.openingHours}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] font-semibold mb-1">
                  Téléphone &amp; WhatsApp
                </h2>
                <p className="text-sm tabular-nums">{STORE_CONFIG.contact.phoneDisplay}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] font-semibold mb-1">
                  Email
                </h2>
                <p className="text-sm">{STORE_CONFIG.contact.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl(
                  `Bonjour ${STORE_CONFIG.brandName} Casablanca !`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-brand-black text-white text-xs uppercase tracking-[0.18em] hover:bg-brand-charcoal transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Contact rapide WhatsApp
              </a>
            </div>
          </div>

          <div className="border border-brand-border p-6">
            <h2 className="text-xs uppercase tracking-[0.18em] font-semibold mb-4">
              Réseaux Sociaux
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={STORE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-border text-xs uppercase tracking-[0.15em] hover:border-brand-black transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href={STORE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-border text-xs uppercase tracking-[0.15em] hover:border-brand-black transition-colors whitespace-nowrap"
              >
                Facebook
              </a>
              <a
                href={STORE_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-border text-xs uppercase tracking-[0.15em] hover:border-brand-black transition-colors whitespace-nowrap"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-10">
          <form
            onSubmit={handleQuickWhatsAppSubmit}
            className="border border-brand-border p-6 sm:p-8 space-y-5"
          >
            <h2 className="font-serif text-2xl">Envoyer un message rapide</h2>
            <p className="text-xs text-brand-muted">
              Votre demande ouvrira directement une conversation WhatsApp
              pré-remplie avec notre équipe à Casablanca.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                  Votre nom
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom complet"
                  className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-black"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06..."
                  className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.14em] mb-2">
                Message
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Disponibilité d’une taille, prise de rendez-vous en boutique..."
                className="w-full px-4 py-3 border border-brand-border text-sm focus:outline-none focus:border-brand-black"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-black text-white text-xs uppercase tracking-[0.2em] hover:bg-brand-charcoal transition-colors whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              Envoyer sur WhatsApp
            </button>
          </form>

          <div className="border border-brand-border overflow-hidden">
            <div className="px-6 py-4 bg-brand-light/60 border-b border-brand-border flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] font-semibold">
                  Plan d’accès — Casablanca, Maroc
                </h2>
                <p className="text-[11px] text-brand-muted">
                  Adresse exacte personnalisable dans src/config/storeConfig.ts
                </p>
              </div>
              <a
                href={STORE_CONFIG.location.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline hover:opacity-70 whitespace-nowrap shrink-0"
              >
                Ouvrir Maps
              </a>
            </div>

            <div className="aspect-[16/9] w-full bg-brand-light">
              <iframe
                title="Localisation REALLY TO WEAR Casablanca"
                src={STORE_CONFIG.location.googleMapsEmbedUrl}
                className="w-full h-full border-0 grayscale contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
