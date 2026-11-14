import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG, buildWhatsAppUrl } from '../config/storeConfig';

export const WhatsAppButton: React.FC = () => {
  const url = buildWhatsAppUrl(
    `Bonjour ${STORE_CONFIG.brandName} Casablanca, je souhaite avoir un renseignement sur vos collections.`
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter la boutique sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-brand-black text-white px-4 py-3 shadow-xl border border-white/15 hover:bg-emerald-700 transition-colors duration-200 whitespace-nowrap shrink-0"
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      <span className="text-xs uppercase tracking-[0.16em] font-medium hidden sm:inline">
        WhatsApp Boutique
      </span>
    </a>
  );
};
