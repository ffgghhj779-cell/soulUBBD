'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

type Lang = 'ar' | 'en';

const pairings = [
  {
    number: '01',
    dish_en: 'Seared Tuna with Citrus Vinaigrette',
    dish_ar: 'تونة مشوية بصلصة الحمضيات',
    product_en: 'Premium White Tuna',
    product_ar: 'تونة بيضاء فاخرة',
    chef_note_en: 'A Michelin-inspired pairing. The clean, buttery texture of our Atlantic tuna demands nothing more than a squeeze of lemon and a drizzle of cold-pressed olive oil.',
    chef_note_ar: 'توليفة بإلهام ميشلان. القوام الزبداني لتونتنا الأطلسية لا يحتاج أكثر من عصرة ليمون وزيت زيتون بكر.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=85',
  },
  {
    number: '02',
    dish_en: 'Layered Honey & Ghee Baklava',
    dish_ar: 'بقلاوة بالعسل والسمن',
    product_en: 'Artisan Golden Ghee',
    product_ar: 'سمن ذهبي حرفي',
    chef_note_en: 'Our ghee\'s single-origin depth transforms this classic pastry into an heirloom recipe. The high smoke point ensures a perfect, even bake every time.',
    chef_note_ar: 'عمق سمننا أحادي المصدر يحوّل هذه الحلوى الكلاسيكية إلى وصفة موروثة. درجة احتراق عالية تضمن خبزًا مثاليًا في كل مرة.',
    img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=85',
  },
  {
    number: '03',
    dish_en: 'Raw Honeycomb with Aged Cheese',
    dish_ar: 'شهد عسل طازج مع جبن معتق',
    product_en: 'Artisan Organic Honey',
    product_ar: 'عسل عضوي حرفي',
    chef_note_en: 'The wildflower complexity of our mountain honey bridges the sharpness of aged cheese with floral sweetness — a pairing centuries in the making.',
    chef_note_ar: 'تعقيد العسل الجبلي يجسّر حدة الجبن المعتق بحلاوة زهرية — توافق عمره قرون.',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85',
  },
];

export default function ChefPairings({ lang }: { lang: Lang }) {
  const isRtl = lang === 'ar';

  return (
    <section
      aria-label={isRtl ? 'توافقات الشيف' : "Chef's Pairings"}
      className="py-24 md:py-36 bg-[#FEF7ED] overflow-hidden"
    >
      <div className="grain-overlay pointer-events-none" aria-hidden="true" style={{ opacity: 0.04 }} />
      <div className="max-w-7xl mx-auto px-4 md:px-10">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p
              className="text-[11px] font-bold tracking-[0.38em] uppercase text-[#C9A03D] mb-3"
              style={{ fontFamily: 'var(--font-hanken)' }}
            >
              {isRtl ? 'من المطبخ إلى مائدتك' : 'From the Kitchen'}
            </p>
            <h2
              className="text-[#1F1B15]"
              style={{
                fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: isRtl ? 0 : '-0.015em',
              }}
            >
              {isRtl ? 'توافقات الشيف' : "Chef's Pairings"}
            </h2>
          </div>
          <p
            className="text-[#7B776E] max-w-xs text-sm leading-relaxed md:text-end"
            style={{ fontFamily: 'var(--font-hanken)' }}
          >
            {isRtl
              ? 'ثلاثة توافقات مختارة بعناية لإطلاق إمكانية منتجاتنا'
              : 'Three curated pairings to unlock the potential of our ingredients'}
          </p>
        </div>

        {/* Cards — horizontal scroll on mobile, 3-col on desktop */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible hide-scrollbar">
          {pairings.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="group relative shrink-0 w-[78vw] md:w-auto snap-start rounded-[4px] overflow-hidden cursor-pointer select-none aspect-[3/4] max-h-[480px]"
            >
              {/* Image — editorial magazine crop */}
              <Image
                src={p.img}
                alt={isRtl ? p.dish_ar : p.dish_en}
                fill
                loading="lazy"
                className="object-cover object-center group-hover:scale-[1.04] will-change-transform [transition:transform_0.75s_cubic-bezier(0.25,1,0.5,1)]"
                sizes="(max-width: 768px) 78vw, 33vw"
              />

              {/* Gradient overlay — ensures 100% text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                {/* Pairing number */}
                <p
                  className="text-[10px] font-bold tracking-[0.38em] uppercase text-[#C9A03D] mb-3"
                  style={{ fontFamily: 'var(--font-hanken)' }}
                >
                  PAIRING №{p.number}
                </p>

                {/* Dish name */}
                <h3
                  className="text-white mb-2"
                  style={{
                    fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {isRtl ? p.dish_ar : p.dish_en}
                </h3>

                {/* Product badge */}
                <span
                  className="inline-flex self-start items-center px-3 py-1.5 rounded-full bg-[#C9A03D]/20 border border-[#C9A03D]/30 text-[#C9A03D] text-[11px] font-semibold tracking-wide mb-4"
                  style={{ fontFamily: 'var(--font-hanken)' }}
                >
                  {isRtl ? p.product_ar : p.product_en}
                </span>

                {/* Chef note — revealed on hover */}
                <p
                  className="text-white/0 text-xs leading-relaxed group-hover:text-white/70 translate-y-2 group-hover:translate-y-0 smooth-transition mb-4 line-clamp-3"
                  style={{ fontFamily: 'var(--font-hanken)' }}
                >
                  {isRtl ? p.chef_note_ar : p.chef_note_en}
                </p>

                {/* View recipe link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[#C9A03D] text-xs font-semibold hover:gap-2.5 smooth-transition"
                  style={{ fontFamily: 'var(--font-hanken)' }}
                >
                  {isRtl ? 'عرض الوصفة' : 'View Recipe'}
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
