import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Building2,
  Menu,
  X,
  Search,
  PlusCircle,
  LogIn,
  UserPlus,
  ChevronRight,
  Globe,
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'HI'>('EN');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'City Stats', path: '/statistics' },
    { label: 'Citizen Help', path: '/help' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-sm py-2.5' : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Civic Branding */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Smart<span className="text-blue-600">Citizen</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  DEMO PORTAL
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase hidden sm:block">
                Complaint & Service Request System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            <NavLink
              to="/track"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ml-1 ${
                  isActive
                    ? 'text-blue-700 bg-blue-100 font-bold'
                    : 'text-blue-700 bg-blue-50/70 hover:bg-blue-100/70'
                }`
              }
            >
              <Search className="w-4 h-4 text-blue-600" />
              Track Complaint
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Toggle */}
            <button
              onClick={() => setSelectedLanguage(selectedLanguage === 'EN' ? 'HI' : 'EN')}
              className="px-2 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              title="Change Language (Demo)"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedLanguage}</span>
            </button>

            {/* Quick Link to Citizen Dashboard */}
            <Link to="/citizen/dashboard">
              <Button
                variant="ghost"
                size="sm"
                icon={<LayoutDashboard className="w-4 h-4 text-slate-500" />}
                className="hidden xl:inline-flex text-xs"
              >
                Citizen Portal
              </Button>
            </Link>

            {/* Auth Links */}
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                icon={<LogIn className="w-4 h-4" />}
              >
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button
                variant="outline"
                size="sm"
                icon={<UserPlus className="w-4 h-4" />}
              >
                Register
              </Button>
            </Link>

            {/* Primary Action CTA */}
            <Link to="/submit-complaint">
              <Button
                variant="primary"
                size="sm"
                icon={<PlusCircle className="w-4 h-4" />}
                className="hidden md:inline-flex shadow-blue-500/25"
              >
                Report Issue
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              to="/track"
              className="p-2 text-blue-600 bg-blue-50 rounded-lg cursor-pointer"
              aria-label="Track complaint"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </NavLink>
            ))}

            <NavLink
              to="/track"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Track Complaint
              </span>
              <ChevronRight className="w-4 h-4 text-blue-400" />
            </NavLink>

            <div className="my-2 border-t border-slate-100 pt-3 flex flex-col gap-2">
              <Link to="/submit-complaint" className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  icon={<PlusCircle className="w-4 h-4" />}
                >
                  Register a Complaint
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <Link to="/login" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                    icon={<LogIn className="w-4 h-4" />}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                    icon={<UserPlus className="w-4 h-4" />}
                  >
                    Register
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                <Link
                  to="/citizen/dashboard"
                  className="p-2 rounded-lg bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 flex items-center justify-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                  Citizen Portal
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="p-2 rounded-lg bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
