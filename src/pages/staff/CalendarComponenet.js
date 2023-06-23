import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
//  react big calendar imports
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
// react big calendar style
import 'react-big-calendar/lib/css/react-big-calendar.css';
// custom css
import styles from '../../styles/CalendarComponent.module.css';
// custom componenets
import Asset from '../../components/Asset';
import ModalAppointmentDetail from './ModalAppointmentDetail';


function CalendarComponenet() {
    // required settings for big-calendar    
    const locales = {
        'en-US': enUS,
    };
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    // convert date and time into readable format
    const convertTime = time => {
        const hour = (time - (time % 100)) / 100;
        const finalH = hour < 10 ? `0${hour}` : `${hour}`;
        const minutes = time % 100 === 0 ? "00" : (time % 100) / 50 * 30;

        return `${finalH}:${minutes}`
    }
    // convert date and time into date format, using the previous function,
    //so that it can be used in the big calendar
    const convertDatetime = (date, time) => {
        // expected format "2022-05-12T08:00:00.000Z"
        const finalTime = convertTime(time);
        return `${date}T${finalTime}:00.000Z`
    }

    // loading status
    const [hasLoaded, setHasLoaded] = useState(false);
    // get the appointments list
    const [myAppointmentsList, setMyAppointmentsList] = useState({ results: [] });
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axiosReq.get(`/appointments/`);
                setMyAppointmentsList(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err)
            }
        }
        setHasLoaded(false);
        fetchAppointments();
    }, [])

    // event list
    const myEventsList = myAppointmentsList.results.map(appointment => (
        {
            appointment: appointment,
            title: appointment.client_name ? appointment.client_name : appointment.owner,
            start: convertDatetime(appointment.date, appointment.time),
            end: convertDatetime(appointment.date, appointment.end_time),
        }
    )
    )

    // To display the appointment detail modal
    const [selectedAppointment, setAppointment] = useState();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <section className={styles.CalendarWrapper}>
            {
                hasLoaded ? (
                    <>
                        <Calendar
                            localizer={localizer}
                            events={myEventsList}
                            startAccessor={(event) => { return new Date(event.start) }}
                            endAccessor={(event) => { return new Date(event.end) }}
                            defaultView='day'
                            min={new Date(2022, 0, 1, 8, 0, 0, 0)}
                            max={new Date(2025, 0, 1, 19, 0, 0, 0)}
                            onSelectEvent={event => {
                                setAppointment(event.appointment);
                                handleShow();
                            }}

                            // to change the style
                            eventPropGetter={
                                (event, start, end, isSelected) => {
                                    let newStyle = {
                                        backgroundColor: "#873E74",
                                        color: "#FAF8FF",
                                        borderRadius: "5px",
                                        border: "none"
                                    };
                                    return {
                                        className: "",
                                        style: newStyle
                                    };
                                }
                            }
                        />

                        {/* Modal to show the appointmentt detail */}
                        <ModalAppointmentDetail
                            {...selectedAppointment}
                            show={show}
                            setShow={setShow}
                            convertTime={convertTime}
                        />
                    </>
                ) : (
                    <Asset spinner />
                )
            }
        </section>
    )
}

export default CalendarComponenet
