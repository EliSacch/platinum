import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
// router dom
import { useParams } from 'react-router-dom';
// custom componenents
import Appointment from './Appointment';
import Asset from '../../components/Asset';
// custom css
import styles from '../../styles/AppointmentPage.module.css';
import { useRedirect } from '../../hooks/useRedirect';


function AppointmentPage() {
  // to redirect the user if already logged in
  useRedirect("loggedOut");
  // To access the URL 'id' parameter
  const { id } = useParams();

  const [appointment, setAppointment] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axiosReq.get(`/my-appointments/${id}`);
        setAppointment({ results: [data] });
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchAppointment();
  }, [id]);


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
