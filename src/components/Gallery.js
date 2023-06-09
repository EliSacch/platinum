import React from 'react'
import { Carousel } from 'react-bootstrap'
import picOne from '../assets/yellow.jpg'
import picTwo from '../assets/cut.jpg'
import picThree from '../assets/bride.jpg'

import styles from '../styles/Gallery.module.css'

function Gallery() {
  return (
    <Carousel className={styles.Gallery}>
      <Carousel.Item>
        <img src={picOne} alt='Blond hair' />

      </Carousel.Item>
      <Carousel.Item>
      <img src={picTwo} alt='Male haircut'  />


      </Carousel.Item>
      <Carousel.Item>
      <img src={picThree} alt='Bride'  />

      </Carousel.Item>
    </Carousel>
  )
}

export default Gallery
