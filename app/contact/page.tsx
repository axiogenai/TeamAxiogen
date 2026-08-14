import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MessageSquare, MapPin, Globe, Sparkles, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Team Axiogen | AI Automation & Software Inquiries',
  description: 'Get in touch with Team Axiogen for custom software engineering, AI voice agents, ClinicOS medical platform, and digital automation partnerships.',
  alternates: { canonical: 'https://team.axiogen.in/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#07070c] text-white font-sans selection:bg-purple-500/30 selection:text-white pb-20">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07070c]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Axiogen
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-widest text-purple-300 uppercase">Contact</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        
        {/* Title Hero */}
        <section className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
            Start a Conversation
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Let’s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Exceptional Together</span>.
          </h1>
          <p className="text-base text-white/60 leading-relaxed font-normal">
            Whether you need autonomous AI agents, a clinic management suite, or high-performance custom web applications, we are ready to collaborate.
          </p>
        </section>

        {/* Contact Info Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <Mail className="w-5 h-5 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Email Inquiries</h3>
            <p className="text-sm font-bold text-white">contact@axiogen.in</p>
            <p className="text-[11px] text-white/40">Guaranteed response within 12 hours.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">WhatsApp Gateway</h3>
            <p className="text-sm font-bold text-white">+91 98765 43210</p>
            <p className="text-[11px] text-white/40">Instant business messaging & demo line.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <MapPin className="w-5 h-5 text-pink-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Location</h3>
            <p className="text-sm font-bold text-white">Mumbai, Maharashtra</p>
            <p className="text-[11px] text-white/40">India · Operating globally.</p>
          </div>

        </section>

        {/* Quick Consultation CTA */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-purple-950/30 via-[#0b0b16] to-[#07070c] border border-purple-500/25 space-y-4 text-center">
          <h2 className="text-2xl font-bold">Book a Free 15-Minute Strategy Audit</h2>
          <p className="text-sm text-white/60 max-w-xl mx-auto">
            Discover how Axiogen AI automation and custom software can increase your conversion rates, streamline operations, and eliminate administrative overhead.
          </p>
          <div className="pt-2">
            <a
              href="mailto:contact@axiogen.in?subject=Axiogen%20Strategy%20Consultation"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-bold text-white shadow-xl shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send Direct Request
            </a>
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
          <Link href="/projects" className="text-purple-400 hover:text-purple-300 underline">Case Studies</Link>
        </section>

      </main>
    </div>
  );
}
