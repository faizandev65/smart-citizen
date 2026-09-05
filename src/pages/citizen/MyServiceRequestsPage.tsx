import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Calendar,
  Phone,
  MapPin,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const MyServiceRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { serviceRequests } = useData();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Service Requests
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Manage your booked on-demand municipal utilities and maintenance appointments
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/citizen/request-service')}
          icon={<PlusCircle className="w-4 h-4" />}
          className="self-start sm:self-auto shadow-blue-600/20 cursor-pointer"
        >
          Book New Service
        </Button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {serviceRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:border-indigo-300 hover:shadow-lg transition-all duration-200 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                    {req.id}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{req.department}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
                  {req.serviceName}
                </h3>
                {req.notes && (
                  <p className="text-xs text-slate-600 leading-relaxed">{req.notes}</p>
                )}
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto ${
                req.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}>
                {req.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                <span>{req.status}</span>
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <strong>Scheduled Date:</strong> {req.scheduledDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {req.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {req.phone}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Simulated SMS sent with field team schedule for ${req.id}`)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Resend SMS Reminder
                </button>
              </div>
            </div>
          </div>
        ))}

        {serviceRequests.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No active municipal service bookings</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Schedule specialized municipal maintenance, water supply, or vector control teams.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/citizen/request-service')}
            >
              Book a Municipal Service
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
