import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

/* ───────────────────────── Content ─────────────────────────
   Client work is under NDA: project names, client names and links are
   intentionally generic. Do not add real names or URLs here. */

const PROFILE = {
  name: 'Hannan Azmat',
  full: 'Muhammad Hannan Azmat',
  title: 'Full-Stack & Mobile Engineer',
  email: 'hannanazmat@gmail.com',
  phone: '+92 312 1719008',
  location: 'Lahore, Pakistan',
  linkedin: 'https://www.linkedin.com/in/muhammad-hannan-azmat/',
  medium: 'https://medium.com/@hannan.azmat',
  github: 'https://github.com/hannan-azmat',
};

const ROTATING = ['WEB APPS.', 'MOBILE APPS.', 'APIS.', 'PRODUCTS.'];

const STATS = [
  { value: '6+', label: 'Years building' },
  { value: '17', label: 'Products shipped' },
  { value: '2', label: 'App stores, solo' },
  { value: 'AR·EN', label: 'RTL & LTR' },
];

const STACK = [
  { title: 'Web', items: ['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Material UI', 'Ant Design', 'Styled Components'] },
  { title: 'Mobile', items: ['React Native', 'Flutter', 'Expo', 'iOS (Swift)', 'Push notifications', 'Deep linking', 'Bluetooth LE', 'Fastlane'] },
  { title: 'Back end & APIs', items: ['Node.js', 'NestJS', 'Express', 'FastAPI', '.NET', 'REST', 'JWT / OAuth 2.0', 'Webhooks', 'Socket.IO'] },
  { title: 'Data', items: ['PostgreSQL', 'MongoDB', 'TypeORM', 'Prisma', 'Migrations', 'Query tuning', 'Optimistic locking', 'RBAC'] },
  { title: 'State & forms', items: ['Redux Toolkit', 'Redux Saga', 'TanStack Query', 'Axios', 'Formik', 'React Hook Form', 'Yup'] },
  { title: 'Arabic & RTL', items: ['RTL / LTR', 'i18n', 'Bilingual AR/EN UI', 'Bilingual documents', 'Theming'] },
  { title: 'Integrations', items: ['Flutterwave', 'Stripe', 'Twilio', 'Firebase', 'Google Maps', 'RevenueCat', 'AdMob', 'OpenAI API', 'Travel APIs'] },
  { title: 'Quality & release', items: ['Jest', 'Sentry', 'SonarQube', 'ESLint + Husky', 'Snyk / OWASP', 'GitHub · GitLab · Bitbucket'] },
  { title: 'AI-assisted dev', items: ['Claude (primary)', 'Cursor', 'Antigravity', 'OpenCode'] },
];

