import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-white/15">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.2em] font-semibold">
              {STORE_CONFIG.brandName}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-sand">
              {STORE_CONFIG.slogan}
            </p>
            <p className="text-xs text-white/75 leading-relaxed max-w-xs">
              Maison de prêt-à-porter contemporaine basée à Casablanca, Maroc.
              Des silhouettes minimalistes pensées pour traverser les saisons
              avec allure.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-5 text-white/90">
              Boutique
            </h4>
            <ul className="space-y-3 text-xs text-white/75">
              <li>
                <Link to="/catalogue?filter=nouveautes" className="hover:text-white transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link to="/catalogue?gender=femme" className="hover:text-white transition-colors">
                  Femme
                </Link>
              </li>
              <li>
                <Link to="/catalogue?gender=homme" className="hover:text-white transition-colors">
                  Homme
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/commande" className="hover:text-white transition-colors">
                  Mon Panier & Commande
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-5 text-white/90">
              Boutique Casablanca
            </h4>
            <ul className="space-y-3 text-xs text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-sand shrink-0 mt-0.5" />
                <span>
                  {STORE_CONFIG.location.city}, {STORE_CONFIG.location.country}
                  <br />
                  <span className="text-white/55">
                    {STORE_CONFIG.location.district}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-4 h-4 text-brand-sand shrink-0" />
                <span>{STORE_CONFIG.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-sand shrink-0" />
                <span>{STORE_CONFIG.contact.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-5 text-white/90">
              Nous suivre
            </h4>
            <p className="text-xs text-white/75 mb-4 leading-relaxed">
              Lookbooks, lancements exclusifs et inspirations depuis notre
              atelier à Casablanca.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={STORE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-white/25 text-xs uppercase tracking-[0.14em] hover:bg-white hover:text-brand-black transition-colors whitespace-nowrap shrink-0"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
              <a
                href={STORE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-white/25 text-xs uppercase tracking-[0.14em] hover:bg-white hover:text-brand-black transition-colors whitespace-nowrap shrink-0"
              >
                Facebook
              </a>
              <a
                href={STORE_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-white/25 text-xs uppercase tracking-[0.14em] hover:bg-white hover:text-brand-black transition-colors whitespace-nowrap shrink-0"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/55 tracking-wider">
          <p>
            © {new Date().getFullYear()} {STORE_CONFIG.brandName} — Casablanca,
            Maroc. Tous droits réservés.
          </p>
          <p>Prix affichés en Dirhams Marocains (DH)</p>
        </div>
      </div>
    </footer>
  );
};
