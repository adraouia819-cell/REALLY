import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORY_LABELS, PRODUCTS } from '../data/products';
import { ClothingSize, Gender, ProductCategory } from '../types/store';
import { ProductCard } from '../components/ProductCard';
import { formatPriceDH } from '../config/storeConfig';

const ALL_SIZES: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ALL_CATEGORIES: ProductCategory[] = [
  't-shirts',
  'chemises',
  'pulls',
  'vestes',
  'pantalons',
  'jeans',
  'accessoires',
];

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'bestsellers';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>(
    (searchParams.get('gender') as Gender) || 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'all'
  >((searchParams.get('category') as ProductCategory) || 'all');
  const [selectedSize, setSelectedSize] = useState<ClothingSize | 'all'>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [onlyNew, setOnlyNew] = useState<boolean>(
    searchParams.get('filter') === 'nouveautes'
  );
  const [selectedCollection, setSelectedCollection] = useState<string>(
    searchParams.get('collection') || 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'newest'
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedGender((searchParams.get('gender') as Gender) || 'all');
    setOnlyNew(searchParams.get('filter') === 'nouveautes');
    setSelectedCollection(searchParams.get('collection') || 'all');
    setSearch(searchParams.get('q') || '');
    const sortParam = searchParams.get('sort') as SortOption;
    if (sortParam) setSortBy(sortParam);
  }, [searchParams]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    PRODUCTS.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      if (selectedGender !== 'all' && product.gender !== selectedGender) {
        return false;
      }
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }
      if (
        selectedColor !== 'all' &&
        !product.colors.some((c) => c.name === selectedColor)
      ) {
        return false;
      }
      if (product.priceDH > maxPrice) {
        return false;
      }
      if (onlyNew && !product.isNew) {
        return false;
      }
      if (
        selectedCollection !== 'all' &&
        product.collectionSlug !== selectedCollection
      ) {
        return false;
      }
      if (q) {
        const haystack =
          `${product.name} ${product.description} ${product.category} ${product.gender}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceDH - b.priceDH;
      if (sortBy === 'price-desc') return b.priceDH - a.priceDH;
      if (sortBy === 'bestsellers') {
        return Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller));
      }
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [
    search,
    selectedGender,
    selectedCategory,
    selectedSize,
    selectedColor,
    maxPrice,
    onlyNew,
    selectedCollection,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearch('');
    setSelectedGender('all');
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setMaxPrice(3000);
    setOnlyNew(false);
    setSelectedCollection('all');
    setSortBy('newest');
    setSearchParams({});
  };

  const pageTitle = useMemo(() => {
    if (onlyNew) return 'Nouveautés';
    if (selectedGender === 'femme') return 'Collection Femme';
    if (selectedGender === 'homme') return 'Collection Homme';
    return 'Catalogue Complet';
  }, [onlyNew, selectedGender]);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3">
          Genre
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'femme', label: 'Femme' },
            { value: 'homme', label: 'Homme' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelectedGender(opt.value as Gender | 'all')}
              className={`px-3.5 py-2 text-xs uppercase tracking-[0.14em] border transition-colors whitespace-nowrap ${
                selectedGender === opt.value
                  ? 'bg-brand-black text-white border-brand-black'
                  : 'bg-white text-brand-black border-brand-border hover:border-brand-black'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3">
          Catégorie
        </h3>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`text-left text-xs py-1 transition-colors ${
              selectedCategory === 'all'
                ? 'font-semibold text-brand-black underline underline-offset-4'
                : 'text-brand-muted hover:text-brand-black'
            }`}
          >
            Toutes les catégories
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-left text-xs py-1 transition-colors ${
                selectedCategory === cat
                  ? 'font-semibold text-brand-black underline underline-offset-4'
                  : 'text-brand-muted hover:text-brand-black'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3">
          Taille
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                setSelectedSize(selectedSize === size ? 'all' : size)
              }
              className={`py-2 text-xs border transition-colors ${
                selectedSize === size
                  ? 'bg-brand-black text-white border-brand-black'
                  : 'border-brand-border text-brand-black hover:border-brand-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3">
          Couleur
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((c) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() =>
                setSelectedColor(selectedColor === c.name ? 'all' : c.name)
              }
              className={`flex items-center gap-2 px-2.5 py-1.5 border text-[11px] transition-colors ${
                selectedColor === c.name
                  ? 'border-brand-black bg-brand-light font-medium'
                  : 'border-brand-border hover:border-brand-black'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold">
            Prix max
          </h3>
          <span className="text-xs font-medium tabular-nums">
            {formatPriceDH(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={300}
          max={3000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-black cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-brand-muted mt-1 tabular-nums">
          <span>300 DH</span>
          <span>3 000 DH</span>
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-xs cursor-pointer">
        <input
          type="checkbox"
          checked={onlyNew}
          onChange={(e) => setOnlyNew(e.target.checked)}
          className="w-4 h-4 accent-brand-black"
        />
        <span>Nouveautés uniquement</span>
      </label>

      <button
        type="button"
        onClick={resetFilters}
        className="w-full py-2.5 border border-brand-border text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2 hover:border-brand-black transition-colors whitespace-nowrap"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Réinitialiser les filtres
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-8 border-b border-brand-border flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-brand-muted mb-2">
            REALLY TO WEAR · Casablanca
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal">
            {pageTitle}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un article..."
              className="pl-10 pr-4 py-2.5 border border-brand-border text-xs w-full sm:w-64 focus:outline-none focus:border-brand-black"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Trier les produits"
            className="px-4 py-2.5 border border-brand-border text-xs bg-white focus:outline-none focus:border-brand-black"
          >
            <option value="newest">Trier : Nouveautés</option>
            <option value="bestsellers">Trier : Meilleures ventes</option>
            <option value="price-asc">Prix : Croissant</option>
            <option value="price-desc">Prix : Décroissant</option>
          </select>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-brand-black text-xs uppercase tracking-[0.16em]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres
          </button>
        </div>
      </div>

      <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="hidden lg:block lg:col-span-3 pr-4">
          {FilterPanel}
        </aside>

        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6 text-xs text-brand-muted">
            <span className="tabular-nums">
              {filteredProducts.length} article
              {filteredProducts.length > 1 ? 's' : ''} affiché
              {filteredProducts.length > 1 ? 's' : ''}
            </span>
            {selectedCollection !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCollection('all')}
                className="inline-flex items-center gap-1.5 text-brand-black underline"
              >
                Collection : {selectedCollection} <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-brand-border bg-brand-cream/40">
              <p className="font-serif text-3xl mb-2">Aucun article trouvé</p>
              <p className="text-xs text-brand-muted mb-6">
                Essayez d’ajuster vos critères de recherche ou de réinitialiser
                les filtres.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-6 py-3 bg-brand-black text-white text-xs uppercase tracking-[0.2em]"
              >
                Voir tout le catalogue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-80 max-w-[88vw] bg-white h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-border">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold">
                Filtres
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Fermer"
                className="p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </div>
  );
};
