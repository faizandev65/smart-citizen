import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Save,
  Upload,
  Trash2,
  Camera
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../../components/common/Avatar';

export const CitizenProfilePage: React.FC = () => {
  const { currentCitizen, updateCitizenProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(currentCitizen?.fullName || '');
  const [phone, setPhone] = useState(currentCitizen?.phone || '');
  const [email, setEmail] = useState(currentCitizen?.email || '');
  const [ward, setWard] = useState(currentCitizen?.ward || 'Ward 14 - North Central District');
  const [address, setAddress] = useState(currentCitizen?.primaryAddress || '');
  const [avatarUrl, setAvatarUrl] = useState(currentCitizen?.avatarUrl || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentCitizen) {
      setFullName(currentCitizen.fullName);
      setPhone(currentCitizen.phone);
      setEmail(currentCitizen.email);
      setWard(currentCitizen.ward);
      setAddress(currentCitizen.primaryAddress);
      setAvatarUrl(currentCitizen.avatarUrl || '');
    }
  }, [currentCitizen]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        updateCitizenProfile({ avatarUrl: result });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarUrl('');
    updateCitizenProfile({ avatarUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCitizenProfile({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      ward,
      primaryAddress: address.trim(),
      avatarUrl,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Citizen Profile & Preferences
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Manage your verified residential ward details and contact credentials
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        
        {/* User Identity & Avatar Management Capsule */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 text-center sm:text-left">
          <div className="relative group">
            <Avatar
              name={fullName || currentCitizen?.fullName || 'Citizen'}
              src={avatarUrl}
              size="2xl"
              shape="rounded"
              className="w-20 h-20 text-2xl shadow-md border-2 border-blue-500/30"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-105"
              title="Change Profile Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900">{fullName || 'Citizen'}</h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Resident
              </span>
            </div>
            <p className="text-xs text-slate-500">Citizen ID: <strong className="text-slate-700 font-mono">{currentCitizen?.id || 'CIT-2026-9842'}</strong></p>
            <p className="text-xs text-slate-500">Member since {currentCitizen?.joinedDate || 'September 2026'} &bull; {currentCitizen?.city || 'Smart Municipal Corporation Area'}</p>

            {/* Avatar Photo Controls */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>{avatarUrl ? 'Change Photo' : 'Upload Optional Photo'}</span>
              </button>
              {avatarUrl ? (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Use Initials Avatar</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  Automatic clean initials avatar active
                </span>
              )}
            </div>
          </div>
        </div>

        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile details updated in local demo state!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Registered Ward *</label>
              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              >
                <option value="Ward 14 - North Central District (Metro Corridor)">Ward 14 - North Central District (Metro Corridor)</option>
                <option value="Ward 08 - Heritage & Civic Core">Ward 08 - Heritage & Civic Core</option>
                <option value="Ward 22 - Green Valley East">Ward 22 - Green Valley East</option>
                <option value="Ward 31 - Tech Park & Industrial Zone">Ward 31 - Tech Park & Industrial Zone</option>
                <option value="Ward 48 - South Hills Suburban Zone">Ward 48 - South Hills Suburban Zone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Primary Residence Address *</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Save className="w-4 h-4" />}
              className="cursor-pointer"
            >
              Save Profile Changes
            </Button>
          </div>

        </form>

      </div>

    </div>
  );
};
