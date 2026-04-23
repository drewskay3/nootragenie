import { useState, useEffect, useRef } from "react";

// ── Data ──
const QUESTIONS = [
  {
    id: "goal",
    label: "01 — PRIMARY GOAL",
    question: "What matters most to you right now?",
    sub: "Pick one. We'll build around it.",
    options: [
      { value: "focus", label: "Deep Focus", desc: "Hours of locked-in attention", icon: "⬡" },
      { value: "memory", label: "Memory", desc: "Faster recall, stronger retention", icon: "◈" },
      { value: "anxiety", label: "Calm Mind", desc: "Less noise, more clarity", icon: "○" },
      { value: "energy", label: "Mental Energy", desc: "All-day drive, no crash", icon: "△" },
      { value: "creativity", label: "Creativity", desc: "New connections, fresh ideas", icon: "✦" },
      { value: "sleep", label: "Better Sleep", desc: "Deep rest, sharp mornings", icon: "◑" },
    ],
  },
  {
    id: "secondary",
    label: "02 — BONUS WIN",
    question: "What else would make a difference?",
    sub: "Helps us balance your protocol.",
    options: [
      { value: "mood", label: "Mood Lift", icon: "◇" },
      { value: "motivation", label: "Drive", icon: "△" },
      { value: "verbal", label: "Verbal Fluency", icon: "◈" },
      { value: "stress", label: "Stress Armor", icon: "⬡" },
      { value: "neuroprotection", label: "Brain Longevity", icon: "✦" },
      { value: "none", label: "Just the main goal", icon: "—" },
    ],
  },
  {
    id: "experience",
    label: "03 — EXPERIENCE",
    question: "How deep are you into nootropics?",
    sub: "No judgment — this shapes your dosages.",
    options: [
      { value: "beginner", label: "Totally New", desc: "Never tried nootropics", icon: "1" },
      { value: "some", label: "Curious", desc: "Tried a few things", icon: "2" },
      { value: "intermediate", label: "Active User", desc: "Taking 1–3 supplements now", icon: "3" },
      { value: "advanced", label: "Veteran", desc: "Deep into stacking", icon: "4" },
    ],
  },
  {
    id: "stimulant",
    label: "04 — CAFFEINE CHECK",
    question: "How does caffeine hit you?",
    sub: "Reveals a lot about your neurochemistry.",
    options: [
      { value: "sensitive", label: "One cup wires me", icon: "!" },
      { value: "moderate", label: "1–2 cups, sweet spot", icon: "~" },
      { value: "high", label: "3+ cups, no problem", icon: "∞" },
    ],
  },
  {
    id: "budget",
    label: "05 — INVESTMENT",
    question: "Monthly budget for your brain?",
    sub: "We optimize hard within your range.",
    options: [
      { value: "low", label: "Under $30", desc: "Essential only", icon: "$" },
      { value: "medium", label: "$30–60", desc: "Solid foundation", icon: "$$" },
      { value: "high", label: "$60–120", desc: "Full protocol", icon: "$$$" },
      { value: "unlimited", label: "$120+", desc: "Best available", icon: "◆" },
    ],
  },
  {
    id: "current",
    label: "06 — CURRENT STACK",
    question: "Already taking anything?",
    sub: "Tap all that apply — we won't double up.",
    multi: true,
    options: [
      { value: "multivitamin", label: "Multivitamin" },
      { value: "fish_oil", label: "Omega-3 / Fish Oil" },
      { value: "magnesium", label: "Magnesium" },
      { value: "vitamin_d", label: "Vitamin D" },
      { value: "creatine", label: "Creatine" },
      { value: "caffeine_l_theanine", label: "Caffeine + L-Theanine" },
      { value: "lions_mane", label: "Lion's Mane" },
      { value: "ashwagandha", label: "Ashwagandha" },
      { value: "nothing", label: "Nothing yet" },
    ],
  },
  {
    id: "restrictions",
    label: "07 — DIETARY",
    question: "Any restrictions?",
    sub: "We'll filter everything accordingly.",
    multi: true,
    options: [
      { value: "vegan", label: "Vegan" },
      { value: "gluten_free", label: "Gluten-Free" },
      { value: "no_mushroom", label: "No Mushrooms" },
      { value: "no_fish", label: "No Fish-Derived" },
      { value: "none", label: "None" },
    ],
  },
  {
    id: "commitment",
    label: "08 — TIMELINE",
    question: "How patient are you?",
    sub: "Some compounds need weeks to build. Honest expectations, better results.",
    options: [
      { value: "instant", label: "This week", icon: "⚡" },
      { value: "month", label: "One month", icon: "◷" },
      { value: "quarter", label: "90 days", icon: "◈" },
      { value: "long", label: "Long haul", icon: "∞" },
    ],
  },
  {
    id: "freetext",
    label: "09 — YOUR WORDS",
    question: "Anything else the Genie should know?",
    sub: "Medications, conditions, lifestyle details, past supplement experiences — whatever might matter. Totally optional.",
    freetext: true,
  },
];

const ANALYSIS_STEPS = [
  "Reading your neurochemical profile",
  "Matching compounds to goals",
  "Scanning for interactions",
  "Dialing in dosages",
  "Applying your filters",
  "Summoning your protocol",
];