const PROJECTS = [
  {
    title: 'Astrology Platform', category: 'Consumer · Subscriptions', role: 'Development lead', platforms: ['Web', 'Mobile'],
    summary: 'Birth charts, transits, daily forecasts, synastry, tarot, an AI-narrated journal, real-time chat and subscriptions, shipped to iOS, Android and Web from one Flutter codebase.',
    points: [
      'Led development and built most of it hands-on: the Flutter client, the backend, payments, real-time messaging and the release process on all three platforms.',
      'Node.js / MongoDB API backed by a .NET astrology engine that powers the chart calculations.',
    ],
    tags: ['Flutter', 'Node.js', 'MongoDB', '.NET', 'Real-time chat', 'Subscriptions'],
  },
  {
    title: 'History Reading App', category: 'Consumer · Content', role: 'Solo build', platforms: ['Mobile', 'Web'],
    summary: 'Each period is a book told chronologically, with a time ribbon showing the date of the paragraph on screen, plus maps, timelines and archival images.',
    points: [
      'Flutter app, FastAPI + Postgres backend, Google sign-in, RevenueCat memberships, server-verified AdMob rewarded unlocks, and a Flutter-web admin studio.',
      'Retrieval-grounded content pipeline: dates, coordinates and images come from Wikidata and Wikimedia Commons; an OpenAI model writes only the prose from fetched Wikipedia passages, and Python rejects any date or figure the sources don’t contain.',
      'Chapters are narrated: recorded once with an open-weight voice model, aligned word by word against the text, and published like any other file.',
    ],
    tags: ['Flutter', 'FastAPI', 'PostgreSQL', 'RevenueCat', 'AdMob', 'OpenAI'],
  },
  {
    title: 'Property CRM Platform', category: 'Real estate · Admin & CRM', role: 'Technical lead', platforms: ['Web', 'Mobile'],
    summary: 'Twelve-module Next.js admin platform with role-based access, plus an Expo / React Native CRM so agents can act on new leads from their phones.',
    points: [
      'Closed a production lead-ownership concurrency defect with an ownership guard, optimistic locking on a version column and real-time reassignment events, eliminating duplicate assignment.',
      'Modelled permissions so new modules can be added without reworking access logic.',
      'Authored the API specs, screen-flow diagrams and phased estimate that aligned the client before build.',
    ],
    tags: ['Next.js', 'Expo', 'RBAC', 'Optimistic locking', 'WebSockets'],
  },
  {
    title: 'Fleet Tracking Platform', category: 'Logistics · Subscriptions', role: 'Sole full-stack developer', platforms: ['Web'],
    summary: 'Owned the whole product: PostgreSQL schema, NestJS APIs and four role-based portals for customers, admins, technicians and investigators.',
    points: [
      'Flutterwave payments end to end (checkout, webhooks, limits, verification), replacing manual reconciliation with self-service subscriptions.',
      'Restructured sign-up and device activation so customers onboard without contacting support.',
    ],
    tags: ['NestJS', 'PostgreSQL', 'Flutterwave', 'Next.js'],
  },
  {
    title: 'Travel Booking Platform', category: 'Travel · Bilingual', role: 'Full-stack engineer', platforms: ['Web'],
    summary: 'Search-to-checkout rebuilt around a reusable component library, with airline and travel API integration and bilingual invoicing.',
    points: [
      'Component library benchmarked against leading travel platforms, cutting build time for every booking feature after it.',
      'Bilingual Arabic/English invoices with correct mixed-script layout.',
    ],
    tags: ['Next.js', 'Travel APIs', 'Arabic RTL', 'i18n'],
  },
  {
    title: 'Commerce Platform', category: 'eCommerce · Back end', role: 'Technical lead', platforms: ['Web'],
    summary: 'PostgreSQL + TypeORM schema design and a NestJS backend split into independent modules.',
    points: [
      'Migrations and complex query tuning kept response times stable as the catalogue grew.',
      'Independent auth, orders, products and user modules let workstreams proceed without collision.',
    ],
    tags: ['NestJS', 'TypeORM', 'PostgreSQL'],
  },
  {
    title: 'Patient Care App', category: 'Healthcare · Arabic-first', role: 'Mobile engineer', platforms: ['Mobile'],
    summary: 'Healthcare app taken from English-only to fully Arabic-first, with RTL/LTR and theming.',
    points: [
      'Built the i18n layer with full RTL/LTR support and theming.',
      'Raised automated test coverage to 30% on a live healthcare product.',
      'Deep / dynamic linking and Firebase notifications across the patient journey.',
    ],
    tags: ['React Native', 'RTL', 'Firebase', 'Jest'],
  },
  {
    title: 'Glucose Coaching App', category: 'Health · Devices', role: 'Mobile engineer', platforms: ['Mobile'],
    summary: 'Live continuous-glucose-monitor readings streamed over Bluetooth and turned into personalised guidance.',
    points: [
      'Bluetooth Low Energy integration streaming live device readings.',
      'Algorithms converting raw device data into personalised guidance.',
    ],
    tags: ['React Native', 'BLE'],
  },
  {
    title: 'Interactive Radio App', category: 'Media · Audio', role: 'Android engineer', platforms: ['Mobile'],
    summary: 'Streams live internet radio while continuously analysing the audio for embedded “sound-QR” triggers; a detected trigger surfaces an interactive notification and records the listener’s interest back to the platform.',
    points: [
      'Rebuilt the existing iOS app natively for Android on the vendor SDK so both platforms behave identically: same stations, trigger sound, detection timing and thresholds.',
    ],
    tags: ['Android', 'Audio analysis', 'Streaming', 'SDK'],
  },
  {
    title: 'Workforce Attendance App', category: 'HR · Location', role: 'Mobile lead', platforms: ['Mobile'],
    summary: 'Location-based attendance that resists VPN and mock-location spoofing.',
    points: [
      'Google Maps & Geocoding with VPN / mock-location restrictions, so attendance reflects where people actually were.',
      'Fastlane automation turned store releases into a routine.',
    ],
    tags: ['React Native', 'Google Maps', 'Fastlane'],
  },
  {
    title: 'Gig Marketplace App', category: 'Marketplace · Media', role: 'Mobile engineer', platforms: ['Mobile'],
    summary: 'Media-heavy contractor marketplace tuned for poor connections.',
    points: [
      'Video / image transcoding, compression and image caching.',
      'Socket.IO real-time chat, in-app PDF viewer and payments.',
    ],
    tags: ['React Native', 'Socket.IO', 'Payments'],
  },
  {
    title: 'Retail Messaging App', category: 'Retail · Messaging', role: 'Mobile engineer', platforms: ['Mobile'],
    summary: 'Staff message customers directly over SMS or WhatsApp, with compressed media.',
    points: [
      'Twilio SDK integration with media compression for attachments.',
      'Led the migration from bare React Native to Expo, removing native build maintenance.',
    ],
    tags: ['Expo', 'Twilio', 'WhatsApp'],
  },
  {
    title: 'Home Services Booking App', category: 'On-demand · Payments', role: 'Mobile engineer', platforms: ['Mobile'],
    summary: 'Customers reserve home services online, end to end.',
    points: ['Social login, push notifications, universal linking, Maps/Geocoding and multiple payment integrations.'],
    tags: ['React Native', 'Payments', 'Maps'],
  },
  {
    title: 'Vehicle Services App', category: 'On-demand · Two apps', role: 'Mobile engineer', platforms: ['Mobile'],
    summary: 'Customer and partner apps for a nationwide vehicle-cleaning service.',
    points: ['Social login, image push notifications, Google Maps and real-time chat.'],
    tags: ['React Native', 'Maps', 'Chat'],
  },
  {
    title: 'Fashion Marketplace App', category: 'Marketplace · Wallet', role: 'Sole developer', platforms: ['Mobile'],
    summary: 'The whole stack, from zero to released on both app stores.',
    points: ['Social login, payments, in-app wallet, user listings, social groups, chat and the full checkout flow.'],
    tags: ['React Native', 'Wallet', 'Chat'],
  },
  {
    title: '3D Model Viewer', category: 'iOS · Proof of concept', role: 'Solo developer', platforms: ['Mobile'],
    summary: 'Native iOS app for viewing, inspecting and interacting with glTF/GLB 3D models, the standard in medical, dental, architectural and product-design workflows.',
    points: ['Built solo as a client proof-of-concept, covering end-to-end iOS development from project setup to App Store submission readiness.'],
    tags: ['iOS', 'Swift', 'glTF / GLB', '3D'],
  },
  {
    title: 'Drawing Annotation Tool', category: 'iOS / iPadOS · Proof of concept', role: 'Developer', platforms: ['Mobile'],
    summary: 'Professional telestration over live camera feeds, photos and videos, for medical and sports-style workflows.',
    points: [
      'Drawing layer and background media share the same pan/zoom transform.',
      'Drawings can be sent to an HDMI-connected external display in a “lines only” mode.',
    ],
    tags: ['iOS', 'iPadOS', 'Swift', 'Camera', 'External display'],
  },
];

