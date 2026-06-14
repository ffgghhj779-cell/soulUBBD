import seedData from '@/data/products.seed.json';
import type { ProductRecord, ShowcaseProduct, CartProduct } from '@/lib/productTypes';

type SeedRow = Omit<ProductRecord, 'id' | 'image_url'>;

const LOCAL_PREFIX = '/products/';

const FARM_FRESH_CATEGORIES = new Set([
  'Poultry', 'Meat', 'Seafood', 'Dairy', 'Frozen',
]);

function resolveBadge(p: ProductRecord): { badge_en: string; badge_ar: string } {
  if (p.badge_en?.trim() && p.badge_ar?.trim()) {
    return { badge_en: p.badge_en, badge_ar: p.badge_ar };
  }
  if (FARM_FRESH_CATEGORIES.has(p.category_en)) {
    return { badge_en: 'Farm Fresh', badge_ar: 'طازج من المزرعة' };
  }
  return { badge_en: 'Premium Quality', badge_ar: 'جودة فاخرة' };
}

function encodeFile(file: string) {
  return `${LOCAL_PREFIX}${file.replace(/ /g, '%20')}`;
}

/** Build a full ProductRecord from seed row */
export function seedToRecord(row: SeedRow): ProductRecord {
  return {
    ...row,
    image_url: encodeFile(row.image_file),
    badge_en: row.badge_en ?? '',
    badge_ar: row.badge_ar ?? '',
    bg_color: row.bg_color ?? 'bg-cream',
  };
}

/** Full local catalog — used as fallback when Supabase is empty/unconfigured */
export const PRODUCT_CATALOG: ProductRecord[] = (seedData as SeedRow[]).map(seedToRecord);

export function toShowcaseProduct(p: ProductRecord): ShowcaseProduct {
  const badge = resolveBadge(p);
  return {
    id: p.sku,
    image_url: p.image_url,
    name_en: p.name_en,
    name_ar: p.name_ar,
    sub_en: p.sub_en,
    sub_ar: p.sub_ar,
    price: p.price,
    category_en: p.category_en,
    category_ar: p.category_ar,
    badge_en: badge.badge_en,
    badge_ar: badge.badge_ar,
  };
}

export function toCartProduct(p: ProductRecord | ShowcaseProduct): CartProduct {
  const image =
    'image_url' in p && p.image_url
      ? p.image_url
      : encodeFile((p as ProductRecord).image_file);

  return {
    id: 'sku' in p ? p.sku : p.id,
    title_en: p.name_en,
    title_ar: p.name_ar,
    desc_en: 'description_en' in p ? (p.description_en ?? p.sub_en) : p.sub_en,
    desc_ar: 'description_ar' in p ? (p.description_ar ?? p.sub_ar) : p.sub_ar,
    price: p.price,
    image,
    weight_en: p.sub_en,
    weight_ar: p.sub_ar,
    categoryKey: p.category_en,
    badge_en: 'badge_en' in p ? (p.badge_en ?? '') : '',
    badge_ar: 'badge_ar' in p ? (p.badge_ar ?? '') : '',
    bgColor: 'bg_color' in p ? (p.bg_color ?? 'bg-cream') : 'bg-cream',
  };
}

export function splitCatalog(products: ShowcaseProduct[], featuredSkus?: string[]) {
  const featuredSet = new Set(
    featuredSkus ??
      PRODUCT_CATALOG.filter((p) => p.is_featured).map((p) => p.sku)
  );
  const editorial = products.filter((p) => featuredSet.has(p.id));
  const grid = products.filter((p) => !featuredSet.has(p.id));
  return { editorial, grid };
}

export function catalogApiResponse(): { products: ShowcaseProduct[]; editorial: ShowcaseProduct[]; source: 'catalog' } {
  const products = PRODUCT_CATALOG.map(toShowcaseProduct);
  const { editorial, grid } = splitCatalog(products);
  return { products: grid, editorial, source: 'catalog' };
}
