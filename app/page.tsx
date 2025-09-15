"use client";
import React, { useMemo, useState } from "react";

/* === Inline SVG logo: orange C + green leaf (variant #1) === */
function CleenLogo({ className = "h-8 w-8 md:h-10 md:w-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="CleenScore logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Leaf */}
      <path
        d="M19 10c7 0 12 5 12 12-7 0-12-5-12-12Z"
        fill="#69C24A"
        transform="rotate(-25 25 16)"
      />
      {/* Orange C (open circle) */}
      <path
        d="M44 10 A22 22 0 1 0 44 54"
        fill="none"
        stroke="#F59E0B" /* tailwind amber-500-ish */
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-white/70 backdrop-blur shadow-sm border border-black/5">
      {children}
    </span>
  );
}

function Band({ color, label, range }: { color: string; label: string; range: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-3 w-12 rounded-full ${color}`} />
      <div className="text-sm">
        <strong>{label}</strong> <span className="text-black/60">{range}</span>
      </div>
    </div>
  );
}

/* Put this small component near the top of the file (above export default) */
function DietCokeMock() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        {/* app header */}
        <div className="flex items-center justify-between text-xs text-black/60">
          <span>CleenScore</span>
          <span>∙ scanning</span>
        </div>

        {/* product block */}
        <div className="mt-2 rounded-2xl border border-black/10 bg-white/90 p-4 shadow">
          <div className="flex items-center gap-3">
            {/* product image placeholder */}
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-neutral-200 to-white border border-black/10 flex items-center justify-center text-lg">
              🥤
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Diet Coke 330ml</div>
              <div className="text-xs text-black/60 truncate">Coca-Cola • Soft drink</div>
            </div>
            {/* score badge */}
            <div className="ml-auto shrink-0 text-right">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="text-sm font-bold text-emerald-700">62</span>
              </div>
              <div className="mt-1 text-[10px] text-emerald-700 font-medium">Better choice</div>
            </div>
          </div>

          {/* risk summary */}
          <div className="mt-3">
            <div className="text-xs font-medium">Risks flagged</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[11px] px-2 py-1">
                Aspartame • moderate
              </span>
              <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[11px] px-2 py-1">
                Phosphoric acid • enamel
              </span>
              <span className="rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[11px] px-2 py-1">
                Caffeine • limit
              </span>
            </div>
          </div>

          {/* ingredients */}
          <div className="mt-3">
            <div className="text-xs font-medium">Ingredients</div>
            <p className="mt-1 text-xs text-black/70 line-clamp-2">
              Carbonated water, colour (caramel E150d), sweeteners (aspartame, acesulfame-K),
              flavourings including caffeine, phosphoric acid, citric acid.
            </p>
          </div>

          {/* alternatives */}
          <div className="mt-3">
            <div className="text-xs font-medium">Cleaner alternatives</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-black/10 bg-emerald-50 p-2 text-center">
                <div className="text-lg">🥤</div>
                <div className="mt-1 text-[11px] font-medium">Coke Zero</div>
                <div className="text-[10px] text-emerald-700 font-semibold">68</div>
              </div>
              <div className="rounded-xl border border-black/10 bg-emerald-50 p-2 text-center">
                <div className="text-lg">💧</div>
                <div className="mt-1 text-[11px] font-medium">Sparkling</div>
                <div className="text-[10px] text-emerald-700 font-semibold">92</div>
              </div>
              <div className="rounded-xl border border-black/10 bg-emerald-50 p-2 text-center">
                <div className="text-lg">🍋</div>
                <div className="mt-1 text-[11px] font-medium">Lemonade</div>
                <div className="text-[10px] text-emerald-700 font-semibold">74</div>
              </div>
            </div>
          </div>
        </div>

        {/* tiny legend */}
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-black/60">
          <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
          <span>Not Cleen</span>
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400 ml-2" />
          <span>Almost</span>
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 ml-2" />
          <span>Better</span>
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-700 ml-2" />
          <span>Super</span>
        </div>
      </div>
    </div>
  );
}


export default function Page() {
  // form state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [referral, setReferral] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { ok: boolean; message: string }>(null);

  // modals
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // UTM capture
  const utm = useMemo(() => {
    if (typeof window === "undefined") return {} as Record<string, string>;
    const p = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const o: Record<string, string> = {};
    keys.forEach(k => p.get(k) && (o[k] = p.get(k)!));
    return o;
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitted({ ok: false, message: "Please enter a valid email." });
      return;
    }
    if (!consent) {
      setSubmitted({ ok: false, message: "Please tick the consent box to join the waitlist." });
      return;
    }
    setSubmitting(true);
    setSubmitted(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          full_name: name,
          country,
          referral_code: referral,
          consent,
          utm_source: utm.utm_source || "",
          utm_medium: utm.utm_medium || "",
          utm_campaign: utm.utm_campaign || "",
          utm_content: utm.utm_content || "",
          utm_term: utm.utm_term || "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Submit failed");
      setSubmitted({ ok: true, message: "You're on the list! Check your inbox." });
      setEmail(""); setName(""); setCountry(""); setReferral(""); setConsent(false);
    } catch {
      setSubmitted({ ok: false, message: "Couldn't save your signup. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const Modal = ({ title, onClose, children }: any) => (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/50" />
      <div className="relative w-full md:max-w-xl rounded-t-2xl md:rounded-2xl bg-white shadow-2xl p-5 md:p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-black/60 hover:text-black"
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-base md:text-lg font-bold pr-8">{title}</h3>
        <div className="mt-3 md:mt-4 text-sm text-black/70 space-y-3 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-zinc-900">
      {/* Header with BIG brand */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 md:gap-3">
            <CleenLogo />
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">CleenScore</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:opacity-70">How it works</a>
            <a href="#features" className="hover:opacity-70">Features</a>
            <a href="#bands" className="hover:opacity-70">Score bands</a>
            <a href="#waitlist" className="hover:opacity-70 font-medium">Join</a>
          </nav>
        </div>
      </header>

      {/* Sticky CTA on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 border-t border-black/10 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <a href="#waitlist" className="block w-full text-center rounded-xl px-4 py-3 font-medium bg-emerald-600 text-white">
            Join the waitlist
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-20 md:pt-12 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <Pill>Coming soon</Pill>
            <h1 className="mt-3 text-3xl leading-tight md:text-6xl md:leading-[1.1] font-extrabold">
              Scan smarter. <span className="text-emerald-700">Choose cleaner.</span>
            </h1>
            <p className="mt-3 md:mt-4 text-sm md:text-lg text-black/70">
              CleenScore shows what is inside your food, cosmetics and pet food. Scan a barcode to get a 0–100 score, risk highlights, and cleaner alternatives.
            </p>
            <ul className="mt-4 md:mt-6 space-y-1.5 md:space-y-2 text-sm">
              <li>• Works with food, cosmetics and pet food</li>
              <li>• Evidence-backed risk summaries</li>
              <li>• Personal CleenRoutine tracking</li>
            </ul>
          </div>
          <div>
            <div className="rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-black/5 bg-white p-4 md:p-6">
              <div className="aspect-[9/19.5] w-full max-w-sm mx-auto rounded-[1.5rem] md:rounded-[2rem] border border-black/10 bg-gradient-to-b from-emerald-100 to-white flex items-center justify-center">
                <div className="text-center p-6">
                <DietCokeMock />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <h2 className="text-xl md:text-3xl font-bold">How it works</h2>
        <div className="mt-5 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { title: "Scan", desc: "Scan any barcode or search by name." },
            { title: "Analyze", desc: "We fetch ingredients and studies to score 0–100." },
            { title: "Improve", desc: "See risks and cleaner recommendations." },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4 md:p-5 bg-white border border-black/5 shadow-sm">
              <div className="text-emerald-700 font-semibold">{s.title}</div>
              <p className="mt-1.5 text-sm text-black/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <h2 className="text-xl md:text-3xl font-bold">Why CleenScore</h2>
        <div className="mt-5 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            ["Evidence-backed scoring", "Plain-English risk notes and references."],
            ["Track your CleenRoutine", "See your personal CleenScore over time."],
            ["Smart alternatives", "Cleaner products that match your budget."],
            ["Fair pricing", "From £1.49 / $1.49 / €1.49 / ₹59 per month. Free tier available."],
          ].map(([h, p], i) => (
            <div key={i} className="rounded-2xl p-4 md:p-6 bg-white border border-black/5 shadow-sm">
              <h3 className="font-semibold">{h}</h3>
              <p className="mt-1.5 text-sm text-black/70">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Score bands (you can swap labels later) */}
      <section id="bands" className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <h2 className="text-xl md:text-3xl font-bold">Score bands</h2>
        <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <Band color="bg-emerald-700" label="Excellent" range="76–100" />
          <Band color="bg-emerald-500" label="Good" range="51–75" />
          <Band color="bg-amber-400" label="Poor" range="21–50" />
          <Band color="bg-red-400" label="Bad" range="0–20" />
        </div>
      </section>

      {/* Waitlist form */}
      <section id="waitlist" className="mx-auto max-w-6xl px-4 pb-28 md:pb-16">
        <div className="rounded-2xl md:rounded-3xl bg-white border border-black/5 shadow-lg p-4 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Join the waitlist</h2>
              <p className="mt-2 text-sm text-black/70">Get early access, shape the roadmap, and claim founder perks when we launch.</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                <li>• Early access invite</li>
                <li>• Chance to be a beta tester</li>
                <li>• Special founder pricing</li>
              </ul>
            </div>
            <div>
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Full name</label>
                  <input id="name" value={name} onChange={e=>setName(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email *</label>
                  <input id="email" required type="email" value={email} onChange={e=>setEmail(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                  <input id="country" value={country} onChange={e=>setCountry(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="United Kingdom" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="ref">Referral code (optional)</label>
                  <input id="ref" value={referral} onChange={e=>setReferral(e.target.value)}
                    className="w-full rounded-xl border border-black/10 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g., FRIEND123" />
                </div>
                <label className="flex items-start gap-3 text-sm select-none">
                  <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 h-4 w-4" />
                  <span>
                    I agree to receive early-access updates about CleenScore and accept the{" "}
                    <button type="button" onClick={() => setShowPrivacy(true)} className="underline">privacy policy</button>.
                  </span>
                </label>
                <button disabled={submitting}
                  className="mt-1 inline-flex justify-center rounded-xl px-4 py-3 font-medium bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
                  {submitting ? "Adding you…" : "Join the waitlist"}
                </button>
                {submitted && (
                  <p className={`text-sm ${submitted.ok ? "text-emerald-700" : "text-red-600"}`}>{submitted.message}</p>
                )}
                <p className="text-xs text-black/50">We use your email only for launch updates. Unsubscribe anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with logo */}
      <footer className="border-t border-black/5 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <CleenLogo className="h-6 w-6 md:h-7 md:w-7" />
            <span className="font-semibold">CleenScore</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setShowPrivacy(true)} className="hover:opacity-70 underline">Privacy</button>
            <button onClick={() => setShowTerms(true)} className="hover:opacity-70 underline">Terms</button>
            <span className="text-black/50">© {new Date().getFullYear()} AddsArt Ltd — CleenScore is a trading name</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPrivacy && (
        <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
          <p><strong>Who we are.</strong> CleenScore is a trading name of <strong>AddsArt Ltd</strong>, United Kingdom.</p>
          <p><strong>What we collect.</strong> Email plus optional name, country, referral code, and UTM data to provide early-access updates.</p>
          <p><strong>How we use it.</strong> Stored securely; never sold. Unsubscribe anytime via email footer link or support@cleenscore.com.</p>
          <p><strong>Legal basis.</strong> Consent. You may withdraw consent at any time.</p>
          <p><strong>Your rights (UK/EU).</strong> Access, correction, deletion, restriction. Contact support@cleenscore.com.</p>
        </Modal>
      )}
      {showTerms && (
        <Modal title="Terms & Conditions" onClose={() => setShowTerms(false)}>
          <p><strong>Waitlist.</strong> Joining allows us to email you about early access. Access is discretionary and limited.</p>
          <p><strong>No medical advice.</strong> Informational scores only; not medical or dietary advice.</p>
          <p><strong>Ownership.</strong> © {new Date().getFullYear()} AddsArt Ltd. CleenScore is a trading name of AddsArt Ltd.</p>
          <p><strong>Governing law.</strong> United Kingdom.</p>
        </Modal>
      )}
    </div>
  );
}
