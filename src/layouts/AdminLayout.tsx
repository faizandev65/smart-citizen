import React, { useState } from 'react';
import { NavLink, Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  FileSpreadsheet,
  Wrench,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/common/Avatar';

export const AdminLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { currentAdmin, isAdminAuthenticated, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  // Route protection: If not logged in as Admin, redirect to /admin/login
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const adminLinks = [
    { label: 'Admin Command Center', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Complaint Management', path: '/admin/complaints', icon: FileSpreadsheet },
    { label: 'Service Request Dispatch', path: '/admin/services', icon: Wrench },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Security Notice */}
      <div className="bg-slate-950 text-slate-400 text-xs py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold">Academic Major Project (Active Session)</span>
          <span className="text-slate-400 hidden sm:inline">
            &bull; <strong className="text-white">{currentAdmin?.fullName || 'Md Faizan Mustafa'}</strong> &bull; {currentAdmin?.role || 'Project Administrator'} &bull; {currentAdmin?.department || 'SmartCitizen — Academic Major Project'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link to="/citizen/dashboard" className="text-blue-400 hover:text-blue-300 font-semibold">
            Citizen Portal →
          </Link>
          <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-1">
            <span>Public Home</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-950 border-r border-slate-800 shrink-0">
          
          {/* Logo & Officer Info */}
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-extrabold text-base tracking-tight leading-tight">
                Admin<span className="text-indigo-400">Portal</span>
              </h2>
              <p className="text-[10px] text-indigo-300 uppercase tracking-wider font-semibold">
                Academic Project Console
              </p>
            </div>
          </div>

          {/* Department Capsule */}
          <div className="p-3.5 mx-3 my-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">PROJECT ADMINISTRATOR</span>
              <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Session
              </span>
            </div>
            
            <div className="flex items-center gap-2.5 pt-0.5">
              <Avatar
                name={currentAdmin?.fullName || 'Md Faizan Mustafa'}
                size="sm"
                className="ring-1 ring-indigo-500/50"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white text-xs truncate">{currentAdmin?.fullName || 'Md Faizan Mustafa'}</p>
                <p className="text-[10px] text-indigo-300 font-semibold truncate">SmartCitizen • Academic Project</p>
              </div>
            </div>

            <div className="pt-1.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="truncate">{currentAdmin?.department || 'SmartCitizen — Academic Major Project'}</span>
              <span className="font-mono text-[10px] text-slate-500 shrink-0">{currentAdmin?.badgeId || 'PROJ-ADM-2026'}</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto pt-2">
            {adminLinks.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Signout */}
          <div className="p-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 rounded-xl hover:bg-rose-950/30 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Admin Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-y-auto">
          
          {/* Header */}
          <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
                aria-label="Toggle navigation"
              >
                {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">ADMINISTRATOR DESK</p>
                <h1 className="text-base font-extrabold text-white">Grievance & Service Redressal Control Panel</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SLA Engine Live
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-800/60 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 text-xs font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          {/* Mobile Menu */}
          {isMobileSidebarOpen && (
            <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-1">
              {adminLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </NavLink>
                );
              })}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-slate-900 rounded-xl transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Admin Sign Out</span>
              </button>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
};
