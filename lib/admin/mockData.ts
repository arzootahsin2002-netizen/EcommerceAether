import { 
  AdminVendor, 
  AdminCustomer, 
  AdminProductItem, 
  AdminOrderRecord, 
  AdminReturnRecord, 
  AdminRefundRecord, 
  AdminTransactionRecord, 
  AdminPayoutRecord, 
  AdminCoupon, 
  AdminCategory, 
  AdminActivityLog, 
  AdminNotification,
  AdminUser
} from './types';

export const INITIAL_ADMIN_USER: AdminUser = {
  id: 'adm-001',
  name: 'Alexander Sterling',
  email: 'admin@dribo.market',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  role: 'Super Admin',
  status: 'Active',
  lastLogin: 'Today, 02:14 PM',
  createdDate: '12 Jan 2025',
  permissions: ['*']
};

export const MOCK_ADMIN_USERS: AdminUser[] = [
  INITIAL_ADMIN_USER,
  {
    id: 'adm-002',
    name: 'Priyanka Sen',
    email: 'priyanka.vendor@dribo.market',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    role: 'Vendor Manager',
    status: 'Active',
    lastLogin: 'Yesterday, 05:40 PM',
    createdDate: '15 Feb 2025',
    permissions: ['vendors:read', 'vendors:write', 'vendors:verify']
  },
  {
    id: 'adm-003',
    name: 'Rohan Deshmukh',
    email: 'rohan.finance@dribo.market',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    role: 'Finance Manager',
    status: 'Active',
    lastLogin: 'Today, 11:20 AM',
    createdDate: '01 Mar 2025',
    permissions: ['finance:read', 'finance:payouts', 'finance:commission']
  },
  {
    id: 'adm-004',
    name: 'Ananya Roy',
    email: 'ananya.catalog@dribo.market',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    role: 'Product Manager',
    status: 'Active',
    lastLogin: '28 Sep 2026',
    createdDate: '10 Apr 2025',
    permissions: ['products:read', 'products:approve', 'categories:write']
  }
];

