import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, Calculator, CalendarClock, ChartPie, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: Calculator, title: 'Smart Estimations', desc: 'AI-driven cost analysis and automated material calculation dynamically mapped to your build criteria.' },
    { icon: CalendarClock, title: 'Dynamic Scheduling', desc: 'Auto-adjusting timelines that actively scale based on real-world constraints and spatial parameters.' },
    { icon: Bot, title: 'AI Copilot Logic', desc: 'Your 24/7 intelligent engineering assistant driven by Google Gemini API for critical validation queries.' },
    { icon: ChartPie, title: 'Real-time Analytics', desc: 'Live data matrices and visual dashboards for tracking material consumption and budget variance instantly.' }
  ];

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-400 overflow-x-hidden">
      
      {/* Premium Cyber Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-500/10 via-cyan-500/5 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* Modern Glassmorphic Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#070A13]/70 border-b border-slate-800/50">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Bot className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              SiteGuide <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-medium">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-slate-400 hover:text-white font-medium text-sm transition-colors">Log in</Link>
            <Link to="/dashboard" className="text-sm px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-8 max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Bento Style Pill */}
          <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full mb-6 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" /> Neural Architecture Systems
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-8">
            The Ultimate Intelligence <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              AI Construction Copilot
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Eliminate operational inaccuracies, prevent timeline lag, and consolidate independent workflows into one centralized, predictive platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl shadow-white/5 hover:scale-[1.02]">
              Start Building <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold rounded-xl backdrop-blur-sm transition-all hover:scale-[1.02]">
              Watch Live Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Metrics Strip */}
      <section className="max-w-7xl mx-auto px-8 py-10 border-y border-slate-900 bg-slate-950/30 backdrop-blur-[2px]">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 hover:opacity-70 transition-opacity duration-300">
          <span className="text-xs font-bold tracking-widest text-slate-400">REACT.JS / VITE</span>
          <span className="text-xs font-bold tracking-widest text-slate-400">NODE.JS / EXPRESS</span>
          <span className="text-xs font-bold tracking-widest text-slate-400">GOOGLE GEMINI AI</span>
          <span className="text-xs font-bold tracking-widest text-slate-400">TAILWIND INTEGRATION</span>
          <span className="text-xs font-bold tracking-widest text-slate-400">MONGODB INFRASTRUCTURE</span>
        </div>
      </section>

      {/* Modernized Bento Features Grid */}
      <section className="py-28 bg-[#04060C]/60 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black tracking-tight text-white mb-4">Engineered to Optimize Production</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">Robust systems built intentionally for modern execution teams and structural managers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="group relative bg-[#0C111D]/40 border border-slate-900 p-8 rounded-2xl hover:border-blue-500/30 hover:bg-[#0C111D]/70 transition-all duration-300 shadow-sm"
              >
                {/* Microgradient Glow Overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-inner">
                  <feat.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 text-center text-xs text-slate-500 tracking-wider">
        <p>&copy; 2026 SiteGuide AI Infrastructure. All rights reserved.</p>
      </footer>
    </div>
  );
}