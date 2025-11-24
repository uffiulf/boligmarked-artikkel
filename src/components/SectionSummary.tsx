import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

const SectionSummary = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const markdownContent = `## Oppsummert

- Boligprisene har steget betydelig de siste årene, til tross for renteøkninger
- Unge og førstegangskjøpere har størst utfordringer – i Oslo kan en sykepleier bare kjøpe 2,3% av boligene
- Store byer som Oslo, Bergen og Stavanger er spesielt presset, med spådd vekst på 10-14% i 2025
- Renteøkninger reduserer kjøpekraft, men markedet har vist motstandskraft takket være sterk arbeidsmarked
- Tilbudskrisen i nybygg (ned 50% siden 2022) skaper et "tilbudstidsbombe" som vil påvirke 2025-2026`

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <section className="section-summary section" ref={ref}>
      <motion.div
        className="section-summary__content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 style={{ 
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                  marginBottom: 'var(--spacing-md)', 
                  textAlign: 'center',
                  color: 'var(--text-primary)'
                }}>
                  {children}
                </h2>
              ),
              ul: ({ children }) => (
                <motion.ul variants={listVariants} className="summary-list">
                  {children}
                </motion.ul>
              ),
              li: ({ children }) => (
                <motion.li variants={itemVariants} className="summary-item">
                  <span className="checkmark">✔</span>
                  {children}
                </motion.li>
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default SectionSummary

