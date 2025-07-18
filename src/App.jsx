import React from 'react'
import Hero from './sections/Hero'
import ShowcaseSection from './sections/ShowcaseSection'
import NavBar from './components/NavBar'
import LogoSection from './sections/LogoSection'
import FeatureCards from './sections/FeatureCards'
import ExperienceSection from './sections/ExperienceSection'

const App = () => {
  return (
    <>
   <NavBar/>
   <Hero/>
   < ShowcaseSection />
   <LogoSection/>
   < FeatureCards/>
   <ExperienceSection/>
   </>
    
  )
}

export default App      