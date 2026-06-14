'use client';

import React from 'react';
import { motion } from 'motion/react';

type Lang = 'ar' | 'en';

type TrustItem = {
  icon: React.ReactNode;
  label_ar: string;
  label_en: string;
  sub_ar: string;
  sub_en: string;
};

type TrustBarProps = {
  lang: Lang;
  items?: TrustItem[];
};

/* ── Default luxury trust items ─────────────────────────────────────── */
const DEFAULT_ITEMS: TrustItem[] = [
  {
    label_ar: 'عضوي ١٠٠٪',
    label_en: '100% Organic',
    sub_ar: 'طبيعي خالص',
    sub_en: 'Purely Natural',
    icon: (
      /* Leaf / plant motif */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 30c0-10 8-16 14-17-1 7-5 13-14 17z" />
        <path d="M18 30c0-10-8-16-14-17 1 7 5 13 14 17z" />
        <line x1="18" y1="14" x2="18" y2="32" />
      </svg>
    ),
  },
  {
    label_ar: 'جودة فاخرة',
    label_en: 'Premium Quality',
    sub_ar: 'معايير دولية',
    sub_en: 'Global Standards',
    icon: (
      /* Diamond / gem */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="18,4 32,14 18,32 4,14" />
        <polyline points="4,14 18,20 32,14" />
        <line x1="18" y1="4" x2="18" y2="20" />
      </svg>
    ),
  },
  {
    label_ar: 'توصيل سريع',
    label_en: 'Fast Delivery',
    sub_ar: 'خلال ٢٤ ساعة',
    sub_en: 'Within 24 Hours',
    icon: (
      /* Speed / clock motif */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="20" r="12" />
        <polyline points="18,10 18,20 24,24" />
        <line x1="18" y1="4" x2="14" y2="8" />
        <line x1="18" y1="4" x2="22" y2="8" />
      </svg>
    ),
  },
  {
    label_ar: 'تغليف صحي',
    label_en: 'Hygienic Packaging',
    sub_ar: 'معتمد صحياً',
    sub_en: 'Certified Safe',
    icon: (
      /* Shield / seal */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 4l13 5v9c0 7-5 13-13 15C11 31 6 25 6 18V9z" />
        <polyline points="13,18 16,21 23,14" />
      </svg>
    ),
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function TrustBar({ lang, items = DEFAULT_ITEMS }: TrustBarProps) {
  const isRtl = lang === 'ar';

  return (
    <section
      id="trust-bar"
      aria-label={isRtl ? 'مميزاتنا' : 'Why choose us'}
      className="relative bg-obsidian overflow-hidden"
    >
      {/* ── Top gold border line — animated sweep ────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px sg-trust-border-sweep"
      />
      {/* ── Bottom gold border line — animated sweep (offset) ────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-px sg-trust-border-sweep"
        style={{ animationDelay: '1.75s', opacity: 0.7 }}
      />

      {/* ── Subtle atmospheric glow ───────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 120% at 50% -10%, rgba(201,160,61,0.06) 0%, transparent 65%)',
        }}
      />

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={itemVariant}
              className={`group relative flex flex-col items-center text-center px-6 py-10 md:py-14 bg-obsidian hover:bg-white/[0.03] smooth-transition ${
                /* add right-border divider except on the last item in each row */
                i < items.length - 1 ? 'border-e border-white/[0.06]' : ''
              }`}
            >
              {/* Gold dot above icon */}
              <div
                className="w-1.5 h-1.5 rounded-full bg-primary-gold mb-6 opacity-60 group-hover:opacity-100 smooth-transition"
                aria-hidden="true"
              />

              {/* Icon — thin gold stroke with periodic shimmer */}
              <div
                className={`text-primary-gold/60 group-hover:text-primary-gold mb-5 smooth-transition sg-icon-shimmer sg-icon-shimmer-d${i}`}
              >
                {item.icon}
              </div>

              {/* Label */}
              <p className="font-extrabold text-white/90 text-sm md:text-base tracking-[0.12em] uppercase mb-2 group-hover:text-white smooth-transition">
                {isRtl ? item.label_ar : item.label_en}
              </p>

              {/* Sub-label */}
              <p className="text-[11px] font-bold text-white/30 tracking-[0.25em] uppercase group-hover:text-white/50 smooth-transition">
                {isRtl ? item.sub_ar : item.sub_en}
              </p>

              {/* Hover bottom accent */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary-gold/60 to-transparent opacity-0 group-hover:opacity-100 smooth-transition"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
