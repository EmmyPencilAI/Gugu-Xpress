import {
  Category,
  SellerProfile,
  Product,
  Review,
  Coupon,
  User,
  AppNotification
} from '../types';

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Smart devices, audio, sensors, audio gadgets & smart accessories',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=80',
    iconName: 'Cpu',
    product_count: 142
  },
  {
    id: 'cat-phones',
    name: 'Phones & Tablets',
    slug: 'phones',
    description: 'Flagship smartphones, budget champions, tablets & accessories',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
    iconName: 'Smartphone',
    product_count: 98
  },
  {
    id: 'cat-computers',
    name: 'Computers & Office',
    slug: 'computers',
    description: 'Laptops, desktops, mechanical keyboards, monitors & gear',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80',
    iconName: 'Laptop',
    product_count: 85
  },
  {
    id: 'cat-fashion',
    name: 'Fashion & Wear',
    slug: 'fashion',
    description: 'Modern urban clothing, traditional prints, jackets & streetwear',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=80',
    iconName: 'Shirt',
    product_count: 210
  },
  {
    id: 'cat-shoes',
    name: 'Shoes & Footwear',
    slug: 'shoes',
    description: 'Sneakers, running shoes, formal loafers, slides & boots',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
    iconName: 'Footprints',
    product_count: 124
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Skincare',
    slug: 'beauty',
    description: 'Organic skincare, fragrances, grooming kits & cosmetics',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80',
    iconName: 'Sparkles',
    product_count: 115
  },
  {
    id: 'cat-home',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Smart lighting, bedding, storage organizers, kitchenware',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80',
    iconName: 'Home',
    product_count: 160
  },
  {
    id: 'cat-automotive',
    name: 'Automotive & Parts',
    slug: 'automotive',
    description: 'Car diagnostic scanners, dash cams, LED headlights & accessories',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=80',
    iconName: 'Car',
    product_count: 64
  },
  {
    id: 'cat-tools',
    name: 'Tools & Hardware',
    slug: 'tools',
    description: 'Cordless brushless drills, precision screwdrivers, solar tools',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=80',
    iconName: 'Wrench',
    product_count: 78
  },
  {
    id: 'cat-sports',
    name: 'Sports & Outdoors',
    slug: 'sports',
    description: 'Fitness trackers, gym equipment, cycling gear & hiking packs',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
    iconName: 'Activity',
    product_count: 92
  },
  {
    id: 'cat-toys',
    name: 'Toys & Hobbies',
    slug: 'toys',
    description: 'RC quadcopters, educational stem robotics & building sets',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80',
    iconName: 'Gamepad2',
    product_count: 53
  },
  {
    id: 'cat-gaming',
    name: 'Gaming & Audio',
    slug: 'gaming',
    description: 'Wireless gaming headsets, controllers, retro consoles',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&auto=format&fit=crop&q=80',
    iconName: 'Headphones',
    product_count: 76
  },
  {
    id: 'cat-accessories',
    name: 'Accessories & Watches',
    slug: 'accessories',
    description: 'Luxury chronograph watches, sunglasses, titanium rings & bags',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    iconName: 'Watch',
    product_count: 140
  },
  {
    id: 'cat-appliances',
    name: 'Appliances',
    slug: 'appliances',
    description: 'Air fryers, espresso machines, robot vacuums & blender sets',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=80',
    iconName: 'Tv',
    product_count: 67
  },
  {
    id: 'cat-health',
    name: 'Health & Wellness',
    slug: 'health',
    description: 'Deep tissue massage guns, smart scales, BP monitors & supplements',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=80',
    iconName: 'HeartPulse',
    product_count: 88
  },
  {
    id: 'cat-agriculture',
    name: 'Agriculture & Solar',
    slug: 'agriculture',
    description: 'Solar irrigation pumps, soil testers, seeds & organic farm kits',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format&fit=crop&q=80',
    iconName: 'Sprout',
    product_count: 45
  }
];

export const SEED_SELLERS: SellerProfile[] = [
  {
    id: 'seller-gugu-official',
    user_id: 'user-seller-1',
    store_name: 'Gugu Xpress Official Flagship Store',
    store_slug: 'gugu-official',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    description: 'Direct manufacturer verified authentic electronics, gadgets, and genuine accessories with guaranteed 12-month warranty.',
    location: 'Lagos & Global Warehouses',
    verification_status: 'verified',
    rating: 4.9,
    total_sales: 34820,
    response_rate: '99%',
    followers: 18450,
    joined_date: 'Jan 2024',
    created_at: '2024-01-10T08:00:00Z'
  },
  {
    id: 'seller-apex-gadgets',
    user_id: 'user-seller-2',
    store_name: 'Apex Global Gadgets Hub',
    store_slug: 'apex-gadgets',
    logo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
    description: 'Premier supplier of high-speed gaming monitors, mechanical keyboards, laptops, and smart home solutions.',
    location: 'Guangzhou / Global Hub',
    verification_status: 'verified',
    rating: 4.8,
    total_sales: 19400,
    response_rate: '97%',
    followers: 9200,
    joined_date: 'Mar 2024',
    created_at: '2024-03-15T10:30:00Z'
  },
  {
    id: 'seller-saharan-vogue',
    user_id: 'user-seller-3',
    store_name: 'Saharan Vogue Apparel',
    store_slug: 'saharan-vogue',
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    description: 'Contemporary African fashion blending futuristic street wear with rich heritage prints, footwear, and accessories.',
    location: 'Nairobi, Kenya',
    verification_status: 'verified',
    rating: 4.7,
    total_sales: 12150,
    response_rate: '95%',
    followers: 6700,
    joined_date: 'Feb 2024',
    created_at: '2024-02-01T12:00:00Z'
  },
  {
    id: 'seller-afrikcraft-tools',
    user_id: 'user-seller-4',
    store_name: 'AfrikCraft Power Tools & Hardware',
    store_slug: 'afrikcraft-tools',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80',
    description: 'Heavy duty brushless power tools, solar generator kits, welding equipment and industrial hardware.',
    location: 'Johannesburg, South Africa',
    verification_status: 'verified',
    rating: 4.9,
    total_sales: 8400,
    response_rate: '98%',
    followers: 4300,
    joined_date: 'Apr 2024',
    created_at: '2024-04-05T09:15:00Z'
  },
  {
    id: 'seller-zenaura-beauty',
    user_id: 'user-seller-5',
    store_name: 'ZenAura Natural Skincare & Glow',
    store_slug: 'zenaura-beauty',
    logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    description: '100% natural shea butter serums, botanical fragrances, vitamin C brightening formulas, and spa grade wellness devices.',
    location: 'Accra, Ghana',
    verification_status: 'verified',
    rating: 4.8,
    total_sales: 15300,
    response_rate: '96%',
    followers: 8100,
    joined_date: 'May 2024',
    created_at: '2024-05-12T14:20:00Z'
  }
];

