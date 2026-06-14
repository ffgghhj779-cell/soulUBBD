'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShoppingCart,
  ShieldCheck,
  Leaf,
  Users,
  Clock,
  Send,
  Sparkles,
  Bot,
  Heart,
  Droplets,
  X,
  ChefHat,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LuxuryHero       from '@/components/LuxuryHero';
import LuxuryHeader     from '@/components/LuxuryHeader';
import ProductRunway    from '@/components/ProductRunway';
import BentoCategories  from '@/components/BentoCategories';
import StatementFooter  from '@/components/StatementFooter';

const t = {
  ar: {
    topBar: "✨ توصيل مجاني للطلبات فوق ٢٠٠ ريال | استكشف منتجاتنا العضوية | انضم لبرنامج الولاء الحصري ✨",
    brandTitle: "صول",
    brandSubtitle: "الذهبية",
    home: "الرئيسية",
    shop: "تسوق",
    whyUs: "لماذا نحن",
    soulPlus: "Soul Plus",
    language: "English",
    heroBadge: "ذهب المائدة السعودية",
    heroTitle1: "جودة ",
    heroTitle2: "تلامس ",
    heroTitle3: "القلب",
    heroDesc: "ذكاء يعزز الفخامة وجودة تُلهم الحواس. ارتقِ بتجربتك في الطهي مع تشكيلتنا العضوية الفاخرة، المختارة بعناية لأصحاب الذوق الرفيع.",
    shopNow: "تسوق الآن",
    tryAi: "جرب المستشار الذكي",
    trust1: "معتمد من الغذاء والدواء",
    trust2: "طبيعي وصحي ١٠٠٪",
    trust3: "أكثر من ١٠٠ ألف عميل راضٍ",
    trust4: "توصيل خلال ٢٤ ساعة",
    discover: "اكتشف المجموعات",
    discoverDesc: "انغمس في النكهات الأصيلة المنتقاة بعناية من أجل صحتك وحيويتك.",
    exclusive: "حصرياً لك",
    filterAll: "الكل",
    filterTuna: "تونة",
    filterSauces: "صلصات",
    filterGhee: "سمن",
    filterOrganics: "عضوي",
    aiBadge: "نقدم لك مساعد Soul Plus",
    aiTitle1: "مستشارك ",
    aiTitle2: "الشخصي للطهي",
    aiDesc: "جرب مستوى جديد من تناول الطعام. سيقوم المساعد الذكي بتحليل احتياجاتك الغذائية ليوصي بأفضل المكونات الفاخرة وابتكار وصفات مخصصة فوراً.",
    aiFeature1: "وصفات فورية",
    aiFeature1Desc: "حوّل مكوناتنا العضوية إلى وجبات بمستوى ميشلان في ثوانٍ.",
    aiFeature2: "تحليل السعرات",
    aiFeature2Desc: "تفصيل دقيق للعناصر الغذائية لتناسب أهدافك الصحية والغذائية.",
    aiFeature3: "اقتراحات مخصصة",
    aiFeature3Desc: "أفضل توافقات النكهات المصممة خصيصاً لذوقك.",
    aiChatName: "مستشار Soul Plus",
    aiChatStatus: "متصل دائماً",
    aiChatInput: "اسأل عن أفكار للوصفات...",
    aiChatWelcome: "أهلاً بك في Soul Plus! مستشارك الذكي. هل تبحث عن وصفات صحية أو منتجات معينة اليوم؟",
    aiChatResponse: "شكراً لرسالتك! يقوم نظامنا الآن بتقييم أفضل الخيارات التي تناسب ذوقك الرفيع. اقتراحاتنا الفاخرة في الطريق إليك!",
    qualityTitle: "معيار صول",
    qualityDesc: "التزام راسخ بالتميز في كل خطوة من رحلتنا.",
    quality1: "حلال وآمن",
    quality1Desc: "عمليات توريد معتمدة تضمن تلبية كل منتج لأعلى معايير السلامة والأخلاقيات والنزاهة الحلال.",
    quality2: "أفضل المكونات",
    quality2Desc: "نسافر حول العالم لنجلب العناصر العضوية الخام في أنقى صورها. جودة لا تُضاهى يمكنك تذوقها.",
    quality3: "تغليف مستدام",
    quality3Desc: "مواد صديقة للبيئة مصممة للحفاظ على نضارة أطعمتنا مع حماية مستقبل كوكبنا.",
    footerDesc: "ذكاء يعزز الفخامة وجودة تُلهم الحواس. ذهب المائدة السعودية.",
    quickLinks: "روابط سريعة",
    contactUs: "اتصل بنا",
    newsletter: "النشرة البريدية",
    newsletterDesc: "اشترك لتلقي العروض الحصرية والإلهام في الطهي.",
    emailPlaceholder: "البريد الإلكتروني",
    allRights: "صول الذهبية. جميع الحقوق محفوظة.",
    tollFree: "الرقم المجاني",
    support: "الدعم الفني",
    shopAll: "تسوق الكل",
    aboutUs: "من نحن",
    trackOrder: "تتبع الطلب",
    checkoutTitle: "إتمام الطلب",
    nameLabel: "الاسم الكامل",
    phoneLabel: "رقم الجوال",
    addressLabel: "العنوان",
    placeOrder: "تأكيد الطلب",
    cancel: "إلغاء",
    emptyCart: "السلة فارغة",
    noProducts: "لا توجد منتجات حالياً",
    newsletterSuccess: "شكراً! تم الاشتراك بنجاح.",
    searchHint: "تصفح منتجاتنا الحصرية أدناه",
    heroScroll: "اكتشف المجموعة",
    heroEditorial: "مجموعة ٢٠٢٦"
  },
  en: {
    topBar: "✨ Free Delivery over 200 SAR | Discover our Organic Selection | Join the Exclusive Loyalty Program ✨",
    brandTitle: "Soul",
    brandSubtitle: "Gold",
    home: "Home",
    shop: "Shop",
    whyUs: "Why Us",
    soulPlus: "Soul Plus",
    language: "العربية",
    heroBadge: "The Gold of the Saudi Table",
    heroTitle1: "Quality that ",
    heroTitle2: "touches ",
    heroTitle3: "the heart",
    heroDesc: "Premium Intelligence & Inspiring Quality. Elevate your culinary experience with our luxury organic selection, curated for the refined palate.",
    shopNow: "Shop Now",
    tryAi: "Try AI Consultant",
    trust1: "SFDA Approved",
    trust2: "100% Healthy & Natural",
    trust3: "Over 100k Satisfied",
    trust4: "24-hour Delivery",
    discover: "Discover the Collections",
    discoverDesc: "Immerse yourself in authentic flavors picked beautifully for your health and vitality.",
    exclusive: "Exclusive Arrivals",
    filterAll: "All",
    filterTuna: "Tuna",
    filterSauces: "Sauces",
    filterGhee: "Ghee",
    filterOrganics: "Organics",
    aiBadge: "Introducing Soul Plus AI",
    aiTitle1: "Your Personal ",
    aiTitle2: "Culinary Consultant",
    aiDesc: "Experience next-level dining. Our AI assistant analyzes your dietary needs to recommend the perfect luxury ingredients and generate instant, tailored recipes.",
    aiFeature1: "Instant Recipes",
    aiFeature1Desc: "Turn our organic ingredients into Michelin-star meals in seconds.",
    aiFeature2: "Calorie Analysis",
    aiFeature2Desc: "Detailed breakdown of macros to fit your health and dietary goals.",
    aiFeature3: "Custom Suggestions",
    aiFeature3Desc: "Perfect flavor pairings generated specifically for your taste palette.",
    aiChatName: "Soul Plus Consultant",
    aiChatStatus: "Always Online",
    aiChatInput: "Ask for recipe ideas...",
    aiChatWelcome: "Welcome to Soul Plus! I am your AI Consultant. Are you looking for healthy recipes or specialized products today?",
    aiChatResponse: "Thank you for your message! Our system is evaluating the best options for your culinary needs. Premium suggestions are on the way!",
    qualityTitle: "The Soul Standard",
    qualityDesc: "Unyielding commitment to excellence at every step of the journey.",
    quality1: "Halal & Safe",
    quality1Desc: "Certified sourcing processes ensuring every product meets the highest standards of safety, ethics, and Halal integrity.",
    quality2: "Best Ingredients",
    quality2Desc: "We travel the world to source organic, raw elements in their purest forms. Uncompromised quality you can taste.",
    quality3: "Sustainable Packaging",
    quality3Desc: "Eco-conscious materials designed to preserve the freshness of our foods while protecting the future of our planet.",
    footerDesc: "Premium Intelligence & Inspiring Quality. The Gold of the Saudi Table.",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    newsletter: "Newsletter",
    newsletterDesc: "Subscribe to receive exclusive offers and culinary inspiration.",
    emailPlaceholder: "Email address",
    allRights: "Soul Gold. All rights reserved.",
    tollFree: "Toll Free",
    support: "Support",
    shopAll: "Shop All",
    aboutUs: "About Us",
    trackOrder: "Track Order",
    checkoutTitle: "Checkout",
    nameLabel: "Full Name",
    phoneLabel: "Phone Number",
    addressLabel: "Delivery Address",
    placeOrder: "Place Order",
    cancel: "Cancel",
    emptyCart: "Your cart is empty",
    noProducts: "No products available",
    newsletterSuccess: "Thank you! You are subscribed.",
    searchHint: "Browse our exclusive products below",
    heroScroll: "Discover the Collection",
    heroEditorial: "Collection 2026"
  }
} as const;

