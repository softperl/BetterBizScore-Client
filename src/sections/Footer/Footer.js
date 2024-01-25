// import { Link } from 'react-router-dom'
import './footer.scss'
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="bz-home__content footer">
         <div className="footer__contact">
            <div className="footer__contact--email">
               <span>info@betterbizscore.com</span>
               <span>
                  1207 Delaware Ave #1574
                  <br />
                  USA, 19806
               </span>
            </div>
            <Link to="/">
            <img
              src={logo}
              className="result__card--logo"
              alt="BetterBiz Score Logo"
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
         </div>

         <div className="footer__services">
            <ul className='footer__links'>
               <li>General</li>
               <li><a href='#index'>About us</a></li>
               <li><a href='/contact'>Contact us</a></li>
               <li><a href='/services'>Get Started Free</a></li>
            </ul>
            <ul className='footer__links'>
               <li>Sitemap</li>
               <li><a href='#index'>About us</a></li>
               <li><a href='/contact'>Contact us</a></li>
            </ul>
            <ul className='footer__links'>
               <li>Sitemap</li>
               <li><a href='#index'>About us</a></li>
               <li><a href='/contact'>Contact us</a></li>
               <li><a href='/services'>Get Started Free</a></li>
            </ul>
         </div>
         <div className='footer__copy'>
            <p>BetterBiz Score &copy; 2024</p>
         </div>
      </footer>
   )
}

export default Footer