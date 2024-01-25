import React from 'react'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'

import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signup } from '../../redux/features/auth/actions'
import { setError } from '../../redux/features/auth/reducer'
import { authSelector } from '../../redux/features/auth/selectors'

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm()

  const { error, success } = useSelector(authSelector)
  const dispatch = useDispatch()

  const { state } = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setError(null))
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [dispatch, error])

  React.useEffect(() => {
    if (success)
      navigate(state?.from || '/')

  }, [navigate, state?.from, success])

  const handleSignup = (data) => {
    data.email = data.email.toLowerCase()

    dispatch(signup(data))
  }

  return (
    <div className='app app--small'>
      <div className='app__content'>
        <section className={styles.signup}>
          <div className={styles.signupHeader}>
            <h1>Sign up with Email</h1>
            <p>Collect information, payments, and signatures with custom online forms.</p>
          </div>

          <form autoComplete='off' className={styles.formSignup} onSubmit={handleSubmit(handleSignup)}>
            <div className={styles.formGroup}>
              <label htmlFor='firstname'>Name</label>
              <input
                autoFocus
                type='text'
                id='firstname'
                placeholder='Name'
                {...register('name', {
                  required: 'Please enter your name!'
                })} />

              {errors.name?.type === 'required' && (
                <span className={styles.formError}>{errors.name.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                placeholder='Email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
                })} />

              {errors.email?.type === 'required' && (
                <span className={styles.formError}>{errors.email.message}</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span className={styles.formError}>Please enter a valid email!</span>
              )}
            </div>

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

            <label htmlFor='term-cond' className={styles.formCheckbox}>
              <input type="checkbox" id="term-cond" name='term-cond' />
              I agree to the Terms of Service and Privacy Policy.
            </label>

            <button type='submit'>Sign Up</button>

            <span className={styles.formYesAccount}>Already have an account? <a href='/login'>Login</a></span>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Signup