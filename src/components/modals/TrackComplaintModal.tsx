import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  Printer,
  Layers
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { SAMPLE_COMPLAINTS } from '../../data/mockData';
import type { Complaint } from '../../types';

interface TrackComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTicketId?: string;
}

export const TrackComplaintModal: React.FC<TrackComplaintModalProps> = ({
  isOpen,
  onClose,
  initialTicketId = 'SC-2026-8942'
}) => {
  const [searchId, setSearchId] = useState(initialTicketId);
  const [complaint, setComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    if (initialTicketId) {
      setSearchId(initialTicketId);
      loadTicket(initialTicketId);
    } else {
      loadTicket('SC-2026-8942');
    }
  }, [initialTicketId, isOpen]);

  const loadTicket = (id: string) => {
    const trimmed = id.trim().toUpperCase();
    if (SAMPLE_COMPLAINTS[trimmed]) {
      setComplaint(SAMPLE_COMPLAINTS[trimmed]);
    } else {
      // Create a fallback realistic simulated complaint so any ticket ID entered works seamlessly!
      setComplaint({
        id: trimmed || 'SC-2026-9901',
        category: 'infrastructure',
        categoryName: 'General Civic Grievance',
        title: 'Municipal Grievance Report for ' + (trimmed || 'SC-2026-9901'),
        description: 'Citizen report registered and currently synchronized with Ward Nodal Control System.',
        ward: 'Ward 12 - West Central Zone',
        location: 'Sector 4, Main Boulevard',
        status: 'In Review',
        priority: 'Medium',
        submittedAt: 'Today at 10:15 AM',
        estimatedResolution: 'Estimated within 36 Hours',
        citizenName: 'Citizen Resident',
        assignedOfficer: {
          name: 'Er. K. S. Mehra',
          designation: 'Ward Nodal Officer',
          department: 'Public Grievance Redressal Cell',
          phone: '+91 98110 00000'
        },
        timeline: [
          {
            title: 'Grievance Successfully Registered',
            timestamp: 'Today • 10:15 AM',
            description: 'Assigned to Ward 12 Municipal engineering cell.',
            completed: true
          },
          {
            title: 'Initial Review & Desk Verification',
            timestamp: 'Today • 11:30 AM',
            description: 'Officer reviewing details and dispatching inspection crew.',
            completed: true,
            officer: 'Er. K. S. Mehra'
          },
          {
            title: 'Field Team Physical Inspection',
            timestamp: 'Scheduled Today • 03:00 PM',
            description: 'On-ground team dispatched with work order.',
            completed: false
          },
          {
            title: 'Redressal & Photo Verification',
            timestamp: 'Pending Closure',
            description: 'Final closure confirmation and citizen feedback dispatch.',
            completed: false
          }
        ]
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      loadTicket(searchId);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <Badge variant="success" size="md" dot>Resolved & Verified</Badge>;
      case 'In Progress':
        return <Badge variant="warning" size="md" dot>In Progress (On-Ground)</Badge>;
      case 'Officer Assigned':
        return <Badge variant="info" size="md" dot>Officer Assigned</Badge>;
      default:
        return <Badge variant="neutral" size="md" dot>{status}</Badge>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Track Complaint Status"
      subtitle="Real-Time Municipal Grievance Tracking & SLA Audit"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Ticket ID (e.g. SC-2026-8942)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase font-mono font-medium"
            />
          </div>
          <Button type="submit" variant="primary" size="md" className="shrink-0">
            Search
          </Button>
        </form>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Sample tickets:</span>
          <button
            type="button"
            onClick={() => { setSearchId('SC-2026-8942'); loadTicket('SC-2026-8942'); }}
            className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold hover:bg-emerald-100 cursor-pointer"
          >
            SC-2026-8942 (Resolved)
          </button>
          <button
            type="button"
            onClick={() => { setSearchId('SC-2026-9104'); loadTicket('SC-2026-9104'); }}
            className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono font-bold hover:bg-amber-100 cursor-pointer"
          >
            SC-2026-9104 (In Progress)
          </button>
          <button
            type="button"
            onClick={() => { setSearchId('SC-2026-7821'); loadTicket('SC-2026-7821'); }}
            className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-mono font-bold hover:bg-sky-100 cursor-pointer"
          >
            SC-2026-7821 (Assigned)
          </button>
        </div>

        {complaint && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Ticket Header Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black text-slate-900">{complaint.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                      {complaint.categoryName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Submitted on <strong className="text-slate-700">{complaint.submittedAt}</strong> by {complaint.citizenName}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(complaint.status)}
                </div>
              </div>

              {/* Title & Location */}
              <div>
                <h4 className="font-bold text-slate-900 text-base">{complaint.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{complaint.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <strong>Location:</strong> {complaint.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    <strong>Ward:</strong> {complaint.ward}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Nodal Officer Info */}
            {complaint.assignedOfficer && (
              <div className="bg-blue-50/70 rounded-2xl border border-blue-200/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Assigned Nodal Officer</p>
                    <h5 className="font-bold text-slate-900 text-sm">{complaint.assignedOfficer.name}</h5>
                    <p className="text-xs text-slate-600">{complaint.assignedOfficer.designation}</p>
                  </div>
                </div>

                <a
                  href={`tel:${complaint.assignedOfficer.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors shrink-0 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Officer Desk</span>
                </a>
              </div>
            )}

            {/* Tracking Progress Timeline */}
            <div>
              <h5 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Resolution Progress Timeline
              </h5>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {complaint.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.completed
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                    </div>

                    <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/80 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h6 className="font-bold text-slate-900 text-xs sm:text-sm">{step.title}</h6>
                        <span className="text-[10px] font-medium text-slate-500">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{step.description}</p>
                      {step.officer && (
                        <p className="text-[11px] font-semibold text-blue-700 mt-1">
                          Officer Assigned: {step.officer}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After Verification Photos (if resolved) */}
            {complaint.beforeImage && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Photographic Resolution Audit
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden border border-slate-200">
                    <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1">
                      BEFORE REDRESSAL
                    </div>
                    <img
                      src={complaint.beforeImage}
                      alt="Before"
                      className="w-full h-32 object-cover"
                    />
                  </div>

                  <div className="rounded-xl overflow-hidden border border-emerald-300">
                    <div className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 flex items-center justify-between">
                      <span>AFTER REDRESSAL</span>
                      <span>100% VERIFIED</span>
                    </div>
                    <img
                      src={complaint.afterImage || complaint.beforeImage}
                      alt="After"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => alert('Acknowledgement Receipt generated & sent to print spooler.')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Acknowledgement
              </button>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close Tracker
                </Button>
                {complaint.status === 'Resolved' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => alert('Thank you for rating! Citizen rating: 5/5 stars.')}
                  >
                    Rate Service Quality
                  </Button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </Modal>
  );
};
