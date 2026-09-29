'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, HelpCircle, CheckCircle2, Plus, Store, Package, Ticket, ShieldCheck, User } from 'lucide-react';
import { AdminVendor, AdminProductItem, AdminCoupon, AdminCategory, AdminRole, AdminUser } from '@/lib/admin/types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function BaseModal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className={`relative w-full ${maxWidth} bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden`}>
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <h3 className="text-base font-bold font-serif text-zinc-950">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// 1. REJECT REASON MODAL
interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title?: string;
  itemLabel?: string;
}

export function RejectReasonModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Reject Application / Listing',
  itemLabel = 'this item'
}: RejectReasonModalProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onConfirm(reason.trim());
    setReason('');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Rejection Confirmation</p>
            <p className="text-[11px] text-rose-700 mt-0.5">
              Please provide a specific, actionable reason for rejecting {itemLabel}. This reason will be dispatched to the applicant.
            </p>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-700 block mb-1">
            Reason for Rejection <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="e.g., GSTIN certificate does not match registered business address, or high-res product photos missing..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Confirm Rejection
          </button>
        </div>
      </form>
    </BaseModal>
  );
}

// 2. REQUEST INFO MODAL
interface RequestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
  vendorName?: string;
}

export function RequestInfoModal({ isOpen, onClose, onConfirm, vendorName = 'Vendor' }: RequestInfoModalProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onConfirm(message.trim());
    setMessage('');
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Request Additional Information">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Clarification Notice</p>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Specify what documents or details <strong>{vendorName}</strong> needs to resubmit.
            </p>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-700 block mb-1">
            Required Clarification / Document Instructions <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="e.g., Bank statement branch IFSC does not match branch address. Kindly upload latest cancelled cheque with account number."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            Send Request to Vendor
          </button>
        </div>
      </form>
    </BaseModal>
  );
}

// 3. CONFIRM ACTION MODAL
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isDanger?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  isDanger = false
}: ConfirmModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-xs text-zinc-600 leading-relaxed">{message}</p>
        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs ${
              isDanger
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-zinc-950 hover:bg-zinc-800 text-white'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

// 4. ADD VENDOR MODAL
interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (vendor: Partial<AdminVendor>) => void;
}

export function AddVendorModal({ isOpen, onClose, onAdd }: AddVendorModalProps) {
  const [form, setForm] = useState({
    businessName: '',
    vendorName: '',
    email: '',
    phone: '',
    category: 'Fashion',
    gstin: '',
    pan: '',
    city: 'Bengaluru',
    state: 'Karnataka'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName || !form.email) return;
    onAdd({
      businessName: form.businessName,
      vendorName: form.vendorName || form.businessName,
      email: form.email,
      phone: form.phone || '+91 98765 00000',
      category: form.category,
      gstin: form.gstin || '29AABCB1234A1Z5',
      pan: form.pan || 'AABCB1234A',
      address: {
        street: 'Commercial Hub',
        city: form.city,
        state: form.state,
        pincode: '560001',
        country: 'India'
      }
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Onboard New Vendor Merchant">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Business Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Zenith Studio & Co."
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Owner / Contact Person *</label>
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Khurana"
              value={form.vendorName}
              onChange={(e) => setForm({ ...form, vendorName: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Business Email *</label>
            <input
              type="email"
              required
              placeholder="merchant@brand.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Primary Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            >
              <option value="Fashion">Fashion</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">GSTIN Number</label>
            <input
              type="text"
              placeholder="29AABCB1234D1Z5"
              value={form.gstin}
              onChange={(e) => setForm({ ...form, gstin: e.target.value.toUpperCase() })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium font-mono focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">PAN Card</label>
            <input
              type="text"
              placeholder="AABCB1234D"
              value={form.pan}
              onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium font-mono focus:bg-white outline-none"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs"
          >
            Register & Approve Vendor
          </button>
        </div>
      </form>
    </BaseModal>
  );
}

// 5. ADD PRODUCT MODAL
interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Partial<AdminProductItem>) => void;
  vendors: AdminVendor[];
}

export function AddProductModal({ isOpen, onClose, onAdd, vendors }: AddProductModalProps) {
  const [form, setForm] = useState({
    name: '',
    vendorId: vendors[0]?.id || 'vnd-101',
    category: 'Fashion',
    subcategory: 'Hoodies & Sweatshirts',
    price: 2999,
    originalPrice: 4499,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    const selectedVendor = vendors.find((v) => v.id === form.vendorId) || vendors[0];
    onAdd({
      name: form.name,
      vendorId: form.vendorId,
      vendorName: selectedVendor?.businessName || 'Aether Atelier & Co.',
      category: form.category,
      subcategory: form.subcategory,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      stock: Number(form.stock),
      image: form.image,
      description: form.description
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add New Product to Marketplace">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-zinc-700 block mb-1">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. 500 GSM French Terry Zip Hoodie"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Fulfilling Merchant *</label>
            <select
              value={form.vendorId}
              onChange={(e) => setForm({ ...form, vendorId: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            >
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.businessName} ({v.category})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Department / Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            >
              <option value="Fashion">Fashion</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Selling Price (₹) *</label>
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">MRP Price (₹)</label>
            <input
              type="number"
              value={form.originalPrice}
              onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 block mb-1">Inventory Units *</label>
            <input
              type="number"
              required
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-700 block mb-1">Image URL</label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
          />
        </div>

        <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-black rounded-xl hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold shadow-xs"
          >
            Publish Product
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
