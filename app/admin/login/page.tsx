'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  Store,
  BarChart3,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AdminProvider, useAdmin } from '@/lib/admin/adminStore';

function AdminLoginInner() {
  const router = useRouter();
  const { login } = useAdmin();

  const [email, setEmail] = useState('admin@aether.market');
  const [password, setPassword] = useState('aether2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!showTwoFactor) {
      // Step 1: Password validation
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowTwoFactor(true);
      }, 500);
      return;
    }

    // Step 2: 2FA validation (simulated code 123456 or empty accepted for demo)
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      const success = await login(email, password);
      if (success) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail('admin@aether.market');
    setPassword('aether2026');
    setTwoFactorCode('123456');
    setError('');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center relative overflow-hidden font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left: AETHER Branding & Enterprise Value Proposition */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Enterprise Multi-Vendor Command Center</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl">
                A
              </div>
              <span className="font-serif font-black text-3xl tracking-tight text-white">
                AETHER
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight leading-tight">
              Manage your marketplace with confidence.
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              Control 480+ verified vendors, 18,000+ customers, product approval queues, instant settlements, and marketplace analytics from one unified console.
            </p>
          </div>

          {/* Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
              <Store className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Vendor KYC & Verification</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">5-step GSTIN & bank account audit workflow.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Real-Time Financial Audits</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Instant payouts, escrow & tiered commissions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Admin Authentication Card */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto">
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="pb-3 border-b border-zinc-800">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
                Admin Authentication
              </span>
              <h2 className="text-xl font-bold font-serif text-white">Sign In to Admin Portal</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Restricted access for authorized marketplace operators only.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {!showTwoFactor ? (
                <>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Administrator Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="admin@aether.market"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-white placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
                      />
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-zinc-300">Security Password</label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to master admin email.')}
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
                        className="w-full pl-10 pr-10 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-white placeholder:text-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
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

                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-amber-500 focus:ring-0 cursor-pointer"
                      />
                      <span>Keep me signed in</span>
                    </label>
                    <span className="text-[11px] text-zinc-500">256-Bit SSL Encrypted</span>
                  </div>
                </>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center">
                    <p className="text-xs font-bold text-amber-300">Two-Factor Authentication (2FA)</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">Enter authenticator app code or demo code: <strong>123456</strong></p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">6-Digit Security Token</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      className="w-full py-2.5 text-center tracking-[0.5em] bg-zinc-950 border border-zinc-800 rounded-xl text-base font-mono font-bold text-amber-400 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>{showTwoFactor ? 'Authorize & Enter Dashboard' : 'Continue to Verification'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Auto-Fill Demo Credentials */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400 text-[11px]">Testing as Super Admin?</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-amber-400 hover:text-amber-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" /> Auto-Fill Demo Login
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default function AdminLoginPage() {
  return <AdminLoginInner />;
}
