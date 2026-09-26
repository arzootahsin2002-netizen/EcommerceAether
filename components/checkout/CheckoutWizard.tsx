'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Plus,
  ArrowRight,
  ArrowLeft,
  Lock,
  QrCode,
  Building2,
  Banknote,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { SavedAddress, Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function CheckoutWizard() {
  const router = useRouter();
  const {
    cart,
    addresses,
    addAddress,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    placeOrder,
    activeCoupon
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Selected Address
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: 'Raghav Kashyap',
    phone: '+91 98765 43210',
    streetAddress: '402, Signature Palms, 12th Main Road',
    apartment: 'Flat 402, Block B',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    country: 'India',
    isDefault: false,
    addressType: 'Home' as const
  });

  // Step 2: Shipping Option
  const [shippingMethod, setShippingMethod] = useState<{
    type: 'Standard' | 'Express';
    cost: number;
    estimatedDelivery: string;
  }>({
    type: 'Express',
    cost: 0,
    estimatedDelivery: 'within 2 business days'
  });

  // Step 3: Payment Method
  const [paymentType, setPaymentType] = useState<
    'Credit/Debit Card' | 'UPI' | 'Net Banking' | 'Cash on Delivery'
  >('UPI');

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8921 0943 8921');
  const [cardName, setCardName] = useState('RAGHAV KASHYAP');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('489');

  // UPI state
  const [upiId, setUpiId] = useState('raghav@okhdfcbank');

  // Order created state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleAddNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addAddress(newAddr);
    setSelectedAddressId(created.id);
    setIsAddingNewAddress(false);
  };

  const handleCompleteOrder = () => {
    if (!selectedAddress) return;

    // Trigger confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }

    const order = placeOrder(
      selectedAddress,
      {
        type: paymentType,
        last4: paymentType === 'Credit/Debit Card' ? cardNumber.slice(-4) : undefined,
        upiId: paymentType === 'UPI' ? upiId : undefined,
        isPaid: paymentType !== 'Cash on Delivery'
      },
      shippingMethod
    );

    setPlacedOrder(order);
  };

  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 sm:p-12 text-center shadow-xl space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-scale">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              ORDER CONFIRMED
            </span>
            <h1 className="text-3xl font-serif font-black text-zinc-950 mt-3">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Your order <strong className="font-mono text-zinc-900">{placedOrder.orderNumber}</strong> has been received and is being prepared with artisanal care.
            </p>
          </div>

          {/* Tracking Timeline */}
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200/80 text-left space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              Live Fulfillment Tracking
            </h4>
            <div className="space-y-3">
              {placedOrder.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      event.completed
                        ? 'bg-zinc-950 text-white'
                        : 'bg-zinc-200 text-zinc-500'
                    }`}
                  >
                    {event.completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-zinc-900">{event.status}</h5>
                    <p className="text-[11px] text-zinc-500">{event.description}</p>
                    <span className="text-[10px] text-zinc-400 font-mono">{event.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Summary */}
          <div className="grid grid-cols-2 gap-4 text-left p-4 bg-zinc-50 rounded-2xl text-xs">
            <div>
              <span className="text-zinc-400 block mb-1">Delivering To:</span>
              <p className="font-bold text-zinc-900">{placedOrder.shippingAddress.fullName}</p>
              <p className="text-zinc-600">{placedOrder.shippingAddress.streetAddress}, {placedOrder.shippingAddress.city}</p>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Payment & Total:</span>
              <p className="font-bold text-zinc-900">{placedOrder.paymentMethod.type}</p>
              <p className="text-sm font-black text-amber-900">{formatPrice(placedOrder.pricing.total)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href={`/account?tab=orders`}
              className="px-6 py-3 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              View Order in Dashboard
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border border-zinc-200 hover:bg-zinc-50 text-zinc-900 rounded-xl text-xs font-bold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Checkout Progress Stepper */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Address', icon: MapPin },
            { num: 2, label: 'Delivery', icon: Truck },
            { num: 3, label: 'Payment', icon: CreditCard },
            { num: 4, label: 'Review', icon: CheckCircle2 }
          ].map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <React.Fragment key={s.num}>
                {idx > 0 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      step > idx ? 'bg-zinc-950' : 'bg-zinc-200'
                    }`}
                  />
                )}
                <div
                  onClick={() => {
                    if (s.num < step) setStep(s.num as any);
                  }}
                  className={`flex flex-col items-center gap-1 cursor-pointer ${
                    isCurrent ? 'opacity-100' : isCompleted ? 'opacity-90' : 'opacity-40'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-zinc-950 text-white shadow-md ring-4 ring-zinc-100'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-900 hidden sm:inline">
                    {s.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step Wizard Container */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h2 className="text-xl font-bold text-zinc-950">Select Delivery Address</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Where would you like your luxury garments delivered?
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                  className="px-3 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-bold text-zinc-900 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> {isAddingNewAddress ? 'Cancel' : 'Add New'}
                </button>
              </div>

              {/* Add New Address Form */}
              {isAddingNewAddress ? (
                <form onSubmit={handleAddNewAddressSubmit} className="space-y-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200 animate-fadeIn">
                  <h3 className="text-xs font-bold text-zinc-900 uppercase">New Address Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={newAddr.fullName}
                        onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">Mobile Number</label>
                      <input
                        type="text"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">Street Address / House No.</label>
                      <input
                        type="text"
                        value={newAddr.streetAddress}
                        onChange={(e) => setNewAddr({ ...newAddr, streetAddress: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">City</label>
                      <input
                        type="text"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">Postal Pincode</label>
                      <input
                        type="text"
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold"
                  >
                    Save & Use This Address
                  </button>
                </form>
              ) : (
                /* Address Cards List */
                <div className="space-y-3">
                  {addresses.map((addr) => {
                    const isSelected = selectedAddressId === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'border-zinc-950 bg-zinc-50/50 shadow-sm'
                            : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-zinc-950">{addr.fullName}</span>
                              <span className="text-[10px] uppercase font-bold bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded">
                                {addr.addressType}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600 mt-1">
                              {addr.streetAddress}, {addr.apartment && `${addr.apartment}, `}
                              {addr.city}, {addr.state} - <strong className="font-mono text-zinc-900">{addr.pincode}</strong>
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5">Phone: {addr.phone}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedAddressId}
                  className="px-8 py-3.5 bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-300 text-white rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  Continue to Delivery Method <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING METHOD */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">Choose Shipping Speed</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Delivering to: <strong className="text-zinc-900">{selectedAddress?.city} ({selectedAddress?.pincode})</strong>
                </p>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() =>
                    setShippingMethod({
                      type: 'Express',
                      cost: 0,
                      estimatedDelivery: 'within 2 business days'
                    })
                  }
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    shippingMethod.type === 'Express'
                      ? 'border-zinc-950 bg-zinc-50/50 shadow-sm'
                      : 'border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-amber-700" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-950">BlueDart Priority Air</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">Estimated delivery: In 2 Days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">FREE</span>
                </div>

                <div
                  onClick={() =>
                    setShippingMethod({
                      type: 'Standard',
                      cost: 0,
                      estimatedDelivery: 'within 4-5 business days'
                    })
                  }
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    shippingMethod.type === 'Standard'
                      ? 'border-zinc-950 bg-zinc-50/50 shadow-sm'
                      : 'border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-zinc-500" />
                    <div>
                      <span className="text-sm font-bold text-zinc-950">Standard Surface</span>
                      <p className="text-xs text-zinc-500">Estimated delivery: In 4-5 Days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-600">FREE</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-zinc-200 text-zinc-700 rounded-2xl text-xs font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Address
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">Select Secure Payment</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  All transactions are 256-bit encrypted with PCI-DSS compliance.
                </p>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                  { id: 'Credit/Debit Card', label: 'Cards', icon: CreditCard },
                  { id: 'Net Banking', label: 'NetBanking', icon: Building2 },
                  { id: 'Cash on Delivery', label: 'COD', icon: Banknote }
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentType === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentType(pm.id as any)}
                      className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSelected
                          ? 'border-zinc-950 bg-zinc-950 text-white shadow-md'
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-bold">{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment details form */}
              {paymentType === 'UPI' && (
                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900">Instant UPI Verification</span>
                    <span className="text-[10px] text-zinc-400">GPay, PhonePe, Paytm, BHIM</span>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 block mb-1">Enter UPI VPA ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-mono font-bold outline-none focus:border-zinc-950"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> A verification request will be dispatched to your UPI app.
                  </div>
                </div>
              )}

              {paymentType === 'Credit/Debit Card' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Visual Card Preview */}
                  <div className="w-full max-w-sm mx-auto h-44 rounded-2xl bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 text-white p-5 shadow-xl flex flex-col justify-between border border-zinc-700">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold tracking-widest uppercase">AETHER PLATINUM</span>
                      <CreditCard className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="font-mono text-base tracking-widest">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between text-[11px] uppercase font-mono">
                      <div>
                        <span className="text-[9px] text-zinc-400 block">CARDHOLDER</span>
                        <span>{cardName || 'YOUR NAME'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 block">EXPIRES</span>
                        <span>{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-2 gap-3 p-5 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <div className="col-span-2">
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="16-digit card number"
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs uppercase"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">Expiry & CVV</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-1/2 px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono"
                        />
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          className="w-1/2 px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentType === 'Cash on Delivery' && (
                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 text-xs space-y-1">
                  <p className="font-bold">Cash on Delivery Available</p>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    Pay via cash or UPI QR scanner upon doorstep parcel arrival.
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-zinc-200 text-zinc-700 rounded-2xl text-xs font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  Review Order <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FINAL REVIEW */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-950">Review & Confirm Order</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Verify your selections before final order placement.
                </p>
              </div>

              {/* Order Items Preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-200 shrink-0">
                        <Image src={item.product.images[0]} alt="" fill unoptimized className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-950">{item.product.name}</h4>
                        <p className="text-zinc-500">
                          {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-zinc-950">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Review summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <span className="font-bold text-zinc-900 block mb-1">Delivering To:</span>
                  <p className="text-zinc-700">{selectedAddress?.fullName}</p>
                  <p className="text-zinc-500">{selectedAddress?.streetAddress}, {selectedAddress?.city} - {selectedAddress?.pincode}</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <span className="font-bold text-zinc-900 block mb-1">Payment Method:</span>
                  <p className="text-zinc-700">{paymentType}</p>
                  <p className="text-zinc-500">Estimated Delivery: {shippingMethod.estimatedDelivery}</p>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border border-zinc-200 text-zinc-700 rounded-2xl text-xs font-bold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Payment
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="px-10 py-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:scale-102 cursor-pointer"
                >
                  <Lock className="w-4 h-4" /> Place Order ({formatPrice(cartTotal)})
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Order Summary Sticky Column */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-zinc-200/80 p-6 space-y-4 shadow-xs sticky top-28">
          <h3 className="text-base font-bold text-zinc-950 pb-2 border-b border-zinc-100">
            Order Total
          </h3>

          <div className="space-y-2 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-zinc-950">{formatPrice(cartSubtotal)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount ({activeCoupon?.code})</span>
                <span>-{formatPrice(cartDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-emerald-700 font-bold">FREE</span>
            </div>
            <div className="pt-2 border-t border-zinc-100 flex justify-between items-baseline font-black text-zinc-950">
              <span className="text-sm">Total Payable</span>
              <span className="text-xl">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl text-[11px] text-zinc-500 space-y-1">
            <p className="flex items-center gap-1 font-semibold text-zinc-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Aether Guarantee
            </p>
            <p>7-day doorstep return if sizing does not fit perfectly.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
