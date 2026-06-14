'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Bot, Sparkles, ArrowDown } from 'lucide-react';

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

const showcaseFrames = [
  {
    img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=900&q=80',
    label_ar: 'تونة بيضاء',
    label_en: 'White Tuna',
    rotate: -6,
    offsetY: 0,
    z: 30,
    size: 'lg' as const,
  },
  {
    img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=80',
    label_ar: 'زيت بكر',
    label_en: 'Virgin Oil',
    rotate: 8,
    offsetY: 48,
    z: 20,
    size: 'md' as const,
  },
  {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    label_ar: 'عسل جبلي',
    label_en: 'Mountain Honey',
    rotate: -3,
    offsetY: 96,
    z: 10,
    size: 'sm' as const,
  },
];

const titleStagger = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Static gold dust particle definitions ───────────────────────────────────
   Values are fixed (not random) to avoid SSR hydration mismatches.
   Three animation variants (a / b / c) provide motion variety.
───────────────────────────────────────────────────────────────────────────── */
const GOLD_PARTICLES = [
  { id: 0,  left: '7%',  top: '14%', size: 3, anim: 'gold-float-a', dur: '13s', del: '0s'   },
  { id: 1,  left: '22%', top: '70%', size: 2, anim: 'gold-float-b', dur: '17s', del: '2.2s' },
  { id: 2,  left: '38%', top: '38%', size: 4, anim: 'gold-float-c', dur: '11s', del: '4.5s' },
  { id: 3,  left: '54%', top: '80%', size: 2, anim: 'gold-float-a', dur: '20s', del: '1.1s' },
  { id: 4,  left: '67%', top: '20%', size: 3, anim: 'gold-float-b', dur: '15s', del: '6.0s' },
  { id: 5,  left: '81%', top: '56%', size: 2, anim: 'gold-float-c', dur: '19s', del: '3.3s' },
  { id: 6,  left: '90%', top: '33%', size: 4, anim: 'gold-float-a', dur: '12s', del: '7.5s' },
  { id: 7,  left: '15%', top: '87%', size: 2, anim: 'gold-float-b', dur: '16s', del: '0.8s' },
  { id: 8,  left: '47%', top: '11%', size: 3, anim: 'gold-float-c', dur: '14s', del: '5.2s' },
  { id: 9,  left: '74%', top: '88%', size: 2, anim: 'gold-float-a', dur: '18s', del: '2.8s' },
  { id: 10, left: '31%', top: '53%', size: 2, anim: 'gold-float-b', dur: '21s', del: '9.0s' },
  { id: 11, left: '61%', top: '43%', size: 3, anim: 'gold-float-c', dur: '10s', del: '4.0s' },
] as const;

/* ── Per-card light sweep delays — each card catches the light at a different
   moment, simulating a real spotlight moving across a jewelry display.      */
const SWEEP_DELAYS = ['0s', '1.8s', '3.6s'] as const;

function MagneticButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const shared =
    'inline-flex items-center justify-center gap-2 min-h-[52px] min-w-[52px] px-9 rounded-full font-extrabold text-lg smooth-transition touch-manipulation active:scale-95 hardware-accelerated';

  const motionStyle: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    willChange: position.x !== 0 || position.y !== 0 ? 'transform' : 'auto',
  };

  if (href) {
    return (
      <motion.a
        href={href}
        style={motionStyle}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`${shared} ${className ?? ''}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={motionStyle}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`${shared} ${className ?? ''}`}
    >
      {children}
    </motion.button>
  );
}

export default function LuxuryHero({
  lang,
  dict,
  onShopNow,
}: {
  lang: Lang;
  dict: HeroDict;
  onShopNow: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Detect mobile once on mount — no continuous polling ─────────────────
     Rules-of-hooks require unconditional hook calls, so useScroll /
     useTransform / useSpring are always created. Their values are only
     APPLIED to DOM elements when isMobile is false.  On mobile the
     MotionValues exist but are disconnected from the DOM, so Framer Motion
     never drives any repaints from them during scroll.                      */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY           = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const galleryY      = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const galleryRotate = useTransform(scrollYProgress, [0, 1], [0, lang === 'ar' ? -4 : 4]);
  const textY         = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacityFade   = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const smoothGalleryY = useSpring(galleryY, { stiffness: 90, damping: 22 });

  const titleWords = [dict.heroTitle1, dict.heroTitle2, dict.heroTitle3];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-20 md:pb-28"
    >
      {/* ════════════════════════════════════════════════════════════════
          LAYER 1 — Background atmosphere (parallax on scroll)
      ════════════════════════════════════════════════════════════════ */}
      {/* Desktop: parallax bg scroll. Mobile: static — no scroll listeners driving DOM. */}
      <motion.div style={isMobile ? undefined : { y: bgY }} className="absolute inset-0 -z-20" initial={false}>
        <div className="absolute inset-0 mesh-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/20 to-cream" />
        <div className="absolute top-[-10%] end-[-5%] w-[55vw] h-[55vw] rounded-full bg-primary-gold/20 blur-[140px] animate-aurora" />
        <div className="absolute bottom-[-15%] start-[-10%] w-[45vw] h-[45vw] rounded-full bg-terracotta/15 blur-[120px] animate-aurora-delayed" />
        <div className="absolute top-[30%] start-[20%] w-[30vw] h-[30vw] rounded-full bg-warm-brown/10 blur-[100px]" />
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════
          LAYER 2 — Gold dust particles (desktop only via CSS class).
          The `gold-particles-layer` class is display:none on ≤768px,
          saving 12 GPU compositor layers on mobile.
      ════════════════════════════════════════════════════════════════ */}
      <div className="gold-particles-layer absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {GOLD_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#C9A03D]"
            style={{
              left:     p.left,
              top:      p.top,
              width:    p.size,
              height:   p.size,
              animation: `${p.anim} ${p.dur} ease-in-out ${p.del} infinite`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          LAYER 3 — PREMIUM ADDITION: Corner vignette
          Pulls the eye inward toward the center content, like a cinema
          letterbox — purely CSS, zero JS or layout impact.
      ════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 85% 80% at 50% 45%, transparent 40%, rgba(26,22,18,0.38) 100%)',
        }}
      />

      <div className="grain-overlay pointer-events-none" aria-hidden="true" />

      {/* Editorial rule line */}
      <div className="absolute top-32 start-8 md:start-16 hidden lg:flex flex-col items-center gap-3 text-[10px] font-bold tracking-[0.35em] uppercase text-soft-charcoal/30">
        <span className="[writing-mode:vertical-rl] rotate-180">{dict.heroEditorial}</span>
        <span className="w-px h-24 bg-gradient-to-b from-primary-gold/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">

        {/* ── Main content row (text + desktop gallery) ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Typography column */}
          {/* Text: parallax + fade-on-scroll on desktop. Static on mobile. */}
          <motion.div
            style={isMobile ? undefined : { y: textY, opacity: opacityFade }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8"
            >
              <div className="absolute -inset-px rounded-full animated-gold-border opacity-80" />
              <div className="relative inline-flex items-center gap-2 glass-panel px-5 py-2.5 rounded-full text-dark-gold font-bold text-xs md:text-sm tracking-wide">
                <Sparkles size={14} className="text-primary-gold" />
                <span>{dict.heroBadge}</span>
              </div>
            </motion.div>

            <h1 className="mb-6 w-full">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={titleStagger}
                  className={`block text-editorial-hero font-extrabold ${
                    i === 1 ? 'text-primary-gold italic-editorial' : 'text-soft-charcoal'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="text-editorial-body text-soft-charcoal/65 max-w-lg mb-10 leading-relaxed"
            >
              {dict.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <MagneticButton
                onClick={onShopNow}
                className="bg-gradient-to-r from-primary-gold via-light-gold to-primary-gold bg-[length:200%_100%] hover:bg-[position:100%_0] text-obsidian luxury-shadow w-full sm:w-auto"
              >
                {dict.shopNow}
              </MagneticButton>
              <MagneticButton
                href="#ai-consultant"
                className="glass-panel text-soft-charcoal hover:bg-white/90 w-full sm:w-auto border border-[rgba(201,160,61,0.25)]"
              >
                <Bot size={22} className="text-primary-gold" />
                {dict.tryAi}
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════
              DESKTOP gallery (lg+): the original floating, tilted frames.
              PREMIUM ADDITION: each card now has a cinematic light sweep
              (`.card-sweep`) that passes over the image at staggered times,
              making the jewelry look like it's catching real studio light.
          ════════════════════════════════════════════════════════════ */}
          {/* Gallery: parallax spring on desktop. Static (no style) on mobile.
               mobile is `hidden lg:flex` anyway, but guard is here for safety. */}
          <motion.div
            style={isMobile ? undefined : { y: smoothGalleryY, rotate: galleryRotate }}
            className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative h-[520px] lg:h-[600px] items-center justify-center hardware-accelerated"
            initial={false}
          >
            <div className="relative w-full max-w-[520px] h-full">
              {showcaseFrames.map((frame, idx) => {
                const sizeClass =
                  frame.size === 'lg'
                    ? 'w-[68%] aspect-[3/4]'
                    : frame.size === 'md'
                      ? 'w-[48%] aspect-[4/5]'
                      : 'w-[38%] aspect-square';

                const positionClass =
                  idx === 0
                    ? 'top-0 end-4'
                    : idx === 1
                      ? 'top-[28%] start-2'
                      : 'bottom-4 end-[22%]';

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 60, rotate: frame.rotate - 12 }}
                    animate={{ opacity: 1, y: frame.offsetY, rotate: frame.rotate }}
                    transition={{ delay: 0.35 + idx * 0.18, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    /* whileHover registers a pointer listener even on mobile;
                       on touch devices it never fires but wastes a listener slot */
                    whileHover={isMobile ? undefined : { scale: 1.04, rotate: frame.rotate + (idx % 2 === 0 ? 2 : -2), zIndex: 40 }}
                    className={`absolute ${positionClass} ${sizeClass} jewelry-frame group cursor-pointer`}
                    style={{ zIndex: frame.z }}
                  >
                    {/* Hover glow halo */}
                    <div className="absolute -inset-3 rounded-[40px] bg-gradient-to-br from-primary-gold/30 via-transparent to-terracotta/20 blur-xl opacity-0 group-hover:opacity-100 smooth-transition" />

                    <div className="relative w-full h-full rounded-[36px] overflow-hidden border border-[rgba(201,160,61,0.35)] shadow-[0_25px_60px_rgba(26,22,18,0.18)]">
                      <Image
                        src={frame.img}
                        alt={lang === 'ar' ? frame.label_ar : frame.label_en}
                        fill
                        priority={idx === 0}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding={idx === 0 ? 'sync' : 'async'}
                        {...(idx === 0 ? { fetchPriority: 'high' as const } : {})}
                        className="object-cover scale-105 group-hover:scale-110 [transition:transform_0.7s_cubic-bezier(0.25,1,0.5,1)]"
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 42vw, 30vw"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/10 to-transparent" />

                      {/* ── Cinematic light sweep ──
                          A narrow, angled white gradient that slides across the
                          card every ~5.5 s (card-sweep CSS animation).
                          Each card uses a different delay so the sweep ripples
                          across the display like a moving studio spotlight.     */}
                      <div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-[36px]"
                        aria-hidden="true"
                      >
                        <div
                          className="absolute top-0 bottom-0 w-[28%] card-sweep"
                          style={{
                            animationDelay: SWEEP_DELAYS[idx],
                            background:
                              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 60%, transparent 100%)',
                          }}
                        />
                      </div>

                      <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                        <span className="text-white text-sm font-bold tracking-wide">
                          {lang === 'ar' ? frame.label_ar : frame.label_en}
                        </span>
                        <span className="w-8 h-px bg-primary-gold group-hover:w-14 smooth-transition" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Decorative orbit ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] rounded-full border border-primary-gold/10 animate-spin-slow" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            MOBILE gallery (< lg): zero-transform horizontal scroll strip.
            No absolute positioning, no rotation, no parallax — native
            momentum scroll for 60–120 FPS on all iOS/Android devices.
            touch-action is intentionally left at default (auto) so the
            browser handles ALL gestures natively without JS interference.
        ════════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden mt-8 -mx-4">
          <div
            className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-4 pb-4 pt-1"
            style={{ overscrollBehaviorX: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {showcaseFrames.map((frame, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                className="shrink-0 w-[68vw] max-w-[260px] snap-center"
              >
                <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden border border-[rgba(201,160,61,0.35)] shadow-[0_12px_32px_rgba(26,22,18,0.14)]">
                  <Image
                    src={frame.img}
                    alt={lang === 'ar' ? frame.label_ar : frame.label_en}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding={idx === 0 ? 'sync' : 'async'}
                    {...(idx === 0 ? { fetchPriority: 'high' as const } : {})}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 70vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                    <span className="text-white text-sm font-bold tracking-wide">
                      {lang === 'ar' ? frame.label_ar : frame.label_en}
                    </span>
                    <span className="w-6 h-px bg-primary-gold" />
                  </div>
                  <div className="absolute top-3 start-3 text-[10px] font-bold text-white/50 tracking-widest">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label={lang === 'ar' ? 'انتقل للأسفل' : 'Scroll down'}
        className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-soft-charcoal/40 hover:text-primary-gold smooth-transition group"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">{dict.heroScroll}</span>
        <ArrowDown size={18} className="animate-bounce-soft group-hover:text-primary-gold" />
      </motion.a>
    </section>
  );
}
