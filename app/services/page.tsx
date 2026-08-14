import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, PhoneCall, Globe, Shield, MessageSquare, 
  GraduationCap, Search, CheckCircle2, ArrowRight, Sparkles,
  Zap, Cpu, Code2, Layers, Database
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Engineering Solutions | Team Axiogen',
  description: 'Explore Axiogen core software engineering solutions: AI voice calling agents, ClinicOS medical SaaS, high-performance web development, WhatsApp cloud automation, and technical SEO growth.',
  alternates: { canonical: 'https://team.axiogen.in/services' },
};

const services = [
  {
    id: 'voice-ai',
    title: 'AI Cold Calling & Inbound Voice Agents',
    icon: PhoneCall,
    color: 'from-purple-600 via-pink-600 to-indigo-600',
    glow: 'border-purple-500/20 hover:border-purple-500/50',
    tag: 'Flagship Neural Audio',
    desc: 'Ultra-fast outbound & inbound voice calling agents featuring Kokoro-82M neural TTS and Groq Llama 8B conversational intelligence. Conducts natural lead qualification, objection handling, and appointment booking in real-time.',
    features: [
      'Sub-200ms turn-taking latency via WebAssembly SIMD',
      'Autonomous BANT lead qualification (Need, Authority, Budget, Timeline)',
      'Automated WhatsApp follow-up dispatch & instant CRM sync',
      'Zero subscription fees with open neural models'
    ],
    tech: ['Kokoro-82M ONNX', 'Groq Whisper Turbo', 'Llama 8B Instant', 'Web Audio API']
  },
  {
    id: 'web-engineering',
    title: 'High-Performance Web & Full-Stack Apps',
    icon: Globe,
    color: 'from-teal-500 via-emerald-500 to-cyan-500',
    glow: 'border-teal-500/20 hover:border-teal-500/50',
    tag: 'Cinematic WebGL & Next.js',
    desc: 'Custom Next.js, React, and WebGL web applications engineered with cinematic visual design, sub-second Core Web Vitals, and conversion-focused architectures.',
    features: [
      'Sub-second first contentful paint (FCP) & 100/100 PageSpeed',
      'Interactive 3D WebGL, Three.js shaders & fluid scroll physics',
      'Full TypeScript, Supabase/PostgreSQL backend integration',
      'Structured JSON-LD schema for Google Knowledge Graph rank'
    ],
    tech: ['Next.js 15', 'React 19', 'Three.js / WebGL', 'TailwindCSS']
  },
  {
    id: 'clinicos',
    title: 'Axiogen ClinicOS Healthcare EHR Platform',
    icon: Shield,
    color: 'from-blue-600 via-indigo-600 to-cyan-600',
    glow: 'border-blue-500/20 hover:border-blue-500/50',
    tag: 'Medical Practice SaaS',
    desc: 'Complete clinic and hospital management system designed for dental practices, doctors, and multi-specialty healthcare facilities.',
    features: [
      'Patient electronic health records (EHR) & medical histories',
      'Real-time token queue management and waiting-room display boards',
      'Digital prescription generator with drug interaction hints',
      'Automated WhatsApp appointment confirmations & reminders'
    ],
    tech: ['Supabase PostgreSQL', 'Next.js 15', 'Baileys Socket', 'TailwindCSS']
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation & Baileys Gateway',
    icon: MessageSquare,
    color: 'from-emerald-500 via-green-500 to-teal-500',
    glow: 'border-emerald-500/20 hover:border-emerald-500/50',
    tag: 'Zero-Fee Messaging',
    desc: 'Subscriptionless automated WhatsApp messaging gateway for instant lead capture, multi-stage notification pipelines, and AI-powered auto-responders.',
    features: [
      'Self-hosted Baileys socket integration (no per-message fees)',
      'Instant lead dispatch from web forms and cold calling pipelines',
      'Custom webhook routers and interactive reply buttons',
      'Broadcast campaign manager with anti-ban rate limiting'
    ],
    tech: ['Baileys Socket', 'Node.js', 'Express', 'Meta Cloud API']
  },
  {
    id: 'school-erp',
    title: 'School ERP & Academic Institution Portal',
    icon: GraduationCap,
    color: 'from-amber-500 via-orange-500 to-yellow-500',
    glow: 'border-amber-500/20 hover:border-amber-500/50',
    tag: 'Educational SaaS',
    desc: 'All-in-one educational platform for schools, coaching institutes, and colleges managing admissions, fee receipts, and academic reporting.',
    features: [
      'Student record management & automated report cards',
      'Fee receipt generation with online payment gateway',
      'Parent messaging portal & WhatsApp attendance alerts',
      'Teacher workload scheduling and timetable generator'
    ],
    tech: ['Next.js', 'PostgreSQL', 'Prisma ORM', 'WhatsApp API']
  },
  {
    id: 'seo-growth',
    title: 'Technical SEO & AI Overview Authority',
    icon: Search,
    color: 'from-pink-500 via-rose-500 to-purple-500',
    glow: 'border-pink-500/20 hover:border-pink-500/50',
    tag: 'Search Dominance',
    desc: 'Deep technical search engine optimization, Google Business Profile local map pack ranking, and AI search entity authority construction.',
    features: [
      'Rich JSON-LD entity schema and Knowledge Graph building',
      'Google Maps / GBP local search optimization',
      'PageSpeed 100/100 Core Web Vitals optimization',
      'AI Overview readiness (LLMs.txt, structured citations)'
    ],
    tech: ['Schema.org', 'JSON-LD', 'Google Search Console', 'LLMs.txt']
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-purple-500/30 selection:text-white relative overflow-hidden pb-24">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-teal-600/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
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
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest text-purple-300 uppercase">Solutions & Services</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 space-y-16">
        
        {/* ─── Hero Title ─── */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-purple-400" /> Core Engineering Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            High-Impact Software Engineered to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Scale Your Growth</span>.
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed font-normal max-w-3xl">
            From autonomous AI voice calling bots to medical clinic management suites and bespoke full-stack digital storefronts, we build production software tailored for measurable ROI.
          </p>
        </section>

        {/* ─── Services Cards Grid ─── */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(s => {
              const Icon = s.icon;
              return (
                <div 
                  key={s.id} 
                  className={`p-7 rounded-3xl bg-[#090912] border ${s.glow} transition-all duration-300 flex flex-col justify-between group space-y-6 relative overflow-hidden`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                        {s.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    <ul className="space-y-2.5 pt-2">
                      {s.features.map((f, i) => (
                        <li key={i} className="text-xs text-white/80 flex items-start gap-2 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {s.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50">{t}</span>
                      ))}
                    </div>

                    <Link 
                      href="/contact" 
                      className="flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors pt-1"
                    >
                      <span>Request Implementation</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Footer CTA Card ─── */}
        <section className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-950/40 via-[#0a0a14] to-[#050508] border border-purple-500/30 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-bold uppercase tracking-widest">
            Free Strategy Consultation
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Ready to Automate & Grow Your Business?</h2>
          <p className="text-xs md:text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Schedule a 15-minute technical audit with our engineering team to review your workflow bottlenecks and receive a custom software proposal.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs md:text-sm font-bold text-white shadow-xl shadow-purple-600/30 transition-all hover:scale-105"
            >
              Book 15-Minute Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ─── Footer Navigation Links ─── */}
        <section className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-white/50">
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-purple-400 hover:text-white transition-colors">About Studio</Link>
            <span>·</span>
            <Link href="/founder" className="text-purple-400 hover:text-white transition-colors">Founder Profile</Link>
            <span>·</span>
            <Link href="/projects" className="text-purple-400 hover:text-white transition-colors">Case Studies</Link>
            <span>·</span>
            <Link href="/contact" className="text-purple-400 hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-[11px] text-white/30 font-mono">© 2026 Team Axiogen. All rights reserved.</p>
        </section>

      </main>
    </div>
  );
}
