type Lang = 'ar' | 'en';

type HeroLifestyleProps = {
  lang?: Lang;
};

export default function HeroLifestyle({ lang = 'en' }: HeroLifestyleProps) {
  const rtl = lang === 'ar';

  return (
    <section
      id="lifestyle-hero"
      aria-label={rtl ? 'أسلوب الحياة الفاخر' : 'Luxury lifestyle'}
      className="sg-lifestyle-solid"
    >
      <div className="sg-lifestyle-solid__stage">
        <div className="sg-lifestyle-solid__content">
          <p
            className="text-[10px] uppercase tracking-[0.42em] text-[#C9A03D] mb-4 font-semibold"
            style={{ fontFamily: 'var(--font-hanken, sans-serif)' }}
          >
            {rtl ? 'من المزرعة إلى المائدة' : 'Farm to Fine Table'}
          </p>
          <h2
            className="text-[#FEF7ED] leading-[1.08]"
            style={{
              fontFamily: 'var(--font-eb-garamond, Georgia, serif)',
              fontSize: 'clamp(1.875rem, 4vw + 0.5rem, 3.25rem)',
              fontWeight: 500,
              letterSpacing: rtl ? 0 : '-0.02em',
            }}
          >
            {rtl ? 'حيث تلتقي الحرفة بالفخامة' : 'Where Craft Meets Luxury'}
          </h2>
          <p
            className="mt-4 text-[#FEF7ED]/80 text-sm md:text-base max-w-lg mx-auto leading-relaxed"
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
