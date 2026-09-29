'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AdminUser,
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
  AdminNotification
} from './types';
import {
  INITIAL_ADMIN_USER,
  MOCK_ADMIN_USERS,
  MOCK_VENDORS,
  MOCK_CUSTOMERS,
  MOCK_ADMIN_PRODUCTS,
  MOCK_ORDERS,
  MOCK_RETURNS,
  MOCK_REFUNDS,
  MOCK_TRANSACTIONS,
  MOCK_PAYOUTS,
  MOCK_COUPONS,
  MOCK_CATEGORIES,
  MOCK_ACTIVITY_LOGS,
  MOCK_NOTIFICATIONS
} from './mockData';

interface AdminContextType {
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  
  // Vendors
  vendors: AdminVendor[];
  approveVendor: (vendorId: string) => void;
  rejectVendor: (vendorId: string, reason: string) => void;
  requestVendorInfo: (vendorId: string, message: string) => void;
  suspendVendor: (vendorId: string) => void;
  addVendor: (vendor: Partial<AdminVendor>) => void;
  
  // Customers
  customers: AdminCustomer[];
  blockCustomer: (userId: string) => void;
  unblockCustomer: (userId: string) => void;
  verifyCustomer: (userId: string) => void;
  
  // Products
  products: AdminProductItem[];
  approveProduct: (prodId: string) => void;
  rejectProduct: (prodId: string, reason: string) => void;
  requestProductChanges: (prodId: string, reason: string) => void;
  addProduct: (prod: Partial<AdminProductItem>) => void;
  deleteProduct: (prodId: string) => void;
  toggleProductStatus: (prodId: string) => void;
  
  // Orders, Returns & Refunds
  orders: AdminOrderRecord[];
  updateOrderStatus: (orderId: string, status: AdminOrderRecord['orderStatus']) => void;
  returns: AdminReturnRecord[];
  approveReturn: (returnId: string) => void;
  rejectReturn: (returnId: string, reason: string) => void;
  refunds: AdminRefundRecord[];
  processRefund: (refundId: string) => void;
  
  // Finance & Payouts
  transactions: AdminTransactionRecord[];
  payouts: AdminPayoutRecord[];
  processPayout: (payoutId: string, utr: string) => void;
  commissionRates: Record<string, number>;
  updateCommissionRate: (categoryOrGlobal: string, rate: number) => void;
  
  // Coupons
  coupons: AdminCoupon[];
  addCoupon: (coupon: AdminCoupon) => void;
  toggleCouponStatus: (code: string) => void;
  deleteCoupon: (code: string) => void;
  
  // Categories
  categories: AdminCategory[];
  addCategory: (category: AdminCategory) => void;
  updateCategory: (id: string, updated: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;
  
  // Activity & Notifications
  activityLogs: AdminActivityLog[];
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  logActivity: (action: string, module: string, record: string) => void;
  
  // Admin Staff
  adminStaff: AdminUser[];
  addAdminStaff: (staff: AdminUser) => void;
  updateAdminStaffStatus: (id: string, status: 'Active' | 'Inactive' | 'Suspended') => void;

  // Global Multi-Entity Search
  globalSearchResults: (query: string) => {
    products: AdminProductItem[];
    vendors: AdminVendor[];
    customers: AdminCustomer[];
    orders: AdminOrderRecord[];
    categories: AdminCategory[];
  };

  // Toast System
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  toast: { title: string; message: string; type: 'success' | 'error' | 'info' } | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [adminUser, setAdminUser] = useState<AdminUser | null>(INITIAL_ADMIN_USER);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true);
  
