import React from 'react'
import styles from './styles.module.scss'

import { useForm } from 'react-hook-form'

import { ArrowLeft } from '../../../assets/ArrowLeft'
import { ArrowRight } from '../../../assets/ArrowRight'

import MultistepForm from '../MultistepForm'
import { useUserDetails } from '../../../context/UserDetailsContext'

const StepBusinessEmail = ({ handlePrev, handleNext }) => {
  const { userData, setUserData } = useUserDetails()
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: userData })

  const saveData = (data) => {
    setUserData({ ...userData, ...data })

    handleNext()
  }

  return (
    <MultistepForm onSubmit={handleSubmit(saveData)}>
      <div className={styles.modalContent}>
        <h1>E-mail</h1>

        <div className={styles.formGroup}>
          <input type='text' id='email' placeholder='' {...register('email', {
            required: 'Email is required!',
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
          })} />
          <label className='label__transition' htmlFor='email'>example@gmail.com</label>
          {errors.email?.type === 'required' && (
            <span className={styles.formError}>{errors.email.message}</span>
          )}
          {errors.email?.type === 'pattern' && (
            <span className={styles.formError}>Please enter a valid email!</span>
          )}
        </div>
      </div>

      <button type='button' className='btn__prev' onClick={handlePrev}><ArrowLeft /> &nbsp; PREVIOUS</button>
      <button className='btn__next'>NEXT &nbsp; <ArrowRight /></button>
    </MultistepForm>
  )
}

export default StepBusinessEmail