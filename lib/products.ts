import { getSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import {
  PRODUCT_CATALOG,
  catalogApiResponse,
  splitCatalog,
  toShowcaseProduct,
} from '@/lib/showcaseCatalog';
import type { ProductRecord, ProductsApiResponse } from '@/lib/productTypes';

type DbRow = {
  id: number;
  sku: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  sub_en: string | null;
  sub_ar: string | null;
  price: number;
  category_en: string;
  category_ar: string;
  image_url: string;
  image_file: string | null;
  stock_quantity: number;
  is_featured: boolean;
  badge_en: string | null;
  badge_ar: string | null;
  bg_color: string | null;
};

function dbRowToRecord(row: DbRow): ProductRecord {
  return {
    id: row.id,
    sku: row.sku,
    name_en: row.name_en,
    name_ar: row.name_ar,
    description_en: row.description_en ?? '',
    description_ar: row.description_ar ?? '',
    sub_en: row.sub_en ?? '',
    sub_ar: row.sub_ar ?? '',
    price: Number(row.price),
    category_en: row.category_en,
    category_ar: row.category_ar,
    image_url: row.image_url,
    image_file: row.image_file ?? '',
    stock_quantity: row.stock_quantity,
    is_featured: row.is_featured,
    badge_en: row.badge_en ?? '',
    badge_ar: row.badge_ar ?? '',
    bg_color: row.bg_color ?? 'bg-cream',
  };
}

/** Server-side fetch — used by API route */
export async function fetchProductsFromDb(category?: string | null): Promise<ProductsApiResponse | null> {
  if (!isSupabaseConfigured) return null;

  const supabase = getSupabase();
  if (!supabase) return null;

  let query = supabase
    .from('products')
    .select('*')
    .gt('stock_quantity', 0)
    .order('is_featured', { ascending: false })
    .order('name_en', { ascending: true });

  if (category && category !== 'All') {
    query = query.eq('category_en', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[products] Supabase error:', error.message);
    return null;
  }

  if (!data?.length) return null;

  const records = (data as DbRow[]).map(dbRowToRecord);
  const showcase = records.map(toShowcaseProduct);
  const featuredSkus = records.filter((r) => r.is_featured).map((r) => r.sku);
  const { editorial, grid } = splitCatalog(showcase, featuredSkus);

  return { products: grid, editorial, source: 'supabase' };
}

/** Resolve products: Supabase first, local catalog fallback */
export async function resolveProducts(category?: string | null): Promise<ProductsApiResponse> {
  const fromDb = await fetchProductsFromDb(category);
  if (fromDb) return fromDb;

  const fallback = catalogApiResponse();
  if (category && category !== 'All') {
    const filtered = PRODUCT_CATALOG.filter((p) => p.category_en === category);
    const showcase = filtered.map(toShowcaseProduct);
    const { editorial, grid } = splitCatalog(showcase);
    return { products: grid, editorial, source: 'catalog' };
  }
  return fallback;
}