const EXPERIENCE = [
  {
    role: 'Senior Software Engineer, Full-Stack', company: 'PikesSoft', period: 'Jun 2022 – Present',
    points: [
      'Technical lead and sole full-stack developer across web and mobile products for Gulf and international clients.',
      'Wrote the company-wide clean coding standards and led the React Native trainee program.',
      'Introduced Fastlane build and release pipelines across multiple products.',
    ],
  },
  {
    role: 'React Native Developer', company: 'Dominion Global', period: 'Nov 2020 – May 2022',
    points: [
      'Sole developer on a fashion marketplace, zero to released on both stores.',
      'Built social login, payments, an in-app wallet, user listings, social groups, chat and checkout.',
    ],
  },
];

const IMPACT = [
  'Authored the company-wide clean coding standards adopted across all engineering teams.',
  'Led the company’s React Native trainee program, bringing new engineers up to working on client projects.',
  'Promoted from Engineering Level L1 to L3 within three months of joining.',
  'Introduced automated build and release pipelines with Fastlane across multiple products.',
  'Publish technical writing on React and engineering practice on Medium.',
];

const NAV = [['Work', 'work'], ['Stack', 'stack'], ['Experience', 'experience'], ['About', 'about']];

/* ───────────────────────── UI ───────────────────────── */