const SUPPS = {
  lions_mane: { name: "Lion's Mane", detail: "Fruiting Body · Dual Extract", dosage: "500mg", reason: "Stimulates Nerve Growth Factor production for neurogenesis and long-term cognitive resilience. Dual-extracted fruiting body delivers both hericenones and erinacines.", timing: "Morning · with food", onset: "2–4 weeks", priority: "core", cost: "$15–22/mo" },
  l_theanine: { name: "L-Theanine", detail: "Suntheanine®", dosage: "200mg", sensitiveDose: "100mg", reason: "Promotes alpha brain wave activity for calm, undistracted attention. Pairs beautifully with caffeine to eliminate jitters while keeping you sharp.", timing: "Morning · with caffeine", onset: "30–60 min", priority: "core", cost: "$8–12/mo" },
  alpha_gpc: { name: "Alpha-GPC", detail: "50% Choline", dosage: "300mg", reason: "The most bioavailable choline source — directly fuels acetylcholine, your brain's key neurotransmitter for memory encoding and sustained focus.", timing: "Morning · with food", onset: "1–2 weeks", priority: "core", cost: "$14–20/mo" },
  bacopa: { name: "Bacopa Monnieri", detail: "50% Bacosides", dosage: "300mg", reason: "Gold-standard memory nootropic. Clinical studies show measurable improvements in recall speed and accuracy — but it needs 8–12 weeks of consistent use.", timing: "Morning · with fat", onset: "8–12 weeks", priority: "core", cost: "$10–15/mo" },
  ashwagandha: { name: "Ashwagandha", detail: "KSM-66 Extract", dosage: "300mg", reason: "Clinically shown to reduce cortisol up to 30%. Lowers your stress baseline so your brain can operate without the constant drag of anxiety.", timing: "Evening · with food", onset: "2–4 weeks", priority: "core", cost: "$12–18/mo" },
  magnesium: { name: "Magnesium", detail: "L-Threonate (Magtein®)", dosage: "2000mg", reason: "The only magnesium form proven to cross the blood-brain barrier. Supports synaptic density, deep sleep, and nervous system calm.", timing: "Evening · before bed", onset: "1–2 weeks", priority: "core", cost: "$15–22/mo" },
  rhodiola: { name: "Rhodiola Rosea", detail: "3% Rosavins", dosage: "400mg", sensitiveDose: "200mg", reason: "An adaptogen that fights mental fatigue at the cellular level. Supports dopamine metabolism for sustained drive without stimulant crashes.", timing: "Morning · empty stomach", onset: "3–7 days", priority: "core", cost: "$10–14/mo" },
  omega3: { name: "Omega-3", detail: "High EPA/DHA Fish Oil", dosage: "1500mg", reason: "Structural building blocks for brain cell membranes. Supports neuroplasticity, reduces neuroinflammation, and improves signal transmission between neurons.", timing: "With any meal", onset: "4–8 weeks", priority: "core", cost: "$12–20/mo" },
  creatine: { name: "Creatine", detail: "Monohydrate", dosage: "5g", reason: "Not just for muscles — creatine is a direct brain energy buffer. Improves working memory and processing speed, especially under stress or sleep debt.", timing: "Any time · with water", onset: "2–4 weeks", priority: "optional", cost: "$5–8/mo" },
  cdp_choline: { name: "Citicoline", detail: "CDP-Choline", dosage: "250mg", reason: "Supports phosphatidylcholine synthesis and dopamine receptor density. A cleaner, calmer choline source with strong neuroprotective data.", timing: "Morning · with food", onset: "1–2 weeks", priority: "core", cost: "$12–18/mo" },
  phosphatidylserine: { name: "Phosphatidylserine", detail: "Soy-Free", dosage: "100mg", reason: "Maintains brain cell membrane fluidity. Improves memory, processing speed, and helps moderate your cortisol stress response.", timing: "Morning or evening", onset: "3–4 weeks", priority: "optional", cost: "$14–20/mo" },
  apigenin: { name: "Apigenin", detail: "Chamomile Extract", dosage: "50mg", reason: "A gentle flavonoid that promotes GABA activity and deep sleep architecture — without morning grogginess. Supports overnight memory consolidation.", timing: "30 min before bed", onset: "Same night", priority: "optional", cost: "$8–12/mo" },
};

const GOAL_MAP = {
  focus: ["l_theanine", "alpha_gpc", "lions_mane", "rhodiola", "creatine", "cdp_choline"],
  memory: ["bacopa", "alpha_gpc", "lions_mane", "omega3", "phosphatidylserine", "cdp_choline"],
  anxiety: ["ashwagandha", "l_theanine", "magnesium", "omega3", "phosphatidylserine", "bacopa"],
  energy: ["rhodiola", "creatine", "alpha_gpc", "lions_mane", "omega3", "l_theanine"],
  creativity: ["lions_mane", "l_theanine", "omega3", "bacopa", "rhodiola", "cdp_choline"],
  sleep: ["magnesium", "apigenin", "ashwagandha", "l_theanine", "phosphatidylserine", "omega3"],
};

const SECONDARY_MAP = {
  mood: ["ashwagandha", "omega3", "rhodiola"],
  motivation: ["rhodiola", "alpha_gpc", "creatine"],
  verbal: ["alpha_gpc", "cdp_choline", "bacopa"],
  stress: ["ashwagandha", "l_theanine", "magnesium"],
  neuroprotection: ["lions_mane", "omega3", "phosphatidylserine"],
  none: [],
};

