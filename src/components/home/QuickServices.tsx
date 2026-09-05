import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  FileSpreadsheet,
  Search,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

export const QuickServices: React.FC = () => {
  const navigate = useNavigate();

  const quickCards = [
    {
      id: 'report-problem',
      title: 'Report a Problem',
      subtitle: 'Public Grievance Redressal',
      description: 'Report road potholes, overflowing garbage, broken streetlights, or sewage blocks with photos and GPS tagging.',
      icon: <AlertTriangle className="w-6 h-6 text-blue-600" />,
      bgIcon: 'bg-blue-50 border-blue-100 text-blue-600',
      badge: 'SLA: 24-48 Hours',
      badgeVariant: 'bg-blue-50 text-blue-700 border-blue-200',
      actionText: 'Register Grievance',
      onClick: () => navigate('/submit-complaint'),
      gradient: 'group-hover:border-blue-400 group-hover:shadow-blue-500/10'
    },
    {
      id: 'request-service',
      title: 'Request a Service',
      subtitle: 'Municipal Services Booking',
      description: 'Book municipal tree pruning, anti-larval mosquito spray, septic tank vacuuming, or urgent water tankers.',
      icon: <FileSpreadsheet className="w-6 h-6 text-indigo-600" />,
      bgIcon: 'bg-indigo-50 border-indigo-100 text-indigo-600',
      badge: 'Direct Booking',
      badgeVariant: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      actionText: 'Request Service',
      onClick: () => navigate('/request-service'),
      gradient: 'group-hover:border-indigo-400 group-hover:shadow-indigo-500/10'
    },
    {
      id: 'track-complaint',
      title: 'Track Complaint',
      subtitle: 'Real-time Token Redressal',
      description: 'Check status of your registered grievance with live nodal officer timeline, inspection logs, and photos.',
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      bgIcon: 'bg-emerald-50 border-emerald-100 text-emerald-600',
      badge: 'Live Status',
      badgeVariant: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      actionText: 'Track Status',
      onClick: () => navigate('/track'),
      gradient: 'group-hover:border-emerald-400 group-hover:shadow-emerald-500/10'
    },
    {
      id: 'emergency-help',
      title: 'Emergency Help',
      subtitle: '24x7 Control Room Hotlines',
      description: 'Immediate municipal response for critical hazards: road cave-ins, water main bursts, and exposed live electric wires.',
      icon: <PhoneCall className="w-6 h-6 text-rose-600" />,
      bgIcon: 'bg-rose-50 border-rose-100 text-rose-600',
      badge: '24x7 Rapid Call',
      badgeVariant: 'bg-rose-50 text-rose-700 border-rose-200',
      actionText: 'Emergency Helpdesk',
      onClick: () => navigate('/help'),
      gradient: 'group-hover:border-rose-400 group-hover:shadow-rose-500/10'
    }
  ];

  return (
    <section className="relative py-12 -mt-8 sm:-mt-12 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Can We Assist You Today?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Select a service category below for fast civic redressal and municipal assistance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickCards.map((card) => (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`group relative bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between ${card.gradient}`}
            >
              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 duration-200 ${card.bgIcon}`}>
                    {card.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${card.badgeVariant}`}>
                    {card.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {card.subtitle}
                </p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5 mb-2.5">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action Button Link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-blue-600 group-hover:text-blue-700">
                <span>{card.actionText}</span>
                <span className="w-7 h-7 rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
