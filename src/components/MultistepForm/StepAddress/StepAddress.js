import React from 'react'
import axios from 'axios'
import { useSelector } from "react-redux";
import styles from './styles.module.scss'

import { useForm } from 'react-hook-form'

import { ArrowRight } from '../../../assets/ArrowRight'
import { ArrowLeft } from '../../../assets/ArrowLeft'

import MultistepForm from '../MultistepForm'

import { useUserDetails } from '../../../context/UserDetailsContext'
import { authSelector } from '../../../redux/features/auth/selectors'

const baseURL = 'http://api.betterbizscore.com';

const StepAddress = ({ handlePrev, handleNext }) => {
   const { userToken } = useSelector(authSelector)
   const { userData, setUserData } = useUserDetails()
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({ defaultValues: userData })

   const saveData = async (data) => {
      setUserData({ ...userData, ...data })

      try {
         const config = {
            headers: {
               Authorization: `Bearer ${userToken}`,
               'Content-Type': 'application/json'
            }
         }
         const response = await axios.post(
            `${baseURL}/api/profiles`,
            userData,
            config
         )

         if (response.data.status === 'success') {
            console.log(response);
         };
      } catch (error) {
         if (error.response?.data.message) {
            console.log(error.response.data.message)
         } else {
            console.log(error.message)
         }
      }

      handleNext()
   }

   return (
      <MultistepForm onSubmit={handleSubmit(saveData)}>
         <div className={styles.modalContent}>
            <h1>Address</h1>

            <div className={styles.address}>
               <input type='text' id='address' placeholder='' {...register('address', { required: true })} />
               <label className='label__transition' htmlFor='address'>Street Address</label>
               {errors.address?.type === 'required' && (
                  <span className={styles.formError}>Address is required!</span>
               )}
            </div>

            <div className={styles.address2}>
               <input type='text' id='address2' placeholder='' {...register('address2')} />
               <label className='label__transition' htmlFor='address2'>Street Address Line 2</label>
            </div>

            <div className={styles.city}>
               <input type='text' id='city' placeholder='' {...register('city', { required: true })} />
               <label className='label__transition' htmlFor='city'>City</label>
               {errors.city?.type === 'required' && (
                  <span className={styles.formError}>City is required!</span>
               )}
            </div>

            <div className={styles.state}>
               <input type='text' id='state' placeholder='' {...register('state', { required: true })} />
               <label className='label__transition' htmlFor='state'>State / Province</label>
               {errors.state?.type === 'required' && (
                  <span className={styles.formError}>State is required!</span>
               )}
            </div>

            <div className={styles.zipCode}>
               <input type='text' id='zip' placeholder='' {...register('zip', { required: true })} />
               <label className='label__transition' htmlFor='zip'>Postal / Zip Code</label>
               {errors.zip?.type === 'required' && (
                  <span className={styles.formError}>Zip code is required!</span>
               )}
            </div>
         </div>

         <button type='button' className='btn__prev' onClick={handlePrev}><ArrowLeft /> &nbsp; PREVIOUS</button>
         <button className='btn__next'>NEXT &nbsp; <ArrowRight /></button>
      </MultistepForm>
   )
}

export default StepAddress
