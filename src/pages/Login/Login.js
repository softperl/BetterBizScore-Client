import React from 'react'
import styles from './styles.module.scss'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import { login } from '../../redux/features/auth/actions'
import { setError } from '../../redux/features/auth/reducer'
import { authSelector } from '../../redux/features/auth/selectors'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { email: '', password: '' } })

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

  const handleLogin = (data) => {
    data.email = data.email.toLowerCase()

    dispatch(login(data))
  }

  return (
    <div className='app app--small'>
      <div className='app__content'>
        <section className={styles.login}>
          <div className={styles.loginHeader}>
            <h1>Welcome Back</h1>
            <p>Collect information, payments, and signatures with custom online forms.</p>
          </div>

          <form autoComplete='off' className={styles.formLogin} onSubmit={handleSubmit(handleLogin)}>
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

              <div className={styles.formForgotLink}>
                <Link to='/forgotPassword' >Forgot Password?</Link>
              </div>

              {error && (
                <span className={styles.formError}>{error}!</span>
              )}
            </div>

            <button type='submit'>Login</button>

            <span className={styles.formNoAccount}>Don't have an account? <Link to='/signup'>Sign Up</Link></span>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Login