import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Star,
  Search,
  Building
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import { IconRenderer } from '../common/IconRenderer';
import { Button } from '../common/Button';

export const PopularServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filterTabs = [
    { id: 'all', label: 'All Services' },
    { id: 'roads', label: 'Roads & Footpaths' },
    { id: 'sanitation', label: 'Solid Waste' },
    { id: 'water', label: 'Water & Drains' },
    { id: 'electricity', label: 'Street Lights' },
    { id: 'infrastructure', label: 'Public Assets' },
    { id: 'health', label: 'Health & Vectors' },
  ];

  const filteredServices = SERVICE_CATEGORIES.filter((srv) => {
    const matchesTab = activeTab === 'all' || srv.category === activeTab;
    const matchesSearch = srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          srv.popularIssues.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70 text-xs font-semibold">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Municipal Departments Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular Civic Services & Grievance Wings
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Find the right municipal division for prompt grievance redressal and service booking. All requests comply with the demo service SLA.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full lg:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. pothole)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white border border-blue-100 flex items-center justify-center transition-all duration-200 shadow-xs">
                    <IconRenderer name={srv.icon} className="w-6 h-6" />
                  </div>
                  
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-blue-600" />
                      SLA: {srv.slaHours}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {srv.avgRating} Satisfaction
                    </p>
                  </div>
                </div>

                {/* Title & Department */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {srv.title}
                </h3>
                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wide mb-3">
                  {srv.department}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {srv.description}
                </p>

                {/* Popular Tags */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Common Grievance Types:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {srv.popularIssues.map((issue) => (
                      <span
                        key={issue}
                        className="text-[11px] bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200/70 px-2 py-0.5 rounded-md transition-colors"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all font-semibold cursor-pointer"
                  onClick={() => navigate(`/submit-complaint?category=${srv.id}`)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Report in this Department
                </Button>
              </div>

            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-semibold text-sm">No municipal services match "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
              className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
