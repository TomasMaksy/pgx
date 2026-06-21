export type CitationSource = {
  id: number;
  label: string;
  title: string;
  detail: string;
  url: string;
  fact: string;
};

/** Numbered in order of first appearance on the page (1–8). */
export const CITATION_SOURCES: Record<number, CitationSource> = {
  1: {
    id: 1,
    label: "Haerdtlein et al., J Clin Med 2023",
    title:
      "Which Adverse Events and Which Drugs Are Implicated in Drug-Related Hospital Admissions?",
    detail:
      "Systematic review and meta-analysis of 12 studies on ADR-related admissions.",
    url: "https://www.mdpi.com/2077-0383/12/4/1320",
    fact: "8.3% prevalence — ≈1 in 12 admissions ADR-related",
  },
  2: {
    id: 2,
    label: "Williams et al., Age Ageing 2025",
    title:
      "Hospital admissions due to adverse drug reactions and adverse drug events in older adults: a systematic review",
    detail:
      "Systematic review of ADR- and ADE-related hospital admissions in older adults.",
    url: "https://doi.org/10.1093/ageing/afaf231",
    fact: "80% of medication-related admissions predictable or preventable",
  },
  3: {
    id: 3,
    label: "Institute of Hygiene Lithuania",
    title: "Health Statistics of Lithuania 2023",
    detail:
      "Official national inpatient episode volume from the Institute of Hygiene.",
    url: "https://sveikstat.hi.lt/chart-summary-ctry.aspx?lang=eng&sel_rep_panel=8&top_loc=ctry&top_uid=110",
    fact: "560,362 annual hospital discharges",
  },
  4: {
    id: 4,
    label: "Swen et al., The Lancet 2023",
    title:
      "A 12-gene pharmacogenetic panel to prevent adverse drug reactions (PREPARE trial)",
    detail:
      "Open-label, multicentre, cluster-randomised implementation study across seven European countries (n=6,944).",
    url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(22)01841-4/abstract",
    fact: "30% fewer clinically relevant ADRs (OR 0.70)",
  },
  5: {
    id: 5,
    label: "Hodel et al., Clin Transl Sci 2024",
    title:
      "Prevalence of actionable pharmacogenetic variants and high-risk drug prescriptions: A Swiss hospital-based cohort study",
    detail:
      "Analysis of 1,533 patients from a Swiss hospital biobank for clinically actionable pharmacogenes.",
    url: "https://ascpt.onlinelibrary.wiley.com/doi/10.1111/cts.70009",
    fact: "97.3% carry ≥1 clinically actionable PGx variant",
  },
  6: {
    id: 6,
    label: "Bank et al., BMC Medicine 2019",
    title:
      "Estimated nationwide impact of implementing a preemptive pharmacogenetic panel approach to guide drug prescribing in primary care in The Netherlands",
    detail:
      "Nationwide analysis of 3,628,597 first prescriptions across ~95% of Dutch community pharmacies (2016).",
    url: "https://link.springer.com/article/10.1186/s12916-019-1342-5",
    fact: "23.6% of new prescriptions carry an actionable gene-drug interaction",
  },
  7: {
    id: 7,
    label: "U-PGx PREPARE cost-utility, eClinicalMedicine 2025",
    title:
      "Multinational cost-utility analysis of panel-based pharmacogenetics-guided treatment of patients enrolled in the U-PGx PREPARE study",
    detail:
      "Cost-utility analysis of 6,930 patients from the U-PGx PREPARE study across participating countries.",
    url: "https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(25)00620-0/fulltext",
    fact: "Hospital stay 2.37 → 1.51 days (−36%); €276 lower cost per actionable patient",
  },
  8: {
    id: 8,
    label: "Laroche et al., Br J Clin Pharmacol 2025",
    title:
      "Economic burden of hospital admissions for adverse drug reactions in France: The IATROSTAT-ECO study",
    detail:
      "Cost analysis of ADR-related hospital admissions in French public hospitals (payer perspective).",
    url: "https://bpspubs.onlinelibrary.wiley.com/doi/10.1111/bcp.16266",
    fact: "≈€5,974 per ADR-related hospitalisation",
  },
};
