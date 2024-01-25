// import { Link } from 'react-router-dom'
import './footer.scss'

const Footer = () => {
   return (
      <footer className="bz-home__content footer">
         <div className="footer__contact">
            <div className="footer__contact--email">
               <span>contact@betterbiz.com</span>
               <span>
                  Ukraine, Hahrinske Plateau, 5/3.
                  <br />
                  Odesa, Odessa Oblast, 65009
               </span>
            </div>
         </div>

         <div className="footer__services">
            <ul className='footer__links'>
               <li>Sitemap</li>
               <li><a href='#index'>About us</a></li>
               <li><a href='/contact'>Contact us</a></li>
               <li><a href='/blogs'>Blogs</a></li>
               <li><a href='/services'>Start Your Free Trial</a></li>
            </ul>
            <ul className='footer__links'>
               <li>Sitemap</li>
               <li><a href='#index'>About us</a></li>
               <li><a href='/contact'>Contact us</a></li>
               <li><a href='/blogs'>Blogs</a></li>
            </ul>
            <ul className='footer__links'>
               <li>Sitemap</li>
               <li><a href='#index'>About us</a></li>
               <li><a href='/contact'>Contact us</a></li>
               <li><a href='/blogs'>Blogs</a></li>
               <li><a href='/services'>Start Your Free Trial</a></li>
            </ul>
         </div>
         <div className='footer__copy'>
            <span>BETTERBIZ</span>
            <p>&copy; Better Biz Health, 2023</p>
         </div>
      </footer>
   )
}

export default Footer