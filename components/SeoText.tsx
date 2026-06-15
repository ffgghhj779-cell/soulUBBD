'use client';

import { ChevronDown } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import { FadeInSection } from '@/components/FadeInSection';

type Lang = 'ar' | 'en';

export default function SeoText({ lang }: { lang: Lang }) {
  const rtl = lang === 'ar';

  if (rtl) {
    return (
      <FadeInSection as="section" className="py-10 px-4 max-w-[1400px] mx-auto">
        <h1 className="premium-heading text-2xl font-bold text-[#7cb342] tracking-tight mb-2">
          مورد منتجات طازجة في جدة والمملكة | صول الذهبية للتجارة
        </h1>
        <div className="w-16 h-0.5 bg-[#2e7d32] mb-5" />

        <p className="premium-heading font-bold text-[#1b5e20] text-sm tracking-tight mb-3">
          أفضل مورد للفواكه والخضروات والمستلزمات الغذائية في جدة
        </p>

        <div className="text-gray-700 text-sm leading-relaxed space-y-4">
          <p>
            <span className="text-[#2e7d32] font-medium">Soul Gold Trading — صول الذهبية للتجارة</span>{' '}
            شركة سعودية مسجلة (رقم السجل {COMPANY.registration.number}) مقرها{' '}
            {COMPANY.location.ar}. نوفر منتجات طازجة ومجمدة ومعلبات بجودة فاخرة
            للأسر والمطاعم ومتاجر التجزئة في جميع أنحاء المملكة.
          </p>
          <p>
            نلتزم بجودة لا تُضاهى وأسعار تنافسية وتوصيل موثوق — ذهب المائدة السعودية.
          </p>
          <p className="text-gray-400 text-xs italic leading-relaxed">
            {COMPANY.registration.vat.ar} · {COMPANY.registration.type.ar}
          </p>
        </div>

        <a
          href={COMPANY.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 premium-ease premium-btn-hover bg-[#2e7d32] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#1b5e20]"
        >
          تواصل عبر واتساب
          <ChevronDown className="size-4" />
        </a>
      </FadeInSection>
    );
  }

  return (
    <FadeInSection as="section" className="py-10 px-4 max-w-[1400px] mx-auto">
      <h1 className="premium-heading text-2xl font-bold text-[#7cb342] tracking-tight mb-2">
        Fresh Produce Supplier in Jeddah, Saudi Arabia | Soul Gold Trading
      </h1>
      <div className="w-16 h-0.5 bg-[#2e7d32] mb-5" />

      <p className="premium-heading font-bold text-[#1b5e20] text-sm tracking-tight mb-3">
        Premium fresh fruits, vegetables &amp; pantry essentials in Jeddah
      </p>

      <div className="text-gray-700 text-sm leading-relaxed space-y-4">
        <p>
          <span className="text-[#2e7d32] font-medium">Soul Gold Trading</span> is a Saudi{' '}
          {COMPANY.registration.type.en.toLowerCase()} (CR {COMPANY.registration.number}) based in{' '}
          {COMPANY.location.en}. We supply farm-fresh produce, frozen goods, and premium pantry
          essentials to households, restaurants, and retailers across the Kingdom.
        </p>
        <p>
          Recognized for uncompromising quality and reliable delivery — The Gold of the Saudi Table.
        </p>
        <p className="text-gray-400 text-xs italic leading-relaxed">
          {COMPANY.registration.vat.en} · {COMPANY.registration.status.en} · CR {COMPANY.registration.number}
        </p>
      </div>

      <a
        href={COMPANY.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 premium-ease premium-btn-hover bg-[#2e7d32] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#1b5e20]"
      >
        Contact on WhatsApp
        <ChevronDown className="size-4" />
      </a>
    </FadeInSection>
  );
}
