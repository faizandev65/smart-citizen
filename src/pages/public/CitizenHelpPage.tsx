import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  PhoneCall,
  Clock,
  AlertTriangle,
  FileQuestion
} from 'lucide-react';
import { CITIZEN_FAQS } from '../../data/mockData';

export const CitizenHelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = CITIZEN_FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const emergencyContacts = [
    { title: 'Disaster & Flooding Control', phone: '1800-233-0199', timing: '24x7 Helpline (Demo)' },
    { title: 'Water Main Leakage Cell', phone: '+91 22 2490 8801', timing: '24x7 Response Desk' },
    { title: 'Electrical Hazard Rapid Team', phone: '+91 22 2490 8802', timing: '24x7 Response Desk' },
    { title: 'Dead Animal Removal & Health', phone: '+91 22 2490 8803', timing: '06:00 AM - 10:00 PM' },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Citizen Support & Help Center (Demo Portal)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How Can We Help You Today?
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Find answers to common grievance questions, check Citizen Charter SLAs, or contact the simulated municipal helpdesk.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search help topics (e.g. tracking, reopen complaint, SLA, upload photo)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-xs"
            />
          </div>
        </div>

        {/* 2-Column Layout: FAQs on Left, Contact Helplines on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-blue-600" />
                Frequently Answered Questions
              </h3>
              <span className="text-xs text-slate-500">{filteredFaqs.length} Questions</span>
            </div>

            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
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

            {filteredFaqs.length === 0 && (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500 text-sm">No questions matched "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Emergency & Helpdesk Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Call Center Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">24x7 Citizen Call Centre (Demo)</h4>
                  <p className="text-xs text-slate-500">Toll-free phone grievance assistance</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-blue-700 uppercase">Demo Toll-Free</p>
                  <p className="text-lg font-extrabold text-blue-950">1800-233-0199</p>
                </div>
                <a
                  href="tel:18002330199"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Call Now
                </a>
              </div>

              <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 24 Hours / 365 Days
                </span>
                <span>Language: EN / Regional</span>
              </div>
            </div>

            {/* Emergency Numbers List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Department Rapid Desks (Demo)
              </h4>

              <div className="space-y-2.5">
                {emergencyContacts.map((contact) => (
                  <div key={contact.title} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-slate-800 text-xs">{contact.title}</h5>
                      <p className="text-[10px] text-slate-400">{contact.timing}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-600">{contact.phone}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
