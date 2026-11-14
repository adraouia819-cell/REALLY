import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { COLLECTIONS, EDITORIAL_IMAGES, PRODUCTS } from '../data/products';
import { STORE_CONFIG, buildWhatsAppUrl } from '../config/storeConfig';
import { ProductCard } from '../components/ProductCard';
import { AnimatedHeroBanner } from '../components/AnimatedHeroBanner';

export const HomePage: React.FC = () => {
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div>
      {/* 1. Bannière Éditoriale Animée */}
      <AnimatedHeroBanner />

      {/* Bandeau d'engagements */}
      <section className="border-b border-brand-border bg-brand-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Truck className="w-5 h-5 stroke-[1.5] text-brand-black shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] font-semibold">
                Livraison Partout au Maroc
              </p>
              <p className="text-xs text-brand-muted">
                Casablanca 24h &amp; principales villes 48h
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ShieldCheck className="w-5 h-5 stroke-[1.5] text-brand-black shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] font-semibold">
                Paiement à la Livraison
              </p>
              <p className="text-xs text-brand-muted">
                Cash on Delivery sécurisé à réception
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Sparkles className="w-5 h-5 stroke-[1.5] text-brand-black shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] font-semibold">
                Matières Sélectionnées
              </p>
              <p className="text-xs text-brand-muted">
                Coton peigné, gabardine &amp; laine froide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section Nouveautés */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-2">
              Derniers Arrivages
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal">
              Nouveautés
            </h2>
          </div>
          <Link
            to="/catalogue?filter=nouveautes"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:opacity-65 transition-opacity self-start sm:self-auto whitespace-nowrap"
          >
            Voir toutes les nouveautés
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Section Collections */}
      <section className="bg-brand-cream py-16 sm:py-24 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-2">
              Curation Saisonnière
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal mb-3 text-balance">
              Nos Collections
            </h2>
            <p className="text-sm text-brand-muted">
              Trois univers vestimentaires complémentaires pensés pour composer
              une identité visuelle forte et raffinée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                to={`/catalogue?collection=${col.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-brand-charcoal"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-brand-sand block mb-1.5">
                    {col.season}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl mb-1.5">
                    {col.title}
                  </h3>
                  <p className="text-xs text-white/85 line-clamp-2 mb-4">
                    {col.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] border-b border-white/60 pb-1 group-hover:border-white transition-colors">
                    Explorer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section Meilleures Ventes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-2">
              Pièces Iconiques
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal">
              Meilleures Ventes
            </h2>
          </div>
          <Link
            to="/catalogue?sort=bestsellers"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-brand-black pb-1 hover:opacity-65 transition-opacity self-start sm:self-auto whitespace-nowrap"
          >
            Tout le catalogue
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Identité de la boutique */}
      <section className="bg-brand-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="relative min-h-[380px] lg:min-h-[540px] overflow-hidden">
            <img
              src={EDITORIAL_IMAGES.atelier}
              alt="Atelier REALLY TO WEAR Casablanca"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-6 sm:px-12 lg:px-16 py-14 sm:py-20 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand-sand mb-4">
              L’Identité Really To Wear
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight mb-6 text-balance">
              L’élégance essentielle née à Casablanca.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-5">
              REALLY TO WEAR réinvente le vestiaire contemporain marocain en
              alliant la rigueur du tailoring européen à la décontraction
              lumineuse de Casablanca. Chaque coupe est étudiée pour offrir une
              allure affirmée, sans effort ni ostentation.
            </p>
            <p className="text-sm text-white/80 leading-relaxed mb-8">
              Des matières nobles — popeline dense, gabardine structurée, maille
              fine et denim brut — dans une palette intemporelle de noir, blanc,
              beige et gris clair.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-7 py-3.5 bg-white text-brand-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-beige transition-colors whitespace-nowrap shrink-0"
              >
                Visiter la boutique
              </Link>
              <a
                href={buildWhatsAppUrl(
                  `Bonjour ${STORE_CONFIG.brandName}, je souhaite parler à un conseiller.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/40 text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                Contact rapide
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
