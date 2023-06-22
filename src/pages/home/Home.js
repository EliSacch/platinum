import React from 'react'
import Hero from '../../pages/home/Hero'
import About from '../../pages/home/About'
import Gallery from '../../pages/home/Gallery'
import Services from '../../pages/home/Services'
import Book from '../../pages/home/Book'
import styles from '../../styles/Home.module.css'

function Home() {

  return (
    <main>
      <Hero />
      <div className={styles.AboutWrapper}>
        <div className={styles.GalleryPlaceholder}>
          <Gallery />
        </div>
        <About />
      </div>
      <Services />
      <Book />
    </main>
  )
}

export default Home

