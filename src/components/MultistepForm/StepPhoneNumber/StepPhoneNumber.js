import React from 'react'
import styles from './styles.module.scss'

import { useForm } from 'react-hook-form'

import { ArrowRight } from '../../../assets/ArrowRight'
import { ArrowLeft } from '../../../assets/ArrowLeft'

import MultistepForm from '../MultistepForm'
import { useUserDetails } from '../../../context/UserDetailsContext'

const StepPhoneNumber = ({ handlePrev, handleNext }) => {
   const {userData, setUserData} = useUserDetails()
   const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: userData })

   const saveData = (data) => {
      setUserData({ ...userData, ...data })

      handleNext()
   }

   return (
      <MultistepForm onSubmit={handleSubmit(saveData)}>
         <div className={styles.modalContent}>
            <h1>Phone Number</h1>

            <div className={styles.areaCode}>
               <input type='text' id='code' placeholder='' {...register('areaCode', { required: true })} />
               <label className='label__transition' htmlFor='code'>Area Code</label>
               {errors.areaCode?.type === 'required' && (
                  <span className={styles.formError}>Area code required!</span>
               )}
            </div>

            <div className={styles.phoneNumber}>
               <input type='text' id='number' placeholder='' {...register('phoneNumber', { required: true })} />
               <label className='label__transition' htmlFor='number'>Phone Number</label>
               {errors.phoneNumber?.type === 'required' && (
                  <span className={styles.formError}>Phone number is required!</span>
               )}
            </div>
         </div>

         <button type='button' className='btn__prev' onClick={handlePrev}><ArrowLeft /> &nbsp; PREVIOUS</button>
         <button className='btn__next'>NEXT &nbsp; <ArrowRight /></button>
      </MultistepForm>
   )
}

export default StepPhoneNumber