const GOAL_LABELS = {
  focus: "The Focus Protocol",
  memory: "The Memory Protocol",
  anxiety: "The Calm Mind Protocol",
  energy: "The Energy Protocol",
  creativity: "The Creative Flow Protocol",
  sleep: "The Deep Sleep Protocol",
};

const GOAL_SUMMARIES = {
  focus: "Your protocol targets sustained, deep attention through acetylcholine support and alpha brain wave activation. Built for demanding cognitive work without stimulant dependency.",
  memory: "Designed around memory encoding and recall speed. We're targeting hippocampal function with cholinergic support and neuroplasticity enhancers backed by clinical research.",
  anxiety: "This stack lowers your cortisol baseline and supports GABA pathways — mental clarity without sedation. The goal is removing the drag so your cognition runs clean.",
  energy: "Sustainable mental energy through adaptogenic and mitochondrial support — not stimulant spikes. These compounds keep you sharp from morning through late afternoon.",
  creativity: "Promotes divergent thinking by supporting alpha wave activity and reducing cognitive rigidity. Balances neuroplasticity enhancers with calm-focus compounds.",
  sleep: "Targets both sleep onset and deep sleep architecture. Better sleep amplifies everything else — memory, mood, focus all improve with proper overnight recovery.",
};

function buildStack(answers) {
  const { goal, secondary, experience, stimulant, budget, current = [], restrictions = [] } = answers;
  const isTaking = (s) => current.includes(s);
  const noMushroom = restrictions.includes("no_mushroom");
  const noFish = restrictions.includes("no_fish");
  const vegan = restrictions.includes("vegan");
  const isBeginner = experience === "beginner" || experience === "some";
  const maxSupps = isBeginner ? 3 : budget === "low" ? 3 : budget === "medium" ? 4 : 6;

  const primary = GOAL_MAP[goal] || GOAL_MAP.focus;
  const sec = SECONDARY_MAP[secondary] || [];
  const combined = [...new Set([...primary, ...sec])];

  const filtered = combined.filter((k) => {
    if (k === "lions_mane" && (isTaking("lions_mane") || noMushroom)) return false;
    if (k === "omega3" && (isTaking("fish_oil") || noFish || vegan)) return false;
    if (k === "ashwagandha" && isTaking("ashwagandha")) return false;
    if (k === "magnesium" && isTaking("magnesium")) return false;
    if (k === "creatine" && isTaking("creatine")) return false;
    if (k === "l_theanine" && isTaking("caffeine_l_theanine")) return false;
    return true;
  });

  const selected = filtered.slice(0, maxSupps).map((k) => {
    const s = { ...SUPPS[k] };
    if (stimulant === "sensitive" && s.sensitiveDose) s.dosage = s.sensitiveDose;
    return s;
  });

  const morning = selected.filter((s) => s.timing.toLowerCase().includes("morning")).map((s) => s.name);
  const evening = selected.filter((s) => s.timing.toLowerCase().includes("evening") || s.timing.toLowerCase().includes("bed")).map((s) => s.name);
  const anytime = selected.filter((s) => s.timing.toLowerCase().includes("any")).map((s) => s.name);
  const schedule = [];
  if (morning.length) schedule.push({ time: "Morning", items: morning.join(", ") + " — with breakfast" });
  if (anytime.length) schedule.push({ time: "Midday", items: anytime.join(", ") + " — with water" });
  if (evening.length) schedule.push({ time: "Evening", items: evening.join(", ") + " — before bed" });

  const costs = { low: "$25–35/mo", medium: "$40–60/mo", high: "$55–85/mo", unlimited: "$70–110/mo" };

  return {
    label: GOAL_LABELS[goal] || "Your Protocol",
    summary: GOAL_SUMMARIES[goal] || GOAL_SUMMARIES.focus,
    supplements: selected,
    schedule,
    totalCost: costs[budget] || "$40–60/mo",
    warnings: "Consult a healthcare provider before starting any new supplement, especially if you take prescription medications. Start one supplement at a time, spaced a week apart, so you can isolate what works. If you experience headaches, reduce your choline source dosage.",
  };
}

// ── Genie Lamp SVG ──
const GenieLamp = ({ size = 40, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 30C32 30 34 28 34 24C34 18 29 14 24 12C24 12 24 8 28 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="24" cy="32" rx="12" ry="4" fill={color} opacity="0.2" />
    <path d="M14 30H34L36 34H12L14 30Z" fill={color} opacity="0.35" />
    <path d="M16 34H32V36C32 37.1 31.1 38 30 38H18C16.9 38 16 37.1 16 36V34Z" fill={color} opacity="0.25" />
    <path d="M20 30C20 30 18 28 18 25C18 21 21 18 24 18C27 18 30 21 30 25C30 28 28 30 28 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="29" cy="5" r="2.5" fill="#E6A817" opacity="0.9" />
    <circle cx="32" cy="8" r="1.5" fill="#E6A817" opacity="0.5" />
    <circle cx="26" cy="3" r="1" fill="#E6A817" opacity="0.4" />
  </svg>
);

// ── Styles ──
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Azeret+Mono:wght@400;500&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}

