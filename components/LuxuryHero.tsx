'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

type HeroDict = {
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroDesc: string;
  shopNow: string;
  tryAi: string;
  heroScroll: string;
  heroEditorial: string;
};

type Lang = 'ar' | 'en';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=900&q=80';

/** Simple reusable fade-up variant factory */
const fadeUp = (delay: number) =>
  ({
    initial: { opacity: 0, y: 44 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] as const },
  } as const);

export default function LuxuryHero({
  lang,
  dict,
  onShopNow,
}: {
  lang: Lang;
  dict: HeroDict;
  onShopNow: () => void;
}) {
  const isRtl = lang === 'ar';

  return (
    <section
      id="hero"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative w-full min-h-[100dvh] bg-[#1A1612] flex flex-col overflow-hidden"
    >
      {/* ── Ultra-thin gold shimmer at the very top ── */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,#C9A03D 40%,#F5E0A0 60%,#C9A03D 80%,transparent)' }}
        aria-hidden
      />

      {/* ── Warm depth gradients — pure CSS, zero JS ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(45,34,16,0.85) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(26,22,18,1) 0%, transparent 70%)',
        }}
      />

      {/* ── Giant watermark word — pure decoration ── */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-extrabold leading-none text-white"
          style={{ fontSize: 'clamp(180px, 55vw, 560px)', opacity: 0.028, letterSpacing: '-0.04em' }}
        >
          {isRtl ? 'صول' : 'SOUL'}
        </span>
      </div>

      {/* ──────────────────────────────────────────────────────────────
          MAIN LAYOUT
          Mobile:  stacked — type on top, arch image below
          Desktop: side by side — type takes ~55%, arch takes ~45%
      ────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center gap-8 md:gap-4 px-6 sm:px-10 md:px-16 pt-28 sm:pt-32 pb-10 md:pt-24 md:pb-10">

        {/* ═══════════════════════════════ TYPOGRAPHY SIDE ═══ */}
        <div className={`flex-1 flex flex-col justify-center ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>

          {/* Category badge */}
          <motion.div
            {...fadeUp(0.1)}
            className={`flex items-center gap-3 mb-7 ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <div className="h-px w-10 bg-[#C9A03D]/50" />
            <span className="text-[#C9A03D] text-[11px] font-extrabold uppercase tracking-[0.3em]">
              {dict.heroBadge}
            </span>
            <div className="h-px w-10 bg-[#C9A03D]/50" />
          </motion.div>

          {/* ─── Cascading headline ───
              Each word/phrase sits on its own line with a progressive
              horizontal indent — creating the "broken grid" editorial effect.
              Even on mobile the clamp() keeps it readable without overflow.
          ─── */}
          <div className="overflow-hidden mb-0.5">
            <motion.p
              {...fadeUp(0.2)}
              className="text-[#C9A03D] font-extrabold leading-[0.85]"
              style={{ fontSize: 'clamp(3.5rem, 13vw, 9.5rem)' }}
            >
              {dict.heroTitle1}
            </motion.p>
          </div>

          <div className="overflow-hidden mb-0.5">
            <motion.p
              {...fadeUp(0.35)}
              className="text-white font-extrabold leading-[0.85]"
              style={{
                fontSize: 'clamp(3.5rem, 13vw, 9.5rem)',
                marginInlineStart: 'clamp(1.25rem, 5vw, 4.5rem)',
              }}
            >
              {dict.heroTitle2}
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.p
              {...fadeUp(0.5)}
              className="text-[#C9A03D] font-extrabold leading-[0.85]"
              style={{
                fontSize: 'clamp(3.5rem, 13vw, 9.5rem)',
                marginInlineStart: 'clamp(2.5rem, 10vw, 9rem)',
              }}
            >
              {dict.heroTitle3}
            </motion.p>
          </div>

          {/* Sub copy */}
          <motion.p
            {...fadeUp(0.65)}
            className="text-white/45 text-sm sm:text-base leading-relaxed mt-8 max-w-[400px]"
          >
            {dict.heroDesc}
          </motion.p>

          {/* CTA button — gold border, wipe-fill on hover */}
          <motion.div {...fadeUp(0.78)} className="mt-10">
            <button
              onClick={onShopNow}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#C9A03D]/55 text-[#C9A03D] text-sm font-bold tracking-wide overflow-hidden min-h-[52px] touch-manipulation"
            >
              {/* Full-width fill slides in on hover */}
              <span
                className="absolute inset-0 bg-[#C9A03D] translate-x-full group-hover:translate-x-0 rtl:group-hover:-translate-x-0 rtl:-translate-x-full"
                style={{ transition: 'transform 0.48s cubic-bezier(0.22,1,0.36,1)' }}
                aria-hidden
              />
              <span className="relative z-10 group-hover:text-[#1A1612] transition-colors duration-200">
                {dict.shopNow}
              </span>
              <ArrowDown
                size={16}
                className="relative z-10 group-hover:text-[#1A1612] transition-colors duration-200"
              />
            </button>
          </motion.div>
        </div>

        {/* ═══════════════════════════════ ARCH IMAGE SIDE ═══ */}
        <div className="flex-shrink-0 flex items-center justify-center md:w-[44%] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            {/* Outer decorative ring — slightly larger than the arch */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                inset: '-6px',
                borderRadius: '50% 50% 28px 28px / 46% 46% 28px 28px',
                border: '1px solid rgba(201,160,61,0.18)',
                transform: 'scale(1.05)',
              }}
            />

            {/* The arch frame — the hero's visual centrepiece */}
            <div
              className="relative overflow-hidden"
              style={{
                width:  'clamp(200px, 36vw, 420px)',
                height: 'clamp(280px, 50vw, 560px)',
                borderRadius: '50% 50% 28px 28px / 46% 46% 28px 28px',
                boxShadow:
                  '0 0 100px rgba(201,160,61,0.14), 0 48px 96px rgba(0,0,0,0.55)',
              }}
            >
              <Image
                src={HERO_IMAGE}
                alt={dict.heroBadge}
                fill
                priority
                loading="eager"
                decoding="sync"
                className="object-cover"
                sizes="(max-width: 768px) 75vw, 40vw"
              />

              {/* Interior vignette — bottom to dark, top gold tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(26,22,18,0.72) 0%, transparent 50%, rgba(201,160,61,0.06) 100%)',
                }}
              />
            </div>

            {/* Edition pill — floats below the arch */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className={`absolute -bottom-5 inset-x-0 flex justify-center`}
            >
              <div
                className="bg-[#1A1612]/90 border border-[#C9A03D]/30 px-5 py-1.5 rounded-full"
                style={{ backdropFilter: 'blur(16px)' }}
              >
                <span className="text-[#C9A03D]/70 text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">
                  {dict.heroEditorial}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom status bar ── */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 md:px-16 py-5 border-t border-white/[0.06]">
        <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-bold">Soul Gold</span>

        {/* Animated scroll cue */}
        <motion.button
          type="button"
          onClick={onShopNow}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/30 hover:text-[#C9A03D] transition-colors min-h-[44px] min-w-[44px] justify-center touch-manipulation"
          aria-label={dict.heroScroll}
        >
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase hidden sm:block">{dict.heroScroll}</span>
          <ArrowDown size={15} />
        </motion.button>

        <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-bold hidden sm:block">
          {dict.heroEditorial}
        </span>
      </div>
    </section>
  );
}
