-- Soul Gold — Client product catalog update (6 new SKUs)
-- Run in Supabase SQL Editor after manual-dashboard-setup.sql
-- Safe to re-run (ON CONFLICT upsert)

INSERT INTO public.products (
  sku, name_en, name_ar, description_en, description_ar,
  sub_en, sub_ar, price, category_en, category_ar,
  image_url, image_file, stock_quantity, is_featured
) VALUES
  ('mixed-veg-frozen', 'Frozen Mixed Vegetables', 'خضار مشكلة مجمدة', 'Premium green beans, peas and carrots. 100% natural, quickly frozen.', 'فاصوليا خضراء وبازلاء وجزر فاخر. طبيعي ١٠٠٪ ومجمد بسرعة.', 'Beans · Peas & Carrots · Quick Frozen', 'فاصوليا · بازلاء وجزر · مجمد سريع', 16, 'Frozen', 'مجمدات', 'https://otuewefcsusojkjfgadv.supabase.co/storage/v1/object/public/product-images/catalog/WhatsApp%20Image%202026-06-14%20at%2010.19.34%20AM.jpeg', 'WhatsApp Image 2026-06-14 at 10.19.34 AM.jpeg', 100, false),
  ('caramel-syrup', 'Natural Caramel Syrup', 'شراب كراميل طبيعي', 'Rich natural caramel syrup for desserts, coffee, and pancakes.', 'شراب كراميل طبيعي غني للحلويات والقهوة والفطائر.', 'Natural · Desserts & Drinks', 'طبيعي · حلويات ومشروبات', 24, 'Sauces', 'صلصات', 'https://otuewefcsusojkjfgadv.supabase.co/storage/v1/object/public/product-images/catalog/WhatsApp%20Image%202026-06-14%20at%2010.19.36%20AM.jpeg', 'WhatsApp Image 2026-06-14 at 10.19.36 AM.jpeg', 60, false),
  ('luxury-egyptian-rice', 'Luxury Egyptian Rice', 'أرز مصري فاخر', 'Premium long-grain Egyptian rice in a 5kg family pack.', 'أرز مصري طويل الحبة فاخر في عبوة عائلية ٥ كجم.', '5kg · Best Quality', '٥ كجم · أفضل جودة', 58, 'Grains', 'حبوب', 'https://otuewefcsusojkjfgadv.supabase.co/storage/v1/object/public/product-images/catalog/WhatsApp%20Image%202026-06-14%20at%2010.19.36%20AM%20(2).jpeg', 'WhatsApp Image 2026-06-14 at 10.19.36 AM (2).jpeg', 75, false),
  ('premium-tomato-sauce-4kg', 'Premium Tomato Sauce', 'صلصة طماطم فاخرة', '100% natural tomato sauce from selected farms. 4050g tin.', 'صلصة طماطم طبيعية ١٠٠٪ من أفضل المزارع. عبوة ٤٠٥٠ جرام.', '4050g · 100% Natural', '٤٠٥٠ج · طبيعي ١٠٠٪', 42, 'Sauces', 'صلصات', 'https://otuewefcsusojkjfgadv.supabase.co/storage/v1/object/public/product-images/catalog/WhatsApp%20Image%202026-06-14%20at%2010.19.38%20AM%20(1).jpeg', 'WhatsApp Image 2026-06-14 at 10.19.38 AM (1).jpeg', 55, true),
  ('premium-white-tuna', 'Premium White Tuna', 'تونة بيضاء فاخرة', 'Solid white tuna — excellent protein source. 80g and 160g sizes.', 'تونة بيضاء قطع صلبة — مصدر ممتاز للبروتين. ٨٠ و١٦٠ جرام.', '80g · 160g · Guaranteed Quality', '٨٠ج · ١٦٠ج · جودة مضمونة', 18, 'Canned', 'معلبات', 'https://otuewefcsusojkjfgadv.supabase.co/storage/v1/object/public/product-images/catalog/WhatsApp%20Image%202026-06-14%20at%2010.19.38%20AM.jpeg', 'WhatsApp Image 2026-06-14 at 10.19.38 AM.jpeg', 90, true),
  ('fresh-beef-vacuum', 'Fresh Beef — Vacuum Pack', 'لحم بقري طازج معبأ', '100% natural Saudi beef, vacuum-sealed and delivered fresh daily.', 'لحم بقري سعودي طبيعي ١٠٠٪، معبأ بالتفريغ ويوصل طازجاً يومياً.', '100% Natural · Fresh Daily', '١٠٠٪ طبيعي · طازج يومياً', 52, 'Meat', 'لحوم', 'https://otuewefcsusojkjfgadv.supabase.co/storage/v1/object/public/product-images/catalog/WhatsApp%20Image%202026-06-14%20at%2011.14.30%20AM%20(3).jpeg', 'WhatsApp Image 2026-06-14 at 11.14.30 AM (3).jpeg', 40, false)
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
