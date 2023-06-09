import React from 'react'
import styles from '../styles/Services.module.css'
import { Button, Card, Container } from 'react-bootstrap'

function Services() {
  return (
    <section className={styles.Section}>

        <Container className={styles.ServicesWrapper}>
        <div>
            <h2>Services</h2>
            <p>We offer a wide range of services to give you the opportunity to tranform your hair!</p>
            <p>Discover our treatments, for all types of hair.</p>
            <p>You can book a free hair consultations to get you started! Let one of our experts find the best treatment for you.</p>

            <Button className={styles.ServicesBtn}>See all services</Button>
        </div>
        <div className={styles.HorizontalScroll}>
        <Card className={styles.ServiceCard}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Service Title</Card.Title>
                <Card.Text>
                <p>Service description</p>
                <p>Service price</p>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className={styles.ServiceCard}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Service Title</Card.Title>
                <Card.Text>
                <p>Service description</p>
                <p>Service price</p>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className={styles.ServiceCard}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Service Title</Card.Title>
                <Card.Text>
                <p>Service description</p>
                <p>Service price</p>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className={styles.ServiceCard}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Service Title</Card.Title>
                <Card.Text>
                <p>Service description</p>
                <p>Service price</p>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className={styles.ServiceCard}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Service Title</Card.Title>
                <Card.Text>
                <p>Service description</p>
                <p>Service price</p>
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
        </Container>

    </section>
  )
}

export default Services
