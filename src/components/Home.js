import React from 'react'
import Hero from './Hero'
import { Container } from 'react-bootstrap'


function Home() {
  return (
    <main>
      
      <Hero />
      <Container>
      <section>About</section>
      <section>Services</section>
      <section>Book</section>
      </Container>

    </main>
  )
}

export default Home

