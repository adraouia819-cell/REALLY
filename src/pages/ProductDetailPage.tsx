import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import {
  getProductBySlugSync,
  getRelatedProductsSync,
} from '../services/productRepository';
import { CATEGORY_LABELS } from '../data/products';
import { ClothingSize, ProductColor } from '../types/store';
import { useCart } from '../context/CartContext';
import {
  STORE_CONFIG,
  buildWhatsAppUrl,
  formatPriceDH,
} from '../config/storeConfig';
import { ProductCard } from '../components/ProductCard';
import { SizeGuideModal } from '../components/SizeGuideModal';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlugSync(slug) : undefined;
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ClothingSize>('M');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl mb-4">Produit introuvable</h1>
        <p className="text-sm text-brand-muted mb-8">
          Cet article n’est plus disponible ou le lien est incorrect.
        </p>
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white text-xs uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProductsSync(product, 4);
  const activeColor = selectedColor || product.colors[0];

  const handleAdd = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const whatsappProductUrl = buildWhatsAppUrl(
    `Bonjour ${STORE_CONFIG.brandName}, je souhaite des informations sur l’article "${product.name}" (Taille ${selectedSize}, Couleur ${activeColor.name}) à ${formatPriceDH(product.priceDH)}.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <nav className="flex items-center gap-2 text-xs text-brand-muted mb-8">
        <Link to="/" className="hover:text-brand-black">
          Accueil
        </Link>
        <span>/</span>
        <Link
          to={`/catalogue?gender=${product.gender}`}
          className="capitalize hover:text-brand-black"
        >
          {product.gender}
        </Link>
        <span>/</span>
        <span className="text-brand-black truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Galerie Photos */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 h-24 sm:w-20 sm:h-28 shrink-0 overflow-hidden border transition-opacity ${
                  activeImageIndex === idx
                    ? 'border-brand-black'
                    : 'border-transparent opacity-65 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} miniature ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 aspect-[3/4] bg-brand-beige/30 overflow-hidden">
            <img
              src={product.images[activeImageIndex]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
        </div>

        {/* Informations & Configuration */}
        <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-28 self-start">
          <div className="border-b border-brand-border pb-6">
            <p className="text-[11px] uppercase tracking-[0.24em] text-brand-muted mb-2 capitalize">
              {product.gender} · {CATEGORY_LABELS[product.category] || product.category}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black mb-3">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-brand-black tabular-nums">
              {formatPriceDH(product.priceDH)}
            </p>
          </div>

          <p className="text-sm text-brand-charcoal/85 leading-relaxed py-6">
            {product.description}
          </p>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="uppercase tracking-[0.18em] font-semibold">
                Couleur
              </span>
              <span className="text-brand-muted">{activeColor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = activeColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={`Couleur ${color.name}`}
                    className={`w-8 h-8 rounded-full border p-0.5 transition-colors ${
                      isSelected
                        ? 'border-brand-black ring-1 ring-brand-black ring-offset-2'
                        : 'border-brand-border hover:border-brand-black'
                    }`}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="uppercase tracking-[0.18em] font-semibold">
                Taille
              </span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="inline-flex items-center gap-1.5 text-brand-muted hover:text-brand-black underline underline-offset-4"
              >
                <Ruler className="w-3.5 h-3.5" />
                Guide des tailles
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as ClothingSize[]).map(
                (size) => {
                  const available = product.sizes.includes(size);
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs border transition-colors ${
                        !available
                          ? 'border-brand-border/50 text-brand-muted/40 line-through cursor-not-allowed'
                          : isSelected
                          ? 'bg-brand-black text-white border-brand-black font-medium'
                          : 'border-brand-border text-brand-black hover:border-brand-black'
                      }`}
                    >
                      {size}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="inline-flex items-center justify-between border border-brand-border px-3 py-2 sm:w-32">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuer la quantité"
                className="p-1.5 text-brand-black hover:opacity-65"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium tabular-nums">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Augmenter la quantité"
                className="p-1.5 text-brand-black hover:opacity-65"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-4 px-6 bg-brand-black text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-charcoal transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Ajouté au panier
                </>
              ) : (
                'Ajouter au panier'
              )}
            </button>
          </div>

          <a
            href={whatsappProductUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 border border-brand-border text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 hover:border-brand-black transition-colors mb-8 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            Demander conseil sur WhatsApp
          </a>

          <div className="border-t border-brand-border pt-6 space-y-4 text-xs">
            <div>
              <h3 className="uppercase tracking-[0.18em] font-semibold mb-2">
                Détails &amp; Coupe
              </h3>
              <ul className="space-y-1.5 text-brand-charcoal/80 list-disc pl-4">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="uppercase tracking-[0.18em] font-semibold mb-1">
                Matière
              </h3>
              <p className="text-brand-charcoal/80">{product.fabric}</p>
            </div>

            <div className="pt-4 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-brand-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand-black shrink-0" />
                <span>Livraison Casablanca &amp; Maroc</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-black shrink-0" />
                <span>Paiement à la réception (COD)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-14 border-t border-brand-border">
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-1">
              À découvrir également
            </p>
            <h2 className="font-serif text-3xl font-normal">
              Produits similaires
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
};
