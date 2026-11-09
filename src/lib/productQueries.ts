import type { CategoryId, Product, ProductTag, SellerType } from '@/types/marketplace';
import { PRODUCTS } from '@/data/products';

export type SourceFilter = 'all' | SellerType;
export type SortOption = 'default' | 'price-asc' | 'price-desc';

export interface ProductFilters {
  query: string;
  categoryId: CategoryId | null;
  source: SourceFilter;
  sort: SortOption;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getProductsByTag(tag: ProductTag): Product[] {
  return PRODUCTS.filter((product) => product.tags.includes(tag));
}

export function getOfferProducts(): Product[] {
  return PRODUCTS.filter((product) => product.oldPrice !== undefined && product.oldPrice > product.price);
}

export function getProductsBySellerType(type: SellerType): Product[] {
  return PRODUCTS.filter((product) => product.seller.type === type);
}

export function countProductsBySeller(sellerId: string): number {
  return PRODUCTS.filter((product) => product.seller.id === sellerId).length;
}

export function getRelatedProducts(product: Product, limit: number): Product[] {
  return PRODUCTS.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, limit);
}

export function getDiscountPercent(product: Product): number | null {
  if (product.oldPrice === undefined || product.oldPrice <= product.price) return null;
  return Math.round((1 - product.price / product.oldPrice) * 100);
}

export function filterProducts({ query, categoryId, source, sort }: ProductFilters): Product[] {
  const term = query.trim().toLowerCase();

  const matches = PRODUCTS.filter((product) => {
    if (categoryId && product.categoryId !== categoryId) return false;
    if (source !== 'all' && product.seller.type !== source) return false;
    if (!term) return true;
    return [
      product.name.en,
      product.name.prs,
      product.description.en,
      product.description.prs,
      product.seller.name.en,
      product.seller.name.prs,
    ].some((value) => value.toLowerCase().includes(term));
  });

  if (sort === 'price-asc') return [...matches].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return [...matches].sort((a, b) => b.price - a.price);
  return matches;
}
