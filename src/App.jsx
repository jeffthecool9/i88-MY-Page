import { useEffect } from 'react';

const MY_PAGE_URL = 'https://www.facebook.com/profile.php?id=61584225863316';
const SG_PAGE_URL = 'https://www.facebook.com/profile.php?id=61584669658907';

const trustItems = [
  'Clarity-first access flow',
  'Regional updates, always current',
  'Support you can reach',
  'Since 2016, steady presence',
];

const trackItems = [
  'Platform notes',
  'Feature previews',
  'Regional guidance',
  'Community signals',
];

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));

    const spotlight = document.querySelector('[data-spotlight]');
    const handleMove = (event) => {
      if (prefersReducedMotion || !spotlight) return;
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      spotlight.style.setProperty('--spot-x', `${x}%`);
      spotlight.style.setProperty('--spot-y', `${y}%`);
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMove);
    }

    const magneticButtons = document.querySelectorAll('.magnetic');
    const magneticHandlers = [];
    magneticButtons.forEach((button) => {
      const handleMagneticMove = (event) => {
        if (prefersReducedMotion) return;
        const rect = button.getBoundingClientRect();
        const deltaX = event.clientX - rect.left - rect.width / 2;
        const deltaY = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${deltaX * 0.12}px, ${deltaY * 0.12}px)`;
      };
      const handleMagneticLeave = () => {
        button.style.transform = 'translate(0px, 0px)';
      };
      button.addEventListener('mousemove', handleMagneticMove);
      button.addEventListener('mouseleave', handleMagneticLeave);
      magneticHandlers.push({ button, handleMagneticMove, handleMagneticLeave });
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMove);
      magneticHandlers.forEach(({ button, handleMagneticMove, handleMagneticLeave }) => {
        button.removeEventListener('mousemove', handleMagneticMove);
        button.removeEventListener('mouseleave', handleMagneticLeave);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 noise" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        data-spotlight
        style={{
          background:
            'radial-gradient(420px 260px at var(--spot-x, 30%) var(--spot-y, 30%), rgba(0,163,255,0.22), transparent 70%)',
        }}
      />

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#05070d]/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-[0.4em]">i88</div>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#trust" className="transition hover:text-white">Trust</a>
            <a href="#track" className="transition hover:text-white">Updates</a>
            <a href="#regions" className="transition hover:text-white">Regions</a>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-16">
        <section className="grid min-h-[80vh] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" id="hero">
          <div className="space-y-5 reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,163,255,0.7)]" />
              Since 2016
            </div>
            <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore first. Decide when ready.
            </h1>
            <p className="max-w-lg text-base text-slate-300">
              A calm gateway for regional updates, feature notes, and access clarity.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="magnetic shine glass relative flex min-h-[72px] flex-col items-start justify-center gap-1 rounded-full px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
                href={MY_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-base">Open i88 MY Page</span>
                <span className="text-xs font-medium text-slate-800/80">MY updates and access</span>
              </a>
              <a
                className="magnetic shine glass relative flex min-h-[72px] flex-col items-start justify-center gap-1 rounded-full px-6 py-3 text-sm font-semibold text-slate-100 shadow-soft"
                href={SG_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-base">Open i88 SG Page</span>
                <span className="text-xs font-medium text-slate-200/70">SG updates and access</span>
              </a>
            </div>
          </div>

          <div className="relative reveal">
            <div className="spotlight glass relative overflow-hidden rounded-[28px] p-8">
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,163,255,0.8)]" />
                  Stadium light streaks • motion lines
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,163,255,0.8)]" />
                  Scoreboard micro UI • clean read
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(0,163,255,0.8)]" />
                  Safe, neutral entry point
                </div>
              </div>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-cyan-300/60 via-cyan-300/10 to-transparent" />
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <span>Signal check</span>
                <span className="text-slate-300">Online</span>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-10 right-8 h-36 w-36 rounded-full border border-cyan-300/30 blur-[1px]" />
          </div>
        </section>

        <section id="trust" className="space-y-6 reveal">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Trust strip</h2>
            <div className="h-px w-40 bg-gradient-to-r from-cyan-300/60 to-transparent" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,163,255,0.7)]" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="track" className="space-y-6 reveal">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">What you’ll find</h2>
            <div className="h-px w-40 bg-gradient-to-r from-cyan-300/60 to-transparent" />
          </div>
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
            <div className="flex flex-wrap gap-6">
              {trackItems.map((item, index) => (
                <div
                  key={item}
                  className="glass relative flex min-w-[160px] items-center gap-3 rounded-full px-5 py-3 text-sm text-slate-200"
                >
                  <span className="text-xs text-cyan-200">0{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="regions" className="space-y-6 reveal">
          <h2 className="text-2xl font-semibold text-white">Region access</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <a
              className="glass magnetic shine group relative flex min-h-[140px] flex-col justify-between rounded-[24px] px-6 py-5 text-slate-200"
              href={MY_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="text-xl font-semibold text-white">🇲🇾 Malaysia</div>
                <p className="mt-2 text-sm text-slate-300">Direct access to MY updates and notes.</p>
              </div>
              <span className="text-sm text-cyan-200">Open i88 MY Page</span>
            </a>
            <a
              className="glass magnetic shine group relative flex min-h-[140px] flex-col justify-between rounded-[24px] px-6 py-5 text-slate-200"
              href={SG_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="text-xl font-semibold text-white">🇸🇬 Singapore</div>
                <p className="mt-2 text-sm text-slate-300">Direct access to SG updates and notes.</p>
              </div>
              <span className="text-sm text-cyan-200">Open i88 SG Page</span>
            </a>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-6 text-xs text-slate-400">
          Please review promo details before joining.
        </footer>
      </main>
    </div>
  );
}
