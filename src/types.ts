export type UserRole = 'customer' | 'seller' | 'admin' | 'super_admin';

export interface UserAddress {
  id: string;
  recipient_name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postal_code: string;
  is_default: boolean;
}

export interface User {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  avatar: string;
  role: UserRole;
  addresses: UserAddress[];
  wishlist: string[]; // product IDs
  created_at: string;
}

export interface SellerProfile {
  id: string;
  user_id: string;
  store_name: string;
  store_slug: string;
  logo: string;
  banner: string;
  description: string;
  location: string;
  verification_status: 'verified' | 'pending' | 'unverified';
  rating: number;
  total_sales: number;
  response_rate: string;
  followers: number;
  joined_date: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  product_count: number;
  parent_id?: string | null;
}

export interface ProductVariantOption {
  id: string;
  name: string;
  value: string;
  price_modifier: number;
  in_stock: boolean;
  image?: string;
}

export interface ProductVariantGroup {
  name: string; // e.g. "Color", "Size", "Storage"
  options: ProductVariantOption[];
}

export interface Product {
  id: string;
  seller_id: string;
  seller_name: string;
  seller_rating: number;
  seller_location: string;
  category_id: string;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  specifications: Record<string, string>;
  brand: string;
  price: number;
  compare_price: number;
  currency: string;
  stock: number;
  rating: number;
  review_count: number;
  sales_count: number;
  status: 'active' | 'pending' | 'rejected' | 'draft';
  images: string[];
  variants: ProductVariantGroup[];
  is_flash_deal?: boolean;
  flash_discount?: number; // e.g. 45 for 45% off
  flash_end_time?: string;
  is_free_shipping: boolean;
  shipping_fee: number;
  estimated_days: string;
  tags: string[];
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  selected_variants: Record<string, string>; // { "Color": "Black", "Size": "L" }
  unit_price: number;
  quantity: number;
  seller_id: string;
  seller_name: string;
  selected: boolean;
}

export type OrderStatus =
  | 'placed'
  | 'payment_confirmed'
  | 'processing'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  completed: boolean;
  current: boolean;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  seller_id: string;
  seller_name: string;
  selected_variants: Record<string, string>;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export type PaymentProvider = 'paystack' | 'flutterwave' | 'card' | 'bank_transfer' | 'crypto';
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'refunded';

export interface PaymentDetails {
  id: string;
  provider: PaymentProvider;
  transaction_reference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string;
  order_number: string;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  discount: number;
  coupon_code?: string;
  tax: number;
  total: number;
  currency: string;
  payment_status: PaymentStatus;
  payment_provider: PaymentProvider;
  order_status: OrderStatus;
  shipping_address: UserAddress;
  tracking_number: string;
  estimated_delivery: string;
  tracking_steps: OrderTrackingStep[];
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  verified_purchase: boolean;
  created_at: string;
  helpful_count: number;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percent' | 'fixed';
  discount_value: number;
  minimum_order: number;
  maximum_discount?: number;
  expiry_date: string;
  usage_limit: number;
  description: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system' | 'seller';
  read: boolean;
  timestamp: string;
  action_url?: string;
}

export type AppView =
  | 'home'
  | 'explore'
  | 'cart'
  | 'wishlist'
  | 'account'
  | 'product-detail'
  | 'seller-store'
  | 'checkout'
  | 'order-tracking'
  | 'seller-dashboard'
  | 'admin-dashboard'
  | 'orders-list';

export type SortOption = 'relevance' | 'best_selling' | 'price_low' | 'price_high' | 'newest' | 'rating';

export interface FilterState {
  categorySlug: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  brand: string;
  freeShippingOnly: boolean;
  flashDealsOnly: boolean;
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}
