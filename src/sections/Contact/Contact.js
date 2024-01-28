import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import './contact.scss'
import ContactCover from './Contact__cover.jpg'

const Contact = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm()

   const onSubmit = async (data) => {
      try {
         const config = {
            headers: {
               "Content-Type": 'application/json'
            }
         }
         const response = await axios.post(`http://api.betterbizscore.com/sendContactEmail`, data, config)

         if (response.data?.status === 'success') {
            console.log(response);
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <section className='bz-home__content contact' id='contact-us'>
         <figure className='contact__figure'>
            <img src={ContactCover} alt='Better Biz Contact Cover' />
         </figure>
         <form className='contact__form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='contact__title'>Contact Us</h2>

            <div className='contact__input'>
               <label htmlFor='name'>Full name</label>
               <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Full name'
                  {...register('name', {
                     required: 'Please enter your name!'
                  })} />

               {errors.name?.type === 'required' && (
                  <span className='contact__input--error'>{errors.name.message}</span>
               )}
            </div>

            <div className='contact__input'>
               <label htmlFor='email'>Email</label>
               <input
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email'
                  {...register('email', {
                     required: 'Please enter your email!',
                     pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
                  })} />

               {errors.email?.type === 'required' && (
                  <span className='contact__input--error'>{errors.email.message}</span>
               )}

               {errors.email?.type === 'pattern' && (
                  <span className='contact__input--error'>Please enter a valid email!</span>
               )}
            </div>

            <div className='contact__input'>
               <label htmlFor='content'>Tell us about your business</label>
               <textarea
                  id='content'
                  placeholder='Write about your business'
                  {...register('description', { required: true })} />

               {errors.description?.type === 'required' && (
                  <span className='contact__input--error'>Please tell us about your business briefly!</span>
               )}
            </div>

            <button type='submit' className='contact__submit'>Send</button>
         </form>
      </section>
   )
}

export default Contact