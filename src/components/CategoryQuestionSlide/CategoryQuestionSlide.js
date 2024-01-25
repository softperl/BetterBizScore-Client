import React from 'react'
import styles from './styles.module.scss'

import { ArrowRight } from '../../assets/ArrowRight'
import { ArrowLeft } from '../../assets/ArrowLeft'

import { useAnswers } from '../../context/AnswersContext'

const CategoryQuestionSlide = ({ goToQuestions, categoryDetails }) => {
   const { setAnswers } = useAnswers()

   
   console.log("I am under categoryQuetionSlide now");

   React.useEffect(() => {
      setAnswers(prevCat => ({ ...prevCat, [categoryDetails.name]: {} }))

   }, [categoryDetails.name, setAnswers])

   return (
      <section className={styles.modal}>
         <div className={styles.modalContent}>
            <h1>{categoryDetails.name}</h1>
            {/* <span>{categoryDetails.questions.length} Questions</span> */}
         </div>

         <button className='btn__prev'><ArrowLeft /> &nbsp; PREVIOUS</button>
         <button className='btn__next' onClick={goToQuestions}>NEXT &nbsp; <ArrowRight /></button>
      </section>
   )
}

export default CategoryQuestionSlide