import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import axios from 'axios'
import { useSelector } from "react-redux";
import styles from './styles.module.scss'

import { ArrowRight } from '../../assets/ArrowRight'
import { ArrowLeft } from '../../assets/ArrowLeft'
import { AleartCircle } from '../../assets/AleartCircle'

import { useAnswers } from '../../context/AnswersContext'

import { authSelector } from '../../redux/features/auth/selectors'
import { useIndustry } from '../../context/IndustryContext';

const baseURL = 'http://localhost:8000';

const CategoryQuestions = ({ isLastQuestion, categoryDetails, goToNextCategory, goToCategorySlide }) => {
  const navigate = useNavigate()

  const { userToken } = useSelector(authSelector)
  const { answers, setAnswers } = useAnswers()
  console.log(answers)
  const { industry } = useIndustry()

  const [question, setQuestion] = React.useState(0);
  const currentQuestion = categoryDetails?.questions?.[question];

  const [error, setError] = React.useState('Please select a button')

  const onPrevButtonClick = () => {
    setQuestion(prevQues => (prevQues === 0) ? prevQues : prevQues - 1)
  }

  console.log("I am under categoryQuetions now");


  const onNextButtonClick = async () => {
    setError("please select an option")

    if (isLastQuestion && categoryDetails?.questions?.length - 1 === question) {
      console.log(answers)
      const totalPoints = Object.entries(answers).reduce((accTotal, [catName, quesAns]) => {
        const quesPoints = Object.entries(quesAns).reduce(
          (acc, ans) => Number(ans[1].totalPoints) + acc,
          0
        )
        return accTotal + quesPoints
      }, 0);

      const scoredPoints = Object.entries(answers).reduce((accTotal, [catName, quesAns]) => {
        const quesPoints = Object.entries(quesAns).reduce(
          (acc, ans) => Number(ans[1].points) + acc,
          0
        )

        return accTotal + quesPoints
      }, 0)

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        }
        const response = await axios.post(
          `${baseURL}/api/answers`,
          { industry: industry.name, answers, totalPoints, scoredPoints },
          config
        )

        if (response.data.status === 'success') {
          navigate('/thankyou')
        };
      } catch (error) {
        if (error.response?.data.message) {
          console.log(error.response.data.message)
        } else {
          console.log(error.message)
        }
      }
    }

    if (categoryDetails?.questions?.length - 1 === question) {
      goToNextCategory()
      setQuestion(0)
      goToCategorySlide()
    } else {
      // setQuestion(prevQues => (currentCategory.questions.length - 1 === prevQues) ? prevQues : prevQues + 1)      
      setQuestion(prevQues => prevQues + 1)
    }
  }

  const handleRadioChange = (e, option) => {
      setError('');
    
    setAnswers(prevCat => ({
      ...prevCat,
      [categoryDetails.name]: {
        ...prevCat[categoryDetails.name],
        [currentQuestion.question]: {
          selected: option.option, 
          points: option.points,
          totalPoints: Math.max(...currentQuestion.options.map(({ points }) => points))
        }
      }
    }));
  };

  return (
    <section className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>
          {currentQuestion.question}

          <AleartCircle className='tooltip' />
          <Tooltip anchorSelect='.tooltip' place='top' className={styles.tooltip}>{currentQuestion?.description || 'Sorry, no description was not provided for this question!'}</Tooltip>
        </h1>

        {currentQuestion.options.map((option, i) => (
          <label key={i} htmlFor={`radio-${question}-${i}`} className={styles.formGroup}>
            <input
              type="radio"
              id={`radio-${question}-${i}`}
              name={`name-${question}`}
              value={option.points}
              onChange={(e) => handleRadioChange(e, option)}
              checked={option.option === answers?.[categoryDetails.name]?.[currentQuestion.question]?.selected} />

            {/* {option.option}: {option.points} points */}
            {option.option}
          </label>
        ))}
      </div>

      <button className='btn__prev' onClick={onPrevButtonClick}><ArrowLeft /> &nbsp; PREVIOUS</button>
      {error.length?<button disabled className='btn__next' onClick={onNextButtonClick}>NEXT &nbsp; <ArrowRight /></button>
      :<button className='btn__next' onClick={onNextButtonClick}>NEXT &nbsp; <ArrowRight /></button>
}
    </section>
  )
}

export default CategoryQuestions