import React from 'react'
import styles from './styles.module.scss'
import { ArrowRight } from '../../assets/ArrowRight'
import { ArrowLeft } from '../../assets/ArrowLeft'

import generalQuestions from '../../assets/generalQuestions.json'

const GeneralQuestions = ({ handlePrev, handleNext }) => {

  // React.useEffect(() => {
  //   setAnswers(prevCat => ({ ...prevCat, 'General': {} }))

  // }, [setAnswers])

  const [question, setQuestion] = React.useState(0);
  const currentQuestion = generalQuestions?.[question];

  const [error, setError] = React.useState('Please select a button')


  const onPrevButtonClick = () => {
    setQuestion(prevQues => (prevQues === 0) ? prevQues : prevQues - 1)
  }

  const onNextButtonClick = () => {
    //setError('Please select an option')
    handleNext()
    // if (generalQuestions.length - 1 === question) {
    //   handleNext()
    //   setQuestion(0)
    // } else {
    //   setQuestion(prevQues => prevQues + 1)
    // }
  }

  // const handleRadioChange = (e, option) => {
  //   if(option.points){
  //     setError('');
  //   }
  //   setAnswers(prevCat => ({
  //     ...prevCat,
  //     'General': {
  //       ...prevCat.General,
  //       [currentQuestion.question]: {
  //         selected: option.option, points: option.points,
  //         totalPoints: Math.max(...currentQuestion.options.map(({ points }) => points))
  //       }
  //     }
  //   }))
  // };

  return (
    <section className={styles.modal}>
      <div className={styles.modalContent}>
         <h3>Start your Question and Answer part</h3>
      </div>

      <button className='btn__prev' onClick={onPrevButtonClick}><ArrowLeft /> &nbsp; PREVIOUS</button>
      
     <button className='btn__next' onClick={onNextButtonClick}>NEXT &nbsp; <ArrowRight /></button>

    </section>
  )
}

export default GeneralQuestions