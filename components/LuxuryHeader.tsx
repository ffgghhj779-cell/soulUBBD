'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart, Search, Menu, X, Globe, Sparkles, Bot,
} from 'lucide-react';

type Lang = 'ar' | 'en';

type HeaderDict = {
  home: string; shop: string; soulPlus: string; whyUs: string;
  language: string; brandTitle: string; brandSubtitle: string;
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
};

const navLinks = (dict: HeaderDict) => [
  { label: dict.home,     href: '#hero' },
  { label: dict.shop,     href: '#categories' },
  { label: dict.soulPlus, href: '#ai-consultant', sparkle: true },
  { label: dict.whyUs,    href: '#quality' },
];

export default function LuxuryHeader({
  lang, dict, cartCount, isCheckingOut, isMobileMenuOpen,
  onOpenCheckout, onToggleLanguage, onScrollToProducts, onToggleMobileMenu,
}: LuxuryHeaderProps) {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isHidden,   setIsHidden]     = useState(false);
  const lastY   = useRef(0);
  const ticking = useRef(false);

  const onScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const y     = window.scrollY;
      const delta = y - lastY.current;
      setIsScrolled(y > 64);
      if (y > 120) {
        if (delta >  5) setIsHidden(true);
        if (delta < -4) setIsHidden(false);
      } else {
        setIsHidden(false);
      }
      lastY.current  = y;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const effectivelyHidden = isHidden && !isMobileMenuOpen;

  return (
    <>
      {/* ── Scroll-aware floating header ── */}
      <motion.div
        className="sticky top-0 z-50 px-4 md:px-8 pt-3 pt-safe w-full max-w-7xl mx-auto pointer-events-none"
        animate={{ y: effectivelyHidden ? '-115%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Gold shimmer border — appears once scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              key="shimmer-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
              className="absolute inset-0 rounded-[34px] pointer-events-none shimmer-border-wrap"
            />
          )}
        </AnimatePresence>

        {/* CSS class-based padding transition avoids JS-driven layout reflow */}
        <header
          className={`relative pointer-events-auto px-5 md:px-6 rounded-[32px] w-full flex items-center justify-between hardware-accelerated
            ${isScrolled ? 'py-2.5' : 'py-4'}
            ${isScrolled
              ? 'glass-panel shadow-[0_8px_40px_rgba(201,160,61,0.14)]'
              : 'bg-white/55 backdrop-blur-2xl border border-[rgba(201,160,61,0.12)] shadow-sm'
            }
            [transition:padding_0.35s_cubic-bezier(0.25,1,0.5,1),background-color_0.35s_cubic-bezier(0.25,1,0.5,1),box-shadow_0.35s_cubic-bezier(0.25,1,0.5,1)]`}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 cursor-pointer min-h-[48px] shrink-0 group">
            <motion.div
              animate={{ scale: isScrolled ? 0.8 : 1 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="origin-[0_50%]"
            >
              <Image
                unoptimized
                src="https://i.ibb.co/DfsWCMyW/edited-photo.png"
                alt="Soul Gold Logo"
                width={160}
                height={64}
                priority
                className="h-16 w-auto object-contain object-center"
              />
            </motion.div>
            <motion.div
              animate={{ opacity: isScrolled ? 0 : 1, maxWidth: isScrolled ? '0px' : '120px' }}
              transition={{ duration: 0.28 }}
              className="hidden sm:flex flex-col justify-center text-dark-gold border-s-2 border-light-gold ps-2 ms-1 overflow-hidden"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none whitespace-nowrap">
                {dict.brandTitle}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-1 whitespace-nowrap">
                {dict.brandSubtitle}
              </span>
            </motion.div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 font-medium text-soft-charcoal">
            {navLinks(dict).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative group/link hover:text-primary-gold smooth-transition flex items-center gap-1 py-1"
              >
                {item.label}
                {item.sparkle && <Sparkles size={13} className="text-terracotta" />}
                <span className="absolute -bottom-0.5 start-0 w-0 h-px bg-primary-gold group-hover/link:w-full smooth-transition rounded-full" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            <button
              onClick={onToggleLanguage}
              aria-label={lang === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
              className="hidden sm:flex items-center justify-center gap-1.5 min-w-[48px] min-h-[48px] px-3 rounded-full hover:bg-cream smooth-transition text-soft-charcoal touch-manipulation active:scale-95"
            >
              <Globe size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
              <span className="text-sm font-bold text-primary-gold">{dict.language}</span>
            </button>

            <button
              onClick={onScrollToProducts}
              aria-label="Browse products"
              className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-cream smooth-transition text-soft-charcoal touch-manipulation active:scale-95"
            >
              <Search size={20} />
            </button>

            <button
              onClick={onOpenCheckout}
              disabled={isCheckingOut}
              aria-label={lang === 'ar' ? `عربة التسوق${cartCount > 0 ? ` (${cartCount})` : ''}` : `Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
              className={`relative min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-cream smooth-transition text-soft-charcoal touch-manipulation active:scale-95 ${isCheckingOut ? 'opacity-50' : ''}`}
            >
              <ShoppingCart size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                    className="absolute top-1 end-1 bg-terracotta text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-cream smooth-transition text-soft-charcoal touch-manipulation active:scale-95 hardware-accelerated"
              onClick={onToggleMobileMenu}
              aria-label={isMobileMenuOpen
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
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </header>
      </motion.div>

      {/* ── Mobile full-screen immersive takeover ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden hardware-accelerated"
              style={{ background: 'rgba(26,22,18,0.7)', backdropFilter: 'blur(12px)' }}
              onClick={onToggleMobileMenu}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
              animate={{ x: '0%' }}
              exit={{   x: lang === 'ar' ? '-100%' : '100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] as const }}
              className="fixed top-0 bottom-0 end-0 z-50 md:hidden w-[min(100vw,340px)] h-[100dvh] flex flex-col pt-safe pb-safe hardware-accelerated shadow-2xl overflow-hidden overscroll-contain"
              style={{
                background: 'rgba(254,247,237,0.97)',
                /* 32px blur is a full-screen GPU readback on mobile.
                   6px is imperceptible at 97% background opacity but costs ~5x less. */
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                overscrollBehavior: 'contain',
              }}
            >
              {/* Top accent line */}
              <div className="h-1 w-full shimmer-bar" />

              {/* Brand mark */}
              <div className="px-8 pt-12 pb-6 border-b border-[rgba(201,160,61,0.15)]">
                <Image
                  unoptimized
                  src="https://i.ibb.co/DfsWCMyW/edited-photo.png"
                  alt="Soul Gold Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Staggered nav links */}
              <nav className="flex-1 flex flex-col px-8 pt-8 gap-1 overflow-y-auto">
                {navLinks(dict).map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: lang === 'ar' ? -40 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={onToggleMobileMenu}
                    className="group flex items-center justify-between py-4 border-b border-[rgba(201,160,61,0.1)] touch-manipulation active:scale-[0.98] smooth-transition"
                  >
                    <span className="font-extrabold text-2xl text-soft-charcoal group-hover:text-primary-gold smooth-transition">
                      {item.label}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.sparkle && <Bot size={22} className="text-primary-gold" />}
                      <span className="w-6 h-px bg-primary-gold/40 group-hover:w-10 smooth-transition" />
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom actions */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="px-8 pb-10 pt-6 flex flex-col gap-3"
              >
                <button
                  onClick={() => { onToggleLanguage(); onToggleMobileMenu(); }}
                  aria-label={lang === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
                  className="w-full min-h-[52px] rounded-full bg-soft-charcoal text-white flex items-center justify-center gap-2 font-bold text-base smooth-transition active:scale-95 touch-manipulation"
                >
                  <Globe size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                  {dict.language} / {lang === 'ar' ? 'English' : 'العربية'}
                </button>
                <button
                  onClick={() => { onOpenCheckout(); onToggleMobileMenu(); }}
                  aria-label={lang === 'ar' ? `عربة التسوق${cartCount > 0 ? ` (${cartCount})` : ''}` : `Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`}
                  className="w-full min-h-[52px] rounded-full glass-panel border border-[rgba(201,160,61,0.3)] text-soft-charcoal flex items-center justify-center gap-2 font-bold text-base smooth-transition active:scale-95 touch-manipulation"
                >
                  <ShoppingCart size={18} />
                  {cartCount > 0 ? `(${cartCount})` : ''}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
