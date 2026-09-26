export type ProductCategory = 
  | 'For You'
  | 'Fashion'
  | 'Mobiles'
  | 'Electronics'
  | 'Beauty'
  | 'Home'
  | 'Appliances'
  | 'Toys & Baby'
  | 'Sports'
  | 'Furniture'
  | 'Books'
  | 'Men' 
  | 'Women' 
  | 'Unisex' 
  | 'Outerwear' 
  | 'Accessories'
  | string;

export type ClothingType = 
  | 'T-Shirts' 
  | 'Shirts' 
  | 'Hoodies & Sweatshirts' 
  | 'Jackets & Coats' 
  | 'Jeans & Denim' 
  | 'Trousers & Pants' 
  | 'Knitwear & Sweaters' 
  | 'Dresses & Co-ords' 
  | 'Activewear'
  | 'Blazers'
  | 'Smartphones & Flagships'
  | 'Cases & Accessories'
  | 'Wireless Audio'
  | 'Laptops & Ultrabooks'
  | 'Skincare & Serums'
  | 'Perfumes & Fragrances'
  | 'Decor & Lighting'
  | 'Kitchenware & Living'
  | 'Smart Appliances'
  | 'Montessori & STEM Toys'
  | 'Athletic & Training'
  | 'Lounge & Accent Chairs'
  | 'Design & Art Hardcovers'
  | string;

export interface ProductVariantColor {
  name: string;
  hex: string;
  images: string[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
  sizePurchased?: string;
  colorPurchased?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: ProductCategory;
  subcategory: ClothingType;
  gender: 'Men' | 'Women' | 'Unisex';
  images: string[];
  colors: {
    name: string;
    hex: string;
    imageIndex: number;
  }[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  materials: string[];
  fabricCare: string[];
  features: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  sku: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isDealOfTheDay?: boolean;
  dealEndTime?: string;
  fit: 'Relaxed Fit' | 'Oversized' | 'Slim Fit' | 'Regular Fit' | 'Boxy Fit';
  modelInfo?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
}

export interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  addressType: 'Home' | 'Work' | 'Other';
}

export type OrderStatus = 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: SavedAddress;
  shippingMethod: {
    type: 'Standard' | 'Express';
    cost: number;
    estimatedDelivery: string;
  };
  paymentMethod: {
    type: 'Credit/Debit Card' | 'UPI' | 'Net Banking' | 'Cash on Delivery';
    last4?: string;
    upiId?: string;
    transactionId?: string;
    isPaid: boolean;
  };
  pricing: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    couponCode?: string;
  };
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
  trackingNumber: string;
  carrier: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: SavedAddress[];
  savedPaymentMethods: {
    id: string;
    type: 'Card' | 'UPI';
    title: string;
    details: string;
    expiry?: string;
    isDefault?: boolean;
  }[];
}

export interface FilterState {
  searchQuery: string;
  categories: ProductCategory[];
  subcategories: ClothingType[];
  sizes: string[];
  colors: string[];
  materials: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount';
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  description: string;
}

export interface VendorProfile {
  id: string;
  storeName: string;
  storeSlug: string;
  ownerName: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  businessType: 'Sole Proprietorship' | 'LLP' | 'Private Limited';
  storeAddress: string;
  bankDetails: {
    accountHolder: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
  kycStatus: 'Approved' | 'Under Review' | 'Rejected';
  rating: number;
  totalProducts: number;
  totalSales: number;
  availablePayout: number;
  joinedDate: string;
  logo?: string;
  banner?: string;
}

export interface VendorPayout {
  id: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Failed';
  bankReference: string;
  orderCount: number;
}
