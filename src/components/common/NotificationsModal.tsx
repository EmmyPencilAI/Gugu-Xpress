import React from 'react';
import { X, CheckCheck, Bell, Tag, Package, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    openOrderTracking,
    setCurrentView,
    setFilters
  } = useApp();

  if (!isOpen) return null;

  const handleNotificationClick = (n: typeof notifications[0]) => {
    markNotificationAsRead(n.id);
    if (n.type === 'order' && n.action_url) {
      openOrderTracking(n.action_url);
      onClose();
    } else if (n.type === 'promo') {
      setFilters((prev) => ({ ...prev, flashDealsOnly: true }));
      setCurrentView('explore');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#EAEAEA] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-[#EAEAEA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#FF6A00]" />
            <h2 className="font-nevera text-lg font-bold text-[#111111]">
              NOTIFICATIONS
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs text-[#FF6A00] hover:underline flex items-center gap-1 font-orbitron font-semibold"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark All Read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#666666] hover:bg-[#F7F7F7]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto p-3 space-y-2 flex-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-[#666666]">
              <Bell className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="font-medium text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  n.read
                    ? 'bg-white border-[#EAEAEA] text-[#666666]'
                    : 'bg-[#FFF2E8]/40 border-[#FF6A00]/30 text-[#111111]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    n.type === 'order'
                      ? 'bg-[#FF6A00] text-white'
                      : n.type === 'promo'
                      ? 'bg-purple-600 text-white'
                      : 'bg-neutral-800 text-white'
                  }`}
                >
                  {n.type === 'order' && <Package className="w-4 h-4" />}
                  {n.type === 'promo' && <Tag className="w-4 h-4" />}
                  {n.type === 'system' && <AlertCircle className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold truncate text-[#111111]">{n.title}</h4>
                    <span className="text-[10px] text-[#666666] shrink-0 font-orbitron">{n.timestamp}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#666666]">{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
