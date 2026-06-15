'use client';

import React from 'react';
import type { ShowcaseProduct } from '@/lib/productTypes';
import ShowcaseProductCard from '@/components/ShowcaseProductCard';
import { FadeInSection, FadeInItem } from '@/components/FadeInSection';

type Lang = 'ar' | 'en';

type ProductSectionProps = {
  id?: string;
  title: string;
  showIcon?: boolean;
  titleSerif?: boolean;
  products: ShowcaseProduct[];
  lang: Lang;
  isLoading?: boolean;
  onAddToCart: (product: ShowcaseProduct) => void;
  allProductsLabel?: string;
};

function ProductSkeleton() {
  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl md:rounded-xl overflow-hidden aspect-[4/5] shadow-sm flex flex-col"
      aria-hidden="true"
    >
      <div className="flex-[3] sg-shimmer" />
      <div className="flex-[2] p-4 space-y-2.5">
        <div className="h-3.5 sg-shimmer rounded-md w-[85%]" />
        <div className="h-3 sg-shimmer rounded-md w-[55%]" />
        <div className="h-3 sg-shimmer rounded-md w-[40%] mt-1" />
        <div className="h-9 sg-shimmer rounded-lg mt-3" />
      </div>
    </div>
  );
}

export default function ProductSection({
  id,
  title,
  showIcon = true,
  titleSerif = false,
  products,
  lang,
  isLoading = false,
  onAddToCart,
  allProductsLabel = 'ALL PRODUCTS',
}: ProductSectionProps) {
  const rtl = lang === 'ar';

  return (
    <FadeInSection as="section" id={id} className="py-6 md:py-8 px-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-1 gap-4">
        <div className="flex items-center gap-2 min-w-0">
          {showIcon && (
            <div className="bg-[#e8f4e8] border border-[#2e7d32] rounded px-1.5 py-1 flex items-center shrink-0">
              <span className="text-[#2e7d32] text-xs font-black leading-none">%</span>
            </div>
          )}
          <h2
            className={`premium-heading text-xl md:text-2xl font-bold text-[#1b5e20] tracking-tight ${titleSerif ? 'font-serif' : ''}`}
            style={titleSerif ? { fontFamily: 'var(--font-eb-garamond, Georgia, serif)' } : undefined}
          >
            {title}
          </h2>
        </div>
        <a
          href="#all-products"
          className="premium-ease touch-press bg-[#2e7d32] text-white text-xs md:text-sm font-bold px-5 md:px-6 py-2.5 md:py-3 min-h-[44px] inline-flex items-center rounded-full hover:bg-[#1b5e20] tracking-wide shrink-0 uppercase"
        >
          {allProductsLabel}
        </a>
      </div>
      <div className="w-12 h-0.5 bg-[#2e7d32] mb-6" />

      {isLoading && products.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <FadeInItem key={i} index={i}>
              <ProductSkeleton />
            </FadeInItem>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center leading-relaxed">
          {rtl ? 'لا توجد منتجات في هذا القسم حالياً' : 'No products in this section yet.'}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
            {products.map((product, i) => (
              <FadeInItem key={product.id} index={i}>
                <ShowcaseProductCard
                  product={product}
                  lang={lang}
                  onAddToCart={onAddToCart}
                />
              </FadeInItem>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="h-2 w-6 rounded-full bg-[#2e7d32]" aria-hidden="true" />
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-gray-300" aria-hidden="true" />
            ))}
          </div>
        </>
      )}
    </FadeInSection>
  );
}