  const [vendors, setVendors] = useState<AdminVendor[]>(MOCK_VENDORS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(MOCK_CUSTOMERS);
  const [products, setProducts] = useState<AdminProductItem[]>(MOCK_ADMIN_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrderRecord[]>(MOCK_ORDERS);
  const [returns, setReturns] = useState<AdminReturnRecord[]>(MOCK_RETURNS);
  const [refunds, setRefunds] = useState<AdminRefundRecord[]>(MOCK_REFUNDS);
  const [transactions, setTransactions] = useState<AdminTransactionRecord[]>(MOCK_TRANSACTIONS);
  const [payouts, setPayouts] = useState<AdminPayoutRecord[]>(MOCK_PAYOUTS);
  const [coupons, setCoupons] = useState<AdminCoupon[]>(MOCK_COUPONS);
  const [categories, setCategories] = useState<AdminCategory[]>(MOCK_CATEGORIES);
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(MOCK_ACTIVITY_LOGS);
  const [notifications, setNotifications] = useState<AdminNotification[]>(MOCK_NOTIFICATIONS);
  const [adminStaff, setAdminStaff] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [commissionRates, setCommissionRates] = useState<Record<string, number>>({
    Global: 10,
    Fashion: 10,
    Mobiles: 8,
    Electronics: 8,
    Beauty: 12,
    Home: 10,
    Appliances: 9,
    'Toys & Baby': 11,
    Sports: 10,
    Furniture: 12,
    Books: 7
  });

  const [toast, setToast] = useState<{ title: string; message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Restore session from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dribo_admin_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setAdminUser(parsed);
          setIsAdminLoggedIn(true);
        } catch (e) {
          // fallback
        }
      }
    }
  }, []);

  const logActivity = (action: string, module: string, record: string) => {
    const newLog: AdminActivityLog = {
      id: `act-${Date.now()}`,
      adminName: adminUser?.name || 'Alexander Sterling',
      adminRole: adminUser?.role || 'Super Admin',
      action,
      module,
      record,
      timestamp: 'Just now',
      ipAddress: '103.21.14.88',
      device: 'Chrome 128 / macOS'
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    if (email && pass) {
      const user = MOCK_ADMIN_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || INITIAL_ADMIN_USER;
      setAdminUser(user);
      setIsAdminLoggedIn(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('dribo_admin_session', JSON.stringify(user));
      }
      logActivity('Admin Session Started', 'Authentication', `${user.name} (${user.role})`);
      showToast('Welcome Back', `Logged in as ${user.name} (${user.role})`, 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dribo_admin_session');
    }
    logActivity('Admin Logged Out', 'Authentication', adminUser?.name || 'Admin');
    setAdminUser(null);
    setIsAdminLoggedIn(false);
    router.push('/admin/login');
  };

  // Vendor actions
  const approveVendor = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId || v.vendorId === vendorId
          ? { ...v, verificationStatus: 'Approved', status: 'Active', approvedAt: 'Today' }
          : v
      )
    );
    const target = vendors.find((v) => v.id === vendorId || v.vendorId === vendorId);
    logActivity('Approved Vendor Application', 'Vendors', target ? target.businessName : vendorId);
    showToast('Vendor Approved', `${target?.businessName || 'Vendor'} is now active on the marketplace.`, 'success');
  };

  const rejectVendor = (vendorId: string, reason: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId || v.vendorId === vendorId
          ? { ...v, verificationStatus: 'Rejected', status: 'Blocked', rejectionReason: reason }
          : v
      )
    );
    const target = vendors.find((v) => v.id === vendorId || v.vendorId === vendorId);
    logActivity('Rejected Vendor Application', 'Vendors', `${target?.businessName || vendorId}: ${reason}`);
    showToast('Vendor Application Rejected', `Reason recorded and notification dispatched.`, 'error');
  };

  const requestVendorInfo = (vendorId: string, message: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId || v.vendorId === vendorId
          ? { ...v, verificationStatus: 'More Info Required', rejectionReason: message }
          : v
      )
    );
    const target = vendors.find((v) => v.id === vendorId || v.vendorId === vendorId);
    logActivity('Requested Information from Vendor', 'Vendors', `${target?.businessName}: ${message}`);
    showToast('Clarification Sent', `Vendor has been requested to submit required information.`, 'info');
  };

  const suspendVendor = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId || v.vendorId === vendorId
          ? { ...v, status: v.status === 'Suspended' ? 'Active' : 'Suspended' }
          : v
      )
    );
    const target = vendors.find((v) => v.id === vendorId || v.vendorId === vendorId);
    const newStatus = target?.status === 'Suspended' ? 'Active' : 'Suspended';
    logActivity(`Changed Vendor Status to ${newStatus}`, 'Vendors', target?.businessName || vendorId);
    showToast('Vendor Status Updated', `${target?.businessName} is now ${newStatus}.`, 'info');
  };

  const addVendor = (vendor: Partial<AdminVendor>) => {
    const newV: AdminVendor = {
      id: `vnd-${Date.now()}`,
      vendorId: `DRB-VND-${Math.floor(1000 + Math.random() * 9000)}`,
      logo: vendor.logo || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop',
      vendorName: vendor.vendorName || 'New Merchant',
      businessName: vendor.businessName || 'Merchant Enterprise',
      email: vendor.email || 'merchant@dribo.market',
      phone: vendor.phone || '+91 98765 00000',
      category: vendor.category || 'Fashion',
      gstin: vendor.gstin || '29AABCB0000A1Z0',
      pan: vendor.pan || 'AABCB0000A',
      address: vendor.address || {
        street: 'Commercial Zone',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      },
      bankDetails: vendor.bankDetails || {
        accountName: vendor.businessName || 'Merchant Enterprise',
        accountNumber: '9988221100',
        ifscCode: 'HDFC0001001',
        bankName: 'HDFC Bank',
        branch: 'Fort Mumbai'
      },
      productsCount: 0,
      ordersCount: 0,
      totalRevenue: 0,
      commissionRate: 10,
      availablePayout: 0,
      pendingPayout: 0,
      rating: 5.0,
      verificationStatus: 'Approved',
      status: 'Active',
      documents: [],
      submittedAt: 'Today',
      approvedAt: 'Today'
    };
    setVendors((prev) => [newV, ...prev]);
    logActivity('Manually Onboarded Vendor', 'Vendors', newV.businessName);
    showToast('Vendor Created', `${newV.businessName} has been registered and verified.`, 'success');
  };

  // Customer actions
  const blockCustomer = (userId: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === userId || c.userId === userId ? { ...c, status: 'Blocked' } : c
      )
    );
    const target = customers.find((c) => c.id === userId || c.userId === userId);
    logActivity('Blocked User Account', 'Users', target?.name || userId);
    showToast('User Blocked', `${target?.name || 'User'} has been restricted from placing orders.`, 'error');
  };

  const unblockCustomer = (userId: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === userId || c.userId === userId ? { ...c, status: 'Active' } : c
      )
    );
    const target = customers.find((c) => c.id === userId || c.userId === userId);
    logActivity('Unblocked User Account', 'Users', target?.name || userId);
    showToast('User Activated', `${target?.name || 'User'} account has been restored.`, 'success');
  };

  const verifyCustomer = (userId: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === userId || c.userId === userId ? { ...c, verificationStatus: 'Verified' } : c
      )
    );
    const target = customers.find((c) => c.id === userId || c.userId === userId);
    logActivity('Verified User KYC Identity', 'Users', target?.name || userId);
    showToast('User KYC Verified', `${target?.name} identity confirmed.`, 'success');
  };

  // Product actions
  const approveProduct = (prodId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === prodId ? { ...p, approvalStatus: 'Approved', status: 'Active' } : p
      )
    );
    const target = products.find((p) => p.id === prodId);
    logActivity('Approved Product Listing', 'Catalog', target?.name || prodId);
    showToast('Product Listing Approved', `${target?.name} is now live on the marketplace.`, 'success');
  };

  const rejectProduct = (prodId: string, reason: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === prodId ? { ...p, approvalStatus: 'Rejected', rejectionReason: reason } : p
      )
    );
    const target = products.find((p) => p.id === prodId);
    logActivity('Rejected Product Listing', 'Catalog', `${target?.name}: ${reason}`);
    showToast('Product Rejected', `Rejection reason logged and vendor notified.`, 'error');
  };

  const requestProductChanges = (prodId: string, reason: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === prodId ? { ...p, approvalStatus: 'Changes Requested', rejectionReason: reason } : p
      )
    );
    const target = products.find((p) => p.id === prodId);
    logActivity('Requested Changes on Product', 'Catalog', `${target?.name}: ${reason}`);
    showToast('Change Request Sent', `Vendor instructed to modify listing details.`, 'info');
  };

  const addProduct = (prod: Partial<AdminProductItem>) => {
    const newP: AdminProductItem = {
      id: `prod-${Date.now()}`,
      name: prod.name || 'New Catalog Item',
      sku: prod.sku || `DRB-${Math.floor(1000 + Math.random() * 9000)}`,
      image: prod.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
      vendorId: prod.vendorId || 'vnd-101',
      vendorName: prod.vendorName || 'Aether Atelier & Co.',
      category: prod.category || 'Fashion',
      subcategory: prod.subcategory || 'Hoodies & Sweatshirts',
      price: prod.price || 2999,
      originalPrice: prod.originalPrice || 3999,
      stock: prod.stock || 50,
      rating: 5.0,
      approvalStatus: 'Approved',
      status: 'Active',
      dateAdded: 'Today',
      description: prod.description || 'Verified product listing on DRIBO marketplace.'
    };
    setProducts((prev) => [newP, ...prev]);
    logActivity('Created New Product Listing', 'Catalog', newP.name);
    showToast('Product Added', `${newP.name} added to catalog.`, 'success');
  };

  const deleteProduct = (prodId: string) => {
    const target = products.find((p) => p.id === prodId);
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
    logActivity('Deleted Product from Catalog', 'Catalog', target?.name || prodId);
    showToast('Product Deleted', `Removed listing from marketplace.`, 'info');
  };

  const toggleProductStatus = (prodId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === prodId
          ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
          : p
      )
    );
    const target = products.find((p) => p.id === prodId);
    const newStatus = target?.status === 'Active' ? 'Inactive' : 'Active';
    logActivity(`Toggled Product Status to ${newStatus}`, 'Catalog', target?.name || prodId);
    showToast('Status Updated', `${target?.name} is now ${newStatus}.`, 'info');
  };

  // Order actions
  const updateOrderStatus = (orderId: string, status: AdminOrderRecord['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId || o.orderNumber === orderId ? { ...o, orderStatus: status } : o
      )
    );
    const target = orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    logActivity(`Updated Order Status to ${status}`, 'Orders', target?.orderNumber || orderId);
    showToast('Order Status Updated', `Order ${target?.orderNumber} is marked as ${status}.`, 'success');
  };

  const approveReturn = (returnId: string) => {
    setReturns((prev) =>
      prev.map((r) =>
        r.id === returnId || r.returnId === returnId ? { ...r, status: 'Approved' } : r
      )
    );
    const target = returns.find((r) => r.id === returnId || r.returnId === returnId);
    logActivity('Approved Return Request', 'Returns', target?.returnId || returnId);
    showToast('Return Approved', `Pickup initiated for ${target?.returnId}.`, 'success');
  };

  const rejectReturn = (returnId: string, reason: string) => {
    setReturns((prev) =>
      prev.map((r) =>
        r.id === returnId || r.returnId === returnId ? { ...r, status: 'Rejected', rejectionReason: reason } : r
      )
    );
    const target = returns.find((r) => r.id === returnId || r.returnId === returnId);
    logActivity('Rejected Return Request', 'Returns', `${target?.returnId}: ${reason}`);
    showToast('Return Rejected', `Rejection reason logged.`, 'error');
  };

  const processRefund = (refundId: string) => {
    setRefunds((prev) =>
      prev.map((rf) =>
        rf.id === refundId || rf.refundId === refundId
          ? { ...rf, status: 'Completed', arnNumber: `ARN-${Math.floor(1000000000 + Math.random() * 9000000000)}` }
          : rf
      )
    );
    const target = refunds.find((rf) => rf.id === refundId || rf.refundId === refundId);
    logActivity('Processed Instant Customer Refund', 'Refunds', `${target?.refundId} (₹${target?.amount})`);
    showToast('Refund Completed', `₹${target?.amount} credited back to customer.`, 'success');
  };

  const processPayout = (payoutId: string, utr: string) => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === payoutId || p.payoutId === payoutId
          ? { ...p, status: 'Completed', utrNumber: utr || `IMPS-${Date.now()}` }
          : p
      )
    );
    const target = payouts.find((p) => p.id === payoutId || p.payoutId === payoutId);
    logActivity('Authorized Vendor Bank Settlement', 'Payouts', `${target?.vendorName}: ₹${target?.payableAmount}`);
    showToast('Payout Dispatched', `Settlement transferred to ${target?.vendorName}.`, 'success');
  };

  const updateCommissionRate = (categoryOrGlobal: string, rate: number) => {
    setCommissionRates((prev) => ({ ...prev, [categoryOrGlobal]: rate }));
    logActivity(`Updated Commission Rate for ${categoryOrGlobal}`, 'Commission', `${rate}%`);
    showToast('Commission Rate Updated', `${categoryOrGlobal} rate set to ${rate}%.`, 'success');
  };

  // Coupons
  const addCoupon = (coupon: AdminCoupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    logActivity('Created Promotional Coupon', 'Marketing', coupon.code);
    showToast('Coupon Created', `Code ${coupon.code} is now active.`, 'success');
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.code === code ? { ...c, status: c.status === 'Active' ? 'Disabled' : 'Active' } : c
      )
    );
    const target = coupons.find((c) => c.code === code);
    const newStatus = target?.status === 'Active' ? 'Disabled' : 'Active';
    logActivity(`Toggled Coupon Status to ${newStatus}`, 'Marketing', code);
    showToast('Coupon Status Updated', `${code} is now ${newStatus}.`, 'info');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    logActivity('Deleted Coupon Code', 'Marketing', code);
    showToast('Coupon Deleted', `${code} removed.`, 'info');
  };

  // Categories
  const addCategory = (cat: AdminCategory) => {
    setCategories((prev) => [...prev, cat]);
    logActivity('Added Category to Marketplace', 'Catalog', cat.name);
    showToast('Category Created', `${cat.name} added with ${cat.commissionRate}% commission.`, 'success');
  };

  const updateCategory = (id: string, updated: Partial<AdminCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    logActivity('Updated Category Properties', 'Catalog', updated.name || id);
    showToast('Category Updated', `Changes saved.`, 'success');
  };

  const deleteCategory = (id: string) => {
    const target = categories.find((c) => c.id === id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    logActivity('Deleted Category', 'Catalog', target?.name || id);
    showToast('Category Removed', `${target?.name} deleted.`, 'info');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('Notifications Marked as Read', 'Inbox cleared.', 'info');
  };

  // Admin Staff
  const addAdminStaff = (staff: AdminUser) => {
    setAdminStaff((prev) => [...prev, staff]);
    logActivity('Created Admin User Account', 'System', `${staff.name} (${staff.role})`);
    showToast('Admin User Created', `${staff.name} assigned ${staff.role} role.`, 'success');
  };

  const updateAdminStaffStatus = (id: string, status: 'Active' | 'Inactive' | 'Suspended') => {
    setAdminStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    const target = adminStaff.find((s) => s.id === id);
    logActivity(`Changed Staff Status to ${status}`, 'System', target?.name || id);
    showToast('Staff Status Updated', `${target?.name} is now ${status}.`, 'info');
  };

  // Global Multi-Entity Search
  const globalSearchResults = (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { products: [], vendors: [], customers: [], orders: [], categories: [] };
    }
    return {
      products: products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.vendorName.toLowerCase().includes(q)
      ).slice(0, 4),
      vendors: vendors.filter(
        (v) =>
          v.businessName.toLowerCase().includes(q) ||
          v.vendorName.toLowerCase().includes(q) ||
          v.email.toLowerCase().includes(q) ||
          v.vendorId.toLowerCase().includes(q)
      ).slice(0, 4),
      customers: customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.userId.toLowerCase().includes(q)
      ).slice(0, 4),
      orders: orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.vendorName.toLowerCase().includes(q)
      ).slice(0, 4),
      categories: categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3)
    };
  };

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        isAdminLoggedIn,
        login,
        logout,
        vendors,
        approveVendor,
        rejectVendor,
        requestVendorInfo,
        suspendVendor,
        addVendor,
        customers,
        blockCustomer,
        unblockCustomer,
        verifyCustomer,
        products,
        approveProduct,
        rejectProduct,
        requestProductChanges,
        addProduct,
        deleteProduct,
        toggleProductStatus,
        orders,
        updateOrderStatus,
        returns,
        approveReturn,
        rejectReturn,
        refunds,
        processRefund,
        transactions,
        payouts,
        processPayout,
        commissionRates,
        updateCommissionRate,
        coupons,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        activityLogs,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        logActivity,
        adminStaff,
        addAdminStaff,
        updateAdminStaffStatus,
        globalSearchResults,
        showToast,
        toast
      }}
    >
      {children}

      {/* Floating Admin Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
          <div
            className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 max-w-sm backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-zinc-900/95 text-white border-emerald-500/40'
                : toast.type === 'error'
                ? 'bg-zinc-900/95 text-white border-rose-500/40'
                : 'bg-zinc-900/95 text-white border-blue-500/40'
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                toast.type === 'success'
                  ? 'bg-emerald-400 animate-pulse'
                  : toast.type === 'error'
                  ? 'bg-rose-400 animate-ping'
                  : 'bg-blue-400'
              }`}
            />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-100">{toast.title}</h4>
              <p className="text-xs text-zinc-300 mt-0.5">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
