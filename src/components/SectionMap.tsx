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
          <NorwayMap />
          {pressAreasData.map((area) => {
            // City coordinates for Simplemaps SVG with viewBox="0 0 1200 1200"
            // These coordinates are based on actual geographic positions in Norway
            // Left and top are in pixels relative to the 1200x1200 viewBox
            // We need to convert these to percentages for positioning
            const cityCoordinates: Record<string, { left: number; top: number }> = {
              'Oslo': { left: 720, top: 550 },        // Southeast, inland
              'Bergen': { left: 280, top: 460 },      // West coast, mid-south
              'Stavanger': { left: 300, top: 600 },   // Southwest coast
              'Trondheim': { left: 580, top: 350 },   // Mid-Norway, central
              'Tromsø': { left: 750, top: 100 },      // Far north
            }
            
            const coords = cityCoordinates[area.city] || { left: 600, top: 600 }
            
            // Convert pixel coordinates to percentages for the 1200x1200 viewBox
            const leftPercent = (coords.left / 1200) * 100
            const topPercent = (coords.top / 1200) * 100
            
            return (
              <motion.div
                key={area.city}
                className="map-hotspot"
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  position: 'absolute',
                  zIndex: 10,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.5 + (pressAreasData.indexOf(area) * 0.1), type: 'spring', stiffness: 200 }}
                onMouseEnter={() => setHoveredCity(area.city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                {/* Invisible clickable area - SVG already has red dots for cities */}
                <motion.div 
                  className="hotspot-clickable"
                  style={{
                    width: '50px',
                    height: '50px',
                    position: 'absolute',
                    left: '-25px',
                    top: '-25px',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    backgroundColor: hoveredCity === area.city ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                  }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
                {hoveredCity === area.city && (
                  <motion.div
                    className="hotspot-tooltip"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <strong>{area.city}</strong>
                    <p>{area.description}</p>
                    <p>Snittpris: {area.avg_price.toLocaleString('no-NO')} kr</p>
                    <p>Spådd vekst 2025: +{(area.forecast_2025 * 100).toFixed(0)}%</p>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default SectionMap

