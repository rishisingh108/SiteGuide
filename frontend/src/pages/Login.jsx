import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, User as UserIcon, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans antialiased flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-500/10 via-cyan-500/5 to-transparent blur-[130px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <Bot className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            SiteGuide <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-medium">AI</span>
          </span>
        </Link>

        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          {/* Tabs */}
          <div className="flex bg-slate-900/60 border border-slate-800 rounded-2xl p-1 mb-7">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 relative py-2.5 text-sm font-bold rounded-xl transition-colors ${mode === m ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {mode === m && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{m === 'login' ? 'Log in' : 'Create account'}</span>
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-black text-white mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-slate-400 text-sm mb-7">
            {mode === 'login'
              ? 'Log in to access your construction intelligence dashboard.'
              : 'Set up your SiteGuide account in a few seconds.'}
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait" initial={false}>
              {mode === 'signup' && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      required
                      type="text"
                      placeholder="Rishi Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  required
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  required
                  type="password"
                  minLength={6}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 mt-2 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-60"
            >
              {submitting
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <>{mode === 'login' ? 'Log in' : 'Create account'} <ArrowRight className="w-4 h-4" /></>}
            </motion.button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              {mode === 'login' ? 'Create one' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
