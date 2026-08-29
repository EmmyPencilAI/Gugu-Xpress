import React, { useState } from 'react';
import {
  ArrowLeft,
  Store,
  Star,
  CheckCircle2,
  Users,
  ShieldCheck,
  Heart,
  MessageSquare,
  Sparkles,
  Tag,
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';

export const SellerStoreView: React.FC = () => {
  const {
    sellers,
    selectedSellerSlug,
    products,
    setCurrentView,
    formatPrice,
    applyCouponCode,
    showToast
  } = useApp();

  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'about'>('products');
  const [filterCategory, setFilterCategory] = useState('all');

  // Match seller by slug or default to first
  const seller =
    sellers.find((s) => s.slug === selectedSellerSlug || s.id.includes(selectedSellerSlug || '')) ||
    sellers[0];

  const sellerProducts = products.filter(
    (p) =>
      p.seller_id === seller.id ||
      p.seller_name.toLowerCase() === seller.store_name.toLowerCase() ||
      p.brand.toLowerCase() === seller.store_name.toLowerCase()
  );

  const displayedProducts =
    filterCategory === 'all'
      ? sellerProducts
      : sellerProducts.filter((p) => p.category_id === filterCategory || p.category_name.toLowerCase().includes(filterCategory));

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    showToast(
      !isFollowing
        ? `You are now following ${seller.store_name}! Exclusive voucher unlocked.`
        : `Unfollowed ${seller.store_name}`,
      !isFollowing ? 'success' : 'info'
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-24">
      {/* 1. Back Navigation */}
      <button
        onClick={() => setCurrentView('home')}
        className="flex items-center gap-1.5 text-xs font-orbitron font-bold text-[#111111] hover:text-[#FF6A00] transition-colors p-1 rounded-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO DISCOVERY</span>
      </button>

      {/* 2. Store Hero Banner & Profile Header */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden">
        {/* Banner Image */}
        <div className="h-36 sm:h-48 w-full relative">
          <img
            src={seller.banner}
            alt={seller.store_name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Profile Details Container */}
        <div className="p-4 sm:p-6 -mt-12 sm:-mt-16 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-end gap-3.5">
            <img
              src={seller.logo}
              alt={seller.store_name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-white shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="font-nevera text-lg sm:text-2xl font-black text-[#111111]">
                  {seller.store_name}
                </h1>
                {seller.is_verified && (
                  <span className="bg-[#FF6A00] text-white text-[9px] font-orbitron font-extrabold px-1.5 py-0.2 rounded flex items-center gap-0.5 shadow-2xs">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs text-[#666666] font-medium">
                {seller.location} • Member since {seller.joined_date}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleFollowToggle}
              className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                isFollowing
                  ? 'bg-neutral-100 text-[#111111] border border-[#EAEAEA]'
                  : 'bg-[#FF6A00] hover:bg-[#E65F00] text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFollowing ? 'fill-current text-red-500' : ''}`} />
              <span>{isFollowing ? 'FOLLOWING' : 'FOLLOW STORE'}</span>
            </button>

            <button
              onClick={() => showToast('Opening direct chat with store support...', 'info')}
              className="px-4 py-2 bg-[#111111] hover:bg-neutral-800 text-white rounded-xl text-xs font-orbitron font-bold flex items-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>CHAT WITH SELLER</span>
            </button>
          </div>
        </div>

        {/* 3. Performance Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#EAEAEA] bg-[#F7F7F7] p-3 text-center text-xs divide-x divide-[#EAEAEA]">
          <div className="p-1">
            <span className="font-orbitron font-bold text-sm text-[#FF6A00] flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              {seller.rating} / 5.0
            </span>
            <span className="text-[10px] text-[#666666] font-orbitron uppercase">Positive Rating</span>
          </div>

          <div className="p-1">
            <span className="font-orbitron font-bold text-sm text-[#111111]">
              {seller.response_rate}%
            </span>
            <span className="text-[10px] text-[#666666] font-orbitron uppercase">Response Rate</span>
          </div>

          <div className="p-1">
            <span className="font-orbitron font-bold text-sm text-[#111111]">
              {seller.total_sales.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#666666] font-orbitron uppercase">Items Sold</span>
          </div>

          <div className="p-1">
            <span className="font-orbitron font-bold text-sm text-[#111111]">
              {seller.followers.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#666666] font-orbitron uppercase">Followers</span>
          </div>
        </div>
      </div>

      {/* 4. Store Exclusive Vouchers */}
      <div className="bg-[#FFF2E8]/50 rounded-2xl p-4 border border-[#FF6A00]/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6A00] text-white flex items-center justify-center shrink-0">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-nevera text-xs sm:text-sm font-bold text-[#111111]">
              STORE EXCLUSIVE COUPON: 10% OFF EVERYTHING
            </h3>
            <p className="text-xs text-[#666666]">
              Apply coupon <strong className="font-orbitron text-[#FF6A00]">XPRESS10</strong> at checkout for an instant 10% discount on all store items!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            applyCouponCode('XPRESS10');
            showToast('Applied voucher XPRESS10 to your cart!', 'success');
          }}
          className="px-4 py-2 bg-[#FF6A00] hover:bg-[#E65F00] text-white rounded-xl text-xs font-orbitron font-bold self-start sm:self-auto shadow-xs active-press"
        >
          CLAIM VOUCHER
        </button>
      </div>

      {/* 5. Store Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-nevera text-base sm:text-lg font-bold text-[#111111]">
            ALL PRODUCTS FROM {seller.store_name.toUpperCase()} ({sellerProducts.length})
          </h2>
        </div>

        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {displayedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 border border-[#EAEAEA] text-center text-xs text-[#666666]">
            No products currently in stock for this merchant.
          </div>
        )}
      </div>
    </div>
  );
};
