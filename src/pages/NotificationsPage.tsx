import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useNotificationContext } from '../context/NotificationContext';
import { formatDateString } from '../math/dateUtils';
import { Bell, CheckCheck, Trash2, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotificationContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications Center"
        description="Local system alerts, upcoming bill due notifications, and budget threshold warnings."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={<CheckCheck className="h-4 w-4" />} onClick={markAllAsRead}>
              Mark All Read
            </Button>
            <Button variant="danger" size="sm" icon={<Trash2 className="h-4 w-4" />} onClick={clearAll}>
              Clear All
            </Button>
          </div>
        }
      />

      <Card>
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Bell className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            <p>No notifications to display.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start justify-between py-4 px-2 transition-colors ${
                  !notif.isRead ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {notif.severity === 'DANGER' && <AlertTriangle className="h-5 w-5 text-red-600" />}
                    {notif.severity === 'WARNING' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                    {notif.severity === 'SUCCESS' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                    {notif.severity === 'INFO' && <Info className="h-5 w-5 text-sky-500" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${!notif.isRead ? 'text-brand-900 dark:text-brand-300' : 'text-slate-800 dark:text-slate-200'}`}>
                      {notif.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{notif.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{formatDateString(notif.timestamp)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {notif.linkUrl && (
                    <Button variant="ghost" size="sm" onClick={() => navigate(notif.linkUrl!)}>
                      View
                    </Button>
                  )}
                  {!notif.isRead && (
                    <Button variant="secondary" size="sm" onClick={() => markAsRead(notif.id)}>
                      Mark Read
                    </Button>
                  )}
                  <button onClick={() => deleteNotification(notif.id)} className="p-1 text-slate-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
