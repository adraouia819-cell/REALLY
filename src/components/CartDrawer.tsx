import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_CONFIG, formatPriceDH } from '../config/storeConfig';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    subtotalDH,
    closeDrawer,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(
    0,
    STORE_CONFIG.shipping.freeThresholdDH - subtotalDH
  );

  const handleCheckout = () => {
    closeDrawer();
    navigate('/commande');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      <aside className="relative z-10 w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="px-6 py-5 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4" />
            <h2 className="text-xs uppercase tracking-[0.22em] font-semibold tabular-nums">
              Votre Panier ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Fermer le panier"
            className="p-2 text-brand-muted hover:text-brand-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 bg-brand-cream text-xs text-brand-charcoal border-b border-brand-border">
          {remainingForFreeShipping === 0 ? (
            <p className="font-medium">
              Livraison offerte débloquée pour votre commande.
            </p>
          ) : (
            <p>
              Plus que{' '}
              <span className="font-semibold tabular-nums">
                {formatPriceDH(remainingForFreeShipping)}
              </span>{' '}
              pour bénéficier de la livraison offerte.
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-brand-border">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-brand-muted/50 mb-4 stroke-[1.25]" />
              <p className="font-serif text-2xl mb-2">Votre panier est vide</p>
              <p className="text-xs text-brand-muted max-w-xs mb-6 leading-relaxed">
                Découvrez nos pièces minimalistes confectionnées pour durer.
              </p>
              <Link
                to="/catalogue"
                onClick={closeDrawer}
                className="px-6 py-3 bg-brand-black text-white text-xs uppercase tracking-[0.2em] hover:bg-brand-charcoal transition-colors whitespace-nowrap"
              >
                Découvrir le catalogue
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="py-5 flex gap-4">
                <Link
                  to={`/produit/${item.product.slug}`}
                  onClick={closeDrawer}
                  className="w-20 h-28 bg-brand-light shrink-0 overflow-hidden"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/produit/${item.product.slug}`}
                        onClick={closeDrawer}
                        className="text-sm font-medium text-brand-black hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        aria-label="Supprimer l'article"
                        className="p-1 text-brand-muted hover:text-brand-black transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-brand-muted mt-1">
                      Taille : <span className="text-brand-black">{item.size}</span>{' '}
                      <span aria-hidden="true">·</span> Couleur :{' '}
                      <span className="text-brand-black">{item.color.name}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-brand-border">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        aria-label="Diminuer la quantité"
                        className="p-2 hover:bg-brand-light transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        aria-label="Augmenter la quantité"
                        className="p-2 hover:bg-brand-light transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-medium tabular-nums">
                      {formatPriceDH(item.product.priceDH * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-brand-border bg-brand-light/40 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-brand-muted uppercase tracking-[0.14em] text-xs">
                Sous-total
              </span>
              <span className="text-base font-semibold tabular-nums">
                {formatPriceDH(subtotalDH)}
              </span>
            </div>
            <p className="text-[11px] text-brand-muted">
              Frais de livraison calculés selon votre ville lors de la commande.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 bg-brand-black text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-brand-charcoal transition-colors"
            >
              Passer la commande
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
