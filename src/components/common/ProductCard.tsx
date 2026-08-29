import React from 'react';
import { Heart, Star, ShoppingBag, Zap, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    formatPrice,
    toggleWishlist,
    isWishlisted,
    addToCart
  } = useApp();

  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <div
      onClick={() => openProductDetail(product.id)}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-[#FF6A00]/40 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md relative p-2.5 sm:p-3 gap-2"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.is_flash_deal && (
            <span className="bg-[#FF6A00] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs uppercase tracking-wider">
              <Zap className="w-2.5 h-2.5 fill-current" />
              FLASH
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#FF6A00] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors z-10 ${
            wishlisted
              ? 'bg-[#FF6A00] text-white'
              : 'bg-white/90 text-[#666666] hover:text-[#FF6A00] hover:bg-white'
          } shadow-xs active-press`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Free Shipping Tag on Image Bottom */}
        {product.is_free_shipping && (
          <div className="absolute bottom-1.5 left-2 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            FREE SHIPPING
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 justify-between gap-1.5">
        <div>
          {/* Seller / Brand */}
          <div className="flex items-center gap-1 text-[10px] text-[#666666] mb-0.5 font-medium truncate font-mono uppercase">
            <ShieldCheck className="w-3 h-3 text-[#FF6A00] shrink-0" />
            <span className="truncate">{product.brand || product.seller_name}</span>
          </div>

          {/* Product Name */}
          <h4 className="text-xs sm:text-sm font-semibold text-[#111111] line-clamp-2 leading-snug group-hover:text-[#FF6A00] transition-colors">
            {product.name}
          </h4>
        </div>

        <div>
          {/* Price Row */}
          <div className="flex items-baseline gap-2 flex-wrap mt-1">
            <span className="text-base sm:text-lg font-bold text-[#FF6A00] font-mono">
              {formatPrice(product.price)}
            </span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-xs text-gray-400 line-through font-mono">
                {formatPrice(product.compare_price)}
              </span>
            )}
          </div>

          {/* Rating and Sales */}
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase font-mono mt-1 pt-1.5 border-t border-gray-100">
            <span className="flex items-center gap-0.5 text-neutral-800">
              <span className="text-[#FF6A00]">★</span> {product.rating}
            </span>
            <span className="text-gray-400">
              {product.sales_count >= 1000 ? `${(product.sales_count / 1000).toFixed(1)}K` : product.sales_count} SOLD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