export const MOCK_VENDORS: AdminVendor[] = [
  {
    id: 'vnd-101',
    vendorId: 'DRB-VND-8421',
    logo: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    vendorName: 'Raghav Kashyap',
    businessName: 'Aether Atelier & Co.',
    email: 'merchant@aether.store',
    phone: '+91 98765 43210',
    category: 'Fashion & Luxury Apparel',
    gstin: '29AABCB1234D1Z5',
    pan: 'AABCB1234D',
    address: {
      street: '14, Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      country: 'India'
    },
    bankDetails: {
      accountName: 'Aether Atelier Private Limited',
      accountNumber: '50200049281742',
      ifscCode: 'HDFC0001248',
      bankName: 'HDFC Bank',
      branch: 'Indiranagar Bengaluru'
    },
    productsCount: 48,
    ordersCount: 312,
    totalRevenue: 1284900,
    commissionRate: 10,
    availablePayout: 142850,
    pendingPayout: 28400,
    rating: 4.92,
    verificationStatus: 'Approved',
    status: 'Active',
    submittedAt: '14 Aug 2026',
    approvedAt: '16 Aug 2026',
    documents: [
      {
        id: 'doc-1',
        type: 'GSTIN Certificate',
        documentNumber: '29AABCB1234D1Z5',
        fileUrl: '#',
        status: 'Verified',
        uploadedAt: '14 Aug 2026',
        verifiedAt: '16 Aug 2026'
      },
      {
        id: 'doc-2',
        type: 'Government ID / PAN',
        documentNumber: 'AABCB1234D',
        fileUrl: '#',
        status: 'Verified',
        uploadedAt: '14 Aug 2026',
        verifiedAt: '16 Aug 2026'
      },
      {
        id: 'doc-3',
        type: 'Cancelled Cheque / Bank Statement',
        documentNumber: '50200049281742',
        fileUrl: '#',
        status: 'Verified',
        uploadedAt: '14 Aug 2026',
        verifiedAt: '16 Aug 2026'
      }
    ]
  },
  {
    id: 'vnd-102',
    vendorId: 'DRB-VND-8490',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop',
    vendorName: 'Vikramaditya Rao',
    businessName: 'Apex Mobility Tech',
    email: 'contact@apexmobiles.in',
    phone: '+91 98450 11223',
    category: 'Mobiles & Electronics',
    gstin: '07AAACA9876E1ZX',
    pan: 'AAACA9876E',
    address: {
      street: 'Tower B, Cyber City DLF Phase 2',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      country: 'India'
    },
    bankDetails: {
      accountName: 'Apex Mobility Solutions LLP',
      accountNumber: '001205004918',
      ifscCode: 'ICIC0000012',
      bankName: 'ICICI Bank',
      branch: 'Cyber City Gurugram'
    },
    productsCount: 84,
    ordersCount: 940,
    totalRevenue: 4892000,
    commissionRate: 8,
    availablePayout: 382400,
    pendingPayout: 65000,
    rating: 4.88,
    verificationStatus: 'Approved',
    status: 'Active',
    submittedAt: '10 Jul 2026',
    approvedAt: '12 Jul 2026',
    documents: [
      {
        id: 'doc-10',
        type: 'GSTIN Certificate',
        documentNumber: '07AAACA9876E1ZX',
        fileUrl: '#',
        status: 'Verified',
        uploadedAt: '10 Jul 2026',
        verifiedAt: '12 Jul 2026'
      }
    ]
  },
  {
    id: 'vnd-103',
    vendorId: 'DRB-VND-8512',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop',
    vendorName: 'Meera Nambiar',
    businessName: 'Aurora Glow Organics',
    email: 'hello@auroraglow.com',
    phone: '+91 97112 33445',
    category: 'Beauty & Skincare',
    gstin: '32AABCO4567F1Z1',
    pan: 'AABCO4567F',
    address: {
      street: '42 Marine Drive Promenade',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682011',
      country: 'India'
    },
    bankDetails: {
      accountName: 'Aurora Glow Botanicals Pvt Ltd',
      accountNumber: '9180200489123',
      ifscCode: 'UTIB0000214',
      bankName: 'Axis Bank',
      branch: 'MG Road Kochi'
    },
    productsCount: 32,
    ordersCount: 420,
    totalRevenue: 894000,
    commissionRate: 12,
    availablePayout: 94200,
    pendingPayout: 18000,
    rating: 4.95,
    verificationStatus: 'Under Review',
    status: 'Pending',
    submittedAt: '24 Sep 2026',
    documents: [
      {
        id: 'doc-21',
        type: 'GSTIN Certificate',
        documentNumber: '32AABCO4567F1Z1',
        fileUrl: '#',
        status: 'Pending',
        uploadedAt: '24 Sep 2026'
      },
      {
        id: 'doc-22',
        type: 'Business Registration / Certificate',
        documentNumber: 'U24246KL2024PTC081234',
        fileUrl: '#',
        status: 'Pending',
        uploadedAt: '24 Sep 2026'
      },
      {
        id: 'doc-23',
        type: 'Cancelled Cheque / Bank Statement',
        documentNumber: '9180200489123',
        fileUrl: '#',
        status: 'Pending',
        uploadedAt: '24 Sep 2026'
      }
    ]
  },
  {
    id: 'vnd-104',
    vendorId: 'DRB-VND-8534',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200&auto=format&fit=crop',
    vendorName: 'Kunal Singhania',
    businessName: 'Nordic Oak Living',
    email: 'kunal@nordicoak.in',
    phone: '+91 99880 77665',
    category: 'Home & Furniture',
    gstin: '27AABCS3321G1ZQ',
    pan: 'AABCS3321G',
    address: {
      street: 'Industrial Area Phase 1',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411019',
      country: 'India'
    },
    bankDetails: {
      accountName: 'Singhania Furnishings LLP',
      accountNumber: '30492817482',
      ifscCode: 'SBIN0004821',
      bankName: 'State Bank of India',
      branch: 'Pimpri Pune'
    },
    productsCount: 19,
    ordersCount: 88,
    totalRevenue: 1450000,
    commissionRate: 10,
    availablePayout: 180000,
    pendingPayout: 42000,
    rating: 4.75,
    verificationStatus: 'Pending',
    status: 'Pending',
    submittedAt: '27 Sep 2026',
    documents: [
      {
        id: 'doc-31',
        type: 'GSTIN Certificate',
        documentNumber: '27AABCS3321G1ZQ',
        fileUrl: '#',
        status: 'Pending',
        uploadedAt: '27 Sep 2026'
      },
      {
        id: 'doc-32',
        type: 'Government ID / PAN',
        documentNumber: 'AABCS3321G',
        fileUrl: '#',
        status: 'Pending',
        uploadedAt: '27 Sep 2026'
      }
    ]
  },
  {
    id: 'vnd-105',
    vendorId: 'DRB-VND-8560',
    logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop',
    vendorName: 'Tariq Mansoor',
    businessName: 'Sonic Acoustics India',
    email: 'sales@sonicacoustics.com',
    phone: '+91 98110 55443',
    category: 'Electronics',
    gstin: '06AABCT9981H1ZY',
    pan: 'AABCT9981H',
    address: {
      street: 'Sector 18 Electronic Zone',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      country: 'India'
    },
    bankDetails: {
      accountName: 'Sonic Acoustics Electronics',
      accountNumber: '112004819284',
      ifscCode: 'KKBK0000182',
      bankName: 'Kotak Mahindra Bank',
      branch: 'Sector 18 Noida'
    },
    productsCount: 28,
    ordersCount: 245,
    totalRevenue: 640000,
    commissionRate: 8,
    availablePayout: 42000,
    pendingPayout: 12000,
    rating: 4.68,
    verificationStatus: 'More Info Required',
    status: 'Suspended',
    submittedAt: '20 Sep 2026',
    rejectionReason: 'Bank statement IFSC does not match branch address. Kindly upload latest cancelled cheque.',
    documents: [
      {
        id: 'doc-41',
        type: 'GSTIN Certificate',
        documentNumber: '06AABCT9981H1ZY',
        fileUrl: '#',
        status: 'Verified',
        uploadedAt: '20 Sep 2026'
      },
      {
        id: 'doc-42',
        type: 'Cancelled Cheque / Bank Statement',
        documentNumber: '112004819284',
        fileUrl: '#',
        status: 'Rejected',
        uploadedAt: '20 Sep 2026',
        rejectionReason: 'IFSC mismatch on statement header'
      }
    ]
  }
];

