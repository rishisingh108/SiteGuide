import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Wifi, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { healthApi } from '../api';
import { useAuth } from '../context/AuthContext';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
  return initials.toUpperCase();
}

export default function Settings() {
  const { user } = useAuth();
  const [health, setHealth] = useState({ status: 'checking' }); // checking | ok | error
  const [notifications, setNotifications] = useState(() => {
    return { email: true, aiReports: true, weatherAlerts: false };
  });

  useEffect(() => {
    let cancelled = false;
    healthApi.check()
      .then(() => !cancelled && setHealth({ status: 'ok' }))
      .catch((err) => !cancelled && setHealth({ status: 'error', message: err.message }));
    return () => { cancelled = true; };
  }, []);

  const toggle = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account, connection, and notification preferences.</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><User className="w-5 h-5" /></div>
          <h2 className="text-lg font-bold text-gray-900">Profile</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Name</label>
              <input defaultValue={user?.name || ''} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 transition" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Role</label>
              <input defaultValue={user?.role || 'Project Manager'} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 transition" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
              <input readOnly value={user?.email || ''} className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none text-gray-500 cursor-not-allowed" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connection status */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600"><Wifi className="w-5 h-5" /></div>
          <h2 className="text-lg font-bold text-gray-900">Backend Connection</h2>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="flex items-center gap-3">
            {health.status === 'checking' && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
            {health.status === 'ok' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {health.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
            <div>
              <p className="text-sm font-bold text-gray-900">
                {health.status === 'checking' && 'Checking connection...'}
                {health.status === 'ok' && 'Connected to SiteGuide API'}
                {health.status === 'error' && 'Not connected'}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {health.status === 'error'
                  ? (health.message || 'Could not reach the backend. Make sure it is running.')
                  : (import.meta.env.VITE_API_URL || 'http://localhost:5000')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600"><Bell className="w-5 h-5" /></div>
          <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
        </div>

        <div className="divide-y divide-gray-50">
          {[
            { key: 'email', label: 'Email updates', desc: 'Weekly summaries and important project updates' },
            { key: 'aiReports', label: 'AI report ready', desc: 'Get notified when an AI analysis finishes generating' },
            { key: 'weatherAlerts', label: 'Weather alerts', desc: 'Alerts for weather conditions that may delay a site' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => toggle(item.key)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifications[item.key] ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm ${notifications[item.key] ? 'left-5.5' : 'left-0.5'}`}
                  style={{ left: notifications[item.key] ? '22px' : '2px' }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600"><Shield className="w-5 h-5" /></div>
          <h2 className="text-lg font-bold text-gray-900">Security</h2>
        </div>
        <p className="text-sm text-gray-500">
          Write access to projects is protected by an API key configured on the backend (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">API_KEY</code> in <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">.env</code>). The frontend must send the matching key via <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">VITE_API_KEY</code>.
        </p>
      </motion.div>
    </div>
  );
}
