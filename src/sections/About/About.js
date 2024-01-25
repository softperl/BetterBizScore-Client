import React from "react";
import "./about.scss";

import Better__mission from "./11.png";

const About = () => {
  return (
    <section className="bz-home__content about" id="about-us">
      <div className="bz-home__heading">
        <h2 className="bz-home__fluid">About BetterBiz Score</h2>
        {/* <p>
               Redefining Business Literacy At BetterBiz Score, we believe that true business literacy goes beyond traditional metrics.
            </p> */}
      </div>

      <div className="about__content">
        <div className="about__feature">
          <figure>
            <img src={Better__mission} alt="BetterBiz Score About" />
          </figure>
          <div className="about__feature--content">
            {/* <h3>BetterBiz Score About Us</h3> */}
            <p>
              BetterBiz Score is more than just a tool that helps generate money
              for your business. We are a movement on a mission. Our mission is
              fueled by our passionate commitment: to transform the every
              Solopreneur and everyday Entrepreneur into a fully
              business-literate force, confident and capable of not just
              surviving but thriving in the ever-evolving landscape of business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
