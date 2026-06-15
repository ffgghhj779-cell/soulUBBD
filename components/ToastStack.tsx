'use client';

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast, ToastVariant } from '@/lib/useToast';

const STYLES: Record<
  ToastVariant,
  { accent: string; iconWrap: string; icon: React.ReactNode }
> = {
  success: {
    accent: 'bg-[#2e7d32]',
    iconWrap: 'bg-[#ecfdf5] text-[#2e7d32]',
    icon: <CheckCircle2 size={20} strokeWidth={2.25} />,
  },
  error: {
    accent: 'bg-[#c62828]',
    iconWrap: 'bg-[#ffebee] text-[#c62828]',
    icon: <AlertCircle size={20} strokeWidth={2.25} />,
  },
  info: {
    accent: 'bg-[#1b5e20]',
    iconWrap: 'bg-[#f0fdf4] text-[#1b5e20]',
    icon: <Info size={20} strokeWidth={2.25} />,
  },
};

export default function ToastStack() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      aria-live="polite"
      className="fixed inset-x-0 z-[200] flex flex-col items-center gap-2.5 px-4 pointer-events-none"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const s = STYLES[t.variant];
          return (
            <motion.div
              key={t.id}
              layout="position"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative flex w-full max-w-[min(100%,380px)] items-start gap-3 overflow-hidden rounded-2xl border border-[#2e7d32]/15 bg-white/95 px-4 py-3.5 shadow-[0_12px_40px_rgba(27,94,32,0.18),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md gpu-animate"
              style={{ fontFamily: 'var(--font-hanken, var(--font-tajawal), sans-serif)' }}
            >
              <div className={`absolute start-0 top-0 bottom-0 w-1 ${s.accent}`} />
              <div
                className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${s.iconWrap}`}
              >
                {s.icon}
              </div>
              <p className="flex-1 pt-1 text-sm font-semibold leading-snug text-[#1b5e20]">
                {t.message}
              </p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
                className="touch-press flex size-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-[#1b5e20]"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
