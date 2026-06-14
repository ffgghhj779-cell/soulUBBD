'use client';

import React, {
  useRef, useEffect, useCallback, useState, useMemo,
} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

type Lang = 'ar' | 'en';

export type Product = {
  id: number;
  categoryKey: string;
  title_ar: string; title_en: string;
  desc_ar: string;  desc_en: string;
  price: number;
  weight_ar: string; weight_en: string;
  badge_ar: string;  badge_en: string;
  image: string;
  bgColor: string;
};

type RunwayDict = {
  exclusive: string;
  filterAll: string; filterTuna: string;
  filterSauces: string; filterGhee: string; filterOrganics: string;
  noProducts: string;
};

type ProductRunwayProps = {
  lang: Lang;
  products: Product[];
  isLoading: boolean;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onAddToCart: (product: Product) => void;
  dict: RunwayDict;
};

const CATEGORIES = ['All', 'Tuna', 'Sauces', 'Ghee', 'Organics'] as const;

/* ── Magnetic Arrow ─────────────────────────────────────────────────── */
function MagneticArrow({
  onClick, disabled, children,
}: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setDelta({
      x: (e.clientX - r.left - r.width  / 2) * 0.32,
      y: (e.clientY - r.top  - r.height / 2) * 0.32,
    });
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseMove={onMove}
      onMouseLeave={() => setDelta({ x: 0, y: 0 })}
      style={{ transform: `translate(${delta.x}px, ${delta.y}px)` }}
      className="w-14 h-14 rounded-full glass-panel border border-[rgba(201,160,61,0.3)] flex items-center justify-center text-soft-charcoal hover:bg-primary-gold hover:text-white hover:border-primary-gold smooth-transition active:scale-90 touch-manipulation disabled:opacity-25 disabled:cursor-not-allowed shadow-lg"
    >
      {children}
    </button>
  );
}

/* ── Category label map ─────────────────────────────────────────────── */
const AR_LABELS: Record<string, string> = {
  Tuna: 'تونة', Sauces: 'صلصات', Ghee: 'سمن', Organics: 'عضوي',
};

