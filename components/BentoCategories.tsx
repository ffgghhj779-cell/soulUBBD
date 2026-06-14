'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from '@/lib/useMediaQuery';

type Lang = 'ar' | 'en';

type BentoCategoriesProps = {
  lang: Lang;
  dict: { discover: string; discoverDesc: string };
};

const tiles = [
  {
    name_ar: 'تونة فاخرة',
    name_en: 'Premium Tuna',
    sub_ar: 'مختارة من أجود المصادر',
    sub_en: 'Sourced from the finest waters',
    img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name_ar: 'صلصات عضوية',
    name_en: 'Organic Sauces',
    sub_ar: 'نكهات أصيلة',
    sub_en: 'Authentic flavors',
    img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
  },
  {
    name_ar: 'سمن أصيل',
    name_en: 'Authentic Ghee',
    sub_ar: 'من مزارع محلية',
    sub_en: 'From local farms',
    img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=85',
  },
  {
    name_ar: 'طبيعة نقية',
    name_en: 'Pure Organics',
    sub_ar: 'نقاء لا مثيل له',
    sub_en: 'Uncompromised purity',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85',
  },
];

// On desktop: slide + fade. On mobile: fade only (no Y repaints = 120fps smooth).
const reveal = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const revealDesktop = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function BentoTile({
  tile,
  idx,
  lang,
  isHero = false,
  className = '',
}: {
  tile: (typeof tiles)[0];
  idx: number;
  lang: Lang;
  isHero?: boolean;
  className?: string;
}) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <motion.div
      custom={idx}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      /* Use simpler fade-only on mobile (no Y translation = no layout work each frame)
         and full slide+fade on desktop via CSS media via the variants object trick */
      variants={isMobile ? reveal : revealDesktop}
      className={`group relative rounded overflow-hidden cursor-pointer touch-manipulation select-none ${isHero ? 'aspect-[4/5] lg:aspect-auto' : 'aspect-[4/3]'} ${className}`}
    >
      {/* Image — editorial framing, deliberate magazine crop */}
      <Image
        src={tile.img}
        alt={lang === 'ar' ? tile.name_ar : tile.name_en}
        fill
        priority={isHero}
        loading={isHero ? 'eager' : 'lazy'}
        decoding={isHero ? 'sync' : 'async'}
        {...(isHero ? { fetchPriority: 'high' as const } : {})}
        className="object-cover object-center group-hover:scale-105 will-change-transform [transition:transform_0.7s_cubic-bezier(0.25,1,0.5,1)]"
        referrerPolicy="no-referrer"
        sizes={isHero
          ? '(max-width:640px) 100vw, (max-width:1024px) 100vw, 44vw'
          : '(max-width:640px) 50vw, (max-width:1024px) 33vw, 22vw'}
      />

      {/* Gradient — ensures 100% text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Top-left index — editorial numbering */}
      <div className="absolute top-5 start-5 text-white/30 text-[10px] font-extrabold tracking-[0.35em] tabular-nums">
        {String(idx + 1).padStart(2, '0')}
      </div>

      {/* Top-right arrow — hidden until hover */}
      <div
        aria-hidden="true"
        className="absolute top-3 end-3 min-w-[44px] min-h-[44px] rounded bg-[#1A1612]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#C9A03D] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 smooth-transition"
      >
        <ArrowUpRight size={16} />
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 start-0 w-full p-6 md:p-8">
        {/* Gold accent bar */}
        <div className="h-[2px] w-8 bg-[#C9A03D] rounded-full mb-4 group-hover:w-14 smooth-transition" />

        <h3
          className={`text-white font-medium leading-tight ${
            isHero ? 'text-2xl md:text-3xl xl:text-4xl' : 'text-lg md:text-xl'
          }`}
          style={{ fontFamily: 'var(--font-eb-garamond, Georgia, serif)' }}
        >
          {lang === 'ar' ? tile.name_ar : tile.name_en}
        </h3>

        {/* Sub-label — slides up on hover */}
        <p className="text-white/0 text-sm mt-1.5 font-medium group-hover:text-white/70 translate-y-2 group-hover:translate-y-0 smooth-transition" style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}>
          {lang === 'ar' ? tile.sub_ar : tile.sub_en}
        </p>
      </div>
    </motion.div>
  );
}

export default function BentoCategories({ lang, dict }: BentoCategoriesProps) {
  return (
    <section id="categories" className="py-24 px-4 bg-[#FEF7ED]">
      <div className="max-w-7xl mx-auto">

        {/* Section header — editorial split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#C9A03D] mb-3" style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}>
              {lang === 'ar' ? 'مجموعاتنا الحصرية' : 'Our Collections'}
            </p>
            <h2 className="text-fluid-h2 font-medium text-[var(--sg-on-surface)]" style={{ fontFamily: 'var(--font-eb-garamond, Georgia, serif)', letterSpacing: '-0.01em' }}>{dict.discover}</h2>
          </div>
          <p className="text-[var(--sg-on-surface-var)] max-w-xs text-base leading-relaxed md:text-end" style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}>
            {dict.discoverDesc}
          </p>
        </div>

        {/* ── Desktop bento: asymmetric 3-column, 2-row ── */}
        <div
          className="hidden lg:grid gap-4 max-h-[640px]"
          style={{
            gridTemplateColumns: '44% 1fr 1fr',
            gridTemplateRows:    'minmax(280px, 1fr) minmax(200px, 0.65fr)',
          }}
        >
          {/* Hero tile — tall (row-span-2) */}
          <div className="row-span-2">
            <BentoTile tile={tiles[0]} idx={0} lang={lang} className="h-full" isHero />
          </div>
          {/* Tile 2 */}
          <BentoTile tile={tiles[1]} idx={1} lang={lang} className="h-full" />
          {/* Tile 3 */}
          <BentoTile tile={tiles[2]} idx={2} lang={lang} className="h-full" />
          {/* Tile 4 — wide landscape banner (col-span-2) */}
          <div className="col-span-2 aspect-[21/9] max-h-[220px]">
            <BentoTile tile={tiles[3]} idx={3} lang={lang} className="h-full" />
          </div>
        </div>

        {/* ── Mobile: fluid 2-col asymmetric ── */}
        <div className="grid lg:hidden grid-cols-2 gap-3">
          <div className="col-span-2 aspect-[16/9] max-h-[260px]">
            <BentoTile tile={tiles[0]} idx={0} lang={lang} className="h-full" isHero />
          </div>
          <div className="aspect-[4/3] max-h-[180px]">
            <BentoTile tile={tiles[1]} idx={1} lang={lang} className="h-full" />
          </div>
          <div className="aspect-[4/3] max-h-[180px]">
            <BentoTile tile={tiles[2]} idx={2} lang={lang} className="h-full" />
          </div>
          <div className="col-span-2 aspect-[21/9] max-h-[160px]">
            <BentoTile tile={tiles[3]} idx={3} lang={lang} className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
