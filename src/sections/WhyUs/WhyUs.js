import React from 'react'
import './whyus.scss'
import { Chronometer } from '../../assets/Chronometer'
import { Map } from '../../assets/Map'
import { Todo } from '../../assets/Todo'

const WhyUs = function () {
   return (
      <section className='bz-home__content features'>
         <div className="bz-home__heading">
            <h2 className="bz-home__fluid">Why BetterBiz Score</h2>
            <p>
               Until now we have worked with 200+ clients. Here is what our clients say about us
            </p>
         </div>

         <div className='feature'>
            <div className='feature__box'>
               <Chronometer className='feature__icon' />
               <h4 className='feature__title'>Holistic Understanding</h4>
               <p className="feature__description">
                  We go beyond the surface, providing a comprehensive view of your business.</p>
            </div>
            <div className='feature__box'>
               <Map className='feature__icon' />
               <h4 className='feature__title'>True Performance Metrics</h4>
               <p className="feature__description">
                  Our Business Score is not based on assumptions but on tangible metrics that drive success.</p>
            </div>
            <div className='feature__box'>
               <Todo className='feature__icon' />
               <h4 className='feature__title'>Empowerment Through Knowledge</h4>
               <p className="feature__description">
                  We believe that knowledge is the key to success, and we’re handing you the master key.</p>
            </div>
            <div className='feature__box'>
               <Todo className='feature__icon' />
               <h4 className='feature__title'>Join the Movement</h4>
               <p className="feature__description">
                  Unlock Your Entrepreneurial Potential BetterBiz Score is
                  more than a tool; it’s an invitation to join a movement.</p>
            </div>
            <div className='feature__box'>
               <Chronometer className='feature__icon' />
               <h4 className='feature__title'>Holistic Understanding</h4>
               <p className="feature__description">
                  We go beyond the surface, providing a comprehensive view of your business.</p>
            </div>
         </div>
      </section>
   )
}

export default WhyUs