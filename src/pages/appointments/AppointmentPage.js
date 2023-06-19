import React, { useEffect, useState } from 'react'
import styles from '../../styles/AppointmentPage.module.css'
import { useHistory, useParams } from 'react-router-dom'

import { axiosReq } from '../../api/axiosDefaults'
import Appointment from './Appointment';
import Asset from '../../components/Asset';


function AppointmentPage() {
    // To access the URL 'id' parameter
    const {id} = useParams();
    const history = useHistory();

    const [appointment, setAppointment] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const { data } = await axiosReq.get(`/my-appointments/${id}`);
                setAppointment({results: [data]});
                setHasLoaded(true);
            } catch(err) {
                console.log(err);
                history.push("/");
            }
        };
        setHasLoaded(false);
        fetchAppointment();
    }, [id, history]);


  return (
    <section className={styles.OffsetTop}>
      {hasLoaded ? (
        <Appointment {...appointment.results[0]} appointmentPage />
      ) : (
        <Asset spinner />
      )}
    </section>
  )
}

export default AppointmentPage
