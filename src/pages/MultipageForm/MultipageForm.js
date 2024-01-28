import React from 'react';
/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
*/

import {
  StepIntroSlide,
  StepGeneralQuestionSlide,
  StepFormName,
  StepBusinessName,
  StepBusinessIndustry,
  StepBusinessEmail,
  StepPhoneNumber,
  StepAddress,
} from '../../components/MultistepForm'

import GeneralQuestions from '../../components/GeneralQuestions/GeneraQuestions';

import { UserDetailsProvider } from '../../context/UserDetailsContext';
import CategoryQuestionWrapper from '../../components/CategoryQuestionWrapper/CategoryQuestionWrapper';

import axios from 'axios'
import { useSelector } from "react-redux";

import { authSelector } from '../../redux/features/auth/selectors'

const MultipageForm = () => {
  const { userToken } = useSelector(authSelector)
  const [activeStep, setActiveStep] = React.useState(0);
  const [userHasProfile, setUserHasProfile] = React.useState(false)

  React.useLayoutEffect(() => {
    const getProfile = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }
        const response = await axios.get(`http://localhost:8000/api/users/profile`, config)

        if (response.data?.status === 'success') {
          setUserHasProfile(true)
        }
      } catch (error) {
        console.log(error);
      }
    }

    userToken && getProfile()
  }, [userToken])

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getStepContentWithProfile = (step) => {
    switch (step) {
      case 0:
        return <StepIntroSlide handleNext={handleNext} />
      case 1:
        return <StepGeneralQuestionSlide handleNext={handleNext} />
      case 2:
        return <StepFormName handleNext={handleNext} />
      case 3:
        return <StepBusinessName handlePrev={handlePrev} handleNext={handleNext} />
      case 4:
        return <StepBusinessIndustry handlePrev={handlePrev} handleNext={handleNext} />
      case 5:
        return <StepBusinessEmail handlePrev={handlePrev} handleNext={handleNext} />
      case 6:
        return <StepPhoneNumber handlePrev={handlePrev} handleNext={handleNext} />
      case 7:
        return <StepAddress handlePrev={handlePrev} handleNext={handleNext} />
      // case 8:
      //   return <GeneralQuestions handlePrev={handlePrev} handleNext={handleNext} />
      default:
        return null;
    }
  }

  const getStepContentWithoutProfile = (step) => {
    switch (step) {
      case 0:
        return <StepIntroSlide handleNext={handleNext} />
      case 1:
        return <StepGeneralQuestionSlide handleNext={handleNext} />
      case 2:
        return <StepBusinessIndustry handlePrev={handlePrev} handleNext={handleNext} />
      // case 3:
      //   return <GeneralQuestions handlePrev={handlePrev} handleNext={handleNext} />
      default:
        return null;
    }
  }

  const renderContent = () => {
    if (userHasProfile) {
      if (activeStep <= 2) {
        return getStepContentWithoutProfile(activeStep)
      } else {
        return <CategoryQuestionWrapper />
      }
    } else {
      if (activeStep <= 7) {
        return getStepContentWithProfile(activeStep)
      } else {
        return <CategoryQuestionWrapper />
      }
    }
  }

  return (
    <UserDetailsProvider>
      <div className='app'>
        <div className="app__content">
          {/* <span className='section__title'>Business</span> */}
          {renderContent()}
        </div>

      </div>


    </UserDetailsProvider>


  );

}

export default MultipageForm
