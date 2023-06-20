import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import { Link } from 'react-router-dom';

import styles from '../../styles/Clients.module.css'

function ClientsList() {

    const [clients, setClients] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

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
                clients.results.map(client => (
                    <Link to={`/clients/${client.id}`} key={client.id}>
                        {client.name ? (
                        <>{client.name}&emsp;&#40;&ensp;{client.owner}&ensp;&#41;</>
                        ) : client.owner} 
                    </Link>
                ))
            ) : (
                <p>There are no clients yet</p>
            )}
        </div>

    ) : (
        <Asset spinner />
    )
  )
}

export default ClientsList
