import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../data/products';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-14">
        <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-2">
          Lookbook &amp; Capsules
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal mb-4 text-balance">
          Nos Collections
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed">
          Chaque capsule REALLY TO WEAR est conçue comme un vestiaire modulaire :
          des lignes pures, des tons neutres et des matières nobles adaptées au
          rythme de Casablanca.
        </p>
      </div>

      <div className="space-y-16">
        {COLLECTIONS.map((col, idx) => {
          const count = PRODUCTS.filter(
            (p) => p.collectionSlug === col.slug
          ).length;

          return (
            <section
              key={col.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-brand-border pb-16 last:border-b-0"
            >
              <div
                className={`lg:col-span-7 aspect-[16/10] overflow-hidden bg-brand-light ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-5 space-y-5">
                <span className="text-[11px] uppercase tracking-[0.24em] text-brand-muted block tabular-nums">
                  {col.season} · {count} pièces
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal">
                  {col.title}
                </h2>
                <p className="text-sm font-medium text-brand-charcoal">
                  {col.subtitle}
                </p>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {col.description}
                </p>
                <Link
                  to={`/catalogue?collection=${col.slug}`}
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-brand-black text-white text-xs uppercase tracking-[0.2em] hover:bg-brand-charcoal transition-colors whitespace-nowrap"
                >
                  Découvrir la sélection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
