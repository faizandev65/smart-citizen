import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Phone
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackNewTicket: (id: string) => void;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  onTrackNewTicket
}) => {
  const [serviceType, setServiceType] = useState('tree-pruning');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-09-08');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedId, setBookedId] = useState<string | null>(null);

  const services = [
    { id: 'tree-pruning', label: 'Overgrown Tree Pruning / Trimming', dept: 'Horticulture Dept.', sla: '48h SLA' },
    { id: 'water-tanker', label: 'Emergency Potable Water Tanker (5000L)', dept: 'Water Board', sla: '6h Rapid' },
    { id: 'fogging', label: 'Anti-Dengue / Mosquito Thermal Fogging', dept: 'Public Health Wing', sla: '24h SLA' },
    { id: 'septic-cleaning', label: 'Septic Tank Vacuum Cleaning & Disposal', dept: 'Solid Waste Division', sla: '24h SLA' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const id = `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookedId(id);
    }, 1000);
  };

  const handleClose = () => {
    setBookedId(null);
    setAddress('');
    setPhone('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={bookedId ? 'Service Request Booked' : 'Request a Municipal Service'}
      subtitle={bookedId ? 'Municipal crew schedule confirmed' : 'Book on-demand municipal utility and maintenance teams'}
      maxWidth="lg"
    >
      {bookedId ? (
        <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Service Work Order Confirmed
            </span>
            <h4 className="text-2xl font-black text-slate-900">{bookedId}</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              The municipal team has been scheduled for your selected date. You will receive an SMS when the field unit departs the ward hub.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const id = bookedId;
                handleClose();
                onTrackNewTicket(id);
              }}
            >
              Track Request Status
            </Button>
            <Button variant="outline" size="md" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Select Municipal Service Type *
            </label>
            <div className="space-y-2">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setServiceType(srv.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    serviceType === srv.id
                      ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{srv.label}</h5>
                    <p className="text-[11px] text-slate-500">{srv.dept}</p>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    {srv.sla}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Date *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Full Residential / Premise Address *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Flat / House No., Society name, Landmark, Ward number..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              isLoading={isSubmitting}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Confirm Service Booking
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
