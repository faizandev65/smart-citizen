import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Wrench,
  Calendar,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const RequestServicePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentCitizen } = useAuth();
  const { addServiceRequest } = useData();

  const prefill = searchParams.get('type') || 'tree-pruning';
  const [serviceType, setServiceType] = useState(prefill);
  const [address, setAddress] = useState(currentCitizen?.primaryAddress || '');
  const [phone, setPhone] = useState(currentCitizen?.phone || '');
  const [preferredDate, setPreferredDate] = useState('2026-09-08');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedId, setBookedId] = useState<string | null>(null);

  const services = [
    { id: 'tree-pruning', label: 'Overgrown Tree Branch Pruning / Trimming', dept: 'Horticulture Dept.', sla: '48h SLA Target', cost: 'Free Municipal Service' },
    { id: 'water-tanker', label: 'Emergency Potable Water Tanker (5000L)', dept: 'Water Board Supply Wing', sla: '6h Rapid Delivery', cost: 'Standard Municipal Rate' },
    { id: 'fogging', label: 'Anti-Dengue & Mosquito Thermal Fogging Drive', dept: 'Public Health Wing', sla: '24h SLA Target', cost: 'Free Municipal Service' },
    { id: 'septic-cleaning', label: 'Septic Tank Vacuum Cleaning & Sludge Disposal', dept: 'Solid Waste Division', sla: '24h SLA Target', cost: 'Subsidized Fee' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const chosen = services.find((s) => s.id === serviceType) || services[0];
      const created = addServiceRequest({
        serviceType: chosen.id,
        serviceName: chosen.label,
        department: chosen.dept,
        scheduledDate: preferredDate || '2026-09-08',
        address: address.trim() || currentCitizen?.primaryAddress || 'Sector 14 Municipal Area',
        phone: phone.trim() || currentCitizen?.phone || '+91 98765 43210',
        notes: notes.trim() || 'Booked for municipal utility servicing.',
      });

      setIsSubmitting(false);
      setBookedId(created.id);
    }, 700);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
            <Wrench className="w-3.5 h-3.5 text-indigo-600" />
            <span>On-Demand Civic Services Booking (Demo)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Request a Municipal Service
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Schedule specialized municipal teams for community maintenance, water emergencies, and vector control.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          
          {bookedId ? (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Service Work Order Booked
                </span>
                <h3 className="text-2xl font-black text-slate-900">{bookedId}</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  The municipal dispatch cell has received your booking for <strong>{preferredDate}</strong>. You will receive an SMS when the crew departs.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/citizen/services')}
                  className="w-full sm:w-auto"
                >
                  View in My Service Requests
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setBookedId(null)}
                  className="w-full sm:w-auto"
                >
                  Book Another Service
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Select Municipal Service *
                </label>
                <div className="space-y-2.5">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setServiceType(srv.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        serviceType === srv.id
                          ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-500'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{srv.label}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{srv.dept} • {srv.cost}</p>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shrink-0">
                        {srv.sla}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Contact Phone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Preferred Service Date *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Service Premise / Society Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Specific Work Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Overhanging branch is on the left side of building gate #2..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button type="button" variant="outline" size="md" onClick={() => navigate('/services')}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Confirm Service Booking
                </Button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
