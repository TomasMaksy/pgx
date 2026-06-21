// Литовские переводы. Ключ — английский исходный текст; если ключа нет,
// показывается английский (fallback). См. lib/i18n.tsx.

export const LT: Record<string, string> = {
  // ── Navbar / common ──
  Solution: "Sprendimas",
  Platform: "Platforma",
  "Contact Us": "Susisiekite",
  "Contact us": "Susisiekite",
  "Read more": "Skaityti daugiau",
  Source: "Šaltinis",

  // ── Hero ──
  "Your DNA": "Jūsų DNR",
  "Doesn't Change.": "nesikeičia.",
  "Prescribing Should.": "Receptai – turėtų.",
  "Clinical decision support powered by pharmacogenomics and AI":
    "Klinikinių sprendimų palaikymas, paremtas farmakogenomika ir dirbtiniu intelektu",

  // ── Problem ──
  "The problem": "Problema",
  "1 in 12": "1 iš 12",
  "hospital admissions are related to adverse drug reactions":
    "hospitalizacijų susijusios su nepageidaujamomis reakcijomis į vaistus",
  "ADR-related admissions": "hospitalizacijos dėl reakcijų į vaistus",
  "of medication-related admissions predictable or preventable":
    "su vaistais susijusių hospitalizacijų galima numatyti arba išvengti",
  "estimated hospitalisations/year in Lithuania":
    "numatomų hospitalizacijų per metus Lietuvoje",
  "8.3% ADR-related admissions":
    "8,3 % hospitalizacijų dėl reakcijų į vaistus",
  "Approximately 1 in 12 hospital admissions are related to adverse drug reactions.":
    "Maždaug 1 iš 12 hospitalizacijų yra susijusi su nepageidaujamomis reakcijomis į vaistus.",
  "80% predictable or preventable": "80 % galima numatyti arba išvengti",
  "80% of medication-related admissions may be predictable or preventable.":
    "80 % su vaistais susijusių hospitalizacijų galima numatyti arba jų išvengti.",
  "~46,700 ADR hospitalisations/year":
    "~46 700 hospitalizacijų dėl reakcijų į vaistus per metus",
  "560,362 annual Lithuanian hospital discharges × 8.33% (1 in 12) ≈ 46,700. Estimate calculated from published discharge volume and ADR-related admission prevalence.":
    "560 362 metiniai išrašymai iš Lietuvos ligoninių × 8,33 % (1 iš 12) ≈ 46 700. Įvertis apskaičiuotas pagal paskelbtą išrašymų skaičių ir reakcijų į vaistus paplitimą.",

  // ── Solution ──
  "The solution": "Sprendimas",
  "One Profile.": "Vienas profilis.",
  "A Lifetime of Smarter Prescribing.":
    "Visą gyvenimą – tikslesni receptai.",
  "Once a pharmacogenomic profile is generated, it can guide medication selection, dosing, and safety decisions whenever a relevant drug is prescribed.":
    "Sukūrus farmakogenominį profilį, jis padeda parinkti vaistą, dozę ir saugumo sprendimus kaskart, kai skiriamas susijęs vaistas.",
  "Sequence Once": "Sekvenuojama vieną kartą",
  "A one-time sample is sequenced to identify the clinically actionable genetic variants that influence drug response. No repeat testing — the same data supports prescribing decisions for years to come.":
    "Vienkartinis mėginys sekvenuojamas, kad būtų nustatyti kliniškai reikšmingi genetiniai variantai, lemiantys atsaką į vaistus. Kartoti nereikia – tie patys duomenys padeda priimti sprendimus ilgus metus.",
  "Interpret With Bioinformatics": "Interpretacija bioinformatika",
  "An AI-assisted analysis layer processes the raw genomic data, flags clinically relevant variants, and structures them into standardized, prescribing-ready pharmacogenomic insights.":
    "Dirbtiniu intelektu paremtas analizės sluoksnis apdoroja neapdorotus genominius duomenis, pažymi kliniškai reikšmingus variantus ir sustruktūrina juos į standartizuotas, receptams parengtas farmakogenomines įžvalgas.",
  "Generate a Pharmacogenomic Passport":
    "Sukuriamas farmakogenominis pasas",
  "The result is a lifelong profile that consolidates each patient's medication-relevant genetics into a single, portable record clinicians can reference at the point of care.":
    "Rezultatas – visą gyvenimą galiojantis profilis, sujungiantis su vaistais susijusią paciento genetiką į vieną perkeliamą įrašą, kuriuo gydytojas gali remtis prie paciento.",
  "Integrate With Any Platform": "Integracija su bet kuria platforma",
  "Profiles surface across healthcare settings and systems — supporting consistent, evidence-based prescribing at both the individual and population level.":
    "Profiliai pasiekiami įvairiose sveikatos sistemose – užtikrina nuoseklų, įrodymais grįstą receptų skyrimą tiek individualiu, tiek populiacijos lygmeniu.",

  // ── Macbook ──
  "How could this look in practice?": "Kaip tai atrodytų praktiškai?",
  "Skip to the good part": "Pereiti prie esmės",
  "Pharmacogenomic Alert": "Farmakogenominis įspėjimas",
  "Pharmacogenomic Alert: CYP2D6 Poor Metabolizer":
    "Farmakogenominis įspėjimas: CYP2D6 silpnas metabolizuotojas",
  "Reduced CYP2D6 activity may increase nebivolol exposure.":
    "Sumažėjęs CYP2D6 aktyvumas gali padidinti nebivololio koncentraciją.",
  "Nebivolol is primarily metabolized by CYP2D6. This patient has significantly reduced CYP2D6 activity and may experience substantially increased nebivolol exposure.":
    "Nebivololis daugiausia metabolizuojamas per CYP2D6. Šis pacientas turi reikšmingai sumažėjusį CYP2D6 aktyvumą, todėl nebivololio koncentracija gali būti gerokai didesnė.",

  // ── Metrics ──
  Impact: "Poveikis",
  "The measurable impact of genetics-aware prescribing.":
    "Išmatuojamas genetiką įvertinančio receptų skyrimo poveikis.",
  "30% fewer serious adverse drug reactions":
    "30 % mažiau sunkių nepageidaujamų reakcijų į vaistus",
  "95% of people carry a PGx variant that can inform prescribing":
    "95 % žmonių turi farmakogenominį variantą, svarbų skiriant vaistus",
  "1 in 4 primary-care prescriptions are PGx-relevant":
    "1 iš 4 pirminės priežiūros receptų yra farmakogenomiškai reikšmingas",
  "36% shorter hospital stays when prescribing is PGx-guided":
    "36 % trumpesnis gulėjimas ligoninėje, kai receptai skiriami pagal farmakogenomiką",
  "≈€2,500 per preventable ADR-related hospitalisation":
    "≈2 500 € už kiekvieną išvengiamą hospitalizaciją dėl reakcijos į vaistus",
  "€5–10M estimated annual savings for Lithuania's healthcare system":
    "5–10 mln. € numatoma metinė santaupa Lietuvos sveikatos sistemai",

  // ── Why now ──
  "Why now": "Kodėl dabar",
  "Limited Window": "Ribotas laikas",
  whether: "ar",
  who: "kas",
  when: "kada",
  "Europe is funding the build-out of sovereign health and biotech infrastructure across the current 2021–2027 cycle. The same money is available to every EU country — and whoever moves first sets the standard for the whole region. Lithuania has both the funding channels and the talent to do it first. The question isn't ":
    "Europa finansuoja suverenios sveikatos ir biotechnologijų infrastruktūros kūrimą per dabartinį 2021–2027 m. ciklą. Tie patys pinigai prieinami kiekvienai ES šaliai, o tas, kas pajuda pirmas, nustato standartą visam regionui. Lietuva turi ir finansavimo kanalus, ir talentus tai padaryti pirmoji. Klausimas ne ",
  " it gets built, but ": ", ar tai bus sukurta, o ",
  " and ": " ir ",
  "EU Grant": "ES dotacija",
  "AI Technology": "DI technologija",
  "First-Mover Edge": "Pirmaujančiojo pranašumas",
  "Lithuanian Talent": "Lietuvos talentai",
  NOW: "DABAR",
  "Full call details on the EU portal":
    "Visa kvietimo informacija ES portale",
  // Why-now details
  "The matched call": "Atitinkantis kvietimas",
  "The EU grant reads as if it were written for what we build.":
    "ES dotacija atrodo tarsi parašyta tam, ką kuriame.",
  "A Horizon Europe call (Research & Innovation Action) under Cluster 1 “Health.” Its scope reads almost line-for-line like the GenoLink platform:":
    "Europos horizonto kvietimas (mokslinių tyrimų ir inovacijų veikla) pagal 1 klasterį „Sveikata“. Jo aprašymas beveik žodis į žodį atitinka GenoLink platformą:",
  "Pharmacogenomics, PK & PD to predict and prevent adverse drug reactions in polypharmacy":
    "Farmakogenomika, farmakokinetika ir farmakodinamika nepageidaujamoms reakcijoms numatyti ir išvengti polifarmacijos atveju",
  "Personalised-medicine strategies — biomarkers, targeted therapy, patient stratification":
    "Personalizuotos medicinos strategijos – biožymenys, taikinių terapija, pacientų stratifikacija",
  "Drug–drug, drug–gene and drug–food interaction biomarkers":
    "Vaistų–vaistų, vaistų–genų ir vaistų–maisto sąveikos biožymenys",
  "Prescribing powered by EHR, AI and clinical decision-support systems":
    "Receptų skyrimas, paremtas e. sveikatos įrašais, DI ir klinikinių sprendimų palaikymo sistemomis",
  "What a single project can secure": "Ką gali gauti vienas projektas",
  "direct EU contribution, 100% of eligible costs covered":
    "tiesioginis ES finansavimas, padengiama 100 % tinkamų išlaidų",
  Technology: "Technologija",
  "A system that thinks alongside the clinician.":
    "Sistema, kuri mąsto kartu su gydytoju.",
  "The model is trained on pharmacogenomic data and assists right at the point of prescribing:":
    "Modelis apmokytas farmakogenominiais duomenimis ir padeda būtent skiriant receptą:",
  "Genetic profile and lab interpretation in seconds":
    "Genetinio profilio ir tyrimų interpretacija per sekundes",
  "Drug–gene and drug–drug interaction checks":
    "Vaistų–genų ir vaistų–vaistų sąveikos patikra",
  "Dosing recommendations tailored to each patient":
    "Dozavimo rekomendacijos, pritaikytos kiekvienam pacientui",
  "The decision stays with the clinician — the system assists, not replaces":
    "Sprendimą priima gydytojas – sistema padeda, o ne pakeičia",
  "Decision-support speed": "Sprendimų palaikymo greitis",
  Seconds: "Sekundės",
  "instead of hours of manual interpretation":
    "vietoj valandų rankinio aiškinimo",
  Position: "Pozicija",
  "Whoever builds first sets the standard.":
    "Kas sukuria pirmas, tas nustato standartą.",
  "The region's pharmacogenomics infrastructure is built once. After that, everyone plugs into it:":
    "Regiono farmakogenomikos infrastruktūra sukuriama vieną kartą. Po to prie jos jungiasi visi:",
  "The reference platform clinics and systems integrate with (eSveikata, etc.)":
    "Etaloninė platforma, su kuria integruojasi klinikos ir sistemos (eSveikata ir kt.)",
  "A regional PGx database as a strategic asset":
    "Regioninė farmakogenomikos duomenų bazė kaip strateginis turtas",
  "The position holds for a decade ahead":
    "Pozicija išlieka dešimtmetį į priekį",
  "The alternative — licensing someone else's solution later":
    "Alternatyva – vėliau licencijuoti svetimą sprendimą",
  "The advantage of entering now": "Įsitraukimo dabar pranašumas",
  "1st": "1-as",
  "becomes the region's reference": "tampa regiono etalonu",
  Team: "Komanda",
  "Lithuania has enough people to build this.":
    "Lietuvoje pakanka žmonių tai sukurti.",
  "Lithuania is one of Europe's most developed life-sciences markets:":
    "Lietuva – viena labiausiai išsivysčiusių gyvybės mokslų rinkų Europoje:",
  "Strong universities and specialised departments":
    "Stiprūs universitetai ir specializuoti padaliniai",
  "A deep biotech and engineering talent pool":
    "Gilus biotechnologijų ir inžinerijos talentų rezervas",
  "A world-class, export-oriented sector":
    "Pasaulinio lygio, į eksportą orientuotas sektorius",
  "Specialists are easy to bring onto the project locally":
    "Specialistus lengva pritraukti į projektą vietoje",
  "Talent base": "Talentų bazė",
  "Life sciences": "Gyvybės mokslai",
  "one of the EU's fastest-growing sectors":
    "vienas sparčiausiai augančių ES sektorių",
  "EU contribution per project": "ES finansavimas vienam projektui",
  "of eligible costs covered (RIA)": "tinkamų išlaidų padengiama (RIA)",
  "projects to be funded": "finansuotini projektai",
  "total topic budget": "bendras temos biudžetas",

  // ── EU grant ──
  "Horizon Europe": "Europos horizontas",
  "EU funding matched to what we build":
    "ES finansavimas, atitinkantis tai, ką kuriame",
  "A matched EU Research & Innovation Action under Cluster 1 Health. Direct contribution covering 100% of eligible costs — and the call scope reads almost line-for-line like the GenoLink platform.":
    "Atitinkanti ES mokslinių tyrimų ir inovacijų veikla pagal 1 klasterį „Sveikata“. Tiesioginis finansavimas, padengiantis 100 % tinkamų išlaidų – o kvietimo aprašymas beveik žodis į žodį atitinka GenoLink platformą.",
  "Horizon Europe — EU grant per project":
    "Europos horizontas – ES dotacija vienam projektui",
  "Inovacijų agentūra — Lithuanian innovation funding":
    "Inovacijų agentūra – Lietuvos inovacijų finansavimas",
  "Eurostars 3 / Eureka — cross-border R&D":
    "Eurostars 3 / Eureka – tarpvalstybiniai MTEP",

  // ── Vision ──
  "Our goals": "Mūsų tikslai",
  "Make genetics the backbone of every prescription — and grow from there into the medicine of the future.":
    "Padaryti genetiką kiekvieno recepto pagrindu – ir iš to išaugti į ateities mediciną.",
  "We're building a system that uses genetic testing to help doctors make precise decisions — which drug, at what dose, and in what combination is safe for each patient. This reduces ineffective treatment, adverse reactions, and dosing errors — and, for the healthcare system, the cost of medications and the load on hospitals.":
    "Kuriame sistemą, kuri pasitelkdama genetinius tyrimus padeda gydytojams priimti tikslius sprendimus – koks vaistas, kokia doze ir kokiame derinyje yra saugus kiekvienam pacientui. Tai mažina neefektyvų gydymą, nepageidaujamas reakcijas ir dozavimo klaidas, o sveikatos sistemai – vaistų išlaidas ir ligoninių apkrovą.",
  "Stage 1 · Core": "1 etapas · Pagrindas",
  "Stage 2": "2 etapas",
  "Stage 3": "3 etapas",
  "AI recommendation platform": "DI rekomendacijų platforma",
  "Analyzes the patient's genetic data and, at the moment of prescribing, helps the doctor choose the right drug and dose — and flags dangerous drug combinations.":
    "Analizuoja paciento genetinius duomenis ir skiriant receptą padeda gydytojui parinkti tinkamą vaistą bei dozę – ir įspėja apie pavojingus vaistų derinius.",
  "In-house laboratory": "Nuosava laboratorija",
  "A full cycle of genetic testing in Lithuania — from sample collection to interpretation and recommendations. Quality control at every step, fast turnaround, and sovereign data.":
    "Visas genetinių tyrimų ciklas Lietuvoje – nuo mėginio paėmimo iki interpretacijos ir rekomendacijų. Kokybės kontrolė kiekviename etape, greitas atlikimas ir suvereni duomenų laikysena.",
  "New fields and a scientific base": "Naujos sritys ir mokslinė bazė",
  "Building on a working system and accumulated data — expansion into new areas of medicine, new tests, and joint research with universities and clinics.":
    "Remiantis veikiančia sistema ir sukauptais duomenimis – plėtra į naujas medicinos sritis, nauji tyrimai ir bendri moksliniai darbai su universitetais ir klinikomis.",
  "For patients": "Pacientams",
  "Treatment matched to the individual genome":
    "Gydymas, pritaikytas individualiam genomui",
  "The right drug and dose from the first prescription":
    "Tinkamas vaistas ir dozė nuo pirmo recepto",
  "Fewer adverse reactions and ineffective treatments":
    "Mažiau nepageidaujamų reakcijų ir neefektyvaus gydymo",
  "For doctors": "Gydytojams",
  "A ready recommendation at the moment of prescribing":
    "Paruošta rekomendacija skiriant receptą",
  "No manual interpretation of genetics":
    "Be rankinio genetikos aiškinimo",
  "Lower risk, greater confidence in the decision":
    "Mažesnė rizika, didesnis pasitikėjimas sprendimu",
  "For the healthcare system": "Sveikatos sistemai",
  "Lower costs for complications and therapy selection":
    "Mažesnės komplikacijų ir gydymo parinkimo išlaidos",
  "Shorter hospital waiting times": "Trumpesnės eilės ligoninėse",
  "Citizens' data kept under control in Lithuania":
    "Piliečių duomenys lieka kontroliuojami Lietuvoje",
  "Why we do this": "Kodėl mes tai darome",

  // ── Team ──
  "Our team": "Mūsų komanda",
  "Why us?": "Kodėl mes?",
  "Young team combining expertise in Medicine, Biochemistry, and Bioinformatics, with hands-on experience in personalized medicine at AskBio and Bayer Pharmaceuticals. Our background ranges from VC-backed startups to leading teams and companies with multimillion-euro annual revenues. We believe the time for personalized healthcare is now, and with your support, we can make it more effective, efficient, and accessible for everyone.":
    "Jauna komanda, jungianti medicinos, biochemijos ir bioinformatikos kompetencijas bei praktinę personalizuotos medicinos patirtį „AskBio“ ir „Bayer Pharmaceuticals“. Mūsų patirtis – nuo rizikos kapitalo finansuojamų startuolių iki komandų ir įmonių su daugiamilijonine metine apyvarta vadovavimo. Tikime, kad personalizuotos sveikatos priežiūros laikas yra dabar, ir su jūsų parama galime padaryti ją veiksmingesnę, efektyvesnę ir prieinamesnę visiems.",
  "MSc Bioinformatics": "Bioinformatikos magistras",
  "MD Medicine": "Medicinos gydytojas",
  "Medical Student": "Medicinos studentas",
  "Serial entrepreneur": "Serijinis verslininkas",
  "Scaled Ventures Beyond €3M+/yr": "Įmones išauginęs iki 3+ mln. €/m.",

  // ── More features ──
  "Precision Prescribing": "Tikslus receptų skyrimas",
  "Medication Safety": "Vaistų saugumas",
  Pharmacogenomics: "Farmakogenomika",
  "Personalised Medicine": "Personalizuota medicina",
  "Polypharmacy Intelligence": "Polifarmacijos analizė",
  "Clinical Decision Support": "Klinikinių sprendimų palaikymas",
  "Population Health Analytics": "Populiacijos sveikatos analitika",
  "Healthcare Efficiency": "Sveikatos sistemos efektyvumas",
  "Treatment Optimization": "Gydymo optimizavimas",
  "Real-Time Alerts": "Įspėjimai realiu laiku",
  "PGx Interpretation": "Farmakogenominė interpretacija",
  "Outcome Analytics": "Rezultatų analitika",

  // ── Contact ──
  "Questions about GenoLink, partnerships, or a demo? Send us a message and we'll get back to you.":
    "Klausimai apie GenoLink, partnerystę ar demonstraciją? Parašykite mums ir mes atsakysime.",
  "We aim to respond within one business day.":
    "Stengiamės atsakyti per vieną darbo dieną.",
  Email: "El. paštas",
  Phone: "Telefonas",
  "Full name": "Vardas ir pavardė",
  Message: "Žinutė",
  Submit: "Siųsti",
  "Jane Doe": "Vardenis Pavardenis",
  "jane@clinic.com": "vardas@klinika.lt",
  "How can we help?": "Kuo galime padėti?",

  // ── Footer ──
  "All rights reserved.": "Visos teisės saugomos.",

  // ── PGx report modal ──
  "Pharmacogenomic profile": "Farmakogenominis profilis",
  "Drug-gene interaction report · CPIC / FDA-guided":
    "Vaisto–geno sąveikos ataskaita · pagal CPIC / FDA",
  "Demonstration only. Synthetic data — not for diagnostic or prescribing use.":
    "Tik demonstracija. Sintetiniai duomenys – ne diagnostikai ar receptams.",
  Patient: "Pacientas",
  Indication: "Indikacija",
  Sample: "Mėginys",
  Method: "Metodas",
  "V. Pavardenis · 41 y": "V. Pavardenis · 41 m.",
  "Secondary HTN (I15)": "Antrinė hipertenzija (I15)",
  "Buccal swab": "Skruosto tepinėlis",
  "Targeted NGS + CNV": "Tikslinis NGS + CNV",
  "Genotype results": "Genotipo rezultatai",
  Gene: "Genas",
  Diplotype: "Diplotipas",
  Activity: "Aktyvumas",
  Phenotype: "Fenotipas",
  "Poor metabolizer": "Silpnas metabolizuotojas",
  Intermediate: "Tarpinis",
  Normal: "Normalus",
  "Non-expresser": "Neekspresuojantis",
  "Drug recommendations": "Vaistų rekomendacijos",
  "Primary finding · current therapy":
    "Pagrindinė išvada · dabartinė terapija",
  "(CYP2D6 — poor metabolizer)": "(CYP2D6 – silpnas metabolizuotojas)",
  "Exposure:": "Ekspozicija:",
  "CYP2D6 poor metabolizer → ~10–15× higher steady-state levels, higher bioavailability, longer half-life.":
    "CYP2D6 silpnas metabolizuotojas → ~10–15× didesnė pusiausvyrinė koncentracija, didesnis biologinis prieinamumas, ilgesnis pusinės eliminacijos laikas.",
  "Clinical effect:": "Klinikinis poveikis:",
  "Trials show similar blood-pressure response and safety vs. normal metabolizers.":
    "Tyrimai rodo panašų kraujospūdžio atsaką ir saugumą kaip ir normaliems metabolizuotojams.",
  "Label:": "Etiketė:",
  "No mandatory dose adjustment required.":
    "Privalomo dozės koregavimo nereikia.",
  "Clinical suggestion": "Klinikinė rekomendacija",
  "Start at the lowest dose, titrate slowly to blood-pressure response, and monitor for bradycardia, hypotension, or fatigue. Review concurrent CYP2D6 inhibitors (e.g. paroxetine, fluoxetine, bupropion).":
    "Pradėkite nuo mažiausios dozės, lėtai titruokite pagal kraujospūdžio atsaką ir stebėkite dėl bradikardijos, hipotenzijos ar nuovargio. Įvertinkite kartu vartojamus CYP2D6 inhibitorius (pvz., paroksetiną, fluoksetiną, bupropioną).",
  Codeine: "Kodeinas",
  Metoprolol: "Metoprololis",
  Clopidogrel: "Klopidogrelis",
  Warfarin: "Varfarinas",
  "CPIC level A · strong": "CPIC A lygis · stiprus",
  "CPIC level A": "CPIC A lygis",
  "Poor analgesia due to minimal morphine conversion.":
    "Silpnas skausmo malšinimas dėl minimalios konversijos į morfiną.",
  "Avoid — use a non-codeine analgesic.":
    "Venkite – rinkitės kodeino neturintį analgetiką.",
  "Raised plasma levels as an alternative β-blocker.":
    "Padidėjusi koncentracija plazmoje kaip alternatyvaus β blokatoriaus.",
  "Use lowest effective dose; monitor heart rate.":
    "Vartokite mažiausią veiksmingą dozę; stebėkite širdies ritmą.",
  "Reduced antiplatelet activation.":
    "Sumažėjusi antitrombocitinė aktyvacija.",
  "Prefer prasugrel or ticagrelor if an antiplatelet is needed.":
    "Jei reikia antitrombocitinio vaisto, pirmenybė prasugreliui arba tikagrelorui.",
  "No CYP2C9-driven change.": "Nėra CYP2C9 sukelto pokyčio.",
  "Dose per standard algorithm (also consider VKORC1).":
    "Dozuokite pagal standartinį algoritmą (taip pat įvertinkite VKORC1).",
  "Avoid / major change": "Venkite / didelis pokytis",
  "Adjust / monitor": "Koreguokite / stebėkite",
  "Standard dosing": "Standartinis dozavimas",
  "Reflects tested variants only. Interpretation evolves with guidelines; drug interactions can alter phenotype. Not a substitute for clinical judgment.":
    "Atspindi tik ištirtus variantus. Interpretacija kinta tobulėjant gairėms; vaistų sąveikos gali pakeisti fenotipą. Nepakeičia gydytojo sprendimo.",
};
