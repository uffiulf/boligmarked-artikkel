import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const SectionSources = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const sourcesContent = `## Kilder

1. **SSB - Statistisk sentralbyrå**
   - [Prisindeks for brukte boliger](https://www.ssb.no/statbank/table/07230) (historisk data og kvartalsrapporter)
   - Langsiktig prisutvikling
   - Befolknings- og urbaniseringsstatistikk

2. **Eiendom Norge**
   - [Månedlige boligprisstatistikker](https://www.eiendomnorge.no/statistikk-og-analyse/boligpriser) (2024/2025)
   - Sykepleierindeksen 2024 (i samarbeid med Eiendomsverdi)
   - Markedsrapporter og kommentarer (Henning Lauridsen)
   - Oktober 2025 markedsrapport

3. **Eiendomsverdi**
   - Sykepleierindeksen 2024 (i samarbeid med Eiendom Norge)

4. **DNB Markets**
   - Økonomisk utsikt og boligprognoser 2025
   - Spådommer for Oslo (+10%), Stavanger (+14%), Bergen (+12%), Trondheim (+5%)

5. **Norges Bank**
   - [Styringsrenten](https://www.norges-bank.no/tema/pengepolitikk/Styringsrenten) og pengepolitikk
   - Utlånsforskriften

6. **Nordea**
   - Boligmarkedsutsikt

7. **TV2 / E24**
   - Rapportering om "First Price-markedet" og regional data

8. **Hjemla.no**
   - Tilgjengelighetsdata for spesifikke kommuner (Gamvik/Berlevåg)

**Merk:** Alle kilder er åpne og verifiserbare. Data er hentet fra offentlige rapporter og institusjonelle analyser.

---

*Artikkelen er basert på forskning gjort høsten 2024. Tall og prognoser kan endre seg.*`

  return (
    <section className="section-sources section" ref={ref}>
      <motion.div
        className="section-sources__content"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <ReactMarkdown>{sourcesContent}</ReactMarkdown>
      </motion.div>
    </section>
  )
}

export default SectionSources

