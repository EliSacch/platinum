import React from 'react'
import Hero from '../../components/Hero'
import About from '../../components/About'
import Gallery from '../../components/Gallery'
import Services from '../../components/Services'
import Book from '../../components/Book'


import styles from '../../styles/Home.module.css'



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

