import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Activity,
  Award,
  Zap,
  Droplets,
  Hammer
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const HeroSection: React.FC = () => {
  const [ticketInput, setTicketInput] = useState('');
  const navigate = useNavigate();

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketInput.trim()) {
      navigate(`/track/${encodeURIComponent(ticketInput.trim())}`);
    } else {
      navigate('/track/SC-2026-8942');
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28 civic-hero-gradient">
      {/* Background Decorative Blur & Grid */}
      <div className="absolute inset-0 civic-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description, CTAs & Quick Search */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Civic Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-blue-900 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span>Smart City 2026 Grievance & Redressal Initiative (Demo)</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Empowering Citizens, <br />
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Transforming Our City.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A modern, transparent, and direct bridge between residents and municipal departments. Report civic issues in under 60 seconds with geo-tagging, track SLA resolution in real-time, and rate service delivery.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                icon={<PlusCircle className="w-5 h-5" />}
                onClick={() => navigate('/submit-complaint')}
                className="w-full sm:w-auto shadow-blue-600/30 cursor-pointer"
              >
                Register a Complaint
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={<Clock className="w-5 h-5 text-blue-600" />}
                onClick={() => navigate('/track')}
                className="w-full sm:w-auto hover:bg-blue-50/50 cursor-pointer"
              >
                Track Status by Ticket ID
              </Button>
            </div>

            {/* Quick Ticket Search Box */}
            <div className="pt-3 max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleQuickTrackSubmit} className="relative flex items-center shadow-lg shadow-slate-200/60 rounded-2xl bg-white border border-slate-200 p-1.5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                <div className="pl-3.5 pr-2 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Ticket ID (e.g. SC-2026-8942)"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  className="w-full py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none uppercase font-mono font-medium"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="shrink-0 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  Track Now
                </Button>
              </form>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-2 flex items-center justify-center lg:justify-start gap-1.5">
                <span>Try sample demo tickets:</span>
                <button
                  type="button"
                  onClick={() => navigate('/track/SC-2026-8942')}
                  className="font-medium text-blue-600 hover:underline cursor-pointer"
                >
                  SC-2026-8942 (Resolved)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => navigate('/track/SC-2026-9104')}
                  className="font-medium text-blue-600 hover:underline cursor-pointer"
                >
                  SC-2026-9104 (In Progress)
                </button>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Geo-Tagged Transparency</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Strict 24-48h SLA Charter</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Direct Officer Escalation</span>
              </div>
            </div>

          </div>

          {/* Right Column: Smart Civic Telemetry & Live Resolution Visual */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-600 rounded-3xl opacity-20 blur-lg" />

              {/* Main Hub Card */}
              <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-6 sm:p-7 shadow-2xl shadow-blue-900/10 space-y-5">
                
                {/* Hub Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">City Redressal Grid</h3>
                      <p className="text-[11px] text-slate-500">Live Simulated Stream • 48 Wards</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm" dot>
                    Demo Mode Active
                  </Badge>
                </div>

                {/* Live Resolution Feature Highlight */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/40 p-4 border border-blue-100/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> Latest Verified Redressal
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">18 mins ago</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Main Water Supply Pipeline Leakage Repaired
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      Ward 18, Lakeview Cross Rd • Er. Ramesh Deshmukh
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Closed in 14.5 Hrs
                    </span>
                    <button
                      onClick={() => navigate('/track/SC-2026-8942')}
                      className="text-blue-600 font-bold hover:underline flex items-center gap-0.5 text-xs cursor-pointer"
                    >
                      View Ticket <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Quick Interactive Telemetry Items */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Hammer className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Roads & Potholes</p>
                        <p className="text-[11px] text-slate-500">42 simulated teams</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">98.2% SLA</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Street Lighting Network</p>
                        <p className="text-[11px] text-slate-500">2,410 Smart Poles</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">Optimal (99.4%)</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Water Supply & Sewerage</p>
                        <p className="text-[11px] text-slate-500">18 Ward Hotlines</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">SLA 24 Hrs</span>
                  </div>
                </div>

                {/* Footer Callout */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>Major Project Architecture</span>
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Civic Tech Redressal System
                  </span>
                </div>

              </div>

              {/* Floating Stat Pill 1 */}
              <div className="hidden sm:flex absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 px-3.5 items-center gap-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">Resolved Today (Demo)</p>
                  <p className="text-xs font-bold text-slate-900">418 Civic Issues</p>
                </div>
              </div>

              {/* Floating Stat Pill 2 */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-slate-900 text-white rounded-2xl shadow-2xl py-2 px-3.5 items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Average Response</p>
                  <p className="text-xs font-bold text-white">Under 28.5 Hours</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
