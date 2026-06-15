import type { Metadata, Viewport } from 'next';
import { Cairo, Tajawal, Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';
import { BRAND_LOGO_SRC } from '@/lib/brand';

const cairo = Cairo({
  weight: ['700', '800'],
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

const tajawal = Tajawal({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'arabic'],
  variable: '--font-tajawal',
  display: 'swap',
});

/** Premium serif — matches citrusf.com logo / heading style */
const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

/** Clean UI sans — matches citrusf.com body / buttons */
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soul Gold | صول الذهبية',
  description: 'Premium Intelligence & Inspiring Quality | The Gold of the Saudi Table.',
};

// Separate Viewport export — generates proper meta tag with viewport-fit=cover
// so iOS notch / Dynamic Island never clips the UI
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${cairo.variable} ${tajawal.variable} ${playfair.variable} ${roboto.variable}`}>
      <head>
        {/* Preconnect to font CDNs */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        {/* Preconnect to image CDNs — eliminates TCP handshake from LCP critical path */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload brand logo — LCP-critical header asset */}
        <link rel="preload" as="image" href={BRAND_LOGO_SRC} fetchPriority="high" />
      </head>
      <body className={`${roboto.className} premium-body antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
