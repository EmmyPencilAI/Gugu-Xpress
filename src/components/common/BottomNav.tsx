import React from 'react';
import { Home, Compass, ShoppingBag, Heart, User, Store, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, cart, wishlist, currentUser } = useApp();

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  interface NavItem {
    id: AppView;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: <ShoppingBag className="w-5 h-5" />,
      badge: totalCartCount
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: <Heart className="w-5 h-5" />,
      badge: wishlist.length > 0 ? wishlist.length : undefined
    },
    {
      id: currentUser.role === 'seller' ? 'seller-dashboard' : currentUser.role === 'admin' ? 'admin-dashboard' : 'account',
      label: currentUser.role === 'seller' ? 'Seller Hub' : currentUser.role === 'admin' ? 'Admin' : 'Account',
      icon: currentUser.role === 'seller' ? <Store className="w-5 h-5" /> : currentUser.role === 'admin' ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 safe-bottom pb-1 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-5 h-14">
        {navItems.map((item) => {
          const isActive = currentView === item.id || 
            (item.id === 'home' && currentView === 'product-detail') ||
            (item.id === 'account' && (currentView === 'order-tracking' || currentView === 'checkout'));

          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center relative transition-colors duration-150 active-press ${
                isActive ? 'text-[#FF6A00]' : 'text-gray-400 hover:text-[#111111]'
              }`}
              id={`nav-${item.id}`}
            >
              <div className="relative">
                {item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#FF6A00] text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-mono uppercase mt-0.5 tracking-wider ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-[#FF6A00] rounded-b-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
