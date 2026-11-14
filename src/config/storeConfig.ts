export const STORE_CONFIG = {
  brandName: 'REALLY TO WEAR',
  slogan: 'YOUR STYLE, YOUR IDENTITY',
  currency: 'DH',
  location: {
    country: 'Maroc',
    city: 'Casablanca',
    district: 'Triangle d’Or / Maarif (Adresse exacte à renseigner)',
    addressLine: 'Casablanca, Maroc — Adresse exacte modifiable dans storeConfig.ts',
    openingHours: 'Lun – Sam : 10h00 – 20h30 | Dim : 11h00 – 19h00',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Casablanca,+Morocco&output=embed',
    googleMapsLink: 'https://maps.google.com/?q=Casablanca,+Morocco',
  },
  contact: {
    whatsappNumber: '212600000000',
    phoneDisplay: '+212 6 00 00 00 00',
    email: 'contact@reallytowear.ma',
  },
  socials: {
    instagram: 'https://instagram.com/reallytowear',
    facebook: 'https://facebook.com/reallytowear',
    tiktok: 'https://tiktok.com/@reallytowear',
  },
  shipping: {
    freeThresholdDH: 1000,
    casablancaFeeDH: 30,
    otherCitiesFeeDH: 45,
  },
  moroccanCities: [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Tanger',
    'Agadir',
    'Fès',
    'Meknès',
    'Mohammedia',
    'Kénitra',
    'Tétouan',
    'Oujda',
    'El Jadida',
    'Essaouira',
    'Bouskoura',
    'Dar Bouazza',
  ],
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || '',
};

export function formatPriceDH(amount: number): string {
  return `${amount.toLocaleString('fr-MA')} DH`;
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${STORE_CONFIG.contact.whatsappNumber}?text=${encoded}`;
}
