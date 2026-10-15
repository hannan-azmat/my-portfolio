import React, { useState, useEffect, useRef } from 'react';
import {
  Code2, Smartphone, Database, Server, Languages, Plug, ShieldCheck, Rocket,
  Sparkles, User, Briefcase, Mail, Send, ChevronRight, ArrowUpRight, MapPin,
  Phone, Github, Linkedin, BookOpen, GraduationCap, Award, Users, X, Layers
} from 'lucide-react';

/* ───────────────────────── Content (from CV) ───────────────────────── */

const PROFILE = {
  name: 'Muhammad Hannan Azmat',
  short: 'HANNAN.AZMAT',
  initial: 'H',
  title: 'Full-Stack & Mobile Engineer',
  email: 'hannanazmat@gmail.com',
  phone: '+92 312 1719008',
  location: 'Lahore, Pakistan',
  linkedin: 'https://www.linkedin.com/in/muhammad-hannan-azmat/',
  medium: 'https://medium.com/@hannan.azmat',
  github: 'https://github.com/hannan-azmat',
};

const NAV = ['About', 'Skills', 'Experience', 'Projects', 'Leadership', 'Contact'];

const STATS = [
  { label: 'Years Experience', value: '6+' },
  { label: 'Products Shipped', value: '12' },
  { label: 'L1 → L3 Promotion', value: '3 mo' },
  { label: 'Arabic / English', value: 'RTL·LTR' },
];

const TICKER = ['Next.js', 'React Native', 'TypeScript', 'Node.js / NestJS', 'PostgreSQL', 'Arabic RTL', 'Expo', 'Fastlane'];

const SKILL_GROUPS = [
  { title: 'Web', icon: Code2, color: 'text-cyan-400',
    items: ['Next.js', 'React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Styled Components', 'Performance optimisation'] },
  { title: 'Mobile', icon: Smartphone, color: 'text-purple-400',
    items: ['React Native', 'Expo', 'React Navigation', 'iOS native (Swift)', 'Push notifications', 'Universal & deep linking', 'Bluetooth Low Energy', 'App Store / Google Play releases'] },
  { title: 'Back End & APIs', icon: Server, color: 'text-emerald-400',
    items: ['Node.js', 'Express.js', 'NestJS', 'REST API design', 'JWT / OAuth 2.0', 'Webhooks', 'Socket.IO', 'Modular architecture'] },
  { title: 'Databases', icon: Database, color: 'text-amber-400',
    items: ['PostgreSQL', 'MongoDB', 'TypeORM', 'Prisma', 'Schema design & migrations', 'Query tuning & indexing', 'Optimistic locking', 'RBAC'] },
  { title: 'State & Data', icon: Layers, color: 'text-pink-400',
    items: ['Redux / Toolkit / Saga', 'TanStack Query', 'Axios', 'Formik', 'React Hook Form', 'Yup'] },
  { title: 'Arabic & RTL', icon: Languages, color: 'text-cyan-300',
    items: ['RTL / LTR switching', 'i18n', 'Bilingual AR/EN interfaces', 'Bilingual document generation', 'Theme management'] },
  { title: 'Integrations', icon: Plug, color: 'text-blue-400',
    items: ['Flutterwave', 'Stripe', 'Twilio SDK', 'Firebase', 'Google Maps & Geocoding', 'Airline / travel APIs', 'Social login'] },
  { title: 'Quality & Release', icon: ShieldCheck, color: 'text-green-400',
    items: ['Jest', 'Sentry', 'SonarQube', 'ESLint + Husky', 'Snyk / OWASP', 'Fastlane CI/CD', 'Git · GitHub · GitLab · Bitbucket'] },
  { title: 'AI-Assisted Dev', icon: Sparkles, color: 'text-purple-300',
    items: ['Claude (primary)', 'Cursor', 'Antigravity', 'OpenCode', 'Used daily for debugging, architecture & docs'] },
];

