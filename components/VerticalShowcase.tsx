'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

type Lang = 'ar' | 'en';

type ShowcaseCard = {
  image: string;
  name_ar: string;
  name_en: string;
  tag_ar: string;
  tag_en: string;
  price?: number;
  /** Tailwind-safe inline hex for the card background */
  bg: string;
  /** Tailwind text color for contrast on the bg */
  textAccent: string;
};

type VerticalShowcaseProps = {
  lang: Lang;
  title_ar?: string;
  title_en?: string;
  cards?: ShowcaseCard[];
  onCardClick?: (card: ShowcaseCard) => void;
};

/* ── Default cards using the Soul Gold palette ──────────────────────── */
const DEFAULT_CARDS: ShowcaseCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85',
    name_ar: 'عسل جبلي أصيل',
    name_en: 'Mountain Honey',
    tag_ar: 'طبيعي نقي',
    tag_en: 'Pure Natural',
    price: 149,
    bg: '#C9A03D',         // primary-gold
    textAccent: '#1A1612', // obsidian
  },
  {
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=85',
    name_ar: 'تونة بيضاء فاخرة',
    name_en: 'White Tuna',
    tag_ar: 'مختارة بعناية',
    tag_en: 'Hand-Selected',
    price: 89,
    bg: '#B85C38',         // terracotta
    textAccent: '#FEF7ED', // cream
  },
  {
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=85',
    name_ar: 'سمن بلدي أصيل',
    name_en: 'Authentic Ghee',
    tag_ar: 'مزارع محلية',
    tag_en: 'Local Farms',
    price: 119,
    bg: '#9E4A2A',         // warm-brown
    textAccent: '#FEF7ED',
  },
  {
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85',
    name_ar: 'صلصة عضوية',
    name_en: 'Organic Sauce',
    tag_ar: 'نكهة أصيلة',
    tag_en: 'Artisan Craft',
    price: 65,
    bg: '#A67C1E',         // dark-gold
    textAccent: '#FEF7ED',
  },
];