type Lang = 'ar' | 'en';

type CustomProduct = {
  id: number;
  categoryKey: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  price: number;
  weight_ar: string;
  weight_en: string;
  badge_ar: string;
  badge_en: string;
  image: string;
  bgColor: string;
};

type CartItem = {
  product: CustomProduct;
  qty: number;
};

export default function SoulGoldApp() {
  const [lang, setLang] = useState<Lang>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<CustomProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const productsRef = React.useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  type ChatMessage = { role: string; text_ar: string; text_en: string; };
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'ai', text_ar: t.ar.aiChatWelcome, text_en: t.en.aiChatWelcome }
  ]);

  const dict = t[lang];

  // Sync html[lang] and html[dir] so all CSS logical properties work correctly
  // when the user switches language on mobile
  useEffect(() => {
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Lock body scroll while mobile drawer is open
  // IMPORTANT: only overflow, never touchAction — touchAction:none on body
  // prevents ALL touch events even after the menu closes on some iOS versions.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const res = await fetch(`/api/products?category=${activeCategory}`);
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const handleAddToCart = (product: CustomProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

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
        alert(
          lang === 'ar'
            ? 'تم تأكيد الطلب بنجاح! رقم الطلب: ' + data.orderId
            : 'Order placed successfully! Order ID: ' + data.orderId
        );
        setCart([]);
        setIsCheckoutOpen(false);
        setCustomerName('');
        setCustomerPhone('');
        setCustomerAddress('');
      } else {
        alert(data.message || (lang === 'ar' ? 'فشل الطلب' : 'Order failed'));
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text_ar: userMessage, text_en: userMessage }
    ]);
    setChatInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, lang }),
      });
      const data = await res.json();

      setChatMessages(prev => [
        ...prev,
        { role: 'ai', text_ar: data.response || "عذراً، حدث خطأ", text_en: data.response || "Sorry, an error occurred." }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden transition-all duration-300 ease-out px-safe">
      {/* ---------- Top Promo Bar ---------- */}
      <div className="bg-primary-gold text-white text-xs md:text-sm py-2.5 px-4 text-center font-medium">
        <span>{dict.topBar}</span>
      </div>

      {/* ---------- Scroll-Aware Header ---------- */}
      <LuxuryHeader
        lang={lang}
        dict={dict}
        cartCount={cartCount}
        isCheckingOut={isCheckingOut}
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenCheckout={openCheckout}
        onToggleLanguage={toggleLanguage}
        onScrollToProducts={scrollToProducts}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
      />

      {/* ---------- Hero Section — Cinematic Editorial ---------- */}
      <LuxuryHero lang={lang} dict={dict} onShopNow={scrollToProducts} />

      {/* ---------- Trust Indicators ---------- */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 md:-mt-12 relative z-10 smooth-transition hardware-accelerated">
        <div className="glass-card rounded-[32px] p-6 flex flex-nowrap overflow-x-auto gap-8 justify-between items-center hide-scrollbar snap-x snap-mandatory">
          <div className="flex flex-col items-center min-w-[140px] px-4 gap-3 text-center text-soft-charcoal smooth-transition snap-center">
            <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-primary-gold shadow-sm">
              <ShieldCheck size={28} />
            </div>
            <span className="font-bold text-sm tracking-tight">{dict.trust1}</span>
          </div>
          <div className="w-[2px] h-12 bg-cream hidden md:block"></div>
          
          <div className="flex flex-col items-center min-w-[140px] px-4 gap-3 text-center text-soft-charcoal smooth-transition snap-center">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-sm">
              <Leaf size={28} />
            </div>
            <span className="font-bold text-sm tracking-tight">{dict.trust2}</span>
          </div>
          <div className="w-[2px] h-12 bg-cream hidden md:block"></div>
          
          <div className="flex flex-col items-center min-w-[140px] px-4 gap-3 text-center text-soft-charcoal smooth-transition snap-center">
            <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-terracotta shadow-sm">
              <Users size={28} />
            </div>
            <span className="font-bold text-sm tracking-tight">{dict.trust3}</span>
          </div>
          <div className="w-[2px] h-12 bg-cream hidden md:block"></div>
          
          <div className="flex flex-col items-center min-w-[140px] px-4 gap-3 text-center text-soft-charcoal smooth-transition snap-center">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 shadow-sm">
              <Clock size={28} />
            </div>
            <span className="font-bold text-sm tracking-tight">{dict.trust4}</span>
          </div>
        </div>
      </div>

      {/* ---------- Bento Categories ---------- */}
      <BentoCategories lang={lang} dict={dict} />

      {/* ---------- Product Runway Carousel ---------- */}
      <div ref={productsRef}>
        <ProductRunway
          lang={lang}
          products={products}
          isLoading={isLoadingProducts}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddToCart={handleAddToCart}
          dict={dict}
        />
      </div>

      {/* ---------- AI Consultant — Sticky Split-Screen ---------- */}
      <section id="ai-consultant" className="bg-white relative overflow-hidden">
        {/* Atmospheric blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -start-48 top-1/4 w-[400px] h-[400px] rounded-full bg-primary-gold/5 blur-[100px]" />
          <div className="absolute -end-32 bottom-1/4 w-[320px] h-[320px] rounded-full bg-terracotta/5 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* On desktop: items-start so sticky side doesn't stretch to match scrollable side */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start py-24">

            {/* ── LEFT — Scrollable feature narrative ── */}
            <div className="flex flex-col">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-cream text-terracotta px-4 py-2 rounded-full font-bold text-sm mb-8 border border-terracotta/10 self-start">
                <Bot size={16} />
                <span>{dict.aiBadge}</span>
              </div>

              {/* Headline */}
              <h2 className="text-fluid-h3 md:text-5xl font-extrabold text-soft-charcoal mb-6 leading-tight">
                {dict.aiTitle1}
                <br />
                <span className="text-primary-gold">{dict.aiTitle2}</span>
              </h2>

              <p className="text-lg text-soft-charcoal/65 mb-12 leading-relaxed max-w-lg">
                {dict.aiDesc}
              </p>

              {/* Feature list — staggered */}
              <div className="flex flex-col gap-8">
                {[
                  { icon: <ChefHat size={22} />, color: 'bg-primary-gold/10 text-primary-gold', title: dict.aiFeature1, desc: dict.aiFeature1Desc },
                  { icon: <ActivityIcon />,       color: 'bg-terracotta/10 text-terracotta',     title: dict.aiFeature2, desc: dict.aiFeature2Desc },
                  { icon: <StarsIcon />,          color: 'bg-blue-50 text-blue-500',             title: dict.aiFeature3, desc: dict.aiFeature3Desc },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: lang === 'ar' ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
                    className="flex gap-5 items-start group"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 smooth-transition ${f.color}`}>
                      {f.icon}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg font-extrabold text-soft-charcoal mb-1">{f.title}</h3>
                      <p className="text-soft-charcoal/55 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Extra scroll space so the right side sticks while scrolling */}
              <div className="hidden md:block h-16" />
            </div>

            {/* ── RIGHT — Sticky chat interface ── */}
            <div className="md:sticky md:top-28">
              <div className="glass-card backdrop-blur-xl rounded-[32px] p-2 md:p-3 luxury-shadow relative flex flex-col hardware-accelerated"
                   style={{ height: 'min(580px, 80svh)' }}>

                {/* Chat header */}
                <div className="bg-white/85 backdrop-blur-md rounded-t-[28px] px-5 py-4 flex items-center gap-4 shrink-0 border-b border-[rgba(201,160,61,0.1)]">
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary-gold to-terracotta flex items-center justify-center text-white shadow-md">
                      <Bot size={22} />
                    </div>
                    <div className="absolute bottom-0 end-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-soft-charcoal text-sm">{dict.aiChatName}</h4>
                    <p className="text-xs text-green-500 font-semibold">{dict.aiChatStatus}</p>
                  </div>
                  {/* Decorative typing dots in header */}
                  <div className="ms-auto flex gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-primary-gold/30"
                           style={{ animationDelay: `${d * 0.2}s` }} />
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'ai' && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary-gold to-terracotta flex items-center justify-center text-white shrink-0 me-2 mt-1">
                          <Bot size={14} />
                        </div>
                      )}
                      <div className={`max-w-[78%] px-4 py-3 rounded-[20px] text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-soft-charcoal text-white rounded-ee-none'
                          : 'bg-white text-soft-charcoal shadow-sm border border-[rgba(201,160,61,0.1)] rounded-es-none'
                      }`}>
                        {lang === 'ar' ? msg.text_ar : msg.text_en}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary-gold to-terracotta flex items-center justify-center text-white shrink-0 me-2">
                        <Bot size={14} />
                      </div>
                      <div className="bg-white rounded-[20px] rounded-es-none px-5 py-4 shadow-sm border border-[rgba(201,160,61,0.1)] flex gap-1.5 items-center">
                        {[0, 0.18, 0.36].map((d, i) => (
                          <span key={i} className="w-2 h-2 bg-primary-gold rounded-full animate-bounce"
                                style={{ animationDelay: `${d}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-3 rounded-b-[28px] shrink-0 border-t border-[rgba(201,160,61,0.08)]">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      disabled={isTyping}
                      placeholder={dict.aiChatInput}
                      className="flex-1 bg-cream rounded-full px-5 py-3 outline-none text-sm placeholder:text-soft-charcoal/35 font-medium text-soft-charcoal smooth-transition disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isTyping}
                      aria-label={lang === 'ar' ? 'إرسال رسالة' : 'Send message'}
                      className={`min-w-[48px] min-h-[48px] rounded-full bg-primary-gold text-white flex items-center justify-center hover:bg-dark-gold smooth-transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-md touch-manipulation ${lang === 'ar' ? 'rotate-180' : ''}`}
                    >
                      <Send size={17} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Quality (Why Us) ---------- */}
      <section id="quality" className="py-24 px-4 bg-soft-charcoal text-white smooth-transition hardware-accelerated">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-fluid-h2 md:text-5xl font-bold mb-4 text-white smooth-transition">{dict.qualityTitle}</h2>
            <p className="text-white/60 max-w-xl mx-auto text-lg hover:text-white/80 smooth-transition uppercase-none">{dict.qualityDesc}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel border-white/10 rounded-[32px] p-8 hover:bg-white/10 smooth-transition group">
              <div className="w-16 h-16 rounded-[24px] bg-primary-gold/20 flex items-center justify-center text-primary-gold mb-6 group-hover:bg-primary-gold group-hover:text-white smooth-transition">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 smooth-transition">{dict.quality1}</h3>
              <p className="text-white/60 leading-relaxed group-hover:text-white/80 smooth-transition">
                {dict.quality1Desc}
              </p>
            </div>
            
            <div className="glass-panel border-white/10 rounded-[32px] p-8 hover:bg-white/10 smooth-transition group">
              <div className="w-16 h-16 rounded-[24px] bg-light-gold/20 flex items-center justify-center text-light-gold mb-6 group-hover:bg-light-gold group-hover:text-white smooth-transition">
                <Droplets size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 smooth-transition">{dict.quality2}</h3>
              <p className="text-white/60 leading-relaxed group-hover:text-white/80 smooth-transition">
                {dict.quality2Desc}
              </p>
            </div>
            
            <div className="glass-panel border-white/10 rounded-[32px] p-8 hover:bg-white/10 smooth-transition group">
              <div className="w-16 h-16 rounded-[24px] bg-green-500/20 flex items-center justify-center text-green-400 mb-6 group-hover:bg-green-500 group-hover:text-white smooth-transition">
                <Leaf size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 smooth-transition">{dict.quality3}</h3>
              <p className="text-white/60 leading-relaxed group-hover:text-white/80 smooth-transition">
                {dict.quality3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Statement Footer ---------- */}
      <StatementFooter lang={lang} dict={dict} />

      {/* ---------- Checkout Modal ---------- */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-soft-charcoal/50 backdrop-blur-sm z-[60] hardware-accelerated"
              onClick={() => setIsCheckoutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto glass-card backdrop-blur-xl rounded-[32px] p-6 z-[70] hardware-accelerated"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-soft-charcoal">{dict.checkoutTitle}</h3>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-cream smooth-transition active:scale-95 touch-manipulation"
                  aria-label={dict.cancel}
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-soft-charcoal/70 mb-2">{dict.nameLabel}</label>
                  <input
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full glass-panel px-4 py-3 min-h-[48px] rounded-xl outline-none focus:border-primary-gold smooth-transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-soft-charcoal/70 mb-2">{dict.phoneLabel}</label>
                  <input
                    required
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full glass-panel px-4 py-3 min-h-[48px] rounded-xl outline-none focus:border-primary-gold smooth-transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-soft-charcoal/70 mb-2">{dict.addressLabel}</label>
                  <textarea
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    rows={3}
                    className="w-full glass-panel px-4 py-3 rounded-xl outline-none focus:border-primary-gold smooth-transition resize-none"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold text-lg text-soft-charcoal">SAR {cartTotal}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="px-5 min-h-[48px] rounded-full font-bold text-soft-charcoal hover:bg-cream smooth-transition active:scale-95 touch-manipulation"
                    >
                      {dict.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={isCheckingOut}
                      className="px-6 min-h-[48px] rounded-full font-extrabold bg-primary-gold text-white hover:bg-dark-gold smooth-transition active:scale-95 touch-manipulation disabled:opacity-50"
                    >
                      {dict.placeOrder}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------- Floating WhatsApp Button ---------- */}
      <a 
        href="https://wa.me/966500000000" 
        target="_blank"
        rel="noopener noreferrer"
        aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact us on WhatsApp'}
        className="fixed bottom-safe end-6 min-w-[48px] min-h-[48px] w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgb(37,211,102,0.4)] flex items-center justify-center smooth-transition z-50 group hover:shadow-[0_15px_40px_rgb(37,211,102,0.6)] hover:scale-105 active:scale-95 touch-manipulation hardware-accelerated"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}

// Small inline icons for AI Features
function ActivityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function StarsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
