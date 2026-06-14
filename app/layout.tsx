import type { Metadata, Viewport } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import './globals.css';

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
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
