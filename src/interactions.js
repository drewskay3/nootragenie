// ──────────────────────────────────────────────────────────────────────────
// Programmatic medication × supplement interaction pages.
//
// SAFETY NOTE: The interaction data below is the canonical source for PUBLIC
// interaction pages. The quiz engine in Quiz.jsx keeps its own copy in
// MED_INTERACTIONS. If you ever change a medical interaction, update it in
// BOTH places or ask Claude to unify them into one shared source.
//
// Nothing here is medical advice. Every page is framed as informational and
// routes the reader to a pharmacist/prescriber.
// ──────────────────────────────────────────────────────────────────────────

export const SUPP_META = {
  lions_mane:         { name: "Lion's Mane",        slug: "lions-mane",         blurb: "A mushroom extract studied for nerve growth factor support and long-term cognitive health." },
  l_theanine:         { name: "L-Theanine",          slug: "l-theanine",         blurb: "An amino acid found in tea, used for calm, focused attention and to smooth out caffeine." },
  alpha_gpc:          { name: "Alpha-GPC",           slug: "alpha-gpc",          blurb: "A highly bioavailable choline source that supports acetylcholine, involved in memory and focus." },
  bacopa:             { name: "Bacopa Monnieri",     slug: "bacopa-monnieri",    blurb: "A traditional herb studied over 8–12 weeks for memory and recall." },
  ashwagandha:        { name: "Ashwagandha",         slug: "ashwagandha",        blurb: "An adaptogenic herb studied for reducing cortisol and the body's stress response." },
  magnesium:          { name: "Magnesium",           slug: "magnesium",          blurb: "A mineral involved in nervous-system calm, sleep, and synaptic function." },
  rhodiola:           { name: "Rhodiola Rosea",      slug: "rhodiola-rosea",     blurb: "An adaptogen studied for mental fatigue and stress resilience that affects monoamine pathways." },
  tyrosine:           { name: "L-Tyrosine",          slug: "l-tyrosine",         blurb: "An amino acid that is a precursor to dopamine and norepinephrine." },
  omega3:             { name: "Omega-3",             slug: "omega-3",            blurb: "EPA/DHA fish oil that supports brain cell membranes and has mild blood-thinning activity." },
  creatine:           { name: "Creatine",            slug: "creatine",           blurb: "A compound used for muscle and brain energy, also studied for cognition under stress." },
  cdp_choline:        { name: "Citicoline",          slug: "citicoline",         blurb: "A choline source (CDP-Choline) that supports acetylcholine and dopamine receptor density." },
  phosphatidylserine: { name: "Phosphatidylserine",  slug: "phosphatidylserine", blurb: "A phospholipid that supports brain cell membranes and helps moderate cortisol." },
  apigenin:           { name: "Apigenin",            slug: "apigenin",           blurb: "A flavonoid from chamomile that promotes GABA activity and sleep." },
};

export const MED_META = {
  ssri:               { label: "SSRIs / SNRIs",             slug: "ssris",                    examples: "Zoloft, Lexapro, Prozac, Effexor, Cymbalta",        plain: "antidepressants that raise serotonin (and sometimes norepinephrine)" },
  maoi:               { label: "MAOIs",                     slug: "maois",                    examples: "Nardil, Parnate, Marplan, Emsam, selegiline",        plain: "a class of antidepressant with severe, sometimes dangerous interactions" },
  blood_thinners:     { label: "Blood Thinners",            slug: "blood-thinners",           examples: "Warfarin, Eliquis, Xarelto, aspirin therapy",        plain: "anticoagulant or antiplatelet medication" },
  blood_pressure:     { label: "Blood Pressure Medication", slug: "blood-pressure-medication",examples: "Lisinopril, Amlodipine, Metoprolol",                  plain: "medication that manages blood pressure or another cardiovascular condition" },
  stimulants:         { label: "ADHD Stimulants",           slug: "adhd-stimulants",          examples: "Adderall, Vyvanse, Ritalin, Concerta",               plain: "stimulant ADHD medication acting on dopamine and norepinephrine" },
  strattera:          { label: "Strattera (Atomoxetine)",   slug: "strattera",                examples: "Strattera, atomoxetine",                             plain: "a non-stimulant ADHD medication that works on norepinephrine" },
  thyroid:            { label: "Thyroid Medication",        slug: "thyroid-medication",       examples: "Levothyroxine, Synthroid, Armour",                   plain: "thyroid hormone replacement medication" },
  benzos:             { label: "Benzodiazepines",           slug: "benzodiazepines",          examples: "Xanax, Ativan, Klonopin, Valium",                    plain: "benzodiazepines, which have sedative, GABA-enhancing effects" },
  immunosuppressants: { label: "Immunosuppressants",        slug: "immunosuppressants",       examples: "Post-transplant and autoimmune treatments",           plain: "medication that suppresses immune activity" },
  diabetes:           { label: "Diabetes Medication",       slug: "diabetes-medication",      examples: "Metformin, insulin, sulfonylureas",                  plain: "medication that manages blood sugar" },
};

