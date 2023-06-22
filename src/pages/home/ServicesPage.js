import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/Services.module.css';
import { Card, Container } from 'react-bootstrap';
import Asset from '../../components/Asset';

function ServicesPage() {

    const [treatments, setTreatments] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
        // When the page loads we retrieve the treatments
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get('/treatments');
                setTreatments(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        handleMount();
    }, []);

    return (
        <section className={styles.Section} >
            {hasLoaded ? (
                <Container className={styles.ServicesPageWrapper}>
                    {
                        // Firther the results to display only the active treatments
                        treatments.results.filter(
                            res => res.is_active === true
                        ).map((t, i) => (
                            // Display a card for each treatment
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
                </Container>
            ) : (
                < Asset spinner />
            )
            }
        </section>
    )
}

export default ServicesPage
