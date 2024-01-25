import React from 'react'
import './ourmission.scss'

import Better__mission from './Better__biz-health-Cover.png'

const missionContent = [
  "Redefining Business Literacy At BetterBiz Score, we believe that true business literacy goes beyond traditional metrics. It’s about understanding every facet of your business and harnessing that knowledge for sustainable growth. Our mission is clear: to empower entrepreneurs with insights that matter, fostering a new era of informed decision-making and strategic brilliance for the everyday entrepreneur.",
  "The Innovation: Beyond Credit History to Business Metrics What sets us apart is groundbreaking – we’ve redefined the concept of a business score. No longer confined to credit history, our Business Score is a living, breathing reflection of your business’s performance based on real metrics. It’s not just a number; it’s a dynamic indicator of your business’s success and potential. Welcome to a scoring system where relevance meets reality.",
  "Built by Entrepreneurs, for Entrepreneurs BetterBiz Score is more than a platform; it’s a testament to the entrepreneurial spirit. Crafted by entrepreneurs for entrepreneurs, we understand the challenges, the dreams, and the relentless pursuit of success. We’ve been in your shoes, and that’s why we’ve created a tool that speaks your language, aligns with your aspirations, and propels your journey forward."
]

const OurMission = () => {
  return (
    <section className="bz-home__content mission">
      <div className="bz-home__heading">
        <h2 className="bz-home__fluid">Better Biz Health Score Mission</h2>
        <p>
          Redefining Business Literacy At BetterBiz Score, we believe that true business literacy goes beyond traditional metrics.
        </p>
      </div>

      <div className="mission__container">
        {missionContent.map((content, i) => {
          if (i % 2 === 0) {
            return (
              <div className="mission__feature mission__feature--1" key={i}>
                <figure>
                  <img src={Better__mission} alt="Better Biz Health Our Mission" />
                </figure>

                <div className="mission__feature--content">
                  <h3>Redefining Business Literacy At BetterBiz Score</h3>
                  <p>{content}</p>
                </div>
              </div>
            )
          } else {
            return (
              <div className="mission__feature mission__feature--2" key={i}>
                <div className="mission__feature--content">
                  <h3>Built by Entrepreneurs, for Entrepreneurs BetterBiz Score</h3>
                  <p>{content}</p>
                </div>

                <figure>
                  <img src={Better__mission} alt="Better Biz Health Our Mission" />
                </figure>
              </div>
            )
          }
        })}
      </div >
    </section >
  )
}

export default OurMission
