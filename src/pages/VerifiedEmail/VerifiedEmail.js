import React from 'react'
import styles from './styles.module.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { Tick } from '../../assets/Tick'

const baseURL = 'http://localhost:8000';

const VerifiedEmail = () => {
  const { token } = useParams()

  const [status, setStatus] = React.useState(false)
  const [loading, setLoading] = React.useState(true);

  const handleVerifyEmail = async () => {
    setLoading(true)

    try {
      const response = await axios.get(`${baseURL}/api/users/verifyEmail/${token}`)

      if (response.data.verified) {
        setStatus(true)
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setStatus(false);
      }
      else {
        setStatus(false)
      }
    }

    setLoading(false)
  }

  return (
    <div className='app'>
      <div className='app__content'>
        <div className={styles.verify}>
          {
            loading && !status ? (
              <>
                <h1>Confirm Verification!</h1>
                <p>You are one step behind in verifying your E-mail!</p>
                <button onClick={handleVerifyEmail}>Confirm</button>
              </>
            ) : status ? (
              <>
                <Tick className={styles.verifyIcon} />
                <h1>Email Verified!</h1>
                <p>Your email verification was successful!</p>
              </>
            ) : (
              <p>There is no one to verify with this token!</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default VerifiedEmail