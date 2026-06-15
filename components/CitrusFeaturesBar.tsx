'use client';

import React from 'react';
import { Leaf, Truck, Package, BadgeCheck, CreditCard, Headphones } from 'lucide-react';
import { FadeInSection } from '@/components/FadeInSection';

type Lang = 'ar' | 'en';

type CitrusFeaturesBarProps = {
  lang: Lang;
};

const features = (rtl: boolean) => [
  {
    icon: Leaf,
    color: 'text-[#f47c2b]',
    label: rtl ? 'مخزون طازج يومياً' : 'Fresh Daily Stock',
  },
  {
    icon: Truck,
    color: 'text-[#2196f3]',
    label: rtl ? 'توصيل سريع في المملكة' : 'Fast Saudi Delivery',
  },
  {
    icon: Package,
    color: 'text-[#2e7d32]',
    label: rtl ? 'طلبات بالجملة' : 'Bulk Orders Available',
  },
  {
    icon: BadgeCheck,
    color: 'text-[#2e7d32]',
    label: rtl ? 'منتجات مفحوصة الجودة' : 'Quality Checked Products',
  },
  {
    icon: CreditCard,
    color: 'text-[#7b1fa2]',
    label: rtl ? 'دفع آمن بجميع البطاقات' : 'Safe Payment With Any Bank Card',
  },
  {
    icon: Headphones,
    color: 'text-[#2e7d32]',
    label: rtl ? 'دعم ٢٤/٧' : '24/7 Support Always Be There for You',
  },
];

export default function CitrusFeaturesBar({ lang }: CitrusFeaturesBarProps) {
  const rtl = lang === 'ar';
  const items = features(rtl);

  return (
    <FadeInSection as="section" delay={0.05} className="bg-white border-y border-gray-100 py-4 md:py-5">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 gap-3 md:flex md:gap-8 md:overflow-visible">
          {items.map(({ icon: Icon, color, label }) => (
            <div
              key={label}
              className="flex items-start gap-2.5 md:items-center md:flex-1 md:min-w-0 rounded-2xl md:rounded-none p-2 md:p-0 bg-gray-50/80 md:bg-transparent"
            >
              <Icon className={`size-5 md:size-6 shrink-0 mt-0.5 md:mt-0 ${color}`} strokeWidth={1.75} />
              <span className="text-[11px] md:text-xs font-semibold text-[#1b5e20] leading-relaxed">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}
