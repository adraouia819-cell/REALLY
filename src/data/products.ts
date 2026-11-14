import { CollectionItem, Product } from '../types/store';

import heroCasablancaImg from '../assets/images/hero_casablanca_fashion_1794670289691.jpg';
import atelierStudioImg from '../assets/images/atelier_casablanca_studio_1794670290191.jpg';
import collectionMonochromeImg from '../assets/images/collection_monochrome_1794670290741.jpg';
import collectionSableImg from '../assets/images/collection_sable_maille_1794670294152.jpg';

import prodTrenchBeigeImg from '../assets/images/prod_trench_beige_1794670290960.jpg';
import prodBlazerNoirImg from '../assets/images/prod_blazer_noir_1794670291920.jpg';
import prodChemiseBlancheImg from '../assets/images/prod_chemise_blanche_1794670292571.jpg';
import prodPantalonNoirImg from '../assets/images/prod_pantalon_noir_1794670293002.jpg';
import prodPullIvoireImg from '../assets/images/prod_pull_ivoire_1794670292874.jpg';
import prodJeanMineralImg from '../assets/images/prod_jean_mineral_1794670294057.jpg';
import prodPullTaupeImg from '../assets/images/prod_pull_taupe_1794670293938.jpg';
import prodVesteGriseHommeImg from '../assets/images/prod_veste_grise_homme_1794670294302.jpg';
import prodChemiseNoireHommeImg from '../assets/images/prod_chemise_noire_homme_1794670294042.jpg';
import prodChinoSableHommeImg from '../assets/images/prod_chino_sable_homme_1794670294871.jpg';
import prodTshirtHeavyweightImg from '../assets/images/prod_tshirt_heavyweight_1794670295000.jpg';
import prodJeanBrutHommeImg from '../assets/images/prod_jean_brut_homme_1794670295637.jpg';
import prodVesteCuirHommeImg from '../assets/images/prod_veste_cuir_homme_1794670296031.jpg';
import prodLunettesMaroquinerieImg from '../assets/images/prod_lunettes_maroquinerie_1794670296042.jpg';
import prodSacArchitectureImg from '../assets/images/prod_sac_architecture_1794670296638.jpg';

export const EDITORIAL_IMAGES = {
  hero: heroCasablancaImg,
  atelier: atelierStudioImg,
};

