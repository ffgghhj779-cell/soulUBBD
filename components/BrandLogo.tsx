import Image from 'next/image';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '@/lib/brand';

type BrandLogoProps = {
  /** header = nav bar · footer = obsidian lockup · drawer = mobile menu · inline = compact */
  variant?: 'header' | 'footer' | 'drawer' | 'inline';
  priority?: boolean;
  className?: string;
};

const variantClasses: Record<NonNullable<BrandLogoProps['variant']>, string> = {
  header: 'h-12 sm:h-14 md:h-16 lg:h-[4.5rem] w-auto max-h-[4.5rem]',
  footer: 'h-10 md:h-12 w-auto max-h-12',
  drawer: 'h-12 sm:h-14 w-auto max-h-14',
  inline: 'h-8 w-auto max-h-8',
};

/** Container padding + visibility lift per variant */
const variantWrapper: Record<NonNullable<BrandLogoProps['variant']>, string> = {
  header:
    'px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2 ' +
    'drop-shadow-[0_2px_10px_rgba(26,22,18,0.14)] drop-shadow-[0_0_18px_rgba(201,160,61,0.22)]',
  footer: '',
  drawer: 'px-1 py-1 drop-shadow-[0_2px_8px_rgba(26,22,18,0.12)]',
  inline: '',
};

const variantSizes: Record<NonNullable<BrandLogoProps['variant']>, string> = {
  header: '(max-width: 640px) 168px, (max-width: 1024px) 220px, 280px',
  footer: '(max-width: 640px) 120px, 180px',
  drawer: '(max-width: 640px) 160px, 200px',
  inline: '96px',
};

const variantDimensions: Record<
  NonNullable<BrandLogoProps['variant']>,
  { width: number; height: number }
> = {
  header: { width: 560, height: 224 },
  footer: { width: 240, height: 96 },
  drawer: { width: 400, height: 160 },
  inline: { width: 160, height: 64 },
};

export default function BrandLogo({
  variant = 'header',
  priority = false,
  className = '',
}: BrandLogoProps) {
  const dims = variantDimensions[variant];

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 will-change-transform ${variantWrapper[variant]} ${className}`}
      aria-hidden={false}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt={BRAND_LOGO_ALT}
        width={dims.width}
        height={dims.height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={variantSizes[variant]}
        className={`object-contain object-center ${variantClasses[variant]}`}
      />
    </span>
  );
}
