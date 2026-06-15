'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import type { ShowcaseProduct } from '@/lib/productTypes';
import { FadeInSection, FadeInItem } from '@/components/FadeInSection';

type Lang = 'ar' | 'en';

type RecentlyViewedProps = {
  lang: Lang;
  products: ShowcaseProduct[];
};

function formatPrice(price: number, rtl: boolean) {
  const amount = price.toFixed(2);
  return rtl ? `${amount} ريال` : `SAR ${amount}`;
}

export default function RecentlyViewed({ lang, products }: RecentlyViewedProps) {
  const rtl = lang === 'ar';
  const items = products.slice(0, 5);

  if (items.length === 0) return null;

  return (
    <FadeInSection as="section" className="py-8 px-4 max-w-[1400px] mx-auto">
      <h2 className="premium-heading text-xl md:text-2xl font-bold text-[#1a3c34] tracking-tight mb-1">
        {rtl ? 'شوهد مؤخراً' : 'Recently Viewed'}
      </h2>
      <div className="w-12 h-0.5 bg-[#2d6a4f] mb-5" />

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory scroll-smooth overscroll-x-contain">
        {items.map((product, i) => {
          const name = rtl ? product.name_ar : product.name_en;
          const unit = rtl ? product.sub_ar : product.sub_en;
          const discount = 10 + (product.id.length % 20);
          const sale = product.price;
          const original = sale * (1 + discount / 100);

          return (
            <FadeInItem key={product.id} index={i} className="flex-shrink-0 snap-start">
              <div className="w-[260px] sm:w-[300px] premium-ease premium-card-hover bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md touch-press">
                <div className="relative size-20 shrink-0">
                  <Image
                    src={product.image_url}
                    alt={name}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="premium-heading font-semibold text-[#1a3c34] text-sm tracking-tight truncate">{name}</h3>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="size-3 fill-[#f5a623] text-[#f5a623]" />
                    ))}
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xs text-gray-400 line-through">{formatPrice(original, rtl)}</span>
                    <span className="text-sm font-bold text-[#2d6a4f]">{formatPrice(sale, rtl)}</span>
                    {unit && <span className="text-xs text-gray-500 leading-relaxed">/ {unit}</span>}
                  </div>
                </div>
              </div>
            </FadeInItem>
          );
        })}
      </div>

      <div className="relative mt-6">
        <div className="border-t border-gray-100" />
        <div className="absolute start-0 top-0 w-16 h-0.5 bg-[#2d6a4f] -translate-y-px" />
      </div>
    </FadeInSection>
  );
}
