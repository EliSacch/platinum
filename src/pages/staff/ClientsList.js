import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
// bootstrap
import { Container, Form } from 'react-bootstrap';
// infinite scroll
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';
// custom component
import Asset from '../../components/Asset';
import ModalClientDetail from './ModalClientDetail';
// custom css
import styles from '../../styles/Clients.module.css';


function ClientsList() {

    const [clients, setClients] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    const [clientDetail, setClientDetail] = useState({
        name: "",
        owner: "",
        notes: "",
        appointments_count: 0,
        has_appointments_today: 0,
    })

    const [query, setQuery] = useState("");

    // To display the client detail modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const { data } = await axiosReq.get(`/clients/?search=${query}`);
                setClients(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        fetchClients();
    }, [clientDetail, query, show])

    return (
        <>
        {/* Search bar */}
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
                        className="mr-sm-2"
                        placeholder="Search clients"
                    />
                </Form>
            </Container>

            {/* Client list  */}
            <div className={styles.ClientsList}>
                {hasLoaded ? (
                    <>
                        <InfiniteScroll
                            children={
                                clients.results.length ? (
                                    <ul>
                                        {clients.results.map(client => (
                                            <li key={client.id}
                                                onClick={() => {
                                                    setClientDetail(client);
                                                    handleShow();
                                                }}
                                            >
                                                {client.name ? (
                                                    <>{client.name}&emsp;&#40;&ensp;{client.owner}&ensp;&#41;</>
                                                ) : client.owner}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    // If the clients results lenght is 0
                                    <p>There are no clients yet</p>
                                )
                            }
                            dataLength={clients.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!clients.next}
                            next={() => fetchMoreData(clients, setClients)}
                        />
                        {/* Modal to show the client detail */}
                        <ModalClientDetail
                            {...clientDetail}
                            show={show}
                            setShow={setShow}
                        />
                    </>
                ) : (
                    <Asset spinner />
                )
                }
            </div>
        </>
    )
}

export default ClientsList
