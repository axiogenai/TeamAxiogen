'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useSectionVisibility, 
  useNavSection,
  getStableHeight, 
  setProjectCount, 
  getProjectPagesCount,
  getSectionFrames, 
  getMaxScrollMultiplier 
} from '../hooks/useScroll';
import { supabase } from '../lib/supabaseClient';
import { LogoLoop } from './LogoLoop';
import { ScrollVelocity } from './ScrollVelocity';
import { AnimatedCounter } from './AnimatedCounter';
import { TextReveal } from './TextReveal';
import { MagneticButton } from './MagneticButton';
import LightTunnel from './LightTunnel';
import { GlobalVisitorMap } from './GlobalVisitorMap';

import { 
  ArrowDown, 
  Mail, 
  Phone,
  MessageSquare, 
  Briefcase,
  ChevronRight,
  Send,
  BookOpen,
  Brain,
  Globe,
  Smartphone,
  Cloud,
  Database,
  Mic,
  FileText,
  Search,
  GraduationCap,
  Building2,
  Rocket,
  Layers
} from 'lucide-react';

const SkillIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'React / Next.js':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full fill-none stroke-[#61dafb] stroke-[1.5]">
            <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
            <g stroke="#61dafb">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </div>
      );
    case 'JavaScript / TypeScript':
      return (
        <div className="w-5 h-5 flex items-center justify-center rounded-sm overflow-hidden bg-gradient-to-r from-[#f7df1e] to-[#3178c6] shrink-0 text-white select-none">
          <svg viewBox="0 0 100 50" className="w-full h-full font-black">
            <rect x="0" y="0" width="50" height="50" fill="#f7df1e" />
            <text x="40" y="40" fontFamily="sans-serif" fontSize="28" fill="black" textAnchor="end">JS</text>
            <rect x="50" y="0" width="50" height="50" fill="#3178c6" />
            <text x="90" y="40" fontFamily="sans-serif" fontSize="28" fill="white" textAnchor="end">TS</text>
          </svg>
        </div>
      );
    case 'Java':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 128 128" className="w-full h-full">
            <path fill="#0074BD" d="M47.6 98.1c-4.8 2.8 3.4 3.7 9.9 1.1 10.9-1.1 25.8-1.1 25.8-1.1s2.9 1.8 6.9 3.4c-24.4 10.5-55.3-.6-36.1-6M44.6 84.5c-5.3 4 2.8 4.8 10.6 1.1 14.3-1.2 33.4-1.6 33.4-1.6s2 2 5.1 3.1c-29.5 8.6-62.4.7-41.3-6.3M102.1 108.2s3.5 2.9-3.9 5.2c-14.1 4.3-58.7 5.6-71.1.2-4.5-1.9 3.9-4.6 6.5-5.2 2.7-.6 4.3-.5 4.3-.5-5-3.5-32 6.9-13.7 9.8 49.8 8.1 90.8-3.6 77.9-9.5" />
            <path fill="#EA2D2E" d="M69.8 61.3c6 6.9-1.6 13.2-1.6 13.2s15.3-7.9 8.3-17.8c-6.6-9.2-11.6-13.8 15.6-29.6 0 0-42.7 10.7-22.3 34.2zM55.8 48.3c4 5.9-1.6 10.2-1.6 10.2s10.3-6.9 5.3-14.8c-4.6-7.2-10-12 11.6-23.6 0 0-30.7 9.7-15.3 28.2z" />
          </svg>
        </div>
      );
    case 'C / C++':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#00599C] stroke-[6]">
            <polygon points="50,8 86,29 86,71 50,92 14,71 14,29" fill="#00599C" stroke="#00599C" strokeWidth="4" />
            <text x="50" y="66" fontFamily="sans-serif" fontWeight="900" fontSize="42" fill="white" textAnchor="middle">C++</text>
          </svg>
        </div>
      );
    case 'Kotlin / Android Studio':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#3ddc84]">
            <path d="M17.6 9.48l1.7-2.95c.14-.24.06-.54-.18-.68-.24-.14-.54-.06-.68.18l-1.73 3a10.8 10.8 0 0 0-9.62 0l-1.73-3c-.14-.24-.44-.32-.68-.18-.24.14-.32.44-.18.68l1.7 2.95A11 11 0 0 0 1.25 17c0 .28.22.5.5.5h20.5c.28 0 .5-.22.5-.5a11 11 0 0 0-5.15-7.52zM7.5 13.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm9 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
        </div>
      );
    case 'Swift / iOS':
      return (
        <div className="w-5 h-5 flex items-center justify-center rounded-sm overflow-hidden bg-gradient-to-tr from-[#fd3024] to-[#ff8c2e] shrink-0">
          <svg viewBox="0 0 256 256" className="w-full h-full p-0.5">
            <path d="M144.7 38c84.4 57.4 57.1 120.7 57.1 120.7s24 27.1 14.3 50.8c0 0-9.9-16.6-26.5-16.6-16 0-25.4 16.6-57.6 16.6-71.7 0-105.6-59.9-105.6-59.9C91 192.1 135.1 162 135.1 162c-29.1-16.9-91-97.7-91-97.7 53.9 45.9 77.2 58 77.2 58-13.9-11.5-52.9-67.7-52.9-67.7 31.2 31.6 93.2 75.7 93.2 75.7C179.2 81.5 144.7 38 144.7 38z" fill="#FFF"/>
          </svg>
        </div>
      );
    case 'React Native / Flutter':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 256 317" className="w-full h-full">
            <path fill="#47C5FB" d="M158 0 0 158l49 48L255 0zM157 145l-85 85 49 50 49-49 85-86z"/>
            <path fill="#00569E" d="m121 280 37 37h97l-85-86z"/>
            <path fill="#00B5F8" d="m72 230 48-48 50 49-49 49z"/>
          </svg>
        </div>
      );
    case 'Gradle / XML':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#02303A]">
            <path d="M22.695 4.297a3.807 3.807 0 0 0-5.29-.09.368.368 0 0 0 0 .533l.46.47a.363.363 0 0 0 .474.032 2.182 2.182 0 0 1 2.86 3.291c-3.023 3.02-7.056-5.447-16.211-1.083a1.24 1.24 0 0 0-.534 1.745l1.571 2.713a1.238 1.238 0 0 0 1.681.461l.037-.02-.029.02.688-.384a16.083 16.083 0 0 0 2.193-1.635.384.384 0 0 1 .499-.016.357.357 0 0 1 .016.534 16.435 16.435 0 0 1-2.316 1.741H8.77l-.696.39a1.958 1.958 0 0 1-.963.25 1.987 1.987 0 0 1-1.726-.989L3.9 9.696C1.06 11.72-.686 15.603.26 20.522a.363.363 0 0 0 .354.296h1.675a.363.363 0 0 0 .37-.331 2.478 2.478 0 0 1 4.915 0 .36.36 0 0 0 .357.317h1.638a.363.363 0 0 0 .357-.317 2.478 2.478 0 0 1 4.914 0 .363.363 0 0 0 .358.317h1.627a.363.363 0 0 0 .363-.357c.037-2.294.656-4.93 2.42-6.25 6.108-4.57 4.502-8.486 3.088-9.9zm-6.229 6.901l-1.165-.584a.73.73 0 1 1 1.165.587z"/>
          </svg>
        </div>
      );
    case 'Three.js / WebGL':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-white stroke-[1.5]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 22l10-10L22 22" />
          </svg>
        </div>
      );
    case 'Node.js / Express':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#68a063]">
            <path d="M12 2L4.5 6.3v9.4L12 22l7.5-4.3v-9.4L12 2zm6 12.8l-6 3.5-6-3.5v-5.6l6-3.5 6 3.5v5.6z"/>
          </svg>
        </div>
      );
    case 'TailwindCSS':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#38bdf8]">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .25 1.63.89 2.38 1.65 1.23 1.25 2.66 2.7 5.42 2.7 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.55-.87-2.3-1.62-.89-.92-1.92-2-3.7-2.03zm-6 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.99.25 1.62.89 2.37 1.65 1.23 1.25 2.66 2.7 5.43 2.7 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.55-.87-2.3-1.62-.89-.92-1.92-2-3.7-2.03z"/>
          </svg>
        </div>
      );
    case 'Python':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="16 16 32 32" className="w-full h-full">
            <path fill="#387EB8" d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"/>
            <path fill="#FFD43B" d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"/>
          </svg>
        </div>
      );
    case 'PyTorch / TensorFlow':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#ee4c2c]">
            <path d="M12.005 0L4.952 7.053a9.865 9.865 0 0 0 0 14.022 9.866 9.866 0 0 0 14.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.904 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l-4.652-4.652.58-.667z"/>
          </svg>
        </div>
      );
    case 'Cloud & DevOps':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-purple-400 stroke-[1.5]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
      );
    case 'PostgreSQL / SQL':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-[#336791] stroke-[1.5]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.4 0-8 3.6-8 8v3c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-3c0-4.4-3.6-8-8-8z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11c0-1.7 1.3-3 3-3s3 1.3 3 3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 14h2M17 14h2" />
          </svg>
        </div>
      );
    case 'Docker / Containers':
      return (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#2496ed]">
            <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

interface ProjectItem {
  name: string;
  category: string;
  year: string;
  desc: string;
  tech: string[];
  link?: string;
  preview: string;
}

const fallbackProjects: ProjectItem[] = [
  {
    name: 'Axiogen AI',
    category: 'Artificial Intelligence',
    year: '2026',
    desc: 'Core neural network training workspace powering predictive analytics and cognitive assistant agents.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'Docker'],
    preview: 'from-purple-600 to-indigo-600'
  },
  {
    name: 'RansomGuard AI',
    category: 'Cybersecurity AI',
    year: '2026',
    desc: 'Real-time ransomware detection and response engine powered by watchdog traps, entropy analysis, and an ML ensemble.',
    tech: ['Python', 'Flask', 'XGBoost', 'Socket.IO', 'SQLite'],
    preview: 'from-red-600 to-orange-600'
  },
  {
    name: 'OmniDx',
    category: 'Digital Health AI',
    year: '2026',
    desc: 'Advanced medical X-ray pathology classification using DenseNet121 and Grad-CAM visual heatmaps for explainability.',
    tech: ['PyTorch', 'Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    preview: 'from-blue-600 to-teal-600'
  },
  {
    name: 'Blockchain Forge',
    category: 'Web3 Infrastructure',
    year: '2025',
    desc: 'High-performance cryptographic sandbox tool for generating, mining, and auditing distributed chains.',
    tech: ['TypeScript', 'Node.js', 'Framer Motion', 'TailwindCSS'],
    preview: 'from-pink-600 to-rose-600'
  },
  {
    name: 'NAAC Platform',
    category: 'Enterprise SaaS',
    year: '2025',
    desc: 'Advanced academic accreditation suite streamlining documentation, criteria metrics, and reporting.',
    tech: ['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
    preview: 'from-teal-600 to-emerald-600'
  },
  {
    name: 'SessionWarden',
    category: 'Authentication Audit',
    year: '2025',
    desc: 'Active session protection agent intercepting hijack attempts and managing token rotation in real-time.',
    tech: ['JavaScript', 'Express', 'JWT Security', 'TailwindCSS'],
    preview: 'from-yellow-600 to-amber-600'
  },
  {
    name: 'Lumina Backgrounds',
    category: 'Creative UI Assets',
    year: '2025',
    desc: 'Library of fluid particle simulations and interactive canvas shaders built for premium web graphics.',
    tech: ['WebGL', 'GLSL', 'Canvas API', 'Vanilla CSS'],
    preview: 'from-cyan-600 to-blue-600'
  },
  {
    name: 'Patient AI Explainer',
    category: 'Digital Health AI',
    year: '2026',
    desc: 'Conversational patient explainer tool translating complex medical charts into simple patient-friendly reports.',
    tech: ['React', 'TypeScript', 'FastAPI', 'LLM Agents'],
    preview: 'from-indigo-600 to-blue-600'
  },
  {
    name: 'Shivsai 360',
    category: 'Virtual Reality Web',
    year: '2025',
    desc: 'Immersive 360-degree virtual tour and panoramic walkthrough engine for real estate properties.',
    tech: ['Three.js', 'React Three Fiber', 'WebGL', 'CSS3D'],
    preview: 'from-purple-600 to-pink-600'
  },
  {
    name: 'OpenRouter Chatbot',
    category: 'Developer Tools',
    year: '2025',
    desc: 'Optimized multi-model chatbot sandbox integrating the openrouter API for low-latency code generation.',
    tech: ['Next.js', 'TypeScript', 'API Routing', 'TailwindCSS'],
    preview: 'from-slate-600 to-zinc-600'
  }
];

export const PortfolioContent = ({ totalFrames }: { totalFrames: number }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { 
    showHero, 
    showAbout, 
    showAboutUs, 
    showSkills,
    showFounder,
    showProjects, 
    projectPage, 
    showServices, 
    showContact 
  } = useSectionVisibility();
  const [activeTab, setActiveTab] = useState<'languages' | 'mobile' | 'web' | 'systems'>('languages');
  const [founderTab, setFounderTab] = useState<'patil' | 'minchekar'>('patil');
  const [founderPhase, setFounderPhase] = useState<'intro' | 'cards'>('intro');
  const [founderView, setFounderView] = useState<'founders' | 'map'>('founders');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);

  // Automatically transition from "Meet Our Founders" splash to cards after 1.5s
  useEffect(() => {
    if (showFounder) {
      setFounderPhase('intro');
      const timer = setTimeout(() => {
        setFounderPhase('cards');
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setFounderPhase('intro');
    }
  }, [showFounder]);

  // Tech switcher data
  const techData = {
    languages: [
      { name: 'Python', desc: 'AI/ML development, backend services, and automation' },
      { name: 'JavaScript / TypeScript', desc: 'Dynamic web applications, mobile apps, and scripts' },
      { name: 'Java', desc: 'Enterprise applications, Android apps, and robust systems' },
      { name: 'C / C++', desc: 'Low-level system programming, graphics, and optimization' },
    ],
    mobile: [
      { name: 'Kotlin / Android Studio', desc: 'Native Android app engineering and UI layout design' },
      { name: 'Swift / iOS', desc: 'Native iOS app development and performance-focused screens' },
      { name: 'React Native / Flutter', desc: 'Cross-platform mobile application development' },
      { name: 'Gradle / XML', desc: 'Build configurations, dependency trees, and UI scripting' },
    ],
    web: [
      { name: 'React / Next.js', desc: 'SSR, ISR, and dynamic component design' },
      { name: 'Three.js / WebGL', desc: '3D scene graphs, custom shaders, and GPU graphics' },
      { name: 'Node.js / Express', desc: 'Scalable API architectures and web backend routing' },
      { name: 'TailwindCSS', desc: 'Responsive utilities and theme styling' },
    ],
    systems: [
      { name: 'PyTorch / TensorFlow', desc: 'Deep learning models, neural networks, and AI pipelines' },
      { name: 'Cloud & DevOps', desc: 'AWS/GCP cloud architectures and CI/CD pipelines' },
      { name: 'PostgreSQL / SQL', desc: 'Optimized querying and relational models' },
      { name: 'Docker / Containers', desc: 'Containerization, API scaling, and system orchestration' },
    ],
  };

  const loopLogos = useMemo(() => {
    const uniqueSkills = new Set<string>();
    const list: { name: string; node: React.ReactNode }[] = [];
    
    Object.values(techData).forEach(skills => {
      skills.forEach(skill => {
        if (!uniqueSkills.has(skill.name)) {
          uniqueSkills.add(skill.name);
          list.push({
            name: skill.name,
            node: (
              <div className="flex items-center gap-3 px-4 py-2.5 bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 hover:bg-black/80 transition-all rounded-xl select-none group/item">
                <SkillIcon name={skill.name} />
                <span className="font-extrabold text-[10px] md:text-xs uppercase tracking-wider text-white group-hover/item:text-white transition-colors">{skill.name}</span>
              </div>
            )
          });
        }
      });
    });
    return list;
  }, []);

  useEffect(() => {
    const CACHE_KEY = 'axiogen_projects_cache_v2';

    const sanitizeLink = (link: any): string | undefined => {
      if (!link || typeof link !== 'string') return undefined;
      const trimmed = link.trim();
      if (trimmed === '' || trimmed === '#' || trimmed.toLowerCase().includes('github.com')) {
        return undefined;
      }
      return trimmed;
    };

    async function fetchProjects() {
      // Load cached projects immediately so the UI is never empty
      try {
        const cached = localStorage.getItem(CACHE_KEY) || localStorage.getItem('axiogen_projects_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const cleaned = parsed.map((p: any) => ({
              ...p,
              link: sanitizeLink(p.link)
            }));
            setProjects(cleaned);
            setProjectCount(cleaned.length);
          }
        }
      } catch (_) { /* ignore localStorage errors */ }

      if (!supabase) return; // No Supabase configured — stay on cache/fallback

      try {
        // Race between the Supabase request and a 6-second timeout
        const timeoutPromise = new Promise<null>((resolve) =>
          setTimeout(() => resolve(null), 6000)
        );
        const fetchPromise = supabase
          .from('projects')
          .select('*')
          .neq('hidden', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        const loadStaticFallback = async () => {
          try {
            const res = await fetch('/projects.json');
            if (res.ok) {
              const staticData = await res.json();
              // Filter out hidden projects
              const visibleData = Array.isArray(staticData) ? staticData.filter((p: any) => !p.hidden) : [];
              if (visibleData.length > 0) {
                const gradients = [
                  'from-purple-600 to-indigo-600',
                  'from-blue-600 to-teal-600',
                  'from-red-600 to-orange-600',
                  'from-pink-600 to-rose-600',
                  'from-teal-600 to-emerald-600',
                  'from-yellow-600 to-amber-600'
                ];
                const formatted = visibleData.map((p: any, index: number) => ({
                  name: p.name,
                  category: p.category,
                  year: p.year,
                  desc: p.desc,
                  tech: Array.isArray(p.tech) ? p.tech : JSON.parse(p.tech || '[]'),
                  link: sanitizeLink(p.link),
                  preview: p.preview || gradients[index % gradients.length]
                }));
                setProjects(formatted);
                setProjectCount(visibleData.length);
                try {
                  localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
                } catch (_) {}
              }
            }
          } catch (err) {
            console.warn('Failed to load static fallback projects.json:', err);
          }
        };

        const result = await Promise.race([fetchPromise, timeoutPromise]);

        // Timeout won — Supabase is offline, try projects.json fallback
        if (!result) {
          console.warn('Supabase timed out — trying static fallback projects.json');
          await loadStaticFallback();
          return;
        }

        const { data, error } = result as any;

        if (error) {
          console.warn('Supabase error — trying static fallback projects.json:', error.message);
          await loadStaticFallback();
          return;
        }

        if (data && data.length > 0) {
          const gradients = [
            'from-purple-600 to-indigo-600',
            'from-blue-600 to-teal-600',
            'from-red-600 to-orange-600',
            'from-pink-600 to-rose-600',
            'from-teal-600 to-emerald-600',
            'from-yellow-600 to-amber-600'
          ];
          const formatted = data.map((p: any, index: number) => ({
            name: p.name,
            category: p.category,
            year: p.year,
            desc: p.desc,
            tech: Array.isArray(p.tech) ? p.tech : JSON.parse(p.tech || '[]'),
            link: sanitizeLink(p.link),
            preview: p.preview || gradients[index % gradients.length]
          }));
          // Update UI with fresh data
          setProjects(formatted);
          setProjectCount(data.length);
          // Save to localStorage for future offline visits
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
          } catch (_) { /* ignore quota errors */ }
        }
      } catch (err) {
        console.warn('Supabase unreachable — trying static fallback projects.json:', err);
        // Try static fallback
        const loadStaticFallback = async () => {
          try {
            const res = await fetch('/projects.json');
            if (res.ok) {
              const staticData = await res.json();
              // Filter out hidden projects
              const visibleData = Array.isArray(staticData) ? staticData.filter((p: any) => !p.hidden) : [];
              if (visibleData.length > 0) {
                const gradients = [
                  'from-purple-600 to-indigo-600',
                  'from-blue-600 to-teal-600',
                  'from-red-600 to-orange-600',
                  'from-pink-600 to-rose-600',
                  'from-teal-600 to-emerald-600',
                  'from-yellow-600 to-amber-600'
                ];
                const formatted = visibleData.map((p: any, index: number) => ({
                  name: p.name,
                  category: p.category,
                  year: p.year,
                  desc: p.desc,
                  tech: Array.isArray(p.tech) ? p.tech : JSON.parse(p.tech || '[]'),
                  link: sanitizeLink(p.link),
                  preview: p.preview || gradients[index % gradients.length]
                }));
                setProjects(formatted);
                setProjectCount(visibleData.length);
                try {
                  localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
                } catch (_) {}
              }
            }
          } catch (e) {
            console.warn('Failed to load static fallback projects.json:', e);
          }
        };
        await loadStaticFallback();
      }
    }

    if (mounted) {
      fetchProjects();
    }
  }, [mounted]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const checkHashAndScroll = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      const frames = getSectionFrames();
      const P = getProjectPagesCount();
      const maxScroll = getMaxScrollMultiplier() * getStableHeight();

      let targetFrame = -1;
      if (hash === 'about') targetFrame = frames[1] ?? 83;
      else if (hash === 'founder' || hash === 'founders') targetFrame = frames[2] ?? 167;
      else if (hash === 'work' || hash === 'projects') targetFrame = frames[3] ?? 250;
      else if (hash === 'services') targetFrame = frames[3 + P] ?? 334;
      else if (hash === 'contact') targetFrame = frames[4 + P] ?? 418;

      if (targetFrame > 0 && maxScroll > 0) {
        const targetY = (targetFrame / 502) * maxScroll;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      } else if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    };

    const timer = setTimeout(checkHashAndScroll, 300);
    window.addEventListener('hashchange', checkHashAndScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('hashchange', checkHashAndScroll);
    };
  }, []);

  const activeSection = useNavSection();

  useEffect(() => {
    if (!mounted) return;

    let isAnimating = false;
    let animatingTimeout: ReturnType<typeof setTimeout> | null = null;
    let wheelAccumulator = 0;
    let wheelResetTimer: ReturnType<typeof setTimeout> | null = null;

    const sectionFrames = getSectionFrames();
    const mobile = window.innerWidth < 768;

    // Lock isAnimating with a safety timeout so it NEVER stays locked forever.
    const lockAnimation = () => {
      isAnimating = true;
      if (animatingTimeout) clearTimeout(animatingTimeout);
      animatingTimeout = setTimeout(() => {
        isAnimating = false;
      }, 750); // Safety: unlock after 750ms no matter what
    };

    const unlockAnimation = () => {
      isAnimating = false;
      if (animatingTimeout) {
        clearTimeout(animatingTimeout);
        animatingTimeout = null;
      }
    };

    // Find the nearest scrollable ancestor marked with data-scroll-container.
    // Only those explicitly-marked containers are treated as inner scroll zones.
    const findScrollContainer = (target: HTMLElement | null): HTMLElement | null => {
      if (!target) return null;
      let current: HTMLElement | null = target;
      while (current && current !== document.body) {
        if (current.tagName === 'INPUT' || current.tagName === 'TEXTAREA') {
          return current;
        }
        if (current.hasAttribute('data-scroll-container')) {
          const style = window.getComputedStyle(current);
          const isScrollable = style.overflowY === 'auto' || style.overflowY === 'scroll';
          if (isScrollable && current.scrollHeight > current.clientHeight + 2) {
            return current;
          }
        }
        current = current.parentElement;
      }
      return null;
    };

    // Check if the scrollable container should consume this scroll event
    const shouldConsumeScroll = (container: HTMLElement, diffY: number): boolean => {
      if (container.tagName === 'INPUT' || container.tagName === 'TEXTAREA') {
        return true;
      }
      if (diffY > 0) {
        return container.scrollTop + container.clientHeight < container.scrollHeight - 2;
      } else if (diffY < 0) {
        return container.scrollTop > 2;
      }
      return false;
    };

    const getClosestSectionIndex = () => {
      const maxScroll = getMaxScrollMultiplier() * getStableHeight();
      const scrollY = window.scrollY;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      const frame = Math.max(1, Math.min(502, Math.ceil((progress / 100) * 502)));

      let closestIdx = 0;
      let minDiff = Infinity;
      sectionFrames.forEach((f, idx) => {
        const diff = Math.abs(frame - f);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      return closestIdx;
    };



    const handleTransition = (direction: 'up' | 'down') => {
      const currentIndex = getClosestSectionIndex();
      let targetIndex = currentIndex;

      if (direction === 'down') {
        targetIndex = Math.min(sectionFrames.length - 1, currentIndex + 1);
      } else {
        targetIndex = Math.max(0, currentIndex - 1);
      }

      if (targetIndex !== currentIndex || (direction === 'down' && currentIndex === 0 && window.scrollY < 10)) {
        lockAnimation();

        const maxScroll = getMaxScrollMultiplier() * getStableHeight();
        const targetFrame = sectionFrames[targetIndex];
        const targetY = (targetFrame / 502) * maxScroll;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
        setTimeout(() => {
          unlockAnimation();
        }, 500);
      }
    };

    // ===== DESKTOP: Wheel-based snap scrolling =====
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollContainer = findScrollContainer(target);

      if (scrollContainer && shouldConsumeScroll(scrollContainer, e.deltaY)) {
        return;
      }

      e.preventDefault();
      if (isAnimating) return;

      wheelAccumulator += e.deltaY;
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => { wheelAccumulator = 0; }, 80);

      // Increased threshold to 80 to prevent accidental double-snaps on hyper-sensitive wheels/trackpads
      if (Math.abs(wheelAccumulator) < 80) return;

      const direction = wheelAccumulator > 0 ? 'down' : 'up';
      wheelAccumulator = 0;
      handleTransition(direction);
    };

    // ===== MOBILE: Touch-swipe paginated snap scrolling =====
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollContainer = findScrollContainer(target);
      if (scrollContainer) return; // Allow normal scrolling inside scroll containers

      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollContainer = findScrollContainer(target);
      if (scrollContainer && shouldConsumeScroll(scrollContainer, touchStartY - e.touches[0].clientY)) {
        return;
      }
      
      // Stop dynamic native momentum scroll to prevent flying past sections
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollContainer = findScrollContainer(target);
      if (scrollContainer) return;

      if (isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      // Swipe threshold: 45px minimum swipe to trigger section transition
      if (Math.abs(diffY) > 45) {
        const direction = diffY > 0 ? 'down' : 'up';
        handleTransition(direction);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        if (!isAnimating) handleTransition('down');
      } else if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        if (!isAnimating) handleTransition('up');
      }
    };

    if (!mobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    } else {
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      if (!mobile) {
        window.removeEventListener('wheel', handleWheel);
      } else {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      }
      window.removeEventListener('keydown', handleKeyDown);
      if (animatingTimeout) clearTimeout(animatingTimeout);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
    };
  }, [mounted]);

  const scrollToFrame = (frame: number) => {
    // Calculate maxScroll based on dynamic getTotalStates() multiplier
    const maxScroll = getMaxScrollMultiplier() * getStableHeight();
    const targetY = (frame / totalFrames) * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  // Section visibility is now computed in the useSectionVisibility() hook.
  // The hook only triggers re-renders when a section boundary is crossed,
  // reducing re-renders from ~thousands to ~15 across the entire scroll range.

  if (!mounted) return null;


  // Text Reveal Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 15, stiffness: 100 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  // Services data from user concept
  const servicesData = [
    {
      title: 'AI / ML Solutions',
      desc: 'Custom models, pipelines, and intelligent automation built to solve complex computational problems.',
      tags: ['Python', 'TensorFlow', 'PyTorch', 'FastAPI'],
      icon: Brain,
      borderStyle: 'from-[#6378FF] to-[#A78BFA]',
      triggerFrame: 0.1
    },
    {
      title: 'Web Development',
      desc: 'Modern full-stack applications with premium UX/UI and robust database routing configurations.',
      tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
      icon: Globe,
      borderStyle: 'from-[#00E6B4] to-[#6378FF]',
      triggerFrame: 0.2
    },
    {
      title: 'Mobile Apps',
      desc: 'Cross-platform native iOS & Android applications engineered for speed and fluid animations.',
      tags: ['React Native', 'Flutter', 'iOS / Android', 'UX Design'],
      icon: Smartphone,
      borderStyle: 'from-[#A78BFA] to-[#EC6EAD]',
      triggerFrame: 0.3
    },
    {
      title: 'Cloud Solutions',
      desc: 'Scalable cloud infrastructure, container orchestration, and continuous DevOps deployment pipelines.',
      tags: ['AWS / GCP', 'Docker', 'DevOps', 'CI/CD'],
      icon: Cloud,
      borderStyle: 'from-[#F7971E] to-[#FFD200]',
      triggerFrame: 0.4
    },
    {
      title: 'Database Design',
      desc: 'High-performance database architectures, query optimization, and secure data relation schemas.',
      tags: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Redis'],
      icon: Database,
      borderStyle: 'from-[#00E6B4] to-[#00B4D8]',
      triggerFrame: 0.5
    },
    {
      title: 'Voice Synthesis',
      desc: 'Real-time AI voice generation, speech-to-text integration, and interactive voice interfaces.',
      tags: ['AI Audio', 'TTS Engines', 'API Routing', 'WebSocket'],
      icon: Mic,
      borderStyle: 'from-[#6378FF] to-[#00E6B4]',
      triggerFrame: 0.6
    },
    {
      title: 'Document Intelligence',
      desc: 'AI-driven document parsing, automated text extraction, and contextual knowledge insights.',
      tags: ['OCR Engines', 'NLP Models', 'PDF Parsing', 'Data Extraction'],
      icon: FileText,
      borderStyle: 'from-[#EC6EAD] to-[#A78BFA]',
      triggerFrame: 0.7
    },
    {
      title: 'Deep Research',
      desc: 'Automated academic research, intelligent documentation, and domain knowledge synthesis.',
      tags: ['Research Agents', 'RAG Systems', 'Vector DB', 'Knowledge Graph'],
      icon: Search,
      borderStyle: 'from-[#FFD200] to-[#F7971E]',
      triggerFrame: 0.8
    }
  ];

  // Target segments / perfect for
  const perfectForData = [
    {
      title: 'Student Projects',
      desc: 'Final year, mini, academic & research projects with comprehensive documentation & step-by-step support.',
      icon: GraduationCap,
      color: 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
    },
    {
      title: 'Real-World Industry',
      desc: 'Enterprise workflow integrations, startup MVPs, and customized business process automation systems.',
      icon: Building2,
      color: 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
    },
    {
      title: 'Startups & Founders',
      desc: 'Rapid interactive product development, scalable application architectures, and end-to-end launch support.',
      icon: Rocket,
      color: 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
    }
  ];

  // Fallback projects are moved outside the component

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
    } catch (err) {
      console.error('Error submitting form:', err);
    }

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isInteractive = showHero || showAbout || showFounder || showProjects || showServices || showContact;

  // Motion variants for service card icons
  const getIconVariants = (title: string): any => {
    switch (title) {
      case 'AI / ML Solutions': // Brain
        return {
          hover: { scale: [1, 1.25, 1, 1.25, 1], transition: { repeat: Infinity, duration: 1.5 } }
        };
      case 'Web Development': // Globe
        return {
          hover: { rotate: 360, transition: { duration: 2, ease: "linear" as const, repeat: Infinity } }
        };
      case 'Mobile Apps': // Smartphone
        return {
          hover: { rotate: [-10, 10, -10], transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" as const } }
        };
      case 'Cloud Solutions': // Cloud
        return {
          hover: { y: [-2, 2, -2], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" as const } }
        };
      case 'Database Design': // Database
        return {
          hover: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" as const } }
        };
      case 'Voice Synthesis': // Mic
        return {
          hover: { x: [-1.5, 1.5, -1.5, 1.5, 0], transition: { repeat: Infinity, duration: 0.3 } }
        };
      case 'Document Intelligence': // FileText
        return {
          hover: { rotateY: 180, transition: { duration: 0.8 } }
        };
      case 'Deep Research': // Search
        return {
          hover: { scale: 1.25, rotate: 15, transition: { type: "spring", stiffness: 300, damping: 10 } }
        };
      default:
        return {
          hover: { scale: 1.1 }
        };
    }
  };

  return (
    <div className={`fixed inset-0 z-40 overflow-hidden ${isMobile ? 'touch-auto' : 'touch-none'} ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* Light mode opaque shield — blocks dark Galaxy/pillar from bleeding through during section transitions */}
      <div className="light-mode-shield absolute inset-0 pointer-events-none" style={{ zIndex: -1 }} />

      {/* ----------------- HERO SECTION ----------------- */}
      <motion.section 
        className="absolute inset-0 flex flex-col items-center justify-center text-center pt-16 pb-4 px-4 overflow-hidden"
        style={{ pointerEvents: showHero ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showHero ? 1 : 0, 
          y: showHero ? "0%" : "-100%",
          display: showHero ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* LightTunnel Hero Background (Hero Only) */}
        <div className="absolute inset-0 pointer-events-auto z-0 flex items-center justify-center overflow-hidden">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <LightTunnel
              cableColor="#A855F7"
              pulseColor="#A855F7"
              tunnelColor="#5227FF"
              tunnelOpacity={0}
              speed={0.1}
              flowDirection="outward"
              pulseSpeed={2}
              pulseLength={0.28}
              pulseBlend={1}
              pulseWidth={1}
              cableCount={20}
              thickness={0.35}
              rimWidth={0.15}
              waviness={0.3}
              sway={0.5}
              size={1}
              centerX={0}
              centerY={0}
              glow={1}
              fadeNear={0.5}
              fadeFar={2}
              brightness={1}
              colorVariance
              grain
              grainIntensity={0.05}
              opacity={1}
              mouseInteraction
              mouseStrength={0.1}
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={showHero ? "visible" : "hidden"}
            className="mb-6"
          >
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-normal text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-none"
              style={{ fontFamily: "'Turbo Driver', sans-serif" }}
            >
              <motion.span 
                variants={charVariants} 
                className="inline-block mr-4 md:mr-6"
                style={{ paddingRight: '0.1em' }}
              >
                TEAM
              </motion.span>
              <br />
              <motion.span 
                variants={charVariants} 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-indigo-400"
                style={{ paddingBottom: '0.15em', paddingRight: '0.25em', marginRight: '-0.25em' }}
              >
                AXIOGEN
              </motion.span>
            </h1>
          </motion.div>

          <motion.p 
            variants={fadeUpVariants}
            initial="hidden"
            animate={showHero ? "visible" : "hidden"}
            className="text-sm md:text-lg lg:text-xl text-white/70 font-normal max-w-xl md:max-w-3xl lg:max-w-4xl leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-8"
          >
            Axiogen is an AI Automation &amp; Software Engineering Studio. We engineer autonomous AI agents, SaaS platforms, bespoke web applications, mobile apps, and business automation systems for startups, healthcare clinics, and enterprises.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            variants={fadeUpVariants}
            initial="hidden"
            animate={showHero ? "visible" : "hidden"}
            onClick={() => scrollToFrame(getSectionFrames()[2] ?? 209)}
            className="group px-7 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 hover:border-white/40 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 pointer-events-auto"
          >
            <span>Explore Projects</span>
          </motion.button>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showHero ? 0.6 : 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        >
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-semibold">Scroll</span>
          <ArrowDown className="w-4 h-4 text-white/40 animate-bounce-down" />
        </motion.div>
      </motion.section>

      {/* ----------------- ABOUT SECTION ----------------- */}
      <motion.section
        className={`absolute inset-0 flex flex-col items-center justify-center pt-8 md:pt-12 pb-6 md:pb-8 px-4 md:px-16 text-white section-bg-adapt overflow-hidden`}
        style={{ pointerEvents: showAbout ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showAbout ? 1 : 0,
          x: showAbout ? "0%" : (activeSection === 'hero' ? "100%" : "-100%"),
          display: showAbout ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
        <div 
          className="flex flex-col items-center max-w-7xl w-full gap-2.5 md:gap-4 justify-center min-h-0 max-h-full"
        >
          <div 
            className={`grid grid-cols-12 gap-3 md:gap-8 items-start lg:items-stretch w-full px-2 py-1`}
          >
            <AnimatePresence mode={isMobile ? "wait" : "sync"}>
              {/* Bio statement */}
              {showAbout && (
                <motion.div
                  key="bio-statement"
                  initial={isMobile ? { opacity: 0, y: 15 } : undefined}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? { opacity: 0, y: -15 } : undefined}
                  transition={{ duration: 0.25 }}
                  className="col-span-12 lg:col-span-6 text-white bg-[var(--card-bg)] p-4 sm:p-6 md:p-8 rounded-[1.25rem] md:rounded-[2rem] border border-[var(--card-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] glass-card gradient-border flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                      <span className="text-[9px] md:text-xs font-semibold uppercase tracking-wider text-purple-300">AI Automation &amp; Software Engineering Studio</span>
                    </div>
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter mb-1.5 md:mb-3 leading-none whitespace-nowrap">
                      TEAM AXIOGEN.
                    </h2>
                    <p className="text-[11px] sm:text-sm md:text-base text-white/80 font-normal leading-relaxed mb-1.5 md:mb-3">
                      Axiogen is an Indian AI Automation &amp; Software Engineering Studio. We build autonomous AI voice agents, ClinicOS medical platform, and high-performance bespoke applications.
                    </p>
                    <p className="text-[9px] sm:text-xs md:text-sm text-white/60 font-normal leading-relaxed mb-3 md:mb-6">
                      Specializing in autonomous AI models, healthcare clinic operating systems, and scalable cloud engineering, we build high-impact production architectures tailored for enterprise scale.
                    </p>

                    <div className="flex flex-wrap gap-2.5 mb-2 md:mb-6">
                      <button 
                        onClick={() => scrollToFrame(getSectionFrames()[3] ?? 250)}
                        className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center gap-1.5 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all hover:scale-105 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>View Projects</span>
                      </button>
                    </div>
                  </div>

                  {/* Stats Row - Numbers Side-to-Side */}
                  <div className="grid grid-cols-4 gap-2 md:gap-3 pt-3 md:pt-5 border-t border-white/10 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-purple-400">
                        <AnimatedCounter value={50} suffix="+" trigger={showAbout} />
                      </span>
                      <span className="text-[7px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold mt-0.5 md:mt-1">Projects</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white">
                        <AnimatedCounter value={100} suffix="%" trigger={showAbout} />
                      </span>
                      <span className="text-[7px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold mt-0.5 md:mt-1">Custom Built</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-purple-400">
                        <AnimatedCounter value={99} suffix=".9%" trigger={showAbout} />
                      </span>
                      <span className="text-[7px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold mt-0.5 md:mt-1">Uptime SLA</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white">24/7</span>
                      <span className="text-[7px] sm:text-[9px] uppercase tracking-wider text-white/50 font-bold mt-0.5 md:mt-1">Automated</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills Interactive Switcher */}
              {showAbout && (
                <motion.div
                  key="skills-card"
                  initial={isMobile ? { opacity: 0, y: 15 } : undefined}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? { opacity: 0, y: -15 } : undefined}
                  transition={{ duration: 0.25 }}
                  className="col-span-12 lg:col-span-6 bg-[var(--card-bg)] p-4 sm:p-6 md:p-8 rounded-[1.25rem] md:rounded-[2rem] border border-[var(--card-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] glass-card gradient-border flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <div>
                        <h3 className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-none text-white">
                          CORE COMPETENCIES
                        </h3>
                        <p className="text-[9px] md:text-xs text-white/50 font-normal mt-0.5">Software Engineering &amp; AI Stack</p>
                      </div>
                      <span className="text-[9px] font-mono text-purple-300 font-bold uppercase bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                        {activeTab}
                      </span>
                    </div>

                    {/* Pill Bar Tabs */}
                    <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 rounded-xl border border-white/10 mb-2 md:mb-4 relative z-20 pointer-events-auto">
                      {(['languages', 'mobile', 'web', 'systems'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab(tab);
                          }}
                          className={`py-1 md:py-2 text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer relative z-30 pointer-events-auto ${
                            activeTab === tab 
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Skill Details Display */}
                    <div className="flex-1">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="col-span-2 grid grid-cols-2 gap-1.5 md:gap-4"
                        >
                          {techData[activeTab].map((skill, index) => (
                            <div 
                              key={index}
                              className="p-2 md:p-5 rounded-lg md:rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 flex flex-col md:justify-center gap-0.5 md:gap-1.5 shadow-lg group relative overflow-hidden"
                            >
                              {/* Glow outline hover effect */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                              
                              <div className="flex items-center justify-between md:mb-1.5 w-full">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                  <SkillIcon name={skill.name} />
                                  <span className="font-bold text-[8px] sm:text-xs md:text-sm text-white group-hover:text-purple-300 transition-colors">{skill.name}</span>
                                </div>
                                <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all text-purple-300 block" />
                              </div>
                              <p className="text-[8px] sm:text-xs text-white/60 leading-relaxed font-normal">{skill.desc}</p>
                            </div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logo Loop Section - ALWAYS visible & continuously moving */}
          <div className="w-full px-2 overflow-hidden select-none pointer-events-auto mt-1 md:mt-2">
            <LogoLoop logos={loopLogos} />
          </div>
        </div>
      </motion.section>


      {/* ----------------- FOUNDERS SECTION (AUTO-REVEAL INTRO -> CARDS) ----------------- */}
      <motion.section
        className={`absolute inset-0 flex flex-col items-center justify-start lg:justify-center pt-20 sm:pt-24 lg:pt-0 pb-16 sm:pb-20 lg:pb-0 px-3 sm:px-6 md:px-12 lg:px-16 text-white overflow-y-auto lg:overflow-hidden transition-colors duration-500 ${
          founderPhase === 'intro' ? 'bg-black' : 'section-bg-adapt'
        }`}
        style={{ pointerEvents: showFounder ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showFounder ? 1 : 0,
          x: showFounder ? "0%" : (['hero', 'about'].includes(activeSection) ? "100%" : "-100%"),
          display: showFounder ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          {founderPhase === 'intro' ? (
            /* Stage 1: Automated Fullscreen Reveal Splash */
            <motion.div
              key="founders-intro-splash"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)', transition: { duration: 0.45, ease: 'easeInOut' } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setFounderPhase('cards')}
              className="relative z-10 flex flex-col items-center justify-center max-w-[92vw] sm:max-w-2xl w-full mx-auto space-y-3.5 sm:space-y-5 text-center cursor-pointer pointer-events-auto select-none my-auto"
            >
              {/* Luxury Studio Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl text-white/75 text-[9px] sm:text-xs font-light uppercase tracking-[0.22em] sm:tracking-[0.3em] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                <span>The Minds Behind Axiogen</span>
              </motion.div>

              {/* Bespoke Luxury Haute Headline */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1 sm:space-y-2"
              >
                <h2 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extralight tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.35em] text-white/80 drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] uppercase leading-none inline-flex items-center justify-center gap-3 sm:gap-4"
                  style={{ fontFamily: "'Rostex', sans-serif" }}
                >
                  <span>MEET</span>
                  <span>OUR</span>
                </h2>
                <h2 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-normal tracking-[0.18em] sm:tracking-[0.25em] md:tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] uppercase leading-none"
                  style={{ fontFamily: "'Rostex', sans-serif" }}
                >
                  FOUNDERS
                </h2>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[11px] sm:text-sm md:text-base text-white/60 font-light max-w-lg sm:max-w-xl leading-relaxed mx-auto tracking-wide px-2"
              >
                Software engineers &amp; system architects engineering autonomous AI models, high-performance web architectures, and enterprise cloud infrastructure.
              </motion.p>

              {/* Luxury Hairline Progress Indicator */}
              <div className="w-36 sm:w-56 h-[2px] bg-white/[0.08] rounded-full overflow-hidden mt-2 sm:mt-3 shadow-inner">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-white/30 via-white to-white/30 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                />
              </div>

              <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] text-white/35 uppercase tracking-[0.2em] sm:tracking-[0.25em] font-light pt-0.5">
                <span>Revealing Profiles</span>
              </div>
            </motion.div>
          ) : (
            /* Stage 2: Founder Details Cards & Global Reach */
            <motion.div
              key="founders-cards-view"
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center max-w-6xl w-full gap-2.5 sm:gap-3.5 md:gap-4 justify-center my-auto min-h-0 w-full"
            >
              {/* Luxury Haute Header & View Switcher */}
              <div className="flex flex-col items-center justify-center text-center mb-1 sm:mb-2">
                <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-2 shadow-lg pointer-events-auto">
                  <button
                    onClick={() => setFounderView('founders')}
                    className={`px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-light uppercase tracking-[0.16em] transition-all cursor-pointer ${
                      founderView === 'founders'
                        ? 'bg-white text-black shadow-[0_2px_12px_rgba(255,255,255,0.3)] font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    The Founders
                  </button>
                  <button
                    onClick={() => setFounderView('map')}
                    className={`px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-light uppercase tracking-[0.16em] transition-all cursor-pointer flex items-center gap-1.5 ${
                      founderView === 'map'
                        ? 'bg-white text-black shadow-[0_2px_12px_rgba(255,255,255,0.3)] font-semibold'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Globe className="w-3 h-3 text-purple-400" />
                    <span>Global Reach</span>
                  </button>
                </div>
              </div>

              {founderView === 'map' ? (
                <div className="w-full max-w-5xl pointer-events-auto">
                  <GlobalVisitorMap />
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 items-stretch w-full px-1.5 sm:px-4 py-0.5">
                  {/* Founder 1: Aditya Patil */}
                  <div
                    className="col-span-12 lg:col-span-6 text-white bg-gradient-to-b from-[#12121c]/95 via-[#0a0a10]/98 to-[#06060a]/98 backdrop-blur-2xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/[0.08] hover:border-white/[0.18] shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.06] transition-colors" />

                    <div className="flex flex-col flex-1">
                      {/* Location Header */}
                      <div className="flex items-center justify-end pb-1.5 sm:pb-2.5 border-b border-white/[0.06]">
                        <span className="text-[8px] sm:text-[9px] md:text-[9.5px] text-white/40 font-mono tracking-widest uppercase">
                          KOLHAPUR, IN
                        </span>
                      </div>

                      {/* Executive Identity */}
                      <div className="mt-2 sm:mt-3 md:mt-4 mb-1.5 sm:mb-2">
                        <h3 
                          className="text-[12px] min-[360px]:text-[13.5px] min-[400px]:text-sm sm:text-xl md:text-2xl lg:text-3xl font-extralight tracking-[0.03em] min-[360px]:tracking-[0.06em] sm:tracking-[0.12em] uppercase text-white leading-tight whitespace-nowrap inline-flex items-center gap-2 sm:gap-3"
                          style={{ fontFamily: "'Rostex', sans-serif" }}
                        >
                          <span>ADITYA</span>
                          <span>PATIL</span>
                        </h3>
                        <p className="text-[9.5px] sm:text-xs md:text-sm text-white/70 font-light tracking-wide mt-0.5">
                          Founder &amp; Principal Systems Architect
                        </p>
                      </div>

                      {/* Philosophy Quote */}
                      <div className="my-2 sm:my-3 md:my-3.5 pl-2.5 sm:pl-3.5 border-l border-white/20 py-0.5">
                        <p className="text-[9px] sm:text-xs md:text-sm text-white/80 font-light leading-relaxed italic line-clamp-2 sm:line-clamp-none">
                          &ldquo;We engineer complete end-to-end software — from autonomous AI models and automation to web architectures, SaaS platforms, and bespoke systems built to scale.&rdquo;
                        </p>
                      </div>

                      {/* Domain Matrix */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 my-1.5 sm:my-2.5 text-[8.5px] sm:text-xs">
                        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-white/40 font-mono block text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider mb-0.5">Core Discipline</span>
                          <span className="text-white/90 font-light leading-tight block text-[8.5px] sm:text-[10px] md:text-xs">Autonomous AI &amp; Web Platforms</span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-white/40 font-mono block text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider mb-0.5">Core Specialization</span>
                          <span className="text-white/90 font-light leading-tight block text-[8.5px] sm:text-[10px] md:text-xs">Full-Stack AI &amp; Product Architecture</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-white/[0.06] mt-2 sm:mt-2.5 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1.5">
                        <a
                          href="https://github.com/axiogenai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-3.5 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-white/70 hover:text-white rounded-lg sm:rounded-xl flex items-center gap-1 font-light text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.14em] transition-all duration-200"
                        >
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current opacity-70"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          <span>GitHub</span>
                        </a>
                        <button
                          onClick={() => setFounderView('map')}
                          className="px-2.5 sm:px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 rounded-lg sm:rounded-xl flex items-center gap-1 font-light text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer"
                        >
                          <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" />
                          <span>Global Reach</span>
                        </button>
                      </div>
                      <button
                        onClick={() => scrollToFrame(getSectionFrames()[4 + getProjectPagesCount()] ?? 418)}
                        className="px-3 sm:px-4 py-1.5 bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/[0.18] hover:border-white/[0.3] rounded-lg sm:rounded-xl flex items-center gap-1 font-light text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all duration-200 cursor-pointer"
                      >
                        <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
                        <span>Contact Directly →</span>
                      </button>
                    </div>
                  </div>

                  {/* Founder 2: Aditya Minchekar */}
                  <div
                    className="col-span-12 lg:col-span-6 text-white bg-gradient-to-b from-[#12121c]/95 via-[#0a0a10]/98 to-[#06060a]/98 backdrop-blur-2xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/[0.08] hover:border-white/[0.18] shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.06] transition-colors" />

                    <div className="flex flex-col flex-1">
                      {/* Location Header */}
                      <div className="flex items-center justify-end pb-1.5 sm:pb-2.5 border-b border-white/[0.06]">
                        <span className="text-[8px] sm:text-[9px] md:text-[9.5px] text-white/40 font-mono tracking-widest uppercase">
                          SANGLI, IN
                        </span>
                      </div>

                      {/* Executive Identity */}
                      <div className="mt-2 sm:mt-3 md:mt-4 mb-1.5 sm:mb-2">
                        <h3 
                          className="text-[11px] min-[360px]:text-[12.5px] min-[400px]:text-sm sm:text-xl md:text-2xl lg:text-3xl font-extralight tracking-[0.02em] min-[360px]:tracking-[0.05em] sm:tracking-[0.12em] uppercase text-white leading-tight whitespace-nowrap inline-flex items-center gap-1.5 min-[360px]:gap-2 sm:gap-3"
                          style={{ fontFamily: "'Rostex', sans-serif" }}
                        >
                          <span>ADITYA</span>
                          <span>MINCHEKAR</span>
                        </h3>
                        <p className="text-[9.5px] sm:text-xs md:text-sm text-white/70 font-light tracking-wide mt-0.5">
                          Co-Founder &amp; Technology Lead
                        </p>
                      </div>

                      {/* Philosophy Quote */}
                      <div className="my-2 sm:my-3 md:my-3.5 pl-2.5 sm:pl-3.5 border-l border-white/20 py-0.5">
                        <p className="text-[9px] sm:text-xs md:text-sm text-white/80 font-light leading-relaxed italic line-clamp-2 sm:line-clamp-none">
                          &ldquo;Resilient engineering demands rock-solid backends, secure multi-tenant cloud infrastructure, and distributed pipelines that run continuously without fail.&rdquo;
                        </p>
                      </div>

                      {/* Domain Matrix */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 my-1.5 sm:my-2.5 text-[8.5px] sm:text-xs">
                        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-white/40 font-mono block text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider mb-0.5">Core Discipline</span>
                          <span className="text-white/90 font-light leading-tight block text-[8.5px] sm:text-[10px] md:text-xs">Cloud Architecture &amp; Scale</span>
                        </div>
                        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-white/40 font-mono block text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider mb-0.5">Core Specialization</span>
                          <span className="text-white/90 font-light leading-tight block text-[8.5px] sm:text-[10px] md:text-xs">Distributed Multi-Tenant Systems</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-2.5 sm:pt-3 md:pt-4 border-t border-white/[0.06] mt-2 sm:mt-2.5 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                      <div className="flex items-center gap-1.5">
                        <a
                          href="https://github.com/axiogenai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 sm:px-3.5 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-white/70 hover:text-white rounded-lg sm:rounded-xl flex items-center gap-1 font-light text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.14em] transition-all duration-200"
                        >
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current opacity-70"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          <span>GitHub</span>
                        </a>
                        <button
                          onClick={() => setFounderView('map')}
                          className="px-2.5 sm:px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 rounded-lg sm:rounded-xl flex items-center gap-1 font-light text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer"
                        >
                          <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400" />
                          <span>Global Reach</span>
                        </button>
                      </div>
                      <button
                        onClick={() => scrollToFrame(getSectionFrames()[4 + getProjectPagesCount()] ?? 418)}
                        className="px-3 sm:px-4 py-1.5 bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/[0.18] hover:border-white/[0.3] rounded-lg sm:rounded-xl flex items-center gap-1 font-light text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all duration-200 cursor-pointer"
                      >
                        <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70" />
                        <span>Contact Directly →</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>


      <motion.section
        className={`absolute inset-0 flex flex-col items-center justify-center pt-8 md:pt-12 pb-4 px-4 md:px-16 section-bg-adapt overflow-hidden`}
        style={{ pointerEvents: showProjects ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showProjects ? 1 : 0,
          y: showProjects ? "0%" : (['hero', 'about', 'founder'].includes(activeSection) ? "100%" : "-100%"),
          display: showProjects ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div 
          className="w-full max-w-7xl text-white"
        >
          <div className="flex justify-between items-end mb-2 md:mb-8 project-section-header">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-purple-200 via-indigo-400 to-slate-500 bg-clip-text text-transparent">Selected Work</h2>
              <div className="flex items-center space-x-2 text-white/40 text-xs mt-1">
                <span>
                  {(() => {
                    const totalProjectPages = isMobile 
                      ? Math.max(1, Math.ceil(projects.length / 3)) 
                      : Math.max(1, Math.ceil(projects.length / 6));
                    return `Page ${projectPage + 1} of ${totalProjectPages} • ${
                      projectPage < totalProjectPages - 1 
                        ? "Scroll to reveal more projects" 
                        : "Scrolling to Services next"
                    }`;
                  })()}
                </span>
              </div>
            </div>

            {/* Interactive Page Indicator Dots */}
            <div className="flex gap-2 pb-2 items-center">
              {Array.from({ length: isMobile ? Math.max(1, Math.ceil(projects.length / 3)) : Math.max(1, Math.ceil(projects.length / 6)) }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const frames = getSectionFrames();
                    const targetFrame = frames[2 + i];
                    if (targetFrame !== undefined) {
                      scrollToFrame(targetFrame);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    projectPage === i ? 'bg-purple-400 w-5 shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'bg-white/20 hover:bg-white/40 w-2'
                  }`}
                  title={`Jump to Page ${i + 1}`}
                />
              ))}
            </div>
            
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={projectPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut", staggerChildren: 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 project-grid pointer-events-auto w-full items-start"
              style={{ perspective: 1000 }}
            >
              {projects
                .slice(projectPage * (isMobile ? 3 : 6), (projectPage + 1) * (isMobile ? 3 : 6))
                .map((project, cardIdx) => {
                  const CardComponent = project.link ? motion.a : motion.div;
                  const linkProps = project.link ? {
                    href: project.link,
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  } : {};

                  return (
                    <CardComponent
                      key={project.name}
                      {...linkProps}
                      className={`group relative h-auto min-h-[160px] sm:min-h-[200px] md:h-[310px] project-card rounded-xl md:rounded-3xl bg-[var(--card-bg)] overflow-hidden flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] pointer-events-auto glass-card gradient-border ${project.link ? 'cursor-pointer' : 'select-none'}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring' as const, stiffness: 200, damping: 20, delay: cardIdx * 0.1 }}
                      whileHover={{ scale: 1.02, y: -8 }}
                    >
                      <div className="p-4 md:p-6 flex flex-col justify-between flex-1 relative z-10">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-indigo-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

                        <div className="flex justify-between items-start mb-1.5 md:mb-2.5">
                          <span className="px-2.5 py-0.5 md:px-3.5 md:py-1 rounded-full border border-white/10 text-[8px] sm:text-[9px] tracking-wider uppercase font-bold bg-white/5 text-white/80 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">
                            {project.category}
                          </span>
                          <span className="opacity-60 text-[8px] sm:text-[10px] md:text-xs bg-white/5 px-2 py-0.5 rounded border border-white/5 font-semibold tabular-nums">{project.year}</span>
                        </div>

                        <div className="mt-2 md:mt-auto">
                          <div className="flex items-center gap-1">
                            <h3 className="text-base sm:text-lg md:text-2xl font-black tracking-tight mb-1 md:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-purple-200 group-hover:to-pink-300 transition-all duration-500 leading-tight">
                              {project.name}
                            </h3>
                            {project.link && (
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-purple-300 shrink-0 mb-1" />
                            )}
                          </div>
                          <p className="text-[10px] sm:text-xs text-white/60 mb-2 md:mb-4 group-hover:text-white/80 transition-colors leading-relaxed line-clamp-3">
                            {project.desc}
                          </p>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
                            {project.tech.map((tag, tIndex) => (
                              <span key={tIndex} className="text-[8px] sm:text-[9px] bg-white/5 border border-white/10 rounded px-2 py-0.5 font-semibold">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardComponent>
                  );
                })}
            </motion.div>
          </AnimatePresence>
          </div>
        </motion.section>
      {/* ----------------- SERVICES SECTION ----------------- */}
      <motion.section
        className="absolute inset-0 flex flex-col items-center justify-center pt-16 pb-4 px-4 md:px-16 section-bg-adapt overflow-hidden"
        style={{ pointerEvents: showServices ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showServices ? 1 : 0,
          x: showServices ? "0%" : (['hero', 'about', 'founder', 'work'].includes(activeSection) ? "-100%" : "100%"),
          display: showServices ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <style>{`
          .services-no-scrollbar::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          .services-no-scrollbar {
            -ms-overflow-style: none !important;
            scrollbar-width: none !important;
          }
        `}</style>


        <div className="w-full max-w-5xl text-white">
          {/* Unified Card Container Wrapper */}
          <div 
            className="bg-[var(--card-bg)] border border-[var(--card-border)] p-3.5 md:py-5 md:px-7 services-card rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] services-no-scrollbar touch-pan-y glass-card"
          >
            {/* Main Title - Inside the card */}
            <div className="text-center mb-1.5 md:mb-3">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-black tracking-tighter mb-1 bg-gradient-to-r from-purple-200 via-indigo-400 to-slate-500 bg-clip-text text-transparent">Services We Provide</h2>
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] font-semibold text-white/50">
                AI, Web, Mobile, Cloud &amp; Intelligent Systems
              </p>
            </div>

            {/* Description & Badges */}
            <div className="text-center mb-2.5 md:mb-4">
              <p className="text-[9px] md:text-xs text-white/70 max-w-2xl mx-auto leading-relaxed font-normal mb-1.5 md:mb-3 px-2">
                From research to deployment — we build powerful, intelligent digital products for enterprises, startups &amp; students. You envision it, we engineer it.
              </p>
              
              {/* Trust Badges */}
              <div className="hidden sm:flex flex-wrap gap-1.5 md:gap-2.5 justify-center text-[8px] md:text-[10px] pointer-events-auto">
                <div className="flex items-center gap-1 px-2.5 py-0.5 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-full font-semibold text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Production-Grade Code
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-full font-semibold text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                  On-Time Delivery
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-full font-semibold text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                  Affordable Pricing
                </div>
              </div>
            </div>

            {/* Services Grid (8 Services) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2.5 max-w-4xl mx-auto pointer-events-auto">
              {servicesData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={showServices ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
                    key={index}
                    className="relative group pointer-events-auto"
                  >
                    <motion.div 
                      whileHover="hover"
                      className="relative overflow-hidden p-2.5 md:py-2.5 md:px-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 transition-all hover:bg-black/60 flex flex-col h-full justify-between shadow-md cursor-default glass-card gradient-border"
                    >
                      {/* Glow effect blob inside card on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-1 md:mb-1.5">
                          {/* Motion-animated icon wrapper */}
                          <motion.div 
                            variants={getIconVariants(item.title)}
                            className="inline-block shrink-0"
                          >
                            <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70 group-hover:text-purple-300 transition-colors" />
                          </motion.div>
                          <h3 className="text-[9px] sm:text-xs font-black text-white group-hover:text-purple-300 transition-colors leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[8px] sm:text-[9px] md:text-[10px] leading-relaxed text-white/50 font-normal line-clamp-3">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="bg-gradient-to-r from-transparent via-white/10 to-transparent h-[1px] my-2.5 md:my-3 w-full max-w-4xl mx-auto" />

            {/* Perfect Solutions Section */}
            <div className="max-w-4xl mx-auto w-full">
              <div className="text-center mb-1.5 md:mb-2">
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] font-semibold text-white/40">Perfect Solutions For</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-2.5 pointer-events-auto">
                {perfectForData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="p-1.5 md:py-2 md:px-3 bg-black/40 border border-white/10 rounded-xl flex gap-2 md:gap-3 items-center text-left hover:border-white/20 transition-all hover:bg-black/60">
                      <div className={`p-1 md:p-1.5 rounded-lg shrink-0 ${item.color}`}>
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <h4 className="text-[8px] sm:text-[10px] md:text-xs font-black text-white leading-tight">{item.title}</h4>
                        <p className="text-[8px] sm:text-[10px] text-white/50 leading-relaxed font-normal mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack Row */}
            <div className="hidden md:flex flex-wrap items-center justify-center gap-1.5 mt-3 md:mt-3.5 text-[8px] md:text-[9px] uppercase tracking-wider font-semibold text-white/30 max-w-4xl mx-auto pointer-events-auto">
              <span>Tech Stack :</span>
              {['Python', 'React', 'Node.js', 'Next.js', 'Java', 'TensorFlow', 'AWS / GCP', 'PostgreSQL', '.NET'].map((tech) => (
                <span key={tech} className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-white/60 font-medium cursor-default hover:border-white/20 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ----------------- CONTACT SECTION ----------------- */}
      <motion.section
        className={`absolute inset-0 flex flex-col items-center justify-center pt-16 pb-4 px-4 section-bg-adapt overflow-hidden`}
        style={{ pointerEvents: showContact ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showContact ? 1 : 0,
          y: showContact ? "0%" : "100%",
          display: showContact ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >


        <div 
          className="text-white bg-[var(--card-bg)] p-4 md:p-8 lg:p-10 contact-card rounded-[1.5rem] md:rounded-[2.5rem] border border-[var(--card-border)] shadow-[0_30px_70px_rgba(0,0,0,0.65)] max-w-4xl w-full grid grid-cols-12 gap-5 md:gap-8 items-stretch justify-center glass-card gradient-border touch-pan-y"
        >
          
          {/* Left panel - details */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-between py-1 md:py-2 text-left gap-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 md:mb-4">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-pink-400">Get in Touch</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter mb-2 md:mb-4 leading-none whitespace-nowrap">
                Let&apos;s Talk.
              </h2>
              <p className="text-xs text-white/70 leading-relaxed max-w-sm mb-4 md:mb-6 font-normal">
                Let&apos;s collaborate to design and engineer high-performance software, immersive user experiences, and scalable digital solutions across web, mobile, and AI.
              </p>
            </div>

            <div className="space-y-3.5 md:space-y-4">
              <a 
                href="mailto:axiogen01@gmail.com" 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center space-x-2 md:space-x-3 text-xs sm:text-sm hover:text-purple-300 transition-colors pointer-events-auto border-b border-white/5 pb-2 hover:border-purple-300/30 font-semibold cursor-pointer"
              >
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span>axiogen01@gmail.com</span>
              </a>
              <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/5 pb-2">
                <a 
                  href="tel:+918010127704" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-2 md:space-x-3 text-xs sm:text-sm hover:text-purple-300 transition-colors pointer-events-auto font-semibold cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>8010127704</span>
                </a>
                <a 
                  href="tel:+917972884083" 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-2 md:space-x-3 text-xs sm:text-sm hover:text-purple-300 transition-colors pointer-events-auto font-semibold cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>7972884083</span>
                </a>
              </div>

              <div className="pt-1.5 pointer-events-auto">
                <a
                  href="/axiogen.vcf"
                  download="Axiogen.vcf"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/30 text-white/80 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Save Contact Card</span>
                </a>
              </div>

              <div className="pt-2 select-none pointer-events-none overflow-hidden max-w-xs md:max-w-sm hide-on-short">
                <ScrollVelocity
                  texts={['THANK YOU', 'VISIT AGAIN']} 
                  velocity={100}
                  className="custom-scroll-text"
                  numCopies={12}
                />
              </div>

            </div>
          </div>

          {/* Right panel - dynamic form mockup */}
          <div className="col-span-12 md:col-span-7 flex flex-col bg-white/5 border border-white/10 p-4 md:p-8 rounded-xl md:rounded-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleFormSubmit} 
                  className="space-y-4 text-left pointer-events-auto flex flex-col h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-1.5">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name" 
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-black/40 border border-white/10 rounded-lg md:rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:bg-black/60 focus:ring-1 focus:ring-purple-400/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@domain.com" 
                      className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-black/40 border border-white/10 rounded-lg md:rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:bg-black/60 focus:ring-1 focus:ring-purple-400/30 transition-all"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-1.5">Message</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project..." 
                      rows={3}
                      className="w-full flex-1 px-3 py-2 md:px-4 md:py-2.5 bg-black/40 border border-white/10 rounded-lg md:rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:bg-black/60 focus:ring-1 focus:ring-purple-400/30 transition-all resize-none min-h-[70px]"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2.5 md:py-3.5 mt-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg md:rounded-xl text-xs uppercase font-bold tracking-widest transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  className="flex flex-col items-center justify-center text-center h-full py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-400 fill-none stroke-current stroke-2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
                  <p className="text-xs text-white/60 leading-relaxed max-w-[240px]">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

