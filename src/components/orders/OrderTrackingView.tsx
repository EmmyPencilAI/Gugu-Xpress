import React, { useState } from 'react';
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  ShieldCheck,
  Phone,
  MessageSquare,
  FileText,
  Play,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrderTrackingView: React.FC = () => {
  const {
    orders,
    selectedOrderId,
    setCurrentView,
    advanceOrderTracking,
    formatPrice,
    showToast
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);

  // Find the selected order, or fallback to the latest order
  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-14 border border-[#EAEAEA] shadow-xs text-center space-y-4 max-w-lg mx-auto my-6">
        <div className="w-16 h-16 rounded-full bg-[#FFF2E8] text-[#FF6A00] flex items-center justify-center mx-auto">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="font-nevera text-xl font-bold text-[#111111]">
          NO ACTIVE ORDERS FOUND
        </h2>
        <p className="text-xs text-[#666666]">
          You don't have any placed orders yet. Explore our flash sales and place your first order!
        </p>
        <button
          onClick={() => setCurrentView('home')}
          className="bg-[#FF6A00] text-white px-5 py-2.5 rounded-full font-orbitron font-bold text-xs shadow-md"
        >
          START SHOPPING
        </button>
      </div>
    );
  }

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(order.tracking_number);
    setCopiedCode(true);
    showToast('Tracking number copied to clipboard!', 'info');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadInvoice = () => {
    showToast(`Invoice for Order #${order.order_number} generated!`, 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-24">
      {/* 1. Top Header */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={() => setCurrentView('account')}
          className="flex items-center gap-1.5 text-xs font-orbitron font-bold text-[#111111] hover:text-[#FF6A00] transition-colors p-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>MY ACCOUNT & ORDERS</span>
        </button>

        <button
          onClick={handleDownloadInvoice}
          className="flex items-center gap-1 text-xs text-[#FF6A00] font-orbitron font-semibold hover:underline"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>E-RECEIPT / INVOICE</span>
        </button>
      </div>

      {/* 2. Order Identity Banner Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EAEAEA]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-nevera text-lg sm:text-xl font-bold text-[#111111]">
                ORDER #{order.order_number}
              </h1>
              <span className="bg-[#FFF2E8] text-[#FF6A00] border border-[#FF6A00]/30 text-[10px] font-orbitron font-bold px-2 py-0.5 rounded uppercase">
                {order.order_status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-[#666666] mt-0.5">
              Placed on {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Tracking Number Box */}
          <div className="bg-[#F7F7F7] border border-[#EAEAEA] px-3 py-2 rounded-xl flex items-center gap-2 self-start sm:self-auto">
            <Truck className="w-4 h-4 text-[#FF6A00]" />
            <div>
              <div className="text-[9px] font-orbitron text-[#666666] uppercase font-bold">Xpress Waybill Code</div>
              <div className="font-orbitron font-extrabold text-xs text-[#111111]">{order.tracking_number}</div>
            </div>
            <button
              onClick={handleCopyTracking}
              className="p-1 hover:bg-white rounded text-[#666666] hover:text-[#FF6A00] transition-colors"
              title="Copy tracking code"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expected Delivery & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-[#F7F7F7] p-3 rounded-xl border border-[#EAEAEA] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-orbitron text-[#666666] font-semibold uppercase">Estimated Delivery</div>
              <div className="font-orbitron font-bold text-[#111111]">{order.estimated_delivery}</div>
            </div>
          </div>

          <div className="bg-[#F7F7F7] p-3 rounded-xl border border-[#EAEAEA] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-orbitron text-[#666666] font-semibold uppercase">Destination</div>
              <div className="font-bold text-[#111111] truncate">{order.shipping_address?.address}, {order.shipping_address?.city}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real-Time Tracking Progress Visualizer */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EAEAEA] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-nevera text-base font-bold text-[#111111]">
              LIVE TRACKING TIMELINE
            </h3>
            <p className="text-xs text-[#666666]">Real-time courier telematics from dispatch to doorstep</p>
          </div>

          {/* Demo Step Forward Simulator Button */}
          {order.order_status !== 'delivered' && (
            <button
              onClick={() => advanceOrderTracking(order.id)}
              className="bg-[#FFF2E8] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold flex items-center gap-1.5 transition-all shadow-2xs active-press"
              title="Simulate Package Movement Step"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Step Forward (Demo)</span>
            </button>
          )}
        </div>

        {/* Vertical Timeline Steps */}
        <div className="relative pl-6 sm:pl-8 space-y-6 pt-2 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#EAEAEA]">
          {order.tracking_steps?.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-3.5">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10 ${
                  step.current
                    ? 'bg-[#FF6A00] text-white ring-4 ring-[#FF6A00]/20 tracking-pulse'
                    : step.completed
                    ? 'bg-[#FF6A00] text-white shadow-xs'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {step.completed ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span className="text-[10px] font-orbitron">{idx + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div
                className={`p-3.5 rounded-xl border flex-1 transition-all ${
                  step.current
                    ? 'bg-[#FFF2E8]/40 border-[#FF6A00] shadow-xs'
                    : step.completed
                    ? 'bg-white border-[#EAEAEA]'
                    : 'bg-[#F7F7F7] border-transparent opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4
                    className={`text-xs font-bold uppercase tracking-wider ${
                      step.current ? 'text-[#FF6A00] font-orbitron' : 'text-[#111111]'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-orbitron text-[#666666] shrink-0 font-semibold">
                    {step.timestamp}
                  </span>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed">
                  {step.description}
                </p>

                {step.location && (
                  <div className="flex items-center gap-1 text-[10px] text-[#FF6A00] font-orbitron font-semibold mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Location: {step.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Package Items in Order */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-3">
        <h3 className="font-nevera text-sm font-bold text-[#111111]">
          PACKAGE ITEMS ({order.items?.length || 0})
        </h3>

        <div className="space-y-3">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F7F7F7] border border-[#EAEAEA]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-14 h-14 rounded-lg object-cover bg-white border border-[#EAEAEA] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#111111] line-clamp-1">{item.product_name}</h4>
                  <p className="text-[11px] text-[#666666]">
                    Qty: {item.quantity} • Seller: {item.seller_name}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-orbitron font-bold text-xs sm:text-sm text-[#FF6A00]">
                  {formatPrice(item.total_price)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-xs sm:text-sm font-bold">
          <span className="text-[#666666]">Settled Amount:</span>
          <span className="font-orbitron text-base text-[#111111]">{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* 5. Support & Escrow Assistance */}
      <div className="bg-white rounded-2xl p-4 border border-[#EAEAEA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#FF6A00] shrink-0" />
          <span className="text-xs text-[#666666]">
            Need help with this delivery? Our logistics dispatch team is online 24/7.
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => showToast('Dispatch rider contacted via phone!', 'info')}
            className="flex-1 sm:flex-none px-3.5 py-2 border border-[#EAEAEA] text-[#111111] hover:text-[#FF6A00] rounded-xl text-xs font-orbitron font-bold flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Rider</span>
          </button>
          <button
            onClick={() => showToast('Connecting to Gugu 24/7 Support...', 'success')}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-[#111111] hover:bg-neutral-800 text-white rounded-xl text-xs font-orbitron font-bold flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};
