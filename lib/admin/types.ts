export type AdminRole = 
  | 'Super Admin'
  | 'Admin'
  | 'Vendor Manager'
  | 'Product Manager'
  | 'Order Manager'
  | 'Finance Manager'
  | 'Support Manager'
  | 'Content Manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: AdminRole;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  createdDate: string;
  permissions: string[];
}

export type VendorVerificationStatus = 'Approved' | 'Pending' | 'Under Review' | 'Rejected' | 'More Info Required';
export type VendorAccountStatus = 'Active' | 'Pending' | 'Suspended' | 'Blocked';

export interface VendorDocument {
  id: string;
  type: 'Government ID / PAN' | 'Business Registration / Certificate' | 'GSTIN Certificate' | 'Cancelled Cheque / Bank Statement' | 'Address Proof';
  documentNumber: string;
  fileUrl: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  uploadedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
}

export interface AdminVendor {
  id: string;
  vendorId: string;
  logo: string;
  bannerImage?: string;
  vendorName: string;
  businessName: string;
  email: string;
  phone: string;
  category: string;
  gstin: string;
  pan: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branch: string;
  };
  productsCount: number;
  ordersCount: number;
  totalRevenue: number;
  commissionRate: number;
  availablePayout: number;
  pendingPayout: number;
  rating: number;
  verificationStatus: VendorVerificationStatus;
  status: VendorAccountStatus;
  documents: VendorDocument[];
  submittedAt: string;
  approvedAt?: string;
  rejectionReason?: string;
}

export interface AdminCustomer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  registrationDate: string;
  ordersCount: number;
  totalSpent: number;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  status: 'Active' | 'Blocked' | 'Suspended';
  lastActive: string;
  loyaltyTier: 'Regular' | 'Silver' | 'Gold' | 'VIP Diamond';
  walletBalance: number;
}

export interface AdminProductItem {
  id: string;
  name: string;
  sku: string;
  image: string;
  vendorId: string;
  vendorName: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  stock: number;
  rating: number;
  approvalStatus: 'Approved' | 'Pending Approval' | 'Rejected' | 'Changes Requested';
  status: 'Active' | 'Inactive' | 'Out of Stock';
  dateAdded: string;
  description: string;
  rejectionReason?: string;
}

export interface AdminOrderRecord {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vendorId: string;
  vendorName: string;
  itemsCount: number;
  totalAmount: number;
  platformCommission: number;
  vendorPayout: number;
  paymentMethod: 'UPI / Google Pay' | 'Credit / Debit Card' | 'NetBanking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned' | 'Refunded';
  date: string;
  shippingAddress: string;
  carrier: string;
  trackingNumber: string;
  timeline: {
    status: string;
    date: string;
    completed: boolean;
  }[];
}

export interface AdminReturnRecord {
  id: string;
  returnId: string;
  orderNumber: string;
  customerName: string;
  vendorName: string;
  productName: string;
  productImage: string;
  reason: string;
  amount: number;
  date: string;
  status: 'Requested' | 'Approved' | 'Pickup Scheduled' | 'Inspecting' | 'Completed' | 'Rejected';
  rejectionReason?: string;
}

export interface AdminRefundRecord {
  id: string;
  refundId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  reason: string;
  paymentMethod: string;
  date: string;
  status: 'Requested' | 'Approved' | 'Processing' | 'Completed' | 'Rejected';
  arnNumber?: string;
}

export interface AdminTransactionRecord {
  id: string;
  transactionId: string;
  orderNumber: string;
  customerName: string;
  vendorName: string;
  amount: number;
  method: string;
  date: string;
  status: 'Successful' | 'Pending' | 'Failed' | 'Refunded' | 'Partially Refunded';
}

export interface AdminPayoutRecord {
  id: string;
  payoutId: string;
  vendorId: string;
  vendorName: string;
  grossSales: number;
  commission: number;
  refundsDeducted: number;
  payableAmount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'On Hold';
  date: string;
  utrNumber?: string;
  bankAccount: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  title: string;
  discountType: 'Percentage' | 'Flat Amount';
  value: number;
  minimumOrder: number;
  maximumDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  applicableVendors: string[];
  applicableCategories: string[];
  status: 'Active' | 'Expired' | 'Disabled';
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  parentCategory?: string;
  productsCount: number;
  status: 'Active' | 'Disabled';
  displayOrder: number;
  commissionRate: number;
  subcategories: string[];
}

export interface AdminActivityLog {
  id: string;
  adminName: string;
  adminRole: string;
  action: string;
  module: string;
  record: string;
  timestamp: string;
  ipAddress: string;
  device: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  type: 'vendor' | 'order' | 'product' | 'refund' | 'payout' | 'security';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}
