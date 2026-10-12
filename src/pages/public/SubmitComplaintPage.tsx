import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Camera,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  PlusCircle
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import { IconRenderer } from '../../components/common/IconRenderer';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { LocationPickerMap, type LocationPickerChange } from '../../components/common/LocationPickerMap';
import type { ComplaintCategory, PriorityLevel } from '../../types';

export const SubmitComplaintPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentCitizen } = useAuth();
  const { addComplaint } = useData();

  const prefillCat = searchParams.get('category') || 'roads';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(searchParams.get('category') ? 2 : 1);
  const [category, setCategory] = useState<string>(prefillCat);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Normal' | 'High' | 'Emergency'>('Normal');
  const [ward, setWard] = useState(currentCitizen?.ward || 'Ward 14 - North Central District (Metro Corridor)');
  
  // Real coordinates & address state
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [landmark, setLandmark] = useState('');
  const [locationError, setLocationError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLocationChange = (loc: LocationPickerChange) => {
    setLatitude(loc.lat);
    setLongitude(loc.lng);
    setFormattedAddress(loc.address);
    setLocationError(null);
    if (!landmark) {
      setLandmark(loc.address.split(',')[0] || '');
    }
  };

  const handleContinueToPhoto = () => {
    if (!latitude && !landmark.trim() && !formattedAddress.trim()) {
      setLocationError('Please pin your location on the map or enter a street address before continuing.');
      return;
    }
    setLocationError(null);
    setStep(4);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const catMap: Record<string, string> = {
        roads: 'Road & Street Infrastructure',
        sanitation: 'Garbage & Solid Waste Management',
        water: 'Water Supply & Underground Drainage',
        electricity: 'Streetlights & Electrical Grid',
        infrastructure: 'Public Parks & Civic Assets',
      };

      const resolvedLocation = formattedAddress 
        ? (landmark.trim() && !formattedAddress.toLowerCase().includes(landmark.trim().toLowerCase()) 
            ? `${landmark.trim()} • ${formattedAddress}` 
            : formattedAddress)
        : (landmark.trim() || 'Sector 14 Municipal Area');

      const created = addComplaint({
        title: title.trim() || `Civic Grievance (${catMap[category] || 'General'})`,
        category: category as ComplaintCategory,
        categoryName: catMap[category] || 'General Civic Grievance',
        description: description.trim() || 'Civic issue reported for immediate municipal redressal.',
        ward: ward || currentCitizen?.ward || 'Ward 14 - North Central District',
        location: resolvedLocation,
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
        formattedAddress: formattedAddress || undefined,
        priority: priority === 'Normal' ? 'Medium' : (priority as PriorityLevel),
        citizenName: currentCitizen?.fullName || 'Resident Citizen',
      });

      setIsSubmitting(false);
      setGeneratedTicketId(created.id);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Grievance Lodging Wizard (Demo)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Register a Civic Complaint
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Submit photo evidence and geo-coordinates for prompt resolution by the assigned municipal nodal team.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          
          {generatedTicketId ? (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Successfully Registered & Dispatched
                </span>
                <h3 className="text-2xl font-black text-slate-900">Ticket #{generatedTicketId}</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your grievance has been automatically logged and queued for Ward 14 Nodal Inspection. An SMS tracking confirmation link has been simulated.
                </p>
              </div>

              {/* Ticket ID Box */}
              <div className="max-w-sm mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase text-left">Your Reference Token</p>
                  <p className="text-lg font-mono font-bold text-slate-900">{generatedTicketId}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedTicketId)}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(`/track/${generatedTicketId}`)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Track This Ticket Live
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/citizen/complaints')}
                  className="w-full sm:w-auto"
                >
                  View in My Complaints
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step Bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs">
                <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>1</span>
                  <span>Category</span>
                </div>
                <div className="w-12 h-px bg-slate-200" />
                <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>2</span>
                  <span>Details</span>
                </div>
                <div className="w-12 h-px bg-slate-200" />
                <div className={`flex items-center gap-1.5 font-bold ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>3</span>
                  <span>Location</span>
                </div>
                <div className="w-12 h-px bg-slate-200" />
                <div className={`flex items-center gap-1.5 font-bold ${step >= 4 ? 'text-blue-600' : 'text-slate-400'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>4</span>
                  <span>Photo & Submit</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Category */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Civic Department:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {SERVICE_CATEGORIES.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => {
                            setCategory(srv.id);
                            setStep(2);
                          }}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                            category === srv.id
                              ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                            <IconRenderer name={srv.icon} className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{srv.title}</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{srv.department}</p>
                            <span className="inline-block text-[10px] font-bold text-blue-600 mt-1">
                              SLA: {srv.slaHours}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Grievance Title / Short Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hazardous deep pothole near Metro Pillar 142"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Detailed Problem Description *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Provide details about the issue, size, potential risks, and how long it has been present..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['Normal', 'High', 'Emergency'] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPriority(p)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              priority === p
                                ? p === 'Emergency' ? 'bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500' : 'bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-500'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-slate-100">
                      <Button type="button" variant="outline" size="sm" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                        Back to Categories
                      </Button>
                      <Button type="button" variant="primary" size="sm" onClick={() => setStep(3)} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                        Continue to Location
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                        <span>Pin Grievance Location on Interactive Map *</span>
                        <span className="text-[11px] font-medium text-slate-500 normal-case">
                          Real-time GPS • OpenStreetMap • Search
                        </span>
                      </label>
                      <LocationPickerMap
                        latitude={latitude}
                        longitude={longitude}
                        formattedAddress={formattedAddress}
                        onLocationChange={handleLocationChange}
                      />
                    </div>

                    {locationError && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{locationError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Municipal Ward / Zone *
                        </label>
                        <select
                          value={ward}
                          onChange={(e) => setWard(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                        >
                          <option>Ward 14 - North Central District (Metro Corridor)</option>
                          <option>Ward 08 - Heritage & Civic Core</option>
                          <option>Ward 22 - Green Valley East</option>
                          <option>Ward 31 - Tech Park & Industrial Zone</option>
                          <option>Ward 48 - South Hills Suburban</option>
                        </select>
                        <p className="text-[10px] text-slate-400 mt-1">Select your administrative ward for nodal officer dispatch.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                          Landmark / Location Specifics (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Near Metro Pillar 142, Opp. Central Supermarket"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Add specific landmark or gate details for field engineers.</p>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-slate-100">
                      <Button type="button" variant="outline" size="sm" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                        Back
                      </Button>
                      <Button type="button" variant="primary" size="sm" onClick={handleContinueToPhoto} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                        Continue to Photo
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Photo & Submit */}
                {step === 4 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Attach Photograph Proof (Recommended)
                      </label>
                      <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/60 cursor-pointer transition-colors">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                          <Camera className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-slate-700">Click to upload or capture photo</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Supports JPG, PNG up to 10MB (Geo-tagged)</p>
                      </div>
                    </div>

                    {/* Summary Box */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <p className="font-bold text-slate-800">Review Summary:</p>
                      <p className="text-slate-600"><strong>Subject:</strong> {title || 'Dangerous civic hazard'}</p>
                      <p className="text-slate-600"><strong>Department:</strong> {category.toUpperCase()}</p>
                      <p className="text-slate-600"><strong>Ward:</strong> {ward}</p>
                      <p className="text-slate-600"><strong>Priority:</strong> {priority}</p>
                      {latitude && longitude && (
                        <p className="text-slate-600">
                          <strong>Geo-Coordinates:</strong> <span className="font-mono text-blue-700 font-bold">{latitude.toFixed(6)}° N, {longitude.toFixed(6)}° E</span>
                        </p>
                      )}
                      <p className="text-slate-600"><strong>Address:</strong> {formattedAddress || landmark || 'Sector 14 Municipal Area'}</p>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-slate-100">
                      <Button type="button" variant="outline" size="sm" onClick={() => setStep(3)} icon={<ArrowLeft className="w-4 h-4" />}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={isSubmitting}
                        icon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Submit Grievance Now
                      </Button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
