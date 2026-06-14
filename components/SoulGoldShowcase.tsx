'use client';

import React, { memo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, Eye, X } from 'lucide-react';
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

const SCROLLBAR_HIDE: React.CSSProperties = { scrollbarWidth: 'none' };

/* ── Product card (grid) — magazine editorial ── */
const ProductCard = memo(function ProductCard({
  product,
  lang,
  onAddToCart,
  staggerIdx = 0,
}: {
  product: ShowcaseProduct;
  lang: Lang;
  onAddToCart: (product: ShowcaseProduct) => void;
  staggerIdx?: number;
}) {
  const rtl = lang === 'ar';
  const [quickView, setQuickView] = React.useState(false);

  const handleAdd = () => onAddToCart(product);

  return (
    <>
      <article className="sg-product-card group relative flex flex-col bg-[#FEF7ED] overflow-hidden touch-premium sg-animate-layer">
        {/* Image stage — fixed aspect prevents CLS */}
        <div className={`relative w-full aspect-[4/5] sg-product-stage sg-reveal-clip ${STAGGER[staggerIdx]}`}>
          <div className="absolute inset-3 sm:inset-4 md:inset-5">
            <Image
              src={product.image_url}
              alt={rtl ? product.name_ar : product.name_en}
              fill
              loading="lazy"
              sizes="(max-width:640px) 72vw, (max-width:1024px) 33vw, 25vw"
              className="sg-product-stage__img"
            />
          </div>

          <span
            className="absolute top-4 start-4 z-10 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] font-semibold
                       bg-[#1A1612]/88 text-[#C9A03D] border border-[#C9A03D]/30 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
          >
            {rtl ? product.badge_ar : product.badge_en}
          </span>

          <div className="absolute inset-0 z-10 hidden md:flex items-center justify-center
                          bg-[#1A1612]/0 group-hover:bg-[#1A1612]/35
                          opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none group-hover:pointer-events-auto">
            <button
              type="button"
              onClick={() => setQuickView(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FEF7ED] text-[#1A1612] text-[11px] font-semibold uppercase tracking-[0.18em]
                         border border-[#C9A03D]/40 hover:bg-[#C9A03D] hover:text-[#1A1612] transition-colors duration-200
                         translate-y-3 group-hover:translate-y-0 pointer-events-auto touch-manipulation sg-touch-fast"
              style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
            >
              <Eye size={14} strokeWidth={1.75} />
              {rtl ? 'معاينة سريعة' : 'Quick View'}
            </button>
          </div>
        </div>

        <div className="px-5 py-5 md:px-6 md:py-6 flex flex-col gap-2 flex-1 min-h-[168px]">
          <span
            className="text-[9px] uppercase tracking-[0.28em] font-semibold text-[#C9A03D]/90"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
          >
            {rtl ? product.category_ar : product.category_en}
          </span>
          <h3
            className="text-base md:text-lg leading-snug text-[#1F1B15] font-medium tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)' }}
          >
            {rtl ? product.name_ar : product.name_en}
          </h3>
          <p
            className="text-[11px] text-[#7B776E] leading-relaxed line-clamp-2"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
          >
            {rtl ? product.sub_ar : product.sub_en}
          </p>

          <div className="mt-auto pt-4 border-t border-[#EAE1D7]/80">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span
                  className="text-[9px] uppercase tracking-[0.2em] text-[#7B776E] mb-0.5"
                  style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
                >
                  {rtl ? 'السعر' : 'Price'}
                </span>
                <span
                  className="text-lg md:text-xl font-semibold text-[#1F1B15] tabular-nums tracking-tight"
                  style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
                >
                  {product.price}
                  <span className="text-[11px] font-medium text-[#7B776E] ms-1">{rtl ? 'ريال' : 'SAR'}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-[#1A1612] text-[#FEF7ED]
                           text-[10px] font-semibold uppercase tracking-[0.14em]
                           hover:bg-[#C9A03D] hover:text-[#1A1612] transition-colors duration-200
                           touch-manipulation sg-touch-fast shrink-0"
                style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
              >
                <ShoppingCart size={13} strokeWidth={2} />
                <span className="hidden sm:inline">{rtl ? 'أضف للسلة' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {quickView && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#1A1612]/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setQuickView(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#FEF7ED] border border-[#EAE1D7] shadow-[0_32px_80px_rgba(26,22,18,0.28)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickView(false)}
              aria-label={rtl ? 'إغلاق' : 'Close'}
              className="absolute top-3 end-3 z-10 w-9 h-9 flex items-center justify-center bg-[#1A1612] text-[#FEF7ED] hover:bg-[#C9A03D] hover:text-[#1A1612] transition-colors sg-touch-fast"
            >
              <X size={16} />
            </button>
            <div className="relative aspect-[4/5] bg-[#FEF7ED] p-8">
              <Image
                src={product.image_url}
                alt={rtl ? product.name_ar : product.name_en}
                fill
                loading="lazy"
                sizes="(max-width:768px) 90vw, 400px"
                className="object-contain object-center"
              />
            </div>
            <div className="p-6 border-t border-[#EAE1D7]/80">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A03D] font-semibold">
                {rtl ? product.badge_ar : product.badge_en}
              </span>
              <h3
                className="mt-2 text-xl text-[#1F1B15] font-medium"
                style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)' }}
              >
                {rtl ? product.name_ar : product.name_en}
              </h3>
              <p className="mt-1 text-sm text-[#7B776E]">{rtl ? product.sub_ar : product.sub_en}</p>
              <div className="flex items-center justify-between mt-5">
                <span className="text-xl font-semibold tabular-nums" style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
                  {product.price} {rtl ? 'ريال' : 'SAR'}
                </span>
                <button
                  type="button"
                  onClick={() => { handleAdd(); setQuickView(false); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1A1612] text-[#FEF7ED] text-xs font-semibold uppercase tracking-wider hover:bg-[#C9A03D] hover:text-[#1A1612] transition-colors sg-touch-fast"
                >
                  <ShoppingCart size={14} />
                  {rtl ? 'أضف للسلة' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

/* ── Editorial tile (bento) ── */
const EditorialTile = memo(function EditorialTile({
  product,
  lang,
  onAddToCart,
  className = '',
  staggerCls = '',
}: {
  product: ShowcaseProduct;
  lang: Lang;
  onAddToCart: (product: ShowcaseProduct) => void;
  className?: string;
  staggerCls?: string;
}) {
  const rtl = lang === 'ar';

  return (
    <article
      className={`group relative overflow-hidden cursor-pointer select-none touch-premium h-full min-h-[240px] sg-animate-layer sg-editorial-tile ${className}`}
      style={{ borderRadius: 2 }}
    >
      <div className={`absolute inset-0 overflow-hidden sg-reveal-clip ${staggerCls}`}>
        <Image
          src={product.image_url}
          alt={rtl ? product.name_ar : product.name_en}
          fill
          loading="lazy"
          sizes="(max-width:640px) 100vw, 50vw"
          className="sg-editorial-tile__img"
        />
      </div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />

      <div className="absolute bottom-0 start-0 w-full p-5 md:p-7 z-[3]">
        <span
          className="inline-block text-[9px] uppercase tracking-[0.3em] mb-2 font-semibold sg-gold-sweep-text"
          style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
        >
          {rtl ? product.category_ar : product.category_en}
        </span>
        <div className="h-px bg-[#C9A03D] mb-3 transition-all duration-500 ease-out group-hover:w-14" style={{ width: 32 }} />
        <h3
          className="text-white text-xl md:text-2xl lg:text-3xl font-medium leading-tight"
          style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)' }}
        >
          {rtl ? product.name_ar : product.name_en}
        </h3>
        <p className="text-white/60 text-xs md:text-sm mt-1" style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
          {rtl ? product.sub_ar : product.sub_en}
        </p>

        <div
          className="flex items-center justify-between mt-5
                      opacity-0 translate-y-3
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-500 ease-out"
        >
          <span className="text-white text-base font-semibold" style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
            {product.price} <span className="text-white/55 text-xs font-normal">{rtl ? 'ريال' : 'SAR'}</span>
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            aria-label={rtl ? 'أضف للسلة' : 'Add to cart'}
            className="flex items-center gap-2 px-4 py-2 bg-[#FEF7ED] text-[#1A1612] rounded
                       text-xs font-semibold hover:bg-[#C9A03D] hover:text-[#FEF7ED]
                       transition-colors duration-200 touch-manipulation sg-touch-fast"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
          >
            <ShoppingCart size={12} strokeWidth={2} />
            {rtl ? 'أضف للسلة' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="md:hidden absolute top-3 end-3 bg-[#1A1612]/75 backdrop-blur-sm px-2.5 py-1.5 rounded">
        <span className="text-[#FEF7ED] text-xs font-semibold" style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}>
          {product.price} {rtl ? 'ر' : 'SAR'}
        </span>
      </div>
    </article>
  );
});

function ProductSkeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`aspect-[4/5] bg-[#EAE1D7]/60 rounded-sm shrink-0 ${className}`} style={style} aria-hidden="true" />;
}

/* ── Main export ── */
function SoulGoldShowcase({
  lang,
  editorialProducts,
  gridProducts,
  isLoading = false,
  onAddToCart,
}: SoulGoldShowcaseProps) {
  const rtl = lang === 'ar';
  const showcaseRef = useRef<HTMLDivElement>(null);

  /* Re-run when async products mount new reveal targets */
  useEffect(() => {
    const root = showcaseRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.sg-reveal-clip, .sg-heading-reveal');

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '80px 0px 80px 0px' }
    );

    const observe = () => {
      targets.forEach((el) => {
        if (el.classList.contains('in-view')) return;
        const rect = el.getBoundingClientRect();
        const alreadyVisible = rect.top < window.innerHeight + 80 && rect.bottom > -80;
        if (alreadyVisible) {
          el.classList.add('in-view');
        } else {
          io.observe(el);
        }
      });
    };

    const raf = requestAnimationFrame(observe);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [editorialProducts.length, gridProducts.length]);

  return (
    <div ref={showcaseRef}>
      <section id="editorial" className="py-16 md:py-24 px-4 md:px-8 bg-[#FEF7ED]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 md:mb-10">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.3em] mb-2 font-semibold sg-gold-sweep-text"
                style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
              >
                {rtl ? 'المجموعة الحصرية' : 'The Signature Collection'}
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-[48px] font-medium text-[#1F1B15] leading-tight sg-heading-reveal"
                style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)', letterSpacing: '-0.01em' }}
              >
                {rtl ? 'منتجاتنا المميزة' : 'Our Finest Offerings'}
              </h2>
            </div>
            <p
              className="text-sm text-[#4A463F] max-w-[280px] leading-relaxed md:text-end"
              style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
            >
              {rtl
                ? 'جودة لا تُضاهى، اختيرت بعناية لمائدتكم الفاخرة'
                : 'Uncompromising quality, curated for your finest table'}
            </p>
          </div>

          {editorialProducts.length >= 4 ? (
          <div
            className="hidden md:grid gap-3 min-w-0 sg-editorial-grid"
            style={{ gridTemplateColumns: '44% 1fr 1fr', gridTemplateRows: '400px 280px' }}
          >
              <div className="row-span-2 min-w-0 overflow-hidden">
                <EditorialTile product={editorialProducts[0]} lang={lang} onAddToCart={onAddToCart} staggerCls="sg-reveal-d1" className="h-full" />
              </div>
              <EditorialTile product={editorialProducts[1]} lang={lang} onAddToCart={onAddToCart} staggerCls="sg-reveal-d2" className="h-full" />
              <div className="row-span-2 min-w-0 overflow-hidden">
                <EditorialTile product={editorialProducts[2]} lang={lang} onAddToCart={onAddToCart} staggerCls="sg-reveal-d3" className="h-full" />
              </div>
              <EditorialTile product={editorialProducts[3]} lang={lang} onAddToCart={onAddToCart} staggerCls="sg-reveal-d4" className="h-full" />
            </div>
          ) : isLoading ? (
            <div className="hidden md:flex flex-col items-center justify-center gap-6 py-20 animate-pulse">
              <BrandLogo variant="inline" className="opacity-40" />
              <div
                className="w-full max-w-4xl grid gap-3"
                style={{ gridTemplateColumns: '44% 1fr 1fr', gridTemplateRows: '400px 280px' }}
              >
                <div className="row-span-2 bg-[#EAE1D7]/60 rounded-sm" />
                <div className="bg-[#EAE1D7]/60 rounded-sm" />
                <div className="row-span-2 bg-[#EAE1D7]/60 rounded-sm" />
                <div className="bg-[#EAE1D7]/60 rounded-sm" />
              </div>
            </div>
          ) : null}

          <div
            className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sg-momentum-scroll"
            style={SCROLLBAR_HIDE}
          >
            {isLoading && editorialProducts.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <ProductSkeleton
                    key={`ed-skel-${i}`}
                    className="snap-center"
                    style={{ width: 'min(80vw, 300px)' } as React.CSSProperties}
                  />
                ))
              : editorialProducts.map((p) => (
                  <div
                    key={p.id}
                    className="snap-center shrink-0 relative aspect-[4/5] max-h-[420px]"
                    style={{ width: 'min(80vw, 300px)', borderRadius: 2 }}
                  >
                    <EditorialTile product={p} lang={lang} onAddToCart={onAddToCart} className="h-full w-full" />
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section id="all-products" className="py-16 md:py-24 px-4 md:px-8 bg-[#F0E7DD]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 md:mb-10">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.3em] mb-2 font-semibold sg-gold-sweep-text"
                style={{ fontFamily: 'var(--font-hanken,sans-serif)', '--sweep-delay': '1.5s' } as React.CSSProperties}
              >
                {rtl ? 'تسوق الآن' : 'Shop the Collection'}
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-[48px] font-medium text-[#1F1B15] leading-tight sg-heading-reveal"
                style={{ fontFamily: 'var(--font-eb-garamond,Georgia,serif)', letterSpacing: '-0.01em' }}
              >
                {rtl ? 'جميع المنتجات' : 'The Complete Pantry'}
              </h2>
            </div>
            <p
              className="text-sm text-[#4A463F] max-w-[280px] leading-relaxed md:text-end"
              style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
            >
              {rtl
                ? 'من البحر إلى مائدتكم — كل ما يحتاجه مطبخكم الفاخر'
                : 'From sea to table — everything your kitchen deserves'}
            </p>
          </div>

          {isLoading && gridProducts.length === 0 ? (
            <>
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 animate-pulse">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductSkeleton key={`grid-skel-d-${i}`} />
                ))}
              </div>
              <div
                className="sm:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sg-momentum-scroll"
                style={SCROLLBAR_HIDE}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeleton
                    key={`grid-skel-m-${i}`}
                    className="snap-center"
                    style={{ width: 'min(72vw, 240px)' } as React.CSSProperties}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {gridProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    onAddToCart={onAddToCart}
                    staggerIdx={idx % 4}
                  />
                ))}
              </div>
              <div
                className="sm:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sg-momentum-scroll"
                style={SCROLLBAR_HIDE}
              >
                {gridProducts.map((product) => (
                  <div key={product.id} className="snap-center shrink-0" style={{ width: 'min(72vw, 240px)' }}>
                    <ProductCard product={product} lang={lang} onAddToCart={onAddToCart} />
                  </div>
                ))}
              </div>
            </>
          )}

          <p
            className="text-center text-[11px] text-[#7B776E] tracking-widest uppercase mt-10 md:mt-14"
            style={{ fontFamily: 'var(--font-hanken,sans-serif)' }}
          >
            {rtl ? `${gridProducts.length} منتج · جودة مضمونة` : `${gridProducts.length} products · Guaranteed quality`}
          </p>
        </div>
      </section>
    </div>
  );
}

export default memo(SoulGoldShowcase);