export const COLLECTIONS: CollectionItem[] = [
  {
    slug: 'casablanca-atelier',
    title: 'Casablanca Atelier',
    subtitle: 'Tailoring fluide & coupes architecturales',
    description:
      'Une ligne épurée inspirée de l’architecture moderniste de Casablanca : blazers structurés, trenchs légers et silhouettes intemporelles.',
    image: atelierStudioImg,
    season: 'Automne / Hiver',
  },
  {
    slug: 'monochrome-essentials',
    title: 'Essentiels Monochromes',
    subtitle: 'Noir profond, blanc optique & gris minéral',
    description:
      'Les pièces fondamentales du vestiaire quotidien pensées pour durer : popeline de coton, jersey épais et denim brut.',
    image: collectionMonochromeImg,
    season: 'Collection Permanente',
  },
  {
    slug: 'sable-et-cachemire',
    title: 'Sable & Maille',
    subtitle: 'Nuances beiges, textures naturelles & douceur',
    description:
      'Des teintes chaleureuses et organiques célébrant la lumière atlantique, entre mailles côtelées et surchemises douces.',
    image: collectionSableImg,
    season: 'Capsule Édition Limitée',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'rtw-f-01',
    slug: 'trench-structure-casablanca-beige',
    name: 'Trench Structuré Casablanca',
    gender: 'femme',
    category: 'vestes',
    collectionSlug: 'casablanca-atelier',
    priceDH: 1490,
    description:
      'Confectionné dans une gabardine de coton déperlante au tombé impeccable, ce trench long redéfinit l’élégance urbaine à Casablanca. Sa coupe droite ceinturée flatte toutes les silhouettes.',
    details: [
      'Coupe longue droite avec ceinture ton sur ton',
      'Boutonnage croisé finition corne mate',
      'Doublure intérieure respirante en viscose',
      'Poches passepoilées latérales',
    ],
    fabric: '100% Coton Gabardine Premium (310 g/m²)',
    images: [prodTrenchBeigeImg, collectionSableImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige Sable', hex: '#D6C7B2' },
      { name: 'Noir Encre', hex: '#141414' },
    ],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-11-05',
  },
  {
    id: 'rtw-f-02',
    slug: 'blazer-tailleur-noir-atelier',
    name: 'Blazer Tailleur Noir Atelier',
    gender: 'femme',
    category: 'vestes',
    collectionSlug: 'casablanca-atelier',
    priceDH: 1290,
    description:
      'Un blazer à la coupe androgyne chic avec épaules subtilement marquées et revers crantés nets. Idéal du bureau aux soirées casablancaises.',
    details: [
      'Coupe semi-oversize élégante',
      'Fermeture simple à un bouton',
      'Fente d’aisance au dos',
      'Deux poches à rabat minimalistes',
    ],
    fabric: '72% Laine vierge, 25% Viscose, 3% Élasthanne',
    images: [prodBlazerNoirImg, prodPantalonNoirImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Profond', hex: '#0B0B0C' },
      { name: 'Gris Anthracite', hex: '#4A4A4D' },
    ],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-11-02',
  },
  {
    id: 'rtw-f-03',
    slug: 'chemise-popeline-blanc-optique',
    name: 'Chemise Popeline Blanc Optique',
    gender: 'femme',
    category: 'chemises',
    collectionSlug: 'monochrome-essentials',
    priceDH: 590,
    description:
      'Chemise contemporaine en popeline de coton peigné à tissage serré. Son col franc et sa patte de boutonnage dissimulée assurent un rendu ultra-net.',
    details: [
      'Coupe fluide légèrement allongée au dos',
      'Poignets boutonnés raffinés',
      'Coton respirant certifié OEKO-TEX',
    ],
    fabric: '100% Coton Popeline Égyptien',
    images: [prodChemiseBlancheImg, collectionMonochromeImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanc Optique', hex: '#FFFFFF' },
      { name: 'Beige Écru', hex: '#EFE9E0' },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-10-15',
  },
  {
    id: 'rtw-f-04',
    slug: 'pantalon-tailored-rayure-craie',
    name: 'Pantalon Tailored Plis Studio',
    gender: 'femme',
    category: 'pantalons',
    collectionSlug: 'casablanca-atelier',
    priceDH: 790,
    description:
      'Pantalon taille haute à pinces offrant une jambe large et élancée. Confort absolu tout au long de la journée grâce à sa laine froide fluide.',
    details: [
      'Taille haute structurée avec passants',
      'Plis marqués sur le devant',
      'Fermeture zippée dissimulée',
    ],
    fabric: '68% Polyester recyclé, 29% Viscose, 3% Élasthanne',
    images: [prodPantalonNoirImg, prodBlazerNoirImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Noir Profond', hex: '#0B0B0C' },
      { name: 'Gris Perle', hex: '#C7C7C5' },
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    createdAt: '2026-11-08',
  },
  {
    id: 'rtw-f-05',
    slug: 'pull-col-roule-maille-ivoire',
    name: 'Pull Col Roulé Maille Fine',
    gender: 'femme',
    category: 'pulls',
    collectionSlug: 'sable-et-cachemire',
    priceDH: 690,
    description:
      'Tricoté en maille fine douce au toucher, ce pull col roulé épouse délicatement la silhouette sans jamais marquer. Un indispensable de mi-saison.',
    details: [
      'Maille fine côtelée extensible',
      'Col roulé souple non comprimant',
      'Finitions bord-côte aux poignets',
    ],
    fabric: '60% Laine Mérinos, 40% Cachemire recyclé',
    images: [prodPullIvoireImg, collectionSableImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blanc Cassé', hex: '#F4F1EA' },
      { name: 'Beige Camel', hex: '#B89F84' },
      { name: 'Noir', hex: '#111111' },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-10-10',
  },
  {
    id: 'rtw-f-06',
    slug: 'jean-droit-taille-haute-mineral',
    name: 'Jean Droit Taille Haute Minéral',
    gender: 'femme',
    category: 'jeans',
    collectionSlug: 'monochrome-essentials',
    priceDH: 650,
    description:
      'Denim japonais rigide 13 oz à délavage subtil. Sa coupe droite vintage allonge la jambe et s’associe aussi bien avec un t-shirt blanc qu’un blazer.',
    details: [
      'Denim épais 13 oz à tenue durable',
      '5 poches classiques & rivets mats',
      'Taille haute ajustée, jambe droite',
    ],
    fabric: '99% Coton Biologique, 1% Élasthanne',
    images: [prodJeanMineralImg, collectionMonochromeImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gris Délavé', hex: '#8A8D91' },
      { name: 'Bleu Brut', hex: '#2F435A' },
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    createdAt: '2026-11-01',
  },
  {
    id: 'rtw-f-07',
    slug: 'pull-torsade-brun-terre',
    name: 'Pull Enveloppant Brun Terre',
    gender: 'femme',
    category: 'pulls',
    collectionSlug: 'sable-et-cachemire',
    priceDH: 740,
    description:
      'Un pull moelleux à emmanchures descendues qui enveloppe la silhouette avec chaleur et minimalisme.',
    details: [
      'Coupe décontractée chic',
      'Col rond ras-du-cou épuré',
      'Laine peignée anti-boulochage',
    ],
    fabric: '80% Laine, 20% Polyamide',
    images: [prodPullTaupeImg, prodPullIvoireImg],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige Taupe', hex: '#9E8570' },
      { name: 'Beige Sable', hex: '#D6C7B2' },
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
    createdAt: '2026-09-28',
  },
  {
    id: 'rtw-m-01',
    slug: 'veste-croisee-grise-anfa',
    name: 'Veste Tailleur Grise Anfa',
    gender: 'homme',
    category: 'vestes',
    collectionSlug: 'casablanca-atelier',
    priceDH: 1590,
    description:
      'Pièce maîtresse du vestiaire masculin REALLY TO WEAR. Une veste non doublée à la coupe contemporaine italienne, parfaite avec un pantalon beige ou un jean brut.',
    details: [
      'Construction semi-entoilée légère',
      'Revers élégants & double fente dos',
      'Boutons en corozo naturel',
    ],
    fabric: '100% Laine Super 110s',
    images: [prodVesteGriseHommeImg, prodChinoSableHommeImg],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Gris Ardoise', hex: '#5E6064' },
      { name: 'Noir', hex: '#0B0B0C' },
    ],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-11-09',
  },
  {
    id: 'rtw-m-02',
    slug: 'chemise-studio-noire-coupe-droite',
    name: 'Chemise Studio Noire Fluide',
    gender: 'homme',
    category: 'chemises',
    collectionSlug: 'monochrome-essentials',
    priceDH: 620,
    description:
      'Chemise minimaliste à coupe droite contemporaine. Confectionnée dans un mélange coton-lyocell soyeux qui reste impeccable toute la journée.',
    details: [
      'Col souple structuré',
      'Boutons nacrés teintés ton sur ton',
      'Base légèrement arrondie',
    ],
    fabric: '65% Coton Pima, 35% Tencel Lyocell',
    images: [prodChemiseNoireHommeImg, prodVesteGriseHommeImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir Profond', hex: '#0B0B0C' },
      { name: 'Blanc Craie', hex: '#F7F7F6' },
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    createdAt: '2026-11-03',
  },
  {
    id: 'rtw-m-03',
    slug: 'pantalon-chino-architecture-sable',
    name: 'Pantalon Architecture Sable',
    gender: 'homme',
    category: 'pantalons',
    collectionSlug: 'sable-et-cachemire',
    priceDH: 750,
    description:
      'Pantalon habillé-décontracté en twill de coton brossé. Sa coupe fuselée offre une allure moderne, aussi à l’aise avec des mocassins que des sneakers épurées.',
    details: [
      'Coupe droite légèrement fuselée',
      'Poches italiennes biaisées',
      'Ceinture boutonnée avec patte intérieure',
    ],
    fabric: '98% Coton Twill Compact, 2% Élasthanne',
    images: [prodChinoSableHommeImg, prodVesteGriseHommeImg],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Beige Sable', hex: '#D6C7B2' },
      { name: 'Noir', hex: '#141414' },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-10-18',
  },
  {
    id: 'rtw-m-04',
    slug: 'tshirt-heavyweight-essentiel-280g',
    name: 'T-Shirt Heavyweight Essentiel 280g',
    gender: 'homme',
    category: 't-shirts',
    collectionSlug: 'monochrome-essentials',
    priceDH: 340,
    description:
      'Notre t-shirt signature en jersey lourd 280 g/m². Col rond côtelé épais qui conserve sa tenue lavage après lavage et tombé carré impeccable.',
    details: [
      'Coupe boxy moderne',
      'Jersey coton organique 280 g/m²',
      'Col côtelé haute densité',
    ],
    fabric: '100% Coton Biologique Peigné',
    images: [prodTshirtHeavyweightImg, prodJeanBrutHommeImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blanc Optique', hex: '#FFFFFF' },
      { name: 'Noir Carbone', hex: '#0B0B0C' },
      { name: 'Beige Pierre', hex: '#D8D0C5' },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-10-05',
  },
  {
    id: 'rtw-m-05',
    slug: 'jean-selvedge-coupe-droite-indigo',
    name: 'Jean Coupe Droite Denim Brut',
    gender: 'homme',
    category: 'jeans',
    collectionSlug: 'monochrome-essentials',
    priceDH: 690,
    description:
      'Jean coupe droite en denim coton épais au lavage profond. Surpiqûres discrètes et finition minimaliste sans logo ostentatoire.',
    details: [
      'Coupe regular straight équilibrée',
      'Bouton métallique brossé mat',
      '5 poches classiques renforcées',
    ],
    fabric: '99% Coton Denim 13.5 oz, 1% Élasthanne',
    images: [prodJeanBrutHommeImg, prodTshirtHeavyweightImg],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Indigo Brut', hex: '#253347' },
      { name: 'Noir Délavé', hex: '#232325' },
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
    createdAt: '2026-09-20',
  },
  {
    id: 'rtw-m-06',
    slug: 'blouson-cuir-minimaliste-noir',
    name: 'Veste Cuir Minimaliste Corniche',
    gender: 'homme',
    category: 'vestes',
    collectionSlug: 'casablanca-atelier',
    priceDH: 2490,
    description:
      'Veste en cuir d’agneau pleine fleur au grain souple et mat. Lignes épurées sans surcharge métallique pour une allure résolument contemporaine.',
    details: [
      'Cuir d’agneau souple pleine fleur',
      'Fermeture zippée YKK Excella gunmetal',
      'Deux poches intérieures passepoilées',
    ],
    fabric: '100% Cuir d’agneau | Doublure 100% Viscose',
    images: [prodVesteCuirHommeImg, prodChemiseNoireHommeImg],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Noir Mat', hex: '#0D0D0F' }],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    createdAt: '2026-11-11',
  },
  {
    id: 'rtw-m-07',
    slug: 'coffret-essentiels-lunettes-maroquinerie',
    name: 'Lunettes Acétate & Porte-Cartes Cuir',
    gender: 'homme',
    category: 'accessoires',
    collectionSlug: 'monochrome-essentials',
    priceDH: 550,
    description:
      'Accessoires essentiels du quotidien : monture géométrique en acétate poli main et petite maroquinerie minimaliste en cuir grainé.',
    details: [
      'Acétate italien haute résistance',
      'Verres protection UV400',
      'Livré avec étui rigide griffé REALLY TO WEAR',
    ],
    fabric: 'Acétate de cellulose & Cuir de veau pleine fleur',
    images: [prodLunettesMaroquinerieImg, prodSacArchitectureImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir Ébène', hex: '#101010' },
      { name: 'Beige Écaille', hex: '#9C8265' },
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    createdAt: '2026-11-06',
  },
  {
    id: 'rtw-f-08',
    slug: 'sac-bandouliere-cuir-architecture',
    name: 'Sac Architecture & Monture Solaire',
    gender: 'femme',
    category: 'accessoires',
    collectionSlug: 'sable-et-cachemire',
    priceDH: 890,
    description:
      'Accessoire signature aux lignes géométriques nettes, pensé pour accompagner chaque silhouette du matin jusqu’au soir à Casablanca.',
    details: [
      'Cuir lisse structuré haute tenue',
      'Bandoulière amovible et ajustable',
      'Fermoir magnétique invisible',
    ],
    fabric: '100% Cuir de veau lisse & Doublure suédée',
    images: [prodSacArchitectureImg, prodLunettesMaroquinerieImg],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Noir Classique', hex: '#101010' },
      { name: 'Beige Galet', hex: '#CFC5B8' },
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    createdAt: '2026-10-22',
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  't-shirts': 'T-shirts',
  pantalons: 'Pantalons',
  jeans: 'Jeans',
  chemises: 'Chemises',
  vestes: 'Vestes',
  pulls: 'Pulls',
  accessoires: 'Accessoires',
};
