import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, ExternalLink, Sparkles, Shield, Cpu, 
  Activity, Globe, Database, Terminal, ArrowRight,
  CheckCircle2, Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Projects & Live Case Studies | Team Axiogen',
  description: 'Explore live software systems engineered by Team Axiogen: ClinicOS Medical EHR, Digitize AI Document Intelligence, CodeMind AI, SEOHub Pro, RansomGuard AI, and TruthLens.',
  alternates: { canonical: 'https://team.axiogen.in/projects' },
};

const projects = [
  {
    name: 'Axiogen ClinicOS',
    category: 'Healthcare EHR SaaS',
    badge: 'Live Production SaaS',
    tagline: 'Complete medical clinic & dental practice management software',
    desc: 'Engineered for doctors, clinics, and multi-specialty healthcare practices. Features real-time patient queue displays, electronic health records (EHR), digital e-prescriptions, and automated Baileys WhatsApp appointment confirmations.',
    tech: ['Next.js 15', 'TypeScript', 'Supabase PostgreSQL', 'TailwindCSS', 'Baileys WhatsApp'],
    link: 'https://github.com/axiogenai/axiogen-clinicos',
    gradient: 'from-blue-600/20 to-teal-600/10 border-blue-500/20 hover:border-blue-500/50'
  },
  {
    name: 'Axiogen Digitize',
    category: 'Document Intelligence AI',
    badge: '17-Stage AI Pipeline',
    tagline: 'Autonomous AI document intelligence & OCR data extraction pipeline',
    desc: 'Transforms unstructured PDFs, laboratory test reports, medical records, and complex invoices into validated, schema-compliant JSON structures with multi-model validation.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'Groq Llama 70B', 'Tesseract OCR'],
    link: 'https://github.com/axiogenai/axiogen-digitize',
    gradient: 'from-purple-600/20 to-pink-600/10 border-purple-500/20 hover:border-purple-500/50'
  },
  {
    name: 'SEOHub Pro',
    category: 'Enterprise SEO & Search Analytics',
    badge: 'Live Public App',
    tagline: 'AI-Powered Search Engine Optimization & Crawl Analytics Engine',
    desc: 'Full-scale SEO diagnostic platform featuring real-time site crawling, Google Gemini AI keyword intelligence, PageSpeed diagnostics, and schema validation.',
    tech: ['Next.js', 'React', 'Gemini AI', 'PageSpeed API', 'TailwindCSS'],
    link: 'https://seohubpro.vercel.app',
    gradient: 'from-emerald-600/20 to-cyan-600/10 border-emerald-500/20 hover:border-emerald-500/50'
  },
  {
    name: 'CodeMind AI',
    category: 'Software Intelligence',
    badge: 'AST Code Graph Engine',
    tagline: 'Autonomous multi-language codebase reverse engineering & intelligence',
    desc: 'Deep code analysis tool capable of ingesting entire multi-repository codebases, building Abstract Syntax Trees (AST), mapping dependency graphs, and providing AI refactoring solutions.',
    tech: ['Python', 'LangChain', 'Tree-Sitter', 'TypeScript', 'Docker'],
    link: 'https://github.com/axiogenai/codemind-ai',
    gradient: 'from-indigo-600/20 to-purple-600/10 border-indigo-500/20 hover:border-indigo-500/50'
  },
  {
    name: 'TruthLens Pro',
    category: 'AI Digital Forensics',
    badge: 'Live Public Tool',
    tagline: 'Forensic Misinformation & Image Tampering Detection Platform',
    desc: 'Digital forensics tool analyzing news text for credibility and detecting image manipulation using Error Level Analysis (ELA) and spread-risk prediction algorithms.',
    tech: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'Next.js'],
    link: 'https://truth-lenspro.vercel.app',
    gradient: 'from-pink-600/20 to-rose-600/10 border-pink-500/20 hover:border-pink-500/50'
  },
  {
    name: 'RansomGuard AI',
    category: 'Cybersecurity Endpoint Defense',
    badge: 'ML Watchdog Ensemble',
    tagline: 'Real-Time Watchdog Filesystem Ransomware Isolation Engine',
    desc: 'Zero-day ransomware detection agent utilizing filesystem honey-traps, file entropy metrics, and an XGBoost machine learning ensemble to halt encryption attacks in milliseconds.',
    tech: ['Python', 'XGBoost', 'Socket.IO', 'SQLite', 'Flask'],
    link: '#',
    gradient: 'from-red-600/20 to-orange-600/10 border-red-500/20 hover:border-red-500/50'
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-purple-500/30 selection:text-white relative overflow-hidden pb-24">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-blue-600/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full" />
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
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest text-purple-300 uppercase">Case Studies & Systems</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 space-y-16">
        
        {/* ─── Hero Title ─── */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-purple-400" /> Engineering Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Production Systems & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Deployed Platforms</span>.
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed font-normal max-w-3xl">
            A comprehensive overview of production artificial intelligence models, healthcare SaaS platforms, and security tools engineered by Team Axiogen.
          </p>
        </section>

        {/* ─── Projects Cards Grid ─── */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(p => (
              <div 
                key={p.name} 
                className={`p-7 rounded-3xl bg-[#090912] border ${p.gradient} transition-all duration-300 flex flex-col justify-between group space-y-6 relative overflow-hidden`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                      {p.badge}
                    </span>
                    {p.link !== '#' && (
                      <a 
                        href={p.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white/40 hover:text-white transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-semibold text-purple-400/90 font-mono">
                      {p.tagline}
                    </p>
                    <p className="text-xs text-white/60 leading-relaxed pt-1">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map(t => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50">{t}</span>
                    ))}
                  </div>

                  {p.link !== '#' ? (
                    <a 
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors pt-1"
                    >
                      <span>View Live Platform</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-white/30 pt-1 block">Enterprise Internal System</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Footer Navigation Links ─── */}
        <section className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-white/50">
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-purple-400 hover:text-white transition-colors">About Studio</Link>
            <span>·</span>
            <Link href="/founder" className="text-purple-400 hover:text-white transition-colors">Founder Profile</Link>
            <span>·</span>
            <Link href="/services" className="text-purple-400 hover:text-white transition-colors">Services</Link>
            <span>·</span>
            <Link href="/contact" className="text-purple-400 hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-[11px] text-white/30 font-mono">© 2026 Team Axiogen. All rights reserved.</p>
        </section>

      </main>
    </div>
  );
}
