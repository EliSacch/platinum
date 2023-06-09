import React from 'react'
import Hero from './Hero'
import About from './About'
import Gallery from './Gallery'
import Services from './Services'
import Book from './Book'

import { Container } from 'react-bootstrap'

import styles from '../styles/Home.module.css'



function Home() {
  return (
    <main>
      
      <Hero />
      <Container>
        <div className={styles.AboutWrapper}>
          <Gallery />
          <About />
        </div>
        <Services />
        <Book />
      </Container>

    </main>
  )
}

export default Home

