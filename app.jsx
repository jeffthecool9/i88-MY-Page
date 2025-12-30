import { useEffect } from 'react';

const MY_PAGE_URL = '#';
const SG_PAGE_URL = '#';

const glowBackground = {
  background:
    'radial-gradient(600px circle at 15% 20%, rgba(72, 209, 255, 0.18), transparent 60%), radial-gradient(600px circle at 80% 10%, rgba(50, 110, 255, 0.2), transparent 55%), linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(4, 8, 20, 0.9))',
};

export default function App() {
  useEffect(() => {
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach((button) => {
      const handleMove = (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      };

      const handleLeave = () => {
        button.style.transform = 'translate(0px, 0px)';
      };

      button.addEventListener('mousemove', handleMove);
      button.addEventListener('mouseleave', handleLeave);

      return () => {
        button.removeEventListener('mousemove', handleMove);
        button.removeEventListener('mouseleave', handleLeave);
      };
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] text-slate-100">
      <div className="absolute inset-0 -z-10" style={glowBackground} aria-hidden="true" />
      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#05070d]/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold tracking-[0.4em]">i88</div>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#overview" className="transition hover:text-white">Overview</a>
            <a href="#preview" className="transition hover:text-white">Preview</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-20 pt-16">
        <section id="overview" className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-sm text-slate-400">Layer 2 Access</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Choose your local experience with clarity and confidence.
            </h1>
            <p className="mt-4 max-w-lg text-base text-slate-300">
              This page keeps things transparent. Select your region to see updates tailored to your area.
            </p>
          </div>
          <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_20%_20%,rgba(72,209,255,0.2),transparent_70%)]" />
            <div className="relative space-y-6">
              <h2 className="text-2xl font-semibold">Regional access, explained.</h2>
              <p className="max-w-md text-sm text-slate-300">
                We tailor experiences based on region. Please select your local page to continue.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={MY_PAGE_URL}
                  className="magnetic relative inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-200 px-6 py-3 font-semibold text-slate-950 shadow-[0_18px_40px_rgba(0,163,255,0.3)] transition"
                >
                  <span className="relative">🇲🇾 Explore MY</span>
                </a>
                <a
                  href={SG_PAGE_URL}
                  className="magnetic relative inline-flex items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-200 px-6 py-3 font-semibold text-slate-950 shadow-[0_18px_40px_rgba(0,163,255,0.3)] transition"
                >
                  <span className="relative">🇸🇬 Explore SG</span>
                </a>
              </div>
              <p className="text-xs text-slate-400">No auto-redirects. You decide what to explore next.</p>
              <div className="space-y-2 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(72,209,255,0.6)]" />
                  Clear steps, no surprises
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(72,209,255,0.6)]" />
                  Updates shared regularly
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(72,209,255,0.6)]" />
                  Support always available
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preview" className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold">What you will see on your local page</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            A curated stream of event previews, season highlights, and feature notes — always focused on clarity.
          </p>
          <div className="mt-6 grid gap-3">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0c1428] px-5 py-4 text-sm">
              <strong>Event reminder</strong>
              <span className="text-slate-400">Timing, availability, and access notes</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0c1428] px-5 py-4 text-sm">
              <strong>Seasonal drop</strong>
              <span className="text-slate-400">Limited-time themes and new experiences</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0c1428] px-5 py-4 text-sm">
              <strong>Feature update</strong>
              <span className="text-slate-400">What is new, what has changed, what to expect</span>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold">Why this extra step exists</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            We use this buffer to keep experiences organized and to make sure every visitor reaches the right local details.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#0c1428]/80 p-5">
              <h3 className="text-base font-semibold">Clear flow</h3>
              <p className="mt-2 text-sm text-slate-400">Know exactly where you are going before you continue.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0c1428]/80 p-5">
              <h3 className="text-base font-semibold">Local relevance</h3>
              <p className="mt-2 text-sm text-slate-400">Updates and schedules that match your region and timing.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0c1428]/80 p-5">
              <h3 className="text-base font-semibold">Transparent access</h3>
              <p className="mt-2 text-sm text-slate-400">Preview first, then decide if you want to continue.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <details className="rounded-2xl border border-white/10 bg-[#0c1428]/80 px-5 py-4">
              <summary className="cursor-pointer font-semibold text-white">What is a regional page?</summary>
              <p className="mt-2 text-slate-400">It is a localized update stream with information tailored to your area.</p>
            </details>
            <details className="rounded-2xl border border-white/10 bg-[#0c1428]/80 px-5 py-4">
              <summary className="cursor-pointer font-semibold text-white">Can I explore first?</summary>
              <p className="mt-2 text-slate-400">Yes. You can review the local page and decide if you want to stay.</p>
            </details>
            <details className="rounded-2xl border border-white/10 bg-[#0c1428]/80 px-5 py-4">
              <summary className="cursor-pointer font-semibold text-white">Where do I get updates?</summary>
              <p className="mt-2 text-slate-400">Updates are shared on each regional page in the order they go live.</p>
            </details>
          </div>
        </section>

        <footer className="flex flex-col gap-2 text-xs text-slate-400">
          <div>
            <a href="#" className="text-white">MY Updates</a> · <a href="#" className="text-white">SG Updates</a>
          </div>
          <div>Please review event details before joining.</div>
        </footer>
      </main>
    </div>
  );
}
