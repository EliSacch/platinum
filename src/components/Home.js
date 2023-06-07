import React from 'react'
import Hero from './Hero'
import About from './About'
import Services from './Services'

import { Container } from 'react-bootstrap'



function Home() {
  return (
    <main>
      
      <Hero />
      <Container>
        <About />
        <Services />
        <section>Book</section>
      </Container>

    </main>
  )
}

export default Home

