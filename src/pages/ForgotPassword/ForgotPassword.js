import React from 'react'
import styles from './styles.module.scss'
import axios from 'axios'

import { useForm } from 'react-hook-form'

const baseURL = 'http://api.betterbizscore.com'

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { email: 'detanvir@gmail.com' } })

  const [error, setError] = React.useState('')
  const [status, setStatus] = React.useState('')

  const handleForgotPassword = async (data) => {
    data.email = data.email.toLowerCase()
    setError('')

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.post(
        `${baseURL}/api/users/forgotPassword`,
        { email: data.email },
        config
      )

      if (response.data.status === 'success') {
        setStatus(response.data.message)
      };
    } catch (error) {
      if (error.response?.data.message) {
        setError(error.response.data.message)
      }
      else {
        setError(error.message)
      }
    }
  }

  return (
    <div className='app app--small'>
      <div className='app__content'>
        <section className={styles.forgot}>
          <div className={styles.forgotHeader}>
            <h1>Forgot Password?</h1>
            <p>Don't worry! Enter your email. We will send you a password reset link.</p>
          </div>

          <form autoComplete='off' className={styles.formForgot} onSubmit={handleSubmit(handleForgotPassword)}>
            <div className={styles.formGroup}>
              <label htmlFor='email'>Email</label>
              <input
                autoFocus
                type='text'
                id='email'
                placeholder='Email'
                {...register('email', {
                  required: 'Email is required!',
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
                })} />

              {errors.email?.type === 'required' && (
                <span className={styles.formError}>{errors.email.message}</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className={styles.formError}>Please enter a valid email!</span>
              )}
            </div>

            <button type='submit'>Submit</button>

            {
              status ? (
                <span className={styles.formMessage}>{status}</span>
              ) : null
            }
            {
              error ? (
                <span className={styles.formError}>{error}</span>
              ) : null
            }
          </form>
        </section>
      </div>
    </div>
  )
}

export default ForgotPassword