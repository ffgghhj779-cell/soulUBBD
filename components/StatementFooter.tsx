'use client';

import React, { useState } from 'react';
import { Send, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import BrandLockup from '@/components/BrandLockup';
import { COMPANY } from '@/lib/company';

type Lang = 'ar' | 'en';

type FooterDict = {
  footerDesc: string;
  quickLinks: string;
  contactUs: string;
  newsletter: string;
  newsletterDesc: string;
  emailPlaceholder: string;
  allRights: string;
  contactPhoneLabel: string;
  contactLocationLabel: string;
  support: string;
  shopAll: string;
  soulPlus: string;
  aboutUs: string;
  trackOrder: string;
  newsletterSuccess: string;
  companyRegTitle: string;
  crLabel: string;
  brandTitle: string;
  brandSubtitle: string;
};

type StatementFooterProps = {
  lang: Lang;
  dict: FooterDict;
};

const socials = [
  { href: COMPANY.social.instagram, Icon: Instagram, label: 'Instagram' },
  { href: COMPANY.social.twitter, Icon: Twitter, label: 'Twitter' },
  { href: COMPANY.social.facebook, Icon: Facebook, label: 'Facebook' },
];

function CompanyRegistration({ lang, dict }: { lang: Lang; dict: FooterDict }) {
  const rtl = lang === 'ar';
  const { registration: reg } = COMPANY;

  return (
    <div className="rounded-xl border border-white/25 bg-white/10 p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="size-11 rounded-full border border-white/35 flex items-center justify-center text-white shrink-0">
          <i className="fa-solid fa-building-columns text-[15px]" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.32em] uppercase text-white/75 mb-1">
            {dict.companyRegTitle}
          </p>
          <h4
            className="text-lg text-white font-medium"
            style={{ fontFamily: 'var(--font-eb-garamond, Georgia, serif)' }}
          >
            {rtl ? 'صول الذهبية للتجارة' : 'Soul Gold Trading'}
          </h4>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
            {dict.crLabel}
          </p>
          <p className="text-white font-semibold tracking-wide" dir="ltr">{reg.number}</p>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
            {rtl ? 'نوع الشركة' : 'Entity Type'}
          </p>
          <p className="text-white/90 text-sm leading-snug">
            {rtl ? reg.type.ar : reg.type.en}
          </p>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
            {rtl ? 'الحالة' : 'Status'}
          </p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <span className="size-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
            {rtl ? reg.status.ar : reg.status.en}
          </p>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
            {rtl ? 'الضريبة' : 'Tax Status'}
          </p>
          <p className="text-white/90 text-sm leading-snug">
            {rtl ? reg.vat.ar : reg.vat.en}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StatementFooter({ lang, dict }: StatementFooterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const rtl = lang === 'ar';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  const navLinks = [
    { label: dict.shopAll, href: '#all-products' },
    { label: dict.soulPlus, href: '#best-selling' },
    { label: dict.aboutUs, href: '#hero' },
    { label: dict.trackOrder, href: `tel:${COMPANY.phoneTel}` },
  ];

  return (
    <footer className="bg-[#9ccc65] text-white pb-safe">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="bg-white rounded-lg p-4 inline-block mb-4">
              <BrandLockup
                lang={lang}
                brandTitle={dict.brandTitle}
                brandSubtitle={dict.brandSubtitle}
                variant="footer"
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-xs">
              {dict.footerDesc}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[10px] font-extrabold tracking-[0.32em] uppercase text-white/70 mb-5">
              {dict.quickLinks}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/90 hover:text-white text-sm font-medium transition-colors touch-manipulation min-h-[44px] inline-flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-extrabold tracking-[0.32em] uppercase text-white/70 mb-5">
              {dict.contactUs}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${COMPANY.phoneTel}`} className="flex items-center gap-3 group min-h-[44px]">
                  <div className="size-10 rounded-full border border-white/25 flex items-center justify-center shrink-0 group-hover:border-white/50 transition-colors">
                    <i className="fa-solid fa-phone text-sm" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">
                      {dict.contactPhoneLabel}
                    </p>
                    <p className="text-white font-bold tracking-wide" dir="ltr">{COMPANY.phone}</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 min-h-[44px]">
                  <div className="size-10 rounded-full border border-white/25 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-location-dot text-sm" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">
                      {dict.contactLocationLabel}
                    </p>
                    <p className="text-white font-bold leading-snug">
                      {rtl ? COMPANY.location.ar : COMPANY.location.en}
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 group min-h-[44px]">
                  <div className="size-10 rounded-full border border-white/25 flex items-center justify-center shrink-0 group-hover:border-white/50 transition-colors">
                    <Mail size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">
                      {dict.support}
                    </p>
                    <p className="text-white font-bold">{COMPANY.email}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group min-h-[44px]"
                >
                  <div className="size-10 rounded-full border border-white/25 flex items-center justify-center shrink-0 group-hover:border-white/50 transition-colors">
                    <i className="fa-brands fa-whatsapp text-base" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">
                      WhatsApp
                    </p>
                    <p className="text-white font-bold" dir="ltr">{COMPANY.phone}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 bg-[#8bc34a] rounded-2xl px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-1">{dict.newsletter}</h3>
            <p className="text-white/90 text-sm">
              {submitted ? dict.newsletterSuccess : dict.newsletterDesc}
            </p>
          </div>
          <form onSubmit={submit} className="flex gap-2 w-full md:max-w-md shrink-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.emailPlaceholder}
              className="flex-1 rounded-full px-5 py-3 text-sm text-[#1a3c34] placeholder:text-gray-400 outline-none border-0 min-h-[48px]"
            />
            <button
              type="submit"
              aria-label={rtl ? 'اشتراك' : 'Subscribe'}
              className="size-12 rounded-full bg-[#1a3c34] text-white flex items-center justify-center hover:bg-[#287233] transition-colors shrink-0 touch-manipulation"
            >
              <Send size={18} className={rtl ? 'rotate-180' : ''} />
            </button>
          </form>
        </div>

        {/* Company registration */}
        <div className="mt-10">
          <CompanyRegistration lang={lang} dict={dict} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-white/80 text-xs tracking-wide font-medium text-center md:text-start">
            © {new Date().getFullYear()} {dict.allRights}
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="min-w-[44px] min-h-[44px] rounded-full border border-white/25 flex items-center justify-center text-white/80 hover:border-white hover:text-white transition-colors touch-manipulation"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {['VISA', 'MASTERCARD', 'MADA'].map((p) => (
              <div
                key={p}
                className="h-7 px-2.5 bg-white/10 border border-white/20 rounded-md flex items-center justify-center font-bold text-[10px] text-white/70 tracking-wider"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
