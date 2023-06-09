import React from 'react'
import Hero from './Hero'
import About from './About'
import Gallery from './Gallery'
import Services from './Services'
import Book from './Book'


import styles from '../styles/Home.module.css'



function Home() {
  return (
    <main>
      
      <Hero />
      <div className={styles.AboutWrapper}>
        <Gallery />
        <About />
      </div>
      <Services />
      <Book />

    </main>
  )
}

export default Home

