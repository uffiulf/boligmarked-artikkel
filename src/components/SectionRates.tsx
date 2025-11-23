import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useInView } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

gsap.registerPlugin(ScrollTrigger)

const SectionRates = () => {
  const ref = useRef(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  useEffect(() => {
    if (!timelineRef.current) return

    const steps = timelineRef.current.querySelectorAll('.timeline-step')
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    })

    steps.forEach((step, index) => {
      tl.to(step, {
        opacity: 1,
        y: 0,
        duration: 0.3,
      }, index * 0.3)
    })
  }, [])

  const markdownContent = `## Renter, lån og kjøpekraft

Norges Bank hevet styringsrenten fra 0% i 2020 til 4,5% i 2024 for å dempe inflasjonen.[^1] Dette påvirker direkte lånekostnader og kjøpekraft.

Når renten stiger, blir boliglån dyrere. Dette reduserer hvor mye penger husholdninger har tilgjengelig til andre ting, og svekker kjøpekraften. Til tross for dette har boligprisene vist motstandskraft, delvis takket være sterk arbeidsmarked og lønnsvekst.[^2]`

  const steps = [
    { icon: '📈', title: 'Rente stiger', description: 'Styringsrenten øker' },
    { icon: '💰', title: 'Lånekostnad øker', description: 'Høyere månedlige betalinger' },
    { icon: '📉', title: 'Kjøpekraft faller', description: 'Mindre penger tilgjengelig' },
  ]

  return (
    <section className="section-rates section" ref={ref}>
      <motion.div
        className="section-rates__header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </motion.div>

      <div className="timeline" ref={timelineRef}>
        {steps.map((step, index) => (
          <div
            key={index}
            className="timeline-step"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="timeline-step__icon">{step.icon}</div>
            <div className="timeline-step__content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionRates

