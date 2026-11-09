import type { LucideIcon } from 'lucide-react';

export type Lang = 'prs' | 'en';

export interface LocalizedText {
  en: string;
  prs: string;
}

export type CategoryId = string;

export interface Subcategory {
  id: string;
  name: LocalizedText;
  active: boolean;
}

export interface Category {
  id: CategoryId;
  name: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
}

export type SellerType = 'official' | 'independent';

export interface Seller {
  id: string;
  name: LocalizedText;
  type: SellerType;
}

export type Availability = 'in_stock' | 'low_stock' | 'out_of_stock';

export type ProductTag = 'featured' | 'new' | 'popular' | 'seasonal';

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  categoryId: CategoryId;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  seller: Seller;
  availability: Availability;
  tags: ProductTag[];
}
