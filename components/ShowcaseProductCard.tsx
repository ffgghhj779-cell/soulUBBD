'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Star, Minus, Plus } from 'lucide-react';
import type { ShowcaseProduct } from '@/lib/productTypes';

type Lang = 'ar' | 'en';

function formatPrice(price: number, rtl: boolean) {
  const amount = price.toFixed(2);
  return rtl ? `${amount} ريال` : `SAR ${amount}`;
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

function promoBadge(badge: string): 'HOT' | 'NEW' | 'SOLD OUT' | null {
  const upper = badge.toUpperCase();
  if (upper.includes('SOLD')) return 'SOLD OUT';
  if (upper.includes('HOT')) return 'HOT';
  if (upper.includes('NEW')) return 'NEW';
  return null;
}

function placeholderDiscount(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash + id.charCodeAt(i) * 7) % 35;
  return 8 + hash;
}

function placeholderRating(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash + id.charCodeAt(i) * 3) % 3;
  return 4 + hash * 0.5;
}

function isSoldOutDemo(id: string, badge: string | null) {
  if (badge === 'SOLD OUT') return true;
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash + id.charCodeAt(i)) % 11;
  return hash === 0;
}

type ShowcaseProductCardProps = {
  product: ShowcaseProduct;
  lang: Lang;
  onAddToCart: (product: ShowcaseProduct, qty?: number) => void;
};

const ShowcaseProductCard = memo(function ShowcaseProductCard({
  product,
  lang,
  onAddToCart,
}: ShowcaseProductCardProps) {
  const rtl = lang === 'ar';
  const [qty, setQty] = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 500);
  };

  const badgeRaw = rtl ? product.badge_ar : product.badge_en;
  const badge = promoBadge(badgeRaw);
  const unit = rtl ? product.sub_ar : product.sub_en;
  const category = rtl ? product.category_ar : product.category_en;
  const name = rtl ? product.name_ar : product.name_en;
  const discount = placeholderDiscount(product.id);
  const rating = placeholderRating(product.id);
  const soldOut = isSoldOutDemo(product.id, badge);
  const salePrice = formatPrice(product.price, rtl);
  const originalPrice = formatPrice(product.price * (1 + discount / 100), rtl);

  return (
    <article className="premium-ease premium-card-hover bg-white border border-gray-100 rounded-2xl md:rounded-xl overflow-hidden shadow-sm hover:shadow-md group flex flex-col h-full gpu-animate">
      <div className="relative pt-5 pb-2 px-3 md:pt-6 md:pb-3 md:px-4 flex items-center justify-center min-h-[210px] md:min-h-[200px] bg-white">
        {!soldOut && (
          <div className="absolute top-3 start-3 bg-[#f47c2b] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            -{discount}%
          </div>
        )}

        {badge && badge !== 'SOLD OUT' && (
          <div
            className={`absolute top-9 start-3 text-white text-xs font-bold px-3 py-1 rounded-full z-10 ${
              badge === 'HOT' ? 'bg-red-500' : 'bg-[#2e7d32]'
            }`}
          >
            {badge}
          </div>
        )}

        {soldOut && (
          <div className="absolute top-3 start-3 z-10">
            <span className="bg-white border border-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded">
              {rtl ? 'نفذت الكمية' : 'SOLD OUT'}
            </span>
          </div>
        )}

        <div className="relative w-full h-[185px] md:h-[160px]">
          <Image
            src={product.image_url}
            alt={name}
            fill
            loading="lazy"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
            className="object-contain object-center premium-ease group-hover:scale-[1.04] gpu-animate"
          />
        </div>
      </div>

      <div className="px-3 pb-3 md:px-4 md:pb-4 flex flex-col gap-1.5 md:gap-2 flex-1">
        <div>
          <h3 className="premium-heading font-bold text-[#1b5e20] text-[15px] md:text-[15px] tracking-tight line-clamp-2 md:line-clamp-1">{name}</h3>
          <p className="text-gray-400 text-[11px] md:text-xs mt-0.5 line-clamp-1 leading-relaxed">{category}</p>
        </div>

        <StarRating rating={rating} />

        <div className="flex items-baseline gap-1.5 flex-wrap">
          {!soldOut && (
            <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
          )}
          <span className="text-base md:text-[15px] font-bold text-[#2e7d32]">{salePrice}</span>
          {unit && <span className="text-xs text-gray-500 leading-relaxed">/ {unit}</span>}
        </div>

        <div className="mt-auto pt-1">
          {soldOut ? (
            <button
              type="button"
              className="w-full min-h-[48px] premium-ease touch-press bg-[#2e7d32] text-white text-sm font-bold py-3 md:py-2.5 rounded-2xl md:rounded-lg hover:bg-[#1b5e20]"
            >
              {rtl ? 'اقرأ المزيد' : 'READ MORE'}
            </button>
          ) : (
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
              <div className="flex items-center border border-[#2e7d32] rounded-2xl md:rounded-lg overflow-hidden shrink-0 self-center md:self-auto">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="touch-target touch-press premium-ease bg-[#2e7d32] text-white px-3.5 py-3 md:py-2.5 hover:bg-[#1b5e20]"
                  aria-label={rtl ? 'تقليل الكمية' : 'Decrease quantity'}
                >
                  <Minus className="size-4 md:size-3.5" />
                </button>
                <span className="px-3.5 md:px-3 text-sm font-semibold text-[#1b5e20] min-w-[2.25rem] text-center">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="touch-target touch-press premium-ease bg-[#2e7d32] text-white px-3.5 py-3 md:py-2.5 hover:bg-[#1b5e20]"
                  aria-label={rtl ? 'زيادة الكمية' : 'Increase quantity'}
                >
                  <Plus className="size-4 md:size-3.5" />
                </button>
              </div>
              <motion.button
                type="button"
                onClick={handleAdd}
                animate={addedFlash ? { scale: [1, 0.96, 1.02, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full min-h-[48px] md:min-h-0 flex-1 touch-press text-white text-xs font-bold py-3.5 md:py-2.5 rounded-2xl md:rounded-lg min-w-0 uppercase tracking-wide gpu-animate ${
                  addedFlash ? 'bg-[#1b5e20]' : 'bg-[#2e7d32] hover:bg-[#1b5e20]'
                }`}
              >
                {rtl ? 'أضف للسلة' : 'ADD TO CART'}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
});

export default ShowcaseProductCard;