export const MOCK_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'usr-1',
    userId: 'DRB-USR-9824',
    name: 'Raghav Kashyap',
    email: 'customer@aether.store',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    registrationDate: '12 Jan 2025',
    ordersCount: 8,
    totalSpent: 48920,
    verificationStatus: 'Verified',
    status: 'Active',
    lastActive: '10 mins ago',
    loyaltyTier: 'VIP Diamond',
    walletBalance: 1500
  },
  {
    id: 'usr-2',
    userId: 'DRB-USR-9830',
    name: 'Siddharth Varma',
    email: 'siddharth.v@gmail.com',
    phone: '+91 98200 48192',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    registrationDate: '04 Mar 2025',
    ordersCount: 14,
    totalSpent: 89400,
    verificationStatus: 'Verified',
    status: 'Active',
    lastActive: '2 hours ago',
    loyaltyTier: 'VIP Diamond',
    walletBalance: 2450
  },
  {
    id: 'usr-3',
    userId: 'DRB-USR-9845',
    name: 'Aishwarya Pillai',
    email: 'aishwarya.p@outlook.com',
    phone: '+91 97400 91823',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    registrationDate: '18 May 2025',
    ordersCount: 5,
    totalSpent: 24500,
    verificationStatus: 'Verified',
    status: 'Active',
    lastActive: 'Yesterday',
    loyaltyTier: 'Gold',
    walletBalance: 800
  },
  {
    id: 'usr-4',
    userId: 'DRB-USR-9860',
    name: 'Kabir Oberoi',
    email: 'kabir.oberoi@yahoo.com',
    phone: '+91 98111 22334',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    registrationDate: '22 Aug 2026',
    ordersCount: 1,
    totalSpent: 4999,
    verificationStatus: 'Pending',
    status: 'Active',
    lastActive: '3 days ago',
    loyaltyTier: 'Regular',
    walletBalance: 0
  },
  {
    id: 'usr-5',
    userId: 'DRB-USR-9872',
    name: 'Devraj Chauhan',
    email: 'devraj.spammer@tempmail.com',
    phone: '+91 90000 00001',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    registrationDate: '26 Sep 2026',
    ordersCount: 0,
    totalSpent: 0,
    verificationStatus: 'Rejected',
    status: 'Blocked',
    lastActive: '5 days ago',
    loyaltyTier: 'Regular',
    walletBalance: 0
  }
];

