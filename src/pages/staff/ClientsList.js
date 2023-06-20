import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import ModalClientDetail from '../../components/ModalClientDetail';

import styles from '../../styles/Clients.module.css'

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


    // To display the client detail modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                // This must return clients and not the appointments
                const { data } = await axiosReq.get("/clients");
                setClients(data);

                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        fetchClients();
    }, [])

    return (
        hasLoaded ? (

            <div className={styles.ClientsList}>
                {clients.results.length ? (
                    <ul>
                        {clients.results.map(client => (
                            <li key={client.id}
                                onClick={() => {
                                    setClientDetail(client);
                                    handleShow();
                                    console.log(client)
                                }}
                                >
                                {client.name ? (
                                    <>{client.name}&emsp;&#40;&ensp;{client.owner}&ensp;&#41;</>
                                ) : client.owner}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>There are no clients yet</p>
                )}
                <ModalClientDetail
                {...clientDetail}
                show={show}
                setShow={setShow}
                />
            </div>

        ) : (
            <Asset spinner />
        )
    )
}

export default ClientsList
