import React, { useState, useEffect } from 'react';
import {
  Camera,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import { IconRenderer } from '../common/IconRenderer';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCategory?: string;
  onTrackNewTicket: (ticketId: string) => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  prefillCategory,
  onTrackNewTicket
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [category, setCategory] = useState<string>(prefillCategory || 'roads');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Normal' | 'High' | 'Emergency'>('Normal');
  const [ward, setWard] = useState('Ward 14 - North Central Zone');
  const [landmark, setLandmark] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [hasDetectedGPS, setHasDetectedGPS] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefillCategory) {
      setCategory(prefillCategory);
      setStep(2);
    }
  }, [prefillCategory, isOpen]);

  const handleDetectGPS = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setIsDetectingLocation(false);
      setHasDetectedGPS(true);
      setLandmark('Current GPS: 18.5204° N, 73.8567° E (Within 5m accuracy)');
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newId = `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedTicketId(newId);
    }, 1000);
  };

  const resetForm = () => {
    setStep(1);
    setTitle('');
    setDescription('');
    setLandmark('');
    setHasDetectedGPS(false);
    setGeneratedTicketId(null);
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={generatedTicketId ? 'Grievance Registered' : 'Register a Civic Complaint'}
      subtitle={generatedTicketId ? 'Your issue is now in the municipal redressal queue' : 'Submit photo proof and geo-location for rapid SLA resolution'}
      maxWidth="xl"
    >
      {/* Success View */}
      {generatedTicketId ? (
        <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Successfully Logged & Assigned
            </span>
            <h3 className="text-2xl font-black text-slate-900">Ticket #{generatedTicketId}</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your grievance has been automatically dispatched to the Ward 14 Nodal Officer. An SMS confirmation with live tracking link has been sent to your mobile.
            </p>
          </div>

          {/* Ticket ID Copy Box */}
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

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const id = generatedTicketId;
                handleModalClose();
                onTrackNewTicket(id);
              }}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Track This Ticket Live
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={handleModalClose}
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 text-xs">
            <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>1</span>
              <span>Category</span>
            </div>
            <div className="w-8 h-px bg-slate-200" />
            <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>2</span>
              <span>Details</span>
            </div>
            <div className="w-8 h-px bg-slate-200" />
            <div className={`flex items-center gap-1.5 font-bold ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>3</span>
              <span>Location</span>
            </div>
            <div className="w-8 h-px bg-slate-200" />
            <div className={`flex items-center gap-1.5 font-bold ${step >= 4 ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>4</span>
              <span>Photo</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Category Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Civic Department:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_CATEGORIES.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => {
                        setCategory(srv.id);
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        category === srv.id
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <IconRenderer name={srv.icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{srv.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{srv.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Issue Details */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Grievance Title / Short Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hazardous pothole causing traffic obstruction"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Detailed Problem Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide exact details of the civic hazard, size, how long it has been unresolved..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Normal', 'High', 'Emergency'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
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

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                    Back
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
                {/* Auto GPS Trigger */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-xs text-blue-900 font-semibold">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Auto-detect exact geolocation via browser GPS</span>
                  </div>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleDetectGPS}
                    isLoading={isDetectingLocation}
                  >
                    {hasDetectedGPS ? 'GPS Locked (5m)' : 'Pin My Location'}
                  </Button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Municipal Ward / Zone *
                  </label>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option>Ward 14 - North Central Zone (Metro Corridor)</option>
                    <option>Ward 08 - Heritage & Civic Core</option>
                    <option>Ward 22 - Green Valley East</option>
                    <option>Ward 31 - Tech Park & Industrial Corridor</option>
                    <option>Ward 48 - South Hills Suburban</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Street Address & Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Metro Pillar 142, Opp. Central Supermarket"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button type="button" variant="primary" size="sm" onClick={() => setStep(4)} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Continue to Photo
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Photo Proof & Submit */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Attach Photograph Proof (Recommended)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50/60 cursor-pointer transition-colors">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                      <Camera className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">Click to upload or take photo</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Supports JPG, PNG up to 10MB (Geo-tagged automatically)</p>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <p className="font-bold text-slate-800">Review Summary:</p>
                  <p className="text-slate-600"><strong>Subject:</strong> {title || 'Dangerous civic hazard'}</p>
                  <p className="text-slate-600"><strong>Department:</strong> {category.toUpperCase()}</p>
                  <p className="text-slate-600"><strong>Ward:</strong> {ward}</p>
                  <p className="text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Protected by Municipal Citizen Redressal Act
                  </p>
                </div>

                <div className="flex justify-between pt-2">
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
    </Modal>
  );
};
