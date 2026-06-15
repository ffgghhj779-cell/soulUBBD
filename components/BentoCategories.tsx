'use client';

import React from 'react';
import Image from 'next/image';
import { CATEGORY_TILES, categoryImageUrl } from '@/lib/categories';
import { FadeInSection, FadeInItem } from '@/components/FadeInSection';

type Lang = 'ar' | 'en';

type BentoCategoriesProps = {
  lang: Lang;
  dict: { discover: string; discoverDesc?: string };
};

const TILE_BG = [
  'bg-gray-200',
  'bg-green-100',
  'bg-orange-50',
  'bg-gray-100',
  'bg-yellow-50',
  'bg-gray-100',
] as const;

export default function BentoCategories({ lang, dict }: BentoCategoriesProps) {
  return (
    <FadeInSection as="section" id="categories" className="py-8 px-4 max-w-[1400px] mx-auto">
      <h2 className="premium-heading text-xl md:text-2xl font-bold text-[#1a3c34] tracking-tight mb-1">
        {dict.discover}
      </h2>
      <div className="w-12 h-0.5 bg-[#2d6a4f] mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
        {CATEGORY_TILES.map((tile, idx) => (
          <FadeInItem key={tile.slug} index={idx}>
            <a
              href="#all-products"
              className="flex flex-col items-center group touch-manipulation premium-ease premium-card-hover"
            >
              <div
                className={`relative size-[110px] sm:size-[140px] md:size-[160px] rounded-2xl md:rounded-full overflow-hidden shadow-sm hover:shadow-md border border-gray-100 ${TILE_BG[idx % TILE_BG.length]}`}
              >
                <Image
                  src={categoryImageUrl(tile.image_file)}
                  alt={lang === 'ar' ? tile.name_ar : tile.name_en}
                  fill
                  loading="lazy"
                  sizes="160px"
                  className="object-cover object-center premium-ease group-hover:scale-[1.04]"
                />
                <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                  <span className="bg-white/95 text-[#1a3c34] text-[9px] sm:text-[10px] font-bold tracking-wide uppercase px-3 py-1 rounded shadow-sm">
                    {lang === 'ar' ? tile.name_ar : tile.name_en}
                  </span>
                </div>
              </div>
            </a>
          </FadeInItem>
        ))}
      </div>
    </FadeInSection>
  );
}
