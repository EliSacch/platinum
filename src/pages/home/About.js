import React from 'react'
import styles from '../../styles/About.module.css'

function About() {
  return (
    <section className={styles.Section}>
      {/* This span has the only function to give the correct offset
      when scrolling to this section by clicking the arrow down in the
      hero secton. Otherwise the navbar will cover part of the content */}
      <span id="about" className={`${styles.NavOffset} "d-none"`}></span>
      <h2>About</h2>
      <p>Situated in Massa city center, "Platinum" is a  warm and welcoming hair salon.
        Since we opened, in 2003, we have been totally committed to providing the highest standards to our clients.</p>
      <p>We offer the best hair care experience.
        In our salon you will find talented expertes, and our
        knowledge in the old and new trends.</p>
    </section>
  )
}

export default About
