import React from 'react'
// bootstrap
import { Jumbotron, Nav } from 'react-bootstrap'
//custom css
import styles from '../../styles/Hero.module.css'

function Hero() {
  return (
    <Jumbotron className={styles.Hero}>
      <div id={styles.CallToAction}>
        <h1>Your hair experience!</h1>
        <Nav.Link href="#book" className={styles.HeroBtn}>Book</Nav.Link>
      </div>
      <Nav.Link href="#about" className={styles.GoDown} aria-label="scroll down"><i className="fas fa-chevron-down"></i></Nav.Link>
    </Jumbotron>
  )
}

export default Hero
