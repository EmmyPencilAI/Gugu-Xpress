import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  User,
  UserRole,
  Product,
  CartItem,
  Order,
  OrderStatus,
  Review,
  Coupon,
  AppNotification,
  AppView,
  FilterState,
  SellerProfile,
  Category,
  UserAddress,
  PaymentProvider
} from '../types';
import {
  SEED_CATEGORIES,
  SEED_SELLERS,
  SEED_PRODUCTS,
  SEED_REVIEWS,
  SEED_COUPONS,
  DEMO_USERS,
  INITIAL_NOTIFICATIONS
} from '../data/seedData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  // Navigation & View State
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  selectedSellerSlug: string | null;
  openSellerStore: (slug: string) => void;
  selectedOrderId: string | null;
  openOrderTracking: (orderId: string) => void;

  // Authentication & Role Switching
  currentUser: User;
  setCurrentUserRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<User>) => void;
  addUserAddress: (address: Omit<UserAddress, 'id'>) => void;
  setDefaultAddress: (addressId: string) => void;
  deleteAddress: (addressId: string) => void;

  // Catalog State
  categories: Category[];
  sellers: SellerProfile[];
  products: Product[];
  reviews: Review[];
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStatus: (id: string, status: Product['status']) => void;
  addReview: (review: Omit<Review, 'id' | 'created_at' | 'helpful_count'>) => void;

  // Search & Filtering
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedVariants?: Record<string, string>, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  toggleCartItemSelect: (cartItemId: string) => void;
  toggleSelectAllCart: (select: boolean) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartShippingFee: number;
  cartDiscount: number;
  cartTotal: number;
  selectedCartItemsCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;

  // Orders & Tracking
  orders: Order[];
  createOrder: (paymentProvider: PaymentProvider, selectedAddress: UserAddress) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrderTracking: (orderId: string) => void;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Flash Sale Timer
  flashTimeLeft: { hours: number; minutes: number; seconds: number };

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Utilities
  formatPrice: (amount: number) => string;
}

