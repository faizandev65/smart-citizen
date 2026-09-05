import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Users,
  Activity,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentAdmin } = useAuth();
  const { complaints, serviceRequests } = useData();

  const activeQueueCount = complaints.length;
  const urgentCount = complaints.filter(c => c.priority === 'High' || c.priority === 'Emergency').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;

  const triageAlerts = [
    { id: 'SC-2026-7821', title: 'Overflowing waste bin at Sector 9 Market', ward: 'Ward 09', priority: 'High', slaLeft: '2h 15m remaining', type: 'Sanitation' },
    { id: 'SC-2026-9104', title: '4 streetlights dark on 7th Main Avenue', ward: 'Ward 22', priority: 'Medium', slaLeft: '5h 30m remaining', type: 'Electrical' },
    { id: 'SC-2026-6410', title: 'Low water pressure in Sector 7', ward: 'Ward 14', priority: 'Medium', slaLeft: '14h remaining', type: 'Water Supply' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>{currentAdmin?.department || 'SmartCitizen — Academic Major Project'} &bull; Badge #{currentAdmin?.badgeId || 'PROJ-ADM-2026'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome, {currentAdmin?.fullName || 'Md Faizan Mustafa'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            Project Administrator &bull; SmartCitizen Academic Project. Oversee complaint triage, track live redressal status, and manage service dispatches across the platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/admin/complaints')}
            icon={<FileSpreadsheet className="w-4 h-4" />}
            className="bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 cursor-pointer"
          >
            Manage Complaints
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/admin/services')}
            className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
          >
            Service Dispatches
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Total Active Queue</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-black text-white">{activeQueueCount}</p>
          <p className="text-[11px] text-blue-400 font-semibold">Live grievance tickets</p>
        </div>

        <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-rose-400 font-bold uppercase">
            <span>High Priority / Urgent</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-3xl font-black text-white">{urgentCount}</p>
          <p className="text-[11px] text-rose-400 font-semibold">Under active SLA timer</p>
        </div>

        <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase">
            <span>Resolved Tickets</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white">{resolvedCount}</p>
          <p className="text-[11px] text-emerald-400 font-semibold">Verified with photo audit</p>
        </div>

        <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
            <span>Service Dispatches</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-white">{serviceRequests.length}</p>
          <p className="text-[11px] text-amber-400 font-semibold">Active specialized work orders</p>
        </div>

      </div>

      {/* 2-Column Section: Triage Alerts + Department Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Triage Alerts */}
        <div className="lg:col-span-7 bg-slate-800/80 rounded-3xl border border-slate-700/80 p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Active Triage Queue (SLA Countdown)
              </h3>
              <p className="text-xs text-slate-400">Tickets requiring nodal supervisor sign-off or team reassignment</p>
            </div>
            <Link to="/admin/complaints" className="text-xs font-bold text-indigo-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {triageAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => navigate('/admin/complaints')}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      {alert.id}
                    </span>
                    <span className="text-slate-400">{alert.type}</span>
                  </div>
                  <span className="text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800 text-[10px]">
                    {alert.slaLeft}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                  {alert.title}
                </h4>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {alert.ward}
                  </span>
                  <span className="text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform">
                    Inspect & Assign →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Department Workload Distribution */}
        <div className="lg:col-span-5 bg-slate-800/80 rounded-3xl border border-slate-700/80 p-6 sm:p-7 space-y-5">
          <div className="border-b border-slate-700 pb-4">
            <h3 className="text-lg font-bold text-white">Department Active Loads</h3>
            <p className="text-xs text-slate-400">Current ticket distribution across municipal wings</p>
          </div>

          <div className="space-y-3.5">
            {[
              { label: 'Roads & Civil Infrastructure', count: '412 tickets', pct: 85, color: 'bg-amber-500' },
              { label: 'Solid Waste & Sanitation', count: '320 tickets', pct: 65, color: 'bg-emerald-500' },
              { label: 'Water Supply & Sewerage', count: '280 tickets', pct: 58, color: 'bg-blue-500' },
              { label: 'Electrical & Streetlights', count: '228 tickets', pct: 45, color: 'bg-indigo-500' },
            ].map((dept) => (
              <div key={dept.label} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{dept.label}</span>
                  <span className="font-semibold text-slate-400">{dept.count}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${dept.color} rounded-full`} style={{ width: `${dept.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-700/60">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/complaints')}
              className="w-full justify-center border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 text-xs cursor-pointer"
            >
              Open Comprehensive Management Table
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
};
