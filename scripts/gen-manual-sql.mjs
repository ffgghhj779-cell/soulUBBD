import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const seed = JSON.parse(readFileSync(join(ROOT, 'data/products.seed.json'), 'utf8'));
const BASE =
  'https://otuewefcsusojkjfgadv.supabase.co/storage/v1/object/public/product-images/catalog/';

const esc = (s) => String(s).replace(/'/g, "''");

const values = seed
  .map((r) => {
    const url = BASE + encodeURIComponent(r.image_file);
    return `  ('${esc(r.sku)}', '${esc(r.name_en)}', '${esc(r.name_ar)}', '${esc(r.description_en)}', '${esc(r.description_ar)}', '${esc(r.sub_en)}', '${esc(r.sub_ar)}', ${r.price}, '${esc(r.category_en)}', '${esc(r.category_ar)}', '${url}', '${esc(r.image_file)}', ${r.stock_quantity}, ${r.is_featured})`;
  })
  .join(',\n');

const sql = readFileSync(join(ROOT, 'supabase/setup-all.sql'), 'utf8');

const full = `${sql}

-- ── Seed all 20 products ───────────────────────────────────────────
INSERT INTO public.products (
  sku, name_en, name_ar, description_en, description_ar,
  sub_en, sub_ar, price, category_en, category_ar,
  image_url, image_file, stock_quantity, is_featured
) VALUES
${values}
ON CONFLICT (sku) DO UPDATE SET
  name_en          = EXCLUDED.name_en,
  name_ar          = EXCLUDED.name_ar,
  description_en   = EXCLUDED.description_en,
  description_ar   = EXCLUDED.description_ar,
  sub_en           = EXCLUDED.sub_en,
  sub_ar           = EXCLUDED.sub_ar,
  price            = EXCLUDED.price,
  category_en      = EXCLUDED.category_en,
  category_ar      = EXCLUDED.category_ar,
  image_url        = EXCLUDED.image_url,
  image_file       = EXCLUDED.image_file,
  stock_quantity   = EXCLUDED.stock_quantity,
  is_featured      = EXCLUDED.is_featured,
  updated_at       = NOW();
`;

writeFileSync(join(ROOT, 'supabase/manual-dashboard-setup.sql'), full, 'utf8');
console.log('Written supabase/manual-dashboard-setup.sql');
