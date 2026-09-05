import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Clock
} from 'lucide-react';
import { CITIZEN_FAQS } from '../../data/mockData';

interface CitizenFaqSectionProps {
  onOpenReportModal?: () => void;
}

export const CitizenFaqSection: React.FC<CitizenFaqSectionProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Helpdesk Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Citizen Assistance & Support</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Everything you need to know about registering grievances, SLA timelines, and citizen rights under the Municipal Charter.
              </p>
            </div>

            {/* Assistance Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-blue-600" />
                Need Immediate Personal Assistance?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our 24x7 Citizen Call Centre assists non-digital citizens in lodging grievances over the phone in multiple regional languages.
              </p>

              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-blue-700 uppercase">Toll-Free Helpline</p>
                  <p className="text-base font-extrabold text-blue-950">1800-233-0199</p>
                </div>
                <a
                  href="tel:18002330199"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  Call Now
                </a>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Operational 24 Hours / 365 Days
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3.5">
            {CITIZEN_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className={`w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
