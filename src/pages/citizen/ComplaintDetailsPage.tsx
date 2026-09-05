import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
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
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const ComplaintDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getComplaintById } = useData();

  const ticketId = id?.toUpperCase() || '';
  const liveComplaint = getComplaintById(ticketId);
  const complaint = liveComplaint || SAMPLE_COMPLAINTS[ticketId];

  if (!complaint) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Link
          to="/citizen/complaints"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Complaints</span>
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Grievance Record Not Found
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We could not find any active complaint ticket matching reference <strong className="font-mono text-slate-700">{ticketId || 'N/A'}</strong>. It may have been archived or entered incorrectly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/citizen/complaints">
              <Button variant="primary" size="md">
                View All My Complaints
              </Button>
            </Link>
            <Link to="/citizen/submit-complaint">
              <Button variant="outline" size="md">
                Lodge New Complaint
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Back Link */}
      <Link
        to="/citizen/complaints"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Complaints</span>
      </Link>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xl font-black text-slate-900">{complaint.id}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                {complaint.categoryName}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Registered on <strong className="text-slate-700">{complaint.submittedAt}</strong> by {complaint.citizenName}
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
            complaint.status === 'Resolved'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {complaint.status === 'Resolved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            <span>{complaint.status}</span>
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{complaint.title}</h2>
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

      {/* Officer Card */}
      {complaint.assignedOfficer && (
        <div className="bg-blue-50/70 rounded-3xl border border-blue-200/70 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
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

      {/* Timeline Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Redressal Timeline Log
          </h3>
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

              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
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

      {/* Verification Photos */}
      {complaint.beforeImage && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Before & After Photo Verification
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified Resolution
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <div className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5">
                BEFORE REDRESSAL
              </div>
              <img
                src={complaint.beforeImage}
                alt="Before"
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border border-emerald-300">
              <div className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 flex items-center justify-between">
                <span>AFTER RESOLUTION</span>
                <span className="text-emerald-100 text-[10px]">100% COMPLETE</span>
              </div>
              <img
                src={complaint.afterImage || complaint.beforeImage}
                alt="After"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
        <button
          onClick={() => alert('Simulated: Acknowledgement receipt generated and sent to printer spooler.')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Print Acknowledgement Receipt
        </button>

        <div className="flex items-center gap-3">
          {complaint.status === 'Resolved' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert('Citizen Rating Submitted: 5 Stars. Thank you!')}
            >
              Rate Redressal Quality (★ 5)
            </Button>
          )}
        </div>
      </div>

    </div>
  );
};
