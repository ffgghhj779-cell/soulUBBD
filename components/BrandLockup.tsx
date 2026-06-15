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
  header: 'h-[52px] w-[52px] sm:h-14 sm:w-14 md:h-[60px] md:w-[60px]',
  footer: 'h-12 w-12 md:h-14 md:w-14',
  drawer: 'h-12 w-12 sm:h-14 sm:w-14',
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
    ? 'h-9 w-9'
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
          sizes="64px"
          className="object-contain p-1"
        />
      </div>

      <div className={`flex flex-col leading-tight min-w-0 border-s border-gray-100 ps-2.5 md:ps-3 ${compact ? 'ps-2' : ''}`}>
        <div className="flex items-baseline gap-1 md:gap-1.5 flex-wrap">
          <span
            className={`text-[#1a3c34] font-black tracking-tight leading-none ${titleClass}`}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {brandTitle}
          </span>
          <span
            className={`text-[#C9A03D] font-black tracking-tight leading-none ${titleClass}`}
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {brandSubtitle}
          </span>
        </div>
        <span
          className={`text-[#2d6a4f] text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5 truncate premium-ease ${
            compact ? 'max-h-0 opacity-0 overflow-hidden mt-0' : 'max-h-4 opacity-100'
          }`}
        >
          {tagline}
        </span>
      </div>
    </div>
  );
}
