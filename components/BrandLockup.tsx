import Image from 'next/image';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '@/lib/brand';

type BrandLockupProps = {
  lang: 'ar' | 'en';
  brandTitle: string;
  brandSubtitle: string;
  /** header = nav · footer = green footer card · drawer = mobile menu */
  variant?: 'header' | 'footer' | 'drawer';
  priority?: boolean;
  compact?: boolean;
  className?: string;
};

const logoSize: Record<NonNullable<BrandLockupProps['variant']>, string> = {
  header: 'h-[62px] w-[62px] sm:h-16 sm:w-16 md:h-[60px] md:w-[60px]',
  footer: 'h-12 w-12 md:h-14 md:w-14',
  drawer: 'h-14 w-14 sm:h-16 sm:w-16',
};

const titleSize: Record<NonNullable<BrandLockupProps['variant']>, string> = {
  header: 'text-xl sm:text-2xl md:text-[1.65rem]',
  footer: 'text-xl md:text-2xl',
  drawer: 'text-2xl',
};

export default function BrandLockup({
  lang,
  brandTitle,
  brandSubtitle,
  variant = 'header',
  priority = false,
  compact = false,
  className = '',
}: BrandLockupProps) {
  const rtl = lang === 'ar';
  const tagline = rtl ? 'ذهب المائدة السعودية' : 'THE GOLD OF THE SAUDI TABLE';

  const logoClass = compact
    ? 'h-10 w-10 sm:h-11 sm:w-11'
    : logoSize[variant];
  const titleClass = compact
    ? 'text-base'
    : titleSize[variant];

  return (
    <div className={`flex items-center gap-2.5 md:gap-3 min-w-0 premium-ease gpu-animate ${className}`}>
      <div
        className={`relative shrink-0 rounded-xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden ${logoClass}`}
      >
        <Image
          src={BRAND_LOGO_SRC}
          alt={BRAND_LOGO_ALT}
          fill
          priority={priority}
          sizes="(max-width:640px) 72px, 80px"
          className="object-contain p-1.5"
        />
      </div>

      <div className={`flex min-w-0 flex-1 flex-col leading-tight border-s border-gray-100 ps-2.5 md:ps-3 ${compact ? 'ps-2' : ''}`}>
        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5 md:gap-1.5">
          <span
            className={`text-[#1b5e20] font-black tracking-tight leading-none ${titleClass}`}
            style={{
              fontFamily: rtl
                ? 'var(--font-cairo), sans-serif'
                : 'var(--font-eb-garamond), Georgia, "Times New Roman", serif',
            }}
          >
            {brandTitle}
          </span>
          <span
            className={`text-[#C9A03D] font-black tracking-tight leading-none ${titleClass}`}
            style={{
              fontFamily: rtl
                ? 'var(--font-cairo), sans-serif'
                : 'var(--font-eb-garamond), Georgia, "Times New Roman", serif',
            }}
          >
            {brandSubtitle}
          </span>
        </div>
        <span
          className={`text-[#2e7d32] mt-1 text-[9px] sm:text-[10px] font-bold leading-snug whitespace-normal ${
            rtl ? 'tracking-normal' : 'uppercase tracking-[0.12em]'
          } premium-ease ${compact ? 'hidden' : 'block'}`}
        >
          {tagline}
        </span>
      </div>
    </div>
  );
}
