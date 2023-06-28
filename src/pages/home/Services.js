import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
// router
import { Link } from 'react-router-dom';
// boostrap
import { Card, Container } from 'react-bootstrap';
// custom css
import styles from '../../styles/Services.module.css';

function Services() {

    const [treatments, setTreatments] = useState({ results: [] })

    useEffect(() => {
        // When the component mounts we retrieve the treatments
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get('/treatments/');
                setTreatments(data);
            } catch (err) {
         
            }
        };
        handleMount();
    }, []);

    return (
        <section className={styles.Section} >
            <Container className={styles.ServicesWrapper}>
                <div>
                    <h2>Services</h2>
                    <p>We offer a wide range of services to give you the opportunity to tranform your hair!</p>
                    <p>Discover our treatments, for all types of hair.</p>
                    <p>You can book a free hair consultations to get you started! Let one of our experts find the best treatment for you.</p>

                    <Link
                        to="/services"
                        className={styles.ServicesBtn}>
                        See all Services
                    </Link>
                </div>

                <div className={styles.CardsContainer}>
                    <div className={styles.HorizontalScroll}>
                        {
                            // We filter the treatments to keep only the active ones
                            treatments.results.filter(
                                res => res.is_active === true
                            ).map((t, i) => (
                                // For each treatment we display a card
                                <Card className={styles.ServiceCard} key={i}>
                                    <Card.Img className={styles.ServiceImage} src={t.image} />
                                    <Card.Body className={styles.ServiceBody}>
                                        <Card.Title>{t.title}</Card.Title>
                                        <Card.Text>
                                            {t.description}
                                        </Card.Text>
                                        <Card.Text>
                                            {t.price}€
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                            )}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Services
