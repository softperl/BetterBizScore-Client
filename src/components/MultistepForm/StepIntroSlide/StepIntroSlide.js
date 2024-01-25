import React from 'react'
import styles from './styles.module.scss'

import logo from '../../../assets/logo.png'
import { ArrowRight } from '../../../assets/ArrowRight'

const StepIntroSlide = ({ handleNext }) => {
  return (
    <section className={styles.modal}>
      <div className={styles.modalContent}>
        <img src={logo} alt='BetterBiz Business Score' className={styles.modalLogo} />
        <h1>BetterBiz Business Score</h1>
      </div>
      <button className={styles.modalButton} onClick={handleNext}>START &nbsp; <ArrowRight /></button>
    </section>
  )
}

export default StepIntroSlide