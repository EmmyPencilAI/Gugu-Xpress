import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  CheckCircle2,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  X,
  Camera
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    setCurrentView,
    openSellerStore,
    addToCart,
    isWishlisted,
    toggleWishlist,
    formatPrice,
    reviews,
    addReview,
    showToast
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  // Image Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  // Variant Selection State (mapping groupName -> selected option value)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((group) => {
      if (group.options.length > 0) {
        initial[group.name] = group.options[0].value;
      }
    });
    return initial;
  });

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Destination City selector for live delivery calculation
  const [destinationCity, setDestinationCity] = useState('Lagos (Ikeja Hub)');

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Calculate dynamic unit price including variant modifiers
  let unitPrice = product.price;
  product.variants?.forEach((group) => {
    const chosenVal = selectedVariants[group.name];
    if (chosenVal) {
      const opt = group.options.find((o) => o.value === chosenVal || o.name === chosenVal);
      if (opt && opt.price_modifier) {
        unitPrice += opt.price_modifier;
      }
    }
  });

  const productReviews = reviews.filter((r) => r.product_id === product.id);
  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Gugu Xpress!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariants, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariants, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast('Please fill in both title and comment', 'error');
      return;
    }

    addReview({
      product_id: product.id,
      user_id: 'user-current',
      user_name: 'Verified Customer',
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      images: [],
      verified_purchase: true
    });

    setShowReviewModal(false);
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-24">
      {/* 1. Top Navigation Bar */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-1.5 text-xs font-orbitron font-bold text-[#111111] hover:text-[#FF6A00] transition-colors p-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO STORE</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full border border-[#EAEAEA] text-[#666666] hover:text-[#FF6A00] hover:bg-white transition-colors"
            title="Share Product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full border transition-colors ${
              wishlisted
                ? 'border-[#FF6A00] bg-[#FF6A00] text-white'
                : 'border-[#EAEAEA] text-[#666666] hover:text-[#FF6A00] hover:bg-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Main Product Hero (Gallery + Key Details) */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EAEAEA] shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left: Image Gallery */}
        <div className="space-y-3">
          {/* Main Display Image */}
          <div
            onClick={() => setIsImageZoomed(true)}
            className="relative aspect-square w-full rounded-2xl bg-[#F7F7F7] border border-[#EAEAEA] overflow-hidden cursor-zoom-in group"
          >
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.is_flash_deal && (
                <span className="bg-[#FF6A00] text-white text-xs font-orbitron font-extrabold px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
                  <Zap className="w-3 h-3 fill-current" />
                  FLASH SALE
                </span>
              )}
              {discountPercent > 0 && (
                <span className="bg-[#111111] text-white text-xs font-orbitron font-bold px-2 py-0.5 rounded shadow-xs">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                    idx === activeImageIndex
                      ? 'border-[#FF6A00] shadow-sm'
                      : 'border-[#EAEAEA] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Configurator */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            {/* Seller & Brand Meta */}
            <div className="flex items-center justify-between text-xs text-[#666666] mb-1.5">
              <span className="font-orbitron font-bold text-[#FF6A00] uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="bg-[#F7F7F7] px-2 py-0.5 rounded border border-[#EAEAEA] text-[10px] font-orbitron">
                SKU: {product.id.toUpperCase()}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#111111] leading-snug tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
              {product.name}
            </h1>

            {/* Ratings & Orders */}
            <div className="flex items-center gap-3 text-xs text-[#666666] mt-2 pb-3 border-b border-gray-100 font-mono">
              <div className="flex items-center text-[#FF6A00]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-sm text-[#111111] ml-1">
                  {product.rating}
                </span>
              </div>
              <span>•</span>
              <span className="font-bold underline cursor-pointer uppercase">
                {product.review_count} Reviews
              </span>
              <span>•</span>
              <span className="font-bold text-[#111111] uppercase">
                {product.sales_count.toLocaleString()} Sold
              </span>
            </div>

            {/* Pricing Section */}
            <div className="my-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-baseline justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#666666] uppercase tracking-wider">
                  XPRESS PRICE
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-mono font-black text-2xl sm:text-3xl md:text-4xl text-[#FF6A00]">
                    {formatPrice(unitPrice)}
                  </span>
                  {product.compare_price && (
                    <span className="text-xs text-gray-400 line-through font-mono">
                      {formatPrice(product.compare_price)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-[#FF6A00] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                {product.variants.map((group) => (
                  <div key={group.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-orbitron font-bold text-[#111111]">
                      <span>{group.name.toUpperCase()}</span>
                      <span className="text-[#FF6A00] font-normal font-sans">
                        {selectedVariants[group.name]}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => {
                        const isSelected = selectedVariants[group.name] === opt.value;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setSelectedVariants((prev) => ({
                                ...prev,
                                [group.name]: opt.value
                              }))
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all active-press ${
                              isSelected
                                ? 'border-[#FF6A00] bg-[#FFF2E8] text-[#FF6A00] font-bold shadow-2xs'
                                : 'border-[#EAEAEA] bg-[#F7F7F7] text-[#111111] hover:border-gray-400'
                            }`}
                          >
                            <span>{opt.name}</span>
                            {opt.price_modifier ? (
                              <span className="ml-1 text-[10px] text-[#FF6A00] font-orbitron">
                                (+{formatPrice(opt.price_modifier)})
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-3.5 flex items-center justify-between">
              <span className="text-xs font-orbitron font-bold text-[#111111]">
                QUANTITY:
              </span>
              <div className="flex items-center border border-[#EAEAEA] rounded-xl overflow-hidden bg-[#F7F7F7]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-white text-[#111111] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-orbitron font-bold text-xs">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-2 hover:bg-white text-[#111111] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs on Desktop */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={handleAddToCart}
              className="py-3 border-2 border-[#FF6A00] text-[#FF6A00] hover:bg-[#FFF2E8] rounded-xl font-orbitron font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active-press"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO CART</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3 bg-[#FF6A00] hover:bg-[#E65F00] text-white rounded-xl font-orbitron font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active-press"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>BUY NOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Shipping, Delivery & Buyer Protection Info */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <h3 className="font-nevera text-sm font-bold text-[#111111] flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#FF6A00]" />
          SHIPPING & ESTIMATED DELIVERY
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-[#F7F7F7] p-3 rounded-xl border border-[#EAEAEA]">
            <div className="text-[10px] font-orbitron font-semibold text-[#666666] mb-1 uppercase">
              Destination Location
            </div>
            <select
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              className="w-full bg-white border border-[#EAEAEA] text-xs font-semibold p-2 rounded-lg focus:border-[#FF6A00] focus:outline-none"
            >
              <option value="Lagos (Ikeja Hub)">Lagos (Ikeja / Lekki Express)</option>
              <option value="Abuja (Central District)">Abuja (Wuse / Maitama Hub)</option>
              <option value="Port Harcourt (Rivers)">Port Harcourt (GRA / Trans-Amadi)</option>
              <option value="Kano (Main Hub)">Kano (Commercial Hub)</option>
              <option value="Accra (Airport City)">Accra (Greater Accra Regional Hub)</option>
              <option value="Nairobi (CBD)">Nairobi (Express Cargo Hub)</option>
            </select>
          </div>

          <div className="bg-[#F7F7F7] p-3 rounded-xl border border-[#EAEAEA] flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#111111] font-orbitron">XPRESS AIR FREIGHT:</span>
              <span className="text-[#FF6A00] font-orbitron font-bold">
                {product.is_free_shipping ? 'FREE' : formatPrice(product.shipping_fee || 1500)}
              </span>
            </div>
            <p className="text-[11px] text-[#666666] mt-0.5">
              Estimated Arrival: <strong className="text-[#111111]">{product.estimated_days}</strong>
            </p>
          </div>
        </div>

        {/* Guarantees Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#EAEAEA] text-center">
          <div className="p-2">
            <ShieldCheck className="w-4 h-4 text-[#FF6A00] mx-auto mb-0.5" />
            <span className="block text-[10px] font-bold text-[#111111]">100% Genuine</span>
            <span className="text-[9px] text-[#666666]">Direct from factory</span>
          </div>
          <div className="p-2">
            <RotateCcw className="w-4 h-4 text-[#FF6A00] mx-auto mb-0.5" />
            <span className="block text-[10px] font-bold text-[#111111]">7-Day Returns</span>
            <span className="text-[9px] text-[#666666]">Instant replacement</span>
          </div>
          <div className="p-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF6A00] mx-auto mb-0.5" />
            <span className="block text-[10px] font-bold text-[#111111]">Escrow Protected</span>
            <span className="text-[9px] text-[#666666]">Safe checkout</span>
          </div>
        </div>
      </div>

      {/* 4. Specifications & Description */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-4">
        <h3 className="font-nevera text-sm sm:text-base font-bold text-[#111111]">
          TECHNICAL SPECIFICATIONS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {Object.entries(product.specifications || {}).map(([key, val]) => (
            <div
              key={key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#F7F7F7] border border-[#EAEAEA]"
            >
              <span className="text-[#666666] font-medium">{key}</span>
              <span className="text-[#111111] font-semibold text-right">{val}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#EAEAEA]">
          <h4 className="font-nevera text-xs font-bold text-[#111111] mb-2 uppercase">
            Product Overview
          </h4>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* 5. Verified Seller Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF2E8] border border-[#FF6A00]/30 text-[#FF6A00] flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-[#111111]">{product.seller_name}</h4>
              <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />
            </div>
            <p className="text-xs text-[#666666]">{product.seller_location}</p>
            <div className="flex items-center gap-2 text-[11px] font-orbitron font-semibold text-[#111111] mt-0.5">
              <span className="text-[#FF6A00]">★ {product.seller_rating}</span>
              <span>•</span>
              <span className="text-[#666666]">Verified Merchant</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const sellerSlug = product.seller_id.replace('seller-', '');
              openSellerStore(sellerSlug);
            }}
            className="flex-1 sm:flex-none px-4 py-2 border border-[#FF6A00] text-[#FF6A00] hover:bg-[#FFF2E8] rounded-xl text-xs font-orbitron font-bold transition-colors"
          >
            VISIT STORE
          </button>
          <button
            onClick={() => showToast('Following merchant store for exclusive coupon alerts!', 'success')}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#111111] text-white hover:bg-neutral-800 rounded-xl text-xs font-orbitron font-bold transition-colors"
          >
            FOLLOW
          </button>
        </div>
      </div>

      {/* 6. Customer Reviews & Ratings Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-nevera text-base font-bold text-[#111111]">
              CUSTOMER REVIEWS & FEEDBACK
            </h3>
            <p className="text-xs text-[#666666]">Real reviews from verified buyers</p>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#FFF2E8] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold transition-colors flex items-center gap-1 shadow-2xs active-press"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Write Review
          </button>
        </div>

        {/* Rating Overview Box */}
        <div className="p-4 rounded-xl bg-[#F7F7F7] border border-[#EAEAEA] flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="text-center">
            <span className="font-orbitron font-black text-3xl sm:text-4xl text-[#FF6A00]">
              {product.rating}
            </span>
            <div className="flex items-center justify-center text-[#FF6A00] my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] text-[#666666] font-orbitron">
              {productReviews.length} Reviews
            </span>
          </div>

          <div className="flex-1 w-full space-y-1.5 text-xs">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-8 font-orbitron text-[10px] text-[#666666]">{stars} ★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6A00] rounded-full"
                    style={{ width: stars === 5 ? '85%' : stars === 4 ? '12%' : '3%' }}
                  />
                </div>
                <span className="w-8 text-right font-orbitron text-[10px] text-[#666666]">
                  {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-3 pt-2">
          {productReviews.length === 0 ? (
            <p className="text-xs text-[#666666] text-center py-4">
              Be the first to review this product and earn 100 Gugu Coins!
            </p>
          ) : (
            productReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 rounded-xl border border-[#EAEAEA] bg-white space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={rev.user_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover bg-gray-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#111111]">{rev.user_name}</span>
                        {rev.verified_purchase && (
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-orbitron font-semibold px-1.5 py-0.2 rounded border border-emerald-200">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-[#FF6A00] text-[10px]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-orbitron text-[#666666]">
                    {new Date(rev.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h5 className="text-xs font-bold text-[#111111]">{rev.title}</h5>
                <p className="text-xs text-[#666666] leading-relaxed">{rev.comment}</p>

                {rev.images && rev.images.length > 0 && (
                  <div className="flex gap-2 pt-1">
                    {rev.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover border border-[#EAEAEA]"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-end pt-1">
                  <button
                    onClick={() => showToast('Marked review as helpful', 'info')}
                    className="text-[11px] text-[#666666] hover:text-[#FF6A00] flex items-center gap-1"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({rev.helpful_count})</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 7. Full-Screen Image Zoom Modal */}
      {isImageZoomed && (
        <div
          onClick={() => setIsImageZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setIsImageZoomed(false)}
            className="absolute top-4 right-4 p-2 text-white bg-black/50 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* 8. Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-[#EAEAEA] shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
              <h3 className="font-nevera text-base font-bold text-[#111111]">
                WRITE A REVIEW
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1 rounded-full text-[#666666] hover:bg-[#F7F7F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-orbitron font-bold text-[#111111] mb-1">
                  YOUR RATING
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 text-[#FF6A00] transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= reviewRating ? 'fill-current' : 'text-gray-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-orbitron font-bold text-[#111111] mb-1">
                  HEADLINE / SUMMARY
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Excellent build quality & fast delivery"
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] text-xs p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-orbitron font-bold text-[#111111] mb-1">
                  DETAILED FEEDBACK
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell other shoppers what you liked about sound, speed, quality, or seller packaging..."
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] text-xs p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-[#EAEAEA] text-xs font-orbitron font-bold rounded-xl text-[#666666]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6A00] hover:bg-[#E65F00] text-white text-xs font-orbitron font-bold rounded-xl shadow-md"
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Mobile Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-[#EAEAEA] p-3 md:hidden shadow-xl flex items-center gap-2">
        <div className="flex flex-col pr-2">
          <span className="text-[10px] font-orbitron text-[#666666]">Total</span>
          <span className="font-orbitron font-bold text-sm text-[#FF6A00] whitespace-nowrap">
            {formatPrice(unitPrice * quantity)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-2.5 border border-[#FF6A00] text-[#FF6A00] bg-[#FFF2E8] rounded-xl font-orbitron font-bold text-xs flex items-center justify-center gap-1 active-press"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>CART</span>
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 py-2.5 bg-[#FF6A00] text-white rounded-xl font-orbitron font-bold text-xs flex items-center justify-center gap-1 shadow-md active-press"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>BUY NOW</span>
        </button>
      </div>
    </div>
  );
};