/* ── Main component ─────────────────────────────────────────────────── */
export default function ProductRunway({
  lang, products, isLoading, activeCategory,
  onCategoryChange, onAddToCart, dict,
}: ProductRunwayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef       = useRef<number>(0);
  const [centeredIdx, setCenteredIdx] = useState(0);
  const isRtl = lang === 'ar';

  /* ── Per-frame DOM scale/opacity update ─────────────────────────── */
  const updateCards = useCallback(() => {
    rafRef.current = 0;
    const container = containerRef.current;
    if (!container) return;

    const cRect        = container.getBoundingClientRect();
    const centerX      = cRect.left + cRect.width / 2;
    const halfRange    = cRect.width * 0.7;
    let   closestDist  = Infinity;
    let   closestIdx   = 0;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const r        = card.getBoundingClientRect();
      const cardCx   = r.left + r.width / 2;
      const dist     = Math.abs(centerX - cardCx);
      const norm     = Math.max(0, 1 - dist / halfRange); // 1 at center → 0 at edge

      const scale   = 0.88 + norm * 0.20;  // 0.88 → 1.08
      const opacity = 0.48 + norm * 0.52;  // 0.48 → 1.00

      card.style.transform = `scale(${scale.toFixed(4)})`;
      card.style.opacity   = `${opacity.toFixed(4)}`;

      // Custom shadow intensity grows with norm
      const shadowAlpha = (0.04 + norm * 0.14).toFixed(3);
      card.style.boxShadow = `0 ${8 + norm * 32}px ${24 + norm * 48}px rgba(44,44,44,${shadowAlpha})`;

      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });

    setCenteredIdx(closestIdx);
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(updateCards);
  }, [updateCards]);

  /* ── Bind scroll listener ──────────────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', scheduleUpdate, { passive: true });
    scheduleUpdate(); // initial paint
    return () => el.removeEventListener('scroll', scheduleUpdate);
  }, [scheduleUpdate]);

  /* ── Re-run on data / lang changes ────────────────────────────── */
  useEffect(() => { scheduleUpdate(); }, [products, lang, scheduleUpdate]);

  /* ── Arrow navigation ─────────────────────────────────────────── */
  const navigate = useCallback((dir: 'prev' | 'next') => {
    const step     = dir === 'next' ? 1 : -1;
    const targetIdx = Math.max(0, Math.min(products.length - 1, centeredIdx + step));
    cardRefs.current[targetIdx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [centeredIdx, products.length]);

  const canPrev = centeredIdx > 0;
  const canNext = centeredIdx < products.length - 1;

  /* ── Category label ───────────────────────────────────────────── */
  const catLabel = useCallback((cat: string) => {
    const map: Record<string, string> = {
      All: dict.filterAll, Tuna: dict.filterTuna,
      Sauces: dict.filterSauces, Ghee: dict.filterGhee, Organics: dict.filterOrganics,
    };
    return map[cat] ?? cat;
  }, [dict]);

  /* ── Dot count (cap at 6 for aesthetics) ─────────────────────── */
  const dotCount = Math.min(products.length, 6);

  /* ── Runway padding so first/last card sits at center ─────────── */
  const runwayPadding = 'max(1.5rem, calc(50vw - 170px))';

  return (
    <section id="products" className="py-20 bg-cream overflow-hidden">

      {/* ── Section header ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>
            <p className="text-[11px] font-extrabold tracking-[0.32em] uppercase text-primary-gold mb-2">
              {isRtl ? 'منتجات مختارة بعناية' : 'Curated Selection'}
            </p>
            <h3 className="text-fluid-h2 font-extrabold text-soft-charcoal">
              {dict.exclusive}
            </h3>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 glass-panel p-1.5 rounded-full shadow-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 md:px-5 py-2.5 min-h-[44px] rounded-full font-bold text-sm smooth-transition touch-manipulation active:scale-95 ${
                  activeCategory === cat
                    ? 'bg-soft-charcoal text-cream shadow-md'
                    : 'text-soft-charcoal/55 hover:text-soft-charcoal hover:bg-white/80'
                }`}
              >
                {catLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Runway track ───────────────────────────────────────────── */}
      <div className="relative">

        {/* Vignette fades — physical L/R so they're direction-agnostic */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-full w-28 md:w-52 z-10"
          style={{ background: 'linear-gradient(to right, var(--cream) 0%, transparent 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-28 md:w-52 z-10"
          style={{ background: 'linear-gradient(to left, var(--cream) 0%, transparent 100%)' }}
        />

        {/* Loading */}
        {isLoading && (
          <div className="h-[520px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!isLoading && products.length === 0 && (
          <div className="h-[520px] flex items-center justify-center text-soft-charcoal/50 font-medium text-lg">
            {dict.noProducts}
          </div>
        )}

        {/* Cards */}
        {!isLoading && products.length > 0 && (
          <div
            ref={containerRef}
            dir="ltr"                      /* force LTR scroll model */
            className="flex gap-5 md:gap-7 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-10"
            style={{
              paddingLeft:  runwayPadding,
              paddingRight: runwayPadding,
              scrollPaddingLeft:  runwayPadding,
              scrollPaddingRight: runwayPadding,
            }}
          >
            <AnimatePresence mode="popLayout">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 0.55, y: 0 }}   /* CSS will override opacity */
                  exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.45, delay: idx * 0.055, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0 w-[min(78vw,320px)] md:w-[340px] snap-center"
                  style={{
                    willChange: 'transform, opacity',
                    /* JS overrides transform + opacity — transition set here for smoothness */
                    transition: 'transform 0.28s cubic-bezier(0.25,1,0.5,1), opacity 0.28s ease, box-shadow 0.28s ease',
                  }}
                >
                  {/* Card shell — no border-radius interference from parent motion.div */}
                  <div
                    className="bg-white rounded-[32px] p-5 border border-[rgba(201,160,61,0.15)] flex flex-col overflow-hidden"
                    /* dir flipped back inside card so text renders correctly */
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    {/* ── Image ── */}
                    <div className={`relative w-full aspect-[3/4] ${product.bgColor} rounded-[24px] overflow-hidden mb-5 group`}>
                      <Image
                        src={product.image}
                        alt={isRtl ? product.title_ar : product.title_en}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 768px) 80vw, 340px"
                      />
                      {/* Top overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-80" />

                      {/* Badge */}
                      <div className="absolute top-4 start-4 z-10 glass-card px-3 py-1.5 rounded-full text-xs font-bold text-dark-gold flex items-center gap-1">
                        <Sparkles size={11} />
                        {isRtl ? product.badge_ar : product.badge_en}
                      </div>

                      {/* Card index */}
                      <div className="absolute bottom-4 end-4 z-10">
                        <span className="text-[10px] font-extrabold text-white/60 tracking-widest">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* ── Text ── */}
                    <span className="text-[11px] font-extrabold text-primary-gold uppercase tracking-widest mb-1.5">
                      {isRtl ? (AR_LABELS[product.categoryKey] ?? product.categoryKey) : product.categoryKey}
                    </span>

                    <h4 className="text-[1.15rem] font-extrabold text-soft-charcoal mb-1.5 leading-snug">
                      {isRtl ? product.title_ar : product.title_en}
                    </h4>

                    <p className="text-soft-charcoal/55 text-sm leading-relaxed line-clamp-2 mb-3 flex-1">
                      {isRtl ? product.desc_ar : product.desc_en}
                    </p>

                    <p className="text-soft-charcoal/35 text-xs font-semibold tracking-wide mb-5">
                      {isRtl ? product.weight_ar : product.weight_en}
                    </p>

                    {/* ── Price + Cart ── */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[rgba(201,160,61,0.12)]">
                      <div>
                        <span className="font-extrabold text-2xl text-soft-charcoal">
                          {product.price}
                        </span>
                        <span className="text-xs font-bold text-soft-charcoal/40 ms-1">SAR</span>
                      </div>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="min-w-[48px] min-h-[48px] rounded-full bg-cream text-primary-gold flex items-center justify-center hover:bg-primary-gold hover:text-white hover:shadow-lg smooth-transition active:scale-95 touch-manipulation hardware-accelerated"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Navigation controls ─────────────────────────────────────── */}
      {!isLoading && products.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-2 flex items-center justify-between">

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  cardRefs.current[i]?.scrollIntoView({
                    behavior: 'smooth', block: 'nearest', inline: 'center',
                  });
                }}
                className="smooth-transition touch-manipulation rounded-full"
                style={{
                  width:      i === centeredIdx ? '24px' : '8px',
                  height:     '8px',
                  background: i === centeredIdx ? 'var(--primary-gold)' : 'rgba(44,44,44,0.18)',
                }}
              />
            ))}
          </div>

          {/* Arrows — direction-aware for RTL */}
          <div className="flex items-center gap-3">
            <MagneticArrow onClick={() => navigate('prev')} disabled={!canPrev}>
              {isRtl ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            </MagneticArrow>
            <MagneticArrow onClick={() => navigate('next')} disabled={!canNext}>
              {isRtl ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            </MagneticArrow>
          </div>
        </div>
      )}
    </section>
  );
}
