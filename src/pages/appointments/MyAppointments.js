import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
// router
import { Link, useHistory } from 'react-router-dom';
// context
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// bootstrap
import { Tab, Tabs } from 'react-bootstrap';
// custom components
import Appointment from './Appointment';
import Asset from '../../components/Asset';
// custom css
import styles from '../../styles/AppointmentPage.module.css';


function MyAppointments() {

    const [appointments, setAppointments] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState("upcoming");

    const currentUser = useCurrentUser();
    const history = useHistory();

    /**
     * This function checks which one is the active tab
     * @param {Tab} tab 
     */
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    /**
     * The appointments are fetched every time the user changes tab
     */
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axiosReq.get("/my-appointments/");
                setAppointments(data);
                setHasLoaded(true)
            } catch (err) {

            }
        }
        setHasLoaded(false);
        fetchAppointments();
    }, [activeTab])

    return (

        // check if the user is logged in
        currentUser ? (
            // What we display if the user is logged in
            <section className={styles.OffsetTop}>
                <Link
                    to="/my-appointments/create/"
                    className={styles.ActionBtn}
                >Make an appointment
                </Link>

                

                <div className={styles.Todays}>
                
                {
                    appointments.results?.filter(
                        // check if there is any result with a status of today
                        res => res.status === "Today"
                    ).length>0 && (
                        appointments.results.filter(
                            // if so, we filter the result to and we display 
                            // only today's result in this section
                            res => res.status === "Today"
                        ).sort(
                            // We sort them to see the closet ones first
                            (a, b) => a.date > b.date ? 1 : -1
                        ).map(appointment => (
                            <>
                            <p>Today's appointments</p>
                            <Link
                                to={`/my-appointments/${appointment.id}/`}
                                key={appointment.id}
                            >
                                <Appointment  {...appointment} />
                            </Link>
                            </>
                            
                        )))
                }
                </div>

                
                < Tabs
                    defaultActiveKey="upcoming"
                    transition={false}
                    className={styles.TabLink}
                    onSelect={handleTabChange}
                >
                    {/* Upcoming apointments tab */}
                    < Tab eventKey="upcoming" title="Upcoming appointments" className={styles.Tab} >
                        {
                            hasLoaded ? (
                                <>
                                    {
                                        appointments.results.filter(
                                            // check if there is any result with a status of upcoming
                                            res => res.status === "Upcoming"
                                        ).length ? (
                                            appointments.results.filter(
                                                // if so, we filter the result to and we display 
                                                // only upcoming result in this tab
                                                res => res.status === "Upcoming"
                                            ).sort(
                                                // We sort them to see the closet ones first
                                                (a, b) => a.date > b.date ? 1 : -1
                                            ).map(appointment => (
                                                // For each appointment we display a clickable element
                                                <Link
                                                    to={`/my-appointments/${appointment.id}/`}
                                                    key={appointment.id}
                                                >
                                                    <Appointment  {...appointment} />
                                                </Link>
                                            ))
                                        ) : (
                                            // message to display if there are no upcoming appointments
                                            <p>There are no upcoming appointments</p>
                                        )
                                    }
                                </>
                            ) : (
                                <Asset spinner />
                            )}
                    </Tab >

                    {/* Past apointments tab */}
                    < Tab eventKey="past" title="Past appointments" className={styles.Tab} >
                        {
                            hasLoaded ? (
                                <>
                                    {
                                        appointments.results.filter(
                                            // check if there is any past appointment
                                            res => res.status === "Past").length ? (
                                            appointments.results.filter(
                                                // if so, we show them here
                                                res => res.status === "Past"
                                            ).sort(
                                                // we show the closest ones first
                                                (a, b) => a.date < b.date ? 1 : -1
                                            ).map(appointment => (
                                                // For each appointment we show a clickable div
                                                <Link
                                                    to={`/my-appointments/${appointment.id}/`}
                                                    key={appointment.id}
                                                >
                                                    <Appointment {...appointment} />
                                                </Link>
                                            ))
                                        ) : (
                                            // Message to display if there are no past appointments
                                            <p>There are no past appointments</p>
                                        )
                                    }
                                </>
                            ) : (
                                <Asset spinner />
                            )}
                    </Tab >
                </Tabs >
            </section >
        ) : (
            // If the user is not logged in we redirect to login page
            history.push("/signin/")
        )
    )
}

export default MyAppointments
