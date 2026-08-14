import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, User, Code, Terminal, Sparkles, Globe, Shield, Cpu, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aditya Patil — Founder & Chief Software Architect | Axiogen',
  description: 'Aditya Patil is the founder and chief architect of Team Axiogen. He engineers autonomous AI agents, ClinicOS medical platform, high-performance web systems, and machine learning infrastructure.',
  alternates: { canonical: 'https://team.axiogen.in/founder' },
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-[#07070c] text-white font-sans selection:bg-purple-500/30 selection:text-white pb-20">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07070c]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Axiogen
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">Leadership</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        
        {/* Profile Card */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-[#0e0e1a] to-[#07070e] border border-white/[0.08] space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-purple-600/30">
              AP
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
                Founder & Chief Architect
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mt-1">Aditya Patil</h1>
              <p className="text-sm text-white/50 mt-0.5">Software Architect · AI Systems Specialist · Founder of Team Axiogen</p>
            </div>
          </div>

          <p className="text-sm md:text-base text-white/70 leading-relaxed">
            Aditya Patil is an Indian software engineer and systems architect who founded <strong>Team Axiogen</strong> to deliver production-grade AI automation, custom software, and medical SaaS platforms for businesses and healthcare practices.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://github.com/axiogenai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-bold flex items-center gap-2 transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-purple-400"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Profile
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/25"
            >
              Connect with Aditya
            </Link>
          </div>
        </section>

        {/* Technical Architecture & Focus */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Key Architectures & Engineering Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold">Axiogen AI Voice Calling Engine</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Architected sub-second local Kokoro-82M neural TTS streaming pipeline with multi-core ONNX WASM acceleration and Groq Llama 8B conversational intelligence.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <Shield className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-bold">ClinicOS Healthcare System</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Engineered the complete ClinicOS electronic health record, prescription generator, and WhatsApp appointment reminder automation stack for dental and medical practices.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold">CodeMind AI & Reverse Engineering</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Developed autonomous multi-language AST code parser and structural dependency mapper for codebase intelligence and migration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <Cpu className="w-5 h-5 text-pink-400" />
              <h3 className="text-sm font-bold">RansomGuard AI Protection</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Built real-time watchdog filesystem trap system with XGBoost ensemble classifier to detect and isolate crypto-ransomware in under 50 milliseconds.
              </p>
            </div>

          </div>
        </section>

        {/* Quick Links */}
        <section className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4 text-xs font-semibold text-white/60">
          <span>Explore More:</span>
          <Link href="/about" className="text-purple-400 hover:text-purple-300 underline">About Studio</Link>
          <span>·</span>
          <Link href="/services" className="text-purple-400 hover:text-purple-300 underline">Services & Solutions</Link>
          <span>·</span>
          <Link href="/projects" className="text-purple-400 hover:text-purple-300 underline">Case Studies</Link>
          <span>·</span>
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">Contact Us</Link>
        </section>

      </main>
    </div>
  );
}
