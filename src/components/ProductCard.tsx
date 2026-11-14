import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types/store';
import { CATEGORY_LABELS } from '../data/products';
import { formatPriceDH } from '../config/storeConfig';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const badgeLabel = product.isNew
    ? 'Nouveauté'
    : product.isBestSeller
    ? 'Best-seller'
    : null;

  return (
    <article className="group flex flex-col">
      <Link
        to={`/produit/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-brand-beige/40 transition-transform duration-200 group-hover:-translate-y-0.5"
      >
        {!imgError ? (
          <>
            <img
              src={primaryImage}
              alt={product.name}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
            />
            <img
              src={secondaryImage}
              alt={`${product.name} — vue portée`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
          </>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-brand-cream text-brand-charcoal">
            <ShoppingBag className="w-8 h-8 text-brand-muted mb-3 stroke-[1.25]" />
            <span className="font-serif text-lg">{product.name}</span>
          </div>
        )}

        {badgeLabel && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 font-medium inline-block ${
                product.isNew
                  ? 'bg-white/95 backdrop-blur-sm text-brand-black'
                  : 'bg-brand-black text-white'
              }`}
            >
              {badgeLabel}
            </span>
          </div>
        )}

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <span className="w-full bg-white/95 backdrop-blur-md text-brand-black py-2.5 px-4 text-[11px] uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-brand-black hover:text-white transition-colors whitespace-nowrap">
            <Eye className="w-3.5 h-3.5 shrink-0" />
            Voir le produit
          </span>
        </div>
      </Link>

      <div className="pt-4 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/produit/${product.slug}`}
            className="text-sm font-medium text-brand-black hover:underline underline-offset-4 leading-snug"
          >
            {product.name}
          </Link>
          <span className="text-sm font-medium text-brand-black whitespace-nowrap tabular-nums">
            {formatPriceDH(product.priceDH)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-brand-muted">
            <span className="capitalize">{product.gender}</span>
            <span aria-hidden="true">·</span>
            <span>{CATEGORY_LABELS[product.category] || product.category}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="w-3 h-3 rounded-full border border-black/15"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
