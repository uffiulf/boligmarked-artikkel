# Boligmarkedet på 1 minutt

En interaktiv scrollytelling-nettside om det norske boligmarkedet.

🌐 **Live demo:** [GitHub Pages](https://uffiulf.github.io/boligmarked-artikkel/)

## Teknologi

- React + Vite
- TypeScript
- GSAP + ScrollTrigger (parallax, pinned/sticky, timelines)
- Framer Motion (fade, slide, count-up)
- Recharts (linjediagram + stolpediagram)
- react-markdown (tekstinnhold)

## Installasjon

```bash
npm install
```

## Utvikling

```bash
npm run dev
```

## Bygging

```bash
npm run build
```

## Deployment

Prosjektet er satt opp for automatisk deployment til GitHub Pages via GitHub Actions. Hver push til `main`-branchen vil automatisk bygge og deploye nettsiden.

- **Live URL:** https://uffiulf.github.io/boligmarked-artikkel/
- **Workflow:** `.github/workflows/deploy.yml`

## Struktur

- `src/components/` - Alle seksjonskomponenter
- `src/data/` - JSON-datasett
- `src/shortread/` - Markdown-innhold
- `src/styles/` - CSS-stiler
- `src/pages/` - Hovedside

## Seksjoner

1. **HookIntro** - Hero med parallax
2. **SectionPrices** - Prisutvikling nasjonalt
3. **SectionGroups** - Hvem sliter mest (aldersgrupper)
4. **SectionMap** - Pressområder i Norge
5. **SectionRates** - Renter, lån og kjøpekraft
6. **SectionSummary** - Kort oppsummering

# boligmarked-artikkel
