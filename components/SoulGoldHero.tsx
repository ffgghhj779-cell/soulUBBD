/**
 * SoulGoldHero — Full-width cinematic hero per the Stitch mockup.
 *
 * Visual enhancements (all GPU-only: transform / opacity / clip-path / filter):
 *   • Hero image: clip-path center → full reveal on load (sg-img-hidden → sg-img-revealed)
 *   • Ambient breathing glow layer (sg-ambient-glow) behind image for 3D depth
 *   • Text stagger: eyebrow → headline lines → subtext → CTA (sg-title-reveal keyframe)
 *   • Magnetic CTA button: cursor-tracking subtle pull on desktop hover
 *
 * Performance: zero JS scroll listeners, zero layout-triggering properties,
 *              will-change applied only while magnetic is active.
 */
'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1800&q=85';

type SoulGoldHeroProps = {
  lang?: 'ar' | 'en';
  onShopClick?: () => void;
};

export default function SoulGoldHero({ lang = 'en', onShopClick }: SoulGoldHeroProps) {
  const isRtl = lang === 'ar';
  const heroRef = useRef<HTMLElement>(null);

  /* Image reveal state — transitions from sg-img-hidden → sg-img-revealed on load */
  const [imgRevealed, setImgRevealed] = useState(false);

  /* Magnetic button offset (desktop only) */
  const [mag, setMag] = useState({ x: 0, y: 0 });
  const isMagnetic = mag.x !== 0 || mag.y !== 0;

  /* Mount: add sg-hero-mounted to section → triggers CSS stagger animations */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add('sg-hero-mounted');

    /* Fallback: if image never fires onLoad (ad-blocker / network fail),
       reveal after 2.5 s so the page is never permanently blank.          */
    const fallback = setTimeout(() => setImgRevealed(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  const handleImageLoad = useCallback(() => {
    /* Tiny rAF delay so clip-path transition fires after paint */
    requestAnimationFrame(() => setImgRevealed(true));
  }, []);

  /* ── Magnetic button helpers ─────────────────────────────────────── */
  const handleBtnMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMag({
      x: (e.clientX - (r.left + r.width  / 2)) * 0.28,
      y: (e.clientY - (r.top  + r.height / 2)) * 0.28,
    });
  }, []);

  const handleBtnMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#2C2520';
    e.currentTarget.style.borderColor     = 'rgba(201,160,61,0.7)';
  }, []);

  const handleBtnMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setMag({ x: 0, y: 0 });
    e.currentTarget.style.backgroundColor = '#1A1612';
    e.currentTarget.style.borderColor     = 'rgba(201,160,61,0.35)';
  }, []);

  return (
    <section
      ref={heroRef}
      id="sg-hero"
      aria-label={isRtl ? 'القسم الرئيسي' : 'Hero — The Alchemy of Taste'}
      className="relative w-full overflow-hidden"
      style={{ height: 'min(100svh, 780px)', minHeight: '520px' }}
    >
      {/* ── Background image — clip-path reveal on load ──────────────── */}
      <Image
        src={HERO_IMAGE}
        alt={isRtl ? 'عسل يسقط على خبز أرتيزاني' : 'Artisan honey dripping on fresh bread'}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={`object-cover object-center sg-hero-img ${imgRevealed ? 'sg-img-revealed' : 'sg-img-hidden'}`}
        onLoad={handleImageLoad}
      />

      {/* ── Ambient glow — breathes slowly for cinematic 3D depth ─────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none sg-ambient-glow"
        style={{
          background:
            'radial-gradient(ellipse 65% 58% at 50% 50%, rgba(201,160,61,0.18) 0%, rgba(201,160,61,0.04) 45%, transparent 70%)',
        }}
      />

      {/* ── Multi-stop gradient overlay — legibility at all viewport sizes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(26,22,18,0.28) 0%, rgba(26,22,18,0.38) 40%, rgba(26,22,18,0.72) 75%, rgba(26,22,18,0.88) 100%)',
        }}
      />

      {/* ── Grain texture for depth ───────────────────────────────────── */}
      <div className="grain-overlay pointer-events-none" aria-hidden="true" />

      {/* ── Centred editorial block ───────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center">

        {/* Eyebrow — stagger line 0 */}
        <p
          className="sg-eyebrow mb-5 text-white/60 uppercase tracking-[0.32em] text-xs font-medium"
          style={{ fontFamily: 'var(--font-hanken, var(--font-tajawal), sans-serif)' }}
        >
          {isRtl ? 'مجموعة مختارة بعناية' : 'Soul Gold · Artisan Collection'}
        </p>

        {/* Display headline — EB Garamond, split into two stagger lines */}
        <h1
          className="text-white mb-5 leading-[1.1]"
          style={{
            fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(2.25rem, 6vw + 0.5rem, 4.5rem)',
          }}
        >
          {/* Line 1 */}
          <span className="sg-title-line sg-title-line-1 block">
            {isRtl ? 'كيمياء' : 'The Alchemy'}
          </span>
          {/* Line 2 */}
          <span className="sg-title-line sg-title-line-2 block italic-editorial">
            {isRtl ? 'الذوق' : 'of Taste'}
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="sg-sub-text text-white/75 max-w-[520px] mb-10 leading-[1.6]"
          style={{
            fontFamily: 'var(--font-hanken, var(--font-tajawal), sans-serif)',
            fontSize: 'clamp(0.9rem, 1.2vw + 0.5rem, 1.125rem)',
          }}
        >
          {isRtl
            ? 'اكتشف مكوّنات حرفية مختارة ترتقي بالطهي اليومي إلى تجربة فائقة الجودة.'
            : 'Discover curated artisanal ingredients that elevate everyday cooking into an extraordinary culinary experience.'}
        </p>

        {/* CTA — magnetic pull on desktop hover (sg-cta-wrap for stagger) */}
        <div className="sg-cta-wrap">
          <button
            onClick={onShopClick}
            onMouseMove={handleBtnMouseMove}
            onMouseEnter={handleBtnMouseEnter}
            onMouseLeave={handleBtnMouseLeave}
            className="group relative inline-flex items-center justify-center gap-2 px-9 min-h-[52px] rounded-sm font-semibold text-sm tracking-[0.12em] uppercase active:scale-95 touch-manipulation"
            style={{
              fontFamily: 'var(--font-hanken, var(--font-tajawal), sans-serif)',
              backgroundColor: '#1A1612',
              color: '#C9A03D',
              border: '1px solid rgba(201,160,61,0.35)',
              letterSpacing: '0.12em',
              transform: isMagnetic
                ? `translate(${mag.x}px, ${mag.y}px)`
                : undefined,
              transition:
                'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.25s ease, border-color 0.25s ease',
              willChange: isMagnetic ? 'transform' : 'auto',
            }}
            aria-label={isRtl ? 'تسوق المجموعة' : 'Shop the collection'}
          >
            {isRtl ? 'تسوق المجموعة' : 'SHOP THE COLLECTION'}
          </button>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-px bg-white/30"
            style={{ height: '48px', animation: 'sg-scroll-hint 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* ── Ken-burns + scroll hint keyframes ────────────────────────── */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sg-hero-mounted .sg-hero-img {
            animation: sg-ken-burns 18s ease-in-out infinite alternate;
          }
        }
        @keyframes sg-ken-burns {
          from { transform: scale(1);    }
          to   { transform: scale(1.05); }
        }
        @keyframes sg-scroll-hint {
          0%, 100% { opacity: 0.2; transform: scaleY(1);    }
          50%       { opacity: 0.7; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
