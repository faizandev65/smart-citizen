import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle2,
  PlusCircle,
  Wrench,
  ArrowRight,
  MapPin,
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CitizenDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentCitizen } = useAuth();
  const { complaints, serviceRequests } = useData();

  const totalComplaints = complaints.length;
  const inProgressComplaints = complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length;
  const resolvedComplaints = complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
  const activeServices = serviceRequests.filter(s => s.status !== 'Completed' && s.status !== 'Cancelled').length;

  const citizenDisplayName = currentCitizen?.fullName || 'Citizen';
  const citizenWard = currentCitizen?.ward || 'Ward 14 - North Central District';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-600/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>{citizenWard} &bull; Grievance & Redressal Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {citizenDisplayName}!
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl leading-relaxed">
            You have <strong>{inProgressComplaints} active grievances</strong> under municipal inspection. Track real-time progress or submit a new report below.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="white"
            size="md"
            onClick={() => navigate('/citizen/submit-complaint')}
            icon={<PlusCircle className="w-4 h-4 text-blue-700" />}
            className="font-bold text-blue-700 shadow-md cursor-pointer"
          >
            Lodge Grievance
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/citizen/request-service')}
            icon={<Wrench className="w-4 h-4" />}
            className="bg-slate-900/80 hover:bg-slate-900 border border-white/20 cursor-pointer"
          >
            Book Service
          </Button>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Total Lodged</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{totalComplaints}</p>
          <p className="text-[11px] text-slate-500">Submitted in 2026</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-amber-600 font-bold uppercase">
            <span>In Progress</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{inProgressComplaints}</p>
          <p className="text-[11px] text-amber-600 font-semibold">Under field inspection</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-600 font-bold uppercase">
            <span>Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{resolvedComplaints}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">Photo verified closure</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-indigo-600 font-bold uppercase">
            <span>Service Bookings</span>
            <Wrench className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900">{activeServices}</p>
          <p className="text-[11px] text-indigo-600 font-semibold">Upcoming utility schedule</p>
        </div>

      </div>

      {/* 2-Column Grid: Recent Complaints + Active Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Recent Complaints */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Complaints</h3>
              <p className="text-xs text-slate-500">Track real-time inspection updates</p>
            </div>
            <Link
              to="/citizen/complaints"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All ({totalComplaints})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {complaints.slice(0, 3).map((complaint) => (
              <div
                key={complaint.id}
                onClick={() => navigate(`/citizen/complaints/${complaint.id}`)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {complaint.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{complaint.categoryName}</span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    complaint.status === 'Resolved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : complaint.status === 'In Progress'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-sky-50 text-sky-700 border border-sky-200'
                  }`}>
                    {complaint.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {complaint.title}
                </h4>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    {complaint.location}
                  </span>
                  <span className="font-medium text-[11px]">{complaint.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Service Request & Ward Info */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Service Booking */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Next Service Booking
              </h3>
              <Link to="/citizen/services" className="text-xs font-bold text-indigo-600 hover:underline">
                Manage
              </Link>
            </div>

            {serviceRequests.length > 0 ? (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <span className="text-[10px] font-bold text-indigo-700 uppercase bg-white px-2 py-0.5 rounded border border-indigo-200">
                  {serviceRequests[0].status}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{serviceRequests[0].serviceName}</h4>
                <p className="text-xs text-slate-600"><strong>Date:</strong> {serviceRequests[0].scheduledDate}</p>
                <p className="text-[11px] text-slate-500 truncate">{serviceRequests[0].address}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No scheduled bookings.</p>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/citizen/request-service')}
              className="w-full text-xs justify-center cursor-pointer"
            >
              Book Another Service
            </Button>
          </div>

          {/* Ward Nodal Helpdesk Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Ward 14 Nodal Officer (Demo)
            </h4>
            <div className="text-xs text-slate-600 space-y-1">
              <p><strong>Officer:</strong> Er. Rajesh Kumar</p>
              <p><strong>Jurisdiction:</strong> North Central Zone</p>
              <p><strong>Direct Helpline:</strong> 1800-233-0199 (Demo)</p>
            </div>
            <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-2">
              Citizen Charter guaranteed 24-48 hour resolution protocol in effect.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
