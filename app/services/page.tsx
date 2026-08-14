import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, PhoneCall, Globe, Shield, MessageSquare, GraduationCap, Search, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Solutions | Team Axiogen',
  description: 'Explore Axiogen core software engineering solutions: AI voice calling agents, ClinicOS medical SaaS, high-performance web development, WhatsApp cloud automation, and technical SEO growth.',
  alternates: { canonical: 'https://team.axiogen.in/services' },
};

const services = [
  {
    id: 'voice-ai',
    title: 'AI Cold Calling & Conversational Agents',
    icon: PhoneCall,
    color: 'from-purple-600 to-indigo-600',
    desc: 'Ultra-fast outbound & inbound voice calling agents featuring Kokoro-82M neural TTS and Groq Llama 8B conversational intelligence. Conducts natural lead qualification, objection handling, and appointment booking in real-time.',
    features: [
      'Sub-second turn-taking latency with WebAssembly ONNX',
      'Autonomous BANT lead qualification (Need, Budget, Timeline)',
      'Automated WhatsApp follow-up dispatch & CRM sync',
      'Zero subscription fees with open neural models'
    ]
  },
  {
    id: 'web-engineering',
    title: 'High-Performance Web & Full-Stack Apps',
    icon: Globe,
    color: 'from-teal-600 to-emerald-600',
    desc: 'Custom Next.js, React, and WebGL web applications engineered with cinematic visual design, lightning-fast Core Web Vitals, and conversion-focused architectures.',
    features: [
      'Sub-second first contentful paint (FCP)',
      'Tailored interactive 3D WebGL & fluid micro-animations',
      'Full TypeScript, Supabase/PostgreSQL backend integration',
      'Top-tier technical SEO and schema optimization'
    ]
  },
  {
    id: 'clinicos',
    title: 'Axiogen ClinicOS Healthcare EHR',
    icon: Shield,
    color: 'from-blue-600 to-cyan-600',
    desc: 'Complete clinic and hospital management system designed for dental practices, doctors, and multi-specialty healthcare facilities.',
    features: [
      'Patient electronic health records (EHR) & medical history',
      'Real-time token queue management and display boards',
      'Digital prescription generator with drug interaction hints',
      'Automated WhatsApp appointment confirmations & reminders'
    ]
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation & Baileys Gateway',
    icon: MessageSquare,
    color: 'from-emerald-600 to-green-600',
    desc: 'Subscriptionless automated WhatsApp messaging gateway for instant lead capture, multi-stage notification pipelines, and AI-powered auto-responders.',
    features: [
      'Self-hosted Baileys socket integration (no per-message fees)',
      'Instant lead dispatch from web forms and cold calls',
      'Custom webhook routers and interactive reply buttons',
      'Broadcast campaign manager with anti-ban rate limiting'
    ]
  },
  {
    id: 'school-erp',
    title: 'School ERP & Academic Management',
    icon: GraduationCap,
    color: 'from-amber-600 to-yellow-600',
    desc: 'All-in-one educational SaaS platform for schools, coaching institutes, and colleges managing admissions, fee receipts, and academic reporting.',
    features: [
      'Student record management & automated report cards',
      'Fee receipt generation with online payment gateway',
      'Parent messaging portal & WhatsApp attendance alerts',
      'Teacher workload scheduling and timetable generator'
    ]
  },
  {
    id: 'seo-growth',
    title: 'Technical SEO & Organic Lead Generation',
    icon: Search,
    color: 'from-pink-600 to-rose-600',
    desc: 'Deep technical search engine optimization, Google Business Profile local map pack ranking, and AI search entity authority construction.',
    features: [
      'Rich JSON-LD entity schema and Knowledge Graph building',
      'Google Maps / GBP local search optimization',
      'PageSpeed 100/100 Core Web Vitals optimization',
      'AI Overview readiness (LLMs.txt, structured citations)'
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#07070c] text-white font-sans selection:bg-purple-500/30 selection:text-white pb-20">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07070c]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Axiogen
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">Solutions</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        
        {/* Title Hero */}
        <section className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
            Our Services & Engineering
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            High-Impact Software Designed to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Scale Your Operations</span>.
          </h1>
          <p className="text-base text-white/60 leading-relaxed font-normal">
            Team Axiogen builds custom software, AI automation agents, and vertical SaaS platforms that automate repetitive tasks, capture qualified leads, and accelerate business growth.
          </p>
        </section>

        {/* Services List */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="p-6 rounded-3xl bg-[#0b0b16] border border-white/[0.07] hover:border-purple-500/30 space-y-4 transition-all group flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{s.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{s.desc}</p>
                    
                    <ul className="space-y-2 pt-2">
                      {s.features.map((f, i) => (
                        <li key={i} className="text-[11px] text-white/70 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact" className="pt-4 flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                    Request Consultation <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Links */}
        <section className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4 text-xs font-semibold text-white/60">
          <span>Explore More:</span>
          <Link href="/about" className="text-purple-400 hover:text-purple-300 underline">About Studio</Link>
          <span>·</span>
          <Link href="/founder" className="text-purple-400 hover:text-purple-300 underline">Founder Profile</Link>
          <span>·</span>
          <Link href="/projects" className="text-purple-400 hover:text-purple-300 underline">Case Studies</Link>
          <span>·</span>
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">Contact Us</Link>
        </section>

      </main>
    </div>
  );
}
