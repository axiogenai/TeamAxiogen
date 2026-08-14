import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, Sparkles, Terminal, Shield, Cpu, 
  ExternalLink, Mail, Phone, Code2, Layers, 
  CheckCircle2, Compass, Rocket, Award, Network
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aditya Patil — Founder & Chief Software Architect | Team Axiogen',
  description: 'Meet Aditya Patil, Founder & Chief Software Architect at Team Axiogen. Specialized in real-time AI voice agents, ClinicOS medical platform, high-performance web systems, and neural pipelines.',
  alternates: { canonical: 'https://team.axiogen.in/founder' },
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-purple-500/30 selection:text-white relative overflow-hidden pb-24">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-indigo-600/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-teal-600/10 blur-[150px] rounded-full" />
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
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest text-purple-300 uppercase">Founder & Leadership</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 space-y-16">
        
        {/* ─── Hero Spotlight Card ─── */}
        <section className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-purple-950/30 space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl blur opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-24 h-24 rounded-2xl bg-[#090912] border border-white/20 flex flex-col items-center justify-center text-white shadow-2xl">
                <span className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-300">
                  AP
                </span>
                <span className="text-[9px] uppercase tracking-widest text-purple-400 font-mono mt-0.5">AXIOGEN</span>
              </div>
            </div>

            {/* Headline Info */}
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-purple-400" /> Founder & Chief Software Architect
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                Aditya Patil
              </h1>
              <p className="text-sm md:text-base text-white/60 font-medium">
                Systems Architect · AI Systems Specialist · Founder of <strong className="text-white">Team Axiogen</strong>
              </p>
            </div>
          </div>

          {/* Bio Quote */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] relative overflow-hidden">
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-normal italic">
              &ldquo;Software shouldn&apos;t just look futuristic — it must execute with relentless speed, solve hard operational bottlenecks, and automate what humans shouldn&apos;t have to do repeatedly.&rdquo;
            </p>
            <p className="text-xs text-white/40 font-mono mt-2 font-medium">— Aditya Patil, Mumbai, India</p>
          </div>

          {/* Social Connect Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="https://github.com/axiogenai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-bold flex items-center gap-2 text-white hover:text-purple-300 transition-all hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Organization
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30 hover:scale-105"
            >
              <Mail className="w-3.5 h-3.5" /> Direct Consultation Inquiry
            </Link>
          </div>
        </section>

        {/* ─── Vision & Background Section ─── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Vision & Philosophy</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#090912] border border-white/[0.06] space-y-3">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">01 / PRINCIPLE</span>
              <h3 className="text-base font-bold text-white">Sub-Second Execution</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Whether it is web application page loads or real-time neural TTS audio synthesis, latency is the ultimate metric of software quality. Every millisecond shaved creates higher trust and conversion.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090912] border border-white/[0.06] space-y-3">
              <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-widest">02 / PRINCIPLE</span>
              <h3 className="text-base font-bold text-white">Vertical Domain SaaS</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Generic software fails specialized workflows. Products like <strong>ClinicOS</strong> are engineered specifically for doctor-patient interactions, digital queue displays, and instant WhatsApp prescription delivery.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Signature Architectures Engineered ─── */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Signature Systems Engineered</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c0c18] to-[#07070e] border border-purple-500/20 space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-purple-400 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 font-mono">Neural Audio AI</span>
                <span className="text-xs text-white/30 font-mono">2026</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Axiogen Real-Time Voice Calling Engine</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Sub-200ms conversational AI voice agent combining local ONNX WebAssembly Kokoro-82M multi-threaded audio synthesis with Groq Llama 8B conversational brains.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Kokoro-82M', 'WebAssembly SIMD', 'Groq Whisper Turbo', 'Llama 8B'].map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c0c18] to-[#07070e] border border-teal-500/20 space-y-3 relative overflow-hidden group hover:border-teal-500/40 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-teal-400 px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 font-mono">Healthcare EHR</span>
                <span className="text-xs text-white/30 font-mono">2026</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">Axiogen ClinicOS Healthcare Platform</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Complete clinic EHR, patient token queue management, digital prescription generator, and automated Baileys WhatsApp appointment confirmations.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Next.js 15', 'Supabase Postgres', 'Baileys Gateway', 'TailwindCSS'].map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c0c18] to-[#07070e] border border-blue-500/20 space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-blue-400 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 font-mono">Document AI</span>
                <span className="text-xs text-white/30 font-mono">2025</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">Axiogen Digitize Document Pipeline</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                17-stage AI Document Intelligence pipeline parsing complex clinical PDFs, handwritten prescriptions, and invoices into normalized JSON schemas.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['FastAPI', 'PyTorch', 'Groq Vision', 'Tesseract OCR'].map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50">{t}</span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c0c18] to-[#07070e] border border-pink-500/20 space-y-3 relative overflow-hidden group hover:border-pink-500/40 transition-all">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-pink-400 px-2 py-0.5 rounded-md bg-pink-500/10 border border-pink-500/20 font-mono">Cybersecurity</span>
                <span className="text-xs text-white/30 font-mono">2025</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">RansomGuard AI Endpoint Engine</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Real-time filesystem trap architecture utilizing file entropy telemetry and XGBoost ML ensembles to detect and halt ransomware in &lt;50ms.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {['Python', 'XGBoost', 'Watchdog Traps', 'Socket.IO'].map(t => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50">{t}</span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ─── Footer Navigation Links ─── */}
        <section className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-white/50">
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-purple-400 hover:text-white transition-colors">About Studio</Link>
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
