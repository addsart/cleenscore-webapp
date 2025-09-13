"use client";
import React, { useMemo, useState } from "react";

/** Replace this with your Formspree endpoint to receive submissions */
const FORM_ENDPOINT = "https://formspree.io/f/your-id";

function LeafIcon() {
  return <span aria-hidden className="inline-block align-[-2px]">🍃</span>;
}
function CloseIcon() {
  return <span aria-hidden>×</span>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/70 backdrop-blur shadow-sm border border-black/5">
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

export default function Page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [consent, setConsent] = useState(false);
  const [referral, setReferral] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { ok: boolean; message: string }>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const utm = useMemo(() => {
    if (typeof window === "undefined") return {} as Record<string, string>;
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const obj: Record<string, string> = {};
    keys.forEach(k => {
      const v = params.get(k) || "";
      if (v) obj[k] = v;
    });
    return obj;
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
  
    // Pull UTM values from your existing memo (rename keys for the API)
    const payload = {
      email,
      full_name: name,
      country,
      referral_code: referral,
      consent,
      utm_source: utm["utm_source"] || "",
      utm_medium: utm["utm_medium"] || "",
      utm_campaign: utm["utm_campaign"] || "",
      utm_content: utm["utm_content"] || "",
      utm_term: utm["utm_term"] || "",
    };
  
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Submit failed");
      setSubmitted({ ok: true, message: "You're on the list! Check your inbox." });
      setEmail(""); setName(""); setCountry(""); setReferral(""); setConsent(false);
    } catch (err) {
      setSubmitted({ ok: false, message: "Couldn't save your signup. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }
  

  const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-black/60 hover:text-black" aria-label="Close">
          <CloseIcon />
        </button>
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="text-sm text-black/70 space-y-3 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LeafIcon />
            <span className="font-semibold">CleenScore</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:opacity-70">How it works</a>
            <a href="#features" className="hover:opacity-70">Features</a>
            <a href="#bands" className="hover:opacity-70">Score bands</a>
            <a href="#waitlist" className="hover:opacity-70 font-medium">Join waitlist</a>
          </nav>
          <a href="#waitlist" className="md:inline-flex hidden rounded-full px-4 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow">
            Get early access
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Pill>Coming soon</Pill>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Scan smarter. <span className="text-emerald-700">Choose cleaner.</span>
          </h1>
          <p className="mt-4 text-lg text-black/70 max-w-prose">
            CleenScore shows what’s really inside your food & cosmetics. Scan a barcode to get a
            0–100 score, risk highlights, and healthier alternatives—instantly.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>• Works with food, cosmetics & dental</li>
            <li>• Evidence-backed risk summaries</li>
            <li>• Personal CleenRoutine tracking</li>
          </ul>
          <div className="mt-8">
            <a href="#waitlist" className="inline-flex items-center rounded-full px-6 py-3 text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg">
              Join the waitlist
            </a>
          </div>
          <p className="mt-3 text-xs text-black/60">No spam. We’ll email only when we launch and for early-access invites.</p>
        </div>
        <div className="rounded-3xl shadow-2xl border border-black/5 bg-white p-6">
          <div className="aspect-[9/19.5] w-full max-w-sm mx-auto rounded-[2rem] border border-black/10 bg-gradient-to-b from-emerald-100 to-white flex items-center justify-center">
            <div className="text-center p-6">
              <div className="mx-auto text-4xl">📷</div>
              <p className="mt-4 font-semibold">Barcode scanner preview</p>
              <p className="text-sm text-black/60">Point at a product to see score, risks & alternatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { title: "Scan", desc: "Scan any barcode or search by name." },
            { title: "Analyze", desc: "We fetch ingredients & studies to score 0–100." },
            { title: "Improve", desc: "See risks and get cleaner recommendations." },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white border border-black/5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700"><strong>{s.title}</strong></div>
              <p className="mt-2 text-sm text-black/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Why CleenScore</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-white border border-black/5 shadow-sm">
            <h3 className="font-semibold">Evidence-backed scoring</h3>
            <p className="mt-2 text-sm text-black/70">Every score comes with plain-English risk notes and references.</p>
          </div>
          <div className="rounded-2xl p-6 bg-white border border-black/5 shadow-sm">
            <h3 className="font-semibold">Track your CleenRoutine</h3>
            <p className="mt-2 text-sm text-black/70">Log what you actually use to see your personal CleenScore.</p>
          </div>
          <div className="rounded-2xl p-6 bg-white border border-black/5 shadow-sm">
            <h3 className="font-semibold">Smart alternatives</h3>
            <p className="mt-2 text-sm text-black/70">Recommendations that match your budget.</p>
          </div>
          <div className="rounded-2xl p-6 bg-white border border-black/5 shadow-sm">
            <h3 className="font-semibold">Fair pricing</h3>
            <p className="mt-2 text-sm text-black/70">From £1.49 / $1.49 / €1.49 / ₹59 per month. Free tier available.</p>
          </div>
        </div>
      </section>

      {/* Score bands */}
      <section id="bands" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Score bands</h2>
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          <Band color="bg-emerald-700" label="Excellent" range="76–100" />
          <Band color="bg-emerald-500" label="Good" range="51–75" />
          <Band color="bg-amber-400" label="Poor" range="21–50" />
          <Band color="bg-red-400" label="Bad" range="0–20" />
        </div>
      </section>

      {/* Waitlist form */}
      <section id="waitlist" className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-white border border-black/5 shadow-lg p-6 md:p-10">
          <div className="md:flex items-start gap-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold">Join the waitlist</h2>
              <p className="mt-2 text-sm text-black/70">Get early access, shape the roadmap, and claim founder perks when we launch.</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Early access invite</li>
                <li>• Chance to be a beta tester</li>
                <li>• Special founder pricing</li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Full name</label>
                  <input id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Doe" className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email *</label>
                  <input id="email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                  <input id="country" value={country} onChange={e=>setCountry(e.target.value)} placeholder="United Kingdom" className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="ref">Referral code (optional)</label>
                  <input id="ref" value={referral} onChange={e=>setReferral(e.target.value)} placeholder="e.g., FRIEND123" className="w-full rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <label className="flex items-start gap-3 text-sm select-none cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1" />
                  <span>
                    I agree to receive early‑access updates about CleenScore and accept the{" "}
                    <button type="button" onClick={() => setShowPrivacy(true)} className="underline">privacy policy</button>.
                  </span>
                </label>
                <button disabled={submitting} className="mt-2 inline-flex justify-center rounded-xl px-4 py-3 font-medium bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60">
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

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LeafIcon />
            <span className="font-semibold">CleenScore</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setShowPrivacy(true)} className="hover:opacity-70 underline">Privacy</button>
            <button onClick={() => setShowTerms(true)} className="hover:opacity-70 underline">Terms</button>
            <span className="text-black/50">© {new Date().getFullYear()} AddsArt Ltd — CleenScore is a trading name</span>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacy && (
        <Modal title="Privacy Policy" onClose={() => setShowPrivacy(false)}>
          <p><strong>Who we are.</strong> CleenScore is a trading name of <strong>AddsArt Ltd</strong>, a company registered in the United Kingdom.</p>
          <p><strong>What we collect.</strong> Email plus optional name, country, referral code, and UTM data to provide early-access updates.</p>
          <p><strong>How we use it.</strong> Stored securely; never sold. Unsubscribe anytime via any email footer link or support@cleenscore.com.</p>
          <p><strong>Legal basis.</strong> Consent. You may withdraw consent at any time.</p>
          <p><strong>Your rights (UK/EU).</strong> Access, correction, deletion, restriction. Contact support@cleenscore.com.</p>
        </Modal>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <Modal title="Terms & Conditions" onClose={() => setShowTerms(false)}>
          <p><strong>Beta / Waitlist.</strong> Joining the waitlist allows us to email you about early access. Access is discretionary and limited.</p>
          <p><strong>No medical advice.</strong> CleenScore provides informational scores only and is not medical or dietary advice.</p>
          <p><strong>Ownership.</strong> © {new Date().getFullYear()} AddsArt Ltd. CleenScore is a trading name of AddsArt Ltd.</p>
          <p><strong>Privacy.</strong> See the Privacy Policy for how we handle personal data.</p>
          <p><strong>Governing law.</strong> United Kingdom.</p>
        </Modal>
      )}
    </div>
  );
}
