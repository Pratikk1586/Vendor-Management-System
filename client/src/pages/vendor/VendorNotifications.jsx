/**
 * @fileoverview Vendor Notifications listing view, synced statefully with useNotificationStore.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Eye, AlertCircle, FileText, Award } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

export default function VendorNotifications() {
  const navigate = useNavigate();
  const { notifications, setNotifications, markRead, markAllRead } = useNotificationStore();

  // Populate mock notifications if store is empty
  useEffect(() => {
    if (notifications.length === 0) {
      setNotifications([
        { id: 'ntf-1', title: 'GST Document Renewal Warning', body: 'Your GSTIN registration certificate expires in 12 days. Please upload renewed documents to avoid suspension.', isRead: false, type: 'warning', link: '/vendor/profile' },
        { id: 'ntf-2', title: 'Tender Specification Updated', body: 'Tender RAW_MAT-2026-015 Jamshedpur Blast Furnace SG-350 has been updated with technical addendums.', isRead: false, type: 'info', link: '/vendor/tenders' },
        { id: 'ntf-3', title: 'Contract Signed Successfully', body: 'Contract CON-9002 High-Density Structural Packaging has been officially co-signed by procurement managers.', isRead: true, type: 'success', link: '/vendor/contracts' },
      ]);
    }
  }, [notifications, setNotifications]);

  const handleNotificationClick = (item) => {
    markRead(item.id);
    if (item.link) {
      navigate(item.link);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'success':
        return <Award className="w-5 h-5 text-emerald-400" />;
      default:
        return <FileText className="w-5 h-5 text-tata-light" />;
    }
  };

  return (
    <div className="space-y-6 font-body">

      {/* Notifications Header */}
      <div className="border-b border-steel-700/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">WORKSPACE COMMUNICATIONS</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mt-1">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Track operational announcements, tender compliance alerts, and contract signatures.
          </p>
        </div>

        <button
          onClick={markAllRead}
          type="button"
          className="sm:self-end flex items-center justify-center py-2 px-4 rounded-xl text-xs font-bold border border-steel-600 hover:border-steel-500 bg-white hover:bg-gray-500 text-slate-900 hover:text-white transition-all focus:outline-none"
        >
          <CheckSquare className="w-4 h-4 mr-2" />
          Mark all as read
        </button>
      </div>

      {/* Notifications Queue list */}
      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-5 shadow-xl">
        {notifications.length > 0 ? (
          <div className="divide-y divide-steel-700">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`py-4 flex items-start space-x-4 transition-colors ${item.isRead ? 'opacity-60' : ''
                  }`}
              >
                {/* Bubble icon */}
                <div className="w-10 h-10 rounded-xl bg-steel-900 border border-steel-700/60 flex items-center justify-center flex-shrink-0">
                  {getIcon(item.type)}
                </div>

                {/* Body Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-sm font-bold text-black ${!item.isRead ? 'font-bold' : 'font-semibold'}`}>
                      {item.title}
                    </h3>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-tata-blue animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">{item.body}</p>
                </div>

                {/* Inspect Action */}
                <button
                  onClick={() => handleNotificationClick(item)}
                  type="button"
                  className="py-1.5 px-3 rounded bg-white hover:bg-gray-500 border border-steel-600 hover:border-tata-blue/45 text-xs font-bold text- flex-shrink-0 flex items-center space-x-1 transition-all focus:outline-none"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">
            No notifications available.
          </div>
        )}
      </div>

    </div>
  );
}
