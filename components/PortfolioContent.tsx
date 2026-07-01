'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useSectionVisibility, 
  useNavSection,
  getStableHeight, 
  setProjectCount, 
  getSectionFrames, 
  getMaxScrollMultiplier 
} from '../hooks/useScroll';
import { useLenis } from 'lenis/react';
import { supabase } from '../lib/supabaseClient';
import { LogoLoop } from './LogoLoop';
import { ScrollVelocity } from './ScrollVelocity';
import { BorderGlow } from './BorderGlow';
import { AnimatedCounter } from './AnimatedCounter';
import { playTransitionSound, playHoverSound } from './SoundManager';
import { 
  ArrowDown, 
  Mail, 
  Phone,
  MessageSquare, 
  Briefcase,
  ChevronRight,
  Send,
  Sparkles,
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
  Rocket
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

const fallbackProjects = [
  {
    name: 'Axiogen AI',
    category: 'Artificial Intelligence',
    year: '2026',
    desc: 'Core neural network training workspace powering predictive analytics and cognitive assistant agents.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'Docker'],
    link: 'https://axiogen.in',
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
    link: 'https://blockchainforge.vercel.app',
    preview: 'from-pink-600 to-rose-600'
  },
  {
    name: 'NAAC Platform',
    category: 'Enterprise SaaS',
    year: '2025',
    desc: 'Advanced academic accreditation suite streamlining documentation, criteria metrics, and reporting.',
    tech: ['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
    link: 'https://naac-nine.vercel.app',
    preview: 'from-teal-600 to-emerald-600'
  },
  {
    name: 'SessionWarden',
    category: 'Authentication Audit',
    year: '2025',
    desc: 'Active session protection agent intercepting hijack attempts and managing token rotation in real-time.',
    tech: ['JavaScript', 'Express', 'JWT Security', 'TailwindCSS'],
    link: 'https://sessionwarden.in',
    preview: 'from-yellow-600 to-amber-600'
  },
  {
    name: 'Lumina Backgrounds',
    category: 'Creative UI Assets',
    year: '2025',
    desc: 'Library of fluid particle simulations and interactive canvas shaders built for premium web graphics.',
    tech: ['WebGL', 'GLSL', 'Canvas API', 'Vanilla CSS'],
    link: 'https://luminabackgrounds.vercel.app',
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
  const [themeMode, setThemeMode] = useState<'space' | 'midnight'>('space');
  const { 
    showHero, 
    showAbout, 
    showAboutUs,
    showSkills,
    showProjects, 
    projectPage, 
    showServices, 
    showContact 
  } = useSectionVisibility();
  const lenis = useLenis();
  const [activeTab, setActiveTab] = useState<'languages' | 'mobile' | 'web' | 'systems'>('languages');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projects, setProjects] = useState(fallbackProjects);

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
              <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-colors rounded-xl select-none group/item">
                <SkillIcon name={skill.name} />
                <span className="font-extrabold text-[10px] md:text-xs uppercase tracking-wider text-white/80 group-hover/item:text-white transition-colors">{skill.name}</span>
              </div>
            )
          });
        }
      });
    });
    return list;
  }, []);

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects:', error);
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
            link: p.link || undefined,
            preview: p.preview || gradients[index % gradients.length]
          }));
          setProjects(formatted);
          setProjectCount(data.length);
        }
      } catch (err) {
        console.error('Failed to load projects:', err);
      }
    }

    if (mounted) {
      fetchProjects();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    // Force scroll to top on page reload/refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const checkTheme = () => {
      const isMidnight = document.documentElement.classList.contains('theme-midnight');
      setThemeMode(isMidnight ? 'midnight' : 'space');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  const scrollResetRef = useRef(false);

  useEffect(() => {
    if (mounted && lenis && !scrollResetRef.current) {
      lenis.scrollTo(0, { immediate: true });
      scrollResetRef.current = true;
    }
  }, [mounted, lenis]);

  const activeSection = useNavSection();

  useEffect(() => {
    if (!lenis || !mounted) return;

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
      }, 2000); // Safety: unlock after 2 seconds no matter what
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
        playTransitionSound();

        const maxScroll = getMaxScrollMultiplier() * getStableHeight();
        const targetFrame = sectionFrames[targetIndex];
        const targetY = (targetFrame / 502) * maxScroll;

        lenis.scrollTo(targetY, { 
          duration: 0.7, 
          easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          onComplete: () => {
            setTimeout(() => unlockAnimation(), 100);
          }
        });
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
      wheelResetTimer = setTimeout(() => { wheelAccumulator = 0; }, 200);

      if (Math.abs(wheelAccumulator) < 30) return;

      const direction = wheelAccumulator > 0 ? 'down' : 'up';
      wheelAccumulator = 0;
      handleTransition(direction);
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
      // DESKTOP: Keep existing wheel-based snap behavior.
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      if (!mobile) {
        window.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('keydown', handleKeyDown);
      if (animatingTimeout) clearTimeout(animatingTimeout);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
    };
  }, [lenis, mounted]);

  const scrollToFrame = (frame: number) => {
    if (!lenis) return;
    // Calculate maxScroll mathematically based on 500vh page height
    const maxScroll = 4 * getStableHeight();
    const targetY = (frame / totalFrames) * maxScroll;
    lenis.scrollTo(targetY, { 
      duration: 1.2,
      easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    });
  };

  // Section visibility is now computed in the useSectionVisibility() hook.
  // The hook only triggers re-renders when a section boundary is crossed,
  // reducing re-renders from ~thousands to ~15 across the entire scroll range.

  if (!mounted) return null;


  // Text Reveal Variants — VOID LUXE
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring' as const, damping: 20, stiffness: 100 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isInteractive = showHero || showAbout || showProjects || showServices || showContact;

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
    <div className={`fixed inset-0 z-40 overflow-hidden selection:bg-white/20 selection:text-white ${isMobile ? 'touch-auto' : 'touch-none'} ${isInteractive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* ----------------- HERO SECTION — VOID LUXE ----------------- */}
      <motion.section 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ pointerEvents: showHero ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showHero ? 1 : 0, 
          y: showHero ? "0%" : "-100%",
          display: showHero ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Studio label with lines */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={showHero ? "visible" : "hidden"}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-8 bg-white/10" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/30 font-medium">
            CREATIVE ENGINEERING STUDIO
          </span>
          <div className="h-px w-8 bg-white/10" />
        </motion.div>

        {/* Title — letter-by-letter reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={showHero ? "visible" : "hidden"}
          className="mb-6"
          style={{ perspective: 600 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[-0.05em] text-white leading-none">
            {"TEAM".split("").map((char, index) => (
              <motion.span key={index} variants={charVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
            <br />
            {"AXIOGEN".split("").map((char, index) => (
              <motion.span 
                key={index} 
                variants={charVariants} 
                style={{ backgroundImage: 'linear-gradient(to right, #ffffff, var(--theme-accent-solid))' }}
                className="inline-block text-transparent bg-clip-text"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          variants={fadeUpVariants}
          initial="hidden"
          animate={showHero ? "visible" : "hidden"}
          className="text-sm md:text-lg text-white/40 max-w-2xl mt-6 font-light leading-relaxed"
        >
          Axiogen builds everything — AI models, mobile apps, cinematic web experiences, cloud infrastructure, and deep research systems.
        </motion.p>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showHero ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-white/20" />
          </motion.div>
          <span className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        </motion.div>
      </motion.section>


      {/* ----------------- ABOUT SECTION — VOID LUXE ----------------- */}
      <motion.section
        className="absolute inset-0 flex items-center justify-center px-6 md:px-16 text-white pt-24 pb-8"
        style={{ pointerEvents: showAbout ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showAbout ? 1 : 0,
          x: showAbout ? "0%" : (activeSection === 'hero' ? "100%" : "-100%"),
          display: showAbout ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center max-w-7xl w-full gap-5 justify-center">
          <div 
            data-scroll-container
            data-lenis-prevent
            className={`grid grid-cols-12 gap-4 md:gap-6 items-start w-full ${
              isMobile 
                ? 'max-h-[82vh] overflow-y-auto lg:max-h-none lg:overflow-visible scrollbar-none touch-pan-y' 
                : 'max-h-[60vh] lg:max-h-none overflow-y-auto lg:overflow-visible scrollbar-none'
            } px-2 py-2`}
          >
            <AnimatePresence mode={isMobile ? "wait" : "sync"}>
              {/* Bio statement — glass card */}
              {showAbout && (
                <motion.div
                  key="bio-statement"
                  initial={isMobile ? { opacity: 0, y: 15 } : undefined}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? { opacity: 0, y: -15 } : undefined}
                  transition={{ duration: 0.25 }}
                  className="col-span-12 lg:col-span-5 text-white bg-[var(--card-bg)] p-6 md:p-8 rounded-2xl border border-[var(--card-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--theme-accent-solid)] font-semibold">About Us</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 leading-none">
                    TEAM AXIOGEN.
                  </h2>
                  <p className="text-sm text-white/60 leading-relaxed mb-3">
                    We are a full-cycle software engineering team delivering end-to-end digital solutions. Our expertise spans web and mobile development, bespoke AI integration, scalable cloud architecture, and immersive user experiences.
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed mb-5">
                    From high-performance databases and automated research systems to advanced voice synthesis, document intelligence, and GPU-accelerated interfaces, we craft solutions tailored for both academic innovation and enterprise scale.
                  </p>
                  <div className="flex gap-4 mb-5">
                    <a 
                      href="https://www.instagram.com/axiogen.in?igsh=OGQ5ZDc2ODk2ZA==" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={playHoverSound}
                      onMouseEnter={playHoverSound}
                      className="px-5 py-2.5 bg-white text-black hover:bg-white/90 rounded-xl flex items-center gap-1.5 font-semibold text-xs transition-all hover:scale-105"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </a>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-3 pt-5 border-t border-white/[0.06]">
                    <div className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-bold text-[var(--theme-accent-solid)]">
                        <AnimatedCounter value={50} suffix="+" trigger={showAbout} />
                      </span>
                      <span className="text-[7px] md:text-[9px] uppercase tracking-wider text-white/50 font-bold">Projects</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-bold text-[var(--theme-accent-solid)]">
                        <AnimatedCounter value={10} suffix="+" trigger={showAbout} />
                      </span>
                      <span className="text-[7px] md:text-[9px] uppercase tracking-wider text-white/50 font-bold">Techs</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-bold text-[var(--theme-accent-solid)]">
                        <AnimatedCounter value={99} suffix="%" trigger={showAbout} />
                      </span>
                      <span className="text-[7px] md:text-[9px] uppercase tracking-wider text-white/50 font-bold">Satisfied</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-bold text-[var(--theme-accent-solid)]">
                        <AnimatedCounter value={24} suffix="/7" trigger={showAbout} />
                      </span>
                      <span className="text-[7px] md:text-[9px] uppercase tracking-wider text-white/50 font-bold">Support</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Tech switcher block — glass card */}
              {showAbout && (
                <motion.div
                  key="tech-switcher"
                  initial={isMobile ? { opacity: 0, y: 15 } : undefined}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isMobile ? { opacity: 0, y: -15 } : undefined}
                  transition={{ duration: 0.25 }}
                  className="col-span-12 lg:col-span-7 flex flex-col gap-2 md:gap-4 w-full h-full"
                >
                  {isMobile && (
                    <div className="w-full select-none pointer-events-auto h-16 flex items-center">
                      <LogoLoop logos={loopLogos} />
                    </div>
                  )}
                  <div className="flex flex-col bg-[var(--card-bg)] p-5 md:p-8 rounded-2xl border border-[var(--card-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white w-full h-full min-h-[170px] sm:min-h-[300px] md:min-h-[380px]">
                    <div className="flex justify-between items-center mb-3 md:mb-6">
                      <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-white">Skills</h3>
                    </div>
 
              {/* Selector tabs */}
              <div className="flex flex-row flex-nowrap gap-1 mb-2.5 md:mb-6 p-1 bg-white/[0.03] rounded-xl border border-white/[0.04] pointer-events-auto w-full justify-between items-center">
                {(['languages', 'mobile', 'web', 'systems'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      playHoverSound();
                      setActiveTab(tab);
                    }}
                    onMouseEnter={playHoverSound}
                    style={activeTab === tab ? { backgroundColor: 'var(--theme-accent-solid)', boxShadow: '0 4px 15px var(--theme-accent)' } : {}}
                    className={`flex-1 text-center px-1 sm:px-3 py-1.5 md:py-2 rounded-lg text-[7px] sm:text-xs uppercase tracking-normal sm:tracking-widest font-extrabold transition-all duration-200 cursor-pointer pointer-events-auto select-none ${
                      activeTab === tab 
                        ? 'text-white shadow-lg' 
                        : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {tab === 'languages' 
                      ? 'Languages' 
                      : tab === 'mobile' 
                        ? (isMobile ? 'Mobile' : 'Mobile Apps') 
                        : tab === 'web' 
                          ? (isMobile ? 'Web' : 'Web & Creative') 
                          : 'AI & Systems'}
                  </button>
                ))}
              </div>
 
              {/* List with animated switcher */}
              <div className="flex-1 grid grid-cols-2 gap-2 md:gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="col-span-2 grid grid-cols-2 gap-2 md:gap-3"
                  >
                    {techData[activeTab].map((skill, index) => (
                      <div 
                        key={index}
                        onMouseEnter={playHoverSound}
                        className="p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all flex flex-col md:justify-center gap-1 group relative overflow-hidden"
                      >
                        {/* Glow outline hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        
                        <div className="flex items-center justify-between md:mb-1.5 w-full">
                          <div className="flex items-center gap-2">
                            <SkillIcon name={skill.name} />
                            <span style={{ transition: 'color 0.2s' }} className="font-bold text-[9px] sm:text-xs md:text-sm text-white group-hover:text-[var(--theme-accent-solid)]">{skill.name}</span>
                          </div>
                          <ChevronRight style={{ transition: 'all 0.2s' }} className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-[var(--theme-accent-solid)] block" />
                        </div>
                        <p className="text-[8px] sm:text-xs text-white/60 leading-relaxed font-normal block">{skill.desc}</p>
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

          {/* Logo Loop Section */}
          {!isMobile && (
            <div className="w-full px-2 overflow-hidden select-none pointer-events-auto">
              <LogoLoop logos={loopLogos} />
            </div>
          )}
        </div>
      </motion.section>


      {/* ----------------- PROJECTS SECTION — VOID LUXE ----------------- */}
      <motion.section
        className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:justify-center md:pt-0 px-6 md:px-16"
        style={{ pointerEvents: showProjects ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showProjects ? 1 : 0,
          y: showProjects ? "0%" : (['hero', 'about'].includes(activeSection) ? "100%" : "-100%"),
          display: showProjects ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >

        <div className="w-full max-w-7xl text-white">
          <div className="flex justify-between items-end mb-6 md:mb-8">
            <div>
              <h2 style={{ backgroundImage: 'linear-gradient(to right, #ffffff, var(--theme-accent-solid))' }} className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent">Selected Work</h2>
              <div className="flex items-center space-x-2 text-white/30 text-xs mt-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
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
            
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
               key={projectPage}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ duration: 0.35, ease: "easeInOut" }}
               data-scroll-container={!isMobile ? "" : undefined}
               data-lenis-prevent={!isMobile ? "" : undefined}
               className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pointer-events-auto ${
                 isMobile 
                   ? 'max-h-none overflow-visible pr-0 py-0' 
                   : 'overflow-visible pr-0 py-0'
               }`}
             >
               {projects
                 .slice(projectPage * (isMobile ? 3 : 6), (projectPage + 1) * (isMobile ? 3 : 6))
                 .map((project) => {
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
                        onMouseEnter={playHoverSound}
                        className={`group relative min-h-[160px] md:min-h-[270px] bg-transparent overflow-visible flex flex-col justify-between pointer-events-auto block ${project.link ? 'cursor-pointer' : 'select-none'}`}
                      >
                        <BorderGlow
                          edgeSensitivity={30}
                          glowColor={themeMode === 'midnight' ? "199 89 48" : "247 58 60"}
                          backgroundColor="var(--card-bg)"
                          borderRadius={isMobile ? 12 : 24}
                          glowRadius={isMobile ? 30 : 50}
                          glowIntensity={0.8}
                          coneSpread={25}
                          colors={['var(--theme-accent-solid)', '#ffffff', 'var(--theme-accent-solid)']}
                          className="w-full h-full flex flex-col justify-between"
                        >
                          <div className="p-5 md:p-6 flex flex-col justify-between flex-1 relative z-10 w-full h-full">
                            {/* Glow effect blob behind card on hover */}
                            <div style={{ backgroundImage: 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)' }} className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl pointer-events-none" />

                            <div className="flex justify-between items-start mb-2.5">
                              <span className="px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-semibold bg-white/[0.04] border border-white/[0.06] text-white/60 group-hover:border-[var(--theme-accent-solid)] group-hover:text-[var(--theme-accent-solid)] transition-all duration-300">
                                {project.category}
                              </span>
                              <span className="text-xs text-white/30 font-medium">{project.year}</span>
                            </div>
                            
                            <div className="mt-auto">
                              <h3 
                                style={{ transition: 'all 0.5s' }}
                                className="text-lg md:text-xl font-bold tracking-tight mb-1 md:mb-2 group-hover:-translate-y-0.5 group-hover:text-[var(--theme-accent-solid)] leading-tight"
                              >
                                {project.name}
                              </h3>
                              <p className="text-xs text-white/50 mb-3 group-hover:text-white/70 transition-colors leading-relaxed line-clamp-3">
                                {project.desc}
                              </p>
                              
                              {/* Tech tags */}
                              <div className="flex flex-wrap gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
                                {project.tech.map((tag, tIndex) => (
                                  <span key={tIndex} className="px-2 py-0.5 rounded-md text-[8px] bg-white/[0.03] border border-white/[0.05] text-white/50 font-medium">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </BorderGlow>
                      </CardComponent>
                   );
                 })}
             </motion.div>
           </AnimatePresence>
         </div>
       </motion.section>

      {/* ----------------- SERVICES SECTION — VOID LUXE ----------------- */}
      <motion.section
        className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:pt-24 px-6 md:px-16"
        style={{ pointerEvents: showServices ? 'auto' : 'none' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showServices ? 1 : 0,
          x: showServices ? "0%" : (['hero', 'about', 'work'].includes(activeSection) ? "-100%" : "100%"),
          display: showServices ? 'flex' : 'none'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >

        <div className="w-full max-w-5xl text-white">
          {/* Unified Card Container Wrapper — glass card */}
          <div 
            data-scroll-container
            data-lenis-prevent
            className="bg-[var(--card-bg)] border border-[var(--card-border)] p-5 md:p-8 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.6)] max-h-[82vh] overflow-y-auto md:max-h-none md:overflow-visible scrollbar-none touch-pan-y"
          >
            {/* Main Title */}
            <div className="text-center mb-3 md:mb-5">
              <h2 style={{ backgroundImage: 'linear-gradient(to right, #ffffff, var(--theme-accent-solid))' }} className="text-2xl md:text-4xl font-bold tracking-tight mb-1 bg-clip-text text-transparent">Services We Provide</h2>
              {!isMobile && (
                <p className="text-xs text-white/40">
                  AI, Web, Mobile, Cloud & Intelligent Systems
                </p>
              )}
            </div>

            {/* Description & Badges */}
            {!isMobile && (
              <div className="text-center mb-4 md:mb-6">
                <p className="text-xs text-white/40 max-w-2xl mx-auto leading-relaxed font-normal mb-3 md:mb-4">
                  From research to deployment — we build powerful, intelligent digital products for enterprises, startups &amp; students. You envision it, we engineer it.
                </p>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2 justify-center pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] border border-white/[0.05] rounded-full text-[10px] text-white/50 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    Production-Grade Code
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] border border-white/[0.05] rounded-full text-[10px] text-white/50 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                    On-Time Delivery
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] border border-white/[0.05] rounded-full text-[10px] text-white/50 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    Affordable Pricing
                  </div>
                </div>
              </div>
            )}

            {/* Services Grid (8 Services) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 max-w-4xl mx-auto">
              {servicesData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="relative group pointer-events-auto"
                  >
                    <motion.div 
                      whileHover="hover"
                      onMouseEnter={playHoverSound}
                      className="relative overflow-hidden p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all flex flex-col h-full justify-between cursor-default"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          {/* Motion-animated icon wrapper */}
                          <motion.div 
                            variants={getIconVariants(item.title)}
                            className="inline-block shrink-0"
                          >
                            <IconComponent className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-white/50 group-hover:text-[var(--theme-accent-solid)] transition-colors" />
                          </motion.div>
                          <h3 className="text-[9px] sm:text-[11px] md:text-xs font-extrabold text-white group-hover:text-[var(--theme-accent-solid)] transition-colors leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[8px] sm:text-[9px] md:text-[10px] leading-relaxed text-white/50 font-normal line-clamp-3">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-4 w-full max-w-4xl mx-auto" />

            {/* Perfect For Section */}
            <div className="max-w-4xl mx-auto w-full">
              <div className="text-center mb-2.5">
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] font-semibold text-white/40">Perfect Solutions For</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 pointer-events-auto">
                {perfectForData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} onMouseEnter={playHoverSound} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex gap-2 md:gap-3.5 items-start text-left hover:border-white/[0.08] hover:bg-white/[0.04] transition-all">
                      <div className={`p-1.5 md:p-2 rounded-lg shrink-0 ${item.color}`}>
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <h4 className="text-[9px] sm:text-[10px] md:text-xs font-black text-white leading-tight md:mb-0.5">{item.title}</h4>
                        <p className="text-[8px] sm:text-[10px] text-white/50 leading-relaxed font-normal block">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack Row */}
            {!isMobile && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 text-[8px] md:text-[9px] uppercase tracking-wider font-semibold text-white/30 max-w-4xl mx-auto pointer-events-auto">
                <span>Tech Stack :</span>
                {['Python', 'React', 'Node.js', 'Next.js', 'Java', 'TensorFlow', 'AWS / GCP', 'PostgreSQL', '.NET'].map((tech) => (
                  <span key={tech} onMouseEnter={playHoverSound} className="px-2.5 py-0.5 bg-white/[0.03] border border-white/[0.05] rounded-full text-white/50 font-medium cursor-default hover:border-white/[0.1] transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ----------------- CONTACT SECTION — VOID LUXE ----------------- */}
      <motion.section
        className="absolute inset-0 flex flex-col items-center justify-start pt-24 md:justify-center md:pt-0 px-4"
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
          data-scroll-container={!isMobile ? "" : undefined}
          data-lenis-prevent={!isMobile ? "" : undefined}
          className={`text-white bg-[var(--card-bg)] p-5 md:p-10 rounded-2xl border border-[var(--card-border)] shadow-[0_30px_70px_rgba(0,0,0,0.65)] max-w-4xl w-full grid grid-cols-12 gap-4 md:gap-8 items-stretch justify-center ${
            isMobile 
              ? 'max-h-none overflow-visible' 
              : 'max-h-[85vh] overflow-y-auto md:max-h-none md:overflow-visible'
          } scrollbar-none touch-pan-y`}
        >
          
          {/* Left panel - details */}
          <div className="col-span-12 md:col-span-5 flex flex-col justify-between py-1 md:py-2 text-left">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 md:mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--theme-accent-solid)] font-semibold">Get in Touch</span>
                <div className="flex space-x-1.5 pointer-events-auto">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={playHoverSound}
                    onMouseEnter={playHoverSound}
                    className="p-2 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:bg-white hover:text-black transition-all shadow-lg hover:scale-105"
                  >
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={playHoverSound}
                    onMouseEnter={playHoverSound}
                    className="p-2 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:bg-white hover:text-black transition-all shadow-lg hover:scale-105"
                  >
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-4 leading-none">
                Let&apos;s Talk.
              </h2>
              <p className="text-xs text-white/60 leading-relaxed max-w-sm mb-4 md:mb-6 font-normal">
                Let&apos;s collaborate to design and engineer high-performance software, immersive user experiences, and scalable digital solutions across web, mobile, and AI.
              </p>
            </div>

            <div className="space-y-2.5 md:space-y-4 mb-4 md:mb-0">
              <a 
                href="mailto:axiogen01@gmail.com" 
                onClick={playHoverSound}
                onMouseEnter={playHoverSound}
                style={{ transition: 'all 0.2s' }}
                className="flex items-center space-x-1.5 md:space-x-3 text-[10px] sm:text-sm hover:text-[var(--theme-accent-solid)] pointer-events-auto border-b border-white/[0.05] pb-1 md:pb-2 hover:border-[var(--theme-accent-solid)]/30 font-semibold"
              >
                <Mail style={{ color: 'var(--theme-accent-solid)' }} className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                <span>axiogen01@gmail.com</span>
              </a>
              <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.05] pb-1 md:pb-2">
                <a 
                  href="tel:+918010127704" 
                  onClick={playHoverSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center space-x-1.5 md:space-x-3 text-[10px] sm:text-sm hover:text-[var(--theme-accent-solid)] transition-colors pointer-events-auto font-semibold"
                >
                  <Phone style={{ color: 'var(--theme-accent-solid)' }} className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                  <span>8010127704</span>
                </a>
                <a 
                  href="tel:+917972884083" 
                  onClick={playHoverSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center space-x-1.5 md:space-x-3 text-[10px] sm:text-sm hover:text-[var(--theme-accent-solid)] transition-colors pointer-events-auto font-semibold"
                >
                  <Phone style={{ color: 'var(--theme-accent-solid)' }} className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                  <span>7972884083</span>
                </a>
              </div>

              <div className="my-1.5 py-0.5 select-none pointer-events-none overflow-hidden max-w-xs md:max-w-sm hidden md:block">
                <ScrollVelocity
                  texts={['THANK YOU', 'VISIT AGAIN']} 
                  velocity={100}
                  className="custom-scroll-text"
                  numCopies={12}
                />
              </div>


            </div>
          </div>

          {/* Right panel - form */}
          <div className="col-span-12 md:col-span-7 flex flex-col bg-white/[0.02] border border-white/[0.04] p-4 md:p-6 rounded-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleFormSubmit} 
                  className="space-y-3 md:space-y-4 text-left pointer-events-auto flex flex-col h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <label className="block text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-0.5 md:mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={playHoverSound}
                      placeholder="Enter your name" 
                      className="w-full px-2.5 py-1 md:px-4 md:py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[10px] sm:text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent-solid)] focus:bg-white/[0.04] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-0.5 md:mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={playHoverSound}
                      placeholder="your.email@domain.com" 
                      className="w-full px-2.5 py-1 md:px-4 md:py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[10px] sm:text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent-solid)] focus:bg-white/[0.04] transition-all"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="block text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-0.5 md:mb-1">Message</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={playHoverSound}
                      placeholder="Tell us about your project..." 
                      rows={3}
                      className="w-full flex-1 px-2.5 py-1 md:px-4 md:py-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-[10px] sm:text-xs text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent-solid)] focus:bg-white/[0.04] transition-all resize-none min-h-[70px]"
                    />
                  </div>

                  <button 
                    type="submit" 
                    onClick={playHoverSound}
                    onMouseEnter={playHoverSound}
                    style={{ backgroundColor: 'var(--theme-accent-solid)' }}
                    className="w-full py-2 md:py-3 mt-1 text-white rounded-xl text-[10px] sm:text-xs uppercase font-semibold tracking-widest transition-all hover:brightness-110 hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
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
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
                  <p className="text-xs text-white/60 leading-relaxed max-w-[240px]">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile-only ScrollVelocity loop below send message button */}
          <div className="col-span-12 block md:hidden my-1.5 py-0.5 select-none pointer-events-none overflow-hidden w-full">
            <ScrollVelocity
              texts={['THANK YOU', 'VISIT AGAIN']} 
              velocity={100}
              className="custom-scroll-text"
              numCopies={12}
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};
