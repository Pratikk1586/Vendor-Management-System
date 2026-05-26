/**
 * @fileoverview Detailed admin inspector and editor panel for system members, complete with activity logs.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, ShieldAlert, KeyRound, Save, Trash2, Calendar, Clock } from 'lucide-react';
import Tabs from '../../components/common/Tabs';

export default function AdminMemberDetail() {
  const { id = 'MEM-02' } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Stateful member info
  const [member, setMember] = useState({
    id: id,
    name: id === 'MEM-01' ? 'Bhartia Steel Fabrications Ltd' : 'Dr. Suresh Sen',
    email: id === 'MEM-01' ? 'ramesh@bhartiasteel.co.in' : 'suresh@tatasteel.com',
    role: id === 'MEM-01' ? 'vendor' : 'dept_head',
    status: 'Active',
    created: '2025-06-15',
  });

  const [editName, setEditName] = useState(member.name);
  const [editEmail, setEditEmail] = useState(member.email);
  const [editRole, setEditRole] = useState(member.role);
  const [editStatus, setEditStatus] = useState(member.status);

  // Status indicators feedback
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Member Profile' },
    { id: 'audit', label: 'Activity Logs' },
  ];

  const mockAuditLogs = [
    { id: 1, action: 'Authorized Contract CON-9002 execution', date: '2026-05-19', time: '14:22:10', ip: '10.240.12.89' },
    { id: 2, action: 'Published technical criteria for TEND-4890', date: '2026-05-15', time: '10:05:40', ip: '10.240.12.89' },
    { id: 3, action: 'Portal session initialized successfully', date: '2026-05-15', time: '09:00:15', ip: '10.240.12.89' },
  ];

  const handleProfileSave = (e) => {
    e.preventDefault();
    setMember(prev => ({
      ...prev,
      name: editName,
      email: editEmail,
      role: editRole,
      status: editStatus,
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleResetPw = () => {
    setPwSuccess(true);
    setTimeout(() => setPwSuccess(false), 2000);
  };

  const handleDeleteMember = () => {
    if (window.confirm('Are you sure you want to permanently delete this member profile?')) {
      navigate('/admin/members');
    }
  };

  return (
    <div className="space-y-6 font-body">
      
      {/* Header bar */}
      <div className="flex items-center space-x-2 border-b border-steel-700/60 pb-5">
        <button
          onClick={() => navigate('/admin/members')}
          type="button"
          className="p-2 rounded-lg bg-steel-800 hover:bg-steel-700 border border-steel-700 hover:border-steel-600 text-slate-300 hover:text-white transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-tata-gold">MEMBER REFERENCE: {id}</span>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Manage Member Credentials</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-steel-800/40 p-1 border border-steel-700/50 rounded-xl max-w-md">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="bg-steel-800 border border-steel-700/60 rounded-2xl p-6 shadow-xl max-w-3xl">
        
        {/* PANEL 1: PROFILE MANAGEMENT */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-6">
            
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <User className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Member Profile Details</h3>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold rounded-xl animate-fadeIn">
                ✓ Member parameters saved successfully.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Display / Company Name *
                </label>
                <input
                  id="name-input"
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Official Email Address *
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-tata-blue transition-colors"
                />
              </div>

              <div>
                <label htmlFor="role-select" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Access Role Level *
                </label>
                <select
                  id="role-select"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white text-sm focus:outline-none focus:border-tata-blue transition-colors"
                >
                  <option value="vendor">Vendor</option>
                  <option value="dept_head">Department Head</option>
                  <option value="hr_admin">HR Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="status-select" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Account Status *
                </label>
                <select
                  id="status-select"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="block w-full px-4 py-2.5 rounded-xl bg-steel-900 border border-steel-700/80 text-white text-sm focus:outline-none focus:border-tata-blue transition-colors"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-steel-700/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              {/* Extra Security buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleResetPw}
                  type="button"
                  className="py-2 px-4 rounded-xl border border-steel-600 bg-steel-800 text-xs font-bold text-slate-300 hover:text-white transition-colors focus:outline-none flex items-center"
                >
                  <KeyRound className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  {pwSuccess ? 'Password Reset Issued!' : 'Reset Password'}
                </button>
                <button
                  onClick={handleDeleteMember}
                  type="button"
                  className="py-2 px-4 rounded-xl border border-red-500/30 bg-red-950/20 text-xs font-bold text-red-400 hover:bg-red-900 hover:text-white transition-colors focus:outline-none flex items-center"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                  Delete Member
                </button>
              </div>

              {/* Submit panel */}
              <button
                type="submit"
                className="py-2.5 px-8 rounded-xl bg-gradient-to-r from-tata-blue to-tata-light text-xs sm:text-sm font-semibold text-white shadow-lg hover:shadow-tata-blue/30 flex items-center justify-center transition-all focus:outline-none"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile Configuration
              </button>

            </div>

          </form>
        )}

        {/* PANEL 2: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-steel-700 pb-3">
              <ShieldAlert className="w-5 h-5 text-tata-gold" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-tata-gold">Activity Logs Ledger</h3>
            </div>

            <div className="space-y-3">
              {mockAuditLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl bg-steel-900/40 border border-steel-700/60 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-semibold text-white">{log.action}</p>
                    <div className="flex items-center text-[10px] text-slate-500 space-x-3.5 font-mono">
                      <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{log.date}</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{log.time}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 select-all">{log.ip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
