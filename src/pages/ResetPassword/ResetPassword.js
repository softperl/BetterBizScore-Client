import React from 'react'
import styles from './styles.module.scss'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { removeUser } from '../../redux/features/auth/reducer'

const baseURL = 'http://localhost:8000'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm()

  const { token } = useParams()
  const dispatch = useDispatch()

  const [error, setError] = React.useState('')
  const [status, setStatus] = React.useState('')

  const handleResetPassword = async (data) => {
    setError('')

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.patch(
        `${baseURL}/api/users/resetPassword/${token}`,
        {
          password: data.password,
          passwordConfirm: data.passwordConfirm
        },
        config
      )

      if (response.data.status === 'success') {
        setStatus('Password reset was successful!')

        localStorage.removeItem('__user_bzc_client');
        localStorage.removeItem('__token_bzc_client');

        dispatch(removeUser())
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
        <section className={styles.reset}>
          <div className={styles.resetHeader}>
            <h1>Reset Password</h1>
            <p>Please enter your new password to reset.</p>
          </div>

          <form autoComplete='off' className={styles.formReset} onSubmit={handleSubmit(handleResetPassword)}>
            <div className={styles.formGroup}>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                {...register('password', {
                  required: 'Password is required!',
                  minLength: 8
                })} />

              {errors.password?.type === 'required' && (
                <span className={styles.formError}>{errors.password.message}</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span className={styles.formError}>Password must contain at least 8 characters!</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='passwordConfirm'>Confirm Password</label>
              <input
                type='password'
                id='passwordConfirm'
                placeholder='Confirm Password'
                {...register('passwordConfirm', {
                  required: 'Password confirm is required!',
                  minLength: 8,
                  validate: (pc) => pc === getValues('password')
                })} />

              {errors.passwordConfirm?.type === 'required' && (
                <span className={styles.formError}>{errors.passwordConfirm.message}</span>
              )}
              {errors.passwordConfirm?.type === 'minLength' && (
                <span className={styles.formError}>Password must contain at least 8 characters!</span>
              )}
              {errors.passwordConfirm?.type === 'validate' && (
                <span className={styles.formError}>Passwords are not same!</span>
              )}
            </div>

            <button type='submit'>Reset Password</button>

            {
              status ? (
                <span className={styles.formMessage}>{status} Back to <Link to='/login'>Login</Link></span>
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

export default ResetPassword