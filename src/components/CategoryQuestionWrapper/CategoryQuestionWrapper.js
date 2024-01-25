import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import CategoryQuestionSlide from '../CategoryQuestionSlide/CategoryQuestionSlide';
import CategoryQuestions from '../CategoryQuestions/CategoryQuestions';

import { useIndustry } from '../../context/IndustryContext';

const baseURL = 'http://localhost:8000';

const CategoryQuestionWrapper = () => {
  const navigate = useNavigate()

  const { categories } = useIndustry()

  const [categoryStarting, setCategoryStarting] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [catIndex, setCatIndex] = React.useState(0);
  const [categoryDetails, setCategoryDetails] = React.useState({});

  React.useEffect(() => {
    const getQuestions = async () => {
      if (!categories.length) return;

      setLoading(true);

      try {
        const response = await axios.get(`${baseURL}/api/categories/${categories[catIndex]._id}`)

        setLoading(false);
        setCategoryDetails(response.data?.data?.category);
      } catch (error) {
        console.log(error.response)
      }
    }

    getQuestions()

  }, [catIndex, categories])

  const goToNextCategory = async () => {
    if (categories.length - 1 === catIndex) {
      // navigate('/thankyou')
    } else {
      setLoading(true)
      setCatIndex(prevIndex => prevIndex + 1);
    }
  }

  const goToQuestions = () => setCategoryStarting(false);
  const goToCategorySlide = () => setCategoryStarting(true)

  if (loading) return null;

  return categoryStarting
    ? (
      <CategoryQuestionSlide
        goToQuestions={goToQuestions}
        categoryDetails={categoryDetails} />
    )
    : (
      <CategoryQuestions
        isLastQuestion={categories.length - 1 === catIndex}
        categoryDetails={categoryDetails}
        goToNextCategory={goToNextCategory}
        goToCategorySlide={goToCategorySlide} />
    )
}

export default CategoryQuestionWrapper