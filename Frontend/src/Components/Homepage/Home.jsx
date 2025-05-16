import React from 'react'
import Hero from './Hero'
import MostViewed from './MostViewed'
import  About from './About'
import FeatureSection from './FeatureSection'
import Statistics from './Statistics'
import ApplyAsAssiss from './ApplyAsAssiss'
import VideoChat from '../VideoChat/VideoChat'
function Home() {
  return (
   <>
   <Hero/>
   <FeatureSection/>
   <MostViewed/>
   <About/>
   <Statistics/>
   <ApplyAsAssiss/>
   {/* <VideoChat/> */}
   </>
  )
}

export default Home