const EXPERIENCE = [
  {
    role: 'Senior Software Engineer, Full-Stack',
    company: 'PikesSoft',
    place: 'Lahore, Pakistan',
    period: 'Jun 2022 – Present',
    points: [
      'Technical lead and sole full-stack developer across web and mobile products for Gulf and international clients.',
      'Wrote the company-wide clean coding standards and led the React Native trainee program.',
      'Introduced Fastlane build and release pipelines across multiple products.',
    ],
  },
  {
    role: 'React Native Developer',
    company: 'Dominion Global',
    place: 'Lahore, Pakistan',
    period: 'Nov 2020 – May 2022',
    points: [
      'Sole developer on LesFemmes, a Dubai fashion marketplace — zero to released on both stores.',
      'Built social login, payments, in-app wallet, user listings, social groups, chat and checkout.',
    ],
  },
];

const PROJECTS = [
  {
    id: 1, title: 'SandSeekers', kind: 'Real Estate Admin Portal & CRM', role: 'Technical Lead',
    platforms: ['Web', 'Mobile'], url: 'https://admin.sandseekers.ae',
    description: 'Twelve-module Next.js admin platform with role-based access, plus an Expo / React Native CRM so agents can act on new leads from their phones.',
    highlights: [
      'Closed a production lead-ownership concurrency defect with an ownership guard, optimistic locking on a version column and real-time reassignment events — duplicate assignment eliminated.',
      'Modelled permissions so new modules can be added without reworking access logic.',
      'Authored API specs, screen-flow diagrams and a phased estimation plan that aligned the client before build.',
    ],
    tags: ['Next.js', 'Expo', 'RBAC', 'Optimistic Locking', 'WebSockets'],
  },
  {
    id: 2, title: 'Trackivo', kind: 'Vehicle Tracking & Recovery Platform', role: 'Sole Full-Stack Developer',
    platforms: ['Web'], url: 'https://tracker.trackivo.com',
    description: 'Owned the whole product: PostgreSQL schema, NestJS APIs and four role-based portals for customers, admins, technicians and investigators.',
    highlights: [
      'Integrated Flutterwave end to end — checkout, webhooks, limits, verification — replacing manual reconciliation with self-service subscriptions.',
      'Restructured sign-up and device activation so customers onboard without contacting support.',
    ],
    tags: ['NestJS', 'PostgreSQL', 'Flutterwave', 'Next.js'],
  },
  {
    id: 3, title: 'FlyNow', kind: 'Flight Booking Platform', role: 'Full-Stack Engineer',
    platforms: ['Web'], url: 'https://dev.flynow.live',
    description: 'Search-to-checkout rebuilt around a reusable component library, with airline and travel API integration and bilingual invoicing.',
    highlights: [
      'Reusable component library benchmarked against leading travel platforms — faster build time for every booking feature after.',
      'Bilingual Arabic/English invoices with correct mixed-script layout.',
    ],
    tags: ['Next.js', 'Travel APIs', 'Arabic RTL', 'i18n'],
  },
  {
    id: 4, title: 'S40S', kind: 'eCommerce Platform', role: 'Technical Lead',
    platforms: ['Web'],
    description: 'PostgreSQL + TypeORM schema design and a NestJS backend split into independent modules.',
    highlights: [
      'Migrations and complex query tuning kept response times stable as the catalogue grew.',
      'Independent auth, orders, products and user modules let workstreams proceed without collision.',
    ],
    tags: ['NestJS', 'TypeORM', 'PostgreSQL'],
  },
  {
    id: 5, title: 'Almana Hospital', kind: 'Arabic-First Patient App', role: 'Mobile Engineer',
    platforms: ['Mobile'],
    description: 'Healthcare app taken from English-only to fully Arabic-first with RTL/LTR and theming.',
    highlights: [
      'Built the i18n layer with full RTL/LTR support and theming.',
      'Raised test coverage to 30% on a live healthcare product.',
      'Deep / dynamic linking and Firebase notifications across the patient journey.',
    ],
    tags: ['React Native', 'RTL', 'Firebase', 'Jest'],
  },
  {
    id: 6, title: 'Clova Health', kind: 'Glucose Monitoring & Coaching', role: 'Mobile Engineer',
    platforms: ['Mobile'],
    description: 'Live continuous-glucose-monitor readings streamed over Bluetooth, turned into personalised guidance.',
    highlights: [
      'Bluetooth Low Energy integration streaming live device readings.',
      'Algorithms converting raw device data into personalised user guidance.',
    ],
    tags: ['React Native', 'BLE'],
  },
  {
    id: 7, title: 'Ozone', kind: 'Attendance Management App', role: 'Mobile Lead',
    platforms: ['Mobile'],
    description: 'Location-based attendance that resists VPN and mock-location spoofing.',
    highlights: [
      'Google Maps & Geocoding with VPN / mock-location restrictions.',
      'Fastlane automation turned store releases into a routine.',
    ],
    tags: ['React Native', 'Google Maps', 'Fastlane'],
  },
  {
    id: 8, title: 'GigMi', kind: 'Contractor Marketplace', role: 'Mobile Engineer',
    platforms: ['Mobile'],
    description: 'Media-heavy marketplace tuned for poor connections.',
    highlights: [
      'Video / image transcoding, compression and image caching.',
      'Socket.IO real-time chat, in-app PDF viewer and payments.',
    ],
    tags: ['React Native', 'Socket.IO', 'Payments'],
  },
  {
    id: 9, title: 'Magnolia Jewellers', kind: 'Customer Messaging App', role: 'Mobile Engineer',
    platforms: ['Mobile'],
    description: 'Staff message customers directly over SMS or WhatsApp with compressed media.',
    highlights: [
      'Twilio SDK integration with media compression for attachments.',
      'Led the migration from bare React Native to Expo, removing native build maintenance.',
    ],
    tags: ['Expo', 'Twilio', 'WhatsApp'],
  },
  {
    id: 10, title: 'Klyra', kind: 'Home Cleaning Booking App', role: 'Mobile Engineer',
    platforms: ['Mobile'],
    description: 'Online reservation of cleaning services end to end.',
    highlights: ['Social login, push, universal links, Maps/Geocoding and multiple payment integrations.'],
    tags: ['React Native', 'Payments', 'Maps'],
  },
  {
    id: 11, title: '99 DPF', kind: 'DPF Cleaning Services', role: 'Mobile Engineer',
    platforms: ['Mobile'],
    description: 'Customer and partner apps for a nationwide DPF cleaning service.',
    highlights: ['Social login, image push notifications, Google Maps and real-time chat.'],
    tags: ['React Native', 'Maps', 'Chat'],
  },
  {
    id: 12, title: 'LesFemmes', kind: 'Fashion Marketplace, Dubai', role: 'Sole Developer',
    platforms: ['Mobile'],
    description: 'Whole stack, zero to both app stores.',
    highlights: ['Social login, payments, in-app wallet, user listings, social groups, chat and full checkout.'],
    tags: ['React Native', 'Wallet', 'Chat'],
  },
];

