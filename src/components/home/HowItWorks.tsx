import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { IconRenderer } from '../common/IconRenderer';
import { Button } from '../common/Button';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Fast & Transparent 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Civic Redressal Works
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            From registration to verified closure, experience a transparent and tech-driven municipal grievance lifecycle designed for every citizen.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-emerald-300 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((stepItem, idx) => (
              <div
                key={stepItem.step}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconRenderer name={stepItem.icon} className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-blue-500/30 transition-colors">
                      {stepItem.step}
                    </span>
                  </div>

                  {/* Subtitle & Title */}
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    {stepItem.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {stepItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Automated Log
                  </span>
                  <span className="text-blue-600 font-bold">Step {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-blue-600/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to report a civic issue in your neighborhood?
            </h3>
            <p className="text-blue-100 text-sm max-w-xl">
              No long queues or office visits. Submit your issue in under 60 seconds with instant photo upload.
            </p>
          </div>
          
          <Button
            variant="white"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-blue-700" />}
            iconPosition="right"
            onClick={() => navigate('/submit-complaint')}
            className="shrink-0 font-bold text-blue-700 hover:text-blue-800 shadow-lg cursor-pointer"
          >
            Report Issue Now
          </Button>
        </div>

      </div>
    </section>
  );
};
