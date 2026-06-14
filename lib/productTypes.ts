/** Canonical product types — single source of truth for API + UI */

export type ProductRecord = {
  id?: number;
  sku: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  sub_en: string;
  sub_ar: string;
  price: number;
  category_en: string;
  category_ar: string;
  image_url: string;
  image_file: string;
  stock_quantity: number;
  is_featured: boolean;
  badge_en?: string;
  badge_ar?: string;
  bg_color?: string;
};

/** Shape consumed by SoulGoldShowcase grids */
export type ShowcaseProduct = {
  id: string;
  image_url: string;
  name_en: string;
  name_ar: string;
  sub_en: string;
  sub_ar: string;
  price: number;
  category_en: string;
  category_ar: string;
};

/** Shape consumed by cart / checkout */
export type CartProduct = {
  id: number | string;
  title_en: string;
  title_ar: string;
  desc_en: string;
  desc_ar: string;
  price: number;
  image: string;
  weight_en: string;
  weight_ar: string;
  categoryKey: string;
  badge_en: string;
  badge_ar: string;
  bgColor: string;
};

export type ProductsApiResponse = {
  products: ShowcaseProduct[];
  editorial: ShowcaseProduct[];
  source: 'supabase' | 'catalog';
};
