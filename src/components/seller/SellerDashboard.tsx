import React, { useState } from 'react';
import {
  Store,
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  Users,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Upload,
  BarChart3,
  Sliders,
  Sparkles,
  ShoppingBag,
  Truck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const SellerDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    sellers,
    orders,
    updateOrderStatus,
    formatPrice,
    openProductDetail,
    showToast
  } = useApp();

  const currentSeller = sellers[0]; // Gugu Official / Active Seller
  const sellerProducts = products.filter((p) => p.seller_id === currentSeller.id || p.seller_name.includes('Gugu'));

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');

  // Add Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-electronics');
  const [brand, setBrand] = useState(currentSeller.store_name);
  const [price, setPrice] = useState(25000);
  const [comparePrice, setComparePrice] = useState(38000);
  const [stock, setStock] = useState(100);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80');
  const [description, setDescription] = useState('');
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [isFreeShipping, setIsFreeShipping] = useState(true);

  // Revenue chart data
  const chartData = [
    { month: 'Sep', revenue: 4200000, orders: 320 },
    { month: 'Oct', revenue: 6800000, orders: 510 },
    { month: 'Nov', revenue: 9400000, orders: 740 },
    { month: 'Dec', revenue: 16200000, orders: 1290 },
    { month: 'Jan', revenue: 12500000, orders: 980 },
    { month: 'Feb', revenue: 18450000, orders: 1420 }
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0) {
      showToast('Please specify valid product name and price', 'error');
      return;
    }

    const selectedCategory = categories.find((c) => c.id === categoryId);

    addProduct({
      seller_id: currentSeller.id,
      seller_name: currentSeller.store_name,
      seller_rating: currentSeller.rating,
      seller_location: currentSeller.location,
      category_id: categoryId,
      category_name: selectedCategory?.name || 'Electronics',
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description || `${name} engineered with high performance materials and official warranty.`,
      brand: brand || 'GUGU XPRESS',
      price: Number(price),
      compare_price: Number(comparePrice) || undefined,
      currency: 'NGN',
      stock: Number(stock),
      rating: 5.0,
      review_count: 1,
      sales_count: 0,
      status: 'active',
      images: [imageUrl],
      variants: [
        {
          name: 'Standard Option',
          options: [
            { id: 'opt-1', name: 'Default Model', value: 'Default', price_modifier: 0, in_stock: true }
          ]
        }
      ],
      specifications: {
        'Condition': '100% Brand New Sealed',
        'Warranty': '12-Month Official Warranty',
        'Fulfillment': 'Xpress Priority Direct Hub'
      },
      is_flash_deal: isFlashDeal,
      is_free_shipping: isFreeShipping,
      shipping_fee: isFreeShipping ? 0 : 2000,
      estimated_days: '2 - 4 Business Days',
      tags: ['new_arrival', 'merchant_verified']
    });

    setShowAddModal(false);
    setName('');
    setDescription('');
    showToast('New product published to live marketplace!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-24">
      {/* 1. Merchant Banner Header */}
      <div className="bg-[#111111] text-white rounded-2xl p-4 sm:p-6 border border-neutral-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={currentSeller.logo}
            alt={currentSeller.store_name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FF6A00] shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-nevera text-lg sm:text-xl font-bold text-white">
                {currentSeller.store_name}
              </h1>
              <span className="bg-[#FF6A00] text-white text-[9px] font-orbitron font-extrabold px-2 py-0.5 rounded flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                VERIFIED MERCHANT
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">{currentSeller.location} • Joined {currentSeller.joined_date}</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#FF6A00] hover:bg-[#E65F00] text-white px-4 py-2.5 rounded-xl font-orbitron font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active-press self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>PUBLISH PRODUCT</span>
        </button>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EAEAEA] pb-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview & Metrics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'products', label: `My Products (${sellerProducts.length})`, icon: <Package className="w-4 h-4" /> },
          { id: 'orders', label: `Store Orders (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'settings', label: 'Store Settings', icon: <Sliders className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-orbitron flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-[#FF6A00] text-white font-bold shadow-xs'
                : 'bg-white text-[#666666] hover:text-[#111111] hover:bg-[#F7F7F7] border border-[#EAEAEA]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 3. Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs">
              <div className="flex items-center justify-between text-[#666666] mb-1">
                <span className="text-[10px] font-orbitron font-bold uppercase">Total Revenue</span>
                <DollarSign className="w-4 h-4 text-[#FF6A00]" />
              </div>
              <div className="font-orbitron font-extrabold text-lg sm:text-2xl text-[#111111]">
                ₦18,450,000
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+24.5% vs last month</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs">
              <div className="flex items-center justify-between text-[#666666] mb-1">
                <span className="text-[10px] font-orbitron font-bold uppercase">Total Sales</span>
                <ShoppingBag className="w-4 h-4 text-[#FF6A00]" />
              </div>
              <div className="font-orbitron font-extrabold text-lg sm:text-2xl text-[#111111]">
                {currentSeller.total_sales.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#666666] font-medium mt-1">
                99% On-time dispatch rate
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs">
              <div className="flex items-center justify-between text-[#666666] mb-1">
                <span className="text-[10px] font-orbitron font-bold uppercase">Active Products</span>
                <Package className="w-4 h-4 text-[#FF6A00]" />
              </div>
              <div className="font-orbitron font-extrabold text-lg sm:text-2xl text-[#111111]">
                {sellerProducts.length}
              </div>
              <div className="text-[10px] text-[#666666] font-medium mt-1">
                All status active & verified
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs">
              <div className="flex items-center justify-between text-[#666666] mb-1">
                <span className="text-[10px] font-orbitron font-bold uppercase">Store Rating</span>
                <Users className="w-4 h-4 text-[#FF6A00]" />
              </div>
              <div className="font-orbitron font-extrabold text-lg sm:text-2xl text-[#FF6A00]">
                ★ {currentSeller.rating} / 5.0
              </div>
              <div className="text-[10px] text-[#666666] font-medium mt-1">
                {currentSeller.followers.toLocaleString()} Followers
              </div>
            </div>
          </div>

          {/* Revenue Analytics Chart */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-nevera text-base font-bold text-[#111111]">
                  REVENUE & VOLUME VELOCITY
                </h3>
                <p className="text-xs text-[#666666]">Monthly sales performance in Nigerian Naira (₦)</p>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FF6A00" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="month" stroke="#888" fontSize={11} />
                  <YAxis
                    stroke="#888"
                    fontSize={10}
                    tickFormatter={(val) => `₦${(val / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`₦${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF6A00"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-nevera text-base font-bold text-[#111111]">
              LISTED PRODUCTS IN STORE
            </h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#FF6A00] text-white px-3.5 py-1.5 rounded-xl font-orbitron font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EAEAEA] text-[#666666] font-orbitron font-bold">
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3">Sales</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7F7F7]">
                {sellerProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FFF2E8]/20 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5 max-w-xs">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div
                            onClick={() => openProductDetail(p.id)}
                            className="font-bold text-[#111111] truncate hover:text-[#FF6A00] cursor-pointer"
                          >
                            {p.name}
                          </div>
                          <span className="text-[10px] text-[#666666] font-orbitron">
                            {p.category_name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-orbitron font-bold text-[#FF6A00]">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3 px-3 font-orbitron font-semibold">
                      {p.stock} units
                    </td>
                    <td className="py-3 px-3 font-orbitron text-[#111111]">
                      {p.sales_count}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-orbitron font-bold px-2 py-0.5 rounded ${
                          p.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {p.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            updateProduct(p.id, { price: p.price + 1000 });
                            showToast(`Updated price for ${p.name.slice(0, 15)}`, 'info');
                          }}
                          className="p-1.5 text-[#666666] hover:text-[#FF6A00] hover:bg-[#F7F7F7] rounded-lg"
                          title="Quick Price Bump"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-[#666666] hover:text-red-600 hover:bg-[#F7F7F7] rounded-lg"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-4">
          <h3 className="font-nevera text-base font-bold text-[#111111]">
            FULFILLMENT & PENDING SHIPMENTS
          </h3>

          {orders.length === 0 ? (
            <div className="py-10 text-center text-[#666666]">
              <ShoppingBag className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="font-medium text-xs">No pending orders yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 rounded-xl border border-[#EAEAEA] bg-[#F7F7F7] space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron font-extrabold text-[#111111]">
                        ORDER #{o.order_number}
                      </span>
                      <span className="bg-[#FF6A00] text-white text-[9px] font-orbitron font-bold px-1.5 py-0.2 rounded uppercase">
                        {o.order_status.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-[#666666] font-orbitron">
                      Customer: {o.user_name} ({o.shipping_address?.city})
                    </span>
                  </div>

                  <div className="text-xs text-[#666666]">
                    Items: {o.items.map((i) => `${i.product_name} (x${i.quantity})`).join(', ')}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EAEAEA]">
                    <span className="font-orbitron font-bold text-xs text-[#FF6A00]">
                      Total: {formatPrice(o.total)}
                    </span>

                    <div className="flex gap-2">
                      {o.order_status === 'payment_confirmed' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'processing')}
                          className="px-3 py-1 bg-[#111111] hover:bg-neutral-800 text-white rounded-lg text-xs font-orbitron font-bold"
                        >
                          Accept & Pack
                        </button>
                      )}
                      {o.order_status === 'processing' && (
                        <button
                          onClick={() => updateOrderStatus(o.id, 'shipped')}
                          className="px-3 py-1 bg-[#FF6A00] hover:bg-[#E65F00] text-white rounded-lg text-xs font-orbitron font-bold"
                        >
                          Mark Shipped & Handover
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAEAEA] shadow-xs space-y-4 max-w-xl">
          <h3 className="font-nevera text-base font-bold text-[#111111]">
            MERCHANT PROFILE SETTINGS
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-orbitron font-bold text-[#111111] mb-1">
                STORE DISPLAY NAME
              </label>
              <input
                type="text"
                defaultValue={currentSeller.store_name}
                className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-orbitron font-bold text-[#111111] mb-1">
                STORE DESCRIPTION
              </label>
              <textarea
                rows={3}
                defaultValue={currentSeller.description}
                className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-orbitron font-bold text-[#111111] mb-1">
                WAREHOUSE / DISPATCH LOCATION
              </label>
              <input
                type="text"
                defaultValue={currentSeller.location}
                className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
              />
            </div>

            <button
              onClick={() => showToast('Store profile settings saved!', 'success')}
              className="px-5 py-2.5 bg-[#FF6A00] hover:bg-[#E65F00] text-white rounded-xl font-orbitron font-bold text-xs shadow-md"
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      )}

      {/* 4. Publish New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#EAEAEA] overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#EAEAEA] flex items-center justify-between">
              <h3 className="font-nevera text-base font-bold text-[#111111]">
                PUBLISH NEW PRODUCT TO GUGU XPRESS
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-[#666666] hover:bg-[#F7F7F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-4 overflow-y-auto space-y-3 text-xs flex-1">
              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">
                  PRODUCT TITLE
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Ultra ANC Studio Wireless Headphones"
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">
                    CATEGORY
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">
                    BRAND
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">
                    PRICE (₦)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">
                    COMPARE (₦)
                  </label>
                  <input
                    type="number"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(Number(e.target.value))}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-orbitron font-bold text-[#111111] mb-1">
                    STOCK QTY
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">
                  MAIN IMAGE URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-orbitron font-bold text-[#111111] mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed specifications, features, in-box contents..."
                  className="w-full bg-[#F7F7F7] border border-[#EAEAEA] p-2.5 rounded-xl focus:border-[#FF6A00] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isFlashDeal}
                    onChange={(e) => setIsFlashDeal(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF6A00] accent-[#FF6A00]"
                  />
                  <span>Enroll in Flash Deals</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isFreeShipping}
                    onChange={(e) => setIsFreeShipping(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FF6A00] accent-[#FF6A00]"
                  />
                  <span>Free Xpress Shipping</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#EAEAEA] font-orbitron font-bold rounded-xl text-[#666666]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6A00] hover:bg-[#E65F00] text-white font-orbitron font-bold rounded-xl shadow-md"
                >
                  PUBLISH NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
