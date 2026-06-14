'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus } from 'lucide-react';

type Lang = 'ar' | 'en';

export interface ShowcaseProduct {
  id: string;
  file: string;
  name_en: string;
  name_ar: string;
  sub_en: string;
  sub_ar: string;
  price: number;
  category_en: string;
  category_ar: string;
}

type SoulGoldShowcaseProps = {
  lang: Lang;
  onAddToCart: (product: ShowcaseProduct) => void;
};

const img = (filename: string) =>
  `/products/${filename.replace(/ /g, '%20')}`;

/* ───────── Editorial heroes ───────── */
const EDITORIAL: ShowcaseProduct[] = [
  { id:'tuna-hero',    file:'WhatsApp Image 2026-06-14 at 10.19.38 AM.jpeg',       name_en:'Premium White Tuna',        name_ar:'تونة بيضاء فاخرة',      sub_en:'80g · 160g',          sub_ar:'٨٠ج · ١٦٠ج',         price:18, category_en:'Seafood',  category_ar:'مأكولات بحرية' },
  { id:'rice-hero',    file:'WhatsApp Image 2026-06-14 at 10.19.36 AM (2).jpeg',   name_en:'Luxury Egyptian Rice',      name_ar:'أرز مصري فاخر',          sub_en:'5 KG · Best Quality', sub_ar:'٥ كيلو · أعلى جودة', price:65, category_en:'Grains',   category_ar:'حبوب' },
  { id:'caramel-hero', file:'WhatsApp Image 2026-06-14 at 10.19.36 AM.jpeg',       name_en:'Natural Caramel Sauce',     name_ar:'شراب كراميل طبيعي',      sub_en:'500ml · Artisanal',   sub_ar:'٥٠٠مل · حرفي',       price:28, category_en:'Sauces',   category_ar:'صلصات' },
  { id:'tomato-hero',  file:'WhatsApp Image 2026-06-14 at 10.19.38 AM (1).jpeg',   name_en:'Premium Tomato Sauce',      name_ar:'صلصة طماطم فاخرة',       sub_en:'4050g · Cooking',     sub_ar:'٤٠٥٠ج · للطبخ',      price:45, category_en:'Sauces',   category_ar:'صلصات' },
  { id:'veg-hero',     file:'WhatsApp Image 2026-06-14 at 10.19.34 AM.jpeg',       name_en:'Frozen Mixed Vegetables',   name_ar:'خضار مجمدة مشكلة',       sub_en:'400g · Natural',      sub_ar:'٤٠٠ج · طبيعي',       price:22, category_en:'Frozen',   category_ar:'مجمدات' },
];

