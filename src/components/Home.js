import React from 'react'
import Hero from './Hero'
import About from './About'
import { Container } from 'react-bootstrap'


function Home() {
  return (
    <main>
      
      <Hero />
      <Container>
        <About />
        <section>Services</section>
        <section>Book</section>
      </Container>

    </main>
  )
}

export default Home

