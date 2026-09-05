import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  Search,
  Clock,
  Star,
  PlusCircle,
  Wrench,
  Filter
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import { IconRenderer } from '../../components/common/IconRenderer';
import { Button } from '../../components/common/Button';

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialCat = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Categories' },
    { id: 'roads', label: 'Roads & Footpaths' },
    { id: 'sanitation', label: 'Solid Waste' },
    { id: 'water', label: 'Water & Drains' },
    { id: 'electricity', label: 'Street Lights' },
    { id: 'infrastructure', label: 'Public Assets' },
    { id: 'health', label: 'Health & Vectors' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICE_CATEGORIES.filter((srv) => {
      const matchesCategory = activeCategory === 'all' || srv.category === activeCategory;
      const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            srv.popularIssues.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleTabChange = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Civic Service Directory (Demo Portal)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Municipal Services & Departments
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Browse all civic maintenance divisions. Lodge a formal grievance with photo verification or book on-demand municipal utility teams.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 mb-10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by keyword (e.g. pothole, garbage, streetlight, drain)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-all"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/submit-complaint')}
                icon={<PlusCircle className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                File Complaint
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigate('/request-service')}
                icon={<Wrench className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Book Service
              </Button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group"
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

                {/* Department & Title */}
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
                <div className="space-y-1.5 mb-6">
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

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 justify-center text-xs"
                  onClick={() => navigate(`/submit-complaint?category=${srv.id}`)}
                  icon={<PlusCircle className="w-3.5 h-3.5" />}
                >
                  Report Issue
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 justify-center text-xs"
                  onClick={() => navigate(`/request-service?type=${srv.id}`)}
                  icon={<Wrench className="w-3.5 h-3.5" />}
                >
                  Book Service
                </Button>
              </div>

            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching municipal services found</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              We couldn't find any services matching "{searchQuery}". Try selecting another category or clear the search.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            >
              Reset All Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};
