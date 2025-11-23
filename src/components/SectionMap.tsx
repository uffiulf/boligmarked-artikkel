import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import pressAreasData from '../data/pressAreas.json'
import ReactMarkdown from 'react-markdown'

const SectionMap = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  const markdownContent = `## Hvor er presset størst?

Det norske boligmarkedet er ikke ett marked, men flere. Store byer som Oslo, Bergen og Stavanger opplever sterk prisvekst, mens mindre steder har lavere press.

Oslo er "episenteret for knapphet" – byen er omgitt av Marka og fjorden, og har streng regulering som begrenser nybygg. DNB Markets spår 10% prisvekst i Oslo for 2025.

Stavanger opplever en mot-syklisk boom takket være høy olje- og gassaktivitet, med spådd vekst på 14% i 2025. Bergen og Trondheim ligger i mellom, med henholdsvis 12% og 5% spådd vekst.

**Kilde: DNB Markets - Økonomisk utsikt og boligprognoser 2025**`

  return (
    <section className="section-map section" ref={ref}>
      <motion.div
        className="section-map__header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </motion.div>

      <motion.div
        className="section-map__container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <div className="norway-map">
          {pressAreasData.map((area, index) => (
            <motion.div
              key={area.city}
              className="map-hotspot"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + (index % 2) * 40}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              onMouseEnter={() => setHoveredCity(area.city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <div className="hotspot-marker"></div>
              {hoveredCity === area.city && (
                <motion.div
                  className="hotspot-tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <strong>{area.city}</strong>
                  <p>{area.description}</p>
                  <p>Snittpris: {area.avg_price.toLocaleString('no-NO')} kr</p>
                  <p>Spådd vekst 2025: +{(area.forecast_2025 * 100).toFixed(0)}%</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default SectionMap

