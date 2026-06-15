'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, ShoppingBag } from 'lucide-react';
import type { CartProduct } from '@/lib/productTypes';
import {
  buildWhatsAppOrderMessage,
  redirectToWhatsAppCheckout,
  type CheckoutCartItem,
} from '@/lib/whatsappCheckout';

type Lang = 'ar' | 'en';

type Props = {
  lang: Lang;
  isOpen: boolean;
  cart: CheckoutCartItem[];
  onClose: () => void;
  onSuccess: () => void;
};

export default function WhatsAppCheckout({ lang, isOpen, cart, onClose, onSuccess }: Props) {
  const isRtl = lang === 'ar';
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const labels = isRtl
    ? {
        title: 'إتمام الطلب',
        subtitle: 'أدخل بياناتك وسنحوّلك إلى واتساب لتأكيد الطلب',
        summary: 'ملخص الطلب',
        items: 'عدد القطع',
        total: 'الإجمالي',
        submit: 'إرسال الطلب عبر واتساب',
        name: 'الاسم بالكامل',
        phone: 'رقم الهاتف',
        address: 'العنوان بالتفصيل',
        notes: 'ملاحظات',
        namePh: 'الاسم بالكامل',
        phonePh: 'رقم الهاتف',
        addressPh: 'العنوان بالتفصيل',
        notesPh: 'ملاحظات (اختياري)',
        required: 'يرجى تعبئة جميع الحقول المطلوبة',
      }
    : {
        title: 'Checkout',
        subtitle: 'Enter your details — we will open WhatsApp to confirm your order',
        summary: 'Order Summary',
        items: 'Total items',
        total: 'Total price',
        submit: 'Send Order via WhatsApp',
        name: 'Full Name (الاسم بالكامل)',
        phone: 'Phone Number (رقم الهاتف)',
        address: 'Full Address (العنوان بالتفصيل)',
        notes: 'Notes (ملاحظات)',
        namePh: 'الاسم بالكامل',
        phonePh: 'رقم الهاتف',
        addressPh: 'العنوان بالتفصيل',
        notesPh: 'ملاحظات',
        required: 'Please fill in all required fields',
      };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || cart.length === 0) {
      alert(labels.required);
      return;
    }

    setIsSubmitting(true);

    const message = buildWhatsAppOrderMessage({
      lang,
      form: { fullName, phone, address, notes },
      cart,
      total: cartTotal,
    });

    redirectToWhatsAppCheckout(message);

    setFullName('');
    setPhone('');
    setAddress('');
    setNotes('');
    setIsSubmitting(false);
    onSuccess();
    onClose();
  };

  const inputClass =
    'w-full min-h-[48px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1b5e20] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2e7d32] focus:border-transparent premium-ease';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#1b5e20]/40 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            key="checkout-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pointer-events-none"
          >
            <div className="pointer-events-auto flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5] text-[#2e7d32]">
                  <ShoppingBag className="size-5" />
                </div>
                <div className="min-w-0">
                  <h2 id="checkout-title" className="premium-heading truncate text-lg font-bold text-[#1b5e20]">
                    {labels.title}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-1">{labels.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={isRtl ? 'إغلاق' : 'Close'}
                className="touch-target touch-press flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-[#2e7d32] hover:text-[#2e7d32]"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto overscroll-contain drawer-scroll px-5 py-4 space-y-4">
                <div className="rounded-2xl border border-[#2e7d32]/15 bg-[#f0fdf4]/80 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#2e7d32] mb-3">
                    {labels.summary}
                  </p>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">{labels.items}</span>
                    <span className="font-bold text-[#1b5e20]">{cartCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{labels.total}</span>
                    <span className="text-xl font-bold text-[#2e7d32]">
                      {isRtl
                        ? `${cartTotal.toLocaleString('ar-SA')} ر.س`
                        : `SAR ${cartTotal.toLocaleString('en-US')}`}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1 border-t border-[#2e7d32]/10 pt-3 max-h-28 overflow-y-auto hide-scrollbar">
                    {cart.map(({ product, qty }) => (
                      <li key={product.id} className="text-xs text-gray-600 flex justify-between gap-2">
                        <span className="truncate">
                          {isRtl ? product.title_ar : product.title_en} × {qty}
                        </span>
                        <span className="shrink-0 font-semibold text-[#1b5e20]">
                          {(product.price * qty).toLocaleString(isRtl ? 'ar-SA' : 'en-US')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-[#1b5e20]">{labels.name}</span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={labels.namePh}
                      required
                      className={inputClass}
                      autoComplete="name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-[#1b5e20]">{labels.phone}</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={labels.phonePh}
                      required
                      dir="ltr"
                      className={`${inputClass} text-start`}
                      autoComplete="tel"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-[#1b5e20]">{labels.address}</span>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={labels.addressPh}
                      required
                      rows={3}
                      className={`${inputClass} min-h-[88px] resize-none`}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-[#1b5e20]">{labels.notes}</span>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={labels.notesPh}
                      rows={2}
                      className={`${inputClass} min-h-[72px] resize-none`}
                    />
                  </label>
                </div>
              </div>

              <div className="shrink-0 border-t border-gray-100 p-5">
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="touch-press flex w-full min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#2e7d32] text-sm font-bold text-white hover:bg-[#1b5e20] disabled:opacity-50"
                >
                  <MessageCircle className="size-5" />
                  {labels.submit}
                </button>
              </div>
            </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