export const INTERACTIONS = {
  ssri: {
    exclude: ["rhodiola"],
    warn: {
      tyrosine:    "L-Tyrosine increases dopamine and norepinephrine synthesis. With SNRIs (Effexor, Cymbalta), this can amplify noradrenergic activity. Discuss with your prescriber before starting and monitor for increased anxiety or blood pressure changes.",
      ashwagandha: "Ashwagandha may amplify serotonergic effects when combined with SSRIs/SNRIs. Use only under medical supervision and start at half dose.",
      l_theanine:  "L-Theanine is generally considered lower-risk with SSRIs but may enhance sedation. Monitor how you feel and discuss with your prescriber.",
      omega3:      "High-dose Omega-3 may have mild serotonergic activity. Generally considered compatible with SSRIs but mention it to your doctor.",
    },
    note: "Rhodiola is excluded with SSRIs/SNRIs due to documented serotonin syndrome risk. Other supplements that affect serotonergic or noradrenergic pathways are flagged for caution.",
  },
  maoi: {
    exclude: ["rhodiola", "tyrosine", "ashwagandha", "bacopa"],
    warn: {
      l_theanine: "L-Theanine is generally lower-risk with MAOIs but should still be cleared with your prescriber before starting.",
      omega3:     "Omega-3 is typically compatible with MAOIs, but mention all supplements to your prescribing doctor.",
    },
    note: "MAOIs have severe, potentially life-threatening interactions with many supplements that affect monoamine neurotransmitters. Do not start anything new without your prescribing physician's explicit approval.",
  },
  blood_thinners: {
    exclude: ["omega3", "lions_mane"],
    warn: {
      ashwagandha: "Limited evidence suggests Ashwagandha may have mild antiplatelet effects. Discuss with your prescriber before adding this.",
    },
    note: "Omega-3 and Lion's Mane are excluded with blood thinners because their effects on clotting can stack with your medication. Nothing new should be added without your doctor's approval.",
  },
  blood_pressure: {
    exclude: [],
    warn: {
      tyrosine:    "L-Tyrosine can transiently raise blood pressure via increased catecholamine synthesis. Monitor your BP after starting and discuss with your prescriber.",
      ashwagandha: "Ashwagandha may lower blood pressure. Combined with BP medication this could cause hypotension. Monitor carefully and start at half dose.",
      magnesium:   "Magnesium can lower blood pressure. Combined with BP medication, monitor for dizziness or lightheadedness. Start low.",
      rhodiola:    "Rhodiola may affect blood pressure regulation. Use cautiously alongside BP medications.",
    },
    note: "Several nootropics can affect blood pressure. Check with your prescriber before starting anything new.",
  },
  stimulants: {
    exclude: ["tyrosine"],
    warn: {
      alpha_gpc:   "Alpha-GPC increases acetylcholine, which may amplify stimulant side effects like jitteriness or anxiety. Start at half dose.",
      cdp_choline: "Citicoline increases acetylcholine and dopamine receptor density. May intensify ADHD medication effects. Start low.",
      rhodiola:    "Rhodiola supports dopamine metabolism. May feel overstimulating combined with ADHD stimulants. Use on off-days or at reduced dose.",
    },
    note: "L-Tyrosine is excluded with ADHD stimulants because it acts on the same dopaminergic and noradrenergic pathways your medication targets, which can amplify side effects.",
  },
  strattera: {
    exclude: [],
    warn: {
      tyrosine:  "Strattera selectively inhibits norepinephrine reuptake. L-Tyrosine increases norepinephrine synthesis. Combining can amplify noradrenergic effects including elevated heart rate and blood pressure.",
      rhodiola:  "Rhodiola affects monoamine metabolism. Combined with atomoxetine, monitor for amplified noradrenergic effects.",
      alpha_gpc: "Alpha-GPC's cholinergic effects are generally compatible with Strattera but start at a reduced dose to assess tolerance.",
    },
    note: "Strattera works through norepinephrine, so supplements that affect the same pathway are flagged. Discuss any addition with your prescriber.",
  },
  thyroid: {
    exclude: ["ashwagandha"],
    warn: {
      tyrosine:  "L-Tyrosine is a precursor to thyroid hormone. Take it at least 4 hours apart from your thyroid medication and discuss with your endocrinologist before starting.",
      magnesium: "Take Magnesium at least 4 hours apart from thyroid medication — it can reduce absorption of levothyroxine.",
      omega3:    "Take Omega-3 at least 4 hours apart from thyroid medication to avoid absorption interference.",
    },
    note: "Ashwagandha is excluded with thyroid medication because it directly affects thyroid hormone levels. Other supplements should be spaced at least 4 hours from your medication.",
  },
  benzos: {
    exclude: ["ashwagandha", "apigenin"],
    warn: {
      magnesium:  "Magnesium enhances GABA activity and may amplify benzodiazepine sedation. Use with caution and discuss with your prescriber.",
      l_theanine: "L-Theanine promotes relaxation via GABA pathways. May increase sedation when combined with benzodiazepines. Start at half dose.",
    },
    note: "Supplements with strong GABA-enhancing effects are excluded with benzodiazepines to avoid excessive sedation.",
  },
  immunosuppressants: {
    exclude: ["lions_mane", "ashwagandha"],
    warn: {
      omega3: "High-dose Omega-3 may modulate immune function. Discuss with your transplant team or immunologist before adding.",
    },
    note: "Lion's Mane and Ashwagandha are excluded with immunosuppressants because they may stimulate immune activity, which can work against your medication.",
  },
  diabetes: {
    exclude: [],
    warn: {
      ashwagandha: "Ashwagandha may lower blood sugar. Combined with diabetes medication, this could cause hypoglycemia. Monitor blood sugar closely.",
      magnesium:   "Magnesium affects insulin sensitivity and glucose metabolism. May require adjustment of diabetes medication. Monitor levels.",
      creatine:    "Creatine can affect creatinine levels in blood tests, which may interfere with kidney-function monitoring common in diabetes management.",
    },
    note: "Several supplements can affect blood sugar. Check with your endocrinologist before starting.",
  },
};