const Pill = ({ children, href, dark, ...rest }: any) => (
  <a href={href} {...rest}
    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 ${dark ? 'bg-ink text-paper' : 'border border-line bg-white/40 text-ink hover:bg-white'}`}>
    {children}
  </a>
);

/** Fade-up on scroll, like the reference site's `fade-up` keyframe. */
const Reveal = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: seen ? undefined : 0, animation: seen ? `fade-up .8s cubic-bezier(.22,1,.36,1) ${delay}s both` : undefined }}>
      {children}
    </div>
  );
};

/** Vertical word slot: the words are stacked and the column slides up (900ms, same easing as the reference). */
const WordSlot = ({ words, index }: { words: string[]; index: number }) => (
  <span className="relative block h-[1em] overflow-hidden text-accent" aria-hidden="true">
    <span className="block" style={{ transform: `translateY(-${index}em)`, transition: 'transform 900ms cubic-bezier(0.76, 0, 0.24, 1)' }}>
      {words.map((w) => <span key={w} className="flex h-[1em] items-center justify-center whitespace-nowrap">{w}</span>)}
    </span>
  </span>
);

/** Chips orbiting a centre point. Pauses when the parent `.group` is hovered. */
const Orbit = ({ items, radius, duration = 28 }: { items: string[]; radius: string; duration?: number }) => (
  <div aria-hidden className="absolute inset-0 group-hover:![animation-play-state:paused]"
    style={{ animation: `orbit ${duration}s linear infinite` }}>
    {items.map((it, i) => {
      const a = (360 / items.length) * i;
      return (
        <div key={it} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateX(${radius}) rotate(${-a}deg)` }}>
          <span className="block group-hover:![animation-play-state:paused]"
            style={{ translate: '-50% -50%', animation: `orbit-rev ${duration}s linear infinite` }}>
            <span className="block whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium shadow-[0_6px_18px_rgba(20,20,19,0.10)] transition-transform duration-300 group-hover:scale-110">{it}</span>
          </span>
        </div>
      );
    })}
  </div>
);

const SectionHead = ({ title, note }: { title: string; note?: string }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight">{title}</h2>
    {note && <p className="max-w-md text-mute leading-relaxed">{note}</p>}
  </div>
);

