import React from 'react'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import Book from './Book'

import { Container } from 'react-bootstrap'



function Home() {
  return (
    <main>
      
      <Hero />
      <Container>
        <About />
        <Services />
        <Book />
      </Container>

    </main>
  )
}

export default Home

