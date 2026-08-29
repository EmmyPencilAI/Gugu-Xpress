import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Plus,
  Truck,
  CreditCard,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Loader2,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentProvider, UserAddress } from '../../types';

export const CheckoutView: React.FC = () => {
  const {
    currentUser,
    addUserAddress,
    cartTotal,
    cartSubtotal,
    cartShippingFee,
    cartDiscount,
    selectedCartItemsCount,
    appliedCoupon,
    formatPrice,
    createOrder,
    openOrderTracking,
    setCurrentView,
    showToast
  } = useApp();

  // Selected Address State
  const defaultAddr = currentUser.addresses.find((a) => a.is_default) || currentUser.addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultAddr?.id || '');

  // Add Address Modal
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newRecipient, setNewRecipient] = useState(currentUser.full_name || '');
  const [newPhone, setNewPhone] = useState(currentUser.phone || '');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('Ikeja');
  const [newState, setNewState] = useState('Lagos');

  // Payment Provider State
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('paystack');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [createdOrderRef, setCreatedOrderRef] = useState<string>('');

  // Virtual bank account copy state
  const [copiedBank, setCopiedBank] = useState(false);

  const selectedAddress = currentUser.addresses.find((a) => a.id === selectedAddressId) || currentUser.addresses[0];

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim() || !newRecipient.trim() || !newPhone.trim()) {
      showToast('Please fill in all address fields', 'error');
      return;
    }

    addUserAddress({
      recipient_name: newRecipient,
      phone: newPhone,
      address: newAddress,
      city: newCity,
      state: newState,
      country: 'Nigeria',
      postal_code: '100001',
      is_default: currentUser.addresses.length === 0
    });

    setShowAddAddressModal(false);
    setNewAddress('');
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      showToast('Please select or add a shipping address', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Simulate server payment initialization
      await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartTotal,
          currency: 'NGN',
          provider: selectedProvider,
          email: currentUser.email
        })
      });

      // 2. Simulate server payment verification
      await new Promise((r) => setTimeout(r, 1500));

      // 3. Create the enriched order with tracking steps
      const newOrder = await createOrder(selectedProvider, selectedAddress);

      setPaymentSuccess(true);
      setCreatedOrderRef(newOrder.id);
      showToast(`Order #${newOrder.order_number} confirmed!`, 'success');

      // Auto redirect to Order Tracking after 2 seconds
      setTimeout(() => {
        openOrderTracking(newOrder.id);
      }, 2200);
    } catch (err: any) {
      console.error('Checkout error:', err);
      showToast('Checkout failed. Please try again.', 'error');
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#EAEAEA] shadow-md text-center space-y-4 max-w-lg mx-auto my-8 animate-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="font-nevera text-2xl sm:text-3xl font-black text-[#111111]">
          PAYMENT CONFIRMED!
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Your payment of <strong className="text-[#FF6A00] font-orbitron">{formatPrice(cartTotal)}</strong> has been secured in escrow. Your package is now moving to merchant fulfillment!
        </p>
        <div className="p-3 bg-[#F7F7F7] rounded-xl border border-[#EAEAEA] text-xs font-orbitron text-[#111111]">
          Redirecting to Live Order Tracking...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-24">
      {/* 1. Header */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={() => setCurrentView('cart')}
          className="flex items-center gap-1.5 text-xs font-orbitron font-bold text-[#111111] hover:text-[#FF6A00] transition-colors p-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO CART</span>
        </button>

        <div className="flex items-center gap-1 text-xs text-[#666666] font-orbitron">
          <Lock className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>256-BIT ESCROW ENCRYPTED</span>
        </div>
      </div>

      {/* 2. Step 1: Shipping Address Selection */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-orbitron font-bold">
              1
            </div>
            <h3 className="font-nevera text-sm sm:text-base font-bold text-[#111111]">
              DELIVERY DESTINATION
            </h3>
          </div>

          <button
            onClick={() => setShowAddAddressModal(true)}
            className="text-xs text-[#FF6A00] font-orbitron font-bold flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Address
          </button>
        </div>

        {/* Address Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {currentUser.addresses.map((addr) => {
            const isSelected = selectedAddressId === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FF6A00] bg-[#FFF2E8]/40 shadow-xs'
                    : 'border-[#EAEAEA] bg-[#F7F7F7] hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#111111]">{addr.recipient_name}</span>
                    {addr.is_default && (
                      <span className="text-[9px] bg-neutral-200 text-neutral-800 font-orbitron px-1.5 py-0.2 rounded font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {addr.address}, {addr.city}, {addr.state}
                  </p>
                  <p className="text-[11px] text-[#666666] font-orbitron mt-1">
                    Phone: {addr.phone}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-black/5 flex items-center justify-between">
                  <span className={`text-[10px] font-orbitron font-bold ${isSelected ? 'text-[#FF6A00]' : 'text-gray-400'}`}>
                    {isSelected ? '✓ SELECTED FOR DELIVERY' : 'Click to select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Step 2: Shipping Method */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-orbitron font-bold">
            2
          </div>
          <h3 className="font-nevera text-sm sm:text-base font-bold text-[#111111]">
            SHIPPING COURIER & SPEED
          </h3>
        </div>

        <div className="p-3.5 rounded-xl border border-[#FF6A00] bg-[#FFF2E8]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6A00] text-white flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-[#111111]">Gugu Xpress Courier Priority</h4>
                <span className="bg-emerald-600 text-white text-[9px] font-orbitron font-bold px-1.5 py-0.2 rounded">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-xs text-[#666666]">
                Estimated delivery in <strong>2 - 4 Business Days</strong> with real-time GPS tracking
              </p>
            </div>
          </div>

          <span className="font-orbitron font-bold text-xs sm:text-sm text-[#FF6A00]">
            {cartShippingFee === 0 ? 'FREE' : formatPrice(cartShippingFee)}
          </span>
        </div>
      </div>

      {/* 4. Step 3: Payment Gateway Selector */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-xs font-orbitron font-bold">
            3
          </div>
          <h3 className="font-nevera text-sm sm:text-base font-bold text-[#111111]">
            SELECT PAYMENT GATEWAY
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Paystack */}
          <div
            onClick={() => setSelectedProvider('paystack')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedProvider === 'paystack'
                ? 'border-[#FF6A00] bg-[#FFF2E8]/40 shadow-xs'
                : 'border-[#EAEAEA] bg-[#F7F7F7]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#111111]">Paystack Gateway</h4>
                {selectedProvider === 'paystack' && (
                  <span className="text-[#FF6A00] text-xs font-bold">✓</span>
                )}
              </div>
              <p className="text-[11px] text-[#666666]">
                Debit Card (Mastercard / Visa / Verve), USSD, Apple Pay
              </p>
            </div>
          </div>

          {/* Flutterwave */}
          <div
            onClick={() => setSelectedProvider('flutterwave')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedProvider === 'flutterwave'
                ? 'border-[#FF6A00] bg-[#FFF2E8]/40 shadow-xs'
                : 'border-[#EAEAEA] bg-[#F7F7F7]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#111111]">Flutterwave (Barter / Mobile)</h4>
                {selectedProvider === 'flutterwave' && (
                  <span className="text-[#FF6A00] text-xs font-bold">✓</span>
                )}
              </div>
              <p className="text-[11px] text-[#666666]">
                Cards, Mobile Money (M-Pesa, MTN MoMo), Bank Transfer
              </p>
            </div>
          </div>

          {/* Dedicated Virtual Bank Account */}
          <div
            onClick={() => setSelectedProvider('bank_transfer')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 sm:col-span-2 ${
              selectedProvider === 'bank_transfer'
                ? 'border-[#FF6A00] bg-[#FFF2E8]/40 shadow-xs'
                : 'border-[#EAEAEA] bg-[#F7F7F7]'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#111111]">
                  Direct Bank Transfer (Instant Automated Verification)
                </h4>
                {selectedProvider === 'bank_transfer' && (
                  <span className="text-[#FF6A00] text-xs font-bold">✓</span>
                )}
              </div>
              <p className="text-[11px] text-[#666666]">
                Transfer from any Nigerian bank app. Instant automatic confirmation in 10 seconds.
              </p>

              {selectedProvider === 'bank_transfer' && (
                <div className="mt-3 p-3 bg-white rounded-lg border border-[#EAEAEA] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Bank Name:</span>
                    <strong className="text-[#111111] font-orbitron">Wema Bank / Providus Bank</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Account Number:</span>
                    <div className="flex items-center gap-1.5 font-orbitron font-bold text-[#FF6A00]">
                      <span>9840192841</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText('9840192841');
                          setCopiedBank(true);
                          setTimeout(() => setCopiedBank(false), 2000);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#666666]">Account Name:</span>
                    <strong className="text-[#111111]">Gugu Xpress / {currentUser.full_name}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Step 4: Final Order Breakdown & Escrow Confirmation */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <h3 className="font-nevera text-sm font-bold text-[#111111]">
          FINAL ORDER TOTAL
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#666666]">Items Subtotal ({selectedCartItemsCount} items)</span>
            <span className="font-orbitron font-bold text-[#111111]">{formatPrice(cartSubtotal)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#666666]">Express Delivery Freight</span>
            <span className="font-orbitron font-bold text-[#111111]">
              {cartShippingFee === 0 ? <span className="text-emerald-700">FREE</span> : formatPrice(cartShippingFee)}
            </span>
          </div>

          {cartDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-700 font-bold">
              <span>Coupon Savings ({appliedCoupon?.code})</span>
              <span className="font-orbitron">-{formatPrice(cartDiscount)}</span>
            </div>
          )}

          <div className="pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-sm sm:text-base">
            <span className="font-nevera font-bold text-[#111111]">PAYABLE AMOUNT</span>
            <span className="font-orbitron font-black text-xl text-[#FF6A00]">{formatPrice(cartTotal)}</span>
          </div>
        </div>

        {/* Place Order CTA */}
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="w-full mt-3 py-3.5 bg-[#FF6A00] hover:bg-[#E65F00] disabled:opacity-50 text-white rounded-xl font-orbitron font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all active-press"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>SECURING PAYMENT & ESCROW...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>PAY {formatPrice(cartTotal)} & PLACE ORDER</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#666666] font-medium pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>Payment is held in merchant escrow until you inspect package upon delivery.</span>
        </div>
      </div>

      {/* 6. Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-[#EAEAEA] shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="font-nevera text-base font-bold text-[#111111]">
              ADD NEW DELIVERY ADDRESS
            </h3>

            <form onSubmit={handleSaveNewAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">RECIPIENT FULL NAME</label>
                <input
                  type="text"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">PHONE NUMBER</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">STREET ADDRESS / BUILDING / APARTMENT</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="e.g. Flat 3B, Plot 14 Admiralty Way, Lekki Phase 1"
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">CITY</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">STATE</label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddressModal(false)}
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
