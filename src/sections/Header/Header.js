import React from 'react';
import './header.scss'

import { Link } from 'react-router-dom';

// import HeaderCover from './Better__biz-health-Cover.png'
import { ArrowHome } from '../../assets/ArrowHome';

const Header = () => {
   return (
      <header className="bz-home__content header">
         <div className="header__content">
            <h1 className='header__fluid'><span className='color-primary'>You Can’t Grow</span> A Business You Don’t Know!</h1>

            <p className='header__text'>Get a comprehensive view of your business with our unique Business Score and Health feature. Understand the pulse of your operations and make strategic decisions backed by you real-time insights. Know your business and grow your business.</p>

            <Link to='/multipageForm' className='header__btn'>Start Your Free Trial <ArrowHome /></Link>
         </div>

         <figure className='header__figure'>
            <img src='/Better__biz-score.png' alt='Better Biz Health Score Cover' />
            <p className='header__text'>The best tool for the everyday Entrepreneur and Small Business owner: Understand and run your business like a Fortune 500 company. Never leave money on the table again.
            </p>
         </figure>
      </header>
   )
}

export default Header