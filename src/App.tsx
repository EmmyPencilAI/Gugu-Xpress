import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { NotificationsModal } from './components/common/NotificationsModal';
import { GuguAIAssistant } from './components/ai/GuguAIAssistant';

// Views
import { HomeView } from './components/home/HomeView';
import { ExploreView } from './components/explore/ExploreView';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CartView } from './components/cart/CartView';
import { CheckoutView } from './components/checkout/CheckoutView';
import { OrderTrackingView } from './components/orders/OrderTrackingView';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { SellerStoreView } from './components/seller/SellerStoreView';
import { WishlistView } from './components/wishlist/WishlistView';
import { AccountView } from './components/account/AccountView';
import { ShieldCheck, Truck, RotateCcw, Headphones, Heart } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#111111] flex flex-col selection:bg-[#FF6A00] selection:text-white font-sans">
      {/* 1. Global Navigation Header */}
      <Header />

      {/* 2. Main Responsive Canvas Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
        {currentView === 'home' && <HomeView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'product_detail' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order_tracking' && <OrderTrackingView />}
        {currentView === 'seller_dashboard' && <SellerDashboard />}
        {currentView === 'seller_store' && <SellerStoreView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'account' && <AccountView />}
      </main>

      {/* 3. Global Marketplace Footer (Hidden on Checkout) */}
      {currentView !== 'checkout' && (
        <footer className="bg-[#111111] text-white mt-12 pb-20 md:pb-8 pt-8 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
            {/* Value Guarantees */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#FF6A00] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-orbitron font-bold text-white uppercase">Xpress Air Cargo</div>
                  <div className="text-neutral-400 text-[11px]">Direct 2-4 day delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#FF6A00] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-orbitron font-bold text-white uppercase">Escrow Protection</div>
                  <div className="text-neutral-400 text-[11px]">Safe merchant escrow hold</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#FF6A00] flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-orbitron font-bold text-white uppercase">7-Day Free Return</div>
                  <div className="text-neutral-400 text-[11px]">Hassle-free refunds</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 text-[#FF6A00] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-orbitron font-bold text-white uppercase">24/7 AI & Human Help</div>
                  <div className="text-neutral-400 text-[11px]">Instant support anywhere</div>
                </div>
              </div>
            </div>

            {/* Brand and Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="font-nevera font-black text-base text-white tracking-wider">
                  GUGU <span className="text-[#FF6A00]">XPRESS</span>
                </span>
                <span>• Everything You Want. One Xpress Away.</span>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-orbitron">
                <button onClick={() => setCurrentView('explore')} className="hover:text-white">
                  DISCOVERY
                </button>
                <button onClick={() => setCurrentView('seller_dashboard')} className="hover:text-[#FF6A00]">
                  MERCHANT HUB
                </button>
                <button onClick={() => setCurrentView('account')} className="hover:text-white">
                  MY ORDERS
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* 4. Global Modals & Floating AI Widget */}
      <NotificationsModal />
      <ToastContainer />
      <GuguAIAssistant />

      {/* 5. Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