export default function App() {
  const [word, setWord] = useState(0);
  const [filter, setFilter] = useState('All');
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setWord((w) => (w + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.platforms.includes(filter));
  const current = shown[Math.min(idx, shown.length - 1)];
  const go = (d: number) => setIdx((i) => (i + d + shown.length) % shown.length);

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink font-sans selection:bg-accent selection:text-white">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors ${scrolled ? 'bg-paper/90 backdrop-blur border-b border-line' : 'border-b border-transparent'}`}>
        <nav className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="text-lg font-extrabold tracking-tight">{PROFILE.name}</a>
          <div className="hidden md:flex items-center gap-9 text-sm">
            {NAV.map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-accent transition-colors">{label}</a>)}
          </div>
          <a href="#contact" className="rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:-translate-y-0.5 transition-transform">Let’s talk</a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto flex min-h-screen max-w-[1360px] flex-col px-5 pt-[72px] md:px-10">
        <div className="flex flex-1 flex-col items-center justify-center text-center py-16">
          <h1 className="font-black tracking-tight leading-[1] text-6xl sm:text-8xl lg:text-[9.5rem]">
            <span className="sr-only">I build web apps, mobile apps, APIs and products.</span>
            <span aria-hidden="true">
              <span className="block overflow-hidden"><span className="block" style={{ animation: 'line-up 1s cubic-bezier(.22,1,.36,1) both' }}>I BUILD</span></span>
              <span className="block" style={{ animation: 'line-up 1s cubic-bezier(.22,1,.36,1) .12s both' }}>
                <WordSlot words={ROTATING} index={word} />
              </span>
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-xl text-mute leading-relaxed" style={{ animation: 'fade-up .8s ease-out .5s both' }}>
            <span className="inline-block h-2 w-2 rounded-full bg-accent mr-2 align-middle" />
            <span className="text-ink">Hi, I’m Hannan</span>, a full-stack and mobile engineer in Lahore, owning products from the PostgreSQL schema to the shipped interface.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3" style={{ animation: 'fade-up .8s ease-out .65s both' }}>
            <Pill href="#work" dark>See my work <ArrowDown className="h-4 w-4" /></Pill>
            <Pill href="#contact">Let’s talk <ArrowUpRight className="h-4 w-4" /></Pill>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-line py-5 text-sm text-mute">
          <span>{PROFILE.title}</span>
          <span>{PROFILE.location}, UTC+5</span>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-[1360px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid items-center gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <div>
            <Reveal><h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-10">About</h2></Reveal>
            <Reveal delay={0.08}>
              <p className="text-2xl md:text-4xl font-semibold leading-snug tracking-tight">
                Six years owning products end to end, several as the sole developer on the stack. Shipped to both app stores, built live web platforms and delivered Arabic-first, bilingual experiences with full RTL/LTR handling.
              </p>
              <p className="mt-8 text-lg text-mute leading-relaxed max-w-2xl">
                I design PostgreSQL schemas with migrations and query tuning, architect codebases to stay simple as they grow, integrate payments, messaging and travel APIs, and debug hard production problems. I write the API specs and screen-flow diagrams that align clients before build, and authored the engineering standards used across my company’s teams.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-12 grid grid-cols-2 gap-4 xl:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/70 border border-line p-5 transition-transform hover:-translate-y-1">
                  <div className="text-3xl font-extrabold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-xs text-mute">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Photo, right end: B&W cut-out whose head pops out of the disc; a rotating skills ring appears on hover */}
          <Reveal className="md:justify-self-end w-full max-w-md mx-auto md:mx-0">
            <div className="group relative aspect-square w-full [container-type:inline-size]">
              <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 [animation:spin_18s_linear_infinite]">
                <defs><path id="skills-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" /></defs>
                <text fontSize="9.5" fontFamily="Geist Mono, monospace" letterSpacing="2.2" fill="#2145f5" fontWeight="500">
                  <textPath href="#skills-ring">FULL-STACK • MOBILE • FLUTTER • NEXT.JS • REACT NATIVE • POSTGRESQL •</textPath>
                </text>
              </svg>
              <div aria-hidden className="absolute inset-[7%] rounded-full border border-dashed border-ink/25 transition-opacity duration-500 group-hover:opacity-0" />
              <div aria-hidden className="absolute inset-[12%] rounded-full border border-ink bg-[#e9e6df] transition-transform duration-500 group-hover:scale-[0.98]" />
              {/* image layer is taller than the disc so the head can rise above it */}
              <div className="absolute left-[12%] w-[76%] top-[-12%] h-full origin-bottom transition-transform duration-500 ease-out group-hover:scale-[0.98]"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle 38cqw at 50% 61.5%, #000 99%, transparent 100%), linear-gradient(#000,#000)',
                  maskImage: 'radial-gradient(circle 38cqw at 50% 61.5%, #000 99%, transparent 100%), linear-gradient(#000,#000)',
                  WebkitMaskSize: '100% 100%, 48% 62%',
                  maskSize: '100% 100%, 48% 62%',
                  WebkitMaskPosition: '0 0, 57% 0',
                  maskPosition: '0 0, 57% 0',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                }}>
                <img src="/hannan-cutout.webp" alt={PROFILE.full} className="absolute bottom-0 left-1/2 w-[125%] max-w-none -translate-x-1/2 select-none" draggable={false} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Work: auto-advancing deck with progress segments */}
      <section id="work" className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-36">
        <Reveal><SectionHead title="Selected work" note="Production work. Client work is under NDA, so each project is described by what I built and the stack it runs on." /></Reveal>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-mute">Show</span>
          {['All', 'Web', 'Mobile'].map((t) => (
            <button key={t} onClick={() => { setFilter(t); setIdx(0); }}
              className={`rounded-full px-4 py-2 text-sm border transition-colors ${filter === t ? 'bg-ink text-paper border-ink' : 'border-line bg-white/50 hover:bg-white'}`}>{t}</button>
          ))}
        </div>

        <div className="relative pb-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          {/* peeking cards behind */}
          <div aria-hidden className="absolute inset-x-8 bottom-0 top-6 rounded-[2rem] bg-accent/90" />
          <div aria-hidden className="absolute inset-x-4 bottom-3 top-3 rounded-[2rem] border border-line bg-[#ece9e2]" />

          <article key={`${filter}-${current.title}`} className="relative grid gap-8 rounded-[2rem] border border-line bg-[#faf9f6] p-7 shadow-[0_30px_80px_rgba(20,20,19,0.10)] md:min-h-[560px] md:grid-cols-[1.5fr_1fr] md:gap-12 md:p-12"
            style={{ animation: 'fade-up .6s cubic-bezier(.22,1,.36,1) both' }}>
            <div>
              <div className="mb-4 font-mono text-sm text-accent">{String(idx + 1).padStart(2, '0')} · {current.category}</div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight">{current.title}</h3>
              <p className="mt-4 text-lg text-mute leading-relaxed">{current.summary}</p>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {current.points.map((pt, k) => (
                  <li key={k} className="flex gap-5 py-4 leading-relaxed">
                    <span className="font-mono text-accent text-sm pt-0.5">{String(k + 1).padStart(2, '0')}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:justify-end">
              <div className="group relative mx-auto aspect-square w-full max-w-[300px] [container-type:inline-size] overflow-hidden rounded-3xl border border-line bg-[#ece9e2]">
                <div aria-hidden className="absolute inset-[18%] rounded-full border border-dashed border-ink/15" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-ink text-2xl font-extrabold text-paper shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {current.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                </div>
                <Orbit key={current.title} items={current.tags.slice(0, 6)} radius="33cqw" duration={26} />
              </div>
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-xs text-mute">Role</div>
                <div className="mt-1 font-semibold">{current.role}</div>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-xs text-mute">Platform</div>
                <div className="mt-1 font-semibold">{current.platforms.join(' · ')}</div>
              </div>
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="text-xs text-mute mb-3">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((t) => <span key={t} className="rounded-full bg-paper border border-line px-3 py-1 text-xs">{t}</span>)}
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* controls */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Projects">
            {shown.map((p, i) => (
              <button key={p.title} role="tab" aria-selected={i === idx} aria-label={p.title} onClick={() => setIdx(i)}
                className={`relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ${i === idx ? 'w-12' : 'w-4'} bg-ink/15 hover:bg-ink/30`}>
                {i === idx && (
                  <span className="absolute inset-0 origin-left rounded-full bg-ink"
                    style={{ animation: 'deck-progress 7000ms linear forwards', animationPlayState: paused || reduce ? 'paused' : 'running' }}
                    onAnimationEnd={() => go(1)} />
                )}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => go(-1)} aria-label="Previous project" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/50 hover:bg-white transition-colors"><ArrowLeft className="h-4 w-4" /></button>
            <button onClick={() => go(1)} aria-label="Next project" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper hover:-translate-y-0.5 transition-transform"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-36">
        <Reveal><SectionHead title="Stack" note="The tools I use in production, grouped by the layer they live in." /></Reveal>
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {STACK.map((g) => (
            <div key={g.title}>
              <h3 className="mb-4 text-sm text-mute">{g.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((it) => (
                  <span key={it} className="rounded-2xl border border-line bg-white px-4 py-3 text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)]">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-[1360px] px-5 py-24 md:px-10 md:py-36">
        <Reveal><SectionHead title="Experience" /></Reveal>
        <div className="divide-y divide-line border-y border-line">
          {EXPERIENCE.map((x) => (
            <div key={x.company} className="grid gap-4 py-10 md:grid-cols-[1fr_2fr] md:gap-16">
              <div>
                <div className="font-mono text-sm text-accent">{x.period}</div>
                <div className="mt-2 text-2xl font-bold tracking-tight">{x.role}</div>
                <div className="text-mute">{x.company} · Lahore, Pakistan</div>
              </div>
              <ul className="space-y-3 text-lg leading-relaxed">
                {x.points.map((p) => <li key={p} className="flex gap-3"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
          <h3 className="text-3xl font-bold tracking-tight">Education</h3>
          <div>
            <div className="text-xl font-semibold">BS Software Engineering</div>
            <div className="text-mute">National Textile University, Faisalabad · 2016 – 2020</div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
          <h3 className="text-3xl font-bold tracking-tight">Standards &amp; impact</h3>
          <ul className="divide-y divide-line border-y border-line">
            {IMPACT.map((t) => <li key={t} className="py-4 text-lg leading-relaxed">{t}</li>)}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-[1360px] px-5 pb-16 pt-24 md:px-10 md:pt-36">
        <h2 className="text-6xl md:text-[10rem] font-black tracking-tight leading-none">Let’s talk<span className="text-accent">.</span></h2>
        <a href={`mailto:${PROFILE.email}`} className="mt-10 inline-block text-2xl md:text-4xl font-semibold tracking-tight underline decoration-accent decoration-4 underline-offset-8 hover:text-accent transition-colors break-all">
          {PROFILE.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          <Pill href={`mailto:${PROFILE.email}`} dark><Mail className="h-4 w-4" /> Email me</Pill>
          <Pill href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}><Phone className="h-4 w-4" /> {PROFILE.phone}</Pill>
          <Pill href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight className="h-4 w-4" /></Pill>
          <Pill href={PROFILE.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight className="h-4 w-4" /></Pill>
          <Pill href={PROFILE.medium} target="_blank" rel="noreferrer">Medium <ArrowUpRight className="h-4 w-4" /></Pill>
        </div>

        <footer className="mt-24 flex flex-col gap-3 border-t border-line pt-8 text-sm text-mute md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.full}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {PROFILE.location}</span>
        </footer>
      </section>

      <style>{`
        @keyframes line-up{from{transform:translateY(105%)}to{transform:none}}
        @keyframes fade-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes orbit-rev{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes deck-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>
    </div>
  );
}
