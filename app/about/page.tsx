import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Brain, Cpu, ShieldCheck, Zap, Globe, Users, Award, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Axiogen | AI Automation & Software Engineering Studio',
  description: 'Learn about Axiogen (Team Axiogen) — an Indian AI Automation & Software Engineering Studio founded by Aditya Patil. We build autonomous AI voice agents, ClinicOS medical EHR, SaaS, and bespoke web platforms.',
  alternates: { canonical: 'https://team.axiogen.in/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07070c] text-white font-sans selection:bg-purple-500/30 selection:text-white pb-20">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07070c]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Axiogen
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">Team Axiogen</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        
        {/* Title Hero */}
        <section className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
            About Team Axiogen
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Engineering the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Autonomous AI & Software</span>.
          </h1>
          <p className="text-base md:text-lg text-white/60 leading-relaxed font-normal">
            Axiogen (Team Axiogen) is an Indian AI Automation & Software Engineering Studio based in Mumbai, Maharashtra. Founded by software architect <strong>Aditya Patil</strong>, we specialize in high-performance digital systems, neural voice calling agents, healthcare SaaS platforms, and enterprise automation.
          </p>
        </section>

        {/* Entity Disambiguation Card */}
        <section className="p-6 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Official Entity Information
          </h3>
          <p className="text-xs text-white/70 leading-relaxed">
            <strong>Axiogen</strong> (operating as <em>Team Axiogen</em> at <Link href="https://team.axiogen.in" className="text-purple-300 underline">team.axiogen.in</Link>) is a technology engineering studio focused exclusively on AI software engineering, voice agents, ClinicOS medical EHR, and web systems. We are an independent software organization and distinct from unrelated pharmaceutical or biotech entities.
          </p>
        </section>

        {/* Core Pillars */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Our Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <Brain className="w-6 h-6 text-purple-400" />
              <h3 className="text-base font-bold">Autonomous AI Voice & Calling Agents</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Sub-second conversational voice bots powered by local Kokoro-82M neural TTS and Groq LLMs capable of autonomous outbound lead qualification and customer support.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <Zap className="w-6 h-6 text-teal-400" />
              <h3 className="text-base font-bold">High-Performance Web Engineering</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Next.js 15, React 19, and WebGL architectures crafted for sub-second loading speeds, perfect PageSpeed scores, and organic Google Search dominance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
              <h3 className="text-base font-bold">Axiogen ClinicOS Healthcare EHR</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Next-generation electronic health record (EHR), token queue management, digital prescriptions, and automated WhatsApp patient appointment dispatch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <Globe className="w-6 h-6 text-pink-400" />
              <h3 className="text-base font-bold">WhatsApp Business Cloud Automation</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Subscriptionless Baileys & Meta Cloud API infrastructure for automated lead dispatch, interactive CRM chat flows, and notification triggers.
              </p>
            </div>

          </div>
        </section>

        {/* Quick Links */}
        <section className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4 text-xs font-semibold text-white/60">
          <span>Explore More:</span>
          <Link href="/founder" className="text-purple-400 hover:text-purple-300 underline">Founder Profile</Link>
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
