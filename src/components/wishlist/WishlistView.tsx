import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, products, setCurrentView } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-14 border border-[#EAEAEA] shadow-xs text-center space-y-4 max-w-lg mx-auto my-6">
        <div className="w-18 h-18 rounded-full bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center mx-auto">
          <Heart className="w-9 h-9" />
        </div>
        <h2 className="font-nevera text-2xl font-bold text-[#111111]">
          YOUR WISHLIST IS EMPTY
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Save your favorite smart gadgets, solar panels, and tech apparel here to track price drops and flash sales.
        </p>
        <button
          onClick={() => setCurrentView('home')}
          className="bg-[#FF6A00] hover:bg-[#E65F00] text-white px-6 py-3 rounded-full font-orbitron font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 active-press"
        >
          <span>EXPLORE TRENDING ITEMS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-24">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-[#EAEAEA] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('home')}
            className="p-1.5 rounded-lg hover:bg-[#F7F7F7] text-[#111111]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-nevera text-lg sm:text-xl font-bold text-[#111111]">
              MY SAVED WISHLIST ({wishlistedProducts.length})
            </h1>
            <p className="text-xs text-[#666666]">
              Products you are keeping an eye on for price reductions
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {wishlistedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
