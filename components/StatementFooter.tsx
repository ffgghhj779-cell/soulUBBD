'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Send, Instagram, Twitter, Facebook, Phone, Mail } from 'lucide-react';

type Lang = 'ar' | 'en';

type FooterDict = {
  footerDesc: string;
  quickLinks: string; contactUs: string; newsletter: string;
  newsletterDesc: string; emailPlaceholder: string;
  allRights: string; tollFree: string; support: string;
  shopAll: string; soulPlus: string; aboutUs: string; trackOrder: string;
  newsletterSuccess: string;
};

type StatementFooterProps = {
  lang: Lang;
  dict: FooterDict;
};

const socials = [
  { href: 'https://instagram.com', Icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com',   Icon: Twitter,   label: 'Twitter'   },
  { href: 'https://facebook.com',  Icon: Facebook,  label: 'Facebook'  },
];

export default function StatementFooter({ lang, dict }: StatementFooterProps) {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  const brandName = lang === 'ar' ? 'صول الذهبية' : 'Soul Gold';
  const tagline   = lang === 'ar'
    ? 'ذهب المائدة السعودية'
    : 'The Gold of the Saudi Table';

  const navLinks = [
    { label: dict.shopAll,    href: '#products'      },
    { label: dict.soulPlus,   href: '#ai-consultant' },
    { label: dict.aboutUs,    href: '#quality'       },
    { label: dict.trackOrder, href: 'tel:920012345'  },
  ];

  return (
    <footer className="relative bg-obsidian text-white overflow-hidden pb-safe">

      {/* ── Grain noise overlay ── */}
      <div className="grain-overlay pointer-events-none" aria-hidden="true"
           style={{ opacity: 0.06 }} />

      {/* ── Atmospheric glows ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 start-[8%] w-[520px] h-[520px] rounded-full bg-primary-gold/8 blur-[180px]" />
        <div className="absolute bottom-0 end-[4%] w-[400px] h-[400px] rounded-full bg-terracotta/6 blur-[150px]" />
      </div>

      {/* ── Cinematic typographic lockup ── */}
      <div className="relative px-4 md:px-10 pt-24 pb-14 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-extrabold tracking-[0.38em] uppercase text-primary-gold mb-7"
          >
            {lang === 'ar' ? 'منذ ٢٠٢٠' : 'Est. 2020'}
          </motion.p>

          {/* Giant brand name — clips to container width */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="statement-brand font-extrabold text-white leading-[0.9] select-none"
            >
              {brandName}
            </motion.h2>
          </div>

          {/* Tagline + logo lockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8"
          >
            <p className="text-white/30 text-lg md:text-xl font-light italic tracking-wide">
              {tagline}
            </p>
            <div className="sm:ms-auto shrink-0">
              <Image
                unoptimized
                src="https://i.ibb.co/DfsWCMyW/edited-photo.png"
                alt="Soul Gold"
                width={100}
                height={40}
                className="h-10 w-auto object-contain brightness-0 invert opacity-25"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Gold divider with central mark ── */}
      <div className="relative max-w-7xl mx-auto flex items-center gap-6 px-4 md:px-10 py-10">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-gold/40 to-transparent" />
        <div className="shrink-0 w-10 h-10 rounded-full border border-primary-gold/25 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary-gold/60" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary-gold/40 to-transparent" />
      </div>

      {/* ── Three-column utility grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">

          {/* Quick links */}
          <div>
            <h5 className="text-[10px] font-extrabold tracking-[0.32em] uppercase text-white/35 mb-7">
              {dict.quickLinks}
            </h5>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-3 text-white/55 hover:text-white smooth-transition touch-manipulation min-h-[44px]"
                  >
                    <span className="w-5 h-px bg-primary-gold/35 group-hover:w-8 group-hover:bg-primary-gold smooth-transition shrink-0" />
                    <span className="font-medium">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[10px] font-extrabold tracking-[0.32em] uppercase text-white/35 mb-7">
              {dict.contactUs}
            </h5>
            <ul className="space-y-5">
              <li>
                <a href="tel:920012345" className="flex items-center gap-4 group min-h-[44px]">
                  <div className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-primary-gold group-hover:border-primary-gold/60 smooth-transition shrink-0">
                    <Phone size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                      {dict.tollFree}
                    </p>
                    <p className="text-white font-bold tracking-wide" dir="ltr">9200 12345</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:support@soul.sa" className="flex items-center gap-4 group min-h-[44px]">
                  <div className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-primary-gold group-hover:border-primary-gold/60 smooth-transition shrink-0">
                    <Mail size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                      {dict.support}
                    </p>
                    <p className="text-white font-bold">support@soul.sa</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-[10px] font-extrabold tracking-[0.32em] uppercase text-white/35 mb-7">
              {dict.newsletter}
            </h5>
            <p className="text-white/45 text-sm mb-5 leading-relaxed">
              {submitted ? dict.newsletterSuccess : dict.newsletterDesc}
            </p>
            <form onSubmit={submit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.emailPlaceholder}
                className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 min-h-[48px] text-sm text-white placeholder:text-white/25 outline-none focus:border-primary-gold/50 smooth-transition"
              />
              <button
                type="submit"
                className="min-w-[48px] min-h-[48px] rounded-xl bg-primary-gold hover:bg-light-gold text-obsidian flex items-center justify-center smooth-transition active:scale-95 touch-manipulation shrink-0"
              >
                <Send size={17} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/[0.07] px-4 md:px-10 py-7 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

        <p className="text-white/25 text-xs tracking-widest font-medium">
          © {new Date().getFullYear()} {dict.allRights}
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 hover:border-primary-gold/60 hover:text-primary-gold smooth-transition active:scale-95 touch-manipulation"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Payment badges */}
        <div className="flex items-center gap-2">
          {['VISA', 'MASTERCARD', 'MADA'].map((p) => (
            <div
              key={p}
              className="h-7 px-2.5 bg-white/[0.05] border border-white/[0.1] rounded-md flex items-center justify-center font-bold text-[10px] text-white/30 tracking-wider"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
