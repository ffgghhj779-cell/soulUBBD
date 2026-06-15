'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import LuxuryHeader from '@/components/LuxuryHeader';
import BentoCategories from '@/components/BentoCategories';
import StatementFooter from '@/components/StatementFooter';
import ProductSection from '@/components/ProductSection';
import SeoText from '@/components/SeoText';
import CitrusFeaturesBar from '@/components/CitrusFeaturesBar';
import RecentlyViewed from '@/components/RecentlyViewed';
import { FadeInSection } from '@/components/FadeInSection';
import type { ShowcaseProduct, CartProduct } from '@/lib/productTypes';
import { toCartProduct } from '@/lib/showcaseCatalog';
import { COMPANY } from '@/lib/company';
import SideCartDrawer from '@/components/SideCartDrawer';
import { ToastProvider, useToast } from '@/lib/useToast';
import ToastStack from '@/components/ToastStack';

const t = {
  ar: {
    topBar: '✨ توصيل مجاني للطلبات فوق ٢٠٠ ريال | منتجات طازجة يومياً | صول الذهبية ✨',
    brandTitle: 'صول',
    brandSubtitle: 'الذهبية',
    home: 'الرئيسية',
    shop: 'تسوق',
    whyUs: 'لماذا نحن',
    soulPlus: 'Soul Plus',
    language: 'English',
    discover: 'تسوق حسب الفئة',
    discoverDesc: 'اكتشف تشكيلتنا من المنتجات الطازجة والمجمدة والمعلبات.',
    bestSelling: 'الأكثر مبيعاً',
    weeklyDeals: 'عروض الأسبوع',
    premiumPantry: 'مستلزمات المطبخ الطازجة',
    giftBaskets: 'سلال وهدايا فاخرة',
    allProducts: 'كل المنتجات',
    footerDesc: 'ذكاء يعزز الفخامة وجودة تُلهم الحواس. ذهب المائدة السعودية.',
    quickLinks: 'روابط سريعة',
    contactUs: 'اتصل بنا',
    newsletter: 'النشرة البريدية',
    newsletterDesc: 'اشترك لتلقي العروض الحصرية والإلهام في الطهي.',
    emailPlaceholder: 'البريد الإلكتروني',
    allRights: 'صول الذهبية. جميع الحقوق محفوظة.',
    contactPhoneLabel: 'الجوال',
    contactLocationLabel: 'الموقع',
    support: 'البريد الإلكتروني',
    shopAll: 'تسوق الكل',
    aboutUs: 'من نحن',
    trackOrder: 'تتبع الطلب',
    emptyCart: 'السلة فارغة',
    newsletterSuccess: 'شكراً! تم الاشتراك بنجاح.',
    searchHint: 'تصفح منتجاتنا الحصرية أدناه',
    companyRegTitle: 'السجل التجاري',
    crLabel: 'رقم السجل',
    promoTitle: 'منتجات طازجة تصل إلى بابك',
    promoSubtitle: 'صول الذهبية — جودة مزرعية يومياً في جميع أنحاء المملكة',
  },
  en: {
    topBar: '✨ Free Delivery over 200 SAR | Farm-Fresh Daily | Soul Gold ✨',
    brandTitle: 'Soul',
    brandSubtitle: 'Gold',
    home: 'Home',
    shop: 'Shop',
    whyUs: 'About Us',
    soulPlus: 'Soul Plus',
    language: 'العربية',
    discover: 'Shop By Category',
    discoverDesc: 'Browse our fresh, frozen, and pantry essentials.',
    bestSelling: 'Best Selling Fresh Produce',
    weeklyDeals: 'Weekly Fresh Deals',
    premiumPantry: 'Naturally Fresh Premium Pantry',
    giftBaskets: 'Premium Fresh Gift Baskets',
    allProducts: 'ALL PRODUCTS',
    footerDesc: 'Premium Intelligence & Inspiring Quality. The Gold of the Saudi Table.',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    newsletter: 'Newsletter',
    newsletterDesc: 'Subscribe for exclusive offers and culinary inspiration.',
    emailPlaceholder: 'Email address',
    allRights: 'Soul Gold. All rights reserved.',
    contactPhoneLabel: 'Phone',
    contactLocationLabel: 'Location',
    support: 'Email',
    shopAll: 'Shop All',
    aboutUs: 'About Us',
    trackOrder: 'Track Order',
    emptyCart: 'Your cart is empty',
    newsletterSuccess: 'Thank you! You are subscribed.',
    searchHint: 'Browse our exclusive products below',
    companyRegTitle: 'Company Registration',
    crLabel: 'CR Number',
    promoTitle: 'Fresh groceries delivered to your door',
    promoSubtitle: 'Soul Gold — farm-quality produce across Saudi Arabia',
  },
} as const;

type Lang = 'ar' | 'en';

type CartItem = {
  product: CartProduct;
  qty: number;
};

