import React, { useState } from 'react';
import { Search, ShoppingBag, Bell, Camera, User as UserIcon, Store, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenAIAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications, onOpenAIAssistant }) => {
  const {
    setCurrentView,
    currentView,
    cart,
    unreadNotificationCount,
    filters,
    setFilters,
    currentUser,
    setCurrentUserRole
  } = useApp();

  const [searchInput, setSearchInput] = useState(filters.searchQuery || '');
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, searchQuery: searchInput }));
    if (currentView !== 'explore') {
      setCurrentView('explore');
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAEAEA] shadow-xs">
      {/* Top Banner / Role Quick Switcher Bar */}
      <div className="bg-[#111111] text-white px-3 sm:px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse"></span>
          <span className="font-orbitron font-semibold text-[#FF6A00] tracking-wider hidden xs:inline">
            AFRICA'S FASTEST MARKETPLACE
          </span>
          <span className="text-gray-300 font-medium truncate">
            Free Xpress Delivery on orders above ₦25,000
          </span>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => onOpenAIAssistant()}
            className="flex items-center gap-1 bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/40 px-2 py-0.5 rounded-full font-orbitron text-[11px] font-bold hover:bg-[#FF6A00] hover:text-white transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>GUGU AI</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 px-2 py-0.5 rounded border border-neutral-700 font-orbitron text-[11px]"
            >
              <span className="text-gray-400">Mode:</span>
              <span className="text-[#FF6A00] font-bold capitalize">{currentUser.role}</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white text-[#111111] rounded-lg shadow-xl border border-[#EAEAEA] py-1 z-50">
                <div className="px-3 py-1.5 text-[11px] text-[#666666] font-semibold border-b border-[#EAEAEA]">
                  Switch Demo Account
                </div>
                {(['customer', 'seller', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentUserRole(r);
                      setShowRoleMenu(false);
                      if (r === 'seller') setCurrentView('seller-dashboard');
                      else if (r === 'admin') setCurrentView('admin-dashboard');
                      else setCurrentView('home');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#FFF2E8] hover:text-[#FF6A00] transition-colors ${
                      currentUser.role === r ? 'font-bold text-[#FF6A00] bg-[#FFF2E8]' : ''
                    }`}
                  >
                    <span className="capitalize">{r}</span>
                    {r === 'seller' && <Store className="w-3.5 h-3.5 text-[#666666]" />}
                    {r === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-[#666666]" />}
                    {r === 'customer' && <UserIcon className="w-3.5 h-3.5 text-[#666666]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Wordmark (Bold Typography Style: GUGU in Orange, XPRESS in Black) */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 shrink-0 group text-left"
          id="brand-logo-btn"
        >
          <div className="w-8 h-8 rounded-xl bg-[#FF6A00] flex items-center justify-center shadow-xs">
            <span className="font-orbitron font-black text-white text-base tracking-tighter">GX</span>
          </div>
          <div className="leading-none">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter" style={{ fontWeight: 900, letterSpacing: '-0.05em' }}>
              <span className="text-[#FF6A00]">GUGU</span>{' '}
              <span className="text-black">XPRESS</span>
            </span>
            <span className="block text-[9px] font-orbitron tracking-widest text-[#666666] font-bold mt-0.5">
              ONE XPRESS AWAY
            </span>
          </div>
        </button>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-2xl relative flex items-center"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="SEARCH FOR PRODUCTS, BRANDS..."
              className="w-full bg-[#F7F7F7] focus:bg-white text-[#111111] placeholder:text-gray-400 text-xs sm:text-sm pl-9 pr-16 sm:pr-20 py-2 sm:py-2.5 rounded-full border border-gray-200 focus:border-[#FF6A00] focus:outline-none transition-all shadow-2xs font-mono font-medium tracking-wide placeholder:font-mono placeholder:tracking-wider"
            />
            <Search className="w-4 h-4 text-[#FF6A00] absolute left-3 top-1/2 -translate-y-1/2" />
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setFilters((prev) => ({ ...prev, searchQuery: 'smartwatch' }));
                  setCurrentView('explore');
                }}
                title="Visual Search Demo"
                className="p-1 text-[#666666] hover:text-[#FF6A00] transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="bg-[#FF6A00] text-white px-3 sm:px-4 py-1 rounded-full text-xs font-mono font-bold hover:bg-[#E65F00] transition-colors active-press tracking-wider"
              >
                SEARCH
              </button>
            </div>
          </div>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="p-2 text-[#111111] hover:text-[#FF6A00] relative rounded-full hover:bg-gray-100 transition-colors active-press"
            title="Notifications"
            id="notifications-btn"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#FF6A00] text-white text-[10px] font-mono font-bold px-1 rounded-full border-2 border-white flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setCurrentView('cart')}
            className="p-2 text-[#111111] hover:text-[#FF6A00] relative rounded-full hover:bg-gray-100 transition-colors active-press flex items-center"
            title="Cart"
            id="cart-header-btn"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} />
            {totalCartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#FF6A00] text-white text-[10px] font-mono font-bold px-1 rounded-full border-2 border-white flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