/* ───────── Full product grid ───────── */
const PRODUCTS: ShowcaseProduct[] = [
  { id:'peas-pouch',       file:'WhatsApp Image 2026-06-14 at 10.19.34 AM (1).jpeg', name_en:'Frozen Green Peas',          name_ar:'بازلاء خضراء مجمدة',  sub_en:'Pouch · Perfectly Frozen',   sub_ar:'كيس · مجمدة مثالياً',      price:15, category_en:'Frozen',  category_ar:'مجمدات' },
  { id:'strawberry',       file:'WhatsApp Image 2026-06-14 at 10.19.34 AM (2).jpeg', name_en:'Frozen Strawberries',        name_ar:'فراولة مجمدة',        sub_en:'400g · Deep Frozen',          sub_ar:'٤٠٠ج · مجمدة عميقاً',      price:18, category_en:'Frozen',  category_ar:'مجمدات' },
  { id:'garlic-mayo',      file:'WhatsApp Image 2026-06-14 at 10.19.34 AM (3).jpeg', name_en:'Garlic Mayonnaise',          name_ar:'مايونيز بالثوم',      sub_en:'Rich · Creamy · Artisanal',   sub_ar:'كريمي · حرفي الصنع',        price:22, category_en:'Sauces',  category_ar:'صلصات' },
  { id:'chicken-fresh',    file:'WhatsApp Image 2026-06-14 at 10.19.35 AM.jpeg',     name_en:'Fresh Whole Chicken',        name_ar:'دجاجة كاملة طازجة',   sub_en:'800g ± 50g · Fresh',          sub_ar:'٨٠٠ج ± ٥٠ج · طازج',        price:32, category_en:'Poultry', category_ar:'دواجن' },
  { id:'fries-dark',       file:'WhatsApp Image 2026-06-14 at 10.19.36 AM (1).jpeg', name_en:'Golden French Fries',        name_ar:'بطاطس مقلية ذهبية',   sub_en:'Premium Cut · Frozen',        sub_ar:'قطع ممتازة · مجمدة',         price:20, category_en:'Frozen',  category_ar:'مجمدات' },
  { id:'peas-bag',         file:'WhatsApp Image 2026-06-14 at 10.19.36 AM (3).jpeg', name_en:'Green Peas Premium Bag',     name_ar:'بازلاء خضراء فاخرة',  sub_en:'400g · Premium',              sub_ar:'٤٠٠ج · فاخر',               price:14, category_en:'Frozen',  category_ar:'مجمدات' },
  { id:'cream',            file:'WhatsApp Image 2026-06-14 at 10.19.37 AM.jpeg',     name_en:'Natural Fresh Cream',        name_ar:'قشطة طبيعية',         sub_en:'900g · 100% Natural',         sub_ar:'٩٠٠ج · طبيعي ١٠٠٪',        price:28, category_en:'Dairy',   category_ar:'ألبان' },
  { id:'ketchup-sachets',  file:'WhatsApp Image 2026-06-14 at 10.19.37 AM (1).jpeg', name_en:'Tomato Ketchup Sachets',     name_ar:'كاتشب طماطم أكياس',   sub_en:'Box of 100 Sachets',          sub_ar:'كرتون ١٠٠ كيس',             price:25, category_en:'Sauces',  category_ar:'صلصات' },
  { id:'peas-can',         file:'WhatsApp Image 2026-06-14 at 10.19.38 AM (2).jpeg', name_en:'Green Peas Premium Can',     name_ar:'بازلاء معلبة فاخرة',  sub_en:'400g · Premium Can',          sub_ar:'٤٠٠ج · علبة فاخرة',         price:14, category_en:'Canned',  category_ar:'معلبات' },
  { id:'sunflower-oil',    file:'WhatsApp Image 2026-06-14 at 10.19.39 AM (1).jpeg', name_en:'Pure Sunflower Oil',         name_ar:'زيت دوار الشمس الصافي', sub_en:'100% Pure · Natural',       sub_ar:'صافي ١٠٠٪ · طبيعي',         price:35, category_en:'Oils',    category_ar:'زيوت' },
  { id:'fries-alzahabia',  file:'WhatsApp Image 2026-06-14 at 10.19.39 AM (2).jpeg', name_en:'Alzahabia French Fries',     name_ar:'بطاطس الذهبية',       sub_en:'Premium Quality · Crispy',    sub_ar:'جودة فائقة · مقرمشة',        price:20, category_en:'Frozen',  category_ar:'مجمدات' },
  { id:'chicken-fresh-2',  file:'WhatsApp Image 2026-06-14 at 10.19.39 AM (3).jpeg', name_en:'Fresh Chicken — Premium',    name_ar:'دجاج طازج فريش',      sub_en:'800g ± 50g · Saudi Made',     sub_ar:'٨٠٠ج ± ٥٠ج · صناعة سعودية', price:32, category_en:'Poultry', category_ar:'دواجن' },
  { id:'baladi-chicken',   file:'WhatsApp Image 2026-06-14 at 10.19.40 AM.jpeg',     name_en:'Baladi Frozen Chicken',      name_ar:'دجاج بلدي مجمد',      sub_en:'1100g+ · Frozen · No.1',      sub_ar:'١١٠٠ج+ · مجمد · الرقم ١',    price:42, category_en:'Poultry', category_ar:'دواجن' },
];

/* Stagger classes by column position (0-3) */
const STAGGER = ['sg-reveal-d1', 'sg-reveal-d2', 'sg-reveal-d3', 'sg-reveal-d4'] as const;