function combineProducts(editorial: ShowcaseProduct[], grid: ShowcaseProduct[]) {
  const seen = new Set<string>();
  const combined: ShowcaseProduct[] = [];
  for (const product of [...editorial, ...grid]) {
    if (!seen.has(product.id)) {
      seen.add(product.id);
      combined.push(product);
    }
  }
  return combined;
}

function SectionDivider() {
  return (
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="border-t border-gray-100" />
    </div>
  );
}

export default function CitrusStoreApp() {
  return (
    <ToastProvider>
      <CitrusStoreContent />
    </ToastProvider>
  );
}

function CitrusStoreContent() {
  const [lang, setLang] = useState<Lang>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gridProducts, setGridProducts] = useState<ShowcaseProduct[]>([]);
  const [editorialProducts, setEditorialProducts] = useState<ShowcaseProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [cartBump, setCartBump] = useState(0);
  const productsRef = React.useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const dict = t[lang];

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const allProducts = useMemo(
    () => combineProducts(editorialProducts, gridProducts),
    [editorialProducts, gridProducts]
  );

  const bestSelling = allProducts.slice(0, 6);
  const weeklyDeals = allProducts.slice(6, 12);
  const premiumPantry = allProducts.slice(12, 18);
  const giftBaskets = allProducts.slice(18, 24);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.classList.add('menu-open');
    } else {
      document.documentElement.classList.remove('menu-open');
    }
    return () => { document.documentElement.classList.remove('menu-open'); };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.products) setGridProducts(data.products);
        if (data.editorial) setEditorialProducts(data.editorial);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleAddToCart = useCallback((product: CartProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });

    const title = lang === 'ar' ? product.title_ar : product.title_en;
    const msg = lang === 'ar' ? `تم إضافة ${title} إلى السلة` : `Added ${title} to cart`;
    toast(msg, 'success');
    setCartBump((b) => b + 1);
  }, [lang, toast]);

  const handleShowcaseAddToCart = useCallback((p: ShowcaseProduct) => {
    handleAddToCart(toCartProduct(p));
  }, [handleAddToCart]);

  const openCheckout = () => {
    if (cartCount === 0) {
      alert(dict.emptyCart);
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartCount === 0) return;

    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
          items: cart.map((item) => ({
            id: item.product.id,
            name_ar: item.product.title_ar,
            name_en: item.product.title_en,
            qty: item.qty,
            price: item.product.price,
          })),
          total: cartTotal,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast(
          lang === 'ar'
            ? 'تم تأكيد الطلب بنجاح! رقم الطلب: ' + data.orderId
            : 'Order placed successfully! Order ID: ' + data.orderId,
          'success'
        );
        setCart([]);
        setIsCheckoutOpen(false);
        setCustomerName('');
        setCustomerPhone('');
        setCustomerAddress('');
      } else {
        toast(data.message || (lang === 'ar' ? 'فشل الطلب' : 'Order failed'), 'error');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast(lang === 'ar' ? 'فشل إتمام الطلب' : 'Checkout failed', 'error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-[100dvh] mobile-shell bg-[#f9fafb] overflow-x-hidden app-scroll">
      {/* Top announcement bar */}
      <div className="bg-[#1a3c34] text-white text-[11px] md:text-xs py-2 px-4">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
          <span className="inline-flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-0.5 font-semibold">
            🌿 {lang === 'ar' ? 'طازج من المزرعة' : 'FARM FRESH'}
          </span>
          <span className="inline-flex items-center gap-1 bg-[#f47c2b] rounded-full px-2.5 py-0.5 font-semibold">
            🔥 {lang === 'ar' ? 'خصم حتى ٤٠٪' : 'UP TO 40% OFF'}
          </span>
          <span className="hidden md:inline">{lang === 'ar' ? 'عروض أسبوعية وخصومات خاصة' : 'Weekly Offers & Special Discounts'}</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">{lang === 'ar' ? 'اطلب قبل 2pm للتوصيل اليوم' : 'Order by 2pm for Same Day Delivery'}</span>
        </div>
      </div>

      <LuxuryHeader
        lang={lang}
        dict={dict}
        cartCount={cartCount}
        isCheckingOut={isCheckingOut}
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenCheckout={openCheckout}
        onToggleLanguage={toggleLanguage}
        onScrollToProducts={scrollToProducts}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        cartBump={cartBump}
      />

      <main className="bg-white app-scroll">
        {/* Dual promotional hero banners */}
        <FadeInSection as="section" id="hero" className="px-4 py-6 md:py-8 max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <div
              className="premium-ease premium-card-hover relative rounded-2xl overflow-hidden min-h-[220px] md:min-h-[260px] flex items-end p-6 md:p-8 bg-cover bg-center shadow-sm hover:shadow-md"
              style={{
                backgroundImage:
                  'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.15) 100%), url(https://images.unsplash.com/photo-1610839335344-87b7971414a6?auto=format&fit=crop&w=900&q=80)',
              }}
            >
              <div>
                <span className="inline-block bg-[#f47c2b] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3">
                  {lang === 'ar' ? 'للطلبات مع التوصيل' : 'For orders with delivery'}
                </span>
                <h2 className="premium-heading text-white text-xl md:text-2xl font-bold tracking-tight mb-1">
                  {lang === 'ar' ? 'فواكه طازجة توصل في المملكة' : 'Fresh Fruits Delivered in Saudi Arabia'}
                </h2>
                <p className="text-white font-bold mb-1">{lang === 'ar' ? 'خصم حتى - 10%' : 'Up to - 10%'}</p>
                <div className="w-12 h-0.5 bg-[#9ccc65] mb-4" />
                <button
                  type="button"
                  onClick={scrollToProducts}
                  className="premium-ease touch-press min-h-[44px] inline-flex items-center bg-[#287233] hover:bg-[#1a3c34] text-white text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-wide"
                >
                  {lang === 'ar' ? 'تسوق الآن' : 'SHOP NOW'}
                </button>
              </div>
            </div>

            <div
              className="premium-ease premium-card-hover relative rounded-2xl overflow-hidden min-h-[220px] md:min-h-[260px] flex items-end p-6 md:p-8 bg-cover bg-center shadow-sm hover:shadow-md"
              style={{
                backgroundImage:
                  'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.15) 100%), url(https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80)',
              }}
            >
              <div>
                <span className="inline-block bg-[#e57373] text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3">
                  {lang === 'ar' ? 'خصم -60%' : 'Off -60%'}
                </span>
                <h2 className="premium-heading text-white text-xl md:text-2xl font-bold tracking-tight mb-1">
                  {lang === 'ar' ? 'خضروات طازجة توصل في المملكة' : 'Fresh Vegetables Delivered in Saudi Arabia'}
                </h2>
                <p className="text-white font-bold mb-1">{lang === 'ar' ? 'خصم حتى - 30%' : 'Up to - 30%'}</p>
                <div className="w-12 h-0.5 bg-[#9ccc65] mb-4" />
                <button
                  type="button"
                  onClick={scrollToProducts}
                  className="premium-ease touch-press min-h-[44px] inline-flex items-center bg-[#287233] hover:bg-[#1a3c34] text-white text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-wide"
                >
                  {lang === 'ar' ? 'تسوق الآن' : 'SHOP NOW'}
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>

        <CitrusFeaturesBar lang={lang} />

        <RecentlyViewed lang={lang} products={allProducts} />

        <SectionDivider />

        <BentoCategories lang={lang} dict={dict} />

        <SectionDivider />

        <div ref={productsRef}>
          <ProductSection
            id="best-selling"
            title={dict.bestSelling}
            products={bestSelling}
            lang={lang}
            isLoading={isLoadingProducts}
            onAddToCart={handleShowcaseAddToCart}
            allProductsLabel={dict.allProducts}
          />
        </div>

        <SectionDivider />

        <ProductSection
          title={dict.weeklyDeals}
          products={weeklyDeals}
          lang={lang}
          isLoading={isLoadingProducts}
          onAddToCart={handleShowcaseAddToCart}
          allProductsLabel={dict.allProducts}
        />

        <SectionDivider />

        <ProductSection
          title={dict.premiumPantry}
          products={premiumPantry}
          lang={lang}
          isLoading={isLoadingProducts}
          onAddToCart={handleShowcaseAddToCart}
          allProductsLabel={dict.allProducts}
        />

        <SectionDivider />

        <ProductSection
          id="all-products"
          title={dict.giftBaskets}
          showIcon={false}
          titleSerif
          products={giftBaskets.length > 0 ? giftBaskets : allProducts.slice(18)}
          lang={lang}
          isLoading={isLoadingProducts}
          onAddToCart={handleShowcaseAddToCart}
          allProductsLabel={dict.allProducts}
        />

        <SectionDivider />

        <SeoText lang={lang} />
      </main>

      <StatementFooter lang={lang} dict={dict} />

      <SideCartDrawer
        lang={lang}
        isOpen={isCheckoutOpen}
        cart={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onUpdateQty={(id, delta) => {
          setCart((prev) =>
            prev
              .map((item) => {
                if (item.product.id === id) {
                  const newQty = item.qty + delta;
                  return newQty > 0 ? { ...item, qty: newQty } : item;
                }
                return item;
              })
              .filter((item) => item.qty > 0)
          );
        }}
        onRemove={(id) => {
          setCart((prev) => prev.filter((item) => item.product.id !== id));
        }}
        onCheckout={() => {
          handleCheckout({ preventDefault: () => {} } as React.FormEvent);
        }}
      />

      <ToastStack />

      <a
        href={COMPANY.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact us on WhatsApp'}
        className="fixed bottom-safe end-6 min-w-[48px] min-h-[48px] w-14 h-14 bg-[#1A1612] text-[#C9A03D] rounded-full border border-[#C9A03D]/30 shadow-[0_10px_30px_rgba(26,22,18,0.35)] flex items-center justify-center smooth-transition z-50 hover:border-[#C9A03D]/65 hover:shadow-[0_14px_36px_rgba(201,160,61,0.22)] hover:scale-105 touch-manipulation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