export const SEED_PRODUCTS: Product[] = [
  // 1. Flash Deals & Flagships
  {
    id: 'prod-earbuds-pro-x',
    seller_id: 'seller-gugu-official',
    seller_name: 'Gugu Xpress Official Flagship Store',
    seller_rating: 4.9,
    seller_location: 'Lagos & Global Warehouses',
    category_id: 'cat-electronics',
    category_name: 'Electronics',
    name: 'Gugu SoundPods Pro X Wireless ANC Earbuds (48Hr Playtime, IPX7)',
    slug: 'gugu-soundpods-pro-x-wireless-anc-earbuds',
    description: 'Experience studio-grade active noise cancellation (up to -42dB), spatial 3D audio, ultra-low 35ms latency gaming mode, and 48-hour combined battery life with the wireless fast-charging case.',
    specifications: {
      'Bluetooth Version': 'v5.4 Dual-Mode BLE',
      'Noise Cancellation': 'Hybrid Active Noise Cancellation (42dB)',
      'Battery Life': '10h earbuds + 38h charging case',
      'Waterproof Rating': 'IPX7 Nano-coating',
      'Charging Port': 'USB-C + Qi Wireless Qi Fast Charge',
      'Microphone': 'Quad ENC Mic with AI Wind Shield'
    },
    brand: 'GUGU AUDIO',
    price: 18500,
    compare_price: 32000,
    currency: 'NGN',
    stock: 240,
    rating: 4.8,
    review_count: 1420,
    sales_count: 4850,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Color',
        options: [
          { id: 'v-c1', name: 'Phantom Black', value: 'Phantom Black', price_modifier: 0, in_stock: true },
          { id: 'v-c2', name: 'Glacier White', value: 'Glacier White', price_modifier: 0, in_stock: true },
          { id: 'v-c3', name: 'Xpress Orange Edition', value: 'Xpress Orange Edition', price_modifier: 1500, in_stock: true }
        ]
      }
    ],
    is_flash_deal: true,
    flash_discount: 42,
    flash_end_time: '2026-08-30T23:59:59Z',
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '2 - 4 Business Days',
    tags: ['flash_deal', 'trending', 'best_seller', 'audio', 'earbuds'],
    created_at: '2025-01-15T10:00:00Z'
  },
  {
    id: 'prod-smartwatch-ultra',
    seller_id: 'seller-gugu-official',
    seller_name: 'Gugu Xpress Official Flagship Store',
    seller_rating: 4.9,
    seller_location: 'Lagos & Global Warehouses',
    category_id: 'cat-accessories',
    category_name: 'Accessories & Watches',
    name: 'Apex Horizon 49mm Titanium AMOLED Smartwatch with Bluetooth Call & GPS',
    slug: 'apex-horizon-49mm-titanium-amoled-smartwatch',
    description: 'Aerospace-grade titanium alloy body with 2.1-inch 1000-nit high-brightness AMOLED display. Real-time heart rate, SpO2, blood pressure sensor, compass, barometer, and 120+ professional sport tracking modes.',
    specifications: {
      'Screen Size': '2.1" HD AMOLED (485x520px)',
      'Case Material': 'Aerospace Titanium Alloy',
      'Battery Capacity': '420mAh (Up to 14 Days Normal Use)',
      'Sensors': 'Optical PPG, 6-Axis Gyro, Barometer, Compass',
      'Connectivity': 'Bluetooth 5.3 + NFC Access Control'
    },
    brand: 'APEX WEAR',
    price: 34500,
    compare_price: 58000,
    currency: 'NGN',
    stock: 120,
    rating: 4.9,
    review_count: 890,
    sales_count: 3120,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Strap Color',
        options: [
          { id: 'v-sw-1', name: 'Cyber Orange', value: 'Cyber Orange', price_modifier: 0, in_stock: true },
          { id: 'v-sw-2', name: 'Obsidian Black', value: 'Obsidian Black', price_modifier: 0, in_stock: true },
          { id: 'v-sw-3', name: 'Alpine Titanium Green', value: 'Alpine Titanium Green', price_modifier: 1000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: true,
    flash_discount: 40,
    flash_end_time: '2026-08-30T23:59:59Z',
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '2 - 3 Business Days',
    tags: ['flash_deal', 'best_seller', 'smartwatch', 'amoled'],
    created_at: '2025-02-01T12:00:00Z'
  },
  {
    id: 'prod-drone-4k-pro',
    seller_id: 'seller-apex-gadgets',
    seller_name: 'Apex Global Gadgets Hub',
    seller_rating: 4.8,
    seller_location: 'Guangzhou / Global Hub',
    category_id: 'cat-toys',
    category_name: 'Toys & Hobbies',
    name: 'Skylark GPS 4K UHD Dual-Camera Brushless Drone (3-Axis Gimbal, 5KM Range)',
    slug: 'skylark-gps-4k-uhd-dual-camera-brushless-drone',
    description: 'Equipped with dual 4K Sony CMOS sensors, 3-axis anti-shake mechanical gimbal, optical flow positioning, 360-degree laser obstacle avoidance, and auto smart return to home.',
    specifications: {
      'Camera': '4K UHD HDR (30fps) + 1080p Bottom Sensor',
      'Flight Time': '32 Mins per Battery (2 Batteries Included)',
      'Control Distance': '5,000 meters 5G Digital Video Link',
      'Motors': 'Level-7 Wind Resistant 1806 Brushless Motors',
      'Storage': 'MicroSD card up to 256GB supported'
    },
    brand: 'SKYLARK ROBOTICS',
    price: 89000,
    compare_price: 145000,
    currency: 'NGN',
    stock: 45,
    rating: 4.7,
    review_count: 410,
    sales_count: 1240,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1507582020432-2a3bc4ff7a8b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Battery Pack',
        options: [
          { id: 'v-dr-1', name: 'Dual Battery Combo + Bag', value: 'Dual Battery Combo', price_modifier: 0, in_stock: true },
          { id: 'v-dr-2', name: 'Triple Battery Extreme Kit', value: 'Triple Battery Kit', price_modifier: 12000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: true,
    flash_discount: 38,
    flash_end_time: '2026-08-30T23:59:59Z',
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '4 - 7 Days (Global Air Express)',
    tags: ['flash_deal', 'drone', 'camera', '4k'],
    created_at: '2025-01-20T11:00:00Z'
  },
  {
    id: 'prod-sneakers-speed-runner',
    seller_id: 'seller-saharan-vogue',
    seller_name: 'Saharan Vogue Apparel',
    seller_rating: 4.7,
    seller_location: 'Nairobi, Kenya',
    category_id: 'cat-shoes',
    category_name: 'Shoes & Footwear',
    name: 'Velocity Surge Carbon-Plate Breathable Cushioned Running Sneakers',
    slug: 'velocity-surge-carbon-plate-cushioned-sneakers',
    description: 'High-rebound supercritical foam midsole with integrated curved carbon fiber plate for maximum energy return and marathon propulsion. Knitted breathable mesh upper.',
    specifications: {
      'Midsole Tech': 'Supercritical Nitrogen-Infused Foam + Carbon Plate',
      'Weight': '210g (Size 42)',
      'Drop': '8mm heel-to-toe drop',
      'Outsole': 'High-traction Continental rubber'
    },
    brand: 'VELOCITY X',
    price: 24500,
    compare_price: 45000,
    currency: 'NGN',
    stock: 95,
    rating: 4.8,
    review_count: 530,
    sales_count: 1980,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Color',
        options: [
          { id: 'v-sn-c1', name: 'Inferno Orange/White', value: 'Inferno Orange', price_modifier: 0, in_stock: true },
          { id: 'v-sn-c2', name: 'Volt Cyber Lime', value: 'Volt Cyber', price_modifier: 0, in_stock: true },
          { id: 'v-sn-c3', name: 'Stealth Blackout', value: 'Stealth Black', price_modifier: 0, in_stock: true }
        ]
      },
      {
        name: 'Size (EU)',
        options: [
          { id: 'v-sn-s1', name: 'EU 40', value: '40', price_modifier: 0, in_stock: true },
          { id: 'v-sn-s2', name: 'EU 41', value: '41', price_modifier: 0, in_stock: true },
          { id: 'v-sn-s3', name: 'EU 42', value: '42', price_modifier: 0, in_stock: true },
          { id: 'v-sn-s4', name: 'EU 43', value: '43', price_modifier: 0, in_stock: true },
          { id: 'v-sn-s5', name: 'EU 44', value: '44', price_modifier: 0, in_stock: true },
          { id: 'v-sn-s6', name: 'EU 45', value: '45', price_modifier: 500, in_stock: true }
        ]
      }
    ],
    is_flash_deal: true,
    flash_discount: 45,
    flash_end_time: '2026-08-30T23:59:59Z',
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '2 - 4 Business Days',
    tags: ['flash_deal', 'shoes', 'running', 'fashion'],
    created_at: '2025-02-10T14:00:00Z'
  },
  {
    id: 'prod-powerstation-1000w',
    seller_id: 'seller-afrikcraft-tools',
    seller_name: 'AfrikCraft Power Tools & Hardware',
    seller_rating: 4.9,
    seller_location: 'Johannesburg, South Africa',
    category_id: 'cat-agriculture',
    category_name: 'Agriculture & Solar',
    name: 'Voltron 1200W/1024Wh LiFePO4 Portable Solar Power Station & Home Backup',
    slug: 'voltron-1200w-lifepo4-portable-solar-power-station',
    description: 'Long-lasting 3500+ cycle LiFePO4 battery pack with pure sine wave 1200W AC output (2400W peak surge). Powers laptops, TVs, mini-fridges, CPAP, and power tools effortlessly. Fast charges from 0-80% in 50 minutes.',
    specifications: {
      'Battery Capacity': '1024Wh (320,000mAh) LiFePO4',
      'AC Output': '2x 230V Pure Sine Wave 1200W',
      'Solar Input': '500W Max MPPT (11-60V 15A)',
      'USB Ports': '2x 100W USB-C PD + 2x 18W QC3.0',
      'Lifespan': '3500+ cycles to 80% capacity (10 Years)'
    },
    brand: 'VOLTRON SOLAR',
    price: 385000,
    compare_price: 520000,
    currency: 'NGN',
    stock: 28,
    rating: 4.9,
    review_count: 310,
    sales_count: 670,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Solar Panel Bundle',
        options: [
          { id: 'v-pws-1', name: 'Power Station Only', value: 'Station Only', price_modifier: 0, in_stock: true },
          { id: 'v-pws-2', name: '+ 200W Foldable Solar Panel', value: '+ 200W Panel', price_modifier: 85000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '3 - 5 Business Days (Heavy Freight)',
    tags: ['solar', 'power_station', 'backup', 'trending'],
    created_at: '2025-01-05T09:00:00Z'
  },
  {
    id: 'prod-laptop-creator-pro',
    seller_id: 'seller-apex-gadgets',
    seller_name: 'Apex Global Gadgets Hub',
    seller_rating: 4.8,
    seller_location: 'Guangzhou / Global Hub',
    category_id: 'cat-computers',
    category_name: 'Computers & Office',
    name: 'AeroBook Pro 16" 2.8K 120Hz OLED Laptop (Core i7 13th Gen, 32GB RAM, 1TB SSD, RTX 4060)',
    slug: 'aerobook-pro-16-oled-laptop-rtx4060',
    description: 'Designed for software engineers, 3D animators, video editors, and power users. 16-inch 2.8K 100% DCI-P3 OLED Pantone validated display, dual fan vapor chamber cooling, backlit keyboard, and full-metal chassis.',
    specifications: {
      'Processor': 'Intel Core i7-13700H (14 Cores, 20 Threads, up to 5.0GHz)',
      'Graphics': 'NVIDIA GeForce RTX 4060 8GB GDDR6',
      'Memory': '32GB DDR5 5200MHz Dual-Channel',
      'Storage': '1TB PCIe 4.0 NVMe SSD (Expandable M.2 Slot)',
      'Display': '16.0" 2880x1800 120Hz OLED 0.2ms HDR500',
      'Weight': '1.85 kg Slim Unibody'
    },
    brand: 'AERO COMPUTING',
    price: 980000,
    compare_price: 1250000,
    currency: 'NGN',
    stock: 35,
    rating: 4.9,
    review_count: 240,
    sales_count: 780,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Configuration',
        options: [
          { id: 'v-lp-1', name: '32GB RAM + 1TB SSD', value: '32GB / 1TB', price_modifier: 0, in_stock: true },
          { id: 'v-lp-2', name: '64GB RAM + 2TB SSD Extreme', value: '64GB / 2TB', price_modifier: 140000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '3 - 6 Business Days',
    tags: ['laptop', 'programming', 'creator', 'rtx4060', 'trending'],
    created_at: '2025-02-15T08:30:00Z'
  },
  {
    id: 'prod-phone-nova-12',
    seller_id: 'seller-gugu-official',
    seller_name: 'Gugu Xpress Official Flagship Store',
    seller_rating: 4.9,
    seller_location: 'Lagos & Global Warehouses',
    category_id: 'cat-phones',
    category_name: 'Phones & Tablets',
    name: 'Gugu Nova 12 Ultra 5G (6.8" 144Hz AMOLED, 200MP OIS Camera, 5500mAh, 120W FlashCharge)',
    slug: 'gugu-nova-12-ultra-5g-smartphone',
    description: 'The definitive smartphone flagship. Features 200MP periscope zoom sensor with 100x digital zoom, 120W fast charging (0 to 100% in 19 mins), ultrasonic under-display fingerprint, and stereo Dolby Atmos speakers.',
    specifications: {
      'Display': '6.8" Curved LTPO AMOLED 1-144Hz (1800 nits)',
      'Rear Camera': '200MP Main OIS + 50MP Ultra-Wide + 50MP Periscope Telephoto 5X',
      'Front Camera': '50MP 4K60 Vlog Camera',
      'Battery': '5,500mAh Silicon-Carbon Battery + 120W Wired + 50W Wireless',
      'Network': '5G Dual SIM Dual Standby + Wi-Fi 7'
    },
    brand: 'GUGU MOBILE',
    price: 495000,
    compare_price: 640000,
    currency: 'NGN',
    stock: 80,
    rating: 4.9,
    review_count: 670,
    sales_count: 2450,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Color',
        options: [
          { id: 'v-ph-c1', name: 'Cyber Titanium Orange', value: 'Titanium Orange', price_modifier: 0, in_stock: true },
          { id: 'v-ph-c2', name: 'Cosmic Emerald Green', value: 'Emerald Green', price_modifier: 0, in_stock: true },
          { id: 'v-ph-c3', name: 'Deep Space Black', value: 'Space Black', price_modifier: 0, in_stock: true }
        ]
      },
      {
        name: 'Storage',
        options: [
          { id: 'v-ph-s1', name: '256GB + 12GB RAM', value: '256GB/12GB', price_modifier: 0, in_stock: true },
          { id: 'v-ph-s2', name: '512GB + 16GB RAM', value: '512GB/16GB', price_modifier: 45000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '2 - 4 Business Days',
    tags: ['flagship', 'smartphone', '5g', 'best_seller'],
    created_at: '2025-02-18T10:00:00Z'
  },
  {
    id: 'prod-skincare-serum-glow',
    seller_id: 'seller-zenaura-beauty',
    seller_name: 'ZenAura Natural Skincare & Glow',
    seller_rating: 4.8,
    seller_location: 'Accra, Ghana',
    category_id: 'cat-beauty',
    category_name: 'Beauty & Skincare',
    name: 'ZenAura Organic Pure Golden Shea & 20% Vitamin C Radiance Glow Serum (100ml)',
    slug: 'zenaura-organic-shea-vitamin-c-glow-serum',
    description: 'Cold-pressed Grade-A unrefined African Shea butter infused with micro-encapsulated Vitamin C, Hyaluronic Acid, and Niacinamide to repair dark spots, brighten hyperpigmentation, and lock in deep moisture.',
    specifications: {
      'Volume': '100ml (3.4 fl. oz) with Glass Dropper',
      'Skin Type': 'All Skin Types (Acne-Safe, Non-Comedogenic)',
      'Key Ingredients': 'Organic Shea, 20% Sodium Ascorbyl Phosphate, 5% Niacinamide, Squalane',
      'Certifications': 'Cruelty-Free, Vegan, Organic Certified'
    },
    brand: 'ZENAURA BOTANICALS',
    price: 9500,
    compare_price: 16000,
    currency: 'NGN',
    stock: 350,
    rating: 4.9,
    review_count: 1200,
    sales_count: 6800,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-00913919e120?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Size',
        options: [
          { id: 'v-sk-1', name: '100ml Standard Bottle', value: '100ml', price_modifier: 0, in_stock: true },
          { id: 'v-sk-2', name: '200ml Family Value Pack', value: '200ml', price_modifier: 6500, in_stock: true }
        ]
      }
    ],
    is_flash_deal: true,
    flash_discount: 40,
    flash_end_time: '2026-08-30T23:59:59Z',
    is_free_shipping: false,
    shipping_fee: 1500,
    estimated_days: '2 - 3 Business Days',
    tags: ['skincare', 'glow', 'organic', 'flash_deal', 'best_seller'],
    created_at: '2025-01-10T15:00:00Z'
  },
  {
    id: 'prod-drill-brushless-kit',
    seller_id: 'seller-afrikcraft-tools',
    seller_name: 'AfrikCraft Power Tools & Hardware',
    seller_rating: 4.9,
    seller_location: 'Johannesburg, South Africa',
    category_id: 'cat-tools',
    category_name: 'Tools & Hardware',
    name: 'AfrikCraft 21V Max Heavy Duty Brushless Impact Hammer Drill & 42-Piece Tool Set',
    slug: 'afrikcraft-21v-brushless-impact-hammer-drill-kit',
    description: 'High efficiency copper brushless motor delivering 85N.m maximum torque with 2-speed gearbox (0-550 / 0-2100 RPM). Includes 2x 4.0Ah lithium battery packs, fast charger, masonry bits, hex sockets, and heavy-duty blow mold case.',
    specifications: {
      'Motor': 'Heavy Duty Brushless 85N.m Max Torque',
      'Chuck Capacity': '13mm (1/2") Metal Keyless Chuck',
      'Functions': 'Drill, Screwdriver, Impact Hammer',
      'Batteries': '2x 21V 4000mAh High-Drain Li-ion',
      'LED Light': 'Built-in Shadowless LED Worklight'
    },
    brand: 'AFRIKCRAFT PRO',
    price: 36000,
    compare_price: 60000,
    currency: 'NGN',
    stock: 85,
    rating: 4.9,
    review_count: 510,
    sales_count: 2100,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Battery Kit',
        options: [
          { id: 'v-dr-b1', name: '2x 4.0Ah Batteries + Case', value: '2 Batteries', price_modifier: 0, in_stock: true },
          { id: 'v-dr-b2', name: '3x 4.0Ah Batteries + Bonus Bit Set', value: '3 Batteries', price_modifier: 7500, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '3 - 5 Business Days',
    tags: ['tools', 'drill', 'hardware', 'diy'],
    created_at: '2025-01-25T11:20:00Z'
  },
  {
    id: 'prod-jacket-bomber-cyber',
    seller_id: 'seller-saharan-vogue',
    seller_name: 'Saharan Vogue Apparel',
    seller_rating: 4.7,
    seller_location: 'Nairobi, Kenya',
    category_id: 'cat-fashion',
    category_name: 'Fashion & Wear',
    name: 'Neo-Sahara Cyber Bomber Flight Jacket with Waterproof Membrane & Orange Accents',
    slug: 'neo-sahara-cyber-bomber-jacket',
    description: 'Technical outerwear featuring durable 3-layer weatherproof ripstop nylon, magnetic quick-release utility cargo pockets, heavy-duty YKK two-way zippers, and reflective orange safety accents.',
    specifications: {
      'Material': '3-Layer Hydrophobic Ripstop Nylon + Thermal Satin Lining',
      'Fit': 'Modern Relaxed Technical Fit',
      'Pockets': '6 Utility Pockets with Waterproof Zips',
      'Care': 'Machine Wash Cold / Air Dry'
    },
    brand: 'NEO SAHARA TECHWEAR',
    price: 28000,
    compare_price: 48000,
    currency: 'NGN',
    stock: 65,
    rating: 4.8,
    review_count: 320,
    sales_count: 1450,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Color',
        options: [
          { id: 'v-jk-c1', name: 'Stealth Black & Orange Ribbon', value: 'Black/Orange', price_modifier: 0, in_stock: true },
          { id: 'v-jk-c2', name: 'Desert Dune Khaki', value: 'Khaki', price_modifier: 0, in_stock: true }
        ]
      },
      {
        name: 'Size',
        options: [
          { id: 'v-jk-s1', name: 'Medium (M)', value: 'M', price_modifier: 0, in_stock: true },
          { id: 'v-jk-s2', name: 'Large (L)', value: 'L', price_modifier: 0, in_stock: true },
          { id: 'v-jk-s3', name: 'Extra Large (XL)', value: 'XL', price_modifier: 0, in_stock: true },
          { id: 'v-jk-s4', name: '2XL', value: '2XL', price_modifier: 1000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '2 - 4 Business Days',
    tags: ['fashion', 'jacket', 'streetwear', 'techwear'],
    created_at: '2025-02-05T13:40:00Z'
  },
  {
    id: 'prod-airfryer-smart-7l',
    seller_id: 'seller-gugu-official',
    seller_name: 'Gugu Xpress Official Flagship Store',
    seller_rating: 4.9,
    seller_location: 'Lagos & Global Warehouses',
    category_id: 'cat-appliances',
    category_name: 'Appliances',
    name: 'Gugu Kitchen Master 7.5L Digital Visible Window Air Fryer (1800W 360° Cyclone Air)',
    slug: 'gugu-kitchen-master-7-5l-digital-air-fryer',
    description: 'Cook crispy, healthy meals with 90% less oil. Panoramic tempered glass viewing window with interior spotlight, 12 smart one-touch cooking presets, dual heating elements, and non-stick dishwasher-safe basket.',
    specifications: {
      'Capacity': '7.5 Liters (Fits Whole 2.5kg Chicken)',
      'Power': '1800W High Efficiency Turbo Heating',
      'Temperature Range': '40°C - 200°C Precise PID Control',
      'Timer': 'Up to 60 Mins + Dehydrate Mode (24H)',
      'Control': 'Full-color Touch OLED Display'
    },
    brand: 'GUGU HOME',
    price: 48000,
    compare_price: 75000,
    currency: 'NGN',
    stock: 90,
    rating: 4.9,
    review_count: 730,
    sales_count: 2890,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Color',
        options: [
          { id: 'v-af-1', name: 'Piano Black / Gold Trim', value: 'Black Gold', price_modifier: 0, in_stock: true },
          { id: 'v-af-2', name: 'Pearl White / Chrome Trim', value: 'White Chrome', price_modifier: 0, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '2 - 3 Business Days',
    tags: ['kitchen', 'airfryer', 'home', 'appliances', 'best_seller'],
    created_at: '2025-01-28T16:00:00Z'
  },
  {
    id: 'prod-dashcam-4k-gps',
    seller_id: 'seller-apex-gadgets',
    seller_name: 'Apex Global Gadgets Hub',
    seller_rating: 4.8,
    seller_location: 'Guangzhou / Global Hub',
    category_id: 'cat-automotive',
    category_name: 'Automotive & Parts',
    name: 'RoadVision 4K Front + 1080p Rear Dual Dash Cam (Built-in GPS, WiFi 6, Night Vision)',
    slug: 'roadvision-4k-dual-dashcam-gps-wifi',
    description: 'High sensitivity Sony STARVIS 2 IMX678 sensor for ultra-clear license plate capture even in pitch black nights. 24-hour parking surveillance mode with G-sensor emergency collision lock and voice prompts.',
    specifications: {
      'Resolution': 'Front 4K (3840x2160p 30fps) + Rear 1080p HDR',
      'Field of View': '170° Ultra-Wide Angle Front + 140° Rear',
      'Connectivity': '5GHz High-Speed WiFi 6 App Direct Download + GPS',
      'Power': 'Supercapacitor (-20°C to 70°C heat resistant)'
    },
    brand: 'ROADVISION',
    price: 32000,
    compare_price: 52000,
    currency: 'NGN',
    stock: 75,
    rating: 4.8,
    review_count: 420,
    sales_count: 1680,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Memory Card Bundle',
        options: [
          { id: 'v-dc-1', name: 'Dashcam + 64GB High-Endurance Card', value: '64GB Card', price_modifier: 0, in_stock: true },
          { id: 'v-dc-2', name: 'Dashcam + 128GB High-Endurance Card', value: '128GB Card', price_modifier: 4000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '3 - 6 Business Days',
    tags: ['dashcam', 'car', 'automotive', 'security'],
    created_at: '2025-02-12T09:40:00Z'
  },
  {
    id: 'prod-massage-gun-pro',
    seller_id: 'seller-zenaura-beauty',
    seller_name: 'ZenAura Natural Skincare & Glow',
    seller_rating: 4.8,
    seller_location: 'Accra, Ghana',
    category_id: 'cat-health',
    category_name: 'Health & Wellness',
    name: 'ZenTherapy Percussion Deep Muscle Fascia Massage Gun (30 Speeds, 6 Titanium Heads)',
    slug: 'zentherapy-percussion-massage-gun',
    description: '14mm deep amplitude stroke with quiet brushless motor (under 40dB). Relieves muscle stiffness, lactic acid soreness, and chronic back/neck pain. 2600mAh battery delivers 6-8 hours on a single charge.',
    specifications: {
      'Amplitude': '14mm Deep Tissue Penetration',
      'Stall Force': '45 lbs Heavy Duty Pressure',
      'Speeds': '30 Adjustable Gear Levels (1200 - 3600 RPM)',
      'Display': 'HD LCD Smart Touch Battery & Speed Screen',
      'Weight': '0.95kg Ergonomic Silicone Grip'
    },
    brand: 'ZENTHERAPY',
    price: 22500,
    compare_price: 38000,
    currency: 'NGN',
    stock: 110,
    rating: 4.8,
    review_count: 590,
    sales_count: 2340,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Color',
        options: [
          { id: 'v-mg-1', name: 'Gunmetal Gray', value: 'Gray', price_modifier: 0, in_stock: true },
          { id: 'v-mg-2', name: 'Obsidian Black', value: 'Black', price_modifier: 0, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: false,
    shipping_fee: 1500,
    estimated_days: '2 - 4 Business Days',
    tags: ['fitness', 'health', 'massage_gun', 'recovery'],
    created_at: '2025-02-02T14:10:00Z'
  },
  {
    id: 'prod-solar-water-pump-kit',
    seller_id: 'seller-afrikcraft-tools',
    seller_name: 'AfrikCraft Power Tools & Hardware',
    seller_rating: 4.9,
    seller_location: 'Johannesburg, South Africa',
    category_id: 'cat-agriculture',
    category_name: 'Agriculture & Solar',
    name: 'AgriSun 550W Deep Well Submersible Solar Irrigation Water Pump Kit',
    slug: 'agrisun-550w-submersible-solar-water-pump',
    description: 'Stainless steel DC brushless borehole submersible pump with intelligent MPPT controller. Max head 75 meters, max flow 3.2 m³/hour. Connects directly to solar panels with no battery required.',
    specifications: {
      'Voltage': 'DC 48V - 72V Brushless Solar Direct',
      'Max Head': '75 Meters (246 Feet)',
      'Max Flow Rate': '3,200 Liters / Hour',
      'Outlet Diameter': '1.25 Inch (32mm) Brass Fitting',
      'Material': '304 Stainless Steel Housing + Copper Motor'
    },
    brand: 'AGRISUN SYSTEMS',
    price: 165000,
    compare_price: 230000,
    currency: 'NGN',
    stock: 30,
    rating: 4.9,
    review_count: 180,
    sales_count: 540,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Package',
        options: [
          { id: 'v-swp-1', name: 'Pump + MPPT Controller Only', value: 'Pump Kit', price_modifier: 0, in_stock: true },
          { id: 'v-swp-2', name: '+ 2x 330W Mono Solar Panels Package', value: 'Full Solar Package', price_modifier: 95000, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '3 - 6 Business Days (Heavy Freight)',
    tags: ['agriculture', 'solar_pump', 'farming', 'irrigation'],
    created_at: '2025-01-18T08:00:00Z'
  },
  {
    id: 'prod-mechanical-keyboard-rgb',
    seller_id: 'seller-apex-gadgets',
    seller_name: 'Apex Global Gadgets Hub',
    seller_rating: 4.8,
    seller_location: 'Guangzhou / Global Hub',
    category_id: 'cat-gaming',
    category_name: 'Gaming & Audio',
    name: 'CyberBlade 75% Tri-Mode Wireless Gasket Mechanical Keyboard (Hot-Swap Pre-Lubed Switches)',
    slug: 'cyberblade-75-tri-mode-mechanical-keyboard',
    description: 'Premium gasket-mounted mechanical keyboard with sound-dampening silicone foam, PBT double-shot keycaps, south-facing per-key RGB, and versatile Bluetooth 5.0 / 2.4Ghz / Type-C connectivity.',
    specifications: {
      'Layout': '75% Compact (82 Keys + Aluminum Rotary Knob)',
      'Switches': 'Custom Factory-Lubed Linear Cream Yellow Switches',
      'Battery': '4000mAh (Up to 200 Hours RGB Off)',
      'Structure': 'Gasket Mount with Poron Plate Foam + IXPE Switch Pad',
      'Compatibility': 'Mac, Windows, iOS, Android'
    },
    brand: 'CYBERBLADE',
    price: 27500,
    compare_price: 42000,
    currency: 'NGN',
    stock: 80,
    rating: 4.8,
    review_count: 380,
    sales_count: 1420,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Switch Type',
        options: [
          { id: 'v-kb-s1', name: 'Cream Linear (Smooth & Thocky)', value: 'Linear', price_modifier: 0, in_stock: true },
          { id: 'v-kb-s2', name: 'Tactile Panda (Crisp Bump)', value: 'Tactile', price_modifier: 1000, in_stock: true }
        ]
      },
      {
        name: 'Colorway',
        options: [
          { id: 'v-kb-c1', name: 'Cyber Orange & Dark Gray', value: 'Orange/Gray', price_modifier: 0, in_stock: true },
          { id: 'v-kb-c2', name: 'Retro Vintage Cream', value: 'Vintage Cream', price_modifier: 0, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: true,
    shipping_fee: 0,
    estimated_days: '3 - 5 Business Days',
    tags: ['keyboard', 'gaming', 'pc_gaming', 'trending'],
    created_at: '2025-02-14T11:00:00Z'
  },
  {
    id: 'prod-smart-led-strip-10m',
    seller_id: 'seller-gugu-official',
    seller_name: 'Gugu Xpress Official Flagship Store',
    seller_rating: 4.9,
    seller_location: 'Lagos & Global Warehouses',
    category_id: 'cat-home',
    category_name: 'Home & Living',
    name: 'Gugu Ambient RGBIC 10M Smart Neon LED Strip (Music Sync, App Control, Alexa & Google)',
    slug: 'gugu-ambient-rgbic-10m-smart-neon-led-strip',
    description: 'Transform your bedroom, TV setup, or office with individually addressable RGBIC segmented colors. High-sensitivity built-in microphone for real-time music rhythm syncing.',
    specifications: {
      'Length': '10 Meters (32.8 Ft) Flexible Silicone Rope',
      'LED Type': 'Addressable RGBIC 5050 SMD Chips',
      'Waterproof': 'IP67 Waterproof Outdoor & Indoor Safe',
      'Control': 'WiFi 2.4GHz + BLE App + 24-Key IR Remote',
      'Scenes': '64 Dynamic Preset Lighting Modes + DIY Canvas'
    },
    brand: 'GUGU AMBIENT',
    price: 12500,
    compare_price: 22000,
    currency: 'NGN',
    stock: 220,
    rating: 4.7,
    review_count: 850,
    sales_count: 4200,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Length',
        options: [
          { id: 'v-led-1', name: '10 Meters (Double Reel)', value: '10M', price_modifier: 0, in_stock: true },
          { id: 'v-led-2', name: '20 Meters Deluxe Mega Pack', value: '20M', price_modifier: 8500, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: false,
    shipping_fee: 1000,
    estimated_days: '2 - 3 Business Days',
    tags: ['led', 'smart_home', 'lighting', 'best_seller'],
    created_at: '2025-01-12T14:30:00Z'
  },
  {
    id: 'prod-sunglasses-polarized-titanium',
    seller_id: 'seller-saharan-vogue',
    seller_name: 'Saharan Vogue Apparel',
    seller_rating: 4.7,
    seller_location: 'Nairobi, Kenya',
    category_id: 'cat-accessories',
    category_name: 'Accessories & Watches',
    name: 'Vanguard Ultra-Lightweight Beta-Titanium Polarized UV400 Sunglasses',
    slug: 'vanguard-beta-titanium-polarized-sunglasses',
    description: 'Weighs only 16 grams. High-definition TAC 9-layer polarized lenses eliminate 99.9% of harmful glare and 100% of UVA/UVB rays. Flexible memory titanium frame will not deform under pressure.',
    specifications: {
      'Frame Material': 'Beta-Titanium Alloy with Vacuum IP Plating',
      'Lens': 'TAC 9-Layer HD Polarized UV400 (Anti-Scratch)',
      'Weight': '16.2 Grams Ultra Featherweight',
      'Includes': 'Leather Hard Case, Microfiber Cloth, Polarization Test Card'
    },
    brand: 'VANGUARD EYEWEAR',
    price: 14500,
    compare_price: 25000,
    currency: 'NGN',
    stock: 140,
    rating: 4.8,
    review_count: 460,
    sales_count: 1890,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Lens Color',
        options: [
          { id: 'v-sg-1', name: 'Gradient Obsidian Gray', value: 'Obsidian Gray', price_modifier: 0, in_stock: true },
          { id: 'v-sg-2', name: 'Sunset Bronze Mirror', value: 'Bronze Mirror', price_modifier: 0, in_stock: true },
          { id: 'v-sg-3', name: 'Emerald Green Polarized', value: 'Emerald Polarized', price_modifier: 500, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: false,
    shipping_fee: 1200,
    estimated_days: '2 - 4 Business Days',
    tags: ['sunglasses', 'accessories', 'titanium', 'luxury'],
    created_at: '2025-02-08T16:20:00Z'
  },
  {
    id: 'prod-hair-trimmer-pro',
    seller_id: 'seller-zenaura-beauty',
    seller_name: 'ZenAura Natural Skincare & Glow',
    seller_rating: 4.8,
    seller_location: 'Accra, Ghana',
    category_id: 'cat-beauty',
    category_name: 'Beauty & Skincare',
    name: 'GroomMaster Vintage Metal T-Blade Zero-Gapped Cordless Barber Hair Trimmer',
    slug: 'groommaster-vintage-t-blade-hair-trimmer',
    description: 'Heavy duty engraved bronze carved metal body with self-sharpening titanium ceramic T-blade. 7000 RPM high-speed motor cuts through coarse, thick hair smoothly without snagging or pulling.',
    specifications: {
      'Blade': 'Titanium Ceramic Zero-Gapped T-Blade',
      'Motor': '7000 RPM Supercharged Rotary Motor',
      'Battery': '1400mAh Li-ion (3 Hours Run Time on USB-C Charge)',
      'Guide Combs': 'Includes 1.5mm, 2mm, 3mm, 4mm Guard Attachments'
    },
    brand: 'GROOMMASTER',
    price: 11000,
    compare_price: 19500,
    currency: 'NGN',
    stock: 180,
    rating: 4.8,
    review_count: 940,
    sales_count: 5120,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      {
        name: 'Engraving Pattern',
        options: [
          { id: 'v-tr-1', name: 'Imperial Dragon Bronze', value: 'Dragon Bronze', price_modifier: 0, in_stock: true },
          { id: 'v-tr-2', name: 'Cyber Skull Gold', value: 'Skull Gold', price_modifier: 0, in_stock: true }
        ]
      }
    ],
    is_flash_deal: false,
    is_free_shipping: false,
    shipping_fee: 1000,
    estimated_days: '2 - 3 Business Days',
    tags: ['grooming', 'hair_trimmer', 'barber', 'best_seller'],
    created_at: '2025-01-09T10:15:00Z'
  }
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    product_id: 'prod-earbuds-pro-x',
    user_id: 'user-demo-1',
    user_name: 'Chidi Okafor',
    user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Mind-blowing noise cancellation! Better than my ₦150k Sony buds',
    comment: 'I use these daily on the BRT bus in Lagos and all the noise completely disappears. The bass is deep, phone calls are crystal clear, and the battery lasts almost a full week before charging the case.',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80'],
    verified_purchase: true,
    created_at: '2025-02-20T14:30:00Z',
    helpful_count: 48
  },
  {
    id: 'rev-2',
    product_id: 'prod-earbuds-pro-x',
    user_id: 'user-demo-2',
    user_name: 'Amina Yusuf',
    user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Fast delivery to Abuja within 48 hours!',
    comment: 'Ordered on Monday morning and Gugu Xpress delivered it to my door in Wuse 2 by Wednesday noon. The orange colorway is gorgeous and the touch controls work seamlessly.',
    images: [],
    verified_purchase: true,
    created_at: '2025-02-22T09:15:00Z',
    helpful_count: 22
  },
  {
    id: 'rev-3',
    product_id: 'prod-smartwatch-ultra',
    user_id: 'user-demo-3',
    user_name: 'David Mwangi',
    user_avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'The AMOLED screen is stunning outdoors',
    comment: 'Even in direct midday sunshine, the watch display is vibrant and razor sharp. Heart rate tracking matches my Garmin strap during 10km morning runs.',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80'],
    verified_purchase: true,
    created_at: '2025-02-18T16:45:00Z',
    helpful_count: 35
  },
  {
    id: 'rev-4',
    product_id: 'prod-laptop-creator-pro',
    user_id: 'user-demo-4',
    user_name: 'Kwame Mensah',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'Beast for Docker, Next.js & Blender 3D',
    comment: 'Renders complex scenes in Blender with RTX 4060 without breaking a sweat. The OLED screen makes coding for 10 hours straight easy on the eyes.',
    images: [],
    verified_purchase: true,
    created_at: '2025-02-24T11:20:00Z',
    helpful_count: 19
  },
  {
    id: 'rev-5',
    product_id: 'prod-skincare-serum-glow',
    user_id: 'user-demo-5',
    user_name: 'Fatima Al-Hassan',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    title: 'My stubborn dark spots faded in 2 weeks!',
    comment: 'Authentic Ghanaian shea plus stable vitamin C is the secret combination my hyperpigmentation needed. Absorbs quickly and gives an instant dewy glass skin finish.',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80'],
    verified_purchase: true,
    created_at: '2025-02-15T18:00:00Z',
    helpful_count: 64
  }
];

export const SEED_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'XPRESS10',
    discount_type: 'percent',
    discount_value: 10,
    minimum_order: 15000,
    maximum_discount: 10000,
    expiry_date: '2026-12-31',
    usage_limit: 10000,
    description: '10% off storewide on orders over ₦15,000'
  },
  {
    id: 'coup-2',
    code: 'MEGA5000',
    discount_type: 'fixed',
    discount_value: 5000,
    minimum_order: 35000,
    expiry_date: '2026-12-31',
    usage_limit: 5000,
    description: '₦5,000 instant savings on orders over ₦35,000'
  },
  {
    id: 'coup-3',
    code: 'FIRSTBUY',
    discount_type: 'percent',
    discount_value: 15,
    minimum_order: 10000,
    maximum_discount: 15000,
    expiry_date: '2026-12-31',
    usage_limit: 1000,
    description: '15% off your first purchase as a new customer'
  },
  {
    id: 'coup-4',
    code: 'GUGUFREE',
    discount_type: 'fixed',
    discount_value: 2000,
    minimum_order: 12000,
    expiry_date: '2026-12-31',
    usage_limit: 3000,
    description: 'Free Shipping credit (₦2,000 off shipping fee)'
  }
];

export const DEMO_USERS: Record<string, User> = {
  customer: {
    id: 'usr-customer-1',
    email: 'customer@guguxpress.com',
    phone: '+234 803 123 4567',
    full_name: 'Tariq Adeleke',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'customer',
    addresses: [
      {
        id: 'addr-1',
        recipient_name: 'Tariq Adeleke',
        phone: '+234 803 123 4567',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Ikeja',
        address: 'Plot 14B Admiralty Way, Lekki Phase 1',
        postal_code: '105102',
        is_default: true
      },
      {
        id: 'addr-2',
        recipient_name: 'Tariq Adeleke (Office)',
        phone: '+234 803 123 4567',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Victoria Island',
        address: 'Tower 4, 8th Floor, Adeola Odeku St',
        postal_code: '101241',
        is_default: false
      }
    ],
    wishlist: ['prod-earbuds-pro-x', 'prod-smartwatch-ultra'],
    created_at: '2024-06-01T10:00:00Z'
  },
  seller: {
    id: 'user-seller-1',
    email: 'seller@guguxpress.com',
    phone: '+234 809 888 7777',
    full_name: 'Gugu Flagship Merchant Manager',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    role: 'seller',
    addresses: [
      {
        id: 'addr-seller-1',
        recipient_name: 'Gugu Warehouse Logistics Hub',
        phone: '+234 809 888 7777',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Oshodi-Isolo',
        address: 'Cargo Warehouse Complex C5, Oshodi Expressway',
        postal_code: '100261',
        is_default: true
      }
    ],
    wishlist: [],
    created_at: '2024-01-10T08:00:00Z'
  },
  admin: {
    id: 'usr-admin-1',
    email: 'admin@guguxpress.com',
    phone: '+234 800 000 9999',
    full_name: 'Gugu Platform Super Admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    addresses: [],
    wishlist: [],
    created_at: '2024-01-01T00:00:00Z'
  }
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    user_id: 'usr-customer-1',
    title: '🔥 MEGA XPRESS SALE is Live!',
    message: 'Enjoy up to 70% OFF flagship audio, smartphones & gaming gear for the next 48 hours.',
    type: 'promo',
    read: false,
    timestamp: '10 mins ago',
    action_url: 'flash-deals'
  },
  {
    id: 'notif-2',
    user_id: 'usr-customer-1',
    title: '📦 Order #GX-89421 Shipped',
    message: 'Your Gugu SoundPods Pro X has been dispatched via Xpress Logistics. Tracking: GX982410NG.',
    type: 'order',
    read: false,
    timestamp: '2 hours ago',
    action_url: 'order-tracking'
  },
  {
    id: 'notif-3',
    user_id: 'usr-customer-1',
    title: '🎟️ Welcome Coupon Added',
    message: 'Use code FIRSTBUY at checkout to claim 15% off your order!',
    type: 'promo',
    read: true,
    timestamp: '1 day ago'
  }
];