export const MOCK_ADMIN_PRODUCTS: AdminProductItem[] = [
  {
    id: 'prod-1',
    name: '500 GSM French Terry Oversized Hoodie',
    sku: 'AETH-HD-01',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    vendorId: 'vnd-101',
    vendorName: 'Aether Atelier & Co.',
    category: 'Fashion',
    subcategory: 'Hoodies & Sweatshirts',
    price: 3499,
    originalPrice: 4999,
    stock: 45,
    rating: 4.9,
    approvalStatus: 'Approved',
    status: 'Active',
    dateAdded: '15 Aug 2026',
    description: 'Ultra-heavyweight 500 GSM French Terry cotton hoodie with dropped shoulders and double-layered architectural hood.'
  },
  {
    id: 'prod-2',
    name: 'Italian Tailored Wool Overcoat',
    sku: 'AETH-OC-02',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    vendorId: 'vnd-101',
    vendorName: 'Aether Atelier & Co.',
    category: 'Fashion',
    subcategory: 'Jackets & Coats',
    price: 9999,
    originalPrice: 14999,
    stock: 12,
    rating: 5.0,
    approvalStatus: 'Approved',
    status: 'Active',
    dateAdded: '18 Aug 2026',
    description: 'Double-breasted coat woven from 100% fine Italian virgin wool with cupro lining.'
  },
  {
    id: 'prod-3',
    name: 'Flagship OLED Pro 5G Smartphone',
    sku: 'APEX-PH-99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    vendorId: 'vnd-102',
    vendorName: 'Apex Mobility Tech',
    category: 'Mobiles',
    subcategory: 'Smartphones & Flagships',
    price: 74999,
    originalPrice: 89999,
    stock: 28,
    rating: 4.8,
    approvalStatus: 'Approved',
    status: 'Active',
    dateAdded: '01 Sep 2026',
    description: 'Next-gen flagship mobile with 120Hz LTPO display, 200MP camera matrix and 100W SuperCharge.'
  },
  {
    id: 'prod-4',
    name: 'Rose & Squalane Botanical Elixir',
    sku: 'AUR-SK-12',
    image: 'https://images.unsplash.com/photo-1608248597359-bb08b8b98f24?q=80&w=600&auto=format&fit=crop',
    vendorId: 'vnd-103',
    vendorName: 'Aurora Glow Organics',
    category: 'Beauty',
    subcategory: 'Skincare & Serums',
    price: 1899,
    originalPrice: 2499,
    stock: 60,
    rating: 4.9,
    approvalStatus: 'Pending Approval',
    status: 'Active',
    dateAdded: '25 Sep 2026',
    description: 'Certified organic facial serum infused with Damascus rose extracts and olive-derived squalane.'
  },
  {
    id: 'prod-5',
    name: 'Handcrafted Scandinavian Lounge Chair',
    sku: 'NDK-CH-04',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
    vendorId: 'vnd-104',
    vendorName: 'Nordic Oak Living',
    category: 'Furniture',
    subcategory: 'Lounge & Accent Chairs',
    price: 18999,
    originalPrice: 24999,
    stock: 4,
    rating: 4.7,
    approvalStatus: 'Pending Approval',
    status: 'Active',
    dateAdded: '28 Sep 2026',
    description: 'Solid European ash wood frame with boucle textured upholstery and ergonomic curvature.'
  },
  {
    id: 'prod-6',
    name: 'Wireless ANC Over-Ear Studio Headphones',
    sku: 'SNC-HP-08',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    vendorId: 'vnd-105',
    vendorName: 'Sonic Acoustics India',
    category: 'Electronics',
    subcategory: 'Wireless Audio',
    price: 12999,
    originalPrice: 17999,
    stock: 0,
    rating: 4.6,
    approvalStatus: 'Rejected',
    status: 'Out of Stock',
    dateAdded: '22 Sep 2026',
    description: 'High-res audio studio headphones with 45dB hybrid active noise cancellation.',
    rejectionReason: 'BIS certification document not attached in submission package.'
  }
];