/* ── Animation variants ─────────────────────────────────────────────── */
const sectionHeader = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function VerticalShowcase({
  lang,
  title_ar = 'حصرياً لديك',
  title_en = "Chef's Special",
  cards = DEFAULT_CARDS,
  onCardClick,
}: VerticalShowcaseProps) {
  const isRtl = lang === 'ar';
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="vertical-showcase"
      aria-label={isRtl ? 'معرض المنتجات' : 'Product showcase'}
      className="relative bg-obsidian overflow-hidden"
    >
      {/* ── Grain noise ─────────────────────────────────────────── */}
      <div className="grain-overlay pointer-events-none" aria-hidden="true" style={{ opacity: 0.05 }} />

      {/* ── Section header ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 pt-20 pb-10 text-center">
        {/* Eyebrow */}
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionHeader}
          className="text-[11px] font-extrabold tracking-[0.42em] uppercase text-primary-gold mb-4"
        >
          {isRtl ? 'مجموعة مختارة بعناية' : 'A Curated Selection'}
        </motion.p>

        {/* Giant heading */}
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ ...sectionHeader, visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } } }}
          className="font-extrabold text-white leading-none"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
        >
          {isRtl ? title_ar : title_en}
        </motion.h2>

        {/* Gold underline rule */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 origin-center"
          style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C9A03D, transparent)',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          DESKTOP: Full-height side-by-side color-block cards
      ══════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex relative z-10" style={{ minHeight: '640px' }}>
        {cards.map((card, i) => (
          <motion.article
            key={card.name_en}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardReveal}
            onClick={() => onCardClick?.(card)}
            className="group relative flex-1 flex flex-col items-center justify-between overflow-hidden cursor-pointer"
            style={{ backgroundColor: card.bg }}
            aria-label={isRtl ? card.name_ar : card.name_en}
          >
            {/* Grain texture on each card */}
            <div className="grain-overlay pointer-events-none" aria-hidden="true" style={{ opacity: 0.07 }} />

            {/* Light sweep on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none smooth-transition overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
                  transform: 'skewX(-12deg)',
                }}
              />
            </div>

            {/* ── Top section: tag + index ───────────────────── */}
            <div className="relative z-10 w-full px-6 pt-8 flex items-start justify-between">
              {/* Tag pill */}
              <div
                className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  color: card.textAccent,
                  backdropFilter: 'blur(6px)',
                }}
              >
                {isRtl ? card.tag_ar : card.tag_en}
              </div>
              {/* Index number */}
              <span
                className="text-[11px] font-extrabold tracking-widest tabular-nums"
                style={{ color: card.textAccent, opacity: 0.35 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* ── Center: Top-down product image ─────────────── */}
            <div className="relative z-10 w-full flex items-center justify-center py-4 px-4"
                 style={{ flex: '1 1 auto' }}>
              <div
                className="relative w-[min(220px,80%)] aspect-square"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))' }}
              >
                <Image
                  src={card.image}
                  alt={isRtl ? card.name_ar : card.name_en}
                  fill
                  loading={i === 0 ? 'eager' : 'lazy'}
                  priority={i === 0}
                  sizes="(max-width: 1280px) 25vw, 280px"
                  className="object-cover rounded-full [transition:transform_0.9s_cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08]"
                  referrerPolicy="no-referrer"
                />
                {/* Glossy ring around product */}
                <div
                  className="absolute inset-[-4px] rounded-full pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                  }}
                />
              </div>
            </div>

            {/* ── Bottom: name + price + arrow ───────────────── */}
            <div className="relative z-10 w-full px-6 pb-8">
              {/* Gold thin rule */}
              <div
                className="w-8 h-px mb-4 group-hover:w-14 smooth-transition"
                style={{ background: card.textAccent, opacity: 0.4 }}
                aria-hidden="true"
              />

              <h3
                className="font-extrabold text-xl leading-tight mb-1"
                style={{ color: card.textAccent }}
              >
                {isRtl ? card.name_ar : card.name_en}
              </h3>

              {card.price && (
                <div className="flex items-center justify-between mt-3">
                  <span
                    className="font-extrabold text-2xl leading-none"
                    style={{ color: card.textAccent }}
                  >
                    {card.price}
                    <span className="text-sm font-bold opacity-60 ms-1">SAR</span>
                  </span>
                  {/* Arrow icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center smooth-transition group-hover:scale-110"
                    style={{
                      background: 'rgba(0,0,0,0.18)',
                      color: card.textAccent,
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              )}
            </div>

            {/* Active border bottom */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 inset-x-0 h-[3px] opacity-0 group-hover:opacity-100 smooth-transition"
              style={{ background: 'rgba(255,255,255,0.35)' }}
            />
          </motion.article>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOBILE: Horizontal snap slider (native momentum scroll)
          — zero JS scroll listeners, pure CSS snap
      ══════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative z-10 pb-10">
        <div
          ref={sliderRef}
          className="flex gap-0 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          style={{
            paddingLeft: '1rem',
            paddingRight: '1rem',
            scrollPaddingLeft: '1rem',
            overscrollBehaviorX: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {cards.map((card, i) => (
            <motion.article
              key={card.name_en}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardReveal}
              onClick={() => onCardClick?.(card)}
              className="group shrink-0 snap-center rounded-[32px] overflow-hidden cursor-pointer mx-2 flex flex-col"
              style={{
                backgroundColor: card.bg,
                width: 'min(78vw, 300px)',
                minHeight: '480px',
              }}
              aria-label={isRtl ? card.name_ar : card.name_en}
            >
              {/* Grain */}
              <div className="grain-overlay pointer-events-none" aria-hidden="true" style={{ opacity: 0.07 }} />

              {/* Top: tag + index */}
              <div className="relative z-10 px-5 pt-6 flex items-start justify-between">
                <div
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ background: 'rgba(0,0,0,0.2)', color: card.textAccent }}
                >
                  {isRtl ? card.tag_ar : card.tag_en}
                </div>
                <span
                  className="text-[11px] font-extrabold tracking-widest"
                  style={{ color: card.textAccent, opacity: 0.35 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Center: product image — top-down circular */}
              <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-6">
                <div
                  className="relative w-[min(200px,80%)] aspect-square"
                  style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.4))' }}
                >
                  <Image
                    src={card.image}
                    alt={isRtl ? card.name_ar : card.name_en}
                    fill
                    loading={i === 0 ? 'eager' : 'lazy'}
                    sizes="78vw"
                    className="object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="absolute inset-[-4px] rounded-full pointer-events-none"
                    aria-hidden="true"
                    style={{ border: '1.5px solid rgba(255,255,255,0.18)' }}
                  />
                </div>
              </div>

              {/* Bottom: name + price */}
              <div className="relative z-10 px-5 pb-7">
                <div
                  className="w-8 h-px mb-4"
                  style={{ background: card.textAccent, opacity: 0.4 }}
                  aria-hidden="true"
                />
                <h3
                  className="font-extrabold text-lg leading-tight"
                  style={{ color: card.textAccent }}
                >
                  {isRtl ? card.name_ar : card.name_en}
                </h3>
                {card.price && (
                  <p
                    className="font-extrabold text-2xl mt-2 leading-none"
                    style={{ color: card.textAccent }}
                  >
                    {card.price}
                    <span className="text-sm font-bold opacity-60 ms-1">SAR</span>
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Scroll hint dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5" aria-hidden="true">
          {cards.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i === 0 ? '#C9A03D' : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
