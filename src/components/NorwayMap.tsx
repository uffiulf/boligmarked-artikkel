import { motion } from 'framer-motion'

interface NorwayMapProps {
  onHover: (city: string | null) => void
  hoveredCity: string | null
}

const NorwayMap = ({ onHover, hoveredCity }: NorwayMapProps) => {
  // Simplified Norway path (placeholder)
  // This is a rough approximation. For a real app, replace with a detailed SVG path.
  const norwayPath = "M 35 95 L 25 80 L 15 60 L 20 40 L 50 10 L 70 5 L 80 10 L 70 20 L 60 30 L 50 50 L 45 70 L 40 90 Z"

  return (
    <svg
      viewBox="0 0 100 100"
      className="norway-map-svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      <motion.path
        d={norwayPath}
        fill="#d1d5db" // Gray-300
        stroke="#9ca3af" // Gray-400
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="norway-land"
      />
    </svg>
  )
}

export default NorwayMap
