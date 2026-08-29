import React, { useState } from 'react';
import {
  User as UserIcon,
  Package,
  MapPin,
  Coins,
  ShieldCheck,
  Store,
  ChevronRight,
  Truck,
  RotateCcw,
  LogOut,
  Globe,
  DollarSign,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AccountView: React.FC = () => {
  const {
    currentUser,
    orders,
    currency,
    setCurrency,
    formatPrice,
    openOrderTracking,
    setCurrentView,
    addUserAddress,
    removeUserAddress,
    showToast
  } = useApp();

  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'shipped' | 'delivered'>('all');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [recipient, setRecipient] = useState(currentUser.full_name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lagos');
  const [state, setState] = useState('Lagos');

  const filteredOrders =
    orderFilter === 'all'
      ? orders
      : orderFilter === 'pending'
      ? orders.filter((o) => o.order_status === 'pending' || o.order_status === 'payment_confirmed' || o.order_status === 'processing')
      : orderFilter === 'shipped'
      ? orders.filter((o) => o.order_status === 'shipped' || o.order_status === 'in_transit' || o.order_status === 'out_for_delivery')
      : orders.filter((o) => o.order_status === 'delivered');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !recipient.trim()) return;

    addUserAddress({
      recipient_name: recipient,
      phone,
      address,
      city,
      state,
      country: 'Nigeria',
      postal_code: '100001',
      is_default: currentUser.addresses.length === 0
    });

    setShowAddressModal(false);
    setAddress('');
    showToast('New shipping address saved!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-24">
      {/* 1. Profile Identity Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EAEAEA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={currentUser.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FF6A00] shadow-sm shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-nevera text-lg sm:text-xl font-bold text-[#111111]">
                {currentUser.full_name}
              </h1>
              <span className="bg-[#FFF2E8] text-[#FF6A00] text-[9px] font-orbitron font-extrabold px-2 py-0.5 rounded border border-[#FF6A00]/30">
                VIP LEVEL 3
              </span>
            </div>
            <p className="text-xs text-[#666666]">{currentUser.email}</p>
            <div className="flex items-center gap-3 text-xs font-orbitron mt-1">
              <span className="text-[#FF6A00] font-bold flex items-center gap-1">
                <Coins className="w-3.5 h-3.5" />
                1,420 Gugu Coins
              </span>
              <span className="text-[#666666]">•</span>
              <span className="text-emerald-700 font-semibold">
                Member since {currentUser.created_at}
              </span>
            </div>
          </div>
        </div>

        {/* Merchant Hub Switch */}
        <button
          onClick={() => setCurrentView('seller_dashboard')}
          className="bg-[#111111] hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl text-xs font-orbitron font-bold flex items-center justify-center gap-2 transition-all shadow-md active-press self-start sm:self-auto"
        >
          <Store className="w-4 h-4 text-[#FF6A00]" />
          <span>SELLER HUB / DASHBOARD</span>
        </button>
      </div>

      {/* 2. Order Status Pipeline Tabs */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-nevera text-base font-bold text-[#111111]">
            MY ORDERS & SHIPMENTS
          </h2>
          <span className="text-xs text-[#666666] font-orbitron font-semibold">
            {orders.length} TOTAL PLACED
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Processing / To Pack' },
            { id: 'shipped', label: 'In Transit / Courier' },
            { id: 'delivered', label: 'Delivered / Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setOrderFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-orbitron whitespace-nowrap transition-all ${
                orderFilter === tab.id
                  ? 'bg-[#FF6A00] text-white font-bold shadow-xs'
                  : 'bg-[#F7F7F7] text-[#111111] hover:bg-[#FFF2E8] border border-[#EAEAEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Order Items List */}
        {filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#666666] space-y-2">
            <Package className="w-8 h-8 mx-auto text-gray-300" />
            <p>No orders in this category.</p>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] space-y-3 hover:border-gray-300 transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#EAEAEA] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-extrabold text-[#111111]">
                      ORDER #{ord.order_number}
                    </span>
                    <span className="bg-[#FF6A00] text-white text-[9px] font-orbitron font-bold px-1.5 py-0.2 rounded uppercase">
                      {ord.order_status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#666666] font-orbitron">
                    Placed: {new Date(ord.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Items preview */}
                <div className="space-y-2">
                  {ord.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-10 h-10 rounded-lg object-cover bg-white border border-[#EAEAEA] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-[#111111] line-clamp-1">
                            {item.product_name}
                          </span>
                          <span className="text-[10px] text-[#666666]">
                            Qty: {item.quantity} • Seller: {item.seller_name}
                          </span>
                        </div>
                      </div>
                      <span className="font-orbitron font-bold text-xs text-[#FF6A00] shrink-0">
                        {formatPrice(item.total_price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer with Track CTA */}
                <div className="pt-2 border-t border-[#EAEAEA] flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-[#666666]">Order Total: </span>
                    <strong className="font-orbitron text-[#111111]">{formatPrice(ord.total)}</strong>
                  </div>

                  <button
                    onClick={() => openOrderTracking(ord.id)}
                    className="bg-[#FF6A00] hover:bg-[#E65F00] text-white px-4 py-2 rounded-xl text-xs font-orbitron font-bold flex items-center gap-1.5 transition-all shadow-xs active-press"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>TRACK SHIPMENT</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Delivery Addresses Manager */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-nevera text-base font-bold text-[#111111]">
            SAVED DELIVERY ADDRESSES
          </h2>
          <button
            onClick={() => setShowAddressModal(true)}
            className="text-xs text-[#FF6A00] font-orbitron font-bold flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Address
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentUser.addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-3.5 rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#111111]">{addr.recipient_name}</span>
                  {addr.is_default && (
                    <span className="text-[9px] bg-[#FFF2E8] text-[#FF6A00] font-orbitron px-1.5 py-0.2 rounded font-bold">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#666666]">
                  {addr.address}, {addr.city}, {addr.state}
                </p>
                <p className="text-[11px] text-[#666666] font-orbitron mt-1">
                  Phone: {addr.phone}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-[#EAEAEA] flex items-center justify-end gap-2">
                <button
                  onClick={() => removeUserAddress(addr.id)}
                  className="text-xs text-[#666666] hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Preferences & Currency Switcher */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <h2 className="font-nevera text-base font-bold text-[#111111]">
          REGIONAL & CURRENCY PREFERENCES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#F7F7F7] rounded-xl border border-[#EAEAEA]">
            <label className="block font-orbitron font-bold text-[#111111] mb-1.5">
              DISPLAY CURRENCY
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { code: 'NGN', label: 'NGN (₦)' },
                { code: 'USD', label: 'USD ($)' },
                { code: 'GHS', label: 'GHS (₵)' }
              ].map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code as any)}
                  className={`py-2 rounded-lg font-orbitron font-bold text-xs transition-all ${
                    currency === c.code
                      ? 'bg-[#FF6A00] text-white shadow-xs'
                      : 'bg-white text-[#111111] border border-[#EAEAEA]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#F7F7F7] rounded-xl border border-[#EAEAEA] flex flex-col justify-center">
            <div className="flex items-center gap-2 font-bold text-[#111111] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
              <span>Gugu Escrow Guarantee Active</span>
            </div>
            <p className="text-[11px] text-[#666666]">
              All purchases made under this account qualify for our 100% money-back buyer guarantee program.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-[#EAEAEA] shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="font-nevera text-base font-bold text-[#111111]">
              ADD NEW DELIVERY ADDRESS
            </h3>

            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">
                  RECIPIENT NAME
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">
                  ADDRESS / STREET
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">STATE</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 border border-[#EAEAEA] font-orbitron font-bold rounded-xl text-[#666666]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6A00] hover:bg-[#E65F00] text-white font-orbitron font-bold rounded-xl shadow-md"
                >
                  SAVE ADDRESS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
