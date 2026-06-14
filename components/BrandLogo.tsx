import Image from 'next/image';
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from '@/lib/brand';

type BrandLogoProps = {
  /** header = nav bar · footer = obsidian lockup · drawer = mobile menu · inline = compact */
  variant?: 'header' | 'footer' | 'drawer' | 'inline';
  priority?: boolean;
  className?: string;
};

const variantClasses: Record<NonNullable<BrandLogoProps['variant']>, string> = {
  header: 'h-9 sm:h-10 md:h-12 w-auto max-h-12',
  footer: 'h-10 md:h-12 w-auto max-h-12',
  drawer: 'h-10 w-auto max-h-10',
  inline: 'h-8 w-auto max-h-8',
};

export default function BrandLogo({
  variant = 'header',
  priority = false,
  className = '',
}: BrandLogoProps) {
  const isHeader = variant === 'header';

  return (
    <span
      className={`inline-flex items-center shrink-0 will-change-transform ${className}`}
      aria-hidden={false}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt={BRAND_LOGO_ALT}
        width={240}
        height={96}
        priority={priority || isHeader}
        fetchPriority={isHeader ? 'high' : undefined}
        sizes="(max-width: 640px) 120px, 180px"
        className={`object-contain object-center ${variantClasses[variant]}`}
      />
    </span>
  );
}
