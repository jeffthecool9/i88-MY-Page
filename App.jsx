import { useEffect, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const MY_PAGE_URL = 'https://www.facebook.com/profile.php?id=61584225863316';
const SG_PAGE_URL = 'https://www.facebook.com/profile.php?id=61584669658907';

const baseFade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const trustItems = [
  {
    title: 'Clarity first',
    copy: 'Know where you are going before you continue.',
  },
  {
    title: 'Regional presence',
    copy: 'Access stays specific to your location.',
  },
  {
    title: 'Info-first approach',
    copy: 'Updates without noise or pressure.',
  },
  {
    title: 'Since 2016',
    copy: 'Operating with long-term continuity.',
  },
];

const miniList = ['Platform updates', 'Feature previews', 'Regional info', 'Community notes'];

function MagneticButton({ href, label, helper, tone = 'primary' }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.2 });

  const handleMove = (event) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const deltaX = event.clientX - rect.left - rect.width / 2;
    const deltaY = event.clientY - rect.top - rect.height / 2;
    x.set(deltaX * 0.15);
    y.set(deltaY * 0.15);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={
        tone === 'primary'
          ? 'group relative flex min-h-[72px] flex-col items-start justify-center gap-1 overflow-hidden rounded-full border border-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_40px_rgba(0,163,255,0.35)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200'
          : 'group relative flex min-h-[72px] flex-col items-start justify-center gap-1 overflow-hidden rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-slate-100 shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200'
      }
      aria-label={label}
    >
      <span className="relative z-10 text-base">{label}</span>
      {helper ? <span className="relative z-10 text-xs font-medium text-slate-800/80">{helper}</span> : null}
      <span className="pointer-events-none absolute -left-1/3 top-0 h-[240%] w-1/2 -translate-x-full rotate-[20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[240%] group-hover:opacity-100" />
    </motion.a>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const portalShift = useTransform(scrollYProgress, [0, 0.6], [0, 80]);
  const portalBlur = useTransform(scrollYProgress, [0, 0.5], [0, 6]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.4 });
  const smoothY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 16;
      const y = (event.clientY / window.innerHeight - 0.5) * 16;
      cursorX.set(x);
      cursorY.set(y);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [cursorX, cursorY, reduceMotion]);

  const backgroundStyle = useMemo(
    () => ({
      background:
        'radial-gradient(900px circle at 12% 12%, rgba(0,163,255,0.22), transparent 60%), radial-gradient(700px circle at 85% 15%, rgba(91,139,255,0.22), transparent 55%), linear-gradient(150deg, rgba(10,16,30,0.96), rgba(3,6,14,0.98))',
    }),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{ ...backgroundStyle, x: reduceMotion ? 0 : smoothX, y: reduceMotion ? 0 : smoothY }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'repeating-linear-gradient(120deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 48px)',
          y: reduceMotion ? 0 : useTransform(portalShift, (value) => -value * 0.15),
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10" aria-hidden="true" style={{
        background:
          'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.06) 48%, transparent 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 120px)',
      }} />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(1.5px 1.5px at 70% 20%, rgba(255,255,255,0.4), transparent 45%), radial-gradient(2px 2px at 85% 70%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(1.5px 1.5px at 35% 80%, rgba(255,255,255,0.35), transparent 45%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-10 mix-blend-screen"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#05070d]/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-[0.45em]">i88</div>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#regions" className="transition hover:text-white">Regions</a>
            <a href="#trust" className="transition hover:text-white">Trust</a>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-16">
        <section className="grid min-h-[88vh] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" id="top">
          <motion.div {...baseFade} className="relative space-y-5">
            <div className="relative inline-block">
              <motion.div
                className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[999px]"
                style={{
                  background: 'radial-gradient(240px 120px at 30% 50%, rgba(255,255,255,0.22), transparent 60%)',
                  x: reduceMotion ? 0 : useTransform(smoothX, (value) => value * 0.6),
                }}
                aria-hidden="true"
              />
              <h1 className="relative text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Explore first. Decide when ready.
              </h1>
            </div>
            <p className="max-w-lg text-base text-slate-300">
              No pressure. Pick your region to explore updates & highlights.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,163,255,0.6)]" />
              Trusted since 2016
            </span>
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                href={MY_PAGE_URL}
                label="Open i88 MY"
                helper="Regional updates and access"
              />
              <MagneticButton
                href={SG_PAGE_URL}
                label="Open i88 SG"
                helper="Regional updates and access"
                tone="secondary"
              />
            </div>
            <p className="text-sm text-slate-400">This is an info hub for guided access only.</p>
          </motion.div>
          <motion.div
            {...baseFade}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative flex min-h-[320px] items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 rounded-[999px]"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 60%)',
                filter: 'drop-shadow(0 24px 50px rgba(0,163,255,0.25))',
              }}
            />
            <motion.div
              className="absolute inset-[12%] rounded-full border border-white/20 shadow-[inset_0_0_40px_rgba(0,163,255,0.18)]"
              style={{ y: reduceMotion ? 0 : portalShift }}
            />
            <motion.div
              className="absolute inset-[22%] rounded-full border border-white/30 shadow-[inset_0_0_50px_rgba(0,163,255,0.2)]"
              style={{ y: reduceMotion ? 0 : useTransform(portalShift, (value) => value * 1.3) }}
            />
            <motion.div
              className="absolute inset-[32%] rounded-full border border-white/40 shadow-[inset_0_0_60px_rgba(0,163,255,0.25),0_0_30px_rgba(0,163,255,0.3)]"
              style={{
                y: reduceMotion ? 0 : useTransform(portalShift, (value) => value * 1.6),
                filter: reduceMotion ? 'none' : useTransform(portalBlur, (value) => `blur(${value}px)`),
              }}
            />
          </motion.div>
        </section>

        <section id="about" className="space-y-8">
          <motion.div {...baseFade}>
            <h2 className="text-2xl font-semibold text-white">Why this gateway exists</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              A calm overview that keeps access clear, regional, and transparent.
            </p>
          </motion.div>
          <motion.div
            {...baseFade}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="h-px w-full bg-gradient-to-r from-cyan-300/60 via-cyan-300/10 to-transparent"
          />
          <div id="trust" className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <motion.div
              {...baseFade}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="space-y-6"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {trustItems.map((item) => (
                  <div key={item.title} className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center gap-2 text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,163,255,0.6)]" />
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              {...baseFade}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex flex-wrap items-center gap-3"
            >
              {miniList.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-300"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="regions" className="space-y-6">
          <motion.div {...baseFade}>
            <h2 className="text-2xl font-semibold text-white">Quick regional access</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">Choose the page that matches your location.</p>
          </motion.div>
          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div
              {...baseFade}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="group relative overflow-hidden rounded-[24px] border border-white/15 bg-white/5 p-8 shadow-[0_30px_60px_rgba(4,10,24,0.6)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/15 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <h3 className="text-xl font-semibold text-white">🇲🇾 Malaysia</h3>
              <p className="mt-2 max-w-xs text-sm text-slate-300">Local updates and access paths for MY.</p>
              <div className="mt-6">
                <MagneticButton href={MY_PAGE_URL} label="Open i88 MY" />
              </div>
            </motion.div>
            <motion.div
              {...baseFade}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="group relative overflow-hidden rounded-[24px] border border-white/15 bg-white/5 p-8 shadow-[0_30px_60px_rgba(4,10,24,0.6)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-400/15 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <h3 className="text-xl font-semibold text-white">🇸🇬 Singapore</h3>
              <p className="mt-2 max-w-xs text-sm text-slate-300">Local updates and access paths for SG.</p>
              <div className="mt-6">
                <MagneticButton href={SG_PAGE_URL} label="Open i88 SG" tone="secondary" />
              </div>
            </motion.div>
          </div>
          <p className="text-sm text-slate-400">Review updates before joining.</p>
        </section>

        <footer className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6 text-xs text-slate-400">
          <a href="#about" className="rounded-full border border-white/10 bg-white/5 px-3 py-1">About</a>
          <a href="#regions" className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Regions</a>
          <a href="#trust" className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Trust</a>
          <span className="ml-auto">Info-only gateway page.</span>
        </footer>
      </main>
    </div>
  );
}