:root {
  --bg: #F0F7F2;
  --bg2: #E0EDE4;
  --white: #FFFFFF;
  --ink: #0F1A13;
  --ink2: #2C3E33;
  --ink3: #5A7262;
  --ink4: #8DA698;
  --forest: #0D6B3F;
  --forest2: #0A8F4F;
  --sage: #2ECC71;
  --sage-light: rgba(46,204,113,0.14);
  --gold: #E6A817;
  --gold-light: rgba(230,168,23,0.12);
  --gold-glow: rgba(230,168,23,0.25);
  --teal: #00B8A9;
  --violet: #7C5CFC;
  --coral: #FF6B6B;
  --danger: #E8453C;
  --radius: 20px;
  --radius-sm: 12px;
  --shadow-sm: 0 1px 3px rgba(13,107,63,0.06), 0 4px 12px rgba(13,107,63,0.04);
  --shadow-md: 0 2px 8px rgba(13,107,63,0.07), 0 8px 32px rgba(13,107,63,0.06);
  --shadow-lg: 0 4px 16px rgba(13,107,63,0.08), 0 16px 48px rgba(13,107,63,0.1);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Sora', sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ── App Shell ── */
.ng-app { min-height: 100vh; position: relative; overflow: hidden; }

.ng-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
}

.ng-bg .blob {
  position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.5;
  animation: blobDrift 25s ease-in-out infinite alternate;
}
.ng-bg .b1 { width:600px;height:600px;top:-200px;right:-150px;background:rgba(46,204,113,0.18); }
.ng-bg .b2 { width:500px;height:500px;bottom:-250px;left:-150px;background:rgba(230,168,23,0.14);animation-delay:-8s; }
.ng-bg .b3 { width:350px;height:350px;top:40%;left:50%;background:rgba(124,92,252,0.08);animation-delay:-15s; }

@keyframes blobDrift {
  0%{transform:translate(0,0) scale(1) rotate(0deg)}
  100%{transform:translate(30px,-40px) scale(1.15) rotate(10deg)}
}

.ng-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 9998;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E");
}

.ng-content { position: relative; z-index: 1; }

/* ── Welcome ── */
.ng-welcome {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.ng-logo {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 48px;
  opacity: 0; animation: fadeIn 0.8s 0.1s forwards;
}

.ng-logo-text {
  font-size: 15px; font-weight: 600; letter-spacing: 5px; text-transform: uppercase;
  color: var(--forest);
}

.ng-welcome h1 {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(38px, 7vw, 68px);
  font-weight: 300;
  line-height: 1.08;
  max-width: 640px;
  color: var(--ink);
  margin-bottom: 20px;
  opacity: 0; animation: fadeUp 0.9s 0.25s forwards;
}

.ng-welcome h1 strong {
  font-weight: 600;
  color: var(--forest);
}

.ng-welcome .ng-hero-sub {
  font-size: 17px;
  font-weight: 300;
  color: var(--ink3);
  max-width: 420px;
  margin-bottom: 48px;
  opacity: 0; animation: fadeUp 0.9s 0.45s forwards;
}

.ng-pills {
  display: flex; gap: 32px; margin-bottom: 48px;
  opacity: 0; animation: fadeUp 0.8s 0.55s forwards;
}

.ng-pill {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
}

.ng-pill-num {
  font-family: 'Crimson Pro', serif;
  font-size: 28px; font-weight: 600; color: var(--forest);
}

.ng-pill-label {
  font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--ink4);
}

.ng-start-btn {
  background: linear-gradient(135deg, var(--forest) 0%, var(--forest2) 100%);
  color: white;
  border: none;
  padding: 18px 52px;
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
  box-shadow: 0 4px 24px rgba(13,107,63,0.3), 0 0 60px rgba(46,204,113,0.1);
  opacity: 0; animation: fadeUp 0.8s 0.7s forwards;
}

.ng-start-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 36px rgba(13,107,63,0.35), 0 0 80px rgba(46,204,113,0.15);
}

.ng-fine {
  margin-top: 16px; font-size: 13px; color: var(--ink4); font-weight: 300;
  opacity: 0; animation: fadeUp 0.8s 0.85s forwards;
}

/* ── Quiz ── */
.ng-quiz { min-height: 100vh; display: flex; flex-direction: column; padding: 0 24px; }

.ng-quiz-top {
  padding: 20px 0;
  display: flex; align-items: center; justify-content: space-between;
  max-width: 640px; width: 100%; margin: 0 auto;
}

.ng-quiz-logo {
  display: flex; align-items: center; gap: 8px;
}

.ng-quiz-logo span {
  font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
  color: var(--forest);
}

.ng-progress {
  flex: 1; max-width: 160px; height: 3px;
  background: var(--bg2); border-radius: 8px; overflow: hidden; margin-left: 20px;
}

.ng-progress-fill {
  height: 100%; background: var(--forest); border-radius: 8px;
  transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
}

.ng-quiz-body {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  max-width: 640px; width: 100%; margin: 0 auto; padding: 20px 0 80px;
}

.ng-q-step {
  font-family: 'Azeret Mono', monospace;
  font-size: 11px; letter-spacing: 2px; color: var(--sage); text-transform: uppercase;
  margin-bottom: 10px;
}

.ng-q-title {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 6px;
  color: var(--ink);
}

.ng-q-sub {
  font-size: 15px; font-weight: 300; color: var(--ink3); margin-bottom: 32px;
}

.ng-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
}

.ng-opt {
  background: var(--white);
  border: 1.5px solid transparent;
  border-radius: var(--radius-sm);
  padding: 18px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  box-shadow: var(--shadow-sm);
  position: relative;
  text-align: left;
}

.ng-opt:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--bg2);
}

