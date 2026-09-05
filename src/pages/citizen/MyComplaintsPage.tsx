import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  PlusCircle,
  Clock,
  CheckCircle2,
  MapPin,
  ChevronRight,
  User
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const MyComplaintsPage: React.FC = () => {
  const navigate = useNavigate();
  const { complaints } = useData();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statusTabs = [
    { id: 'all', label: 'All Complaints' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Officer Assigned', label: 'Assigned' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Resolved', label: 'Resolved' },
  ];

  // Show complaints: user's submitted complaints first, or all complaints if user is in demo mode
  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Submitted Complaints
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Track real-time inspection progress, officer logs, and resolution proof
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/citizen/submit-complaint')}
          icon={<PlusCircle className="w-4 h-4" />}
          className="self-start sm:self-auto shadow-blue-600/20 cursor-pointer"
        >
          Lodge New Complaint
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Ticket ID, Subject, or Location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {statusTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            onClick={() => navigate(`/citizen/complaints/${complaint.id}`)}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {complaint.id}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{complaint.categoryName}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    complaint.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {complaint.priority} Priority
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors pt-1">
                  {complaint.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{complaint.description}</p>
              </div>

              <div className="self-start sm:self-auto shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                  complaint.status === 'Resolved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : complaint.status === 'In Progress'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-sky-50 text-sky-700 border border-sky-200'
                }`}>
                  {complaint.status === 'Resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {complaint.status === 'In Progress' && <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                  <span>{complaint.status}</span>
                </span>
              </div>
            </div>

            {/* Meta Row */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {complaint.location}
                </span>
                {complaint.assignedOfficer && (
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    {complaint.assignedOfficer.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                <span>View Full Timeline & Photos</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}

        {filteredComplaints.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No complaints match your selection</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or filter to view all grievances.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
