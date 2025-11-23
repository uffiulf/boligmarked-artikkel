import { motion } from 'framer-motion'
import countrySvg from '../lesav/country.svg'

const NorwayMap = () => {
  return (
    <motion.img 
      src={countrySvg} 
      alt="Norway map with cities" 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'contain',
        display: 'block',
        pointerEvents: 'none', // Allow clicks to pass through to hotspots
        userSelect: 'none'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  )
}

export default NorwayMap
