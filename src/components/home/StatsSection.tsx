import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { CIVIC_STATS, LIVE_RESOLUTIONS } from '../../data/mockData';
import { IconRenderer } from '../common/IconRenderer';

export const StatsSection: React.FC = () => {
  const navigate = useNavigate();

  const statIcons = [
    <CheckCircle2 key="1" className="w-6 h-6 text-emerald-600" />,
    <Activity key="2" className="w-6 h-6 text-blue-600" />,
    <Users key="3" className="w-6 h-6 text-indigo-600" />,
    <Clock key="4" className="w-6 h-6 text-amber-600" />
  ];

  const statBg = [
    'bg-emerald-50 border-emerald-100 text-emerald-600',
    'bg-blue-50 border-blue-100 text-blue-600',
    'bg-indigo-50 border-indigo-100 text-indigo-600',
    'bg-amber-50 border-amber-100 text-amber-600'
  ];

  return (
    <section id="stats" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Public Accountability & Civic Transparency (Demo Metrics)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Measurable Impact Across All 48 Wards
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Every complaint is recorded in the demo system with geo-coordinates, verified photo closures, and citizen satisfaction ratings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/statistics')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs text-slate-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>View Full Analytics Dashboard →</span>
            </button>
          </div>
        </div>

        {/* 4 Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CIVIC_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              onClick={() => navigate('/statistics')}
              className="bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${statBg[idx]}`}>
                  {statIcons[idx]}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold text-slate-200">{stat.label}</p>
                <p className="text-xs text-slate-400 pt-1 leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Activity Feed Banner */}
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/80 flex-wrap gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Live Ward Activity & Recent Redressals (Simulated Feed)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time stream of municipal maintenance teams completing civic tasks
              </p>
            </div>
            <button
              onClick={() => navigate('/track/SC-2026-8942')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View Sample Resolution Report</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LIVE_RESOLUTIONS.map((res) => (
              <div
                key={res.id}
                onClick={() => navigate('/track/SC-2026-8942')}
                className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <IconRenderer name={res.icon} className="w-3.5 h-3.5 text-blue-400" />
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{res.timeAgo}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-2">
                  {res.text}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    {res.ward}
                  </span>
                  <span className="text-emerald-400 font-semibold">{res.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