function buildIndex() {
  const pages = [];
  Object.keys(INTERACTIONS).forEach((medKey) => {
    const med = INTERACTIONS[medKey];
    const seen = new Set();
    (med.exclude || []).forEach((suppKey) => {
      if (!SUPP_META[suppKey] || seen.has(suppKey)) return;
      seen.add(suppKey);
      pages.push({ suppKey, medKey, verdict: "exclude", detail: "" });
    });
    Object.keys(med.warn || {}).forEach((suppKey) => {
      if (!SUPP_META[suppKey] || seen.has(suppKey)) return;
      seen.add(suppKey);
      pages.push({ suppKey, medKey, verdict: "warn", detail: med.warn[suppKey] });
    });
  });
  return pages.map((p) => ({
    ...p,
    supp: SUPP_META[p.suppKey],
    med:  MED_META[p.medKey],
    note: INTERACTIONS[p.medKey].note,
    slug: `${SUPP_META[p.suppKey].slug}-and-${MED_META[p.medKey].slug}`,
  }));
}

export const INTERACTION_PAGES = buildIndex();

export function getInteractionBySlug(slug) {
  return INTERACTION_PAGES.find((p) => p.slug === slug) || null;
}

export function groupedByMedication() {
  const groups = {};
  INTERACTION_PAGES.forEach((p) => {
    if (!groups[p.medKey]) groups[p.medKey] = { med: p.med, pages: [] };
    groups[p.medKey].pages.push(p);
  });
  return Object.values(groups);
}
