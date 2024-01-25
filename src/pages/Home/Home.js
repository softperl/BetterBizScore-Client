import React from 'react'
import './home.scss'

import Navbar from '../../components/Navbar/Navbar'
import Header from '../../sections/Header/Header'
import About from '../../sections/About/About'
import Pricing from '../../sections/Pricing/Pricing'
import WhyUs from '../../sections/WhyUs/WhyUs'
import OurMission from '../../sections/OurMission/OurMission'
import Contact from '../../sections/Contact/Contact'
import Footer from '../../sections/Footer/Footer'

const Home = () => {
  return (
    <div className='bz-home'>
      <Navbar />

      <Header />

      <About />
      <Pricing />

      <WhyUs />
      <OurMission />

      <Contact />


      <Footer />


    </div>

  )


}

export default Home