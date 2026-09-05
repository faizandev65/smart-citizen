import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const criteria = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Uppercase & lowercase letters', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: 'At least 1 number (0-9)', met: /[0-9]/.test(password) },
    { label: 'At least 1 symbol (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(password) }
  ];

  const score = criteria.filter((c) => c.met).length;

  const getStrengthLabel = () => {
    if (!password) return { text: 'None', color: 'text-slate-400', bg: 'bg-slate-200' };
    if (score <= 1) return { text: 'Weak', color: 'text-rose-600', bg: 'bg-rose-500' };
    if (score === 2) return { text: 'Fair', color: 'text-amber-600', bg: 'bg-amber-500' };
    if (score === 3) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-600' };
    return { text: 'Strong', color: 'text-emerald-600', bg: 'bg-emerald-600' };
  };

  const strength = getStrengthLabel();

  if (!password) return null;

  return (
    <div className="space-y-2 pt-1 animate-in fade-in duration-200">
      {/* Strength Header */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">Password Strength:</span>
        <span className={`font-bold ${strength.color}`}>{strength.text}</span>
      </div>

      {/* Progress Bars (4 segments) */}
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full rounded-full transition-all duration-300 ${
              score >= step ? strength.bg : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1.5">
        {criteria.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 text-[11px] transition-colors ${
              item.met ? 'text-emerald-700 font-medium' : 'text-slate-400'
            }`}
          >
            {item.met ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
