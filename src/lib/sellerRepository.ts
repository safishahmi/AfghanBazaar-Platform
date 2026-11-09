import { supabase } from '@/lib/supabaseClient';
import type { CategoryId, LocalizedText } from '@/types/marketplace';
import type {
  ProductCondition,
  FulfilmentMethod,
  SellerApplication,
  SellerApplicationStatus,
  SellerProduct,
  SellerProductStatus,
} from '@/types/seller';

export interface SellerData {
  sellerId: string;
  application: SellerApplication;
  products: SellerProduct[];
}

interface ApplicationRow {
  id: string;
  status: SellerApplicationStatus;
  full_name: string;
  store_name: string;
  phone: string;
  email: string;
  business_address: string;
  province_id: string;
  category_id: string | null;
  description: string;
}

interface ProductRow {
  id: string;
  seller_id: string;
  name_en: string;
  name_prs: string;
  description: string;
  category_id: string;
  image_url: string;
  selling_price: number;
  discount_price: number | null;
  quantity: number;
  condition: ProductCondition;
  brand: string | null;
  sku: string;
  shipping_method: FulfilmentMethod;
  status: SellerProductStatus;
  updated_at: string;
}

function rowToApplication(row: ApplicationRow): SellerApplication {
  return {
    id: row.id,
    status: row.status,
    fullName: row.full_name,
    storeName: row.store_name,
    phone: row.phone,
    email: row.email,
    businessAddress: row.business_address,
    provinceId: row.province_id,
    categoryId: (row.category_id ?? '') as CategoryId | '',
    description: row.description,
  };
}

function applicationToRow(application: SellerApplication): ApplicationRow {
  return {
    id: application.id,
    status: application.status,
    full_name: application.fullName,
    store_name: application.storeName,
    phone: application.phone,
    email: application.email,
    business_address: application.businessAddress,
    province_id: application.provinceId,
    category_id: application.categoryId || null,
    description: application.description,
  };
}

function rowToProduct(row: ProductRow): SellerProduct {
  const name: LocalizedText = { en: row.name_en, prs: row.name_prs };
  return {
    id: row.id,
    sellerId: row.seller_id,
    name,
    description: row.description,
    categoryId: row.category_id as CategoryId,
    imageUrl: row.image_url,
    sellingPrice: row.selling_price,
    discountPrice: row.discount_price,
    quantity: row.quantity,
    condition: row.condition,
    brand: row.brand,
    sku: row.sku,
    shippingMethod: row.shipping_method,
    status: row.status,
    updatedAt: row.updated_at,
  };
}

function productToRow(product: SellerProduct): ProductRow {
  return {
    id: product.id,
    seller_id: product.sellerId,
    name_en: product.name.en,
    name_prs: product.name.prs,
    description: product.description,
    category_id: product.categoryId,
    image_url: product.imageUrl,
    selling_price: product.sellingPrice,
    discount_price: product.discountPrice,
    quantity: product.quantity,
    condition: product.condition,
    brand: product.brand,
    sku: product.sku,
    shipping_method: product.shippingMethod,
    status: product.status,
    updated_at: product.updatedAt,
  };
}

function blankApplicationRow(userId: string): ApplicationRow {
  return {
    id: userId,
    status: 'draft',
    full_name: '',
    store_name: '',
    phone: '',
    email: '',
    business_address: '',
    province_id: '',
    category_id: null,
    description: '',
  };
}

async function loadOrCreateApplication(userId: string): Promise<ApplicationRow> {
  const existing = await supabase.from('seller_applications').select('*').eq('owner_id', userId).maybeSingle();
  if (existing.error) throw existing.error;
  if (existing.data) return existing.data as ApplicationRow;

  const created = await supabase.from('seller_applications').insert(blankApplicationRow(userId)).select('*').single();
  if (created.error) throw created.error;
  return created.data as ApplicationRow;
}

export async function fetchSellerData(userId: string): Promise<SellerData> {
  const [applicationRow, productsResult] = await Promise.all([
    loadOrCreateApplication(userId),
    supabase.from('seller_products').select('*').eq('owner_id', userId).order('created_at', { ascending: true }),
  ]);

  if (productsResult.error) throw productsResult.error;

  return {
    sellerId: userId,
    application: rowToApplication(applicationRow),
    products: (productsResult.data as ProductRow[]).map(rowToProduct),
  };
}

export async function upsertApplicationRow(application: SellerApplication): Promise<void> {
  const { error } = await supabase.from('seller_applications').upsert(applicationToRow(application));
  if (error) throw error;
}

export async function upsertProductRow(product: SellerProduct): Promise<void> {
  const { error } = await supabase.from('seller_products').upsert(productToRow(product));
  if (error) throw error;
}
