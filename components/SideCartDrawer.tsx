'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import type { CartProduct } from '@/lib/productTypes';

type Lang = 'ar' | 'en';

type CartItem = { product: CartProduct; qty: number };

type Props = {
  lang: Lang;
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: number | string, delta: number) => void;
  onRemove: (productId: number | string) => void;
  onCheckout: () => void;
};

const FREE_THRESHOLD = 200;

export default function SideCartDrawer({ lang, isOpen, cart, onClose, onUpdateQty, onRemove, onCheckout }: Props) {
  const isRtl = lang === 'ar';
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const progressPct = Math.min((cartTotal / FREE_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_THRESHOLD - cartTotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#1A1612]/60 backdrop-blur-[2px] z-[80] hardware-accelerated"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: '0%', transition: { type: 'spring', stiffness: 340, damping: 36 } }}
            exit={{ x: isRtl ? '-100%' : '100%', transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } }}
            className="fixed top-0 bottom-0 end-0 w-full max-w-[420px] z-[90] flex flex-col bg-[#FFF8F3] shadow-[0_0_60px_rgba(0,0,0,0.18)] hardware-accelerated"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            role="dialog" aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(201,160,61,0.15)] shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#C9A03D]" />
                <h2 className="text-xl font-medium text-[#1F1B15]" style={{ fontFamily: 'var(--font-eb-garamond, Georgia, serif)', letterSpacing: '-0.01em' }}>
                  {isRtl ? 'سلتي' : 'My Cart'}
                </h2>
                {cartCount > 0 && (
                  <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#C9A03D] text-[#1A1612] text-[11px] font-bold flex items-center justify-center">{cartCount}</span>
                )}
              </div>
              <button onClick={onClose} aria-label={isRtl ? 'إغلاق السلة' : 'Close cart'}
                className="w-10 h-10 rounded-full border border-[rgba(201,160,61,0.2)] flex items-center justify-center text-[#4A463F] hover:border-[#C9A03D] hover:text-[#C9A03D] smooth-transition touch-manipulation">
                <X size={16} />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="px-6 py-3 bg-[#FEF7ED] border-b border-[rgba(201,160,61,0.1)] shrink-0">
              <p className="text-xs font-medium text-[#4A463F] mb-2" style={{ fontFamily: 'var(--font-hanken)' }}>
                {remaining === 0
                  ? (isRtl ? '🎉 توصيل مجاني!' : '🎉 You have free delivery!')
                  : (isRtl ? `أضف ${remaining} ريال للتوصيل المجاني` : `Add SAR ${remaining} for free delivery`)}
              </p>
              <div className="h-1 bg-[#EAE1D7] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A03D] to-[#E8C468] rounded-full"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain hide-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#EAE1D7] flex items-center justify-center">
                    <ShoppingBag size={28} className="text-[#7B776E]" />
                  </div>
                  <p className="text-lg font-medium text-[#1F1B15]" style={{ fontFamily: 'var(--font-eb-garamond)' }}>
                    {isRtl ? 'سلتك فارغة' : 'Your cart is empty'}
                  </p>
                  <button onClick={onClose}
                    className="mt-2 px-6 py-3 rounded-full border border-[#C9A03D] text-[#C9A03D] text-sm font-semibold hover:bg-[#C9A03D] hover:text-[#1A1612] smooth-transition touch-manipulation min-h-[48px]"
                    style={{ fontFamily: 'var(--font-hanken)' }}>
                    {isRtl ? 'متابعة التسوق' : 'Continue Shopping'}
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[rgba(201,160,61,0.08)] px-6">
                  {cart.map(({ product, qty }) => (
                    <li key={product.id} className="flex gap-4 py-5">
                      <div className="relative w-16 h-16 rounded-[6px] overflow-hidden shrink-0 bg-[#EAE1D7]">
                        <Image src={product.image} alt={isRtl ? product.title_ar : product.title_en} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1F1B15] truncate mb-1" style={{ fontFamily: 'var(--font-hanken)' }}>
                          {isRtl ? product.title_ar : product.title_en}
                        </p>
                        <p className="text-[#C9A03D] font-bold text-sm" style={{ fontFamily: 'var(--font-hanken)' }}>
                          SAR {(product.price * qty).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-[rgba(201,160,61,0.25)] rounded-full overflow-hidden">
                            <button onClick={() => onUpdateQty(product.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-[#4A463F] hover:bg-[#EAE1D7] smooth-transition touch-manipulation" aria-label="Decrease">
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-sm font-bold text-[#1F1B15]" style={{ fontFamily: 'var(--font-hanken)' }}>{qty}</span>
                            <button onClick={() => onUpdateQty(product.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#4A463F] hover:bg-[#EAE1D7] smooth-transition touch-manipulation" aria-label="Increase">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button onClick={() => onRemove(product.id)}
                            className="flex items-center gap-1 text-[11px] text-[#7B776E] hover:text-[#B85C38] smooth-transition touch-manipulation"
                            style={{ fontFamily: 'var(--font-hanken)' }}>
                            <Trash2 size={11} />
                            {isRtl ? 'حذف' : 'Remove'}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="shrink-0 border-t border-[rgba(201,160,61,0.15)] px-6 py-5">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-[#4A463F]" style={{ fontFamily: 'var(--font-hanken)' }}>
                    {isRtl ? 'الإجمالي' : 'Subtotal'}
                  </span>
                  <span className="text-xl font-semibold text-[#1F1B15]" style={{ fontFamily: 'var(--font-eb-garamond)', letterSpacing: '-0.01em' }}>
                    SAR {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <button onClick={onCheckout}
                    className="w-full min-h-[52px] rounded-[8px] bg-[#1A1612] text-[#FEF7ED] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#2C2520] smooth-transition active:scale-[0.98] touch-manipulation shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                    style={{ fontFamily: 'var(--font-hanken)' }}>
                    {isRtl ? 'إتمام الطلب' : 'Secure Checkout'}
                    <ArrowRight size={16} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                  <button onClick={onClose}
                    className="w-full min-h-[44px] rounded-[8px] border border-[rgba(201,160,61,0.3)] text-[#4A463F] text-sm font-medium hover:border-[#C9A03D] hover:text-[#C9A03D] smooth-transition touch-manipulation"
                    style={{ fontFamily: 'var(--font-hanken)' }}>
                    {isRtl ? 'متابعة التسوق' : 'Continue Shopping'}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {['VISA', 'MADA', 'Apple Pay', 'STC Pay'].map(p => (
                    <div key={p} className="h-6 px-2 bg-[#EAE1D7]/60 border border-[rgba(201,160,61,0.15)] rounded text-[9px] font-bold text-[#7B776E] tracking-wider flex items-center">{p}</div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