const initialFilters: FilterState = {
  categorySlug: 'all',
  minPrice: 0,
  maxPrice: 1500000,
  rating: 0,
  brand: 'all',
  freeShippingOnly: false,
  flashDealsOnly: false,
  inStockOnly: false,
  sortBy: 'relevance',
  searchQuery: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedSellerSlug, setSelectedSellerSlug] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // User State
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('gugu_current_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.customer;
  });

  // Catalog State
  const [categories] = useState<Category[]>(SEED_CATEGORIES);
  const [sellers, setSellers] = useState<SellerProfile[]>(() => {
    const saved = localStorage.getItem('gugu_sellers');
    return saved ? JSON.parse(saved) : SEED_SELLERS;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gugu_products');
    return saved ? JSON.parse(saved) : SEED_PRODUCTS;
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('gugu_reviews');
    return saved ? JSON.parse(saved) : SEED_REVIEWS;
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gugu_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('gugu_wishlist');
    return saved ? JSON.parse(saved) : ['prod-earbuds-pro-x', 'prod-smartwatch-ultra'];
  });

  // Coupons & Orders
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('gugu_coupons');
    return saved ? JSON.parse(saved) : SEED_COUPONS;
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gugu_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('gugu_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Flash Deals Countdown (Real-time dynamic timer)
  const [flashTimeLeft, setFlashTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 14,
    seconds: 37
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 }; // reset cycle
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('gugu_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gugu_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gugu_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('gugu_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gugu_sellers', JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    localStorage.setItem('gugu_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gugu_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('gugu_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('gugu_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helpers
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Navigation handlers
  const openProductDetail = useCallback((productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openSellerStore = useCallback((slug: string) => {
    setSelectedSellerSlug(slug);
    setCurrentView('seller-store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openOrderTracking = useCallback((orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentView('order-tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Role switching
  const setCurrentUserRole = useCallback((role: UserRole) => {
    if (DEMO_USERS[role]) {
      setCurrentUser(DEMO_USERS[role]);
      showToast(`Switched to ${role.toUpperCase()} mode (${DEMO_USERS[role].email})`, 'info');
    } else {
      setCurrentUser((prev) => ({ ...prev, role }));
      showToast(`Role updated to ${role}`, 'info');
    }
  }, [showToast]);

  const updateUserProfile = useCallback((profile: Partial<User>) => {
    setCurrentUser((prev) => ({ ...prev, ...profile }));
    showToast('Profile updated successfully', 'success');
  }, [showToast]);

  const addUserAddress = useCallback((address: Omit<UserAddress, 'id'>) => {
    const newAddr: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    setCurrentUser((prev) => {
      const updatedAddresses = address.is_default
        ? prev.addresses.map((a) => ({ ...a, is_default: false })).concat(newAddr)
        : [...prev.addresses, newAddr];
      return { ...prev, addresses: updatedAddresses };
    });
    showToast('New shipping address saved', 'success');
  }, [showToast]);

  const setDefaultAddress = useCallback((addressId: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        is_default: a.id === addressId
      }))
    }));
    showToast('Default delivery address updated', 'info');
  }, [showToast]);

  const deleteAddress = useCallback((addressId: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== addressId)
    }));
    showToast('Address removed', 'info');
  }, [showToast]);

  // Wishlist
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isWishlisted = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Cart Operations
  const addToCart = useCallback((
    product: Product,
    selectedVariants: Record<string, string> = {},
    quantity = 1
  ) => {
    setCart((prev) => {
      // Calculate unit price based on variant modifiers if any
      let unitPrice = product.price;
      product.variants.forEach((group) => {
        const chosenVal = selectedVariants[group.name];
        if (chosenVal) {
          const opt = group.options.find((o) => o.value === chosenVal || o.name === chosenVal);
          if (opt && opt.price_modifier) {
            unitPrice += opt.price_modifier;
          }
        }
      });

      const variantKey = JSON.stringify(selectedVariants);
      const existingIndex = prev.findIndex(
        (item) => item.product_id === product.id && JSON.stringify(item.selected_variants) === variantKey
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product_id: product.id,
          product,
          selected_variants: selectedVariants,
          unit_price: unitPrice,
          quantity,
          seller_id: product.seller_id,
          seller_name: product.seller_name,
          selected: true
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${product.name.slice(0, 24)}... to Cart 🛒`, 'success');
  }, [showToast]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  }, [showToast]);

  const updateCartQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const toggleCartItemSelect = useCallback((cartItemId: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, selected: !item.selected } : item))
    );
  }, []);

  const toggleSelectAllCart = useCallback((select: boolean) => {
    setCart((prev) => prev.map((item) => ({ ...item, selected: select })));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Cart Calculations (based on selected items)
  const selectedCartItems = cart.filter((item) => item.selected);
  const selectedCartItemsCount = selectedCartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = selectedCartItems.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  const cartShippingFee = selectedCartItems.length === 0
    ? 0
    : selectedCartItems.every((item) => item.product.is_free_shipping)
    ? 0
    : 2500; // Flat express rate if not all free

  let calculatedDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minimum_order) {
    if (appliedCoupon.discount_type === 'percent') {
      calculatedDiscount = (cartSubtotal * appliedCoupon.discount_value) / 100;
      if (appliedCoupon.maximum_discount) {
        calculatedDiscount = Math.min(calculatedDiscount, appliedCoupon.maximum_discount);
      }
    } else {
      calculatedDiscount = appliedCoupon.discount_value;
    }
  }

  const cartDiscount = calculatedDiscount;
  const cartTotal = Math.max(0, cartSubtotal + cartShippingFee - cartDiscount);

  // Coupon handling
  const applyCouponCode = useCallback((code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);
    if (!found) {
      showToast('Invalid coupon code. Try XPRESS10 or MEGA5000', 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < found.minimum_order) {
      const msg = `Minimum order amount of ₦${found.minimum_order.toLocaleString()} required for this coupon.`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved discount applied.`, 'success');
    return { success: true, message: `Coupon ${found.code} applied!` };
  }, [coupons, cartSubtotal, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  }, [showToast]);

  const addCoupon = useCallback((coupon: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: `coup-${Date.now()}`
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`New campaign coupon ${coupon.code} created!`, 'success');
  }, [showToast]);

  // Product & Seller CRUD
  const addProduct = useCallback((product: Omit<Product, 'id' | 'created_at'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${product.name.slice(0, 20)}..." published!`, 'success');
  }, [showToast]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'success');
  }, [showToast]);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  }, [showToast]);

  const updateProductStatus = useCallback((id: string, status: Product['status']) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    showToast(`Product status set to ${status.toUpperCase()}`, 'info');
  }, [showToast]);

  const addReview = useCallback((review: Omit<Review, 'id' | 'created_at' | 'helpful_count'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      created_at: new Date().toISOString(),
      helpful_count: 0
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your verified review has been posted.', 'success');
  }, [showToast]);

  // Order Creation & Tracking
  const createOrder = useCallback(async (
    paymentProvider: PaymentProvider,
    selectedAddress: UserAddress
  ): Promise<Order> => {
    const orderItems = selectedCartItems.map((item) => ({
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      product_id: item.product_id,
      product_name: item.product.name,
      product_image: item.product.images[0],
      seller_id: item.seller_id,
      seller_name: item.seller_name,
      selected_variants: item.selected_variants,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity
    }));

    const preliminaryOrder: Partial<Order> = {
      user_id: currentUser.id,
      user_email: currentUser.email,
      user_name: currentUser.full_name,
      items: orderItems,
      subtotal: cartSubtotal,
      shipping_fee: cartShippingFee,
      discount: cartDiscount,
      coupon_code: appliedCoupon?.code,
      tax: 0,
      total: cartTotal,
      currency: 'NGN',
      payment_provider: paymentProvider,
      shipping_address: selectedAddress
    };

    try {
      // Call server-side verified order creation
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: preliminaryOrder })
      });
      const data = await res.json();
      
      let finalOrder: Order;
      if (data.status === 'success' && data.order) {
        finalOrder = data.order;
      } else {
        // Fallback robust local generation
        finalOrder = {
          id: `ord-${Date.now()}`,
          order_number: `GX-${Math.floor(100000 + Math.random() * 900000)}`,
          tracking_number: `GX${Math.floor(10000000 + Math.random() * 90000000)}NG`,
          user_id: currentUser.id,
          user_email: currentUser.email,
          user_name: currentUser.full_name,
          items: orderItems,
          subtotal: cartSubtotal,
          shipping_fee: cartShippingFee,
          discount: cartDiscount,
          coupon_code: appliedCoupon?.code,
          tax: 0,
          total: cartTotal,
          currency: 'NGN',
          payment_status: 'successful',
          payment_provider: paymentProvider,
          order_status: 'payment_confirmed',
          shipping_address: selectedAddress,
          estimated_delivery: '2 - 4 Business Days',
          created_at: new Date().toISOString(),
          tracking_steps: [
            {
              status: 'placed',
              title: 'Order Placed',
              description: 'Order registered in Gugu Xpress system.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: 'Gugu App',
              completed: true,
              current: false
            },
            {
              status: 'payment_confirmed',
              title: 'Payment Confirmed',
              description: `Payment settled via ${paymentProvider.toUpperCase()}.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              location: 'Escrow Vault',
              completed: true,
              current: true
            },
            {
              status: 'processing',
              title: 'Processing',
              description: 'Seller is packing and quality-checking items.',
              timestamp: 'Expected within 12h',
              completed: false,
              current: false
            },
            {
              status: 'shipped',
              title: 'Shipped',
              description: 'Handed over to Xpress Logistics courier.',
              timestamp: 'Pending dispatch',
              completed: false,
              current: false
            },
            {
              status: 'in_transit',
              title: 'In Transit',
              description: 'Arrived at regional delivery hub.',
              timestamp: 'Estimated Day 2',
              completed: false,
              current: false
            },
            {
              status: 'out_for_delivery',
              title: 'Out for Delivery',
              description: 'Courier rider is on the way to your door.',
              timestamp: 'Estimated Day 3',
              completed: false,
              current: false
            },
            {
              status: 'delivered',
              title: 'Delivered',
              description: 'Package received by customer.',
              timestamp: 'Final Step',
              completed: false,
              current: false
            }
          ]
        };
      }

      setOrders((prev) => [finalOrder, ...prev]);

      // Remove checked out items from cart
      setCart((prev) => prev.filter((item) => !item.selected));
      setAppliedCoupon(null);

      // Add order notification
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        user_id: currentUser.id,
        title: `✅ Order #${finalOrder.order_number} Confirmed`,
        message: `Your payment of ₦${finalOrder.total.toLocaleString()} was successful. Track code: ${finalOrder.tracking_number}`,
        type: 'order',
        read: false,
        timestamp: 'Just now',
        action_url: finalOrder.id
      };
      setNotifications((prev) => [newNotif, ...prev]);

      return finalOrder;
    } catch (err: any) {
      console.error('Order creation error:', err);
      throw err;
    }
  }, [selectedCartItems, currentUser, cartSubtotal, cartShippingFee, cartDiscount, appliedCoupon, cartTotal]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const statusOrderList: OrderStatus[] = [
          'placed',
          'payment_confirmed',
          'processing',
          'shipped',
          'in_transit',
          'out_for_delivery',
          'delivered'
        ];
        const currentIdx = statusOrderList.indexOf(status);

        const updatedSteps = o.tracking_steps.map((step) => {
          const stepIdx = statusOrderList.indexOf(step.status);
          return {
            ...step,
            completed: stepIdx <= currentIdx,
            current: step.status === status
          };
        });

        return {
          ...o,
          order_status: status,
          tracking_steps: updatedSteps
        };
      })
    );
    showToast(`Order status updated to ${status.toUpperCase()}`, 'info');
  }, [showToast]);

  const advanceOrderTracking = useCallback((orderId: string) => {
    const statusOrderList: OrderStatus[] = [
      'placed',
      'payment_confirmed',
      'processing',
      'shipped',
      'in_transit',
      'out_for_delivery',
      'delivered'
    ];

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const currIdx = statusOrderList.indexOf(o.order_status);
        if (currIdx >= statusOrderList.length - 1) return o; // already delivered
        const nextStatus = statusOrderList[currIdx + 1];

        const updatedSteps = o.tracking_steps.map((step) => {
          const stepIdx = statusOrderList.indexOf(step.status);
          return {
            ...step,
            completed: stepIdx <= currIdx + 1,
            current: step.status === nextStatus,
            timestamp: step.status === nextStatus ? 'Just now' : step.timestamp
          };
        });

        return {
          ...o,
          order_status: nextStatus,
          tracking_steps: updatedSteps
        };
      })
    );
    showToast('Tracking stage stepped forward (Simulated Live Delivery update)', 'success');
  }, [showToast]);

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  }, [showToast]);

  // Filtering Products
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredProducts = products.filter((product) => {
    // Only active products on public views
    if (product.status !== 'active' && currentUser.role === 'customer') {
      return false;
    }

    // Category filter
    if (filters.categorySlug && filters.categorySlug !== 'all') {
      const cat = categories.find((c) => c.slug === filters.categorySlug);
      if (cat && product.category_id !== cat.id) return false;
    }

    // Price range
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    // Rating
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false;
    }

    // Free shipping
    if (filters.freeShippingOnly && !product.is_free_shipping) {
      return false;
    }

    // Flash deals only
    if (filters.flashDealsOnly && !product.is_flash_deal) {
      return false;
    }

    // In stock only
    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

    // Brand filter
    if (filters.brand && filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }

    // Search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
      const matchCat = product.category_name.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchDesc && !matchTag && !matchCat) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'best_selling':
        return b.sales_count - a.sales_count;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'relevance':
      default:
        return (b.is_flash_deal ? 1 : 0) - (a.is_flash_deal ? 1 : 0);
    }
  });

  const formatPrice = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        selectedSellerSlug,
        openSellerStore,
        selectedOrderId,
        openOrderTracking,

        currentUser,
        setCurrentUserRole,
        updateUserProfile,
        addUserAddress,
        setDefaultAddress,
        deleteAddress,

        categories,
        sellers,
        products,
        reviews,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStatus,
        addReview,

        filters,
        setFilters,
        resetFilters,
        filteredProducts,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleCartItemSelect,
        toggleSelectAllCart,
        clearCart,
        cartSubtotal,
        cartShippingFee,
        cartDiscount,
        cartTotal,
        selectedCartItemsCount,

        wishlist,
        toggleWishlist,
        isWishlisted,

        coupons,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        addCoupon,

        orders,
        createOrder,
        updateOrderStatus,
        advanceOrderTracking,

        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,

        flashTimeLeft,

        toasts,
        showToast,
        removeToast,

        formatPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
