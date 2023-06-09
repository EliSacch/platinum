import React from 'react'
import styles from '../styles/Hero.module.css'
import { Button, Jumbotron} from 'react-bootstrap'

function Hero() {
  return (
    <Jumbotron className={styles.Hero}>
      <div id={styles.CallToAction}>
      <h1>Your hair experience!</h1>
      <Button className={styles.HeroBtn}>Book</Button>
      </div>
      <a href="#about" className={styles.GoDown}><i class="fas fa-chevron-down"></i></a>
    </Jumbotron>
  )
}

export default Hero
