import type { CartProduct } from '@/lib/productTypes';

export const WHATSAPP_CHECKOUT_NUMBER = '201144003490';

export type CheckoutCartItem = {
  product: CartProduct;
  qty: number;
};

export type CheckoutFormData = {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
};

type BuildMessageOptions = {
  lang: 'ar' | 'en';
  form: CheckoutFormData;
  cart: CheckoutCartItem[];
  total: number;
};

export function buildWhatsAppOrderMessage({
  lang,
  form,
  cart,
  total,
}: BuildMessageOptions): string {
  const isAr = lang === 'ar';
  const itemLines = cart.map(({ product, qty }) => {
    const name = isAr ? product.title_ar : product.title_en;
    const lineTotal = product.price * qty;
    return isAr
      ? `• ${name} × ${qty} — ${lineTotal.toLocaleString('ar-SA')} ر.س`
      : `• ${name} x ${qty} — SAR ${lineTotal.toLocaleString('en-US')}`;
  });

  if (isAr) {
    return [
      'مرحباً، أود إتمام طلب جديد من صول الذهبية 🛒',
      '',
      `👤 الاسم: ${form.fullName.trim()}`,
      `📱 الهاتف: ${form.phone.trim()}`,
      `📍 العنوان: ${form.address.trim()}`,
      '',
      '🛍️ *المنتجات:*',
      ...itemLines,
      '',
      `💰 *الإجمالي:* ${total.toLocaleString('ar-SA')} ر.س`,
      `📦 *عدد القطع:* ${cart.reduce((s, i) => s + i.qty, 0)}`,
      form.notes.trim() ? `\n📝 *ملاحظات:*\n${form.notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  return [
    'Hello, I would like to place a new order from Soul Gold 🛒',
    '',
    `👤 Name: ${form.fullName.trim()}`,
    `📱 Phone: ${form.phone.trim()}`,
    `📍 Address: ${form.address.trim()}`,
    '',
    '🛍️ *Items:*',
    ...itemLines,
    '',
    `💰 *Total:* SAR ${total.toLocaleString('en-US')}`,
    `📦 *Items count:* ${cart.reduce((s, i) => s + i.qty, 0)}`,
    form.notes.trim() ? `\n📝 *Notes:*\n${form.notes.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildWhatsAppCheckoutUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_CHECKOUT_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function redirectToWhatsAppCheckout(message: string): void {
  const url = buildWhatsAppCheckoutUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
