import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, ChevronRight, X } from 'lucide-react';
import { CITY_NOTICES } from '../../data/mockData';

export const EmergencyTicker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  if (!isVisible) return null;

  const currentNotice = CITY_NOTICES[currentNoticeIndex];

  const handleNextNotice = () => {
    setCurrentNoticeIndex((prev) => (prev + 1) % CITY_NOTICES.length);
  };

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Live Ticker */}
        <div className="flex items-center gap-2.5 overflow-hidden w-full sm:w-auto">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30 text-[11px] shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            {currentNotice.tag.toUpperCase()}
          </span>
          <p className="truncate text-slate-300 hover:text-white transition-colors cursor-pointer text-xs" onClick={handleNextNotice}>
            {currentNotice.title}
          </p>
          <button
            onClick={handleNextNotice}
            className="text-slate-400 hover:text-slate-200 shrink-0 hidden md:inline-flex items-center text-[11px] gap-0.5 ml-1 cursor-pointer"
            title="Next Notice"
          >
            Next <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right: Helplines and Ward Quick Access */}
        <div className="flex items-center gap-4 text-slate-300 shrink-0 text-xs">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Control Room: <strong className="text-white font-medium">Active (24x7)</strong></span>
          </div>
          
          <div className="h-3 w-px bg-slate-700 hidden lg:block" />

          <a
            href="tel:18002330199"
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Toll-Free: 1800-233-0199</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-slate-300 p-0.5 rounded transition-colors cursor-pointer"
            aria-label="Dismiss notice bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