/* ── Product card (grid) ── */
function ProductCard({ product, lang, onAdd, priority = false, staggerIdx = 0 }: {
  product: ShowcaseProduct; lang: Lang; onAdd: () => void; priority?: boolean; staggerIdx?: number;
}) {
  const rtl = lang === 'ar';
  return (
    <article
      className="group relative flex flex-col bg-[#FEF7ED] overflow-hidden touch-premium"
      style={{ borderRadius: 2 }}
    >
      {/* Image — reveal animates image only; card text always visible */}
      <div className={`relative w-full aspect-[4/5] overflow-hidden bg-[#FEF7ED] sg-reveal-clip ${STAGGER[staggerIdx]}`}>
        <div className="absolute inset-0 p-6 md:p-8">
          <Image
            src={img(product.file)}
            alt={rtl ? product.name_ar : product.name_en}
            fill unoptimized priority={priority}
            sizes="(max-width:640px) 72vw, (max-width:1024px) 33vw, 25vw"
            className="object-contain object-center sg-luxury-img"
          />
        </div>
        <div className="absolute inset-0 bg-[#1A1612]/0 group-hover:bg-[#1A1612]/5 transition-colors duration-500 pointer-events-none" />

        {/* Hover cart button — desktop only */}
        <button onClick={onAdd}
          aria-label={rtl ? 'أضف للسلة' : 'Add to cart'}
          className="absolute bottom-3 end-3 w-10 h-10 rounded bg-[#1A1612] text-[#FEF7ED] flex items-center justify-center
                     opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300 ease-out hover:bg-[#C9A03D]
                     shadow-lg touch-manipulation active:scale-90 z-10 md:flex hidden">
          <Plus size={15} strokeWidth={2} />
        </button>
        {/* Mobile always-visible cart button */}
        <button onClick={onAdd}
          aria-label={rtl ? 'أضف للسلة' : 'Add to cart'}
          className="absolute bottom-3 end-3 w-10 h-10 rounded bg-[#1A1612] text-[#FEF7ED] flex items-center justify-center
                     md:hidden shadow-lg touch-manipulation active:scale-90 z-10">
          <Plus size={15} strokeWidth={2} />
        </button>
      </div>

      {/* Text */}
      <div className="p-3 md:p-4 flex flex-col gap-1 flex-1">
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold sg-gold-sweep-text"
          style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
          {rtl ? product.category_ar : product.category_en}
        </span>
        <h3 className="text-sm md:text-base leading-snug text-[#1F1B15] font-medium mt-0.5"
          style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)' }}>
          {rtl ? product.name_ar : product.name_en}
        </h3>
        <p className="text-[10px] text-[#7B776E] leading-relaxed"
          style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
          {rtl ? product.sub_ar : product.sub_en}
        </p>

        <div className="mt-auto pt-3">
          <div style={{ height: 1, background: '#CCC6BC', opacity: 0.6 }} />
          <div className="flex items-center justify-between pt-2.5">
            <span className="text-sm md:text-base font-semibold text-[#1F1B15]"
              style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
              {product.price} <span className="text-[10px] font-normal text-[#7B776E]">{rtl ? 'ريال' : 'SAR'}</span>
            </span>
            <button onClick={onAdd}
              aria-label={rtl ? 'أضف للسلة' : 'Add to cart'}
              className="hidden md:flex w-8 h-8 rounded items-center justify-center text-[#7B776E] hover:text-[#1F1B15] hover:bg-[#1F1B15]/6 transition-colors duration-200 touch-manipulation">
              <ShoppingCart size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Editorial tile (bento) ── */
function EditorialTile({ product, lang, onAdd, priority = false, className = '', staggerCls = '' }: {
  product: ShowcaseProduct; lang: Lang; onAdd: () => void; priority?: boolean; className?: string; staggerCls?: string;
}) {
  const rtl = lang === 'ar';
  return (
    <article
      className={`group relative overflow-hidden cursor-pointer select-none touch-premium h-full min-h-[240px] ${className}`}
      style={{ borderRadius: 2 }}
    >
      {/* Image stage — reveal animates product image only */}
      <div className={`absolute inset-0 sg-reveal-clip ${staggerCls}`}>
        <div className="absolute inset-0 bg-[#FEF7ED] p-5 md:p-8">
          <div className="relative w-full h-full">
            <Image
              src={img(product.file)}
              alt={rtl ? product.name_ar : product.name_en}
              fill unoptimized priority={priority}
              sizes="(max-width:640px) 100vw, 50vw"
              className="object-contain object-center sg-luxury-img"
            />
          </div>
        </div>
      </div>
      {/* Gradient — legibility behind text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute bottom-0 start-0 w-full p-5 md:p-7">
        <span className="inline-block text-[9px] uppercase tracking-[0.3em] mb-2 font-semibold sg-gold-sweep-text"
          style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
          {rtl ? product.category_ar : product.category_en}
        </span>
        {/* Gold rule */}
        <div className="h-px bg-[#C9A03D] mb-3 transition-all duration-500 ease-out group-hover:w-14"
          style={{ width: 32 }} />
        <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-medium leading-tight"
          style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)' }}>
          {rtl ? product.name_ar : product.name_en}
        </h3>
        <p className="text-white/60 text-xs md:text-sm mt-1"
          style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
          {rtl ? product.sub_ar : product.sub_en}
        </p>

        {/* Price + CTA — hover reveal */}
        <div className="flex items-center justify-between mt-5
                        opacity-0 translate-y-3
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-500 ease-out">
          <span className="text-white text-base font-semibold"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
            {product.price} <span className="text-white/55 text-xs font-normal">{rtl ? 'ريال' : 'SAR'}</span>
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            aria-label={rtl ? 'أضف للسلة' : 'Add to cart'}
            className="flex items-center gap-2 px-4 py-2 bg-[#FEF7ED] text-[#1A1612] rounded
                       text-xs font-semibold
                       hover:bg-[#C9A03D] hover:text-[#FEF7ED]
                       transition-colors duration-200 touch-manipulation active:scale-95"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
            <ShoppingCart size={12} strokeWidth={2} />
            {rtl ? 'أضف للسلة' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Mobile price badge */}
      <div className="md:hidden absolute top-3 end-3 bg-[#1A1612]/75 backdrop-blur-sm px-2.5 py-1.5 rounded">
        <span className="text-[#FEF7ED] text-xs font-semibold" style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
          {product.price} {rtl ? 'ر' : 'SAR'}
        </span>
      </div>
    </article>
  );
}

/* ── Main export ── */
export default function SoulGoldShowcase({ lang, onAddToCart }: SoulGoldShowcaseProps) {
  const rtl = lang === 'ar';
  const mobileEditRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);
  /* Root ref for scoped IntersectionObserver */
  const showcaseRef  = useRef<HTMLDivElement>(null);

  /* Cinematic scroll reveal — fires clip-path transitions as items enter viewport */
  useEffect(() => {
    const root = showcaseRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.sg-reveal-clip, .sg-heading-reveal');

    /* No-JS / IO-unavailable fallback — show everything immediately */
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const reveal = (el: Element) => {
      el.classList.add('in-view');
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      },
      { threshold: 0, rootMargin: '80px 0px 80px 0px' }
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible =
        rect.top < window.innerHeight + 80 && rect.bottom > -80;
      if (alreadyVisible) {
        el.classList.add('in-view');
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  const scrollbarHide: React.CSSProperties = {
    scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch' as never,
    overscrollBehaviorX: 'contain',
  };

  return (
    /* Wrapper div scopes the IntersectionObserver — no visual effect */
    <div ref={showcaseRef}>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — EDITORIAL BENTO
      ═══════════════════════════════════════════════ */}
      <section id="editorial" className="py-16 md:py-24 px-4 md:px-8 bg-[#FEF7ED]">
        <div className="max-w-[1280px] mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 md:mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2 font-semibold sg-gold-sweep-text"
                style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
                {rtl ? 'المجموعة الحصرية' : 'The Signature Collection'}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-medium text-[#1F1B15] leading-tight sg-heading-reveal"
                style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)', letterSpacing: '-0.01em' }}>
                {rtl ? 'منتجاتنا المميزة' : 'Our Finest Offerings'}
              </h2>
            </div>
            <p className="text-sm text-[#4A463F] max-w-[280px] leading-relaxed md:text-end"
              style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
              {rtl
                ? 'جودة لا تُضاهى، اختيرت بعناية لمائدتكم الفاخرة'
                : 'Uncompromising quality, curated for your finest table'}
            </p>
          </div>

          {/* ─ Desktop asymmetric bento ─
              Cols:  44%  |  1fr  |  1fr
              Rows:  400px | 280px
          */}
          <div className="hidden md:grid gap-3"
            style={{ gridTemplateColumns: '44% 1fr 1fr', gridTemplateRows: '400px 280px' }}>

            {/* Tuna — tall hero left */}
            <div className="row-span-2">
              <EditorialTile product={EDITORIAL[0]} lang={lang} onAdd={() => onAddToCart(EDITORIAL[0])} priority staggerCls="sg-reveal-d1" className="h-full" />
            </div>

            {/* Rice — top centre */}
            <EditorialTile product={EDITORIAL[1]} lang={lang} onAdd={() => onAddToCart(EDITORIAL[1])} priority staggerCls="sg-reveal-d2" className="h-full" />

            {/* Caramel — tall right (row-span-2) */}
            <div className="row-span-2">
              <EditorialTile product={EDITORIAL[2]} lang={lang} onAdd={() => onAddToCart(EDITORIAL[2])} staggerCls="sg-reveal-d3" className="h-full" />
            </div>

            {/* Mixed Veg — bottom centre */}
            <EditorialTile product={EDITORIAL[4]} lang={lang} onAdd={() => onAddToCart(EDITORIAL[4])} staggerCls="sg-reveal-d4" className="h-full" />
          </div>

          {/* ─ Mobile horizontal snap scroll ─ */}
          <div ref={mobileEditRef}
            className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
            style={scrollbarHide}>
            {EDITORIAL.map((p) => (
              <div key={p.id} className="snap-center shrink-0 relative aspect-[4/5] max-h-[420px]"
                style={{ width: 'min(80vw, 300px)', borderRadius: 2 }}>
                <EditorialTile product={p} lang={lang} onAdd={() => onAddToCart(p)} className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — FULL PRODUCT GRID
      ═══════════════════════════════════════════════ */}
      <section id="all-products" className="py-16 md:py-24 px-4 md:px-8 bg-[#F0E7DD]">
        <div className="max-w-[1280px] mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 md:mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2 font-semibold sg-gold-sweep-text"
                style={{ fontFamily: 'var(--font-hanken,sans-serif)', '--sweep-delay': '1.5s' } as React.CSSProperties}>
                {rtl ? 'تسوق الآن' : 'Shop the Collection'}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-medium text-[#1F1B15] leading-tight sg-heading-reveal"
                style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)', letterSpacing: '-0.01em' }}>
                {rtl ? 'جميع المنتجات' : 'The Complete Pantry'}
              </h2>
            </div>
            <p className="text-sm text-[#4A463F] max-w-[280px] leading-relaxed md:text-end"
              style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
              {rtl
                ? 'من البحر إلى مائدتكم — كل ما يحتاجه مطبخكم الفاخر'
                : 'From sea to table — everything your kitchen deserves'}
            </p>
          </div>

          {/* ─ Desktop grid ─ */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {PRODUCTS.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onAdd={() => onAddToCart(product)}
                priority={idx < 4}
                staggerIdx={idx % 4}
              />
            ))}
          </div>

          {/* ─ Mobile horizontal snap scroll ─ */}
          <div ref={mobileGridRef}
            className="sm:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
            style={scrollbarHide}>
            {PRODUCTS.map((product) => (
              <div key={product.id} className="snap-center shrink-0"
                style={{ width: 'min(72vw, 240px)' }}>
                <ProductCard product={product} lang={lang} onAdd={() => onAddToCart(product)} />
              </div>
            ))}
          </div>

          {/* Footer count */}
          <p className="text-center text-[11px] text-[#7B776E] tracking-widest uppercase mt-10 md:mt-14"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
            {rtl ? `${PRODUCTS.length} منتج · جودة مضمونة` : `${PRODUCTS.length} products · Guaranteed quality`}
          </p>
        </div>
      </section>

    </div>
  );
}
