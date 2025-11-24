import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HookIntro = () => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Parallax effect on background
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: backgroundRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, [])

  return (
    <section className="hook-intro section" ref={backgroundRef}>
      <div className="hook-intro__background">
        <div className="city-silhouette"></div>
      </div>
      <div className="hook-intro__content">
        <motion.h1
          ref={titleRef}
          className="hook-intro__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Boligmarkedet på 1 minutt
        </motion.h1>
        <motion.p
          className="hook-intro__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Hva har skjedd – og hvem henger etter?
        </motion.p>
      </div>
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  )
}

export default HookIntro

