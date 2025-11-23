import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ageGroupsData from '../data/ageGroups.json'
import ReactMarkdown from 'react-markdown'

const SectionGroups = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const markdownContent = `## Hvem sliter mest?

Ungdom og førstegangskjøpere har størst utfordringer med å komme inn på boligmarkedet. Sykepleierindeksen viser at i Oslo kan en sykepleier i dag bare kjøpe 2,3% av boligene som selges, ned fra 13% for ti år siden.[^1]

Aldersgruppen 18-29 år har størst utfordringer, mens eldre grupper (60+) ofte allerede er etablert på markedet. Dette skaper en "geografisk loddtrekning" – hvor du bor avgjør i stor grad hvor tilgjengelig boligmarkedet er.[^1]`

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <section className="section-groups section" ref={ref}>
      <motion.div
        className="section-groups__header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </motion.div>

      <motion.div
        className="section-groups__chart"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageGroupsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="share_struggling"
              fill="#10b981"
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="section-groups__cards">
        {ageGroupsData.map((group, index) => (
          <motion.div
            key={group.group}
            className="info-card"
            custom={index}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariants}
          >
            <h3>{group.group} år</h3>
            <p>{group.description || 'Struggling with housing market access'}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SectionGroups

