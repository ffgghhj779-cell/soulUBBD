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
  const imageY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section
      ref={sectionRef}
      id="lifestyle-hero"
      aria-label={rtl ? 'أسلوب الحياة الفاخر' : 'Luxury lifestyle'}
      className="sg-lifestyle-banner"
    >
      <div className="sg-lifestyle-banner__stage">
        <motion.div
          className={`absolute inset-0 overflow-hidden ${isMobile ? '' : 'sg-ken-burns'}`}
          style={isMobile ? undefined : { y: imageY }}
        >
          <Image
            src={HERO_IMAGE}
            alt={rtl ? 'لحم بقري طازج فاخر من صول الذهبية' : 'Soul Gold premium fresh beef lifestyle'}
            fill
            loading="lazy"
            sizes="100vw"
            className="sg-lifestyle-banner__img"
          />
        </motion.div>

        <div className="sg-lifestyle-banner__veil" aria-hidden="true" />
        <div className="sg-lifestyle-banner__fade" aria-hidden="true" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6">
          <div className="sg-lifestyle-caption">
            <p
              className="text-[10px] uppercase tracking-[0.42em] text-[#C9A03D] mb-4 font-semibold"
              style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
            >
              {rtl ? 'من المزرعة إلى المائدة' : 'Farm to Fine Table'}
            </p>
            <h2
              className="text-white leading-[1.08]"
              style={{
                fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
                fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3.25rem)',
                fontWeight: 500,
                letterSpacing: rtl ? 0 : '-0.02em',
              }}
            >
              {rtl ? 'حيث تلتقي الحرفة بالفخامة' : 'Where Craft Meets Luxury'}
            </h2>
            <p
              className="mt-4 text-white/85 text-sm md:text-base max-w-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
            >
              {rtl
                ? 'منتجات سعودية فاخرة مختارة بعناية — لأصحاب الذوق الرفيع'
                : 'Curated Saudi premium essentials — for the refined palate'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
