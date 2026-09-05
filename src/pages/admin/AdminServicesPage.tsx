import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Phone,
  MapPin,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const AdminServicesPage: React.FC = () => {
  const { serviceRequests, updateServiceRequestStatus } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusToggle = (id: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === 'Scheduled'
        ? 'In Progress'
        : currentStatus === 'In Progress'
        ? 'Completed'
        : 'Scheduled';
    updateServiceRequestStatus(id, nextStatus as any);
  };

  const filtered = serviceRequests.filter(
    r =>
      r.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Municipal Service Dispatch Queue
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Coordinate specialized maintenance units, water tankers, and pest control dispatches
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 self-start sm:self-auto">
          Active Dispatches: {serviceRequests.length}
        </span>
      </div>

      {/* Search Filter */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service work orders by ID, Department, or Address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      {/* Work Orders List */}
      <div className="space-y-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="bg-slate-800/80 rounded-3xl border border-slate-700/80 p-6 space-y-4 shadow-lg hover:border-indigo-500/50 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
                    {req.id}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{req.department}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white pt-1">
                  {req.serviceName}
                </h3>
                {req.notes && (
                  <p className="text-xs text-slate-300">{req.notes}</p>
                )}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                  req.status === 'Completed'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                }`}>
                  {req.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  <span>{req.status}</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-5">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <strong>Scheduled Date:</strong> {req.scheduledDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  {req.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {req.phone}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusToggle(req.id, req.status)}
                className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 text-xs cursor-pointer"
              >
                Toggle Status ({req.status === 'Scheduled' ? 'Set In Progress' : req.status === 'In Progress' ? 'Set Completed' : 'Reset to Scheduled'})
              </Button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-slate-800/80 rounded-3xl border border-slate-700/80 space-y-2">
            <Calendar className="w-8 h-8 mx-auto text-slate-500" />
            <p className="text-sm font-bold text-slate-300">No service dispatches found</p>
            <p className="text-xs text-slate-500">No work orders match the current search query.</p>
          </div>
        )}
      </div>

    </div>
  );
};
