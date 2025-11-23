# Boligmarkedet på 1 minutt

En interaktiv scrollytelling-nettside om det norske boligmarkedet.

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
