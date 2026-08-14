import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, Mail, Phone, MessageSquare, MapPin, 
  Globe, Sparkles, Send, CheckCircle2, Clock, Shield
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Team Axiogen | AI Automation & Custom Software Engineering',
  description: 'Get in touch with Team Axiogen for AI voice calling agents, ClinicOS medical SaaS, high-performance web development, and custom business automation partnerships.',
  alternates: { canonical: 'https://team.axiogen.in/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-purple-500/30 selection:text-white relative overflow-hidden pb-24">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-gradient-to-b from-purple-600/20 via-pink-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -left-40 w-[550px] h-[550px] bg-indigo-600/15 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-teal-600/10 blur-[150px] rounded-full" />
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
          <span className="text-[11px] font-bold tracking-widest text-purple-300 uppercase">Direct Contact & Engagement</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 space-y-16">
        
        {/* ─── Hero Title ─── */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-purple-400" /> Let&apos;s Build Together
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Initiate a Direct <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Engineering Partnership</span>.
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed font-normal max-w-3xl">
            Whether you require an autonomous AI voice calling agent, a clinic management platform, or bespoke high-performance web systems, our engineering team is ready to deliver.
          </p>
        </section>

        {/* ─── Contact Info Cards ─── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-7 rounded-3xl bg-[#090912] border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">Email Inquiries</span>
            <p className="text-base font-bold text-white">contact@axiogen.in</p>
            <p className="text-xs text-white/50 leading-relaxed">Guaranteed technical reply within 12 hours.</p>
          </div>

          <div className="p-7 rounded-3xl bg-[#090912] border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">WhatsApp Gateway</span>
            <p className="text-base font-bold text-white">+91 98765 43210</p>
            <p className="text-xs text-white/50 leading-relaxed">Live chat demo & instant business messaging.</p>
          </div>

          <div className="p-7 rounded-3xl bg-[#090912] border border-pink-500/20 hover:border-pink-500/40 transition-all space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/25 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-pink-300 font-bold block">Headquarters</span>
            <p className="text-base font-bold text-white">Mumbai, Maharashtra</p>
            <p className="text-xs text-white/50 leading-relaxed">India · Operating globally across time zones.</p>
          </div>

        </section>

        {/* ─── Strategy Consultation Box ─── */}
        <section className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-950/40 via-[#0a0a14] to-[#050508] border border-purple-500/30 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-bold uppercase tracking-widest">
            15-Minute Strategy Consultation
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Book a Free 15-Minute Technical Audit</h2>
          <p className="text-xs md:text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Discover how Axiogen AI voice agents, custom software architectures, and automated CRM workflows can scale your lead qualification and operational efficiency.
          </p>
          <div className="pt-2">
            <a
              href="mailto:contact@axiogen.in?subject=Axiogen%20Strategy%20Consultation"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs md:text-sm font-bold text-white shadow-xl shadow-purple-600/30 transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" /> Send Direct Strategy Request
            </a>
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
            <Link href="/projects" className="text-purple-400 hover:text-white transition-colors">Projects</Link>
          </div>
          <p className="text-[11px] text-white/30 font-mono">© 2026 Team Axiogen. All rights reserved.</p>
        </section>

      </main>
    </div>
  );
}
