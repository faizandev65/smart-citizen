import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  PhoneCall,
  Mail,
  MapPin,
  ArrowUp,
  Radio,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../data/mockData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency Contacts Bar (Demo) */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 mb-14 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                  24x7 Civic Emergency & Rapid Response (Demo Hotline)
                </h4>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                  Simulated dispatch unit for hazardous road cave-ins, water pipeline bursts & fallen live wires.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <a
                href="tel:18002330199"
                className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-lg shadow-rose-600/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Demo Helpline: 1800-233-0199</span>
              </a>
              
              <Link
                to="/submit-complaint"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Report Emergency Issue</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Academic Project Context */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Smart<span className="text-blue-400">Citizen</span>
                </span>
                <p className="text-[11px] text-slate-400 tracking-wider uppercase">
                  Civic-Tech Complaint & Service System
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              A comprehensive major project prototype demonstrating a modern citizen-government interface for transparent grievance redressal, real-time SLA tracking, and digital municipal workflows.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Major Academic Project • Frontend & UI Architecture
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-400 pt-3">
              <span className="text-xs">Project Demo Portals:</span>
              <Link to="/citizen/dashboard" className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-800 text-xs font-semibold transition-colors">Citizen</Link>
              <Link to="/admin/dashboard" className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-indigo-600 hover:text-white border border-slate-800 text-xs font-semibold transition-colors">Admin</Link>
            </div>
          </div>

          {/* Col 3: Popular Municipal Services */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Municipal Services
            </h5>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_CATEGORIES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services?category=${srv.id}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{srv.title}</span>
                    <span className="text-slate-600 group-hover:text-blue-400 transition-colors text-xs">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Citizen Quick Access */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Citizen Portal
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/track" className="hover:text-blue-400 transition-colors">
                  Track Complaint Status
                </Link>
              </li>
              <li>
                <Link to="/submit-complaint" className="hover:text-blue-400 transition-colors">
                  Register New Grievance
                </Link>
              </li>
              <li>
                <Link to="/request-service" className="hover:text-blue-400 transition-colors">
                  Request Municipal Service
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-blue-400 transition-colors">
                  How It Works & SLA
                </Link>
              </li>
              <li>
                <Link to="/statistics" className="hover:text-blue-400 transition-colors">
                  City Statistics (Demo)
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-blue-400 transition-colors">
                  Citizen Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Demo Office & Contact Information */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Demo Headquarters
            </h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Smart City Demonstration Center, Ward 01, Academic Campus - 400001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
                <span>1800-233-0199 (Demo Toll-Free)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@smartcitizen.demo</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>System Architecture v2.0</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Demo Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SmartCitizen Major Project. Designed for demonstration and academic assessment.</p>

          <div className="flex items-center gap-6">
            <Link to="/help" className="hover:text-slate-400 transition-colors">Help Center</Link>
            <Link to="/how-it-works" className="hover:text-slate-400 transition-colors">Process Guide</Link>
            <Link to="/statistics" className="hover:text-slate-400 transition-colors">Analytics</Link>
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
