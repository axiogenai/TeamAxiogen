import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles, Shield, Cpu, Activity, Globe, Database, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Projects & Case Studies | Team Axiogen',
  description: 'Explore live software systems engineered by Team Axiogen: ClinicOS Medical EHR, Digitize AI Document Intelligence, CodeMind AI, SEOHub Pro, RansomGuard AI, and TruthLens.',
  alternates: { canonical: 'https://team.axiogen.in/projects' },
};

const projects = [
  {
    name: 'Axiogen ClinicOS',
    category: 'Healthcare EHR SaaS',
    tagline: 'Complete medical clinic & dental practice management software',
    desc: 'Engineered for doctors and multi-specialty healthcare practices. Features patient queuing, medical records, digital e-prescriptions, and automated WhatsApp appointment reminders.',
    tech: ['Next.js 15', 'TypeScript', 'Supabase PostgreSQL', 'TailwindCSS', 'Baileys WhatsApp'],
    link: 'https://github.com/axiogenai/axiogen-clinicos'
  },
  {
    name: 'Axiogen Digitize',
    category: 'Document Intelligence AI',
    tagline: '17-Stage AI Document Intelligence & Data Extraction Pipeline',
    desc: 'Autonomous document parsing engine transforming complex unstructured PDFs, clinical lab reports, invoices, and handwritten notes into structured JSON schemas.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'Groq Llama 70B', 'OCR Tesseract'],
    link: 'https://github.com/axiogenai/axiogen-digitize'
  },
  {
    name: 'SEOHub Pro',
    category: 'Enterprise SEO & Search Platform',
    tagline: 'AI-Powered Search Engine Optimization & Crawl Analytics Engine',
    desc: 'Full-scale SEO audit platform with real-time website crawling, Google Gemini AI keyword intelligence, PageSpeed diagnostics, and organic ranking telemetry.',
    tech: ['Next.js', 'React', 'Gemini AI', 'PageSpeed API', 'TailwindCSS'],
    link: 'https://seohubpro.vercel.app'
  },
  {
    name: 'CodeMind AI',
    category: 'Software Intelligence & Reverse Engineering',
    tagline: 'Autonomous Codebase Reverse Engineering & Architecture Analysis',
    desc: 'Deep multi-language code analysis tool capable of ingesting entire repositories, constructing Abstract Syntax Trees (AST), mapping dependency graphs, and providing AI refactoring solutions.',
    tech: ['Python', 'LangChain', 'Tree-Sitter', 'TypeScript', 'Docker'],
    link: 'https://github.com/axiogenai/codemind-ai'
  },
  {
    name: 'TruthLens Pro',
    category: 'AI Digital Forensics',
    tagline: 'Forensic Misinformation & Image Tampering Detection Platform',
    desc: 'Forensic fact-checking tool analyzing news text and detecting digital image manipulation using Error Level Analysis (ELA) and spread-risk prediction algorithms.',
    tech: ['Python', 'FastAPI', 'OpenCV', 'PyTorch', 'Next.js'],
    link: 'https://truth-lenspro.vercel.app'
  },
  {
    name: 'RansomGuard AI',
    category: 'Cybersecurity Endpoint Defense',
    tagline: 'Real-Time Watchdog Filesystem Ransomware Isolation Engine',
    desc: 'Zero-day ransomware detection agent utilizing filesystem honey-traps, file entropy metrics, and an XGBoost machine learning ensemble to halt encryption attacks in milliseconds.',
    tech: ['Python', 'XGBoost', 'Socket.IO', 'SQLite', 'Flask'],
    link: '#'
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#07070c] text-white font-sans selection:bg-purple-500/30 selection:text-white pb-20">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07070c]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Axiogen
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">Case Studies</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        
        {/* Title Hero */}
        <section className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
            Portfolio & Systems
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Engineered Systems & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Live Deployments</span>.
          </h1>
          <p className="text-base text-white/60 leading-relaxed font-normal">
            A showcase of production software platforms, artificial intelligence systems, and medical applications developed by Team Axiogen.
          </p>
        </section>

        {/* Projects List */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(p => (
              <div key={p.name} className="p-6 rounded-3xl bg-[#0b0b16] border border-white/[0.07] hover:border-purple-500/30 space-y-4 transition-all flex flex-col justify-between group">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/60">
                      {p.category}
                    </span>
                    {p.link !== '#' && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{p.name}</h3>
                  <p className="text-xs font-semibold text-purple-400/90">{p.tagline}</p>
                  <p className="text-xs text-white/60 leading-relaxed pt-1">{p.desc}</p>
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex flex-wrap gap-1.5">
                  {p.tech.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-white/40 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4 text-xs font-semibold text-white/60">
          <span>Explore More:</span>
          <Link href="/about" className="text-purple-400 hover:text-purple-300 underline">About Studio</Link>
          <span>·</span>
          <Link href="/founder" className="text-purple-400 hover:text-purple-300 underline">Founder Profile</Link>
          <span>·</span>
          <Link href="/services" className="text-purple-400 hover:text-purple-300 underline">Services & Solutions</Link>
          <span>·</span>
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">Contact Us</Link>
        </section>

      </main>
    </div>
  );
}
