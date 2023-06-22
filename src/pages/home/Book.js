import React from 'react';
// context data
import { useCurrentUser } from '../../contexts/CurrentUserContext';
// custom components
import AppointmentsCreateForm from '../appointments/AppointmentsCreateForm';
// custom css
import styles from '../../styles/Book.module.css';

const Book = () => {
  const currentUser = useCurrentUser();

  return (
    <section className={styles.Section} >
      {/* This span has the only function to give the correct offset
      when scrolling to this section by clicking the book button in the
      hero secton. Otherwise the navbar will cover part of the content */}
      <span id="book" className={styles.NavOffset}></span>

      {currentUser ? (
        // If the user is logged in we display the booking form
        <div className={styles.BookingForm}>
          <AppointmentsCreateForm homepage />
        </div>
      ) : (
        // If the user is not logged in, we tell them to contact us to book
        <>
          <h2>Book with us</h2>
          <p>You can <a href="tel:000-123-4567">call us</a> or send us an <a href="mailto:platinum@booking.com">
            email </a>
            , and we will be happy to book you in.</p>
          <p>Sign up or sign in to your account to book directly.</p>
        </>
      )}
    </section >
  )
}

export default Book

