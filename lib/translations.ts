// Литовские переводы. Ключ — английский исходный текст; если ключа нет,
// показывается английский (fallback). См. lib/i18n.tsx.

export const LT: Record<string, string> = {
  // ── Navbar / common ──
  Solution: "Sprendimas",
  Platform: "Platforma",
  "Contact Us": "Susisiekite",
  "Contact us": "Susisiekite",
  "Read more": "Plačiau",
  Source: "Šaltinis",

  // ── Hero ──
  "Your DNA": "Jūsų genai",
  "Doesn't Change.": "nesikeičia.",
  "Prescribing Should.": "Gydymas turi keistis.",
  "Clinical decision support powered by pharmacogenomics and AI":
    "Klinikinių sprendimų palaikymo platforma, paremta farmakogenenetika ir dirbtiniu intelektu",

  // ── Problem ──
  "The problem": "Problema",
  "1 in 12": "1 iš 12",
  "hospital admissions are related to adverse drug reactions":
    "hospitalizacijų yra susijusi su nepageidaujamomis reakcijomis į vaistus",
  "ADR-related admissions": "hospitalizacijų dėl NRV",
  "of medication-related admissions predictable or preventable":
    "su vaistais susijusių hospitalizacijų galima numatyti arba išvengti",
  "estimated hospitalisations/year in Lithuania":
    "su vaistais susijusių hospitalizacijų per metus Lietuvoje",
  "8.3% ADR-related admissions":
    "8,3 % hospitalizacijų dėl reakcijų į vaistus",
  "Approximately 1 in 12 hospital admissions are related to adverse drug reactions.":
    "Maždaug 1 iš 12 hospitalizacijų yra susijusi su nepageidaujamomis reakcijomis į vaistus.",
  "80% predictable or preventable": "80 % galima numatyti arba išvengti",
  "80% of medication-related admissions may be predictable or preventable.":
    "80 % su vaistais susijusių hospitalizacijų galima numatyti arba jų išvengti.",
  "~46,700 ADR hospitalisations/year":
    "~46 700 su vaistais susijusių hospitalizacijų per metus Lietuvojes",
  "560,362 annual Lithuanian hospital discharges × 8.33% (1 in 12) ≈ 46,700. Estimate calculated from published discharge volume and ADR-related admission prevalence.":
    "560 362 metiniai išrašymai iš Lietuvos ligoninių × 8,33 % (1 iš 12) ≈ 46 700. Skaičiavimas atliktas remiantis paskelbtais išrašymų apimties ir hospitalizacijų dėl nepageidaujamų reakcijų į vaistus paplitimo duomenimis.",

  // ── Solution ──
  "The solution": "Sprendimas",
  "One Profile.": "Vienas profilis.",
  "A Lifetime of Smarter Prescribing.":
    "Tikslesnis vaistų skyrimas visam gyvenimui.",
  "Once a pharmacogenomic profile is generated, it can guide medication selection, dosing, and safety decisions whenever a relevant drug is prescribed.":
    "Sukūrus farmakogenetinį profilį, jis gali padėti priimti vaistų parinkimo, dozavimo ir saugumo sprendimus kaskart, kai pacientui skiriamas aktualus vaistas.",
  "Sequence Once": "Vienas tyrimas",
  "A one-time sample is sequenced to identify the clinically actionable genetic variants that influence drug response. No repeat testing — the same data supports prescribing decisions for years to come.":
    "Paciento mėginys ištiriamas vieną kartą, kad būtų nustatyti kliniškai svarbūs genetiniai variantai, galintys turėti įtakos vaistų veiksmingumui, dozavimui ir saugumui. Pakartotinio tyrimo nereikia — tie patys duomenys gali būti naudojami priimant vaistų skyrimo sprendimus ir ateityje.",
  "Interpret With Bioinformatics": "Duomenys, pritaikyti klinikai",
  "An AI-assisted analysis layer processes the raw genomic data, flags clinically relevant variants, and structures them into standardized, prescribing-ready pharmacogenomic insights.":
    "DI ir bioinformatikos analizė apdoroja paciento genetinius duomenis, atrenka kliniškai reikšmingus variantus ir paverčia juos aiškiomis farmakogenetinėmis įžvalgomis, kurios padeda gydytojui priimti vaistų skyrimo sprendimus.",
  "Generate a Pharmacogenomic Passport":
    "Sukuriamas farmakogenenetinis pasas",
  "The result is a lifelong profile that consolidates each patient's medication-relevant genetics into a single, portable record clinicians can reference at the point of care.":
    "Sukuriamas ilgalaikis paciento profilis, kuriame genetinė informacija apie vaistų veikimą pateikiama aiškiai ir vienoje vietoje, kad gydytojas galėtų ja naudotis skirdamas gydymą.",
  "Integrate With Any Platform": "Integracija su sveikatos sistemomis",
  "Profiles surface across healthcare settings and systems — supporting consistent, evidence-based prescribing at both the individual and population level.":
    "Profiliai gali būti naudojami skirtingose gydymo įstaigose ir sveikatos sistemose, kad vaistai būtų skiriami nuosekliai, remiantis įrodymais – tiek konkrečiam pacientui, tiek visos populiacijos lygmeniu.",

  // ── Macbook ──
  "How could this look in practice?": "Kaip tai atrodytų praktikoje?",
  "Skip to the good part": "Prie esmės",
  "Pharmacogenomic Alert": "Farmakogenominis įspėjimas",
  "Pharmacogenomic Alert: CYP2D6 Poor Metabolizer":
    "CYP2D6: lėtas metabolizatorius",
  "Reduced CYP2D6 activity may increase nebivolol exposure.":
    "Sumažėjęs CYP2D6 aktyvumas gali padidinti nebivololio koncentraciją.",
  "Nebivolol is primarily metabolized by CYP2D6. This patient has significantly reduced CYP2D6 activity and may experience substantially increased nebivolol exposure.":
    "Dėl sumažėjusio CYP2D6 aktyvumo pacientas gali lėčiau metabolizuoti nebivololį. Tai gali lemti didesnę vaisto ekspoziciją ir padidėjusią nepageidaujamų reakcijų riziką.",

  // ── Metrics ──
  Impact: "Poveikis",
  "The measurable impact of genetics-aware prescribing.":
    "Genetika pagrįsto vaistų skyrimo poveikis — išmatuojamas.",
  "30% fewer serious adverse drug reactions":
    "30% mažiau sunkių nepageidaujamų reakcijų į vaistus",
  "fewer serious adverse drug reactions":
    "mažiau sunkių nepageidaujamų reakcijų į vaistus",
  "95% of people carry a PGx variant that can inform prescribing":
    "95% žmonių turi genetinį variantą, galintį padėti priimti vaistų skyrimo sprendimus",
  "of people carry a PGx variant that can inform prescribing":
    "žmonių turi genetinį variantą, galintį padėti priimti vaistų skyrimo sprendimus",
  "1 in 4 primary-care prescriptions are PGx-relevant":
    "1 iš 4 receptų yra farmakogenetiškai reikšmingas",
  "primary-care prescriptions are PGx-relevant":
    "pirminės priežiūros receptų yra farmakogenetiškai reikšmingi",
  "36% shorter hospital stays when prescribing is PGx-guided":
    "36% trumpesnė hospitalizacija taikant farmakogenomiką",
  "shorter hospital stays when prescribing is PGx-guided":
    "trumpesnė hospitalizacija taikant farmakogenomiką",
  "≈€2,500 per preventable ADR-related hospitalisation":
    "≈€2 500 už vieną išvengiamą hospitalizaciją dėl NRV",
  "per preventable ADR-related hospitalisation":
    "už vieną išvengiamą hospitalizaciją dėl NRV",
  "€5–10M estimated annual savings for Lithuania's healthcare system":
    "€5–10M galimų metinių sutaupymų Lietuvos sveikatos sistemai",
  "estimated annual savings for Lithuania's healthcare system":
    "galimų metinių sutaupymų Lietuvos sveikatos sistemai",

  // ── Why now ──
  "Why now": "Kodėl dabar",
  "Limited Window": "Galimybių langas",
  whether: "ar tai bus sukurta",
  who: "kas tai padarys",
  when: "pirmas",
  "Europe is funding the build-out of sovereign health and biotech infrastructure across the current 2021–2027 cycle. The same money is available to every EU country — and whoever moves first sets the standard for the whole region. Lithuania has both the funding channels and the talent to do it first. The question isn't ":
    "Europa šiuo metu finansuoja nacionalinės sveikatos ir biotechnologijų infrastruktūros kūrimą 2021–2027 m. laikotarpiu. Šios lėšos prieinamos visoms ES šalims — todėl standartą regione nustatys tie, kurie judės pirmi. Lietuva turi ir finansavimo kanalus, ir specialistus tai padaryti pirmoji. Klausimas nebe ",
  " it gets built, but ": ", o ",
  " and ": " ",
  "EU Grant": "ES finansavimas",
  "AI Technology": "DI technologijos",
  "First-Mover Edge": "Strateginė lyderystė",
  "Lithuanian Talent": "Lietuvos potencialas",
  NOW: "DABAR",
  "Full call details on the EU portal":
    "Peržiūrėti kvietimą ES portale",
  // Why-now details
  "The matched call": "Tinkamas projektas",
  "The EU grant reads as if it were written for what we build.":
    "ES finansavimo kryptis sutampa su mūsų kuriamu sprendimu.",
  "A Horizon Europe call (Research & Innovation Action) under Cluster 1 \u201cHealth.\u201d Its scope reads almost line-for-line like the GenoLink platform:":
    "„Horizon Europe“ kvietimas pagal 1 klasterį „Health“ beveik tiesiogiai atitinka „GenoLink“ platformos kryptį:",
  "Pharmacogenomics, PK & PD to predict and prevent adverse drug reactions in polypharmacy":
    "Farmakogenetika, farmakokinetika ir farmakodinamika, siekiant prognozuoti ir mažinti nepageidaujamas reakcijas į vaistus polifarmacijos atveju",
  "Personalised-medicine strategies — biomarkers, targeted therapy, patient stratification":
    "Personalizuotos medicinos strategijos: biomarkeriai, tikslinė terapija, pacientų stratifikavimas",
  "Drug–drug, drug–gene and drug–food interaction biomarkers":
    "Vaistų–vaistų, vaistų–genų ir vaistų–maisto sąveikų biomarkeriai",
  "Prescribing powered by EHR, AI and clinical decision-support systems":
    "Vaistų skyrimas, paremtas EHR, DI ir klinikinių sprendimų palaikymo sistemomis",
  "What a single project can secure": "Ką gali užtikrinti vienas projektas",
  "direct EU contribution, 100% of eligible costs covered":
    "tiesioginis ES finansavimas, padengiama 100% išlaidų",
  "€8–10M": "€8–10M",
  "of eligible costs covered (RiA)": "tinkamų išlaidų padengimas",
  "~€38M": "~38 mln. €",
  Technology: "Technologija",
  "A system that thinks alongside the clinician.":
    "Sistema, kuri dirba kartu su gydytoju.",
  "The model is trained on pharmacogenomic data and assists right at the point of prescribing:":
    "Modelis apmokytas farmakogenetiniais duomenimis ir padeda sprendimo priėmimo momentu — kai skiriamas vaistas:",
  "Genetic profile and lab interpretation in seconds":
    "Genetinio profilio ir laboratorinių duomenų interpretacija per kelias sekundes",
  "Drug–gene and drug–drug interaction checks":
    "Vaistų–genų ir vaistų–vaistų sąveikų patikra",
  "Dosing recommendations tailored to each patient":
    "Dozavimo rekomendacijos, pritaikytos konkrečiam pacientui",
  "The decision stays with the clinician — the system assists, not replaces":
    "Sprendimą priima gydytojas — sistema padeda, bet jo nepakeičia",
  "Decision-support speed": "Sprendimų greitis",
  Seconds: "Sekundės",
  "instead of hours of manual interpretation":
    "vietoje valandų rankinės interpretacijos",
  Position: "Pozicija",
  "Whoever builds first sets the standard.":
    "Kas sukuria pirmas, tas nustato standartą.",
  "The region's pharmacogenomics infrastructure is built once. After that, everyone plugs into it:":
    "Regioninė farmakogenomikos infrastruktūra kuriama vieną kartą. Vėliau prie jos jungiasi gydymo įstaigos ir sistemos:",
  "The reference platform clinics and systems integrate with (eSveikata, etc.)":
    "Referencinė platforma, su kuria integruojasi klinikos ir sistemos, įskaitant e. sveikatą",
  "A regional PGx database as a strategic asset":
    "Regioninė farmakogenomikos duomenų bazė kaip strateginis turtas",
  "The position holds for a decade ahead":
    "Pozicija išlieka aktuali ateinančiam dešimtmečiui",
  "The alternative — licensing someone else's solution later":
    "Alternatyva — vėliau licencijuoti kito tiekėjo sprendimą",
  "The advantage of entering now": "Strateginis momentas",
  "1st": "1-ieji",
  "becomes the region's reference": "nustato kryptį",
  Team: "Komanda",
  "Lithuania has enough people to build this.":
    "Lietuva turi žmonių šiai infrastruktūrai sukurti.",
  "Lithuania is one of Europe's most developed life-sciences markets:":
    "Lietuva yra viena pažangiausių gyvybės mokslų rinkų Europoje:",
  "Strong universities and specialised departments":
    "Stiprūs universitetai ir specializuoti padaliniai",
  "A deep biotech and engineering talent pool":
    "Gilus biotechnologijų ir inžinerijos talentų rezervas",
  "A world-class, export-oriented sector":
    "Pasaulinio lygio, į eksportą orientuotas sektorius",
  "Specialists are easy to bring onto the project locally":
    "Specialistus galima įtraukti į projektą vietoje",
  "Talent base": "Kompetencijų bazė",
  "Life sciences": "Gyvybės mokslai",
  "one of the EU's fastest-growing sectors":
    "vienas sparčiausiai augančių ES sektorių",
  "EU contribution per project": "ES finansavimas projektui",
  "of eligible costs covered (RIA)": "išlaidų padengiama (RIA)",
  "projects to be funded": "finansuojami projektai",
  "total topic budget": "bendras temos biudžetas",

  // ── EU grant ──
  "Horizon Europe": "Horizon Europe",
  "EU funding matched to what we build":
    "ES finansavimas tiksliai atitinka tai, ką kuriame",
  "A matched EU Research & Innovation Action under Cluster 1 Health. Direct contribution covering 100% of eligible costs — and the call scope reads almost line-for-line like the GenoLink platform.":
    "„Horizon Europe“ 1 klasterio „Sveikata“ mokslinių tyrimų ir inovacijų kvietimas numato tiesioginį finansavimą, padengiantį 100 % tinkamų išlaidų, o kvietimo kryptis beveik tiesiogiai sutampa su „GenoLink“ platforma.",
  "Horizon Europe — EU grant per project":
    "„Horizon Europe“ — ES dotacija vienam projektui",
  "Inovacijų agentūra — Lithuanian innovation funding":
    "Inovacijų agentūra — inovacijų finansavimas",
  "Eurostars 3 / Eureka — cross-border R&D":
    "Eurostars 3 / Eureka — tarptautiniai MTEP projektai",
  "€10M": "€10M",
  "€100K": "€100K",
  "€300K": "€300K",

  // ── Vision ──
  "Our goals": "Mūsų tikslai",
  "Make genetics the backbone of every prescription — and grow from there into the medicine of the future.":
    "Genetika turi tapti kiekvieno išrašomo vaisto pagrindu — nuo čia prasideda ateities medicina",
  "We're building a system that uses genetic testing to help doctors make precise decisions — which drug, at what dose, and in what combination is safe for each patient. This reduces ineffective treatment, adverse reactions, and dosing errors — and, for the healthcare system, the cost of medications and the load on hospitals.":
    "Kuriame sistemą, kuri naudoja genetinius tyrimus tam, kad gydytojai galėtų tiksliau nuspręsti, kuris vaistas, kokia dozė ir koks vaistų derinys yra saugiausias konkrečiam pacientui. Tai padeda mažinti neveiksmingą gydymą, nepageidaujamas reakcijas, dozavimo klaidas, o sveikatos sistemai — vaistų kaštus ir ligoninių apkrovą.",
  "Stage 1 · Core": "1 etapas · Pagrindas",
  "Stage 2": "2 etapas",
  "Stage 3": "3 etapas",
  "AI recommendation platform": "DI rekomendacijų platforma",
  "Analyzes the patient's genetic data and, at the moment of prescribing, helps the doctor choose the right drug and dose — and flags dangerous drug combinations.":
    "Analizuoja paciento genetinius duomenis ir vaisto skyrimo momentu padeda gydytojui parinkti tinkamą vaistą bei dozę, kartu įspėdama apie pavojingus vaistų derinius.",
  "In-house laboratory": "Vidinė laboratorija",
  "A full cycle of genetic testing in Lithuania — from sample collection to interpretation and recommendations. Quality control at every step, fast turnaround, and sovereign data.":
    "Pilnas genetinio tyrimo ciklas Lietuvoje — nuo mėginio paėmimo iki interpretacijos ir rekomendacijų. Kokybės kontrolė kiekviename žingsnyje, greitesni rezultatai ir saugūs vietiniai duomenys.",
  "New fields and a scientific base": "Naujos sritys ir mokslinė bazė",
  "Building on a working system and accumulated data — expansion into new areas of medicine, new tests, and joint research with universities and clinics.":
    "Remiantis veikiančia sistema ir sukauptais duomenimis, plėtra į naujas medicinos sritis, naujus tyrimus ir bendrus mokslinius projektus su universitetais bei klinikomis.",
  "For patients": "Pacientams",
  "Treatment matched to the individual genome":
    "Gydymas parenkamas pagal paciento genetinius duomenis",
  "The right drug and dose from the first prescription":
    "Tinkamas vaistas ir dozė nuo pat pirmo recepto",
  "Fewer adverse reactions and ineffective treatments":
    "Mažiau nepageidaujamų reakcijų ir neveiksmingo gydymo",
  "For doctors": "Gydytojams",
  "A ready recommendation at the moment of prescribing":
    "Aiški rekomendacija vaisto skyrimo metu",
  "No manual interpretation of genetics":
    "Nereikia rankiniu būdu aiškinti genetinių tyrimų",
  "Lower risk, greater confidence in the decision":
    "Mažesnė rizika ir daugiau užtikrintumo priimant sprendimą",
  "For the healthcare system": "Sveikatos sistemai",
  "Lower costs for complications and therapy selection":
    "Mažesnės išlaidos dėl komplikacijų ir netinkamo gydymo",
  "Shorter hospital waiting times":
    "Trumpesnės eilės ir mažesnė ligoninių apkrova",
  "Citizens' data kept under control in Lithuania":
    "Pacientų duomenys išlieka Lietuvos kontrolėje",
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
  "Precision Prescribing": "Tikslus vaistų skyrimas",
  "Medication Safety": "Vaistų vartojimo sauga",
  "Pharmacogenomics": "Farmakogenetika",
  "Personalised Medicine": "Personalizuota medicina",
  "Polypharmacy Intelligence": "Polifarmacijos analizė",
  "Clinical Decision Support": "Klinikinių sprendimų palaikymas",
  "Population Health Analytics": "Populiacijos sveikatos analitika",
  "Healthcare Efficiency": "Sveikatos sistemos efektyvumas",
  "Treatment Optimization": "Gydymo optimizavimas",
  "Real-Time Alerts": "Įspėjimai realiuoju laiku",
  "PGx Interpretation": "Farmakogenetinė interpretacija",
  "Outcome Analytics": "Gydymo rezultatų analitika",

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
  "Sending...": "Siunčiama...",
  "Email sent": "Laiškas išsiųstas",
  "Thanks — we'll be in touch soon.":
    "Ačiū — netrukus susisieksime.",
  "Something went wrong. Please try again.":
    "Kažkas nepavyko. Bandykite dar kartą.",
  "Jane Doe": "Vardenis Pavardenis",
  "jane@clinic.com": "vardas@klinika.lt",
  "How can we help?": "Kuo galime padėti?",

  // ── Footer ──
  "All rights reserved.": "Visos teisės saugomos.",

  // ── PGx report modal ──
  "Pharmacogenomic profile": "Farmakogenenetinis profilis",
  "Drug-gene interaction report · CPIC / FDA-guided":
    "Vaisto–geno sąveikų ataskaita · CPIC / FDA gairės",
  "Demonstration only. Synthetic data — not for diagnostic or prescribing use.":
    "Tik demonstraciniais tikslais. Sintetiniai duomenys – neskirta diagnostikai ar vaistų skyrimui.",
  Patient: "Pacientas",
  Indication: "Indikacija",
  Sample: "Mėginys",
  Method: "Metodas",
  "V. Pavardenis · 41 y": "V. Pavardenis · 41 m.",
  "Secondary HTN (I15)": "Antrinė hipertenzija",
  "Buccal swab": "Burnos gleivinės tepinėlis",
  "Targeted NGS + CNV": "Tikslinė NGS + CNV analizė",
  "Genotype results": "Genotipo rezultatai",
  Gene: "Genas",
  Diplotype: "Diplotipas",
  Activity: "Aktyvumas",
  Phenotype: "Fenotipas",
  "Poor metabolizer": "Lėtas metabolizatorius",
  Intermediate: "Tarpinis metabolizatorius",
  Normal: "Normalus",
  "Non-expresser": "Neekspresuoja",
  "Drug recommendations": "Vaistų rekomendacijos",
  "Primary finding · current therapy":
    "Pagrindinė išvada · taikomas gydymas",
  "FDA label - CPIC": "FDA informacija · CPIC",
  "(CYP2D6 — poor metabolizer)": "(CYP2D6 – lėtas metabolizatorius)",
  "Exposure:": "Ekspozicija:",
  "CYP2D6 poor metabolizer → ~10–15× higher steady-state levels, higher bioavailability, longer half-life.":
    "esant lėtam CYP2D6 metabolizmui, nebivololio koncentracija pastovios būsenos metu gali būti apie 10–15 kartų didesnė. Taip pat gali padidėti biologinis prieinamumas ir pailgėti pusinės eliminacijos laikas.",
  "Clinical effect:": "Klinikinis poveikis:",
  "Trials show similar blood-pressure response and safety vs. normal metabolizers.":
    "tyrimuose kraujospūdžio mažėjimas ir saugumo profilis buvo panašūs kaip pacientų, kurių CYP2D6 metabolizmas normalus.",
  "Label:": "Ženklinimas:",
  "No mandatory dose adjustment required.":
    "privalomas dozės koregavimas nenurodytas.",
  "Clinical suggestion": "KLINIKINĖ REKOMENDACIJA",
  "Start at the lowest dose, titrate slowly to blood-pressure response, and monitor for bradycardia, hypotension, or fatigue. Review concurrent CYP2D6 inhibitors (e.g. paroxetine, fluoxetine, bupropion).":
    "Pradėti nuo mažiausios dozės ir ją didinti palaipsniui pagal kraujospūdžio atsaką. Stebėti dėl bradikardijos, hipotenzijos ar nuovargio. Įvertinti kartu vartojamus CYP2D6 inhibitorius, pvz., paroksetiną, fluoksetiną ar bupropioną.",
  Codeine: "Kodeinas",
  Metoprolol: "Metoprololis",
  Clopidogrel: "Klopidogrelis",
  Warfarin: "Varfarinas",
  "CPIC level A · strong": "CPIC A lygis · stiprus",
  "CPIC level A": "CPIC A lygis",
  "Poor analgesia due to minimal morphine conversion.":
    "Silpnas analgezinis poveikis dėl labai mažos konversijos į morfiną.",
  "Avoid — use a non-codeine analgesic.":
    "Vengti — rinktis ne kodeino analgetiką.",
  "Raised plasma levels as an alternative β-blocker.":
    "Kaip alternatyvaus β blokatoriaus koncentracija plazmoje gali būti padidėjusi.",
  "Use lowest effective dose; monitor heart rate.":
    "Skirti mažiausias veiksmingsą dozę; stebėti širdies ritmą.",
  "Reduced antiplatelet activation.":
    "Sumažėjęs aktyvaus metabolito susidarymas ir antitrombocitinis poveikis.",
  "Prefer prasugrel or ticagrelor if an antiplatelet is needed.":
    "Jei reikalingas antitrombocitinis gydymas, svarstyti prasugrelių arba tikagrelorą.",
  "No CYP2C9-driven change.": "Pagal CYP2C9 pokyčių nenustatyta.",
  "Dose per standard algorithm (also consider VKORC1).":
    "Dozuoti pagal standartinį algoritmą, taip pat įvertinant VKORC1.",
  "Avoid / major change": "Vengti / reikšmingai keisti",
  "Adjust / monitor": "Koreguoti / stebėti",
  "Standard dosing": "Standartinis dozavimas",
  "Reflects tested variants only. Interpretation evolves with guidelines; drug interactions can alter phenotype. Not a substitute for clinical judgment.":
    "Rodomi tik ištirti genetiniai variantai. Interpretacija gali keistis atnaujinus klinikines gaires; vaistų sąveikos gali pakeisti fenotipą. Tai nėra klinikinio sprendimo pakaitalas.",

  // ── Metrics sources ──
  "PREPARE trial — The Lancet, 2023": "PREPARE tyrimas — The Lancet, 2023",
  "Swiss hospital cohort study": "Šveicarijos ligoninės kohortinis tyrimas",
  "Dutch primary-care implementation data": "Nyderlandų pirminės sveikatos priežiūros diegimo duomenys",
  "PREPARE: 2.4 → 1.5 days average stay": "PREPARE: vidutinė trukmė 2,4 → 1,5 dienos",
  "Modeled from PREPARE outcomes and local ADR incidence": "Modeliuota remiantis PREPARE rezultatais ir vietiniu hospitalizacijų dėl NRV dažniu",
  "Lithuanian estimate; EU average ~€5,500 (IATROSTAT-ECO, 2023)": "Lietuvos įvertis; ES vidurkis ~5 500 € (IATROSTAT-ECO, 2023)",

  // ── Metrics titles and summaries ──
  "30% fewer clinically relevant adverse drug reactions": "30 % mažiau klinikinių nepageidaujamų vaistų reakcijų",
  "The PREPARE trial — a 12-gene panel implementation study across seven European countries (n=6,944) — showed genotype-guided prescribing reduced clinically relevant ADRs by 30% (OR 0.70).":
    "PREPARE tyrimas — 12 genų panelės diegimo tyrimas septynių Europos šalių mastu (n=6 944) – parodė, kad genetika pagrįstas receptų skyrimas sumažina klinikinių nepageidaujamų vaistų reakcijų dažnį 30 % (OR 0,70).",
  "Nearly everyone carries an actionable PGx variant": "Beveik kiekvienas turi veiksmingą PGx variantą",
  "A Swiss hospital-based cohort of 1,533 patients found 97.3% carried at least one clinically actionable pharmacogenetic variant relevant to prescribing.":
    "Šveicarijos ligoninės kohortinio tyrimo (1 533 pacientai) metu nustatyta, kad 97,3 % turėjo bent vieną klinikiniam receptų skyrimui svarbų farmakogenetinį variantą.",
  "1 in 4 prescriptions carry an actionable gene-drug interaction": "1 iš 4 receptų aprašo veiksmingą vaisto-geno sąveiką",
  "In a nationwide analysis of 3.6M Dutch first prescriptions, 23.6% involved an actionable gene-drug interaction — approximately 1 in 4.":
    "Nyderlandų nacionaliniame 3,6 mln. pirmųjų receptų analizės metu nustatyta, kad 23,6 % aprašo veiksmingą vaisto-geno sąveiką – maždaug 1 iš 4.",
  "36% shorter hospitalisations": "36 % trumpesnė hospitalizacija",
  "In the U-PGx PREPARE cost-utility analysis, mean hospitalisation duration fell from 2.37 days in the control group to 1.51 days in the PGx-guided group — a 36% reduction.":
    "U-PGx PREPARE kaštų-naudos analizėje vidutinė hospitalizacijos trukmė sumažėjo nuo 2,37 dienos kontrolinėje grupėje iki 1,51 dienos PGx paremtoje grupėje – 36 % sumažėjimas.",
  "ADR hospitalisations are expensive": "Hospitalizacijos dėl nepageidaujamų vaistų reakcijų yra brangios",
  "The IATROSTAT-ECO study estimated each adverse-drug-reaction-related hospital admission in France costs ≈€5,974. The Lithuanian estimate of ≈€2,500 is a local adjustment of this EU benchmark.":
    "IATROSTAT-ECO tyrime nustatyta, kad Prancūzijoje kiekviena hospitalizacija dėl nepageidaujamos vaisto reakcijos kainuoja apie 5 974 €. Lietuvos įvertis (~2 500 €) yra vietinis šio ES vidurkio koregavimas.",
  "€5–10M estimated annual savings": "≈5–10 mln. € numatyta metinė sutaupa",
  "Estimated annual savings for Lithuania's healthcare system, modeled from PREPARE trial outcomes and local adverse drug reaction incidence data.":
    "Numatyta Lietuvos sveikatos sistemos metinė sutaupa, modeliuota remiantis PREPARE tyrimo rezultatais ir vietiniu nepageidaujamų vaistų reakcijų incidencijos duomenimis.",
};

