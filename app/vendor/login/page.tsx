'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Store,
  Lock,
  Mail,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Building2,
  TrendingUp,
  CreditCard,
  Package,
  Eye,
  EyeOff
} from 'lucide-react';

export default function VendorLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('merchant@aether.store');
  const [password, setPassword] = useState('vendor123');
  const [phone, setPhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      // Store simulated vendor session
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'aether_vendor_session',
          JSON.stringify({
            storeName: 'Aether Atelier & Co.',
            ownerName: 'Raghav Kashyap',
            email: email,
            role: 'vendor',
            kycStatus: 'Approved'
          })
        );
      }
      router.push('/vendor/dashboard');
    }, 800);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setError('');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6 && otpCode !== '123456') {
      setError('Please enter the 6-digit OTP sent to your phone (Demo: 123456).');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'aether_vendor_session',
          JSON.stringify({
            storeName: 'Aether Atelier & Co.',
            ownerName: 'Raghav Kashyap',
            phone: phone,
            role: 'vendor',
            kycStatus: 'Approved'
          })
        );
      }
      router.push('/vendor/dashboard');
    }, 800);
  };

  const handleFillDemo = () => {
    setEmail('merchant@aether.store');
    setPassword('vendor123');
    setPhone('9876543210');
    setError('');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 bg-amber-400 text-zinc-950 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
            Æ
          </div>
          <span className="font-serif font-black text-2xl tracking-tight text-white">
            AETHER <span className="text-amber-400 text-sm font-sans font-extrabold uppercase ml-1 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">Vendor Hub</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
          Merchant Seller Portal
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
          Manage your luxury catalog, fulfill customer orders, and track payouts.
        </p>
      </div>

      {/* Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Method Tabs */}
          <div className="grid grid-cols-2 p-1 bg-zinc-950 rounded-2xl border border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('password');
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                loginMethod === 'password'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('otp');
                setError('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                loginMethod === 'otp'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Mobile OTP Login
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs">
              {error}
            </div>
          )}

          {/* Form 1: Password Login */}
          {loginMethod === 'password' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Registered Business Email</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="merchant@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs font-medium text-white placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                  />
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-zinc-300">Security Password</label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset instructions sent to your registered email.')}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs font-medium text-white placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                  />
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                {isLoading ? (
                  <span>Authenticating Merchant...</span>
                ) : (
                  <>
                    <span>Enter Vendor Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Form 2: Mobile OTP Login */}
          {loginMethod === 'otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Registered Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs font-medium text-white placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all font-mono"
                      />
                      <Smartphone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    {isLoading ? <span>Sending Code...</span> : <span>Send 6-Digit OTP</span>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-center">
                    <p className="text-[11px] text-zinc-400">OTP sent to +91 {phone}</p>
                    <p className="text-[10px] text-amber-400 mt-0.5">Demo OTP: <strong>123456</strong></p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Enter 6-Digit Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-4 py-2.5 text-center tracking-[0.5em] bg-zinc-950/80 border border-zinc-800 rounded-xl text-sm font-mono text-amber-400 font-bold outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    {isLoading ? <span>Verifying OTP...</span> : <span>Verify & Enter Portal</span>}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Demo Auto-Fill Banner */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-400 text-[11px]">Testing demo merchant?</span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-amber-400 hover:text-amber-300 font-bold text-[11px] flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Auto-Fill Credentials
            </button>
          </div>

          {/* Registration Trigger */}
          <div className="text-center pt-2">
            <p className="text-xs text-zinc-400">
              New brand or merchant?{' '}
              <Link href="/vendor/register" className="text-amber-400 hover:text-amber-300 font-bold underline ml-1">
                Register Store & Onboard
              </Link>
            </p>
          </div>

        </div>

        {/* Security / Trust footer badges */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[10px] text-zinc-500 font-medium">
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> GST Verified
          </div>
          <div className="flex items-center justify-center gap-1">
            <CreditCard className="w-3.5 h-3.5 text-amber-500" /> Daily Settlements
          </div>
          <div className="flex items-center justify-center gap-1">
            <Package className="w-3.5 h-3.5 text-blue-500" /> Pan-India Logistics
          </div>
        </div>

      </div>

    </div>
  );
}
