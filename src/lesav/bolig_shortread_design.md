# Design-spec: Boligmarkedet på 1 minutt

## Prosjektnavn
Boligmarkedet på 1 minutt – interaktiv scrollytale om det norske boligmarkedet.

## Formål
Fortelle en kort, visuelt sterk historie om utviklingen i det norske boligmarkedet ved hjelp av scrollytelling, enkle animasjoner og datavisualisering. Brukeren skal forstå:
- Hvordan boligprisene har utviklet seg
- Hvem som sliter mest med å komme inn på markedet
- Hvor presset er størst
- Hvordan renter påvirker kjøpekraft

Nettsiden skal være kort, lett å scrolle gjennom og fungere som en "shortread spesial".

## Teknologi og rammer
- React + Vite
- TypeScript
- GSAP + ScrollTrigger (parallax, pinned/sticky, timelines)
- Framer Motion (fade, slide, count-up)
- Recharts (linjediagram + stolpediagram)
- react-markdown (tekstinnhold fra .md-fil)
- JSON-filer for data
- Mobil først, responsivt til desktop

---

## Struktur – seksjoner
Nettsiden består av én vertikal scrollytale-side med seks hovedseksjoner. Hver seksjon er en egen React-komponent.

1. **HookIntro** – hero med parallax
2. **SectionPrices** – prisutvikling nasjonalt
3. **SectionGroups** – hvem sliter mest (aldersgrupper)
4. **SectionMap** – pressområder i Norge
5. **SectionRates** – renter, lån og kjøpekraft
6. **SectionSummary** – kort oppsummering

Alle seksjoner skal ha:
- Klar visuell start/slutt
- God luft (padding/margin)
- Minst full skjermhøyde på mobil (`min-height: 100vh`)

---

## 1. HookIntro – «Norge på bolig-berget»
**Mål:** Fange oppmerksomhet med én gang og gi kontekst.

**Innhold (tekst):**
- Stor tittel: «Boligmarkedet på 1 minutt»
- Undertittel: Kort setning som peker på at det har blitt dyrere og vanskeligere å komme inn på markedet (tekst fylles inn senere fra Markdown).
- Liten undertekst/teaser: 1–2 linjer (placeholder nå).

**Layout:**
- Fullskjermseksjon (minst `min-h-screen`).
- Tittel og undertittel sentrert vertikalt, gjerne litt over midten.
- En stilisert bakgrunn (gradient + enkel bysilhuett eller blokker som kan bevege seg).
- Scroll-indikator nederst (f.eks. liten pil med «scroll» under).

**Animasjon:**
- Parallax på bakgrunn (GSAP ScrollTrigger): bakgrunnselementer beveger seg litt saktere enn scroll.
- Tittel og undertittel fader inn når brukeren begynner å scrolle (Framer Motion).
- Scroll-indikator kan ha en liten loopende bevegelse (opp/ned).

---

## 2. SectionPrices – «Hvor mye har prisene steget?»
**Mål:** Vise prisvekst på en enkel og forståelig måte.

**Innhold:**
- Overskrift: «Hvor mye har prisene steget?»
- 2–3 korte setninger (fra Markdown) som forklarer utviklingen kort.
- Ett nøkkeltall, f.eks. «+X % siste 10 år» – denne verdien leses fra JSON.
- Linjediagram med prisindeks over tid (f.eks. år og indeks).

**Layout:**
- På desktop: tekst til venstre, graf til høyre.
- På mobil: tekst på toppen, graf under.

**Data:**
- Hentes fra `src/data/priceData.json`.
- Strukturen kan være f.eks.: `{ "year": 2010, "index": 85 }`.

**Animasjon:**
- Hele seksjonen fader inn når den kommer i viewport.
- Nøkkeltallet animeres med count-up fra 0 til verdi.
- Linjegrafen tegnes inn (f.eks. animasjon på linjen ved første visning).

---

## 3. SectionGroups – «Hvem sliter mest?»
**Mål:** Gjøre det tydelig hvilke grupper som har det vanskeligst på boligmarkedet.

**Innhold:**
- Overskrift: «Hvem sliter mest?»
- Kort forklarende tekst (Markdown).
- Stolpediagram med 2–4 grupper (f.eks. 18–29, 30–39, 40–59, 60+).
- Under/ved siden: små informasjonskort per gruppe med 1–2 setninger hver (tekst kan være placeholder først).

**Layout:**
- Overskrift og forklaring øverst.
- Bar chart midt i seksjonen.
- Cards under på mobil, ved siden på større skjermer.

