import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Homme', to: '/catalogue?gender=homme' },
  { label: 'Femme', to: '/catalogue?gender=femme' },
  { label: 'Nouveautés', to: '/catalogue?filter=nouveautes' },
  { label: 'Collections', to: '/collections' },
  { label: 'Contact', to: '/contact' },
];

const ANNOUNCEMENTS = [
  `Casablanca, Maroc · Livraison offerte dès ${STORE_CONFIG.shipping.freeThresholdDH} DH`,
  'Paiement à la livraison (Cash on Delivery) partout au Maroc',
  'Nouvelle Saison · Collection Casablanca Atelier disponible',
];

export const Navbar: React.FC = () => {
  const { totalItems, openDrawer } = useCart();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (bannerDismissed || prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [bannerDismissed, prefersReducedMotion]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setSearchOpen(false);
    setMobileMenuOpen(false);
    if (trimmed) {
      navigate(`/catalogue?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/catalogue');
    }
  };

  const isNavItemActive = (to: string): boolean => {
    const current = `${location.pathname}${location.search}`;
    if (to === '/') return location.pathname === '/';
    if (to.includes('?')) return current === to;
    return location.pathname === to;
  };

  return (
    <>
      {!bannerDismissed && (
        <div className="bg-brand-black text-white text-[11px] tracking-[0.16em] uppercase h-9 px-8 flex items-center justify-center relative font-light overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={announcementIdx}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="truncate text-center"
            >
              {ANNOUNCEMENTS[announcementIdx]}
            </motion.span>
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            aria-label="Fermer le bandeau d’information"
            className="absolute right-3 p-1 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-brand-border shadow-sm'
            : 'bg-white border-brand-border/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Menu Mobile + Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="lg:hidden p-2 -ml-2 text-brand-black hover:opacity-70 transition-opacity"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              to="/"
              className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-semibold text-brand-black whitespace-nowrap shrink-0"
            >
              {STORE_CONFIG.brandName}
            </Link>
          </div>

          {/* Zone 2: Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((item) => {
              const active = isNavItemActive(item.to);
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={`text-xs uppercase tracking-[0.16em] transition-colors py-1 border-b whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-brand-black border-brand-black font-medium'
                      : 'text-brand-charcoal/80 border-transparent hover:text-brand-black hover:border-brand-black/40'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Zone 3: Actions Droite */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Rechercher un article"
              className="p-2 text-brand-black hover:opacity-70 transition-opacity shrink-0"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={openDrawer}
              aria-label="Ouvrir le panier"
              className="py-2 px-3 border border-brand-black bg-brand-black text-white hover:bg-brand-charcoal transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span className="text-xs uppercase tracking-[0.16em]">
                Panier
              </span>
              <span className="text-xs font-medium tabular-nums">
                ({totalItems})
              </span>
            </button>
          </div>
        </div>

        {/* Barre de recherche déroulante */}
        {searchOpen && (
          <div className="border-t border-brand-border bg-brand-cream/80 backdrop-blur-sm">
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-brand-muted shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un blazer, trench, chemise, jean..."
                className="w-full bg-transparent text-sm text-brand-black placeholder:text-brand-muted focus:outline-none"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.18em] px-4 py-2 bg-brand-black text-white hover:bg-brand-charcoal transition-colors whitespace-nowrap shrink-0"
              >
                Rechercher
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Fermer la recherche"
                className="p-1.5 text-brand-muted hover:text-brand-black"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-80 max-w-[85vw] bg-white h-full flex flex-col justify-between p-6 shadow-2xl animate-fade-up">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brand-border">
                <span className="font-serif text-xl tracking-[0.2em] font-semibold">
                  {STORE_CONFIG.brandName}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="p-2 text-brand-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-5">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] text-brand-black hover:text-brand-muted transition-colors py-1.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-brand-border text-xs text-brand-muted space-y-2">
              <p className="uppercase tracking-[0.16em] text-brand-black font-medium">
                {STORE_CONFIG.location.city}, {STORE_CONFIG.location.country}
              </p>
              <p className="tabular-nums">{STORE_CONFIG.contact.phoneDisplay}</p>
              <p>{STORE_CONFIG.contact.email}</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
