import { STORE_CONFIG } from '../config/storeConfig';
import { COLLECTIONS, PRODUCTS } from '../data/products';
import { CollectionItem, Product } from '../types/store';

export async function fetchProducts(): Promise<Product[]> {
  if (STORE_CONFIG.apiBaseUrl) {
    const response = await fetch(`${STORE_CONFIG.apiBaseUrl}/api/products`);
    if (!response.ok) {
      throw new Error('Impossible de charger les produits depuis le serveur.');
    }
    return response.json();
  }
  return PRODUCTS;
}

export function getProductsSync(): Product[] {
  return PRODUCTS;
}

export function getProductBySlugSync(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProductsSync(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.gender === product.gender || p.collectionSlug === product.collectionSlug)
  ).slice(0, limit);
}

export function getCollectionsSync(): CollectionItem[] {
  return COLLECTIONS;
}
