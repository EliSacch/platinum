import React from 'react'

import styles from '../../styles/Appointment.module.css'
import { Card } from 'react-bootstrap'

const Appointment = (props) => {

    const {
        id, owner, treatment, date, time, status, notes, appointmentPage
    } = props

    const displayTime = time/100 + ":" + (time) % 100/50 *3 + '0'

    return (
        <Card className={styles.AppointmentCard}>
            <Card.Body>
                <div className={styles.CardHeader}>
                    {treatment && <Card.Title className="text-center">My &nbsp;{treatment}</Card.Title>}
                    {appointmentPage && status === "Upcoming" && "..."}
                </div>

                {date && time && <Card.Text>{date} at {displayTime} </Card.Text>}

                {notes && <Card.Text className="text-center">{notes}</Card.Text>}
            </Card.Body>

        </Card>
    )
}

export default Appointment
