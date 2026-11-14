export type Gender = 'femme' | 'homme';

export type ProductCategory =
  | 't-shirts'
  | 'pantalons'
  | 'jeans'
  | 'chemises'
  | 'vestes'
  | 'pulls'
  | 'accessoires';

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  category: ProductCategory;
  collectionSlug: string;
  priceDH: number;
  compareAtPriceDH?: number;
  description: string;
  details: string[];
  fabric: string;
  images: string[];
  sizes: ClothingSize[];
  colors: ProductColor[];
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  createdAt: string;
}

export interface CollectionItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  season: string;
}

export interface CartItem {
  key: string; // productId + size + colorName
  product: Product;
  size: ClothingSize;
  color: ProductColor;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'online_cmi_payzone';

export interface OrderCustomerInput {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface OrderPayload {
  customer: OrderCustomerInput;
  items: Array<{
    productId: string;
    name: string;
    size: ClothingSize;
    color: string;
    quantity: number;
    unitPriceDH: number;
  }>;
  subtotalDH: number;
  shippingDH: number;
  totalDH: number;
  currency: 'MAD';
  source: 'really-to-wear-web';
}

export interface OrderSubmissionResult {
  mode: 'backend_connected' | 'preview_no_backend';
  orderReference?: string;
  redirectPaymentUrl?: string;
  message: string;
}
