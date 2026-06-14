'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useMediaQuery } from '@/lib/useMediaQuery';

type Lang = 'ar' | 'en';

type HeroLifestyleProps = {
  lang?: Lang;
};

const HERO_IMAGE =
  '/products/WhatsApp%20Image%202026-06-14%20at%2011.06.56%20AM%20(4).jpeg';

export default function HeroLifestyle({ lang = 'en' }: HeroLifestyleProps) {
  const rtl = lang === 'ar';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={sectionRef}
      id="lifestyle-hero"
      aria-label={rtl ? 'أسلوب الحياة الفاخر' : 'Luxury lifestyle'}
      className="relative w-full overflow-hidden bg-[#1A1612]"
    >
      <div className="relative w-full h-[min(72vh,680px)] min-h-[320px]">
        <motion.div
          className={`absolute inset-0 ${isMobile ? '' : 'sg-ken-burns'} sg-animate-layer`}
          style={isMobile ? undefined : { y: imageY }}
        >
          <Image
            src={HERO_IMAGE}
            alt={rtl ? 'لحم بقري طازج فاخر من صول الذهبية' : 'Soul Gold premium fresh beef lifestyle'}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,22,18,0.55) 0%, rgba(26,22,18,0.25) 42%, rgba(26,22,18,0.72) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 30%, rgba(26,22,18,0.45) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #FEF7ED, transparent)',
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.42em] text-[#C9A03D]/90 mb-5 font-semibold"
            style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
          >
            {rtl ? 'من المزرعة إلى المائدة' : 'Farm to Fine Table'}
          </p>
          <h2
            className="text-white max-w-[760px] leading-[1.08]"
            style={{
              fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
              fontSize: 'clamp(2rem, 5vw + 0.5rem, 3.75rem)',
              fontWeight: 500,
              letterSpacing: rtl ? 0 : '-0.02em',
            }}
          >
            {rtl ? 'حيث تلتقي الحرفة بالفخامة' : 'Where Craft Meets Luxury'}
          </h2>
          <p
            className="mt-5 text-white/60 text-sm md:text-base max-w-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
          >
            {rtl
              ? 'منتجات سعودية فاخرة مختارة بعناية — لأصحاب الذوق الرفيع'
              : 'Curated Saudi premium essentials — for the refined palate'}
          </p>
        </div>
      </div>
    </section>
  );
}
