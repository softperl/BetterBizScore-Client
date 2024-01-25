import React from 'react'
import './about.scss'

import Better__mission from './Better__biz-health-Cover.png'

const About = () => {
   return (
      <section className="bz-home__content about" id='about-us'>
         <div className="bz-home__heading">
            <h2 className="bz-home__fluid">About Better Biz Health Score</h2>
            <p>
               Redefining Business Literacy At BetterBiz Score, we believe that true business literacy goes beyond traditional metrics.
            </p>
         </div>

         <div className="about__content">
            <div className="about__feature">
               <figure>
                  <img src={Better__mission} alt="Better Biz Health About" />
               </figure>
               <div className="about__feature--content">
                  <h3>Better Biz Health Scrore About Us</h3>
                  <p>The Power of BetterBiz Score Welcome to BetterBiz Score. We’re not just a tool; we’re a movement on a mission. Our mission is fueled by a passionate commitment: to transform every entrepreneur into a fully business-literate force, capable of not just surviving but thriving in the ever-evolving landscape of commerce.
                  </p>
               </div>
            </div>
         </div >
      </section >
   )
}

export default About