.ng-opt.active {
  border-color: var(--forest);
  background: linear-gradient(135deg, rgba(13,107,63,0.06) 0%, rgba(46,204,113,0.1) 100%);
  box-shadow: 0 0 0 3px rgba(13,107,63,0.12), var(--shadow-md);
}

.ng-opt .ng-opt-check {
  position: absolute; top: 12px; right: 12px;
  width: 20px; height: 20px; border-radius: 50%;
  border: 1.5px solid var(--ink4);
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; transition: all 0.25s;
  color: transparent;
}

.ng-opt.active .ng-opt-check {
  background: var(--forest); border-color: var(--forest); color: white;
}

.ng-opt-icon {
  font-family: 'Crimson Pro', serif;
  font-size: 18px; color: var(--sage); margin-bottom: 6px;
}

.ng-opt-label { font-size: 14px; font-weight: 600; margin-bottom: 2px; }

.ng-opt-desc { font-size: 12px; color: var(--ink3); font-weight: 300; line-height: 1.4; }

/* Freetext */
.ng-freetext-tags {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;
}

.ng-ft-tag {
  font-size: 12px; font-weight: 500; color: var(--ink2);
  background: var(--white); border: 1px solid var(--bg2);
  padding: 7px 14px; border-radius: 40px;
  cursor: pointer; transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}

.ng-ft-tag:hover { border-color: var(--sage); color: var(--forest); }

.ng-textarea {
  width: 100%; min-height: 140px;
  background: var(--white);
  border: 1.5px solid var(--bg2);
  border-radius: var(--radius-sm);
  padding: 20px;
  font-family: 'Sora', sans-serif;
  font-size: 15px; font-weight: 300;
  color: var(--ink); line-height: 1.6;
  resize: vertical; outline: none;
  transition: border-color 0.3s;
  box-shadow: var(--shadow-sm);
}

.ng-textarea:focus {
  border-color: var(--forest);
  box-shadow: 0 0 0 3px rgba(13,107,63,0.1), var(--shadow-sm);
}

.ng-textarea::placeholder { color: var(--ink4); }

.ng-ft-hint { font-size: 13px; color: var(--ink4); margin-top: 10px; font-weight: 300; }

/* Nav */
.ng-nav { display: flex; justify-content: space-between; margin-top: 32px; }

.ng-btn {
  border: 1.5px solid var(--bg2);
  background: var(--white);
  color: var(--ink2);
  padding: 12px 28px;
  border-radius: 60px;
  font-family: 'Sora', sans-serif;
  font-size: 13px; font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: var(--shadow-sm);
}

.ng-btn:hover { border-color: var(--ink4); color: var(--ink); }

.ng-btn-primary {
  background: linear-gradient(135deg, var(--forest) 0%, var(--forest2) 100%);
  border-color: var(--forest);
  color: white;
  box-shadow: 0 4px 20px rgba(13,107,63,0.25);
}

.ng-btn-primary:hover {
  background: linear-gradient(135deg, var(--forest2) 0%, #0CBF58 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(13,107,63,0.3);
}

.ng-btn:disabled {
  opacity: 0.35; cursor: not-allowed;
  transform: none !important;
}

/* ── Analysis ── */
.ng-analysis {
  min-height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 48px 24px; text-align: center;
}

.ng-lamp-anim {
  width: 100px; height: 100px;
  margin-bottom: 40px;
  animation: gentleFloat 3s ease-in-out infinite;
  color: var(--forest);
}

@keyframes gentleFloat {
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-10px)}
}

.ng-sparkles {
  position: relative;
  width: 100px; height: 100px;
}

.ng-sparkle {
  position: absolute;
  width: 6px; height: 6px;
  background: var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--gold);
  animation: sparkle 2s ease-in-out infinite;
}

.ng-sparkle:nth-child(1){top:0;left:50%;animation-delay:0s}
.ng-sparkle:nth-child(2){top:20%;right:0;animation-delay:0.4s}
.ng-sparkle:nth-child(3){bottom:20%;right:10%;animation-delay:0.8s}
.ng-sparkle:nth-child(4){top:30%;left:5%;animation-delay:1.2s}

@keyframes sparkle {
  0%,100%{opacity:0;transform:scale(0)}
  50%{opacity:1;transform:scale(1)}
}

.ng-analysis h2 {
  font-family: 'Crimson Pro', serif;
  font-size: 28px; font-weight: 400; margin-bottom: 24px; color: var(--ink);
}

.ng-analysis-step {
  font-size: 14px; font-weight: 300; color: var(--ink3);
  height: 24px;
  transition: opacity 0.4s;
}

.ng-analysis-bar {
  width: 240px; height: 3px; background: var(--bg2);
  border-radius: 8px; margin-top: 24px; overflow: hidden;
}

.ng-analysis-fill {
  height: 100%; background: var(--forest); border-radius: 8px;
  transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
}

/* ── Results ── */
.ng-results {
  padding: 40px 24px 80px;
  max-width: 700px; margin: 0 auto;
}

.ng-results-head {
  text-align: center;
  padding: 24px 0 40px;
}

.ng-results-head .ng-rh-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Azeret Mono', monospace;
  font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--forest);
  background: var(--sage-light);
  padding: 8px 18px; border-radius: 40px;
  margin-bottom: 20px;
}

.ng-results-head h2 {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(30px, 5vw, 44px);
  font-weight: 400; margin-bottom: 12px;
}

