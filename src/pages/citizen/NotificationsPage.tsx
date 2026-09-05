import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useData } from '../../context/DataContext';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAllNotificationsRead, toggleNotificationRead } = useData();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = notifications.filter(
    n => filter === 'all' || !n.isRead
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notifications & Alerts
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Real-time status updates, field officer notes, and municipal bulletins
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsRead}
            icon={<Check className="w-3.5 h-3.5" />}
            className="cursor-pointer"
          >
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            filter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            filter === 'unread' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          Unread ({notifications.filter(n => !n.isRead).length})
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              notif.isRead
                ? 'bg-white border-slate-200'
                : 'bg-blue-50/50 border-blue-200 shadow-xs'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                notif.type === 'status_update'
                  ? 'bg-emerald-100 text-emerald-700'
                  : notif.type === 'service_alert'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {notif.type === 'status_update' ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                <p className="text-[10px] text-slate-400 pt-1">{notif.timestamp}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              {notif.relatedTicketId && (
                <button
                  onClick={() => navigate(`/citizen/complaints/${notif.relatedTicketId}`)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Ticket</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={() => toggleNotificationRead(notif.id)}
                className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {notif.isRead ? 'Mark unread' : 'Mark read'}
              </button>
            </div>
          </div>
        ))}

        {filteredNotifs.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">No unread notifications</p>
            <p className="text-xs text-slate-400 mt-0.5">You're all caught up with municipal updates.</p>
          </div>
        )}
      </div>

    </div>
  );
};
