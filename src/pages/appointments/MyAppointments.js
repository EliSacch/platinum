import React, { useEffect, useState } from 'react';

import { Tab, Tabs } from 'react-bootstrap';
import Appointment from './Appointment';
import Asset from '../../components/Asset';

import styles from '../../styles/AppointmentPage.module.css';

import { axiosReq } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';

function MyAppointments() {

    const [appointments, setAppointments] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState("upcoming");

    /**
     * This function checks which one is the active tab
     * @param {Tab} tab 
     */
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axiosReq.get("/my-appointments", {
                    params: {
                        filter: '[["status", "=", "Past"]]',
                    }
                });
                setAppointments(data);
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false);
        fetchAppointments();
    }, [activeTab])


    return (
        <section className={styles.OffsetTop}>
            <Link
                to="/my-appointments/create"
                className={styles.ActionBtn}
            >Make an appointment
            </Link>

            <Tabs
                defaultActiveKey="upcoming"
                transition={false}
                className={styles.TabLink}
                onSelect={handleTabChange}
            >
                <Tab eventKey="upcoming" title="Upcoming appointments" className={styles.Tab}>
                    {hasLoaded ? (

                        <>
                            {appointments.results.filter(res => res.status === "Upcoming").length ? (
                                appointments.results.sort(
                                    (a, b) => a.date > b.date ? 1 : -1
                                ).map(appointment => (
                                    <Link
                                        to={`/my-appointments/${appointment.id}`}
                                        key={appointment.id}
                                    >
                                        <Appointment  {...appointment} />
                                    </Link>
                                ))
                            ) : (
                                <p>There are no upcoming appointments</p>
                            )}
                        </>

                    ) : (
                        <Asset spinner />
                    )}
                </Tab>
                <Tab eventKey="past" title="Past appointments" className={styles.Tab}>

                    {hasLoaded ? (

                        <>
                            {appointments.results.filter(res => res.status === "Past").length ? (
                                appointments.results.sort(
                                    (a, b) => a.date < b.date ? 1 : -1
                                ).map(appointment => (
                                    <Link to={`/my-appointments/${appointment.id}`}>
                                        <Appointment key={appointment.id} {...appointment} />
                                    </Link>
                                ))
                            ) : (
                                <p>There are no past appointments</p>
                            )}
                        </>

                    ) : (
                        <Asset spinner />
                    )}
                </Tab>
            </Tabs>
        </section>
    )
}

export default MyAppointments
