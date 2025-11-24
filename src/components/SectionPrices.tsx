import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import priceData from '../data/priceData.json'
import ReactMarkdown from 'react-markdown'

const SectionPrices = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [countValue, setCountValue] = useState(0)

  // Calculate key stat (percentage increase over last 10 years)
  const firstValue = priceData[0]?.index || 100
  const lastValue = priceData[priceData.length - 1]?.index || 100
  const percentageIncrease = ((lastValue - firstValue) / firstValue) * 100

  useEffect(() => {
    if (isInView) {
      // Count up animation
      const duration = 2000
      const steps = 60
      const increment = percentageIncrease / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= percentageIncrease) {
          setCountValue(percentageIncrease)
          clearInterval(timer)
        } else {
          setCountValue(current)
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, percentageIncrease])

  const markdownContent = `## Hvor mye har prisene steget?

Boligprisene i Norge har vist bemerkelsesverdig motstandskraft. Til tross for at Norges Bank har hevet styringsrenten til 4,5%, har prisene ikke krasjet. I stedet har markedet flatet ut, nominale priser har holdt seg stabile, mens realpriser (justert for inflasjon) har falt noe.

Pandemien (2020-2022) utløste en "romkappløp" som drev prisene kraftig opp. Fra 2019 til 2022 steg prisindeksen for eneboliger med 19,4%. Dette la grunnlaget for den tilgjengelighetskrisen vi ser i dag.`

  return (
    <section className="section-prices section" ref={ref}>
      <div className="section-prices__container">
        <motion.div
          className="section-prices__text"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
        >
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
          <div className="key-stat">
            <motion.span
              className="key-stat__value"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              +{countValue.toFixed(1)}%
            </motion.span>
            <span className="key-stat__label">siste 10 år</span>
          </div>
        </motion.div>
        <motion.div
          className="section-prices__chart"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="index"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  )
}

export default SectionPrices

