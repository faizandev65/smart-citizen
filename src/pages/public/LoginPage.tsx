import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  HelpCircle,
  UserCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginCitizen, savedUser } = useAuth();

  const [identifier, setIdentifier] = useState(savedUser ? (savedUser.email || savedUser.phone) : '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [errors, setErrors] = useState<{ identifier?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Client-side validation
  const validateForm = () => {
    const newErrors: { identifier?: string; password?: string } = {};

    if (!identifier.trim()) {
      newErrors.identifier = 'Email or mobile number is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
      const cleaned = identifier.replace(/[\s\-]/g, '');
      const isPhoneLike = /^\+?\d+$/.test(cleaned);

      if (isPhoneLike) {
        if (!phoneRegex.test(identifier) && cleaned.length < 10) {
          newErrors.identifier = 'Please enter a valid 10-digit mobile number.';
        }
      } else if (!emailRegex.test(identifier)) {
        newErrors.identifier = 'Please enter a valid email address.';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    // Establish active session with currently entered user
    loginCitizen(identifier);

    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/citizen/dashboard');
      }, 600);
    }, 500);
  };

  const handleFillDemo = (type: 'saved' | 'general') => {
    if (type === 'saved' && savedUser) {
      setIdentifier(savedUser.email || savedUser.phone);
      setPassword('demo12345');
    } else {
      setIdentifier('citizen.demo@smartcitizen.demo');
      setPassword('demo12345');
    }
    setErrors({});
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 py-10 sm:py-16 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Civic Branding Showcase (Desktop) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle civic pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600/90 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform border border-blue-400/30">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  Smart<span className="text-blue-300">Citizen</span>
                </span>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">
                  Civic Grievance Redressal
                </span>
              </div>
            </Link>

            <div className="space-y-2 pt-2">
              <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                Empowering Citizens, Resolving Issues Faster.
              </h2>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Sign in to monitor real-time progress on your registered civic complaints, schedule municipal services, and receive direct nodal officer updates.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-200 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">48-Hour SLA Redressal</h4>
                  <p className="text-[11px] text-blue-200/80">Guaranteed response timeline with escalation monitoring.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-200 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Verified Photo Proofs</h4>
                  <p className="text-[11px] text-blue-200/80">Before & After photo audit uploaded by municipal field teams.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-200 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Ward Officer Link</h4>
                  <p className="text-[11px] text-blue-200/80">Connect directly with your ward's assigned engineer.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Demo Notice */}
          <div className="relative z-10 pt-6 border-t border-white/10 mt-6 text-[11px] text-blue-200/70 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0" />
            <span>Smart City Academic Capstone Prototype. Client-side simulated workflow.</span>
          </div>

        </div>

        {/* Right Side: Login Form Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Citizen Sign In</h1>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Citizen Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Access your citizen dashboard, view complaint history, and track live status.
              </p>
            </div>

            {/* DEMO NOTICE & Quick Autofill */}
            <div className="p-3.5 bg-amber-50/90 rounded-2xl border border-amber-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>DEMO ONLY: Quick Autofill</span>
                </div>
                <span className="text-[10px] text-amber-700 font-semibold uppercase">No Server Required</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Click below to populate demo credentials or your registered profile:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {savedUser ? (
                  <button
                    type="button"
                    onClick={() => handleFillDemo('saved')}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-[11px] transition-colors cursor-pointer border border-emerald-300 flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Fill Registered User ({savedUser.fullName})</span>
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => handleFillDemo('general')}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300/80 text-amber-950 font-semibold text-[11px] transition-colors cursor-pointer border border-amber-300"
                >
                  Fill Demo Email (citizen.demo@...)
                </button>
              </div>
            </div>

            {/* Success banner if logged in */}
            {loginSuccess && (
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">Authentication verified! Redirecting to Citizen Dashboard...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Identifier (Email / Mobile) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address or Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                    {identifier.includes('@') ? (
                      <Mail className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98765 43210 or user@example.com"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (errors.identifier) setErrors({ ...errors, identifier: undefined });
                    }}
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.identifier
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                    }`}
                  />
                </div>
                {errors.identifier && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.identifier}
                  </p>
                )}
              </div>

              {/* Password with Eye Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-mono ${
                      errors.password
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-9 h-9 absolute right-1 top-1 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Citizen FAQ note */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 font-medium">Keep me signed in</span>
                </label>

                <Link
                  to="/help"
                  className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Citizen Help</span>
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading || loginSuccess}
                isLoading={isLoading}
                className="w-full justify-center shadow-md shadow-blue-600/20 mt-2 cursor-pointer text-sm font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Sign In to Citizen Dashboard
              </Button>
            </form>

            {/* Switch to Registration */}
            <div className="pt-2 text-center text-xs text-slate-600 border-t border-slate-100">
              Don't have a registered citizen account?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">
                Create Free Citizen Account →
              </Link>
            </div>

          </div>

          {/* Bottom Municipal Officer Link */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>Are you a Municipal Field Officer or Nodal Staff?</span>
            <Link
              to="/admin/login"
              className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Officer Desk Login →</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
