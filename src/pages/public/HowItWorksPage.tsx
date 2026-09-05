import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { IconRenderer } from '../../components/common/IconRenderer';
import { Button } from '../../components/common/Button';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  const slaTiers = [
    { priority: 'Emergency', time: 'Under 4 Hours', description: 'Water main bursts, fallen live electrical cables, open manholes', bg: 'bg-rose-50 text-rose-800 border-rose-200' },
    { priority: 'High Priority', time: '12 - 24 Hours', description: 'Overflowing neighborhood garbage, dark streetlights on main road', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
    { priority: 'Standard Civic', time: '24 - 48 Hours', description: 'Pothole repairs, stormwater drain choking, tree trimming', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
    { priority: 'Public Assets', time: '48 - 72 Hours', description: 'Park benches, bus shelters, children play equipment upkeep', bg: 'bg-slate-50 text-slate-800 border-slate-200' }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Citizen Charter & Operational Guide (Demo)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Civic Grievance Redressal Works
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Learn how the SmartCitizen portal processes your report from initial registration to verified resolution on ground.
          </p>
        </div>

        {/* 4 Steps In-Depth */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900">The 4-Step Lifecycle</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Every ticket follows a verified audit trail</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                      <IconRenderer name={step.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200">{step.step}</span>
                  </div>

                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Stage {idx + 1}
                  </span>
                  <span>100% Digital</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Standards Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Citizen Charter SLA Targets (Demo)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Guaranteed maximum resolution timeframes by issue priority</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
              Simulated SLA Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {slaTiers.map((tier) => (
              <div key={tier.priority} className={`rounded-xl border p-4 space-y-2 ${tier.bg}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider">{tier.priority}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-white/80 shadow-2xs">{tier.time}</span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Have a civic issue to report right now?</h3>
            <p className="text-blue-100 text-sm max-w-lg">
              Submit your complaint with photos and simulated GPS coordinates in under 60 seconds.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="white"
              size="lg"
              onClick={() => navigate('/submit-complaint')}
              icon={<ArrowRight className="w-4 h-4 text-blue-700" />}
              iconPosition="right"
              className="font-bold text-blue-700 shadow-md cursor-pointer"
            >
              Report Grievance
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
