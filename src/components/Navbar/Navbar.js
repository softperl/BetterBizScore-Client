import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link as ScrollLink } from "react-scroll";
import { authSelector } from "../../redux/features/auth/selectors";
import { logout } from "../../redux/features/auth/actions";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { success } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [sticky, setSticky] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("scroll", handleSticky);

    return () => window.removeEventListener("scroll", handleSticky);
  });

  const handleSticky = () => {
    if (window.scrollY >= 600) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const handleNavOpen = () => setOpen(!open);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bz-home__content">
      <nav className={`nav ${sticky ? "nav__sticky" : ""}`}>
        <span className="nav__logo" style={{ marginTop: "0px" }}>
          <Link to="/">
            <img
              src={logo}
              className="result__card--logo"
              alt="BetterBiz Score Logo"
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
        </span>

        <ul className={`nav__list ${open ? "nav__list--visible" : ""}`}>
          <li className="nav__item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav__item">
            <ScrollLink to="about-us" smooth duration={500} offset={-150}>
              About Us
            </ScrollLink>
          </li>
          <li className="nav__item">
            <ScrollLink to="contact-us" smooth duration={500} offset={-100}>
              Contact Us
            </ScrollLink>
          </li>
          {/* <li className='nav__item'><NavLink to='/submissions'>Submissions</NavLink></li> */}
          <li className="nav__item">
            <NavLink to="/multipageForm">Get Started Free</NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="http://admin.betterbizscore.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dashboard
            </NavLink>
          </li>
          {success ? (
            <button className="nav__item bz-home__cta" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav__item bz-home__cta">
              Login
            </NavLink>
          )}
        </ul>

        <div className={`burger ${open ? "open" : ""}`} onClick={handleNavOpen}>
          <span />
          <span />
          <span />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
