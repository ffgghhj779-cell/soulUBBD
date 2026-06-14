/**
 * SoulGoldHero — "The Alchemy of Taste"
 * High-res lifestyle background (honey) + dark gradient overlay + text stagger.
 */
'use client';

import type { CSSProperties } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1800&q=85';

const heroBgStyle: CSSProperties = {
  backgroundImage: `url('${HERO_IMAGE}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

type SoulGoldHeroProps = {
  lang?: 'ar' | 'en';
  onShopClick?: () => void;
};

export default function SoulGoldHero({ lang = 'en', onShopClick }: SoulGoldHeroProps) {
  const isRtl = lang === 'ar';
  const heroRef = useRef<HTMLElement>(null);

  const [mag, setMag] = useState({ x: 0, y: 0 });
  const isMagnetic = mag.x !== 0 || mag.y !== 0;

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add('sg-hero-mounted');
  }, []);

  const handleBtnMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMag({
      x: (e.clientX - (r.left + r.width / 2)) * 0.28,
      y: (e.clientY - (r.top + r.height / 2)) * 0.28,
    });
  }, []);

  const handleBtnMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = '#2C2520';
    e.currentTarget.style.borderColor = 'rgba(201,160,61,0.7)';
  }, []);

  const handleBtnMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setMag({ x: 0, y: 0 });
    e.currentTarget.style.backgroundColor = '#1A1612';
    e.currentTarget.style.borderColor = 'rgba(201,160,61,0.35)';
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label={isRtl ? 'القسم الرئيسي' : 'Hero — The Alchemy of Taste'}
      className="sg-hero-banner relative w-full overflow-hidden"
      style={{ height: 'min(100svh, 780px)', minHeight: '520px' }}
    >
      <div
        className="sg-hero-banner__bg absolute inset-0"
        style={heroBgStyle}
        role="img"
        aria-label={isRtl ? 'عسل يسقط على خبز أرتيزاني' : 'Artisan honey dripping on fresh bread'}
      />
      <div className="sg-hero-banner__gradient absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center">
        <p
          className="sg-eyebrow mb-5 text-white/70 uppercase tracking-[0.32em] text-xs font-medium"
          style={{ fontFamily: 'var(--font-hanken, var(--font-tajawal), sans-serif)' }}
        >
          {isRtl ? 'مجموعة مختارة بعناية' : 'Soul Gold · Artisan Collection'}
        </p>

        <h1
          className="text-white mb-5 leading-[1.1]"
          style={{
            fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(2.25rem, 6vw + 0.5rem, 4.5rem)',
          }}
        >
          <span className="sg-title-line sg-title-line-1 block">
            {isRtl ? 'كيمياء' : 'The Alchemy'}
          </span>
          <span className="sg-title-line sg-title-line-2 block italic-editorial">
            {isRtl ? 'الذوق' : 'of Taste'}
          </span>
        </h1>

        <p
          className="sg-sub-text text-white/85 max-w-[520px] mb-10 leading-[1.6]"
          style={{
            fontFamily: 'var(--font-hanken, var(--font-tajawal), sans-serif)',
            fontSize: 'clamp(0.9rem, 1.2vw + 0.5rem, 1.125rem)',
          }}
        >
          {isRtl
            ? 'اكتشف مكوّنات حرفية مختارة ترتقي بالطهي اليومي إلى تجربة فائقة الجودة.'
            : 'Discover curated artisanal ingredients that elevate everyday cooking into an extraordinary culinary experience.'}
        </p>

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
              transform: isMagnetic ? `translate(${mag.x}px, ${mag.y}px)` : undefined,
              transition:
                'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.25s ease, border-color 0.25s ease',
              willChange: isMagnetic ? 'transform' : 'auto',
            }}
            aria-label={isRtl ? 'تسوق المجموعة' : 'Shop the collection'}
          >
            {isRtl ? 'تسوق المجموعة' : 'SHOP THE COLLECTION'}
          </button>
        </div>

        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-px bg-white/40"
            style={{ height: '48px', animation: 'sg-scroll-hint 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes sg-scroll-hint {
          0%, 100% { opacity: 0.2; transform: scaleY(1); }
          50%       { opacity: 0.7; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
