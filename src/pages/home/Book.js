import React from 'react';
import styles from '../../styles/Book.module.css';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import AppointmentsCreateForm from '../appointments/AppointmentsCreateForm';

const Book = () => {
  const currentUser = useCurrentUser();

  return (

    currentUser ? (
      <div className={styles.BookingForm}>
        <AppointmentsCreateForm />
      </div>
    ) : (

      <section className={styles.Section} >
        <span id="book" className={`${styles.NavOffset} "d-none"`}></span>
        <h2>Book with us</h2>
        <p>You can <a href="tel:353-123-4567">call us</a> or send us an <a href="mailto:platinum@booking.com">
          email </a>
          , and we will be happy to book you in.</p>
        <p>Sign up or sign in to your account to book directly.</p>
      </section >

    )
  )
}

export default Book

