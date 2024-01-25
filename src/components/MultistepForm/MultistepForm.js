import React from 'react'
import styles from './styles.module.scss'

const MultistepForm = ({ children, ...props }) => (
   <form autoComplete='off' className={styles.modal} {...props} noValidate>
      {children}
   </form>
)

export default MultistepForm