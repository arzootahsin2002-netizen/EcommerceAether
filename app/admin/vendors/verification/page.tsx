'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Building2,
  CreditCard,
  MapPin,
  Mail,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { useAdmin } from '@/lib/admin/adminStore';
import { AdminVendor } from '@/lib/admin/types';
import { RejectReasonModal, RequestInfoModal } from '@/components/admin/ui/Modals';

export default function VendorVerificationPage() {
  const { vendors, approveVendor, rejectVendor, requestVendorInfo } = useAdmin();

  // Selected vendor for active verification audit
  const [selectedVendorId, setSelectedVendorId] = useState<string>(
    vendors.find((v) => v.verificationStatus !== 'Approved')?.id || vendors[0]?.id
  );

  const [rejectingVendorId, setRejectingVendorId] = useState<string | null>(null);
  const [requestInfoVendorId, setRequestInfoVendorId] = useState<string | null>(null);

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId) || vendors[0];

  const verificationQueue = vendors.filter((v) => v.verificationStatus !== 'Approved');

  const steps = [
    { step: 1, label: 'Application Submitted', completed: true },
    { step: 2, label: 'Documents Uploaded', completed: true },
    { step: 3, label: 'Under Review', completed: selectedVendor?.verificationStatus !== 'Rejected' },
    { step: 4, label: 'Admin Verification', completed: selectedVendor?.verificationStatus === 'Approved' },
    { step: 5, label: selectedVendor?.verificationStatus === 'Rejected' ? 'Application Rejected' : 'Approved & Live', completed: selectedVendor?.verificationStatus === 'Approved' }
  ];

  return (
    <AdminLayout
      title="Vendor KYC & Verification"
      subtitle="Audit merchant business credentials, GSTIN tax records, and bank authorization."
      actions={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/vendors"
            className="px-3.5 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ← Back to Vendors
          </Link>
        </div>
      }
    >
      {/* 5-Step Workflow Visual Progress Meter */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            5-Stage KYC Audit Workflow
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {verificationQueue.length} Pending Applications in Queue
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center">
          {steps.map((st, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                st.completed
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                  : 'bg-zinc-50 text-zinc-400 border-zinc-200'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${st.completed ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-200 text-zinc-600'}`}>
                  {st.step}
                </span>
                <span>Stage {st.step}</span>
              </div>
              <span className="text-[11px] font-medium truncate max-w-full">{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Pending Verification Applications List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-zinc-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              Merchant Applications ({vendors.length})
            </h3>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {vendors.map((v) => {
              const isSelected = v.id === selectedVendor?.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVendorId(v.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                      : 'bg-zinc-50/70 hover:bg-zinc-100 border-zinc-200 text-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-zinc-200 shrink-0">
                      <Image src={v.logo} alt="" fill unoptimized className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                        {v.businessName}
                      </h4>
                      <p className={`text-[11px] truncate ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {v.vendorName} • {v.category}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={v.verificationStatus} size="sm" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Vendor Detail Inspection & Approval Workspace */}
        {selectedVendor && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs space-y-6">
            
            {/* Header with quick action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200 shadow-xs">
                  <Image src={selectedVendor.logo} alt="" fill unoptimized className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-serif text-zinc-950">{selectedVendor.businessName}</h2>
                    <StatusBadge status={selectedVendor.verificationStatus} />
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    ID: <span className="font-mono font-bold text-zinc-800">{selectedVendor.vendorId}</span> • Submitted: {selectedVendor.submittedAt}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setRequestInfoVendorId(selectedVendor.id)}
                  className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Request Info</span>
                </button>

                <button
                  onClick={() => setRejectingVendorId(selectedVendor.id)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Reject</span>
                </button>

                <button
                  onClick={() => approveVendor(selectedVendor.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Vendor</span>
                </button>
              </div>
            </div>

            {/* Rejection notice if rejected */}
            {selectedVendor.rejectionReason && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                <strong>Rejection Reason / Clarification Notice:</strong> {selectedVendor.rejectionReason}
              </div>
            )}

            {/* Business & Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Business Details */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Business Registration & Tax Details</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Legal Name:</span>
                    <strong className="text-zinc-800">{selectedVendor.businessName}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Department:</span>
                    <strong className="text-zinc-800">{selectedVendor.category}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">GSTIN Number:</span>
                    <strong className="font-mono text-zinc-950 font-bold">{selectedVendor.gstin}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[11px] block">Company PAN:</span>
                    <strong className="font-mono text-zinc-950 font-bold">{selectedVendor.pan}</strong>
                  </div>
                </div>
              </div>

              {/* Owner & Contact */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Primary Contact & Address</span>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-zinc-800">
                    <strong className="text-zinc-950">{selectedVendor.vendorName}</strong> (Authorized Signatory)
                  </p>
                  <p className="text-zinc-600 text-[11px]">{selectedVendor.email} • {selectedVendor.phone}</p>
                  <p className="text-zinc-500 text-[11px] pt-1">
                    {selectedVendor.address.street}, {selectedVendor.address.city}, {selectedVendor.address.state} - {selectedVendor.address.pincode}
                  </p>
                </div>
              </div>

            </div>

            {/* Bank Account Verification Details */}
            <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 border-b border-zinc-200/60 pb-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Verified Settlement Bank Account</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-zinc-400 text-[11px] block">Bank Name:</span>
                  <strong className="text-zinc-800">{selectedVendor.bankDetails.bankName}</strong>
                </div>
                <div>
                  <span className="text-zinc-400 text-[11px] block">Account Holder:</span>
                  <strong className="text-zinc-800">{selectedVendor.bankDetails.accountName}</strong>
                </div>
                <div>
                  <span className="text-zinc-400 text-[11px] block">Account Number:</span>
                  <strong className="font-mono text-zinc-950 font-bold">{selectedVendor.bankDetails.accountNumber}</strong>
                </div>
                <div>
                  <span className="text-zinc-400 text-[11px] block">IFSC Code:</span>
                  <strong className="font-mono text-zinc-950 font-bold">{selectedVendor.bankDetails.ifscCode}</strong>
                </div>
              </div>
            </div>

            {/* Uploaded Documents Inspection Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Uploaded KYC Compliance Documents ({selectedVendor.documents.length})
              </h4>

              {selectedVendor.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedVendor.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-xl border border-zinc-200 bg-white flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-zinc-900 truncate">{doc.type}</p>
                          <p className="text-[11px] font-mono text-zinc-500">{doc.documentNumber}</p>
                          <span className="text-[10px] text-zinc-400">Uploaded {doc.uploadedAt}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <StatusBadge status={doc.status} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-zinc-400 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                  Standard digital onboarding credentials verified via GST API lookup.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* Modals */}
      <RejectReasonModal
        isOpen={!!rejectingVendorId}
        onClose={() => setRejectingVendorId(null)}
        onConfirm={(reason) => {
          if (rejectingVendorId) {
            rejectVendor(rejectingVendorId, reason);
            setRejectingVendorId(null);
          }
        }}
        title="Reject Vendor KYC Application"
        itemLabel={selectedVendor?.businessName}
      />

      <RequestInfoModal
        isOpen={!!requestInfoVendorId}
        onClose={() => setRequestInfoVendorId(null)}
        onConfirm={(message) => {
          if (requestInfoVendorId) {
            requestVendorInfo(requestInfoVendorId, message);
            setRequestInfoVendorId(null);
          }
        }}
        vendorName={selectedVendor?.businessName}
      />
    </AdminLayout>
  );
}
