import React from 'react'
import styles from '../styles/Book.module.css'

function Book() {
  return (
    <section className={styles.Section}>
        <h2>Book with us</h2>
        <p>You can <a href="tel:353-123-4567">call us</a> or send us an <a href="mailto:platinum@booking.com">
                email </a>
        , and we will be happy to book you in.</p>
        <p>Sign up or sign in to your account to book directly.</p>
    </section>
  )
}

export default Book
