import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import pressAreasData from '../data/pressAreas.json'
import ReactMarkdown from 'react-markdown'
import NorwayMap from './NorwayMap'

const SectionMap = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  const markdownContent = `## Hvor er presset størst?

Enkelte byer og områder er spesielt presset med høye priser og sterk vekst.`

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
          <NorwayMap onHover={setHoveredCity} hoveredCity={hoveredCity} />
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
                  <p>Snittpris: {area.avg_price.toLocaleString('no-NO')} kr</p>
                  <p>Endring: +{(area.change_percent * 100).toFixed(1)}%</p>
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

