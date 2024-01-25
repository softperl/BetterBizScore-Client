import React from 'react'
import styles from './styles.module.scss'

import { useForm } from 'react-hook-form'

import { ArrowRight } from '../../../assets/ArrowRight'
import { useUserDetails } from '../../../context/UserDetailsContext'
import MultistepForm from '../MultistepForm'

const StepFormName = ({ handleNext }) => {
  const { userData, setUserData } = useUserDetails()
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: userData })

  const saveData = (data) => {
    setUserData({ ...userData, ...data })

    handleNext()
  }

  return (
    <MultistepForm onSubmit={handleSubmit(saveData)}>
      <div className={styles.modalContent}>
        <h1>Name</h1>
        <div className={styles.formGroup}>
          <input type='text' id='firstname' placeholder='' {...register('firstName', { required: true })} />
          <label className='label__transition' htmlFor='firstname'>First Name</label>
          {errors.firstName?.type === 'required' && (
            <span className={styles.formError}>First name is required!</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <input type='text' id='lastname' placeholder='' {...register('lastName', { required: true })} />
          <label className='label__transition' htmlFor='lastname'>Last Name</label>
          {errors.lastName?.type === 'required' && (
            <span className={styles.formError}>Last name is required!</span>
          )}
        </div>
      </div>

      <span className={styles.nbsp}></span>
      <button className='btn__next'>NEXT &nbsp; <ArrowRight /></button>
    </MultistepForm>
  )
}

export default StepFormName
