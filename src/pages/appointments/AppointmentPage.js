import React, { useEffect, useState } from 'react'
import styles from '../../styles/AppointmentPage.module.css'
import { useParams } from 'react-router-dom'

import { axiosReq } from '../../api/axiosDefaults'
import Appointment from './Appointment';


function AppointmentPage() {
    // To access the URL 'id' parameter
    const {id} = useParams();

    const [appointment, setAppointment] = useState({results: []});

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/my-appointments/${id}`);
                setAppointment({results: [data]});

            } catch(err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);


  return (
    <section className={styles.OffsetTop}>
      <Appointment {...appointment.results[0]} setAppointments={setAppointment} appointmentPage />
    </section>
  )
}

export default AppointmentPage
