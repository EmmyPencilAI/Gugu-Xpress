import React, { useState, useEffect } from 'react';
import {
  Zap,
  Flame,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Award,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Store,
  Cpu,
  Smartphone,
  Laptop,
  Shirt,
  Footprints,
  Home,
  Car,
  Wrench,
  Activity,
  Gamepad2,
  Watch,
  Tv,
  HeartPulse,
  Sprout
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';

export const HomeView: React.FC = () => {
  const {
    categories,
    sellers,
    products,
    flashTimeLeft,
    setCurrentView,
    setFilters,
    openSellerStore
  } = useApp();

  // Banner carousel state
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'MEGA XPRESS TECH REVOLUTION',
      subtitle: 'Up to 70% OFF Flagship ANC Earbuds, 4K Drones & AMOLED Smartwatches',
      badge: 'LIMITED TIME OFFER',
      cta: 'SHOP FLASH DEALS',
      filterAction: { flashDealsOnly: true },
      bgImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&auto=format&fit=crop&q=80',
      color: 'from-neutral-950 via-neutral-900/90 to-transparent'
    },
    {
      id: 2,
      title: 'LIFEP04 SOLAR & POWER BACKUP',
      subtitle: 'Heavy-duty inverters & 1200W solar generators with instant delivery',
      badge: 'ENERGY CHAMPION',
      cta: 'EXPLORE SOLAR GEAR',
      filterAction: { categorySlug: 'agriculture' },
      bgImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=1200&auto=format&fit=crop&q=80',
      color: 'from-neutral-950 via-neutral-900/90 to-transparent'
    },
    {
      id: 3,
      title: 'URBAN VOGUE & SPEED RUNNERS',
      subtitle: 'Carbon-plate cushioned footwear & technical cyber bomber jackets',
      badge: 'NEW ARRIVALS 2025',
      cta: 'DISCOVER FASHION',
      filterAction: { categorySlug: 'shoes' },
      bgImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80',
      color: 'from-neutral-950 via-neutral-900/90 to-transparent'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Icon mapper helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Shirt': return <Shirt className="w-5 h-5" />;
      case 'Footprints': return <Footprints className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Car': return <Car className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Watch': return <Watch className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Sprout': return <Sprout className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  const flashProducts = products.filter((p) => p.is_flash_deal);
  const bestSellers = [...products].sort((a, b) => b.sales_count - a.sales_count).slice(0, 6);
  const recommended = [...products].slice(2, 8);
  const newArrivals = [...products].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 6);

  const format2Digits = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* 1. Hero Promo Banner Carousel (Bold Typography Aesthetic) */}
      <section className="relative overflow-hidden rounded-3xl bg-[#FF6A00] border border-orange-400 shadow-md">
        <div className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] w-full flex items-center">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === activeBannerIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Optional Subtle Background Texture/Image Overlay */}
              <img
                src={banner.bgImage}
                alt={banner.title}
                className="w-full h-full object-cover object-center mix-blend-multiply opacity-25"
                referrerPolicy="no-referrer"
              />
              
              {/* Giant Background Watermark Text for Bold Typography Motif */}
              <div className="absolute right-[-20px] bottom-[-25px] opacity-20 pointer-events-none select-none z-0">
                <h1 className="text-white text-[120px] sm:text-[200px] md:text-[260px] leading-none font-black italic tracking-tighter">
                  SALE
                </h1>
              </div>

              {/* Foreground Banner Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-14 max-w-2xl z-10">
                <span className="inline-block bg-black text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full w-fit mb-2 tracking-wider uppercase">
                  {banner.badge}
                </span>
                <h1
                  className="text-white text-3xl sm:text-5xl md:text-6xl font-black mb-2 leading-none"
                  style={{ fontWeight: 900, letterSpacing: '-0.04em' }}
                >
                  {banner.title}
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-xl font-bold italic font-mono mb-4 line-clamp-2">
                  {banner.subtitle}
                </p>
                <div>
                  <button
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, ...banner.filterAction }));
                      setCurrentView('explore');
                    }}
                    className="bg-black hover:bg-neutral-900 text-white font-mono font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-full flex items-center gap-2 shadow-xl transition-all active-press tracking-widest uppercase"
                  >
                    <span>{banner.cta} →</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Arrows */}
          <button
            onClick={() => setActiveBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveBannerIndex((prev) => (prev + 1) % banners.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBannerIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeBannerIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. 16 Categories Horizontal Scroll Grid */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-[#111111] tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
              EXPLORE BY CATEGORY
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, categorySlug: 'all' }));
              setCurrentView('explore');
            }}
            className="text-xs text-[#FF6A00] font-mono font-bold tracking-wider uppercase flex items-center gap-1 hover:underline"
          >
            View All ({categories.length})
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilters((prev) => ({ ...prev, categorySlug: cat.slug }));
                setCurrentView('explore');
              }}
              className="flex flex-col items-center p-2 sm:p-2.5 rounded-xl hover:bg-[#FFF2E8] border border-transparent hover:border-[#FF6A00]/30 transition-all text-center group active-press"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F7F7F7] group-hover:bg-[#FF6A00] text-[#FF6A00] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs mb-1.5">
                {getCategoryIcon(cat.iconName)}
              </div>
              <span className="text-[11px] font-bold text-[#111111] group-hover:text-[#FF6A00] line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[9px] text-[#666666] font-mono tracking-wide font-medium">
                {cat.product_count}+ ITEMS
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Flash Deals Section with Real-Time Countdown (Bold Typography Aesthetic) */}
      <section className="bg-white border border-gray-100 rounded-3xl p-4 sm:p-6 shadow-xs relative overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="text-xl sm:text-2xl font-black text-[#111111]" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              FLASH DEALS
            </h3>
            
            {/* Real-Time Countdown Clock in Bold Black Box */}
            <div className="flex gap-1.5 items-center text-white bg-black px-3 py-1 rounded-lg text-sm sm:text-base font-bold font-mono tracking-wider">
              <span>{format2Digits(flashTimeLeft.hours)}</span>
              <span className="text-[#FF6A00]">:</span>
              <span>{format2Digits(flashTimeLeft.minutes)}</span>
              <span className="text-[#FF6A00]">:</span>
              <span>{format2Digits(flashTimeLeft.seconds)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, flashDealsOnly: true }));
              setCurrentView('explore');
            }}
            className="text-[#FF6A00] font-mono font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center gap-1 hover:underline self-start sm:self-auto"
          >
            VIEW ALL <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Flash Deals Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {flashProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. Trending Products */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#111111] tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                TRENDING NOW
              </h2>
              <p className="text-xs text-[#666666] font-medium">Most wanted items right now</p>
            </div>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, sortBy: 'best_selling' }));
              setCurrentView('explore');
            }}
            className="text-xs font-mono font-bold text-[#FF6A00] tracking-wider uppercase flex items-center gap-1 hover:underline"
          >
            See More <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#111111] tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                TOP BEST SELLERS
              </h2>
              <p className="text-xs text-[#666666] font-medium">Highest buyer satisfaction and volume</p>
            </div>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, sortBy: 'best_selling' }));
              setCurrentView('explore');
            }}
            className="text-xs font-mono font-bold text-[#FF6A00] tracking-wider uppercase flex items-center gap-1 hover:underline"
          >
            View Ranking <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. Verified Flagship Merchant Stores */}
      <section className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#111111] tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                VERIFIED OFFICIAL STORES
              </h2>
              <p className="text-xs text-[#666666] font-medium">100% Guaranteed authentic & fast dispatched</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              onClick={() => openSellerStore(seller.store_slug)}
              className="border border-gray-100 hover:border-[#FF6A00] rounded-2xl p-3.5 flex flex-col justify-between gap-3 bg-gray-50/50 hover:bg-white transition-all cursor-pointer shadow-2xs hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={seller.logo}
                  alt={seller.store_name}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-100 bg-white shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs font-bold text-[#111111] truncate">{seller.store_name}</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                  </div>
                  <p className="text-[11px] text-[#666666] truncate">{seller.location}</p>
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#111111] mt-0.5">
                    <span className="text-[#FF6A00]">★ {seller.rating}</span>
                    <span>•</span>
                    <span className="uppercase">{seller.total_sales.toLocaleString()} Sales</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                {seller.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[10px] text-[#666666] font-mono font-medium uppercase">
                  {seller.followers.toLocaleString()} Followers
                </span>
                <span className="text-xs font-mono font-bold text-[#FF6A00] tracking-wide uppercase flex items-center gap-1">
                  Visit Store <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Recommended For You */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#111111] tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                RECOMMENDED FOR YOU
              </h2>
              <p className="text-xs text-[#666666] font-medium">Curated based on your browsing & tech preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 8. Trust & Buyer Protection Guarantees Bar */}
      <section className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono font-bold text-xs text-[#111111] tracking-wider uppercase">XPRESS ESCROW</h4>
              <p className="text-[11px] text-[#666666]">Payment held in escrow until you verify delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono font-bold text-xs text-[#111111] tracking-wider uppercase">48H FAST DISPATCH</h4>
              <p className="text-[11px] text-[#666666]">Guaranteed express sorting & door-to-door transit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono font-bold text-xs text-[#111111] tracking-wider uppercase">7-DAY EASY RETURNS</h4>
              <p className="text-[11px] text-[#666666]">100% full refund on defective or missing packages</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-mono font-bold text-xs text-[#111111] tracking-wider uppercase">24/7 SUPPORT</h4>
              <p className="text-[11px] text-[#666666]">Live chat with Gugu AI and dedicated human agents</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
