'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import type { ShowcaseProduct } from '@/lib/productTypes';

type Lang = 'ar' | 'en';

export type { ShowcaseProduct };

type SoulGoldShowcaseProps = {
  lang: Lang;
  editorialProducts: ShowcaseProduct[];
  gridProducts: ShowcaseProduct[];
  isLoading?: boolean;
  onAddToCart: (product: ShowcaseProduct) => void;
};

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
            src={product.image_url}
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
              src={product.image_url}
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
export default function SoulGoldShowcase({
  lang,
  editorialProducts,
  gridProducts,
  isLoading = false,
  onAddToCart,
}: SoulGoldShowcaseProps) {
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

          {/* ─ Desktop asymmetric bento ─ */}
          {editorialProducts.length >= 4 ? (
          <div className="hidden md:grid gap-3"
            style={{ gridTemplateColumns: '44% 1fr 1fr', gridTemplateRows: '400px 280px' }}>

            {/* Fresh Beef — tall hero left */}
            <div className="row-span-2">
              <EditorialTile product={editorialProducts[0]} lang={lang} onAdd={() => onAddToCart(editorialProducts[0])} priority staggerCls="sg-reveal-d1" className="h-full" />
            </div>

            {/* Fresh Fish — top centre */}
            <EditorialTile product={editorialProducts[1]} lang={lang} onAdd={() => onAddToCart(editorialProducts[1])} priority staggerCls="sg-reveal-d2" className="h-full" />

            {/* Sunflower Oil 17L — tall right (row-span-2) */}
            <div className="row-span-2">
              <EditorialTile product={editorialProducts[2]} lang={lang} onAdd={() => onAddToCart(editorialProducts[2])} staggerCls="sg-reveal-d3" className="h-full" />
            </div>

            {/* Premium Eggs — bottom centre */}
            <EditorialTile product={editorialProducts[3]} lang={lang} onAdd={() => onAddToCart(editorialProducts[3])} staggerCls="sg-reveal-d4" className="h-full" />
          </div>
          ) : isLoading ? (
            <div className="hidden md:flex flex-col items-center justify-center gap-6 py-20 animate-pulse">
              <BrandLogo variant="inline" className="opacity-40" />
              <div className="w-full max-w-4xl grid gap-3"
                style={{ gridTemplateColumns: '44% 1fr 1fr', gridTemplateRows: '400px 280px' }}>
                <div className="row-span-2 bg-[#EAE1D7]/60 rounded-sm" />
                <div className="bg-[#EAE1D7]/60 rounded-sm" />
                <div className="row-span-2 bg-[#EAE1D7]/60 rounded-sm" />
                <div className="bg-[#EAE1D7]/60 rounded-sm" />
              </div>
            </div>
          ) : null}

          {/* ─ Mobile horizontal snap scroll ─ */}
          <div ref={mobileEditRef}
            className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
            style={scrollbarHide}>
            {editorialProducts.map((p) => (
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
          {isLoading && gridProducts.length === 0 ? (
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-[#EAE1D7]/60 rounded-sm" />
              ))}
            </div>
          ) : (
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {gridProducts.map((product, idx) => (
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
          )}
          <div ref={mobileGridRef}
            className="sm:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
            style={scrollbarHide}>
            {gridProducts.map((product) => (
              <div key={product.id} className="snap-center shrink-0"
                style={{ width: 'min(72vw, 240px)' }}>
                <ProductCard product={product} lang={lang} onAdd={() => onAddToCart(product)} />
              </div>
            ))}
          </div>

          {/* Footer count */}
          <p className="text-center text-[11px] text-[#7B776E] tracking-widest uppercase mt-10 md:mt-14"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
            {rtl ? `${gridProducts.length} منتج · جودة مضمونة` : `${gridProducts.length} products · Guaranteed quality`}
          </p>
        </div>
      </section>

    </div>
  );
}
