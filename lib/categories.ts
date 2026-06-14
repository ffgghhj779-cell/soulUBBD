import seedData from '@/data/products.seed.json';
import categoryTiles from '@/data/categories.seed.json';
import type { ProductRecord } from '@/lib/productTypes';

type SeedRow = Omit<ProductRecord, 'id' | 'image_url'>;

export type CategoryDef = {
  en: string;
  ar: string;
};

export type CategoryTile = {
  slug: string;
  name_en: string;
  name_ar: string;
  sub_en: string;
  sub_ar: string;
  image_file: string;
};

/** Unique categories derived from the product catalog (v2 schema) */
export function getCatalogCategories(): CategoryDef[] {
  const map = new Map<string, string>();
  for (const row of seedData as SeedRow[]) {
    if (!map.has(row.category_en)) {
      map.set(row.category_en, row.category_ar);
    }
  }
  return Array.from(map.entries())
    .map(([en, ar]) => ({ en, ar }))
    .sort((a, b) => a.en.localeCompare(b.en));
}

export const CATEGORY_TILES: CategoryTile[] = categoryTiles;

export function categoryImageUrl(file: string) {
  return `/products/${file.replace(/ /g, '%20')}`;
}
