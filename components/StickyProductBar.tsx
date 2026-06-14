'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

type Lang = 'ar' | 'en';

export default function StickyProductBar({
  lang,
  productNameEn = 'Signature Collection',
  productNameAr = 'المجموعة المميزة',
  price = '200',
  onAddToCart,
  isVisible = false
}: {
  lang: Lang;
  productNameEn?: string;
  productNameAr?: string;
  price?: string;
  onAddToCart: () => void;
  isVisible: boolean;
}) {
  const isRtl = lang === 'ar';
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#1A1612] border-t border-[rgba(201,160,61,0.2)] shadow-[0_-8px_30px_rgba(0,0,0,0.25)] hardware-accelerated"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              {/* Optional tiny thumbnail here if we pass image */}
              <div className="flex flex-col">
                <span className="text-[#FEF7ED] font-semibold text-sm truncate max-w-[150px]" style={{ fontFamily: 'var(--font-eb-garamond, Georgia, serif)' }}>
                  {isRtl ? productNameAr : productNameEn}
                </span>
                <span className="text-[#C9A03D] text-xs font-bold tracking-wide" style={{ fontFamily: 'var(--font-hanken)' }}>
                  SAR {price}
                </span>
              </div>
            </div>
            
            <button
              onClick={onAddToCart}
              className="bg-[#C9A03D] text-[#1A1612] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest touch-manipulation sg-touch-fast hardware-accelerated"
              style={{ fontFamily: 'var(--font-hanken)' }}
            >
              {isRtl ? 'أضف للسلة' : 'Add to Cart'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
