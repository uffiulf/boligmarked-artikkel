import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import pressAreasData from '../data/pressAreas.json'
import ReactMarkdown from 'react-markdown'
import NorwayMap from './NorwayMap'
import { cityLocations, latLngToSvgPercent } from '../data/cityCoordinates'

const SectionMap = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false) // Set to true to enable coordinate debugging

  const markdownContent = `## Hvor er presset størst?

Det norske boligmarkedet er ikke ett marked, men flere. Store byer som Oslo, Bergen og Stavanger opplever sterk prisvekst, mens mindre steder har lavere press.

Oslo er "episenteret for knapphet" – byen er omgitt av Marka og fjorden, og har streng regulering som begrenser nybygg. DNB Markets spår 10% prisvekst i Oslo for 2025.[^1]

Stavanger opplever en mot-syklisk boom takket være høy olje- og gassaktivitet, med spådd vekst på 14% i 2025. Bergen og Trondheim ligger i mellom, med henholdsvis 12% og 5% spådd vekst.[^1]

Nyboligmarkedet har kollapset – salg av nye boliger har falt med over 50% siden 2022.[^2]`

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
        <div
          className="norway-map"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 'min(800px, 90vw)', // Responsive max width
            aspectRatio: '1/1', // Force square aspect ratio to match SVG viewBox
            margin: '0 auto', // Center horizontally
            height: 'auto' // Let aspectRatio control height
          }}
          onClick={(e) => {
            if (debugMode) {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * 100
              const y = ((e.clientY - rect.top) / rect.height) * 100
              console.log(`Clicked coordinates: { left: ${x.toFixed(2)}, top: ${y.toFixed(2)} }`)
              // alert(`Clicked: x=${x.toFixed(1)}, y=${y.toFixed(1)}`) // Optional alert
            }
          }}
        >
          {debugMode && (
            <div style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'yellow',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              zIndex: 1000,
              cursor: 'pointer'
            }} onClick={() => setDebugMode(false)}>
              Debug Mode ON - Click on map to see coordinates
            </div>
          )}
          <NorwayMap />
          {pressAreasData.map((area) => {
            // Get city coordinates from cityLocations data
            const cityLocation = cityLocations[area.city]

            // Default to center if city not found
            let leftPercent = 50
            let topPercent = 50

            if (cityLocation) {
              if (cityLocation.x !== undefined && cityLocation.y !== undefined) {
                // Use manual override coordinates
                leftPercent = cityLocation.x
                topPercent = cityLocation.y
              } else {
                // Convert lat/lng to SVG percentage coordinates
                const coords = latLngToSvgPercent(cityLocation.lat, cityLocation.lng)
                leftPercent = coords.left
                topPercent = coords.top
              }
            }

            const cityId = area.city.toLowerCase().replace('ø', 'o').replace('å', 'a').replace('æ', 'ae')
            
            return (
              <div
                key={area.city}
                id={`hotspot-${cityId}`}
                className={`map-hotspot map-hotspot-${cityId}`}
                data-city={area.city}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  position: 'absolute',
                  zIndex: 10,
                }}
                title={`${area.city} - ${leftPercent.toFixed(1)}%, ${topPercent.toFixed(1)}%`}
                onMouseEnter={() => setHoveredCity(area.city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.5 + (pressAreasData.indexOf(area) * 0.1), type: 'spring', stiffness: 200 }}
                  style={{ width: '100%', height: '100%' }}
                >
                {/* City name marker for debugging - always visible in HTML */}
                {debugMode && (
                  <div 
                    style={{
                      position: 'absolute',
                      left: '-30px',
                      top: '-10px',
                      fontSize: '10px',
                      color: 'red',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      zIndex: 1000
                    }}
                  >
                    {area.city}
                  </div>
                )}
                {/* Invisible clickable area - SVG already has red dots for cities */}
                <motion.div
                  className="hotspot-clickable"
                  {...({ 'data-city': area.city } as any)}
                  style={{
                    width: '50px',
                    height: '50px',
                    position: 'absolute',
                    left: '-25px',
                    top: '-25px',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    backgroundColor: debugMode
                      ? 'rgba(255, 0, 0, 0.3)'
                      : hoveredCity === area.city
                        ? 'rgba(37, 99, 235, 0.1)'
                        : 'transparent',
                    border: debugMode ? '2px solid red' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {debugMode && <div style={{ width: '10px', height: '10px', borderLeft: '1px solid red', borderTop: '1px solid red', transform: 'rotate(45deg)' }} />}
                </motion.div>
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
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default SectionMap
