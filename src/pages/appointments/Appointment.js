import React from 'react';

import styles from '../../styles/Appointment.module.css';
import { Card } from 'react-bootstrap';

const Appointment = (props) => {

    const {
        treatment, date, time, status, notes, appointmentPage,
    } = props

    const displayTime = time / 100 + ":" + (time) % 100 / 50 * 3 + '0'

    return (
        appointmentPage ? (
            <>
            <div className={styles.AppointmentDetail}>
                <h1>{treatment}</h1> 
                {status === "Upcoming" && <span>
                <i className="fas fa-edit"></i>
                <i className="fas fa-trash"></i></span>}
                <hr />
                <p>Date: {date}</p>
                <p>Time: {time}</p>
                {notes && <p>{notes}</p>}
                <hr />
            </div>
            <div className={styles.AppointmentPageHelp}>
                <p>Need help with this appointment?<br />
                Call us or send us an email.</p>
            </div>
            </>
        ) : (
            <>
                <Card className={styles.AppointmentCard} >
                    <Card.Body>
                        <div className={styles.CardHeader}>
                            {treatment && <Card.Title className="text-center">My &nbsp;{treatment}</Card.Title>}

                        </div>

                        {date && time && <Card.Text>{date} at {displayTime} </Card.Text>}

                        {notes && <Card.Text className="text-center">{notes}</Card.Text>}
                    </Card.Body>
                </Card></>
        )
    )
}

export default Appointment
