import HookIntro from '../components/HookIntro'
import SectionPrices from '../components/SectionPrices'
import SectionGroups from '../components/SectionGroups'
import SectionMap from '../components/SectionMap'
import SectionRates from '../components/SectionRates'
import SectionSummary from '../components/SectionSummary'
import '../styles/sections.css'

const BoligmarkedShortreadPage = () => {
  return (
    <div className="shortread-page">
      <HookIntro />
      <SectionPrices />
      <SectionGroups />
      <SectionMap />
      <SectionRates />
      <SectionSummary />
    </div>
  )
}

export default BoligmarkedShortreadPage