**Data:**
- Hentes fra `src/data/ageGroups.json`.
- Struktur f.eks.: `{ "group": "18-29", "share_struggling": 0.45 }`.

**Animasjon:**
- Cards slider inn fra siden når seksjonen aktiveres.
- Stolpediagrammet animeres fra 0 til faktisk høyde ved første visning.

---

## 4. SectionMap – «Hvor er presset størst?»
**Mål:** Visualisere geografiske pressområder på en enkel måte.

**Innhold:**
- Overskrift: «Hvor er presset størst?»
- Kort tekst (Markdown) om at enkelte byer/områder er spesielt presset.
- Et stilisert kart over Norge eller en enkel representasjon med 3–4 hotspots (f.eks. Oslo, Bergen, Trondheim og én til).
- Hver hotspot har:
  - Navn
  - Kort info (f.eks. snittpris + endring)

**Layout:**
- Kartet er hovedfokus i seksjonen.
- Tekst kan ligge over/under eller på venstre side.

**Data:**
- Hentes fra `src/data/pressAreas.json`.
- Struktur f.eks.: `{ "city": "Oslo", "avg_price": 7000000, "change_percent": 0.08 }`.

**Animasjon:**
- Seksjonen kan ha en enkel zoom/scale-in-effekt når den kommer i viewport.
- Hotspots (punkter) fader inn eller pulserer lett.
- Hover eller klikk kan vise en liten tooltip med mer info (React state, ikke nødvendig med tung animasjon).

---

## 5. SectionRates – «Renter, lån og kjøpekraft»
**Mål:** Vise sammenhengen mellom renteøkning, lån og kjøpekraft på en intuitiv måte.

**Innhold:**
- Overskrift: «Renter, lån og kjøpekraft»
- Kort intro (1–2 setninger) fra Markdown.
- En vertikal eller horisontal timeline med 3 tydelige steg:
  1. Rente stiger
  2. Lånekostnad øker
  3. Kjøpekraft faller
- Enkelt ikon eller emoji per steg (placeholder nå).

**Data:**
- Enkel struktur i `src/data/interestRates.json` (f.eks. noen punkt med år og styringsrente for graf eller kun til intern bruk).

**Animasjon:**
- Bruk GSAP Timeline til å animere inn steg 1 → 2 → 3 mens brukeren scroller gjennom seksjonen.
- Hvert steg kan ha kombinasjon av fade-in + liten bevegelse i y-retning.

---

## 6. SectionSummary – «Oppsummert på 30 sekunder»
**Mål:** Gi leseren en kjapp oppsummering av alt de har sett.

**Innhold:**
- Overskrift: «Oppsummert» eller «Hva betyr dette for deg?»
- 3–4 bullets hentet fra Markdown med hovedpoenger.

**Layout:**
- Enkel, ren seksjon.
- Bullets som sjekkliste med ✔ eller liknende.

**Animasjon:**
- Seksjonen fader mykt inn.
- Hver bullet kan komme inn med lett stagger (en og en).

---

## Data- og filstruktur (forslag)

**Datafiler (JSON)**
- `src/data/priceData.json`
- `src/data/ageGroups.json`
- `src/data/pressAreas.json`
- `src/data/interestRates.json`

**Tekst (Markdown)**
- `src/shortread/bolig_shortread.md` – all tekstinnhold til seksjonene.
- Denne design-filen: `src/lesav/bolig_shortread_design.md` (den du nå genererer).

---

## Styling og tema

**Fargepalett (forslag):**
- Bakgrunn: lys bakgrunn (#f5f5f5 eller lignende)
- Primær: mørk blå eller mørk grå for tekst
- Aksent: én sterk farge til tall/grafer (f.eks. blå eller grønn)

**Typografi:**
- Sans-serif font (f.eks. systemfont)
- Store overskrifter (clamp for responsiv størrelse)
- God linjeavstand for lesbarhet

**Generell stil:**
- Ren og enkel, inspirert av norske nyhets-spesialer
- Ingen tunge effekter som distraherer fra dataene

---

## Tekniske krav til implementasjon

- Mobil først: alle seksjoner skal fungere godt på små skjermer.
- Ingen av seksjonene skal være avhengig av ekstern API – all data fra lokale JSON-filer.
- Animasjoner må ikke gjøre siden treg; bruk enkle transitions.
- Koden skal være delt i tydelige, gjenbrukbare komponenter.

---

## Hva gjenstår etter design-filen

- Fylle inn faktisk tekst i `bolig_shortread.md` (shortread-manus).
- Legge inn reelle tall i JSON-filer (SSB/andre åpne kilder).
- Finjustere animasjoner etter testing.