export const MOCK_ORDERS: AdminOrderRecord[] = [
  {
    id: 'ord-1',
    orderNumber: 'DRB-ORD-10245',
    customerId: 'usr-1',
    customerName: 'Raghav Kashyap',
    customerEmail: 'customer@aether.store',
    customerPhone: '+91 98765 43210',
    vendorId: 'vnd-101',
    vendorName: 'Aether Atelier & Co.',
    itemsCount: 2,
    totalAmount: 13498,
    platformCommission: 1349.8,
    vendorPayout: 12148.2,
    paymentMethod: 'UPI / Google Pay',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    date: '25 Sep 2026, 11:30 AM',
    shippingAddress: 'Flat 402, Prestige Palms, Indiranagar, Bengaluru 560038',
    carrier: 'BlueDart Express',
    trackingNumber: 'BLU-89214710',
    timeline: [
      { status: 'Order Placed', date: '25 Sep, 11:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '25 Sep, 11:31 AM', completed: true },
      { status: 'Processed & Packed', date: '25 Sep, 03:00 PM', completed: true },
      { status: 'Shipped', date: '26 Sep, 09:00 AM', completed: true },
      { status: 'Delivered', date: '27 Sep, 02:45 PM', completed: true }
    ]
  },
  {
    id: 'ord-2',
    orderNumber: 'DRB-ORD-10246',
    customerId: 'usr-2',
    customerName: 'Siddharth Varma',
    customerEmail: 'siddharth.v@gmail.com',
    customerPhone: '+91 98200 48192',
    vendorId: 'vnd-102',
    vendorName: 'Apex Mobility Tech',
    itemsCount: 1,
    totalAmount: 74999,
    platformCommission: 5999.92,
    vendorPayout: 68999.08,
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    date: '27 Sep 2026, 04:15 PM',
    shippingAddress: 'B-12, Green Park Main, New Delhi 110016',
    carrier: 'Delhivery Surface',
    trackingNumber: 'DEL-99182341',
    timeline: [
      { status: 'Order Placed', date: '27 Sep, 04:15 PM', completed: true },
      { status: 'Payment Confirmed', date: '27 Sep, 04:16 PM', completed: true },
      { status: 'Processed & Packed', date: '28 Sep, 10:00 AM', completed: true },
      { status: 'Shipped', date: '28 Sep, 06:30 PM', completed: true },
      { status: 'Delivered', date: 'Estimated 30 Sep', completed: false }
    ]
  },
  {
    id: 'ord-3',
    orderNumber: 'DRB-ORD-10247',
    customerId: 'usr-3',
    customerName: 'Aishwarya Pillai',
    customerEmail: 'aishwarya.p@outlook.com',
    customerPhone: '+91 97400 91823',
    vendorId: 'vnd-101',
    vendorName: 'Aether Atelier & Co.',
    itemsCount: 1,
    totalAmount: 3499,
    platformCommission: 349.9,
    vendorPayout: 3149.1,
    paymentMethod: 'UPI / Google Pay',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    date: 'Today, 09:10 AM',
    shippingAddress: 'Villa 18, Palm Meadows, Whitefield, Bengaluru 560066',
    carrier: 'BlueDart Express',
    trackingNumber: 'BLU-PENDING-AWB',
    timeline: [
      { status: 'Order Placed', date: 'Today, 09:10 AM', completed: true },
      { status: 'Payment Confirmed', date: 'Today, 09:11 AM', completed: true },
      { status: 'Processing', date: 'In Progress', completed: true },
      { status: 'Shipped', date: 'Pending', completed: false },
      { status: 'Delivered', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'ord-4',
    orderNumber: 'DRB-ORD-10248',
    customerId: 'usr-4',
    customerName: 'Kabir Oberoi',
    customerEmail: 'kabir.oberoi@yahoo.com',
    customerPhone: '+91 98111 22334',
    vendorId: 'vnd-104',
    vendorName: 'Nordic Oak Living',
    itemsCount: 1,
    totalAmount: 18999,
    platformCommission: 1899.9,
    vendorPayout: 17099.1,
    paymentMethod: 'NetBanking',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    date: 'Today, 01:25 PM',
    shippingAddress: '404 Altamount Road, Cumballa Hill, Mumbai 400026',
    carrier: 'Gati Logistics Heavy',
    trackingNumber: 'GAT-PENDING',
    timeline: [
      { status: 'Order Placed', date: 'Today, 01:25 PM', completed: true },
      { status: 'Payment Confirmed', date: 'Today, 01:26 PM', completed: true },
      { status: 'Processing', date: 'Awaiting Vendor Dispatch', completed: false },
      { status: 'Shipped', date: 'Pending', completed: false },
      { status: 'Delivered', date: 'Pending', completed: false }
    ]
  }
];

export const MOCK_RETURNS: AdminReturnRecord[] = [
  {
    id: 'ret-1',
    returnId: 'DRB-RET-501',
    orderNumber: 'DRB-ORD-10190',
    customerName: 'Pooja Hegde',
    vendorName: 'Aether Atelier & Co.',
    productName: 'Italian Tailored Wool Overcoat (Size L)',
    productImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    reason: 'Size too large across shoulders; exchange requested for Size M',
    amount: 9999,
    date: '26 Sep 2026',
    status: 'Inspecting'
  },
  {
    id: 'ret-2',
    returnId: 'DRB-RET-502',
    orderNumber: 'DRB-ORD-10182',
    customerName: 'Manish Malhotra',
    vendorName: 'Apex Mobility Tech',
    productName: 'Fast Charging 65W GaN Adapter',
    productImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=200&auto=format&fit=crop',
    reason: 'Defective plug pin on delivery package',
    amount: 2499,
    date: '24 Sep 2026',
    status: 'Approved'
  }
];

export const MOCK_REFUNDS: AdminRefundRecord[] = [
  {
    id: 'ref-1',
    refundId: 'DRB-REF-901',
    orderNumber: 'DRB-ORD-10170',
    customerName: 'Tanvi Shah',
    amount: 3499,
    reason: 'Cancelled before vendor dispatch',
    paymentMethod: 'UPI / Google Pay',
    date: '25 Sep 2026',
    status: 'Completed',
    arnNumber: 'ARN-9812471029'
  },
  {
    id: 'ref-2',
    refundId: 'DRB-REF-902',
    orderNumber: 'DRB-ORD-10182',
    customerName: 'Manish Malhotra',
    amount: 2499,
    reason: 'Approved Return #DRB-RET-502',
    paymentMethod: 'Credit Card',
    date: '28 Sep 2026',
    status: 'Processing'
  }
];

export const MOCK_TRANSACTIONS: AdminTransactionRecord[] = [
  {
    id: 'txn-1',
    transactionId: 'TXN-98241029',
    orderNumber: 'DRB-ORD-10245',
    customerName: 'Raghav Kashyap',
    vendorName: 'Aether Atelier & Co.',
    amount: 13498,
    method: 'Razorpay UPI (HDFC)',
    date: '25 Sep 2026, 11:31 AM',
    status: 'Successful'
  },
  {
    id: 'txn-2',
    transactionId: 'TXN-98241030',
    orderNumber: 'DRB-ORD-10246',
    customerName: 'Siddharth Varma',
    vendorName: 'Apex Mobility Tech',
    amount: 74999,
    method: 'Stripe Credit Card (ICICI)',
    date: '27 Sep 2026, 04:16 PM',
    status: 'Successful'
  },
  {
    id: 'txn-3',
    transactionId: 'TXN-98241031',
    orderNumber: 'DRB-ORD-10247',
    customerName: 'Aishwarya Pillai',
    vendorName: 'Aether Atelier & Co.',
    amount: 3499,
    method: 'Paytm UPI (Axis)',
    date: 'Today, 09:11 AM',
    status: 'Successful'
  },
  {
    id: 'txn-4',
    transactionId: 'TXN-98241032',
    orderNumber: 'DRB-ORD-10248',
    customerName: 'Kabir Oberoi',
    vendorName: 'Nordic Oak Living',
    amount: 18999,
    method: 'NetBanking (SBI)',
    date: 'Today, 01:26 PM',
    status: 'Successful'
  }
];

export const MOCK_PAYOUTS: AdminPayoutRecord[] = [
  {
    id: 'pay-1',
    payoutId: 'DRB-PAY-8801',
    vendorId: 'vnd-101',
    vendorName: 'Aether Atelier & Co.',
    grossSales: 158700,
    commission: 15870,
    refundsDeducted: 0,
    payableAmount: 142830,
    status: 'Pending',
    date: '28 Sep 2026',
    bankAccount: 'HDFC Bank ••1742'
  },
  {
    id: 'pay-2',
    payoutId: 'DRB-PAY-8802',
    vendorId: 'vnd-102',
    vendorName: 'Apex Mobility Tech',
    grossSales: 415600,
    commission: 33248,
    refundsDeducted: 0,
    payableAmount: 382352,
    status: 'Completed',
    date: '25 Sep 2026',
    utrNumber: 'HDFC9821471011',
    bankAccount: 'ICICI Bank ••4918'
  },
  {
    id: 'pay-3',
    payoutId: 'DRB-PAY-8803',
    vendorId: 'vnd-104',
    vendorName: 'Nordic Oak Living',
    grossSales: 200000,
    commission: 20000,
    refundsDeducted: 0,
    payableAmount: 180000,
    status: 'Processing',
    date: '28 Sep 2026',
    bankAccount: 'SBI ••7482'
  }
];

export const MOCK_COUPONS: AdminCoupon[] = [
  {
    id: 'cpn-1',
    code: 'DRIBOFEST20',
    title: 'Grand Festive Marketplace 20% OFF',
    discountType: 'Percentage',
    value: 20,
    minimumOrder: 4999,
    maximumDiscount: 2000,
    startDate: '01 Sep 2026',
    endDate: '31 Oct 2026',
    usageLimit: 10000,
    usedCount: 4210,
    applicableVendors: ['All'],
    applicableCategories: ['Fashion', 'Beauty', 'Home'],
    status: 'Active'
  },
  {
    id: 'cpn-2',
    code: 'DRIBOVIP1000',
    title: 'VIP Patron Flat ₹1,000 Off',
    discountType: 'Flat Amount',
    value: 1000,
    minimumOrder: 7999,
    startDate: '15 Sep 2026',
    endDate: '15 Nov 2026',
    usageLimit: 2500,
    usedCount: 890,
    applicableVendors: ['All'],
    applicableCategories: ['All'],
    status: 'Active'
  },
  {
    id: 'cpn-3',
    code: 'FIRSTAPP500',
    title: 'New Customer Welcome Credit',
    discountType: 'Flat Amount',
    value: 500,
    minimumOrder: 2499,
    startDate: '01 Jan 2026',
    endDate: '31 Dec 2026',
    usageLimit: 50000,
    usedCount: 18450,
    applicableVendors: ['All'],
    applicableCategories: ['All'],
    status: 'Active'
  }
];

export const MOCK_CATEGORIES: AdminCategory[] = [
  {
    id: 'cat-1',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop',
    description: 'Designer apparel, luxury knits, outerwear, and accessories.',
    productsCount: 8420,
    status: 'Active',
    displayOrder: 1,
    commissionRate: 10,
    subcategories: ['Hoodies & Sweatshirts', 'T-Shirts', 'Shirts', 'Jackets & Coats', 'Jeans & Denim', 'Trousers']
  },
  {
    id: 'cat-2',
    name: 'Mobiles',
    slug: 'mobiles',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop',
    description: '5G smartphones, flagship devices, phone cases, and mobile gear.',
    productsCount: 3120,
    status: 'Active',
    displayOrder: 2,
    commissionRate: 8,
    subcategories: ['Smartphones & Flagships', 'Cases & Accessories', 'Screen Protectors']
  },
  {
    id: 'cat-3',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop',
    description: 'Wireless audio, noise cancelling headphones, laptops, smart accessories.',
    productsCount: 4890,
    status: 'Active',
    displayOrder: 3,
    commissionRate: 8,
    subcategories: ['Wireless Audio', 'Laptops & Ultrabooks', 'Smart Watches', 'Cameras']
  },
  {
    id: 'cat-4',
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop',
    description: 'Organic skincare, botanical serums, luxury perfumes, and personal care.',
    productsCount: 2940,
    status: 'Active',
    displayOrder: 4,
    commissionRate: 12,
    subcategories: ['Skincare & Serums', 'Perfumes & Fragrances', 'Haircare', 'Makeup']
  },
  {
    id: 'cat-5',
    name: 'Home',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200&auto=format&fit=crop',
    description: 'Minimalist decor, ambient lighting, kitchenware, and luxury linens.',
    productsCount: 2150,
    status: 'Active',
    displayOrder: 5,
    commissionRate: 10,
    subcategories: ['Decor & Lighting', 'Kitchenware & Living', 'Bedding & Linen']
  },
  {
    id: 'cat-6',
    name: 'Appliances',
    slug: 'appliances',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=200&auto=format&fit=crop',
    description: 'Smart air fryers, robotic vacuums, espresso makers, and air purifiers.',
    productsCount: 1420,
    status: 'Active',
    displayOrder: 6,
    commissionRate: 9,
    subcategories: ['Smart Appliances', 'Coffee & Espresso', 'Climate Control']
  },
  {
    id: 'cat-7',
    name: 'Toys & Baby',
    slug: 'toys-baby',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=200&auto=format&fit=crop',
    description: 'Montessori wooden toys, STEM kits, nursery furniture, and baby care.',
    productsCount: 1100,
    status: 'Active',
    displayOrder: 7,
    commissionRate: 11,
    subcategories: ['Montessori & STEM Toys', 'Nursery Gear', 'Strollers & Safety']
  },
  {
    id: 'cat-8',
    name: 'Sports',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&auto=format&fit=crop',
    description: 'Athletic wear, yoga mats, resistance gear, and outdoor equipment.',
    productsCount: 1650,
    status: 'Active',
    displayOrder: 8,
    commissionRate: 10,
    subcategories: ['Athletic & Training', 'Yoga & Pilates', 'Outdoor Gear']
  },
  {
    id: 'cat-9',
    name: 'Furniture',
    slug: 'furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop',
    description: 'Solid ash lounge chairs, ergonomic desks, and modular storage.',
    productsCount: 890,
    status: 'Active',
    displayOrder: 9,
    commissionRate: 12,
    subcategories: ['Lounge & Accent Chairs', 'Work Desks', 'Modular Storage']
  },
  {
    id: 'cat-10',
    name: 'Books',
    slug: 'books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&auto=format&fit=crop',
    description: 'Hardcover art books, architecture monographs, and design philosophy.',
    productsCount: 650,
    status: 'Active',
    displayOrder: 10,
    commissionRate: 7,
    subcategories: ['Design & Art Hardcovers', 'Architecture', 'Business & Tech']
  }
];

export const MOCK_ACTIVITY_LOGS: AdminActivityLog[] = [
  {
    id: 'act-1',
    adminName: 'Alexander Sterling',
    adminRole: 'Super Admin',
    action: 'Approved Vendor Application',
    module: 'Vendors',
    record: 'Aether Atelier & Co. (DRB-VND-8421)',
    timestamp: 'Today, 01:45 PM',
    ipAddress: '103.21.14.88',
    device: 'Chrome 128 / macOS'
  },
  {
    id: 'act-2',
    adminName: 'Ananya Roy',
    adminRole: 'Product Manager',
    action: 'Approved Product Listing',
    module: 'Catalog',
    record: 'Flagship OLED Pro 5G Smartphone',
    timestamp: 'Today, 12:30 PM',
    ipAddress: '103.21.14.92',
    device: 'Chrome 128 / Windows'
  },
  {
    id: 'act-3',
    adminName: 'Rohan Deshmukh',
    adminRole: 'Finance Manager',
    action: 'Processed Instant Vendor Settlement',
    module: 'Payouts',
    record: 'Apex Mobility Tech (₹3,82,352)',
    timestamp: 'Yesterday, 04:10 PM',
    ipAddress: '103.21.14.80',
    device: 'Safari / macOS'
  },
  {
    id: 'act-4',
    adminName: 'Alexander Sterling',
    adminRole: 'Super Admin',
    action: 'Updated Marketplace Commission',
    module: 'Commission',
    record: 'Beauty & Skincare: Set to 12%',
    timestamp: '27 Sep 2026',
    ipAddress: '103.21.14.88',
    device: 'Chrome 128 / macOS'
  },
  {
    id: 'act-5',
    adminName: 'Priyanka Sen',
    adminRole: 'Vendor Manager',
    action: 'Requested KYC Clarification',
    module: 'Verification',
    record: 'Sonic Acoustics India',
    timestamp: '26 Sep 2026',
    ipAddress: '103.21.14.90',
    device: 'Firefox / Linux'
  }
];

export const MOCK_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'New Vendor Application Submitted',
    description: 'Nordic Oak Living submitted KYC documents for onboarding verification.',
    type: 'vendor',
    timestamp: '10 mins ago',
    isRead: false,
    actionUrl: '/admin/vendors/verification'
  },
  {
    id: 'notif-2',
    title: 'Pending Product Approval Queue',
    description: 'Aurora Glow Organics submitted 4 new botanical skincare items for inspection.',
    type: 'product',
    timestamp: '1 hour ago',
    isRead: false,
    actionUrl: '/admin/products/approval'
  },
  {
    id: 'notif-3',
    title: 'High-Value Order Received',
    description: 'Order #DRB-ORD-10246 (₹74,999) paid via Stripe Credit Card.',
    type: 'order',
    timestamp: '3 hours ago',
    isRead: false,
    actionUrl: '/admin/orders'
  },
  {
    id: 'notif-4',
    title: 'Vendor Settlement Payout Due',
    description: 'Payout #DRB-PAY-8801 for ₹1,42,830 to Aether Atelier & Co. pending authorization.',
    type: 'payout',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/admin/payouts'
  },
  {
    id: 'notif-5',
    title: 'Security Compliance Audit Pass',
    description: 'All 486 active vendor GSTIN numbers verified against government API portal.',
    type: 'security',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/admin/activity'
  }
];