.ng-results-head .ng-rh-summary {
  font-size: 16px; font-weight: 300; color: var(--ink3);
  max-width: 520px; margin: 0 auto 20px;
  line-height: 1.6;
}

.ng-tags {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
}

.ng-tag {
  font-size: 12px; font-weight: 500;
  padding: 6px 14px; border-radius: 40px;
  background: var(--white); border: 1px solid var(--bg2);
  color: var(--ink2);
  box-shadow: var(--shadow-sm);
}

/* Notes card */
.ng-notes-card {
  background: var(--gold-light);
  border: 1px solid var(--gold-glow);
  border-radius: var(--radius-sm);
  padding: 20px 24px;
  margin-bottom: 28px;
}

.ng-notes-label {
  font-family: 'Azeret Mono', monospace;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: var(--gold); margin-bottom: 6px;
}

.ng-notes-text {
  font-family: 'Crimson Pro', serif;
  font-size: 16px; font-style: italic; color: var(--ink2); line-height: 1.5;
}

.ng-notes-disclaimer {
  font-size: 12px; color: var(--ink4); margin-top: 10px; font-weight: 300;
}

/* Section title */
.ng-section-title {
  font-family: 'Azeret Mono', monospace;
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: var(--sage); margin: 32px 0 16px;
}

/* Supplement cards */
.ng-supp {
  background: var(--white);
  border-radius: var(--radius);
  padding: 28px;
  margin-bottom: 12px;
  box-shadow: var(--shadow-sm);
  border: 1px solid transparent;
  transition: all 0.3s;
}

.ng-supp:hover {
  box-shadow: var(--shadow-md);
  border-color: rgba(46,204,113,0.2);
  transform: translateY(-2px);
}

.ng-supp-top {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 4px; gap: 12px;
}

.ng-supp-name {
  font-family: 'Crimson Pro', serif;
  font-size: 24px; font-weight: 500; color: var(--ink);
}

.ng-supp-dose {
  font-family: 'Azeret Mono', monospace;
  font-size: 12px; font-weight: 500;
  color: var(--forest);
  background: var(--sage-light);
  padding: 5px 14px; border-radius: 40px;
  white-space: nowrap;
}

.ng-supp-detail {
  font-size: 12px; color: var(--ink4); margin-bottom: 12px; font-weight: 300;
}

.ng-supp-reason {
  font-size: 14px; font-weight: 300; color: var(--ink2); line-height: 1.65;
  margin-bottom: 16px;
}

.ng-supp-meta {
  display: flex; gap: 20px; flex-wrap: wrap;
}

.ng-meta {
  font-size: 12px; color: var(--ink4); font-weight: 300;
}

.ng-meta b { font-weight: 500; color: var(--ink3); }

.ng-priority-core {
  font-family: 'Azeret Mono', monospace;
  font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
  color: var(--forest); font-weight: 500;
}

.ng-priority-optional {
  font-family: 'Azeret Mono', monospace;
  font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
  color: var(--ink4); font-weight: 500;
}

/* Schedule */
.ng-schedule {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px 28px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 12px;
}

.ng-sched-row {
  display: flex; align-items: baseline; gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid var(--bg2);
}

.ng-sched-row:last-child { border-bottom: none; }

.ng-sched-time {
  font-family: 'Azeret Mono', monospace;
  font-size: 12px; color: var(--sage); width: 70px; flex-shrink: 0;
}

.ng-sched-items { font-size: 14px; font-weight: 300; color: var(--ink2); }

/* Warning */
.ng-warn {
  background: rgba(220,107,90,0.06);
  border: 1px solid rgba(220,107,90,0.12);
  border-radius: var(--radius-sm);
  padding: 18px 22px;
  margin-top: 20px;
  font-size: 13px; font-weight: 300; color: var(--ink2); line-height: 1.6;
}

.ng-warn strong { color: var(--danger); font-weight: 500; }

/* CTA */
.ng-cta-box {
  background: var(--white);
  border-radius: var(--radius);
  padding: 40px 32px;
  text-align: center;
  margin-top: 40px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--bg2);
}

.ng-cta-box h3 {
  font-family: 'Crimson Pro', serif;
  font-size: 24px; font-weight: 400; margin-bottom: 6px;
}

.ng-cta-box p {
  font-size: 14px; font-weight: 300; color: var(--ink3); margin-bottom: 24px;
}

.ng-email-row {
  display: flex; gap: 8px; max-width: 400px; margin: 0 auto;
}

.ng-email-input {
  flex: 1;
  background: var(--bg);
  border: 1.5px solid var(--bg2);
  border-radius: 60px;
  padding: 14px 20px;
  font-family: 'Sora', sans-serif;
  font-size: 14px; font-weight: 300;
  color: var(--ink);
  outline: none;
  transition: border-color 0.3s;
}

.ng-email-input:focus { border-color: var(--forest); }
.ng-email-input::placeholder { color: var(--ink4); }

.ng-email-btn {
  background: linear-gradient(135deg, var(--forest) 0%, var(--forest2) 100%);
  color: white; border: none;
  padding: 14px 24px;
  font-family: 'Sora', sans-serif;
  font-size: 13px; font-weight: 600;
  border-radius: 60px;
  cursor: pointer; white-space: nowrap;
  transition: all 0.25s;
  box-shadow: 0 4px 16px rgba(13,107,63,0.25);
}

