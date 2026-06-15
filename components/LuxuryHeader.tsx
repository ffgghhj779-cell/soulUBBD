'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart, Search, Menu, X, Globe, User, Heart, Check,
} from 'lucide-react';
import BrandLockup from '@/components/BrandLockup';

type Lang = 'ar' | 'en';

type HeaderDict = {
  home: string; shop: string; soulPlus: string; whyUs: string;
  language: string; brandTitle: string; brandSubtitle: string;
  searchHint?: string;
};

type MobileDict = HeaderDict & {
  [key: string]: string;
};

type LuxuryHeaderProps = {
  lang: Lang;
  dict: MobileDict;
  cartCount: number;
  isCheckingOut: boolean;
  isMobileMenuOpen: boolean;
  onOpenCheckout: () => void;
  onToggleLanguage: () => void;
  onScrollToProducts: () => void;
  onToggleMobileMenu: () => void;
  cartBump?: number;
};

const navLinks = (dict: HeaderDict) => [
  { label: dict.home, href: '#hero' },
  { label: dict.shop, href: '#categories' },
  { label: dict.soulPlus, href: '#best-selling' },
  { label: dict.whyUs, href: '#all-products' },
];

export default function LuxuryHeader({
  lang, dict, cartCount, isCheckingOut, isMobileMenuOpen,
  onOpenCheckout, onToggleLanguage, onScrollToProducts, onToggleMobileMenu,
  cartBump = 0,
}: LuxuryHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartFlash, setCartFlash] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (cartBump <= 0) return;
    setCartFlash(true);
    const timer = window.setTimeout(() => setCartFlash(false), 650);
    return () => window.clearTimeout(timer);
  }, [cartBump]);

  const onScroll = useCallback(() => {
    setIsCompact(window.scrollY > 56);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScrollToProducts();
  };

  const searchPlaceholder =
    dict.searchHint ?? (lang === 'ar' ? 'ابحث عن المنتجات' : 'Search for products');

  return (
    <>
      <header
        className={`glass-header mobile-header-shell border-b border-gray-100/90 sticky top-0 z-50 pt-safe shadow-sm gpu-animate ${
          isCompact ? 'is-compact' : ''
        }`}
      >
        <div
          className={`max-w-[1400px] mx-auto px-4 md:px-6 flex items-center gap-3 md:gap-6 premium-ease ${
            isCompact ? 'py-2' : 'py-3'
          }`}
        >
          <a href="#hero" className="flex-shrink-0 min-w-0 max-w-[200px] sm:max-w-none touch-press rounded-lg" aria-label={`${dict.brandTitle} ${dict.brandSubtitle}`}>
            <BrandLockup
              lang={lang}
              brandTitle={dict.brandTitle}
              brandSubtitle={dict.brandSubtitle}
              variant="header"
              compact={isCompact}
              priority
            />
          </a>

          {/* Search Bar — desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full ps-12 pe-4 py-3 rounded-full border border-gray-100 bg-white/90 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent premium-ease"
              />
            </div>
          </form>

          {/* Nav Actions */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0 ms-auto">
            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={lang === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
              className="hidden lg:flex items-center gap-2 text-sm text-gray-700 hover:text-[#2d6a4f] premium-ease touch-manipulation"
            >
              <Globe size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
              <span className="font-medium">{dict.language}</span>
            </button>

            <a
              href="#all-products"
              className="hidden lg:flex items-center gap-2 text-sm text-gray-700 hover:text-[#2d6a4f] premium-ease"
            >
              <User className="size-5" />
              <span className="font-medium">
                {lang === 'ar' ? 'تسجيل / دخول' : 'Login / Register'}
              </span>
            </a>

            <a href="#categories" className="relative hidden sm:block">
              <Heart className="size-6 text-gray-700 hover:text-[#287233] transition-colors" />
              <span className="absolute -top-1.5 -end-1.5 bg-[#287233] text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
                0
              </span>
            </a>

            <button
              type="button"
              onClick={onScrollToProducts}
              aria-label={lang === 'ar' ? 'بحث' : 'Search'}
              className="md:hidden touch-target touch-press flex items-center justify-center text-gray-700 hover:text-[#2d6a4f] rounded-full"
            >
              <Search className="size-5" />
            </button>

            <button
              type="button"
              onClick={onOpenCheckout}
              disabled={isCheckingOut}
              aria-label={
                lang === 'ar'
                  ? `عربة التسوق${cartCount > 0 ? ` (${cartCount})` : ''}`
                  : `Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`
              }
              className={`relative touch-target touch-press flex items-center justify-center rounded-full gpu-animate ${isCheckingOut ? 'opacity-50' : ''}`}
            >
              <motion.div
                animate={
                  cartFlash
                    ? { scale: [1, 1.14, 1], boxShadow: ['0 0 0 rgba(45,106,79,0)', '0 0 0 8px rgba(45,106,79,0.25)', '0 0 0 rgba(45,106,79,0)'] }
                    : { scale: isCompact ? 0.92 : 1 }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#2d6a4f] rounded-full size-10 md:size-10 flex items-center justify-center premium-ease hover:bg-[#1a3c34]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {cartFlash ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="size-5 text-white" strokeWidth={2.5} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="cart"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ShoppingCart className="size-5 text-white" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.span
                key={cartCount}
                initial={{ scale: 1.35 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-1 -end-1 bg-white border-2 border-[#2d6a4f] text-[#2d6a4f] text-[10px] font-bold rounded-full size-4 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            </button>

            <button
              type="button"
              className="lg:hidden touch-target touch-press flex items-center justify-center text-gray-700 hover:text-[#2d6a4f] rounded-full"
              onClick={onToggleMobileMenu}
              aria-label={
                isMobileMenuOpen
                  ? (lang === 'ar' ? 'إغلاق القائمة' : 'Close menu')
                  : (lang === 'ar' ? 'فتح القائمة' : 'Open menu')
              }
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form
          onSubmit={handleSearchSubmit}
          className={`md:hidden mobile-search-collapse px-4 max-h-20 overflow-hidden ${
            isCompact ? 'is-compact' : 'pb-3'
          }`}
        >
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full min-h-[44px] ps-11 pe-4 py-2.5 rounded-2xl border border-gray-100 bg-white/90 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent premium-ease"
            />
          </div>
        </form>
      </header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-40 lg:hidden bg-black/35 backdrop-blur-[2px]"
              onClick={onToggleMobileMenu}
            />

            <motion.div
              key="drawer"
              initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-drawer-panel fixed top-0 bottom-0 end-0 z-50 lg:hidden w-[min(100vw,340px)] h-[100dvh] flex flex-col pt-safe pb-safe bg-white/98 backdrop-blur-xl shadow-2xl overflow-y-auto overscroll-contain app-scroll"
            >
              <div className="h-1 w-full bg-[#2d6a4f]" />

              <div className="px-8 pt-10 pb-6 border-b border-gray-100">
                <BrandLockup
                  lang={lang}
                  brandTitle={dict.brandTitle}
                  brandSubtitle={dict.brandSubtitle}
                  variant="drawer"
                />
              </div>

              <nav className="flex-1 flex flex-col px-8 pt-6 gap-1 overflow-y-auto">
                {navLinks(dict).map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: lang === 'ar' ? -40 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={onToggleMobileMenu}
                    className="py-4 min-h-[52px] flex items-center border-b border-gray-100 text-lg font-semibold text-[#1a3c34] hover:text-[#2d6a4f] touch-press touch-target rounded-lg -mx-2 px-2"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="px-8 pb-10 pt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => { onToggleLanguage(); onToggleMobileMenu(); }}
                  aria-label={lang === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
                  className="w-full min-h-[52px] rounded-2xl bg-[#2d6a4f] text-white flex items-center justify-center gap-2 font-medium text-base hover:bg-[#1a3c34] touch-press touch-target"
                >
                  <Globe size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                  {dict.language}
                </button>
                <button
                  type="button"
                  onClick={() => { onOpenCheckout(); onToggleMobileMenu(); }}
                  aria-label={
                    lang === 'ar'
                      ? `عربة التسوق${cartCount > 0 ? ` (${cartCount})` : ''}`
                      : `Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`
                  }
                  className="w-full min-h-[52px] rounded-2xl border border-[#2d6a4f] text-[#2d6a4f] flex items-center justify-center gap-2 font-medium text-base hover:bg-[#ecfdf5] touch-press touch-target"
                >
                  <ShoppingCart size={18} />
                  {lang === 'ar' ? 'عربة التسوق' : 'Shopping Cart'}
                  {cartCount > 0 ? ` (${cartCount})` : ''}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
