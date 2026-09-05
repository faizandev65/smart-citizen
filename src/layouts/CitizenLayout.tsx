import React, { useState } from 'react';
import { NavLink, Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Wrench,
  PlusCircle,
  Bell,
  User,
  LogOut,
  Building2,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Avatar } from '../components/common/Avatar';

export const CitizenLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { currentCitizen, logoutCitizen } = useAuth();
  const { notifications } = useData();
  const navigate = useNavigate();

  // If no demo session exists, redirect to login
  if (!currentCitizen) {
    return <Navigate to="/login" replace />;
  }

  const unreadNotifs = notifications.filter(n => !n.isRead).length;

  const sidebarLinks = [
    { label: 'Dashboard Overview', path: '/citizen/dashboard', icon: LayoutDashboard },
    { label: 'My Complaints', path: '/citizen/complaints', icon: FileText },
    { label: 'My Service Requests', path: '/citizen/services', icon: Wrench },
    { label: 'Submit New Complaint', path: '/citizen/submit-complaint', icon: PlusCircle },
    { label: 'Request a Service', path: '/citizen/request-service', icon: Wrench },
    { label: 'Notifications', path: '/citizen/notifications', icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : undefined },
    { label: 'My Profile', path: '/citizen/profile', icon: User },
  ];

  const handleLogout = () => {
    logoutCitizen();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      
      {/* Top Demo Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="font-semibold text-white">Citizen Dashboard (Demo Mode)</span>
          <span className="text-slate-400 hidden sm:inline">• Logged in as: {currentCitizen.fullName}</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link to="/" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
            <span>Public Portal</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link to="/admin/login" className="text-slate-400 hover:text-white transition-colors">
            Officer Portal →
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
          
          {/* Brand Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-white font-extrabold text-base tracking-tight leading-tight">
                Smart<span className="text-blue-400">Citizen</span>
              </h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Citizen Portal
              </p>
            </div>
          </div>

          {/* User Preview Capsule */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-3">
            <Avatar
              name={currentCitizen.fullName}
              src={currentCitizen.avatarUrl}
              size="md"
              shape="rounded"
              className="border border-blue-400/40"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{currentCitizen.fullName}</h4>
              <p className="text-[10px] text-slate-400 truncate">{currentCitizen.ward}</p>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Verified Resident
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto pt-2">
            {sidebarLinks.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Help & Logout */}
          <div className="p-3 border-t border-slate-800 space-y-1">
            <Link
              to="/help"
              className="flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Grievance FAQ</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 rounded-xl hover:bg-rose-950/30 transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out (Demo)</span>
            </button>
          </div>
        </aside>

        {/* Mobile Header & Content Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Main Top Header */}
          <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
            
            {/* Mobile Hamburger & Page Context */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                aria-label="Toggle navigation"
              >
                {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="hidden sm:block">
                <p className="text-xs text-slate-500 font-medium">Citizen Dashboard</p>
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Welcome, {currentCitizen.fullName}
                </h1>
              </div>
            </div>

            {/* Top Right Quick Actions */}
            <div className="flex items-center gap-3">
              <Link to="/citizen/submit-complaint" className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Complaint</span>
              </Link>

              <Link
                to="/citizen/notifications"
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
                title="View Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                )}
              </Link>

              <Link
                to="/citizen/profile"
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                title="Manage Profile"
              >
                <Avatar
                  name={currentCitizen.fullName}
                  src={currentCitizen.avatarUrl}
                  size="sm"
                  shape="rounded"
                />
              </Link>
            </div>
          </header>

          {/* Mobile Drawer */}
          {isMobileSidebarOpen && (
            <div className="lg:hidden bg-slate-900 text-slate-300 border-b border-slate-800 p-4 space-y-1 animate-in slide-in-from-top-2">
              {sidebarLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </NavLink>
                );
              })}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-rose-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* Page Content Outlet */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
};
