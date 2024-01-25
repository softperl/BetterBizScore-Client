import React from "react";
import "./header.scss";
import Better__mission from "./hero2.png";
import { Link } from "react-router-dom";

// import HeaderCover from './Better__biz-health-Cover.png'
import { ArrowHome } from "../../assets/ArrowHome";

const Header = () => {
  const paragraphStyle = {
    fontSize: "20px",
    color: "#555555", // Change 'gray' to 'black' here
  };
  const buttonStyle = {
    backgroundColor: "#006eee",
    color: "white",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
  };

  return (
    <header className="bz-home__content header">
      <div className="header__content">
        <p style={paragraphStyle}>
          45% of businesses fail within the first 5 years because they don’t
          know their business.
        </p>
        <h1 className="header__fluid">
          <span className="color-primary">You Can’t Grow</span> A Business You
          Don’t Know!
        </h1>

        <p className="header__text">
          Get a comprehensive view of your business with our unique,
          personalized Business Score and Health feature. Backed by our AI and
          Data driven software. Understand the pulse of your operations and make
          strategic decisions backed by your real-time insights. Know your
          business and grow it effectively.
        </p>

        <Link to="/multipageForm" className="header__btn" style={buttonStyle}>
          Get Started Free
        </Link>
      </div>

      <figure className="header__figure">
        <img src={Better__mission} alt="BetterBiz Score About" />
        <p className="header__text">
          The best tool for the solopreneur and the everyday entrepreneur.
          Understand and run your business like a Fortune 500 company. Never
          leave money on the table again.
        </p>
      </figure>
    </header>
  );
};

export default Header;
