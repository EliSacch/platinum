import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';

import styles from '../../styles/Treatments.module.css'
import { Button, Container, Form, Table } from 'react-bootstrap';
import ModalAddTreatment from './ModalAddTreatment';

function TreatmentsList() {

    const [treatments, setTreatments] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    // To display the treatment modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const { data } = await axiosReq.get(`/treatments/?search${query}`);
                setTreatments(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        fetchTreatments();
    }, [query])

    return (
        <>
            <Container className={styles.SearchWrapper} >
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        placeholder="Search treatment"
                    />
                </Form>
            </Container>
            <Container>
                <Button
                    className={styles.AddNewBtn}
                    onClick={handleShow}
                >
                    Add new treatment
                </Button>
            </Container>
            {hasLoaded ? (

                <Container >
                    {treatments.results.length ? (
                        <Table className={styles.TreatmentsList}>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                            <tbody>

                                {treatments.results.map(treatment => (
                                    <tr key={treatment.id}>
                                        <td>{treatment.title}</td>
                                        <td>{treatment.description}</td>
                                        <td>{treatment.price}€</td>
                                        {treatment.is_active ? <td>Active</td> : <td>Inactive</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>There are no treatments yet</p>
                    )}
                    <ModalAddTreatment show={show} setShow={setShow} query={query} setQuery={setQuery} />
                </Container>
            ) : (
                <Asset spinner />
            )}
        </>
    )
}

export default TreatmentsList
