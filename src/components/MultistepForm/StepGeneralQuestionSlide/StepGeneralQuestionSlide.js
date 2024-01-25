import React from 'react'
import styles from './styles.module.scss'
import { ArrowRight } from '../../../assets/ArrowRight'

const StepGeneralQuestionSlide = ({ handleNext }) => {
  return (
    <section className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>BetterBiz: Business Diagnostic Health Score</h1>
        <p>Building healthier businesses</p>
        {/* <span>17 Questions</span> */}
      </div>
      
      <button className={styles.modalButton} onClick={handleNext}>NEXT &nbsp; <ArrowRight /></button>
    </section>
  )
}

export default StepGeneralQuestionSlide