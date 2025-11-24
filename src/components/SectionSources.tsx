import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const SectionSources = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const sourcesContent = `## Kilder

1. [SSB – Prisindeks for brukte boliger](https://www.ssb.no/statbank/table/07241/)

2. [SSB – Befolkning](https://www.ssb.no/befolkning)

3. [SSB – Langsiktig prisutvikling](https://www.ssb.no/priser-og-prisindekser/boligpriser)

4. [SSB – Nylige kvartalsprisindekser](https://www.ssb.no/statbank/table/07230/)

5. [Eiendom Norge – Boligprisstatistikk](https://www.eiendomnorge.no/boligprisstatistikk/)

6. [Eiendom Norge – Markedskommentarer](https://www.eiendomnorge.no/nyheter/)

7. [Eiendom Norge – Markedsrapporter](https://www.eiendomnorge.no/rapporter/)

8. [Norges Bank – Styringsrenten](https://www.norges-bank.no/tema/pengepolitikk/styringsrenten/)

9. [Nordea – Nordeas prognose boligpriser 2025](https://www.nordea.com/no/nyheter/mot-lysere-tider-dette-venter-norsk-okonomi-i-2025)

10. [Krogsveen – Prisstatistikk](https://www.krogsveen.no/boligprisstatistikk)

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

