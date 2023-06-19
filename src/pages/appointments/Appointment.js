import React, { useState } from 'react';

import styles from '../../styles/Appointment.module.css';
import { Button, Card, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Appointment = (props) => {

    const {
        id, treatment, date, time, status, notes, appointmentPage,
    } = props

    const displayTime = time / 100 + ":" + (time) % 100 / 50 * 3 + '0'

    const history = useHistory();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = () => {
        history.push(`/my-appointments/${id}/edit`);

    }
    return (
        appointmentPage ? (
            <>
                <div className={styles.AppointmentDetail}>
                    <h1>{treatment}</h1>
                    {status === "Upcoming" && <div className={styles.Actions}>
                        <span
                            onClick={handleEdit}
                            aria-label="edit"
                        >
                            <i className="fas fa-edit"
                            />
                        </span>
                        <span
                            onClick={handleShow}
                            aria-label="delete"
                        >
                            <i className="fas fa-trash" /></span>
                    </div>}
                    <hr />
                    <p>Date: {date}</p>
                    <p>Time: {displayTime}</p>
                    {notes && <p>{notes}</p>}
                    <hr />
                </div>
                <div className={styles.AppointmentPageHelp}>
                    <p>Need help with this appointment?<br />
                        Call us or send us an email.</p>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Do you want to delete this appointment?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
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
