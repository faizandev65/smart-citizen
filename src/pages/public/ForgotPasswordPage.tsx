import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCw,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isSuccess && countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isSuccess, countdown]);

  const validate = () => {
    if (!identifier.trim()) {
      setError('Please enter your registered email address or mobile number.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    const cleaned = identifier.replace(/[\s\-]/g, '');

    const isEmail = emailRegex.test(identifier);
    const isPhone = phoneRegex.test(identifier) || (/^\+?\d+$/.test(cleaned) && cleaned.length >= 10);

    if (!isEmail && !isPhone) {
      setError('Please enter a valid email format or 10-digit mobile number.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setCountdown(60);
      setCanResend(false);
    }, 700);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60);
      setCanResend(false);
    }, 500);
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
              {isSuccess ? 'Verification Code Sent' : 'Reset Your Password'}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              {isSuccess
                ? 'We have sent a secure one-time password (OTP) to your registered contact.'
                : 'Enter your registered email or 10-digit mobile number to receive a secure recovery code.'}
            </p>
          </div>

          {!isSuccess ? (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email or Mobile Number <span className="text-rose-500">*</span>
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
                    placeholder="Enter registered email or mobile number"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (error) setError(null);
                    }}
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      error
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                    }`}
                  />
                </div>
                {error && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </p>
                )}
              </div>

              {/* DEMO NOTICE */}
              <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  <strong>Demo Mode:</strong> Any valid email format or 10-digit number will generate a simulated OTP code on the next step.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                isLoading={isLoading}
                className="w-full justify-center shadow-md shadow-blue-600/20 mt-2 cursor-pointer text-sm font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Send Recovery OTP Code
              </Button>
            </form>
          ) : (
            /* Success State */
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recovery OTP Dispatched!</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  A 4-digit verification code was sent to <strong className="text-emerald-900">{identifier}</strong>.
                </p>
              </div>

              {/* Simulated OTP Code Box */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1.5">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  Simulated Demo OTP
                </span>
                <div className="font-mono text-2xl font-black text-amber-950 tracking-widest">
                  4 8 9 2
                </div>
                <p className="text-[10px] text-amber-700">
                  (Valid for 10 minutes in this demo session)
                </p>
              </div>

              {/* Action to proceed to reset password */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/reset-password')}
                className="w-full justify-center shadow-md shadow-blue-600/20 cursor-pointer text-sm font-bold"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Enter OTP & Set New Password
              </Button>

              {/* Resend Timer */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {canResend ? 'Did not receive code?' : `Resend in ${countdown}s`}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!canResend || isLoading}
                  onClick={handleResend}
                  className={`font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                    canResend
                      ? 'text-blue-600 hover:text-blue-800 hover:underline'
                      : 'text-slate-300 cursor-not-allowed'
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Back Link */}
          <div className="pt-3 text-center text-xs text-slate-500 border-t border-slate-100">
            Remembered your password?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">
              Sign In Here
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
