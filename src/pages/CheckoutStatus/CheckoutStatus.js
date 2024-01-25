import React from 'react'
import styles from './styles.module.scss'

import { Tick } from '../../assets/Tick'

const CheckoutStatus = () => {
  let [message, setMessage] = React.useState('');
  let [success, setSuccess] = React.useState(false);
  let [sessionId, setSessionId] = React.useState('');

  React.useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Subscription canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  /* if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  } */

  return (
    <div className='app'>
      <div className='app__content'>
        {(!success && !message) ? (
          <div className={styles.thanks}>
            <p>Nothing is here for you!</p>
          </div>
        ) : (success && sessionId) ? (
          <div className={styles.thanks}>
            <Tick className={styles.thanksIcon} />
            <h1>Thanks for subscription!</h1>
            <p>Your subscription was successful!</p>
          </div>
        ) : (
          <div className={styles.thanks}>
            <h1>Subscription canceled!</h1>
            <p>Continue to explore and checkout when you're ready!</p>
          </div>
        )}

      </div>


    </div>
  )
}

export default CheckoutStatus