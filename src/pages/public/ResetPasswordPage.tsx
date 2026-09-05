import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { PasswordStrengthIndicator } from '../../components/auth/PasswordStrengthIndicator';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [otpCode, setOtpCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!otpCode.trim() || otpCode.trim().length < 4) {
      newErrors.otp = 'Please enter the 4-digit OTP code received.';
    }

    if (!password) {
      newErrors.password = 'New password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 py-12 sm:py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Top Breadcrumb Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Citizen Sign In</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-7 sm:p-9 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isSuccess ? 'Password Reset Complete' : 'Set New Secure Password'}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              {isSuccess
                ? 'Your password has been successfully updated. You can now log in.'
                : 'Enter the verification OTP and choose a strong new password for your account.'}
            </p>
          </div>

          {!isSuccess ? (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* OTP Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  4-Digit Verification OTP <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 4892"
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value);
                      if (errors.otp) setErrors({ ...errors, otp: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-center text-lg font-mono font-bold tracking-widest rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.otp
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                    }`}
                  />
                </div>
                {errors.otp && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.otp}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
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

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm New Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-mono ${
                      errors.confirmPassword
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="w-9 h-9 absolute right-1 top-1 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Password Strength Meter */}
              <PasswordStrengthIndicator password={password} />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full justify-center shadow-md shadow-blue-600/20 mt-3 cursor-pointer text-sm font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Reset Password & Update
              </Button>
            </form>
          ) : (
            /* Success View */
            <div className="space-y-6 text-center animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  Credentials Updated
                </span>
                <h3 className="text-xl font-bold text-slate-900">Your Password Has Been Reset</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  You can now sign in to the citizen portal using your new credentials.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold">Security Confirmation</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Session tokens have been refreshed across all active devices for your account.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/login')}
                className="w-full justify-center shadow-md shadow-blue-600/20 cursor-pointer text-sm font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Proceed to Citizen Sign In
              </Button>
            </div>
          )}

          {/* Footer Back Link */}
          <div className="pt-3 text-center text-xs text-slate-500 border-t border-slate-100">
            Need additional assistance?{' '}
            <Link to="/help" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">
              Visit Citizen Help Center
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
