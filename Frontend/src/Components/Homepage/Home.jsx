import React from 'react'
import Hero from './Hero'
import MostViewed from './MostViewed'
import  About from './About'
import Testimonial from './Testimonial'
import Statistics from './Statistics'
import ApplyAsAssiss from './ApplyAsAssiss'
function Home() {
  return (
   <>
   <Hero/>
   <MostViewed/>
   <About/>
   {/* <Testimonial/> */}
   <Statistics/>
   <ApplyAsAssiss/>
   </>
  )
}

export default Home
