import React, { useEffect, useState } from 'react';
import {axiosReq} from '../../api/axiosDefaults';
import styles from '../../styles/Services.module.css';
import { Card, Container } from 'react-bootstrap';

function ServicesPage() {

    const [treatments, setTreatments] = useState({results: []})

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get('/treatments/');
                setTreatments(data);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, []);
  return (
    <section className={styles.Section} >

        <Container className={styles.ServicesPageWrapper}>

                {treatments.results.map((t, i) => (
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

    </section>
  )
}

export default ServicesPage
