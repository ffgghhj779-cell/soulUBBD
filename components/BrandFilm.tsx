/**
 * BrandFilm — Immersive editorial brand film break.
 *
 * Performance: native <video> only (no iframe/embed), GPU-safe overlays,
 * respects prefers-reduced-motion, lazy metadata preload.
 */
'use client';

import { useEffect, useRef } from 'react';

type Lang = 'ar' | 'en';

type BrandFilmProps = {
  lang?: Lang;
};

const VIDEO_SRC = '/brand/soul-gold-film.mp4';

export default function BrandFilm({ lang = 'en' }: BrandFilmProps) {
  const isRtl = lang === 'ar';
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Pause video when user prefers reduced motion */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (mq.matches) {
        video.pause();
        video.removeAttribute('autoplay');
      }
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <section
      id="brand-film"
      aria-label={isRtl ? 'فيلم العلامة التجارية' : 'Soul Gold brand film'}
      className="relative w-full overflow-hidden bg-[#1A1612]"
    >
      {/* Cinematic widescreen container */}
      <div className="relative w-full aspect-[21/9] max-h-[min(52vh,520px)] min-h-[200px]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Dark editorial overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/40 pointer-events-none"
        />

        {/* Subtle vignette for depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(26,22,18,0.35) 100%)',
          }}
        />

        {/* Centred editorial quote */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <p
            className="text-[10px] uppercase tracking-[0.38em] text-[#C9A03D]/80 mb-4 font-semibold"
            style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
          >
            {isRtl ? 'فيلم العلامة' : 'The Brand Film'}
          </p>
          <blockquote
            className="text-white max-w-[720px] leading-[1.15]"
            style={{
              fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
              fontSize: 'clamp(1.75rem, 5vw + 0.5rem, 3.5rem)',
              fontWeight: 500,
              letterSpacing: isRtl ? 0 : '-0.02em',
            }}
          >
            {isRtl ? 'جوهر صول الذهبية' : 'The Essence of Soul Gold'}
          </blockquote>
          <p
            className="mt-4 text-white/55 text-sm max-w-md leading-relaxed"
            style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
          >
            {isRtl
              ? 'حرفية تلتقي بالفخامة — من المزرعة إلى مائدتكم'
              : 'Where craft meets luxury — from farm to your finest table'}
          </p>
        </div>
      </div>
    </section>
  );
}
