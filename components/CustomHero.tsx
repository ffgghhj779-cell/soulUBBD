'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

type Lang = 'ar' | 'en';

type CustomHeroDict = {
  badge: string;
  tagline: string;
  headline1: string;
  headline2: string;
  headline3: string;
  subtext: string;
  cta: string;
  ctaSecondary: string;
  productLabel: string;
  productSub: string;
};

const DEFAULT_DICT: Record<Lang, CustomHeroDict> = {
  ar: {
    badge: 'الذهب الأصيل',
    tagline: 'مجموعة ٢٠٢٦',
    headline1: 'جودة',
    headline2: 'لا تُضاهى',
    headline3: 'في كل قطرة',
    subtext: 'مختارة من أجود المصادر العالمية، لأصحاب الذوق الرفيع الذين يؤمنون بأن التميز ليس خياراً — بل أسلوب حياة.',
    cta: 'اكتشف المجموعة',
    ctaSecondary: 'تعرف علينا',
    productLabel: 'زيت الزيتون البكر',
    productSub: 'Extra Virgin · Cold Pressed',
  },
  en: {
    badge: 'Pure Authenticity',
    tagline: 'Collection 2026',
    headline1: 'Quality',
    headline2: 'Beyond',
    headline3: 'Compare',
    subtext: 'Sourced from the world\'s finest origins for the discerning palate — because excellence is not a choice, it is a way of life.',
    cta: 'Explore the Collection',
    ctaSecondary: 'Our Story',
    productLabel: 'Extra Virgin Olive Oil',
    productSub: 'Cold Pressed · Single Origin',
  },
};

