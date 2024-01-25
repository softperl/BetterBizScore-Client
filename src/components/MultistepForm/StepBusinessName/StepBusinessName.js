import React from 'react'
import styles from './styles.module.scss'

import { useForm } from 'react-hook-form'

import { ArrowRight } from '../../../assets/ArrowRight'
import { ArrowLeft } from '../../../assets/ArrowLeft'

import { useUserDetails } from '../../../context/UserDetailsContext'
import MultistepForm from '../MultistepForm'

const StepBusinessName = ({ handlePrev, handleNext }) => {
  const { userData, setUserData } = useUserDetails()
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: userData })

  const saveData = (data) => {
    setUserData({ ...userData, ...data })

    handleNext()
  }

  return (
    <MultistepForm onSubmit={handleSubmit(saveData)}>
      <div className={styles.modalContent}>
        <h1>Business Name</h1>
        <div className={styles.formGroup}>
          <input type='text' id='company-name' placeholder='' {...register('businessName', { required: true })} />
          <label className='label__transition' htmlFor='company-name'>ex: BetterBiz</label>
          {errors.businessName?.type === 'required' && (
            <span className={styles.formError}>Business name is required!</span>
          )}
        </div>

      </div>

      <button type='button' className='btn__prev' onClick={handlePrev}><ArrowLeft /> &nbsp; PREVIOUS</button>
      <button className='btn__next'>NEXT &nbsp; <ArrowRight /></button>
    </MultistepForm>
  )
}

export default StepBusinessName