const LEADERSHIP = [
  { icon: BookOpen, text: 'Authored the company-wide clean coding standards adopted across all engineering teams, defining review practice and quality expectations.' },
  { icon: Users, text: 'Led the company’s React Native trainee program, bringing new engineers up to working on client projects.' },
  { icon: Award, text: 'Promoted from Engineering Level L1 to L3 within three months of joining.' },
  { icon: Rocket, text: 'Introduced automated build and release pipelines with Fastlane across multiple products.' },
  { icon: Sparkles, text: 'Publishes technical writing on React and engineering practice on Medium.' },
];

/* ───────────────────────── Component ───────────────────────── */

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [activeSection, setActiveSection] = useState('hero');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hover = {
    onMouseEnter: () => setCursorHover(true),
    onMouseLeave: () => setCursorHover(false),
  };

  // Cursor
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = ['hero', ...NAV.map((n) => n.toLowerCase())];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const onResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const count = width > 768 ? 90 : 45;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.0, vy: (Math.random() - 0.5) * 1.0,
      r: Math.random() * 2 + 1, c: Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4',
    }));

    const verts = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
      [0, -1.6, 0], [0, 1.6, 0], [-1.6, 0, 0], [1.6, 0, 0],
    ];
    let ax = 0, ay = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const g1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 10, width * 0.2, height * 0.3, width * 0.6);
      g1.addColorStop(0, 'rgba(139,92,246,0.08)'); g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, width, height);
      const g2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 10, width * 0.8, height * 0.7, width * 0.5);
      g2.addColorStop(0, 'rgba(6,182,212,0.06)'); g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - d / 120)})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }

      if (!reduce) { ax += 0.008; ay += 0.012; }
      const cx = width > 1024 ? width * 0.8 : width * 0.5;
      const cy = height * 0.45;
      const size = Math.min(width, height) * 0.2;
      const proj = verts.map(([x, y, z]) => {
        const x1 = x * Math.cos(ay) + z * Math.sin(ay);
        const z1 = -x * Math.sin(ay) + z * Math.cos(ay);
        const y2 = y * Math.cos(ax) - z1 * Math.sin(ax);
        const z2 = y * Math.sin(ax) + z1 * Math.cos(ax);
        const s = 400 / (400 + z2 * size);
        return { x: cx + x1 * size * s, y: cy + y2 * size * s };
      });
      ctx.lineWidth = 1.2; ctx.strokeStyle = 'rgba(6,182,212,0.3)';
      for (let i = 0; i < verts.length; i++)
        for (let j = i + 1; j < verts.length; j++) {
          const d2 = verts[i].reduce((s, v, k) => s + (v - verts[j][k]) ** 2, 0);
          if (d2 < 3.5) { ctx.beginPath(); ctx.moveTo(proj[i].x, proj[i].y); ctx.lineTo(proj[j].x, proj[j].y); ctx.stroke(); }
        }
      proj.forEach((pt) => { ctx.beginPath(); ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2); ctx.fillStyle = '#c084fc'; ctx.fill(); });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);

  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.platforms.includes(filter));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + form.name)}&body=${encodeURIComponent(body)}`;
  };

  const TAG_COLORS: Record<string, string> = {
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  };
  const SectionTag = ({ icon: Icon, children, color = 'cyan' }: any) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${TAG_COLORS[color]} text-xs font-mono uppercase tracking-widest mb-4`}>
      <Icon className="w-3.5 h-3.5" /> {children}
    </div>
  );

  const card = 'backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]';

  return (
    <div className="bg-[#050508] text-white min-h-screen font-sans selection:bg-purple-500 relative overflow-x-hidden scroll-smooth">
      <style>{`
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 90px; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .animate-marquee { animation: marquee 28s linear infinite; width: max-content; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn .35s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee, .animate-float, .animate-fade-in { animation: none; } html { scroll-behavior: auto; } }
      `}</style>

      {/* Cursor */}
      <div className="fixed top-0 left-0 pointer-events-none z-[60] hidden md:block" style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}>
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${cursorHover ? 'w-16 h-16 bg-cyan-500/20 border border-cyan-400/50' : 'w-8 h-8 bg-purple-500/30 border border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.8)]'}`} />
      </div>

      <canvas ref={canvasRef} aria-hidden className="fixed inset-0 pointer-events-none z-0 opacity-80" />

      {/* Ticker */}
      <div className="relative z-20 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-cyan-900/40 border-b border-white/10 py-2 overflow-hidden backdrop-blur-md" aria-hidden>
        <div className="flex whitespace-nowrap animate-marquee text-xs font-mono tracking-widest uppercase text-cyan-300">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="mx-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-4 z-40 max-w-6xl mx-auto px-4">
        <nav className="backdrop-blur-xl bg-[#0a0a12]/60 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <a href="#hero" {...hover} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-[#050508] rounded-xl flex items-center justify-center font-mono font-bold text-cyan-400">{PROFILE.initial}</div>
            </div>
            <span className="hidden sm:inline font-bold tracking-wider text-sm bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">{PROFILE.short}</span>
          </a>

          <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full px-3 py-1.5 text-sm text-slate-300">
            {NAV.map((item) => {
              const id = item.toLowerCase();
              return (
                <a key={item} href={`#${id}`} {...hover}
                  className={`px-3.5 py-1.5 rounded-full transition-all hover:text-white hover:bg-white/10 ${activeSection === id ? 'text-cyan-400 bg-white/10' : ''}`}>
                  {item}
                </a>
              );
            })}
          </div>

          <a href="#contact" {...hover} className="relative group overflow-hidden rounded-xl p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-xl" />
            <span className="relative px-5 py-2 rounded-xl bg-[#050508] flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
              Hire Me <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="hero" className="relative z-10 pt-16 pb-24 px-4 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[88vh] text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/[0.03] border border-white/10 mb-8 animate-float">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="text-xs font-mono tracking-wider text-slate-300 flex items-center gap-2">
            <MapPin className="w-3 h-3" /> {PROFILE.location.toUpperCase()} · OPEN TO OPPORTUNITIES
          </span>
        </div>

        <p className="font-mono text-cyan-400 tracking-widest text-sm mb-4 uppercase">Hi, I’m {PROFILE.name}</p>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 max-w-5xl">
          I own products from the{' '}
          <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">PostgreSQL schema</span>{' '}
          to the shipped interface.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-10 font-light leading-relaxed">
          Full-stack &amp; mobile engineer with 6 years’ experience — Next.js, React Native, TypeScript, Node.js. Shipped to both app stores, built live web platforms, and delivered Arabic-first, bilingual experiences with full RTL/LTR handling.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a href="#projects" {...hover} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 font-semibold shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] hover:scale-105 transition-all flex items-center justify-center gap-3 group">
            View Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/Hannan_Azmat_Master_CV.pdf" download {...hover} className="w-full sm:w-auto px-8 py-4 rounded-2xl backdrop-blur-xl bg-white/[0.04] border border-white/15 font-semibold hover:bg-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" /> Download CV
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 w-full max-w-4xl">
          {STATS.map((s) => (
            <div key={s.label} className={`${card} p-5 md:p-6 hover:border-cyan-500/40 transition-all group`}>
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">{s.value}</div>
              <div className="text-[11px] text-slate-400 font-mono tracking-wider mt-1 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400"><User className="w-5 h-5" /></span>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">01. About</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Simple architecture that stays simple as it grows.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300 leading-relaxed font-light">
            <p>
              I’ve owned products end to end — several as the sole developer on the stack. I design PostgreSQL schemas with migrations and query tuning, architect codebases to stay maintainable, integrate payments, messaging and travel APIs, and debug hard production problems.
            </p>
            <p>
              I write the API specifications and screen-flow diagrams that align clients before build begins, and authored the engineering standards used across my company’s teams. Gulf healthcare and travel clients have trusted me with Arabic-first and bilingual products.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10"><GraduationCap className="w-4 h-4 text-cyan-400" /> BS Software Engineering · National Textile University · 2016–2020</span>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative z-10 py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <SectionTag icon={Code2}>Technical Arsenal</SectionTag>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Skills &amp; Stack</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} {...hover} className={`${card} p-6 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 group`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                  <g.icon className={`w-6 h-6 ${g.color}`} />
                </div>
                <h3 className="font-bold text-lg">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 font-mono">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <SectionTag icon={Briefcase} color="purple">Career</SectionTag>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Experience</h2>
        </div>
        <div className="relative border-l border-white/10 ml-3 space-y-10">
          {EXPERIENCE.map((x) => (
            <div key={x.company} className="pl-8 relative">
              <span className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
              <div className={`${card} p-6 md:p-8`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-xl font-bold">{x.role}</h3>
                  <span className="font-mono text-xs text-cyan-400">{x.period}</span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{x.company} · {x.place}</p>
                <ul className="space-y-2 text-slate-300 font-light text-sm leading-relaxed">
                  {x.points.map((p) => (
                    <li key={p} className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-purple-400" /> {p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative z-10 py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <SectionTag icon={Briefcase} color="purple">Selected Work</SectionTag>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Products I’ve Shipped</h2>
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/10 p-2 rounded-2xl backdrop-blur-xl">
            {['All', 'Web', 'Mobile'].map((t) => (
              <button key={t} onClick={() => setFilter(t)} {...hover}
                className={`px-5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${filter === t ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((p) => (
            <button key={p.id} onClick={() => setModal(p)} {...hover}
              className="text-left group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-[0_16px_48px_rgba(0,0,0,0.5)] hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1.5">
                  {p.platforms.map((pl) => (
                    <span key={pl} className="px-2.5 py-0.5 rounded-full bg-black/40 border border-white/15 text-[10px] font-mono text-cyan-300 uppercase">{pl}</span>
                  ))}
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{p.title}</h3>
              <p className="text-xs font-mono text-purple-300 mb-3">{p.kind} · {p.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed font-light mb-5 flex-grow">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-slate-300 font-mono">{t}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <SectionTag icon={Award} color="emerald">Engineering Standards</SectionTag>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Leadership &amp; Impact</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEADERSHIP.map((l, i) => (
            <div key={i} {...hover} className={`${card} p-6 flex gap-4 hover:border-emerald-500/40 transition-all ${i === LEADERSHIP.length - 1 && LEADERSHIP.length % 2 ? 'md:col-span-2' : ''}`}>
              <div className="p-3 h-fit rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"><l.icon className="w-5 h-5" /></div>
              <p className="text-slate-300 font-light leading-relaxed">{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"><Mail className="w-5 h-5" /></span>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">02. Contact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Let’s build something that lasts.</h2>
          <p className="text-slate-400 mb-6 font-light">Have a product to ship or a hard production problem to untangle? Send a note — it opens in your email app.</p>

          <div className="flex flex-wrap gap-3 mb-8 text-sm">
            <a href={`mailto:${PROFILE.email}`} {...hover} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 transition-colors"><Mail className="w-4 h-4 text-cyan-400" /> {PROFILE.email}</a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, '')}`} {...hover} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 transition-colors"><Phone className="w-4 h-4 text-cyan-400" /> {PROFILE.phone}</a>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10"><MapPin className="w-4 h-4 text-cyan-400" /> {PROFILE.location}</span>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { k: 'name', label: 'Your Name', type: 'text', ph: 'Jane Doe' },
                { k: 'email', label: 'Your Email', type: 'email', ph: 'jane@company.com' },
              ].map((f) => (
                <div key={f.k}>
                  <label htmlFor={f.k} className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">{f.label}</label>
                  <input id={f.k} type={f.type} required value={(form as any)[f.k]} placeholder={f.ph}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-light" />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Message</label>
              <textarea id="message" rows={5} required value={form.message} placeholder="Tell me about the project, timeline and goals…"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-light resize-none" />
            </div>
            <button type="submit" {...hover} className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 font-semibold tracking-wider uppercase shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs font-mono">
        <div>© {new Date().getFullYear()} {PROFILE.name}. Built with React &amp; Tailwind CSS.</div>
        <div className="flex items-center gap-6">
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a>
          <a href={PROFILE.medium} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Medium</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub</a>
        </div>
      </footer>

      {/* Project modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in" onClick={() => setModal(null)} role="dialog" aria-modal="true" aria-label={modal.title}>
          <div className="bg-[#0a0a12] border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-[0_0_80px_rgba(139,92,246,0.4)]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal(null)} aria-label="Close" className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5 mb-3">
              {modal.platforms.map((pl: string) => (
                <span key={pl} className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">{pl}</span>
              ))}
            </div>
            <h3 className="text-3xl font-bold mb-1">{modal.title}</h3>
            <p className="text-sm font-mono text-purple-300 mb-4">{modal.kind} · {modal.role}</p>
            <p className="text-slate-300 mb-6 font-light leading-relaxed">{modal.description}</p>
            <ul className="space-y-3 mb-6 text-sm text-slate-300 font-light leading-relaxed">
              {modal.highlights.map((h: string) => (
                <li key={h} className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" /> {h}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mb-8">
              {modal.tags.map((t: string) => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 font-mono">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3">
              {modal.url && (
                <a href={modal.url} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold text-sm flex items-center gap-2">
                  Visit site <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              <button onClick={() => setModal(null)} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 font-semibold text-sm transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
