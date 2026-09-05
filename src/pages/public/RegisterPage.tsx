import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  BellRing,
  Sparkles,
  Camera,
  Trash2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { PasswordStrengthIndicator } from '../../components/auth/PasswordStrengthIndicator';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../../components/common/Avatar';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerCitizen } = useAuth();
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Form State - Starts completely blank by default
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdCitizenId, setCreatedCitizenId] = useState('CIT-2026-9842');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarUrl('');
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  // Validation
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Full legal name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const cleanedPhone = phone.replace(/[\s\-\+]/g, '');
    if (!phone.trim() || cleanedPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!ward.trim()) {
      newErrors.ward = 'Please select your municipal ward.';
    }

    if (!address.trim() || address.trim().length < 6) {
      newErrors.address = 'Please enter your residential address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Citizen Terms of Service and Ward Charter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const newCitizen = registerCitizen({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      ward,
      address: address.trim(),
      avatarUrl,
    });
    setCreatedCitizenId(newCitizen.id);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
    }, 600);
  };

  const handleFillDemoData = () => {
    setFullName('Md Faizan Mustafa');
    setEmail('faizan.mustafa@smartcitizen.demo');
    setPhone('+91 98765 43210');
    setWard('Ward 14 - North Central District (Metro Corridor)');
    setAddress('Flat 402, Royal Palms Society, Sector 14');
    setPassword('SecurePass@2026');
    setConfirmPassword('SecurePass@2026');
    setAgreeTerms(true);
    setErrors({});
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 py-10 sm:py-16 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Citizen Registration Benefits Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
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
                  Citizen Enrollment Portal
                </span>
              </div>
            </Link>

            <div className="space-y-2 pt-2">
              <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                Join 350,000+ Citizens Building a Smarter City.
              </h2>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Create your verified citizen account in under 2 minutes to report municipal issues, track SLA redressing, and book on-demand civic utility services.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-blue-500/30 flex items-center justify-center text-blue-200 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ward-Specific Triage</h4>
                  <p className="text-[11px] text-blue-200/80">Complaints automatically route to your assigned Ward Nodal Engineer.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center text-indigo-200 shrink-0">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">SMS & Email Status Pushes</h4>
                  <p className="text-[11px] text-blue-200/80">Real-time alerts when field teams are dispatched and work is verified.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-200 shrink-0">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Guaranteed Citizen Charter</h4>
                  <p className="text-[11px] text-blue-200/80">All services backed by municipal timeline and quality commitments.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 mt-6 text-[11px] text-blue-200/70 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0" />
            <span>Encrypted demo simulation. Passwords and personal data remain local.</span>
          </div>

        </div>

        {/* Right Side: Registration Form Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Register as Citizen</h1>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Free Account
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Enter your details to generate your unique Smart Citizen ID and start reporting issues.
              </p>
            </div>

            {/* Separate Clearly Labelled Demo Note */}
            <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <span className="text-[11px] text-slate-600">
                  <strong>Demo Mode:</strong> All registration fields start empty. You may enter your own data or use test fill.
                </span>
              </div>
              <button
                type="button"
                onClick={handleFillDemoData}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer shrink-0 self-end sm:self-auto"
              >
                Autofill Test Data
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Optional Profile Photo Picker preview */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={fullName || 'Citizen'}
                    src={avatarUrl}
                    size="md"
                    shape="rounded"
                    className="border border-blue-400/40"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Profile Avatar <span className="text-slate-400 font-normal">(Optional)</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {avatarUrl ? 'Custom photo attached' : 'Automatic clean initials avatar active'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-500" />
                    <span>{avatarUrl ? 'Change' : 'Upload'}</span>
                  </button>
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="p-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Legal Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                          : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                          : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Ward Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Municipal Ward / Electoral Zone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={ward}
                    onChange={(e) => {
                      setWard(e.target.value);
                      if (errors.ward) setErrors({ ...errors, ward: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all font-medium ${
                      errors.ward
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : !ward
                        ? 'border-slate-300 text-slate-400 focus:ring-blue-500/20 focus:border-blue-500'
                        : 'border-slate-300 text-slate-900 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                  >
                    <option value="" disabled className="text-slate-400">
                      Select your municipal ward
                    </option>
                    <option value="Ward 14 - North Central District (Metro Corridor)" className="text-slate-900">
                      Ward 14 - North Central District (Metro Corridor)
                    </option>
                    <option value="Ward 08 - Heritage & Civic Core" className="text-slate-900">
                      Ward 08 - Heritage & Civic Core
                    </option>
                    <option value="Ward 22 - Green Valley East" className="text-slate-900">
                      Ward 22 - Green Valley East
                    </option>
                    <option value="Ward 31 - Tech Park & Industrial Zone" className="text-slate-900">
                      Ward 31 - Tech Park & Industrial Zone
                    </option>
                    <option value="Ward 48 - South Hills Suburban Zone" className="text-slate-900">
                      Ward 48 - South Hills Suburban Zone
                    </option>
                  </select>
                </div>
                {errors.ward && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.ward}
                  </p>
                )}
              </div>

              {/* Residential Street Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Residential Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="w-9 h-9 absolute left-1 top-1.5 flex items-center justify-center text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter your residential address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors({ ...errors, address: '' });
                    }}
                    className={`w-full pl-10 pr-3.5 py-2 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.address
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-400'
                    }`}
                  />
                </div>
                {errors.address && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Create a strong password"
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="w-9 h-9 absolute left-1 top-1 flex items-center justify-center text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Confirm your password"
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
              </div>

              {/* Real-Time Password Strength Meter (renders only when password is typed) */}
              <PasswordStrengthIndicator password={password} />

              {/* Terms & Conditions Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: '' });
                    }}
                    className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to the <strong className="text-slate-800">Smart Citizen Terms of Service</strong>, Privacy Policy, and Municipal Grievance Redressal Charter guidelines.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
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
                Create Free Citizen Account
              </Button>
            </form>

            {/* Bottom Link to Sign In */}
            <div className="pt-3 text-center text-xs text-slate-600 border-t border-slate-100">
              Already have a registered account?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">
                Sign In to Citizen Portal →
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5 animate-in zoom-in-95">
            
            <div className="relative mx-auto inline-block">
              <Avatar
                name={fullName}
                src={avatarUrl}
                size="xl"
                shape="rounded"
                className="w-16 h-16 text-xl shadow-md border-2 border-blue-500/30 mx-auto"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                Citizen Enrolled
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">Registration Complete!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Welcome to SmartCitizen, <strong>{fullName}</strong>. Your account has been registered for <strong>{ward}</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Citizen ID:</span>
                <span className="font-mono font-bold text-blue-700">{createdCitizenId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Registered Phone:</span>
                <span className="font-semibold text-slate-800">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Ward:</span>
                <span className="font-semibold text-slate-800">{ward}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/login')}
                className="w-full justify-center"
              >
                Go to Sign In
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/citizen/dashboard')}
                className="w-full justify-center shadow-blue-600/20"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Open Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
