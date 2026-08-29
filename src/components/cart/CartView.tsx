import React, { useState } from 'react';
import {
  Trash2,
  Heart,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  Percent,
  Store
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CartItem } from '../../types';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    toggleCartItemSelect,
    toggleSelectAllCart,
    clearCart,
    cartSubtotal,
    cartShippingFee,
    cartDiscount,
    cartTotal,
    selectedCartItemsCount,
    toggleWishlist,
    formatPrice,
    coupons,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    setCurrentView,
    openProductDetail
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const allSelected = cart.length > 0 && cart.every((item) => item.selected);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCouponCode(couponInput);
    setCouponInput('');
  };

  // Group cart items by seller
  const sellerGroups: Record<string, { sellerName: string; items: CartItem[] }> = cart.reduce((acc, item) => {
    const sId = item.seller_id || 'general';
    if (!acc[sId]) {
      acc[sId] = {
        sellerName: item.seller_name || 'Gugu Xpress Verified Seller',
        items: []
      };
    }
    acc[sId].items.push(item);
    return acc;
  }, {} as Record<string, { sellerName: string; items: CartItem[] }>);

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-14 border border-[#EAEAEA] shadow-xs text-center space-y-4 max-w-lg mx-auto my-6">
        <div className="w-20 h-20 rounded-full bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-nevera text-2xl font-bold text-[#111111]">
          YOUR CART IS EMPTY
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Looks like you haven't added any tech, fashion, or power tools yet. Check out our flash deals with up to 70% off!
        </p>
        <div>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-[#FF6A00] hover:bg-[#E65F00] text-white px-6 py-3 rounded-full font-orbitron font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 active-press"
          >
            <span>START SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-24">
      {/* 1. Header & Select All */}
      <div className="bg-white rounded-2xl p-4 border border-[#EAEAEA] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-orbitron font-bold text-[#111111]">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => toggleSelectAllCart(e.target.checked)}
              className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
            />
            <span>SELECT ALL ({cart.length} ITEMS)</span>
          </label>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#666666] hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* 2. Cart Items Grouped by Store */}
      <div className="space-y-4">
        {Object.entries(sellerGroups).map(([sellerId, group]) => (
          <div
            key={sellerId}
            className="bg-white rounded-2xl p-4 border border-[#EAEAEA] shadow-xs space-y-3"
          >
            {/* Store Title */}
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#EAEAEA]">
              <Store className="w-4 h-4 text-[#FF6A00]" />
              <h3 className="font-bold text-xs sm:text-sm text-[#111111]">
                {group.sellerName}
              </h3>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 py-2 border-b border-[#F7F7F7] last:border-none"
                >
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleCartItemSelect(item.id)}
                    className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00] mt-4 shrink-0"
                  />

                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onClick={() => openProductDetail(item.product_id)}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#F7F7F7] border border-[#EAEAEA] shrink-0 cursor-pointer"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => openProductDetail(item.product_id)}
                      className="text-xs sm:text-sm font-medium text-[#111111] line-clamp-1 hover:text-[#FF6A00] cursor-pointer transition-colors"
                    >
                      {item.product.name}
                    </h4>

                    {/* Variant tags */}
                    {item.selected_variants && Object.keys(item.selected_variants).length > 0 && (
                      <div className="flex flex-wrap gap-1 my-1">
                        {Object.entries(item.selected_variants).map(([k, v]) => (
                          <span
                            key={k}
                            className="bg-[#F7F7F7] border border-[#EAEAEA] text-[10px] text-[#666666] px-1.5 py-0.2 rounded font-medium"
                          >
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between pt-1 mt-1">
                      <span className="font-orbitron font-bold text-xs sm:text-sm text-[#FF6A00]">
                        {formatPrice(item.unit_price)}
                      </span>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#EAEAEA] rounded-lg bg-[#F7F7F7]">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white text-[#111111] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-orbitron font-bold text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white text-[#111111] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            toggleWishlist(item.product_id);
                            removeFromCart(item.id);
                          }}
                          className="p-1 text-[#666666] hover:text-[#FF6A00]"
                          title="Move to Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-[#666666] hover:text-red-500"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Coupon Vouchers Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#FF6A00]" />
            <h3 className="font-nevera text-sm font-bold text-[#111111]">
              COUPONS & PROMO CODES
            </h3>
          </div>
          {appliedCoupon && (
            <button
              onClick={removeCoupon}
              className="text-xs text-red-600 font-semibold hover:underline"
            >
              Remove Coupon
            </button>
          )}
        </div>

        {/* Coupon input form */}
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="Enter promo code (e.g. XPRESS10, MEGA5000)"
            className="flex-1 bg-[#F7F7F7] border border-[#EAEAEA] text-xs font-orbitron font-semibold p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none uppercase"
          />
          <button
            type="submit"
            className="bg-[#FF6A00] text-white px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs hover:bg-[#E65F00] transition-colors shadow-xs active-press"
          >
            APPLY
          </button>
        </form>

        {/* Clickable Quick Coupon Chips */}
        <div className="pt-2">
          <span className="text-[11px] text-[#666666] font-medium block mb-1.5">
            Available Discount Vouchers:
          </span>
          <div className="flex flex-wrap gap-2">
            {coupons.map((c) => {
              const isApplied = appliedCoupon?.code === c.code;
              return (
                <button
                  key={c.id}
                  onClick={() => applyCouponCode(c.code)}
                  className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                    isApplied
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                      : 'bg-[#F7F7F7] border-[#EAEAEA] text-[#111111] hover:border-[#FF6A00]'
                  }`}
                >
                  <Percent className="w-3 h-3 text-[#FF6A00]" />
                  <span className="font-orbitron font-bold">{c.code}</span>
                  <span className="text-[10px] text-[#666666]">
                    ({c.discount_type === 'percent' ? `${c.discount_value}% OFF` : `₦${c.discount_value.toLocaleString()} OFF`})
                  </span>
                  {isApplied && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Order Summary Card */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs space-y-4">
        <h3 className="text-base font-black text-[#111111] tracking-tight uppercase" style={{ fontWeight: 900 }}>
          ORDER BREAKDOWN
        </h3>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#666666]">Selected Items Subtotal</span>
            <span className="font-mono font-bold text-[#111111]">
              {formatPrice(cartSubtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#666666]">Shipping & Express Freight</span>
            <span className="font-mono font-bold text-[#111111]">
              {cartShippingFee === 0 ? (
                <span className="text-[#FF6A00] font-black uppercase">FREE</span>
              ) : (
                formatPrice(cartShippingFee)
              )}
            </span>
          </div>

          {cartDiscount > 0 && (
            <div className="flex items-center justify-between text-[#FF6A00] font-bold">
              <span>Coupon Savings ({appliedCoupon?.code})</span>
              <span className="font-mono">-{formatPrice(cartDiscount)}</span>
            </div>
          )}

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm sm:text-base">
            <span className="font-black text-[#111111] uppercase" style={{ fontWeight: 900 }}>
              ESTIMATED TOTAL
            </span>
            <span className="font-mono font-black text-xl sm:text-2xl text-[#FF6A00]">
              {formatPrice(cartTotal)}
            </span>
          </div>
        </div>

        {/* Security badge */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#666666] font-mono uppercase font-bold border-t border-gray-100">
          <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
          <span>GUGU ESCROW & 256-BIT ENCRYPTION</span>
        </div>
      </div>

      {/* 5. Sticky Bottom Checkout CTA Bar */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-gray-100 p-3 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-[#666666] uppercase">
              TOTAL ({selectedCartItemsCount} ITEMS)
            </span>
            <span className="font-mono font-black text-lg sm:text-xl text-[#FF6A00]">
              {formatPrice(cartTotal)}
            </span>
          </div>

          <button
            onClick={() => {
              if (selectedCartItemsCount === 0) return;
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={selectedCartItemsCount === 0}
            className="flex-1 max-w-xs py-3.5 bg-[#FF6A00] hover:bg-[#E65F00] disabled:opacity-50 text-white rounded-2xl font-mono font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all active-press"
          >
            <span>CHECKOUT ({selectedCartItemsCount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
