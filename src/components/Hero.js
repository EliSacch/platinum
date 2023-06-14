import React from 'react'
import styles from '../styles/Hero.module.css'
import { Jumbotron, Nav} from 'react-bootstrap'

function Hero() {
  return (
    <Jumbotron className={styles.Hero}>
      <div id={styles.CallToAction}>
      <h1>Your hair experience!</h1>
      <Nav.Link href="#book" className={styles.HeroBtn}>Book</Nav.Link>
      </div>
      <Nav.Link href="#about" className={styles.GoDown}><i className="fas fa-chevron-down"></i></Nav.Link>
    </Jumbotron>
  )
}

export default Hero
