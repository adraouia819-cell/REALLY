import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { COLLECTIONS, EDITORIAL_IMAGES } from '../data/products';
import { STORE_CONFIG } from '../config/storeConfig';

interface BannerSlide {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  image: string;
  objectPosition: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  tabLabel: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'nouvelle-saison',
    kicker: 'Casablanca · Nouvelle Saison',
    title: STORE_CONFIG.slogan,
    subtitle:
      'Une garde-robe architecturale, minimaliste et intemporelle pour Homme et Femme, pensée à Casablanca.',
    image: EDITORIAL_IMAGES.hero,
    objectPosition: 'object-center',
    primaryCta: { label: 'Découvrir la collection', to: '/catalogue' },
    secondaryCta: { label: 'Explorer l’Atelier', to: '/collections' },
    tabLabel: '01. Nouvelle Saison',
  },
  {
    id: 'casablanca-atelier',
    kicker: 'Collection Signature · Automne / Hiver',
    title: 'Casablanca Atelier',
    subtitle:
      'Blazers structurés, trenchs en gabardine déperlante et coupes épurées inspirées de l’architecture moderniste casablancaise.',
    image: EDITORIAL_IMAGES.atelier,
    objectPosition: 'object-center',
    primaryCta: {
      label: 'Voir la sélection Atelier',
      to: `/catalogue?collection=${COLLECTIONS[0].slug}`,
    },
    secondaryCta: { label: 'Nouveautés', to: '/catalogue?filter=nouveautes' },
    tabLabel: '02. Casablanca Atelier',
  },
  {
    id: 'sable-et-maille',
    kicker: 'Capsule Édition Limitée',
    title: 'Sable & Maille',
    subtitle:
      'Nuances beiges, mailles côtelées en laine mérinos et textures naturelles célébrant la lumière atlantique.',
    image: COLLECTIONS[2].image,
    objectPosition: 'object-[50%_20%]',
    primaryCta: {
      label: 'Découvrir Sable & Maille',
      to: `/catalogue?collection=${COLLECTIONS[2].slug}`,
    },
    secondaryCta: { label: 'Femme', to: '/catalogue?gender=femme' },
    tabLabel: '03. Sable & Maille',
  },
];

const SLIDE_DURATION_MS = 6500;

export const AnimatedHeroBanner: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const currentSlide = BANNER_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  return (
    <section
      aria-label="Bannière éditoriale animée"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative h-[82vh] min-h-[540px] max-h-[820px] w-full overflow-hidden bg-brand-charcoal"
    >
      {/* Visuel animé (crossfade + Ken Burns subtil) */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentSlide.id}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{
            opacity: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 6.5, ease: 'easeOut' },
          }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            referrerPolicy="no-referrer"
            className={`h-full w-full object-cover ${currentSlide.objectPosition} opacity-90`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Scrim de contraste mesuré */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 pointer-events-none" />

      {/* Contenu éditorial & contrôles */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 sm:pb-14 text-white">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-brand-beige mb-3.5">
                {currentSlide.kicker}
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.06] mb-5 text-balance">
                {currentSlide.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 font-light max-w-lg mb-8 leading-relaxed">
                {currentSlide.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={currentSlide.primaryCta.to}
                  className="inline-flex items-center gap-3 bg-white text-brand-black px-7 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-brand-beige transition-colors whitespace-nowrap shrink-0"
                >
                  {currentSlide.primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={currentSlide.secondaryCta.to}
                  className="inline-flex items-center gap-2 border border-white/60 text-white px-6 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                >
                  {currentSlide.secondaryCta.label}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation du slider */}
          <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Diapositive précédente"
                className="p-2.5 border border-white/35 bg-black/25 hover:bg-white hover:text-brand-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? 'Reprendre le défilement' : 'Mettre en pause'}
                className="p-2.5 border border-white/35 bg-black/25 hover:bg-white hover:text-brand-black transition-colors"
              >
                {isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Diapositive suivante"
                className="p-2.5 border border-white/35 bg-black/25 hover:bg-white hover:text-brand-black transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 sm:gap-6">
              {BANNER_SLIDES.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="group text-left py-1 whitespace-nowrap shrink-0"
                  >
                    <span
                      className={`block text-[11px] uppercase tracking-[0.18em] mb-1.5 transition-colors ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-white/55 group-hover:text-white/85'
                      }`}
                    >
                      {slide.tabLabel}
                    </span>
                    <span className="block h-[2px] w-24 sm:w-28 bg-white/25 overflow-hidden">
                      {isActive && (
                        <motion.span
                          key={`${slide.id}-${isPaused ? 'paused' : 'playing'}`}
                          initial={{ scaleX: 0 }}
                          animate={
                            isPaused || prefersReducedMotion
                              ? { scaleX: 1 }
                              : { scaleX: 1 }
                          }
                          transition={
                            isPaused || prefersReducedMotion
                              ? { duration: 0 }
                              : {
                                  duration: SLIDE_DURATION_MS / 1000,
                                  ease: 'linear',
                                }
                          }
                          style={{ transformOrigin: 'left' }}
                          className="block h-full w-full bg-white"
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
