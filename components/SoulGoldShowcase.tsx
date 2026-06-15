'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, Minus, Plus, Eye, X, ShoppingCart } from 'lucide-react';
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

function formatPrice(price: number, rtl: boolean) {
  return `${price.toFixed(2)} ${rtl ? 'ريال' : 'SAR'}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-3.5 ${
            star <= Math.floor(rating)
              ? 'fill-[#f5a623] text-[#f5a623]'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function promoBadge(badge: string): 'HOT' | 'NEW' | null {
  const upper = badge.toUpperCase();
  if (upper.includes('HOT')) return 'HOT';
  if (upper.includes('NEW')) return 'NEW';
  return null;
}

/* ── Product card (grid) — Citrus grocery style ── */
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
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) {
      onAddToCart(product);
    }
  };

  const badge = promoBadge(rtl ? product.badge_ar : product.badge_en);
  const unit = rtl ? product.sub_ar : product.sub_en;
  const category = rtl ? product.category_ar : product.category_en;
  const name = rtl ? product.name_ar : product.name_en;
  const salePrice = formatPrice(product.price, rtl);

  return (
    <>
      <article className="sg-product-card group relative flex flex-col bg-white overflow-hidden touch-premium sg-animate-layer">
        <div className={`relative pt-6 pb-3 px-4 flex items-center justify-center min-h-[200px] bg-white sg-reveal-clip ${STAGGER[staggerIdx]}`}>
          {badge && (
            <div
              className={`absolute top-3 start-3 text-white text-xs font-bold px-3 py-1 rounded-full z-10 ${
                badge === 'HOT' ? 'bg-red-500' : 'bg-[#2d6a4f]'
              }`}
            >
              {badge}
            </div>
          )}

          <div className="relative w-full h-[160px]">
            <Image
              src={product.image_url}
              alt={name}
              fill
              loading="lazy"
              sizes="(max-width:640px) 72vw, (max-width:1024px) 33vw, 25vw"
              className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <button
            type="button"
            onClick={() => setQuickView(true)}
            className="absolute top-3 end-3 z-10 hidden md:flex items-center justify-center size-9 rounded-full bg-white/90 border border-gray-200 text-gray-600 hover:text-[#2d6a4f] hover:border-[#2d6a4f] transition-colors opacity-0 group-hover:opacity-100"
            aria-label={rtl ? 'معاينة سريعة' : 'Quick View'}
          >
            <Eye className="size-4" />
          </button>
        </div>

        <div className="px-4 pb-4 flex flex-col gap-2 flex-1">
          <div>
            <h3 className="font-semibold text-[#1a3c34] text-[15px] leading-tight">{name}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{category}</p>
          </div>

          <StarRating rating={4} />

          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[15px] font-bold text-[#2d6a4f]">{salePrice}</span>
            {unit && <span className="text-xs text-gray-500">/ {unit}</span>}
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-1">
              <div className="flex items-center border border-[#2d6a4f] rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="bg-[#2d6a4f] text-white px-3 py-2.5 hover:bg-[#1a3c34] transition-colors touch-manipulation"
                  aria-label={rtl ? 'تقليل الكمية' : 'Decrease quantity'}
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="px-3 text-sm font-semibold text-[#1a3c34] min-w-[2rem] text-center">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="bg-[#2d6a4f] text-white px-3 py-2.5 hover:bg-[#1a3c34] transition-colors touch-manipulation"
                  aria-label={rtl ? 'زيادة الكمية' : 'Increase quantity'}
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-[#2d6a4f] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-[#1a3c34] transition-colors touch-manipulation sg-touch-fast"
              >
                {rtl ? 'أضف للسلة' : 'ADD TO CART'}
              </button>
            </div>
          </div>
        </div>
      </article>

      {quickView && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setQuickView(false)}
        >
          <div
            className="relative w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickView(false)}
              aria-label={rtl ? 'إغلاق' : 'Close'}
              className="absolute top-3 end-3 z-10 w-9 h-9 flex items-center justify-center bg-[#2d6a4f] text-white hover:bg-[#1a3c34] transition-colors rounded-full sg-touch-fast"
            >
              <X size={16} />
            </button>
            <div className="relative aspect-square bg-white p-8">
              <Image
                src={product.image_url}
                alt={name}
                fill
                loading="lazy"
                sizes="(max-width:768px) 90vw, 400px"
                className="object-contain object-center"
              />
            </div>
            <div className="p-6 border-t border-gray-100">
              <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wide">
                {rtl ? product.badge_ar : product.badge_en}
              </span>
              <h3 className="mt-2 text-xl text-[#1a3c34] font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-gray-500">{unit}</p>
              <div className="flex items-center justify-between mt-5">
                <span className="text-xl font-bold text-[#2d6a4f] tabular-nums">{salePrice}</span>
                <button
                  type="button"
                  onClick={() => { handleAdd(); setQuickView(false); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#2d6a4f] text-white text-xs font-bold rounded-lg hover:bg-[#1a3c34] transition-colors sg-touch-fast"
                >
                  {rtl ? 'أضف للسلة' : 'ADD TO CART'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

/* ── Editorial tile (bento) — Citrus featured card ── */
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
  const name = rtl ? product.name_ar : product.name_en;
  const category = rtl ? product.category_ar : product.category_en;
  const unit = rtl ? product.sub_ar : product.sub_en;
  const salePrice = formatPrice(product.price, rtl);
  const badge = promoBadge(rtl ? product.badge_ar : product.badge_en);

  return (
    <article
      className={`group relative flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer select-none touch-premium h-full min-h-[240px] sg-animate-layer hover:shadow-lg transition-shadow ${className}`}
    >
      <div className={`relative flex-1 min-h-[160px] p-4 md:p-6 flex items-center justify-center bg-white sg-reveal-clip ${staggerCls}`}>
        <span className="absolute top-3 start-3 bg-[#f47c2b] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          {rtl ? 'تخفيض' : 'Sale'}
        </span>

        {badge && (
          <span
            className={`absolute top-3 end-3 text-white text-xs font-bold px-3 py-1 rounded-full z-10 ${
              badge === 'HOT' ? 'bg-red-500' : 'bg-[#2d6a4f]'
            }`}
          >
            {badge}
          </span>
        )}

        <div className="relative w-full h-full min-h-[140px]">
          <Image
            src={product.image_url}
            alt={name}
            fill
            loading="lazy"
            sizes="(max-width:640px) 100vw, 50vw"
            className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="px-4 md:px-5 pb-4 md:pb-5 flex flex-col gap-2 border-t border-gray-100">
        <div>
          <p className="text-gray-400 text-xs">{category}</p>
          <h3 className="font-semibold text-[#1a3c34] text-base md:text-lg leading-tight mt-0.5 line-clamp-2">
            {name}
          </h3>
          {unit && <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{unit}</p>}
        </div>

        <StarRating rating={4} />

        <div className="flex items-center justify-between gap-3 mt-auto pt-2">
          <span className="text-base md:text-lg font-bold text-[#2d6a4f] tabular-nums">{salePrice}</span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            aria-label={rtl ? 'أضف للسلة' : 'Add to cart'}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#2d6a4f] text-white rounded-lg text-xs font-bold hover:bg-[#1a3c34] transition-colors touch-manipulation sg-touch-fast shrink-0"
          >
            <ShoppingCart size={13} strokeWidth={2} />
            {rtl ? 'أضف للسلة' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </article>
  );
});

function ProductSkeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`aspect-[4/5] bg-gray-100 rounded-xl shrink-0 ${className}`} style={style} aria-hidden="true" />;
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
      <section id="editorial" className="py-6 md:py-10 px-4 max-w-[1400px] mx-auto">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-bold text-[#1a3c34] mb-1">
            {rtl ? 'منتجاتنا المميزة' : 'Best Selling Fresh Produce'}
          </h2>
          <div className="w-10 h-0.5 bg-[#2d6a4f] mb-6" />

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
              <div className="w-full max-w-4xl grid gap-3"
                style={{ gridTemplateColumns: '44% 1fr 1fr', gridTemplateRows: '400px 280px' }}
              >
                <div className="row-span-2 bg-gray-100 rounded-xl" />
                <div className="bg-gray-100 rounded-xl" />
                <div className="row-span-2 bg-gray-100 rounded-xl" />
                <div className="bg-gray-100 rounded-xl" />
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
                    className="snap-center shrink-0 relative max-h-[420px] rounded-xl"
                    style={{ width: 'min(80vw, 300px)' }}
                  >
                    <EditorialTile product={p} lang={lang} onAddToCart={onAddToCart} className="h-full w-full" />
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section id="all-products" className="py-6 md:py-10 px-4 max-w-[1400px] mx-auto">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-bold text-[#1a3c34] mb-1">
            {rtl ? 'جميع المنتجات' : 'Shop the Collection'}
          </h2>
          <div className="w-10 h-0.5 bg-[#2d6a4f] mb-6" />

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

          <p className="text-center text-xs text-gray-500 mt-10 md:mt-14">
            {rtl ? `${gridProducts.length} منتج · جودة مضمونة` : `${gridProducts.length} products · Guaranteed quality`}
          </p>
        </div>
      </section>
    </div>
  );
}

export default memo(SoulGoldShowcase);
