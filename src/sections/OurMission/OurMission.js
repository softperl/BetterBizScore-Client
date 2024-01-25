import React from "react";
import "./ourmission.scss";

import Better__mission1 from "./22.png";
import Better__mission2 from "./33.png";
import Better__mission3 from "./55.png";

const missionContent = [
  "Beyond credit history to business metrics. What sets us apart is groundbreaking – we’ve redefined the concept of a business score. No longer confined to credit history, our Business Score is a living, breathing reflection of your business’s performance based on real metrics. It’s not just a number; it’s a dynamic indicator of your business’s success and potential. Welcome to a scoring system where relevance meets reality.",
  "BetterBiz Score is more than just a tool that helps generate money for your business. We are a movement on a mission. Our mission is fueled by a passionate commitment: to transform every solopreneur and everyday entrepreneur into a fully business-literate force, confident and capable of not just surviving but thriving in the ever-evolving landscape of business.",
  "We are redefining business literacy at BetterBiz Score. We believe that true business literacy can move the needle  significantly in the business landscape for the everyday entrepreneur. It’s about understanding every facet of your business and harnessing that knowledge for sustainable growth. Our mission is clear: to empower entrepreneurs with insights that matter, fostering a new era of informed decision-making and strategic brilliance for the everyday entrepreneur.",
];

const OurMission = () => {
  return (
    <section className="bz-home__content mission">
      <div className="bz-home__heading">
        <h2 className="bz-home__fluid">BetterBiz Score Mission</h2>
        {/* <p>
          Redefining Business Literacy At BetterBiz Score, we believe that true
          business literacy goes beyond traditional metrics.
        </p> */}
      </div>

      <div className="mission__container">
        {missionContent.map((content, i) => {
          if (i % 3 === 0) {
            return (
              <div className="mission__feature mission__feature--1" key={i}>
                <figure>
                  <img
                    src={Better__mission1}
                    alt="BetterBiz Score Our Mission"
                  />
                </figure>

                <div className="mission__feature--content">
                  <h3>The innovation</h3>
                  <p>{content}</p>
                </div>
              </div>
            );
          } else if (i % 3 === 1) {
            return (
              <div className="mission__feature mission__feature--2" key={i}>
                <div className="mission__feature--content">
                  <h3>
                    Built by Entrepreneurs, for Entrepreneurs BetterBiz Score
                  </h3>
                  <p>{content}</p>
                </div>

                <figure>
                  <img
                    src={Better__mission2}
                    alt="BetterBiz Score Our Mission"
                  />
                </figure>
              </div>
            );
          } else {
            return (
              <div className="mission__feature mission__feature--3" key={i}>
                <figure>
                  <img
                    src={Better__mission3}
                    alt="BetterBiz Score Our Mission"
                  />
                </figure>

                <div className="mission__feature--content">
                  <h3> Business Literacy</h3>
                  <p>{content}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default OurMission;
