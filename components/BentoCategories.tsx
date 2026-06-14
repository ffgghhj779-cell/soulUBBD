'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { CATEGORY_TILES, categoryImageUrl } from '@/lib/categories';

type Lang = 'ar' | 'en';

type BentoCategoriesProps = {
  lang: Lang;
  dict: { discover: string; discoverDesc: string };
};

const tiles = CATEGORY_TILES.map((tile) => ({
  name_ar: tile.name_ar,
  name_en: tile.name_en,
  sub_ar: tile.sub_ar,
  sub_en: tile.sub_en,
  img: categoryImageUrl(tile.image_file),
}));

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
  layout = 'portrait',
  className = '',
}: {
  tile: (typeof tiles)[0];
  idx: number;
  lang: Lang;
  layout?: 'portrait' | 'landscape';
  className?: string;
}) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const aspectClass = layout === 'landscape' ? 'aspect-[16/9]' : 'aspect-[4/5]';

  return (
    <motion.div
      custom={idx}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={isMobile ? reveal : revealDesktop}
      className={`sg-bento-tile group relative rounded overflow-hidden cursor-pointer touch-manipulation select-none ${aspectClass} ${className}`}
    >
      <div className="sg-bento-tile__stage" aria-hidden="true" />
      <Image
        src={tile.img}
        alt={lang === 'ar' ? tile.name_ar : tile.name_en}
        fill
        loading="lazy"
        decoding="async"
        className="sg-bento-tile__img"
        referrerPolicy="no-referrer"
        sizes={layout === 'landscape'
          ? '(max-width:640px) 100vw, 66vw'
          : '(max-width:640px) 50vw, (max-width:1024px) 33vw, 22vw'}
      />

      <div className="sg-bento-tile__veil" aria-hidden="true" />

      <div className="absolute top-5 start-5 z-[2] text-white/30 text-[10px] font-extrabold tracking-[0.35em] tabular-nums">
        {String(idx + 1).padStart(2, '0')}
      </div>

      <div
        aria-hidden="true"
        className="absolute top-3 end-3 z-[2] min-w-[44px] min-h-[44px] rounded bg-[#1A1612]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#C9A03D] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 smooth-transition"
      >
        <ArrowUpRight size={16} />
      </div>

      <div className="absolute bottom-0 start-0 w-full p-6 md:p-8 z-[2]">
        <div className="h-[2px] w-8 bg-[#C9A03D] rounded-full mb-4 group-hover:w-14 smooth-transition" />

        <h3
          className={`text-white font-medium leading-tight ${
            layout === 'portrait' && idx === 0 ? 'text-2xl md:text-3xl xl:text-4xl' : 'text-lg md:text-xl'
          }`}
          style={{ fontFamily: 'var(--font-eb-garamond, Georgia, serif)' }}
        >
          {lang === 'ar' ? tile.name_ar : tile.name_en}
        </h3>

        <p
          className="text-white/0 text-sm mt-1.5 font-medium group-hover:text-white/70 translate-y-2 group-hover:translate-y-0 smooth-transition"
          style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
        >
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

        {/* Desktop bento */}
        <div
          className="hidden lg:grid gap-4 min-w-0"
          style={{
            gridTemplateColumns: '44% 1fr 1fr',
            gridTemplateRows: '380px 260px',
          }}
        >
          <div className="row-span-2 min-w-0 overflow-hidden">
            <BentoTile tile={tiles[0]} idx={0} lang={lang} layout="portrait" className="h-full !aspect-auto" />
          </div>
          <BentoTile tile={tiles[1]} idx={1} lang={lang} layout="portrait" className="h-full !aspect-auto" />
          <BentoTile tile={tiles[2]} idx={2} lang={lang} layout="portrait" className="h-full !aspect-auto" />
          <div className="col-span-2 min-w-0 overflow-hidden">
            <BentoTile tile={tiles[3]} idx={3} lang={lang} layout="landscape" className="h-full !aspect-auto" />
          </div>
        </div>

        {/* Mobile bento */}
        <div className="grid lg:hidden grid-cols-2 gap-3 min-w-0">
          <div className="col-span-2 aspect-[16/9] max-h-[260px] min-w-0 overflow-hidden">
            <BentoTile tile={tiles[0]} idx={0} lang={lang} layout="landscape" className="h-full !aspect-auto" />
          </div>
          <div className="aspect-[4/5] max-h-[220px] min-w-0 overflow-hidden">
            <BentoTile tile={tiles[1]} idx={1} lang={lang} layout="portrait" className="h-full !aspect-auto" />
          </div>
          <div className="aspect-[4/5] max-h-[220px] min-w-0 overflow-hidden">
            <BentoTile tile={tiles[2]} idx={2} lang={lang} layout="portrait" className="h-full !aspect-auto" />
          </div>
          <div className="col-span-2 aspect-[16/9] max-h-[180px] min-w-0 overflow-hidden">
            <BentoTile tile={tiles[3]} idx={3} lang={lang} layout="landscape" className="h-full !aspect-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
