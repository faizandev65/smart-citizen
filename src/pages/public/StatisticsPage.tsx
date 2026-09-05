import React from 'react';
import {
  Activity,
  MapPin
} from 'lucide-react';
import { CIVIC_STATS, SERVICE_CATEGORIES } from '../../data/mockData';
import { IconRenderer } from '../../components/common/IconRenderer';

export const StatisticsPage: React.FC = () => {
  const wardRankings = [
    { ward: 'Ward 14 - North Central', total: '3,840', resolved: '3,710', rate: '96.6%', avgTime: '22 Hrs', status: 'Optimal' },
    { ward: 'Ward 08 - Heritage Core', total: '2,920', resolved: '2,810', rate: '96.2%', avgTime: '24 Hrs', status: 'Optimal' },
    { ward: 'Ward 22 - Green Valley East', total: '2,150', resolved: '2,040', rate: '94.8%', avgTime: '28 Hrs', status: 'Optimal' },
    { ward: 'Ward 31 - Tech Park Zone', total: '4,100', resolved: '3,890', rate: '94.8%', avgTime: '26 Hrs', status: 'Optimal' },
    { ward: 'Ward 48 - South Hills Suburban', total: '1,980', resolved: '1,840', rate: '92.9%', avgTime: '32 Hrs', status: 'Attention' },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulated Municipal Transparency Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            City Performance & Civic Statistics
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real-time analytics and resolution trends across all 48 municipal wards. All metrics represent simulated major project demonstration data.
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CIVIC_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 uppercase">{stat.label}</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Department Resolution Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Department Resolution Efficiency (Demo SLA)</h3>
            <p className="text-xs text-slate-500 mt-0.5">Percentage of grievances resolved within promised Citizen Charter timeframe</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_CATEGORIES.map((cat, idx) => {
              const rates = [96.4, 94.2, 98.1, 95.8, 92.4, 97.2];
              const rate = rates[idx % rates.length];
              return (
                <div key={cat.id} className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <IconRenderer name={cat.icon} className="w-4 h-4 text-blue-600" />
                      {cat.title}
                    </span>
                    <span className="font-black text-blue-700">{rate}% On-Time</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>SLA Target: {cat.slaHours}</span>
                    <span className="text-emerald-700 font-semibold">★ {cat.avgRating} Satisfaction</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ward Leaderboard Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Ward Redressal Performance (Sample Dataset)</h3>
              <p className="text-xs text-slate-500">Live operational rankings based on ticket turnaround times</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
              48 Total Wards Simulated
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Ward / Zone</th>
                  <th className="py-3.5 px-6">Total Logged</th>
                  <th className="py-3.5 px-6">Resolved</th>
                  <th className="py-3.5 px-6">Resolution Rate</th>
                  <th className="py-3.5 px-6">Avg Turnaround</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wardRankings.map((row) => (
                  <tr key={row.ward} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      {row.ward}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{row.total}</td>
                    <td className="py-4 px-6 font-semibold text-emerald-700">{row.resolved}</td>
                    <td className="py-4 px-6 font-bold text-blue-700">{row.rate}</td>
                    <td className="py-4 px-6 text-slate-600">{row.avgTime}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        row.status === 'Optimal'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
