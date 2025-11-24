import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const SectionSources = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const sourcesContent = `## Kilder

1. [SSB – Prisindeks for brukte boliger](https://www.ssb.no/statbank/table/07241/)

2. [SSB – Boligprisindeks (årlig)](https://www.ssb.no/priser-og-prisindekser/boligpriser/statistikk/boligprisindeksen)

3. [SSB – Befolkning](https://www.ssb.no/befolkning)

4. [Eiendom Norge – Boligprisstatistikk](https://www.eiendomnorge.no/boligprisstatistikk/)

5. [Eiendom Norge – Sykepleierindeksen](https://eiendomnorge.no/2023/sykepleierindeksen-2023/)

6. [Eiendomsverdi – Sykepleierindeksen (PDF)](https://eiendomsverdi.no/sykepleierindeksen/)

7. [Norges Bank – Styringsrenten](https://www.norges-bank.no/tema/pengepolitikk/styringsrenten/)

8. [DNB – Prognose for boligmarkedet](https://www.dnb.no/dnbnyheter/no/privatoekonomi/dnb-spaar-boligprisene)

9. [Nordea – Nordeas prognose boligpriser 2025](https://www.nordea.com/no/nyheter/mot-lysere-tider-dette-venter-norsk-okonomi-i-2025)

10. [TV2 – First Price-boligmarkedet koker](https://www.tv2.no/nyheter/innenriks/first-price-boligmarkedet-koker/16394877/)

11. [E24 – Panikk i boligmarkedet](https://e24.no/privat/okonomi/i/dwAMgV/boligmarkedet-koker---folk-er-redde-for-aa-henge-etter)

12. [Hjemla – De billigste kommunene i Norge](https://www.hjemla.no/magasin/de-billigste-kommunene-i-norge/)

13. [Krogsveen – Prisstatistikk](https://www.krogsveen.no/boligprisstatistikk)

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

