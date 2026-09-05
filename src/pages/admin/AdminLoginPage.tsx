import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Building2,
  CheckCircle2,
  ShieldAlert,
  Info,
  X,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const [errors, setErrors] = useState<{ adminId?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validate = () => {
    const newErrors: { adminId?: string; password?: string; general?: string } = {};

    if (!adminId.trim()) {
      newErrors.adminId = 'Admin ID or official email is required.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      const result = loginAdmin(adminId, password);

      if (result.success) {
        setIsLoading(false);
        setLoginSuccess(true);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 500);
      } else {
        setIsLoading(false);
        setErrors({ general: result.error || 'Invalid Admin ID or password. Please check your credentials.' });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 sm:py-20 px-4 flex items-center justify-center text-slate-100 font-sans">
      <div className="max-w-md w-full space-y-7">
        
        {/* Header */}
        <div className="text-center space-y-2.5">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform border border-indigo-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="font-extrabold text-2xl tracking-tight text-white block">
                Admin<span className="text-indigo-400">Portal</span>
              </span>
              <span className="text-[10px] text-indigo-300 uppercase tracking-widest font-semibold block">
                Academic Project Administration
              </span>
            </div>
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-2">
            Project Administrator Command Desk
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Restricted administrator portal for grievance triage, service dispatch control, and academic demonstration management.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-7 sm:p-8 shadow-2xl space-y-5">
          
          {/* Invalid Credentials General Error */}
          {errors.general && (
            <div className="p-3.5 bg-rose-950/80 rounded-2xl border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-300">Authentication Failed</p>
                <p className="text-[11px] text-rose-200/90 mt-0.5">{errors.general}</p>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {loginSuccess && (
            <div className="p-3.5 bg-emerald-950/80 rounded-2xl border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">Project Administrator authenticated! Launching Command Center...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Admin ID / Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin ID or Official Email <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter Admin ID or official email"
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    if (errors.adminId || errors.general) {
                      setErrors({ ...errors, adminId: undefined, general: undefined });
                    }
                  }}
                  className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.adminId || errors.general
                      ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-950/20'
                      : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                  }`}
                />
              </div>
              {errors.adminId && (
                <p className="text-[11px] text-rose-400 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.adminId}
                </p>
              )}
            </div>

            {/* Password with Eye Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Admin Password <span className="text-indigo-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password || errors.general) {
                      setErrors({ ...errors, password: undefined, general: undefined });
                    }
                  }}
                  className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all font-mono ${
                    errors.password || errors.general
                      ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-950/20'
                      : 'border-slate-700 focus:ring-indigo-500/30 focus:border-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-9 h-9 absolute right-1 top-1 flex items-center justify-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-400 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading || loginSuccess}
              isLoading={isLoading}
              className="w-full justify-center bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 mt-3 cursor-pointer text-sm font-bold text-white border border-indigo-400/30"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Sign In to Command Center
            </Button>
          </form>

          {/* Citizen Switch Link */}
          <div className="pt-3 text-center text-xs text-slate-400 border-t border-slate-800">
            Resident Citizen looking to file or track complaints?{' '}
            <Link to="/login" className="font-bold text-blue-400 hover:text-blue-300 hover:underline">
              Go to Citizen Portal →
            </Link>
          </div>

        </div>

        {/* Security Notice */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>SmartCitizen Academic Major Project &bull; Protected Administrator Portal</span>
          </p>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Administrator Account Notice</h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Administrative security protocols and credential access for this academic demonstration project are managed internally.
              </p>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">Project Support:</strong> admin@smartcitizen.demo</p>
              <p><strong className="text-slate-200">Environment:</strong> SmartCitizen Academic Demonstration</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowForgotModal(false)}
              className="w-full justify-center border-slate-700 text-slate-200 hover:bg-slate-800"
            >
              Close Notice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
