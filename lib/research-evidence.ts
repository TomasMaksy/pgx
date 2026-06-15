export type ResearchCategory =
  | "genetic-variations"
  | "cost-effectiveness"
  | "better-outcomes";

export type EvidenceCard = {
  id: string;
  category: ResearchCategory;
  headline: string;
  keyNumber: string;
  keyNumberLabel: string;
  explanation: string;
  studyTitle: string;
  authors: string;
  year: number;
  journal: string;
  url: string;
  ctaLabel: "Read study" | "View evidence" | "See source";
  image: string;
  imageAlt: string;
};

export const RESEARCH_CATEGORIES: {
  id: ResearchCategory;
  label: string;
}[] = [
  { id: "genetic-variations", label: "Genetic Variations" },
  { id: "cost-effectiveness", label: "Cost-Effectiveness" },
  { id: "better-outcomes", label: "Better Medication Outcomes" },
];

export const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    id: "swiss-cohort",
    category: "genetic-variations",
    headline: "Almost all hospital patients carry an actionable PGx variant",
    keyNumber: "97.3%",
    keyNumberLabel: "carried at least one actionable PGx variant",
    explanation:
      "In a Swiss hospital-based cohort of 1,533 patients, nearly all participants carried at least one actionable variant across 13 high-risk pharmacogenes. The study also found that 31% of patients had been prescribed at least one drug for which they carried a high-risk variant.",
    studyTitle:
      "Prevalence of actionable pharmacogenetic variants and high-risk drug prescriptions: A Swiss hospital-based cohort study",
    authors:
      "Flavia Hodel, Maria B. De Min, Christian Wandall Thorball, Claire Redin, Peter Vollenweider, François Girardin, Jacques Fellay",
    year: 2024,
    journal: "Clinical and Translational Science",
    url: "https://doi.org/10.1111/cts.70009",
    ctaLabel: "Read study",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Laboratory DNA sequencing for pharmacogenomic analysis",
  },
  {
    id: "vha-prevalence",
    category: "genetic-variations",
    headline: "Actionable PGx variants are projected in nearly every pharmacy user",
    keyNumber: "99%",
    keyNumberLabel: "projected to carry an actionable PGx variant",
    explanation:
      "This large Veterans Health Administration analysis included 7,769,359 pharmacy users and projected that almost all would carry at least one actionable pharmacogenetic variant. More than half received at least one CPIC Level A drug during the study period.",
    studyTitle:
      "Projected Prevalence of Actionable Pharmacogenetic Variants and Level A Drugs Prescribed Among US Veterans Health Administration Pharmacy Users",
    authors:
      "Catherine Chanfreau-Coffinier, Leland E. Hull, Julie A. Lynch, Scott L. DuVall, Scott M. Damrauer, Francesca E. Cunningham, Benjamin F. Voight, Michael E. Matheny, David W. Oslin, Michael S. Icardi, Sony Tuteja",
    year: 2019,
    journal: "JAMA Network Open",
    url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2735464",
    ctaLabel: "Read study",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Pharmacy medication dispensing in a clinical setting",
  },
  {
    id: "lithuanian-cyp",
    category: "genetic-variations",
    headline: "Lithuanian patients commonly show altered CYP metabolism",
    keyNumber: "66.7%",
    keyNumberLabel: "with non-normal CYP2C19 metabolism",
    explanation:
      "A retrospective Kaunas Clinics study of 54 Lithuanian patients found frequent deviations from normal metabolic activity in three major drug-metabolizing CYP enzymes. These genes are relevant to many commonly used medicines, including analgesics, antidepressants, antiplatelets, proton pump inhibitors, and anticoagulants.",
    studyTitle:
      "Cytochrome P450 2C19 enzyme, Cytochrome P450 2C9 enzyme, and Cytochrome P450 2D6 enzyme allelic variants and its possible effect on drug metabolism: A retrospective study",
    authors: "Domas Naujokaitis, Virginija Asmoniene, Edmundas Kadusevicius",
    year: 2021,
    journal: "Medicine",
    url: "https://doi.org/10.1097/MD.0000000000024545",
    ctaLabel: "View evidence",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Clinical consultation in a European hospital setting",
  },
  {
    id: "dgi-biorepository",
    category: "genetic-variations",
    headline: "Real-world prescriptions frequently intersect with drug-gene interactions",
    keyNumber: "47%",
    keyNumberLabel: "of cardiology prescriptions had an actionable DGI",
    explanation:
      "In a health-system biorepository study, researchers linked genetic data with prescribing records to estimate clinically actionable drug-gene interactions across services. High DGI proportions were observed in common specialties including cardiology, internal medicine, psychiatry, and pain management.",
    studyTitle:
      "Identifying the prevalence of clinically actionable drug-gene interactions in a health system biorepository to guide pharmacogenetics implementation services",
    authors:
      "Amy L. Pasternak, Kristen Ward, Madison Irwin, Carl Okerberg, David Hayes, Lars Fritsche, Sebastian Zoellner, Jessica Virzi, Hae Mi Choe, Vicki Ellingrod",
    year: 2023,
    journal: "Clinical and Translational Science",
    url: "https://doi.org/10.1111/cts.13449",
    ctaLabel: "Read study",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Electronic health records linked with genomic data",
  },
  {
    id: "prepare-cost-utility",
    category: "cost-effectiveness",
    headline: "PREPARE cost-utility analysis supports panel-based PGx",
    keyNumber: "€12,020",
    keyNumberLabel: "cost per QALY gained — well below typical EU thresholds",
    explanation:
      "A multinational cost-utility analysis of patients enrolled in the U-PGx PREPARE study found that panel-based PGx-guided treatment was cost-effective. In patients with actionable results, PGx-guided care had lower mean total costs than control care.",
    studyTitle:
      "Multinational cost-utility analysis of panel-based pharmacogenetics-guided treatment of patients enrolled in the U-PGx PREPARE study",
    authors:
      "Vasileios Fragoulakis, Jesse J. Swen, Margarita-Ioanna Koufaki, Kathrin Blagec, Tanja Blagus, Stefan Böhringer, Anne Cambon-Thomsen, Erika Cecchin, Ka-Chun Cheung, Vera H. M. Deneer, et al.",
    year: 2025,
    journal: "The Lancet Regional Health – Europe",
    url: "https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(25)00620-0/fulltext",
    ctaLabel: "View evidence",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Healthcare cost and economic analysis visualization",
  },
  {
    id: "cardiovascular-ce",
    category: "cost-effectiveness",
    headline: "Preemptive PGx can be cost-effective in cardiovascular care",
    keyNumber: "$86,227",
    keyNumberLabel: "cost per QALY — below the $100,000 willingness-to-pay threshold",
    explanation:
      "A model-based analysis compared preemptive PGx panel testing, reactive testing, and usual care for cardiovascular disease management. Preemptive testing was cost-effective at a $100,000/QALY willingness-to-pay threshold, while reactive testing was not.",
    studyTitle:
      "A model-based cost-effectiveness analysis of pharmacogenomic panel testing in cardiovascular disease management: preemptive, reactive, or none?",
    authors:
      "Ye Zhu, James P. Moriarty, Kristi M. Swanson, Paul Y. Takahashi, Suzette J. Bielinski, Richard Weinshilboum, Liewei Wang, Bijan J. Borah",
    year: 2021,
    journal: "Genetics in Medicine",
    url: "https://doi.org/10.1038/s41436-020-00995-w",
    ctaLabel: "Read study",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Cardiovascular monitoring in a clinical care setting",
  },
  {
    id: "prepare-cost-savings",
    category: "cost-effectiveness",
    headline: "PGx-guided care may reduce costs in actionable patients",
    keyNumber: "€276",
    keyNumberLabel: "lower mean total cost per patient (€491 vs €767 control)",
    explanation:
      "In the U-PGx PREPARE cost-utility analysis, patients with actionable PGx results had lower mean total costs when treatment was guided by PGx compared with control care. The same analysis estimated that a preemptive approach excluding test cost could become cost-saving, with approximately €103.6 savings per patient.",
    studyTitle:
      "Multinational cost-utility analysis of panel-based pharmacogenetics-guided treatment of patients enrolled in the U-PGx PREPARE study",
    authors:
      "Vasileios Fragoulakis, Jesse J. Swen, Margarita-Ioanna Koufaki, Kathrin Blagec, Tanja Blagus, Stefan Böhringer, Anne Cambon-Thomsen, Erika Cecchin, Ka-Chun Cheung, Vera H. M. Deneer, et al.",
    year: 2025,
    journal: "The Lancet Regional Health – Europe",
    url: "https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(25)00620-0/fulltext",
    ctaLabel: "See source",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Healthcare budget planning and financial analysis",
  },
  {
    id: "prepare-adr",
    category: "better-outcomes",
    headline: "PREPARE reduced clinically relevant adverse drug reactions",
    keyNumber: "30%",
    keyNumberLabel: "lower ADR risk with genotype-guided treatment",
    explanation:
      "The PREPARE study tested a 12-gene pharmacogenetic panel across 18 hospitals, 9 community health centers, and 28 community pharmacies in 7 European countries. In patients with an actionable result, clinically relevant ADRs occurred in 21.0% of PGx-guided patients versus 27.7% of control patients.",
    studyTitle:
      "A 12-gene pharmacogenetic panel to prevent adverse drug reactions: an open-label, multicentre, controlled, cluster-randomised crossover implementation study",
    authors:
      "Jesse J. Swen, Cathelijne H. van der Wouden, Lisanne E. N. Manson, Heshu Abdullah-Koolmees, Kathrin Blagec, Tanja Blagus, Stefan Böhringer, Anne Cambon-Thomsen, Erika Cecchin, Ka-Chun Cheung, et al.; Ubiquitous Pharmacogenomics Consortium",
    year: 2023,
    journal: "The Lancet",
    url: "https://doi.org/10.1016/S0140-6736(22)01841-4",
    ctaLabel: "Read study",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Clinical research laboratory supporting pharmacogenomic implementation",
  },
  {
    id: "prepare-europe",
    category: "better-outcomes",
    headline: "DPWG-guided prescribing is feasible across European healthcare settings",
    keyNumber: "6,944",
    keyNumberLabel: "patients enrolled across 7 European countries",
    explanation:
      "PREPARE implemented a 12-gene panel using Dutch Pharmacogenetics Working Group recommendations in hospitals, community health centers, and pharmacies. The study demonstrated that pharmacogenomic decision support can be deployed across diverse European healthcare organizations.",
    studyTitle:
      "A 12-gene pharmacogenetic panel to prevent adverse drug reactions: an open-label, multicentre, controlled, cluster-randomised crossover implementation study",
    authors:
      "Jesse J. Swen, Cathelijne H. van der Wouden, Lisanne E. N. Manson, Heshu Abdullah-Koolmees, Kathrin Blagec, Tanja Blagus, Stefan Böhringer, Anne Cambon-Thomsen, Erika Cecchin, Ka-Chun Cheung, et al.; Ubiquitous Pharmacogenomics Consortium",
    year: 2023,
    journal: "The Lancet",
    url: "https://doi.org/10.1016/S0140-6736(22)01841-4",
    ctaLabel: "View evidence",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Multinational hospital network implementing clinical programs",
  },
  {
    id: "cpic-clopidogrel",
    category: "better-outcomes",
    headline: "Clinical guidelines turn genetic results into prescribing actions",
    keyNumber: "CYP2C19",
    keyNumberLabel: "CPIC guideline links genotype to clopidogrel dosing",
    explanation:
      "The CPIC guideline translates CYP2C19 genotype into therapeutic recommendations for clopidogrel, including alternative antiplatelet therapy for patients with reduced-function CYP2C19 phenotypes when clinically appropriate. This makes PGx results directly usable at the point of prescribing.",
    studyTitle:
      "Clinical Pharmacogenetics Implementation Consortium Guideline for CYP2C19 Genotype and Clopidogrel Therapy: 2022 Update",
    authors:
      "Craig R. Lee, James S. Leeder, Teri E. Klein, Alan R. Shuldiner, Julie A. Johnson, Mary V. Relling, et al.",
    year: 2022,
    journal: "Clinical Pharmacology & Therapeutics",
    url: "https://ascpt.onlinelibrary.wiley.com/doi/10.1002/cpt.2526",
    ctaLabel: "See source",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Clinical prescribing guidelines applied at the point of care",
  },
  {
    id: "hla-hypersensitivity",
    category: "better-outcomes",
    headline: "HLA pharmacogenetics can prevent severe drug hypersensitivity",
    keyNumber: "HLA",
    keyNumberLabel: "genetic markers linked to severe drug reactions",
    explanation:
      "The HLA pharmacogenetics review summarizes clinically established HLA-drug associations, including markers used to reduce risk of severe cutaneous adverse reactions and other hypersensitivity syndromes. These examples show the value of PGx for preventing rare but potentially life-threatening medication harms.",
    studyTitle:
      "HLA Pharmacogenetic Markers of Drug Hypersensitivity from the Perspective of the Populations of the Greater Middle East",
    authors:
      "Hend Chaker Masmoudi, Nariman Afify, Halima Alnaqbi, Zainab Alhalwachi, Guan K. Tay, Habiba Alsafar",
    year: 2022,
    journal: "Pharmacogenomics",
    url: "https://doi.org/10.2217/pgs-2022-0078",
    ctaLabel: "Read study",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Immunology research supporting pharmacogenetic safety screening",
  },
];

export function getEvidenceByCategory(category: ResearchCategory) {
  return EVIDENCE_CARDS.filter((card) => card.category === category);
}
