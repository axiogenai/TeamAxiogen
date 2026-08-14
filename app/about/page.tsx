import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, Sparkles, Brain, Cpu, ShieldCheck, 
  Zap, Globe, Users, Award, Code2, ArrowRight, 
  CheckCircle2, Terminal, Shield, Lock, Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Team Axiogen | AI Automation & Software Engineering Studio',
  description: 'Axiogen (Team Axiogen) is an Indian AI Automation & Software Engineering Studio founded by Aditya Patil. We engineer autonomous AI voice calling agents, ClinicOS medical EHR, SaaS, and bespoke web platforms.',
  alternates: { canonical: 'https://team.axiogen.in/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-purple-500/30 selection:text-white relative overflow-hidden pb-24">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-indigo-600/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-teal-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07070e]/80 backdrop-blur-2xl px-6 py-4 flex items-center justify-between max-w-5xl mx-auto rounded-b-2xl">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold uppercase tracking-widest transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Axiogen</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest text-purple-300 uppercase">About Axiogen Studio</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 space-y-16">
        
        {/* ─── Hero Headline ─── */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-purple-400" /> Engineering Studio Overview
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            We Build Autonomous AI Systems & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">High-Performance Software</span>.
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed font-normal max-w-3xl">
            Axiogen (operating as <strong>Team Axiogen</strong>) is an Indian AI automation and custom software engineering studio headquartered in Mumbai. Founded by software architect <strong>Aditya Patil</strong>, we build vertical domain SaaS platforms, neural voice agents, and bespoke digital infrastructure.
          </p>
        </section>

        {/* ─── Metric Stat Cards ─── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['12+', 'Production Systems', 'AI & Web Platforms'],
            ['<200ms', 'Voice Turn Latency', 'Sub-second Voice AI'],
            ['99.9%', 'System Reliability', 'Production Uptime'],
            ['100%', 'Bespoke Codebase', 'Zero Cookie-Cutter']
          ].map(([val, label, sub]) => (
            <div key={label} className="p-5 rounded-2xl bg-[#0a0a14] border border-white/[0.06] space-y-1">
              <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 font-mono">{val}</p>
              <p className="text-xs font-bold text-white">{label}</p>
              <p className="text-[10px] text-white/40 font-medium">{sub}</p>
            </div>
          ))}
        </section>

        {/* ─── Clear Entity Disambiguation Box ─── */}
        <section className="p-7 rounded-3xl bg-gradient-to-br from-purple-950/30 via-[#0c0c18] to-[#07070e] border border-purple-500/25 space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Official Entity Identity & Disambiguation
          </div>
          <p className="text-xs md:text-sm text-white/80 leading-relaxed">
            <strong>Team Axiogen</strong> (official domain: <Link href="https://team.axiogen.in" className="text-purple-300 underline font-semibold">team.axiogen.in</Link>, <Link href="https://axiogen.in" className="text-purple-300 underline font-semibold">axiogen.in</Link>) is an independent AI automation, web engineering, and healthcare SaaS studio.
          </p>
          <p className="text-[11px] text-white/50 leading-relaxed">
            We are distinct from unrelated biotechnology, aesthetic pharmaceutical, or clinical trial entities sharing similar nomenclature (such as axiogen.ai or axiogen.com). Our technical operations focus exclusively on software engineering, AI calling agents, ClinicOS medical platform, and business automation.
          </p>
        </section>

        {/* ─── 4 Core Capabilities ─── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">What We Build</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="p-6 rounded-2xl bg-[#090912] border border-white/[0.06] hover:border-purple-500/30 transition-all space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">Conversational AI Voice Agents</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Autonomous outbound lead qualification, appointment booking, and customer inquiry management powered by Kokoro-82M neural TTS and Groq LLMs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090912] border border-white/[0.06] hover:border-teal-500/30 transition-all space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center text-teal-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">Axiogen ClinicOS Medical EHR</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Doctor-patient management, digital queues, e-prescriptions, and automated WhatsApp appointment follow-ups tailored for healthcare clinics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090912] border border-white/[0.06] hover:border-pink-500/30 transition-all space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/25 flex items-center justify-center text-pink-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">High-Performance Web Engineering</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Next.js 15, React 19, and WebGL web applications engineered with cinematic visual design, sub-second loading, and organic search rank.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090912] border border-white/[0.06] hover:border-blue-500/30 transition-all space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">WhatsApp Business Automation</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Subscriptionless automated WhatsApp messaging gateway via self-hosted Baileys sockets for instant lead dispatch and customer follow-up.
              </p>
            </div>

          </div>
        </section>

        {/* ─── Leadership & Direct Link ─── */}
        <section className="p-7 rounded-3xl bg-gradient-to-r from-[#0c0c18] to-[#080810] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">FOUNDER PROFILE</span>
            <h3 className="text-xl font-bold text-white">Aditya Patil</h3>
            <p className="text-xs text-white/60 max-w-md">
              Explore the technical background, architectural philosophies, and engineering projects behind Team Axiogen.
            </p>
          </div>
          <Link
            href="/founder"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/25 hover:scale-105 shrink-0"
          >
            View Founder Profile <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* ─── Footer Navigation Links ─── */}
        <section className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-white/50">
          <div className="flex items-center gap-4">
            <Link href="/founder" className="text-purple-400 hover:text-white transition-colors">Founder</Link>
            <span>·</span>
            <Link href="/services" className="text-purple-400 hover:text-white transition-colors">Services</Link>
            <span>·</span>
            <Link href="/projects" className="text-purple-400 hover:text-white transition-colors">Projects</Link>
            <span>·</span>
            <Link href="/contact" className="text-purple-400 hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-[11px] text-white/30 font-mono">© 2026 Team Axiogen. All rights reserved.</p>
        </section>

      </main>
    </div>
  );
}