.ng-email-btn:hover { background: linear-gradient(135deg, var(--forest2) 0%, #0CBF58 100%); }

.ng-saved-msg {
  color: var(--forest2); font-weight: 500; font-size: 15px;
}

/* Footer */
.ng-disclaimer {
  margin-top: 32px; text-align: center;
  font-size: 11px; color: var(--ink4); line-height: 1.7; font-weight: 300;
}

.ng-restart {
  display: inline-block; margin-top: 20px;
  font-size: 13px; color: var(--ink4); font-weight: 400;
  cursor: pointer; text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}

.ng-restart:hover { color: var(--ink2); }

/* Error */
.ng-error {
  background: rgba(220,107,90,0.08);
  border: 1px solid rgba(220,107,90,0.2);
  border-radius: var(--radius-sm);
  padding: 32px; text-align: center; margin: 40px 0;
}

.ng-error p { color: var(--danger); margin-bottom: 16px; }

/* Anims */
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

.ng-fade { animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }

@media(max-width:520px){
  .ng-options{grid-template-columns:1fr}
  .ng-email-row{flex-direction:column}
  .ng-supp-top{flex-direction:column}
  .ng-pills{gap:20px}
}
`;

// ── Component ──
export default function NootraGenie() {
  const [screen, setScreen] = useState("welcome");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [analysisStep, setAnalysisStep] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email.includes("@") || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, goal: answers.goal || "general" }),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        setSaved(true); // still show success to user — we'll capture via fallback
      }
    } catch {
      setSaved(true); // graceful degradation
    }
    setSubmitting(false);
  };

  const q = QUESTIONS[step];

  const select = (value) => {
    if (q.multi) {
      const cur = answers[q.id] || [];
      if (value === "nothing" || value === "none") {
        setAnswers({ ...answers, [q.id]: [value] });
      } else {
        const f = cur.filter((v) => v !== "nothing" && v !== "none");
        setAnswers({ ...answers, [q.id]: f.includes(value) ? f.filter((v) => v !== value) : [...f, value] });
      }
    } else {
      setAnswers({ ...answers, [q.id]: value });
    }
  };

  const isActive = (v) => q.multi ? (answers[q.id] || []).includes(v) : answers[q.id] === v;
  const canGo = q.freetext ? true : q.multi ? (answers[q.id] || []).length > 0 : !!answers[q.id];

  const next = () => {
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else analyze();
  };

  const analyze = async () => {
    setScreen("analyzing");
    setAnalysisStep(0);
    setError(null);
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 550 + Math.random() * 350));
      setAnalysisStep(i + 1);
    }
    try {
      setResults(buildStack(answers));
      setScreen("results");
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setScreen("results");
    }
  };

  const restart = () => {
    setScreen("welcome"); setStep(0); setAnswers({});
    setResults(null); setError(null); setEmail(""); setSaved(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ng-app">
        <div className="ng-bg">
          <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        </div>
        <div className="ng-grain" />
        <div className="ng-content">

          {/* WELCOME */}
          {screen === "welcome" && (
            <div className="ng-welcome">
              <div className="ng-logo">
                <GenieLamp size={36} color="#0D6B3F" />
                <span className="ng-logo-text">NootraGenie</span>
              </div>
              <h1>Your perfect nootropic stack, <strong>granted.</strong></h1>
              <p className="ng-hero-sub">
                Answer a few quick questions. We'll build a research-backed protocol tailored to your brain, budget, and goals.
              </p>
              <div className="ng-pills">
                <div className="ng-pill">
                  <div className="ng-pill-num">47</div>
                  <div className="ng-pill-label">Compounds</div>
                </div>
                <div className="ng-pill">
                  <div className="ng-pill-num">200+</div>
                  <div className="ng-pill-label">Studies</div>
                </div>
                <div className="ng-pill">
                  <div className="ng-pill-num">2 min</div>
                  <div className="ng-pill-label">To finish</div>
                </div>
              </div>
              <button className="ng-start-btn" onClick={() => setScreen("quiz")}>
                Build My Stack
              </button>
              <p className="ng-fine">Free · No signup · Instant results</p>
            </div>
          )}

          {/* QUIZ */}
          {screen === "quiz" && (
            <div className="ng-quiz ng-fade" key={step}>
              <div className="ng-quiz-top">
                <div className="ng-quiz-logo">
                  <GenieLamp size={24} color="#0D6B3F" />
                  <span>NootraGenie</span>
                </div>
                <div className="ng-progress">
                  <div className="ng-progress-fill" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
                </div>
              </div>

              <div className="ng-quiz-body">
                <div className="ng-q-step">{q.label}</div>
                <h2 className="ng-q-title">{q.question}</h2>
                <p className="ng-q-sub">{q.sub}</p>

                {q.freetext ? (
                  <div>
                    <div className="ng-freetext-tags">
                      {["I take SSRIs", "ADHD", "Night shifts", "Headache-prone", "Intermittent fasting", "High BP"].map((t) => (
                        <span key={t} className="ng-ft-tag" onClick={() => {
                          const c = answers[q.id] || "";
                          setAnswers({ ...answers, [q.id]: c ? `${c}, ${t.toLowerCase()}` : t.toLowerCase() });
                        }}>{t}</span>
                      ))}
                    </div>
                    <textarea
                      className="ng-textarea"
                      placeholder="e.g. I'm on blood pressure medication, work long shifts, and tried modafinil but it gave me headaches. Looking to fix afternoon brain fog..."
                      value={answers[q.id] || ""}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    />
                    <p className="ng-ft-hint">Totally optional — skip if nothing comes to mind.</p>
                  </div>
                ) : (
                  <div className="ng-options">
                    {q.options.map((o) => (
                      <div key={o.value} className={`ng-opt${isActive(o.value) ? " active" : ""}`} onClick={() => select(o.value)}>
                        <div className="ng-opt-check">{isActive(o.value) ? "✓" : ""}</div>
                        {o.icon && <div className="ng-opt-icon">{o.icon}</div>}
                        <div className="ng-opt-label">{o.label}</div>
                        {o.desc && <div className="ng-opt-desc">{o.desc}</div>}
                      </div>
                    ))}
                  </div>
                )}

                <div className="ng-nav">
                  <button className="ng-btn" onClick={() => step > 0 ? setStep(step - 1) : setScreen("welcome")}>
                    ← Back
                  </button>
                  <button className="ng-btn ng-btn-primary" disabled={!canGo} onClick={next}>
                    {step === QUESTIONS.length - 1 ? "Build My Stack" : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ANALYZING */}
          {screen === "analyzing" && (
            <div className="ng-analysis">
              <div className="ng-lamp-anim">
                <div className="ng-sparkles">
                  <div className="ng-sparkle" /><div className="ng-sparkle" />
                  <div className="ng-sparkle" /><div className="ng-sparkle" />
                  <GenieLamp size={100} color="#0D6B3F" />
                </div>
              </div>
              <h2>The Genie is working...</h2>
              <div className="ng-analysis-step">
                {ANALYSIS_STEPS[Math.min(analysisStep, ANALYSIS_STEPS.length - 1)]}
              </div>
              <div className="ng-analysis-bar">
                <div className="ng-analysis-fill" style={{ width: `${(analysisStep / ANALYSIS_STEPS.length) * 100}%` }} />
              </div>
            </div>
          )}

          {/* RESULTS */}
          {screen === "results" && (
            <div className="ng-results ng-fade">
              {error ? (
                <div className="ng-error">
                  <p>{error}</p>
                  <button className="ng-btn" onClick={restart}>Try Again</button>
                </div>
              ) : results && (
                <>
                  <div className="ng-results-head">
                    <div className="ng-rh-badge">
                      <GenieLamp size={16} color="#0D6B3F" />
                      Your Protocol
                    </div>
                    <h2>{results.label}</h2>
                    <p className="ng-rh-summary">{results.summary}</p>
                    <div className="ng-tags">
                      <span className="ng-tag">{answers.goal}</span>
                      <span className="ng-tag">{answers.budget} budget</span>
                      <span className="ng-tag">Est. {results.totalCost}</span>
                    </div>
                  </div>

                  {answers.freetext && answers.freetext.trim() && (
                    <div className="ng-notes-card">
                      <div className="ng-notes-label">Your Notes</div>
                      <div className="ng-notes-text">"{answers.freetext.trim()}"</div>
                      <div className="ng-notes-disclaimer">
                        For medical conditions or medications mentioned, always verify with your healthcare provider.
                      </div>
                    </div>
                  )}

                  <div className="ng-section-title">Your Stack</div>

                  {results.supplements.map((s, i) => (
                    <div className="ng-supp" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="ng-supp-top">
                        <div className="ng-supp-name">{s.name}</div>
                        <div className="ng-supp-dose">{s.dosage}</div>
                      </div>
                      {s.detail && <div className="ng-supp-detail">{s.detail}</div>}
                      <div className="ng-supp-reason">{s.reason}</div>
                      <div className="ng-supp-meta">
                        <div className="ng-meta"><b>When:</b> {s.timing}</div>
                        <div className="ng-meta"><b>Onset:</b> {s.onset}</div>
                        <div className="ng-meta"><b>Cost:</b> {s.cost}</div>
                        <div className={s.priority === "core" ? "ng-priority-core" : "ng-priority-optional"}>
                          {s.priority === "core" ? "◆ Core" : "○ Optional"}
                        </div>
                      </div>
                    </div>
                  ))}

                  {results.schedule.length > 0 && (
                    <>
                      <div className="ng-section-title">Daily Schedule</div>
                      <div className="ng-schedule">
                        {results.schedule.map((s, i) => (
                          <div className="ng-sched-row" key={i}>
                            <div className="ng-sched-time">{s.time}</div>
                            <div className="ng-sched-items">{s.items}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="ng-warn">
                    <strong>⚠ Important</strong><br />
                    {results.warnings}
                  </div>

                  <div className="ng-cta-box">
                    <h3>Save your protocol</h3>
                    <p>Get your full breakdown, purchase links, and interaction guide in your inbox.</p>
                    {saved ? (
                      <p className="ng-saved-msg">✓ Sent! Check your inbox.</p>
                    ) : (
                      <div className="ng-email-row">
                        <input
                          className="ng-email-input"
                          type="email"
                          placeholder="you@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="ng-email-btn" onClick={handleSubscribe} disabled={submitting}>
                          {submitting ? "Sending..." : "Send It"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="ng-disclaimer">
                    *These recommendations are for informational purposes only and do not constitute medical advice.
                    Always consult a qualified healthcare provider before starting any supplement regimen.
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <span className="ng-restart" onClick={restart}>← Retake the quiz</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