/* ── Stagger variants ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 + i * 0.13, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.88, rotate: -4 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type CustomHeroProps = {
  lang: Lang;
  dict?: Partial<CustomHeroDict>;
  productImage?: string;
  onCta?: () => void;
};

export default function CustomHero({
  lang,
  dict: dictOverride,
  productImage = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
  onCta,
}: CustomHeroProps) {
  const dict = { ...DEFAULT_DICT[lang], ...dictOverride };
  const isRtl = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY   = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const imageRot = useTransform(scrollYProgress, [0, 1], [0, isRtl ? 3 : -3]);
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={sectionRef}
      id="custom-hero"
      aria-label={isRtl ? 'القسم الرئيسي' : 'Hero section'}
      className="relative overflow-hidden bg-cream min-h-[90svh] flex items-center"
    >
      {/* ── Background mesh ─────────────────────────────────────── */}
      <div className="absolute inset-0 mesh-hero -z-10" />
      {/* Large gold aura behind product side */}
      <div
        className="absolute -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          insetInlineEnd: '-8%',
          top: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,160,61,0.18) 0%, transparent 68%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Terracotta glow bottom-left */}
      <div
        className="absolute bottom-[-12%] -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          insetInlineStart: '-5%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,92,56,0.12) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      {/* Grain */}
      <div className="grain-overlay pointer-events-none" aria-hidden="true" />

      {/* ── Main grid ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 w-full py-28 md:py-32">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Editorial Typography ─────────────────────── */}
          <motion.div
            style={{ y: textY }}
            className={`flex flex-col items-start ${isRtl ? 'order-2 md:order-1' : 'order-2 md:order-1'}`}
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" animate="visible"
              className="relative mb-8"
            >
              <div className="absolute -inset-px rounded-full animated-gold-border opacity-70" />
              <div className="relative inline-flex items-center gap-2 glass-panel px-5 py-2.5 rounded-full text-dark-gold font-bold text-xs md:text-sm tracking-widest uppercase">
                <Sparkles size={13} className="text-primary-gold" />
                <span>{dict.badge}</span>
                <span className="text-primary-gold/40 mx-1">|</span>
                <span className="text-soft-charcoal/50">{dict.tagline}</span>
              </div>
            </motion.div>

            {/* Giant headline — each line staggered */}
            <h1 className="mb-8 w-full">
              {[dict.headline1, dict.headline2, dict.headline3].map((line, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  custom={i + 1}
                  initial="hidden"
                  animate="visible"
                  className={`block font-extrabold leading-none ${
                    i === 1
                      ? 'text-editorial-hero text-primary-gold italic-editorial'
                      : 'text-editorial-hero text-soft-charcoal'
                  }`}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Gold rule */}
            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate="visible"
              className="w-20 h-px bg-gradient-to-r from-primary-gold to-transparent mb-8"
            />

            {/* Body copy */}
            <motion.p
              variants={fadeUp} custom={5} initial="hidden" animate="visible"
              className="text-editorial-body text-soft-charcoal/60 max-w-md mb-10 leading-relaxed"
            >
              {dict.subtext}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp} custom={6} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              {/* Primary */}
              <button
                onClick={onCta}
                className="group inline-flex items-center justify-center gap-2 px-8 min-h-[54px] rounded-full font-extrabold text-base bg-gradient-to-r from-primary-gold via-light-gold to-primary-gold bg-[length:200%_100%] hover:bg-[position:100%_0] text-obsidian smooth-transition shadow-[0_8px_30px_rgba(201,160,61,0.35)] active:scale-95 touch-manipulation"
              >
                {dict.cta}
                <ArrowUpRight
                  size={18}
                  className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 smooth-transition"
                />
              </button>
              {/* Secondary */}
              <button
                className="inline-flex items-center justify-center gap-2 px-8 min-h-[54px] rounded-full font-bold text-base glass-panel text-soft-charcoal hover:bg-white/90 border border-[rgba(201,160,61,0.25)] smooth-transition active:scale-95 touch-manipulation"
              >
                {dict.ctaSecondary}
              </button>
            </motion.div>

            {/* Stat row */}
            <motion.div
              variants={fadeUp} custom={7} initial="hidden" animate="visible"
              className="flex items-center gap-8 mt-12 pt-8 border-t border-[rgba(201,160,61,0.18)] w-full"
            >
              {[
                { num: '100%', label: isRtl ? 'عضوي' : 'Organic' },
                { num: '+50K', label: isRtl ? 'عميل' : 'Clients' },
                { num: '15+', label: isRtl ? 'سنة خبرة' : 'Years' },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-extrabold text-2xl text-primary-gold leading-none">{num}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-soft-charcoal/45 mt-1">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Floating Product Image ──────────────────── */}
          <motion.div
            style={{ y: imageY, rotate: imageRot }}
            className={`relative flex items-center justify-center ${isRtl ? 'order-1 md:order-2' : 'order-1 md:order-2'}`}
            initial="hidden"
            animate="visible"
          >
            {/* Orbit decorative ring */}
            <div
              className="absolute rounded-full border border-primary-gold/12 animate-spin-slow pointer-events-none"
              aria-hidden="true"
              style={{ width: '90%', height: '90%' }}
            />
            <div
              className="absolute rounded-full border border-light-gold/8 pointer-events-none"
              aria-hidden="true"
              style={{ width: '75%', height: '75%' }}
            />

            {/* Main product frame — "breaks out" of the container */}
            <motion.div
              variants={imageReveal}
              className="relative z-10 w-[min(380px,88vw)] md:w-[420px] lg:w-[490px]"
            >
              {/* Glow behind */}
              <div
                className="absolute inset-[-10%] rounded-full pointer-events-none"
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(circle, rgba(201,160,61,0.22) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Card frame */}
              <div className="relative rounded-[40px] overflow-hidden border border-[rgba(201,160,61,0.30)] shadow-[0_40px_100px_rgba(26,22,18,0.14),0_10px_30px_rgba(201,160,61,0.12)]">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={productImage}
                    alt={dict.productLabel}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 88vw, (max-width: 1280px) 42vw, 490px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Cinematic bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/15 to-transparent" />

                  {/* Light sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none overflow-hidden card-sweep"
                    aria-hidden="true"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                    }}
                  />

                  {/* Product label bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-7">
                    <div className="w-10 h-px bg-primary-gold mb-3" />
                    <p className="text-white font-extrabold text-xl leading-tight">{dict.productLabel}</p>
                    <p className="text-white/50 text-xs tracking-widest uppercase mt-1">{dict.productSub}</p>
                  </div>
                </div>
              </div>

              {/* Floating badge — top-right, breaks out of frame */}
              <div
                className="absolute -top-5 -end-5 glass-panel rounded-[20px] px-4 py-3 shadow-lg border border-[rgba(201,160,61,0.3)]"
              >
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary-gold">Premium</p>
                <p className="font-extrabold text-soft-charcoal text-sm leading-none mt-0.5">
                  {isRtl ? 'درجة أولى' : 'Grade A+'}
                </p>
              </div>

              {/* Floating rating badge — bottom-left, breaks out */}
              <div
                className="absolute -bottom-5 -start-5 glass-panel rounded-[20px] px-4 py-3 shadow-lg border border-[rgba(201,160,61,0.3)]"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#C9A03D" aria-hidden="true">
                      <path d="M5 0l1.12 3.45h3.63L6.82 5.59l1.12 3.45L5 7.04l-2.94 2 1.12-3.45L.26 3.45h3.62z"/>
                    </svg>
                  ))}
                </div>
                <p className="font-extrabold text-soft-charcoal text-sm leading-none">4.9</p>
                <p className="text-[10px] text-soft-charcoal/40 tracking-widest">
                  {isRtl ? '٢.٤ ألف تقييم' : '2.4k reviews'}
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
