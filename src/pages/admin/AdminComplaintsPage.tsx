import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  MapPin,
  Eye
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';
import type { Complaint, ComplaintStatus } from '../../types';

export const AdminComplaintsPage: React.FC = () => {
  const { complaints, updateComplaintStatus } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [modalStatus, setModalStatus] = useState<ComplaintStatus>('Submitted');
  const [modalOfficer, setModalOfficer] = useState<string>('Er. Rajesh Kumar');
  const [modalNote, setModalNote] = useState<string>('');

  const openInspector = (c: Complaint) => {
    setSelectedComplaint(c);
    setModalStatus(c.status);
    setModalOfficer(c.assignedOfficer?.name || 'Er. Rajesh Kumar');
    setModalNote('');
  };

  const handleStatusChange = (id: string, newStatus: ComplaintStatus, officerName?: string, officerNote?: string) => {
    updateComplaintStatus(id, newStatus, officerName, officerNote);
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    handleStatusChange(selectedComplaint.id, modalStatus, modalOfficer.trim() || undefined, modalNote.trim() || undefined);
    setSelectedComplaint(null);
  };

  const filtered = complaints.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Grievance Redressal Management
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Triage, assign municipal field officers, update status logs, and audit resolution proofs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
            Total Tickets: {filtered.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-4 space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Ticket ID, Citizen Name, Issue, or Location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option value="all">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Officer Assigned">Officer Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <option value="all">All Departments</option>
              <option value="roads">Roads & Streets</option>
              <option value="sanitation">Garbage & Sanitation</option>
              <option value="water">Water & Drainage</option>
              <option value="electricity">Streetlights</option>
              <option value="infrastructure">Infrastructure</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); }}
              className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 text-xs"
            >
              Reset
            </Button>
          </div>

        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 text-xs uppercase font-bold border-b border-slate-700">
              <tr>
                <th className="py-4 px-5">Ticket ID</th>
                <th className="py-4 px-5">Subject / Location</th>
                <th className="py-4 px-5">Department</th>
                <th className="py-4 px-5">Citizen & Ward</th>
                <th className="py-4 px-5">Priority</th>
                <th className="py-4 px-5">Status (Demo Update)</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-indigo-400">
                    {c.id}
                  </td>
                  <td className="py-4 px-5 max-w-xs">
                    <p className="font-bold text-slate-200 truncate">{c.title}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                      {c.location}
                    </p>
                  </td>
                  <td className="py-4 px-5 text-xs text-slate-300">
                    {c.categoryName}
                  </td>
                  <td className="py-4 px-5">
                    <p className="font-semibold text-slate-200">{c.citizenName}</p>
                    <p className="text-[11px] text-slate-400">{c.ward}</p>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.priority === 'High' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-900 text-slate-400 border border-slate-700'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value as ComplaintStatus)}
                      className={`text-xs font-bold rounded-lg px-2.5 py-1 border cursor-pointer ${
                        c.status === 'Resolved'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : c.status === 'In Progress'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Officer Assigned">Officer Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => openInspector(c)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-indigo-500/30"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-bold text-slate-300">No complaints match your filters</p>
            <p className="text-xs text-slate-500 mt-0.5">Try resetting search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Comprehensive Inspector & Action Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs" onClick={() => setSelectedComplaint(null)} />
          <div className="relative w-full max-w-xl bg-slate-900 rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl z-10 space-y-5 text-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-400">{selectedComplaint.id}</span>
                <h3 className="text-lg font-bold text-white">{selectedComplaint.title}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedComplaint.status === 'Resolved' || selectedComplaint.status === 'Closed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}>
                {selectedComplaint.status}
              </span>
            </div>

            <div className="text-xs space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p><strong>Department:</strong> {selectedComplaint.categoryName}</p>
              <p><strong>Citizen:</strong> {selectedComplaint.citizenName}</p>
              <p><strong>Location:</strong> {selectedComplaint.location} ({selectedComplaint.ward})</p>
              <p><strong>Submitted:</strong> {selectedComplaint.submittedAt}</p>
              <p className="text-slate-300 pt-1"><strong>Description:</strong> {selectedComplaint.description}</p>
            </div>

            {/* Management Form */}
            <form onSubmit={handleModalSave} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Update Status
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as ComplaintStatus)}
                    className="w-full text-xs font-bold rounded-xl px-3 py-2 bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
                  >
                    <option value="Submitted">Submitted (Under Triage)</option>
                    <option value="Officer Assigned">Officer Assigned</option>
                    <option value="In Progress">In Progress (Field Work)</option>
                    <option value="Resolved">Resolved (Photo Verified)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Assigned Field Officer
                  </label>
                  <input
                    type="text"
                    value={modalOfficer}
                    onChange={(e) => setModalOfficer(e.target.value)}
                    placeholder="e.g. Er. Rajesh Kumar"
                    className="w-full text-xs rounded-xl px-3 py-2 bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Nodal Inspection / Resolution Note (Visible to Citizen)
                </label>
                <input
                  type="text"
                  value={modalNote}
                  onChange={(e) => setModalNote(e.target.value)}
                  placeholder="e.g. Field crew dispatched for on-site resurfacing."
                  className="w-full text-xs rounded-xl px-3 py-2 bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedComplaint(null)}
                  className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 cursor-pointer text-xs"
                  >
                    Save & Update Status
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
