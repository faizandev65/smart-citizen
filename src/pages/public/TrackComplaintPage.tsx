import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { SAMPLE_COMPLAINTS } from '../../data/mockData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';
import type { Complaint } from '../../types';

export const TrackComplaintPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { getComplaintById } = useData();

  const [ticketInput, setTicketInput] = useState(id || 'SC-2026-8942');
  const [complaint, setComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    const activeId = id || 'SC-2026-8942';
    setTicketInput(activeId);
    loadTicket(activeId);
  }, [id]);

  const loadTicket = (ticketId: string) => {
    const trimmed = ticketId.trim().toUpperCase();
    const liveFound = getComplaintById(trimmed);
    if (liveFound) {
      setComplaint(liveFound);
      return;
    }

    if (SAMPLE_COMPLAINTS[trimmed]) {
      setComplaint(SAMPLE_COMPLAINTS[trimmed]);
    } else {
      // Dynamic fallback for newly queried ticket numbers
      setComplaint({
        id: trimmed || 'SC-2026-9901',
        category: 'infrastructure',
        categoryName: 'General Civic Grievance',
        title: 'Municipal Grievance Report for ' + (trimmed || 'SC-2026-9901'),
        description: 'Citizen report registered and currently synchronized with Ward Nodal Control System.',
        ward: 'Ward 14 - North Central District',
        location: 'Sector 14, Main Boulevard',
        status: 'In Review',
        priority: 'Medium',
        submittedAt: 'Today at 10:15 AM',
        estimatedResolution: 'Estimated within 36 Hours',
        citizenName: 'Resident Citizen',
        assignedOfficer: {
          name: 'Er. K. S. Mehra',
          designation: 'Ward Nodal Officer',
          department: 'Public Grievance Redressal Cell',
          phone: '+91 98110 00000 (Official)'
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
    if (ticketInput.trim()) {
      navigate(`/track/${encodeURIComponent(ticketInput.trim().toUpperCase())}`);
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
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span>Public Tracking Portal (Demo)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Track Grievance Redressal Status
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Enter your unique Token / Ticket Reference ID to check live inspection updates, nodal officer details, and before/after verification proof.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. SC-2026-8942)"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase font-mono font-bold text-slate-900"
              />
            </div>
            <Button type="submit" variant="primary" size="md" className="shrink-0 px-6 cursor-pointer">
              Track Ticket
            </Button>
          </form>

          {/* Sample Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
            <span className="font-medium">Try sample demo tickets:</span>
            <button
              type="button"
              onClick={() => navigate('/track/SC-2026-8942')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono font-bold hover:bg-emerald-100 cursor-pointer border border-emerald-200"
            >
              SC-2026-8942 (Resolved)
            </button>
            <button
              type="button"
              onClick={() => navigate('/track/SC-2026-9104')}
              className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-mono font-bold hover:bg-amber-100 cursor-pointer border border-amber-200"
            >
              SC-2026-9104 (In Progress)
            </button>
            <button
              type="button"
              onClick={() => navigate('/track/SC-2026-7821')}
              className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-mono font-bold hover:bg-sky-100 cursor-pointer border border-sky-200"
            >
              SC-2026-7821 (Assigned)
            </button>
          </div>
        </div>

        {complaint && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Ticket Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xl font-black text-slate-900">{complaint.id}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                      {complaint.categoryName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Submitted on <strong className="text-slate-700">{complaint.submittedAt}</strong> by {complaint.citizenName}
                  </p>
                </div>

                <div>
                  {getStatusBadge(complaint.status)}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{complaint.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{complaint.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <strong>Location:</strong> {complaint.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    <strong>Ward:</strong> {complaint.ward}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Nodal Officer Info */}
            {complaint.assignedOfficer && (
              <div className="bg-blue-50/70 rounded-2xl border border-blue-200/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Assigned Nodal Officer (Demo)</p>
                    <h4 className="font-bold text-slate-900 text-base">{complaint.assignedOfficer.name}</h4>
                    <p className="text-xs text-slate-600">{complaint.assignedOfficer.designation} • {complaint.assignedOfficer.department}</p>
                  </div>
                </div>

                <a
                  href={`tel:${complaint.assignedOfficer.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Officer Desk</span>
                </a>
              </div>
            )}

            {/* Tracking Progress Timeline */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Resolution Progress Timeline
                </h4>
                <span className="text-xs text-slate-500 font-semibold">{complaint.estimatedResolution}</span>
              </div>

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

                    <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-bold text-slate-900 text-sm">{step.title}</h5>
                        <span className="text-[11px] font-medium text-slate-500">{step.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                      {step.officer && (
                        <p className="text-xs font-semibold text-blue-700 pt-1">
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
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Photographic Resolution Audit (Demo Proof)
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    100% Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl overflow-hidden border border-slate-200">
                    <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 flex items-center justify-between">
                      <span>BEFORE REDRESSAL</span>
                      <span className="text-slate-400 text-[10px]">Sep 04, 09:15 AM</span>
                    </div>
                    <img
                      src={complaint.beforeImage}
                      alt="Before Repair"
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div className="rounded-xl overflow-hidden border border-emerald-300">
                    <div className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 flex items-center justify-between">
                      <span>AFTER RESOLUTION</span>
                      <span className="text-emerald-100 text-[10px]">Sep 05, 04:15 AM</span>
                    </div>
                    <img
                      src={complaint.afterImage || complaint.beforeImage}
                      alt="After Repair"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <button
                onClick={() => alert('Simulated: Acknowledgement Receipt generated & sent to print preview.')}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Official Acknowledgement Slip
              </button>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/submit-complaint')}
                >
                  File Another Issue
                </Button>
                {complaint.status === 'Resolved' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => alert('Citizen Feedback Submitted: 5/5 Stars. Thank you!')}
                  >
                    Rate Service Quality
                  </Button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
