import React, { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
  Star,
  Zap,
  Truck,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { SortOption } from '../../types';

export const ExploreView: React.FC = () => {
  const {
    categories,
    filters,
    setFilters,
    resetFilters,
    filteredProducts,
    formatPrice
  } = useApp();

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Featured / Relevance', value: 'relevance' },
    { label: 'Best Selling', value: 'best_selling' },
    { label: 'Price: Low to High', value: 'price_low' },
    { label: 'Price: High to Low', value: 'price_high' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Newest Arrivals', value: 'newest' }
  ];

  const brands = [
    'GUGU AUDIO',
    'APEX WEAR',
    'SKYLARK ROBOTICS',
    'VELOCITY X',
    'VOLTRON SOLAR',
    'AERO COMPUTING',
    'GUGU MOBILE',
    'ZENAURA BOTANICALS',
    'AFRIKCRAFT PRO',
    'NEO SAHARA TECHWEAR',
    'GUGU HOME',
    'ROADVISION',
    'ZENTHERAPY',
    'AGRISUN SYSTEMS',
    'CYBERBLADE',
    'GUGU AMBIENT',
    'VANGUARD EYEWEAR',
    'GROOMMASTER'
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Header & Active Search Query Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight" style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
              CATALOG & SEARCH
            </h1>
            <p className="text-xs text-[#666666] font-medium">
              Discover thousands of tech gadgets, wearables, apparel, solar tools & smart devices
            </p>
          </div>

          {/* Action Buttons: Sort & Filter Toggle */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))}
                className="bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-[#111111] px-3.5 py-2 rounded-xl focus:outline-none focus:border-[#FF6A00] pr-8 cursor-pointer tracking-wider uppercase"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#666666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="bg-[#FF6A00] text-white px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#E65F00] transition-colors shadow-xs active-press tracking-wider uppercase"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTERS</span>
              {(filters.categorySlug !== 'all' || filters.minPrice > 0 || filters.rating > 0 || filters.freeShippingOnly || filters.flashDealsOnly || filters.brand !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, categorySlug: 'all' }))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all uppercase tracking-wider ${
              filters.categorySlug === 'all'
                ? 'bg-black text-white font-bold shadow-xs'
                : 'bg-gray-100 text-[#111111] hover:bg-[#FFF2E8] font-semibold border border-transparent'
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters((prev) => ({ ...prev, categorySlug: cat.slug }))}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all uppercase tracking-wider ${
                filters.categorySlug === cat.slug
                  ? 'bg-black text-white font-bold shadow-xs'
                  : 'bg-gray-100 text-[#111111] hover:bg-[#FFF2E8] font-semibold border border-transparent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Filter Chips / Reset */}
        {(filters.searchQuery || filters.categorySlug !== 'all' || filters.freeShippingOnly || filters.flashDealsOnly || filters.rating > 0 || filters.brand !== 'all') && (
          <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[#666666] text-[11px] font-mono uppercase font-bold">Active:</span>

            {filters.searchQuery && (
              <span className="bg-[#FFF2E8] text-[#FF6A00] border border-[#FF6A00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-mono font-bold">
                Keyword: "{filters.searchQuery}"
                <button onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.freeShippingOnly && (
              <span className="bg-[#FFF2E8] text-[#FF6A00] border border-[#FF6A00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-mono font-bold">
                Free Shipping
                <button onClick={() => setFilters((prev) => ({ ...prev, freeShippingOnly: false }))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.flashDealsOnly && (
              <span className="bg-[#FFF2E8] text-[#FF6A00] border border-[#FF6A00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-mono font-bold">
                Flash Deals
                <button onClick={() => setFilters((prev) => ({ ...prev, flashDealsOnly: false }))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.rating > 0 && (
              <span className="bg-[#FFF2E8] text-[#FF6A00] border border-[#FF6A00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-mono font-bold">
                {filters.rating}★ & Above
                <button onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.brand !== 'all' && (
              <span className="bg-[#FFF2E8] text-[#FF6A00] border border-[#FF6A00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-mono font-bold">
                Brand: {filters.brand}
                <button onClick={() => setFilters((prev) => ({ ...prev, brand: 'all' }))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-[#666666] hover:text-[#FF6A00] flex items-center gap-1 text-[11px] font-mono font-bold uppercase underline ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* 2. Results Header & Count */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono font-bold text-xs sm:text-sm text-[#111111] tracking-wider uppercase">
          {filteredProducts.length} PRODUCTS FOUND
        </span>
        <span className="text-xs text-[#666666] font-mono">
          VERIFIED NIGERIAN & GLOBAL STOCK
        </span>
      </div>

      {/* 3. Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 border border-[#EAEAEA] text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-nevera text-lg font-bold text-[#111111]">
            NO MATCHING PRODUCTS FOUND
          </h3>
          <p className="text-xs text-[#666666] max-w-sm mx-auto">
            We couldn't find any products matching your specific filters. Try loosening your price constraints or clearing the search terms.
          </p>
          <button
            onClick={resetFilters}
            className="bg-[#FF6A00] text-white px-4 py-2 rounded-xl text-xs font-orbitron font-bold hover:bg-[#E65F00] transition-colors inline-flex items-center gap-1.5 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            CLEAR ALL FILTERS
          </button>
        </div>
      )}

      {/* 4. Filter Drawer Modal */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#EAEAEA] overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#EAEAEA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#FF6A00]" />
                <h2 className="font-nevera text-lg font-bold text-[#111111]">
                  FILTER CATALOG
                </h2>
              </div>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="p-1 rounded-full text-[#666666] hover:bg-[#F7F7F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Category */}
              <div>
                <label className="block text-xs font-orbitron font-bold text-[#111111] mb-2 uppercase">
                  Category
                </label>
                <select
                  value={filters.categorySlug}
                  onChange={(e) => setFilters((prev) => ({ ...prev, categorySlug: e.target.value }))}
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] text-xs font-medium p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name} ({c.product_count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-orbitron font-bold text-[#111111] mb-2 uppercase">
                  Max Price ({formatPrice(filters.maxPrice)})
                </label>
                <input
                  type="range"
                  min="5000"
                  max="1500000"
                  step="5000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#FF6A00] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-[#666666] font-orbitron font-semibold mt-1">
                  <span>₦5,000</span>
                  <span>₦1,500,000</span>
                </div>
              </div>

              {/* Quick Toggle Checks */}
              <div className="space-y-2.5 pt-2 border-t border-[#EAEAEA]">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#111111]">
                  <input
                    type="checkbox"
                    checked={filters.freeShippingOnly}
                    onChange={(e) => setFilters((prev) => ({ ...prev, freeShippingOnly: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
                  />
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#FF6A00]" />
                    <span>Free Xpress Shipping Only</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#111111]">
                  <input
                    type="checkbox"
                    checked={filters.flashDealsOnly}
                    onChange={(e) => setFilters((prev) => ({ ...prev, flashDealsOnly: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
                  />
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#FF6A00]" />
                    <span>Flash Deals Only</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#111111]">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#FF6A00] focus:ring-[#FF6A00] accent-[#FF6A00]"
                  />
                  <span>In-Stock Only</span>
                </label>
              </div>

              {/* Minimum Customer Rating */}
              <div className="pt-2 border-t border-[#EAEAEA]">
                <label className="block text-xs font-orbitron font-bold text-[#111111] mb-2 uppercase">
                  Customer Rating
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 4, 4.5, 4.8].map((val) => (
                    <button
                      key={val}
                      onClick={() => setFilters((prev) => ({ ...prev, rating: val }))}
                      className={`p-2 rounded-xl text-xs font-orbitron font-semibold flex items-center justify-center gap-1 border transition-all ${
                        filters.rating === val
                          ? 'bg-[#FFF2E8] border-[#FF6A00] text-[#FF6A00]'
                          : 'bg-[#F7F7F7] border-[#EAEAEA] text-[#666666]'
                      }`}
                    >
                      {val === 0 ? (
                        'All'
                      ) : (
                        <>
                          <span>{val}</span>
                          <Star className="w-3 h-3 fill-current text-[#FF6A00]" />
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="pt-2 border-t border-[#EAEAEA]">
                <label className="block text-xs font-orbitron font-bold text-[#111111] mb-2 uppercase">
                  Brand / Manufacturer
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, brand: 'all' }))}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-orbitron transition-all ${
                      filters.brand === 'all'
                        ? 'bg-[#FF6A00] text-white font-bold'
                        : 'bg-[#F7F7F7] text-[#111111] border border-[#EAEAEA]'
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setFilters((prev) => ({ ...prev, brand: b }))}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-orbitron transition-all ${
                        filters.brand === b
                          ? 'bg-[#FF6A00] text-white font-bold'
                          : 'bg-[#F7F7F7] text-[#111111] border border-[#EAEAEA]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#EAEAEA] bg-white flex items-center gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 border border-[#EAEAEA] text-[#666666] hover:text-[#111111] rounded-xl text-xs font-orbitron font-bold"
              >
                RESET
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-2.5 bg-[#FF6A00] hover:bg-[#E65F00] text-white rounded-xl text-xs font-orbitron font-bold shadow-md"
              >
                SHOW {filteredProducts.length} ITEMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
