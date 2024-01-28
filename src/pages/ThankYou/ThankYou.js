import React from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom';
import { Tick } from '../../assets/Tick'
// import { useNavigate } from 'react-router-dom'

const ThankYou = () => {

  // const navigate = useNavigate();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Navigate to the /result page
    navigate('/result');
  }
  return (
    <div className='app'>
      <div className='app__content'>
        <div className={styles.thanks}>
          <Tick className={styles.thanksIcon} />
          <h1>Thank You!</h1>
          <button style={{ color: 'white', padding: '8px 20px', fontSize: '25px' }} onClick={handleCheckout}>View</button>

          <p>Your submission has been received!</p>
        </div>
      </div>
    </div>
  )
}

export default ThankYou