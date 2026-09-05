import React, { useState, useEffect } from 'react';
import {
  User,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  FileBadge
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const [role, setRole] = useState<'citizen' | 'officer'>('citizen');
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [officerId, setOfficerId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setIsSuccess(false);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        role === 'citizen'
          ? (mode === 'login' ? 'Citizen Sign In' : 'Citizen Registration')
          : 'Municipal Nodal Officer Login'
      }
      subtitle={
        role === 'citizen'
          ? 'Access your submitted complaints, resolution history & ward notifications'
          : 'Restricted access for authorized municipal field officers and zonal commissioners'
      }
      maxWidth="md"
    >
      <div className="space-y-6">
        
        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('citizen')}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'citizen'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Citizen Portal</span>
          </button>

          <button
            type="button"
            onClick={() => { setRole('officer'); setMode('login'); }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'officer'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Gov / Officer Desk</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              {mode === 'login' ? 'Authentication Successful' : 'Account Registered Successfully'}
            </h4>
            <p className="text-xs text-slate-500">
              {role === 'citizen' ? 'Redirecting to your citizen dashboard...' : 'Redirecting to Municipal Command Dashboard...'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {role === 'citizen' && mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Legal Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {role === 'officer' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Municipal Officer ID / Badge No. *</label>
                <div className="relative">
                  <FileBadge className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. MCO-2026-W14"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {role === 'citizen' ? 'Mobile Number / Email *' : 'Official Gov Email *'}
              </label>
              <div className="relative">
                {role === 'citizen' ? (
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                ) : (
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                )}
                <input
                  type={role === 'citizen' ? 'text' : 'email'}
                  required
                  placeholder={role === 'citizen' ? 'e.g. +91 98765 43210' : 'officer@smartcitizen.demo'}
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  {role === 'citizen' && mode === 'login' ? 'Password / OTP *' : 'Password *'}
                </label>
                {mode === 'login' && (
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Reset OTP sent via SMS to verified mobile number.'); }} className="text-[11px] font-bold text-blue-600 hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center mt-2 shadow-blue-600/20"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {mode === 'login' ? 'Sign In to Portal' : 'Create Free Citizen Account'}
            </Button>

            {role === 'citizen' && (
              <div className="pt-2 text-center text-xs text-slate-600 border-t border-slate-100">
                {mode === 'login' ? (
                  <p>
                    New citizen?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('register')}
                      className="font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Register here
                    </button>
                  </p>
                ) : (
                  <p>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            )}

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Protected by Two-Factor Authentication & Municipal Privacy Shield</span>
            </div>

          </form>
        )}

      </div>
    </Modal>
  );
};
