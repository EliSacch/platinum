import React, { useEffect, useState } from 'react';

import styles from '../../styles/AppointmentPage.module.css';
import { Tab, Tabs } from 'react-bootstrap';
import Appointment from './Appointment';
import Asset from '../../components/Asset';

import { axiosReq } from '../../api/axiosDefaults';

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

            <Tabs
                defaultActiveKey="upcoming"
                transition={false}
                className="mb-3"
                onSelect={handleTabChange}
            >
                <Tab eventKey="upcoming" title="Upcoming appointments">
                    {hasLoaded ? (

                        <>
                            {appointments.results.filter(res => res.status==="Upcoming").length ? (
                                appointments.results.map(appointment => (
                                    <Appointment key={appointment.id} {...appointment} />
                                ))
                            ) : (
                                <p>There are no upcoming appointments</p>
                            )}
                        </>

                    ) : (
                        <Asset spinner />
                    )}
                </Tab>
                <Tab eventKey="past" title="Past appointments">

                    {hasLoaded ? (

                        <>
                            {appointments.results.filter(res => res.status==="Past").length ? (
                                appointments.results.map(appointment => (
                                    <Appointment key={appointment.id} {...appointment} />
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
