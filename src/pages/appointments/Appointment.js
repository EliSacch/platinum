import React, { useState } from 'react';
import { axiosRes } from '../../api/axiosDefaults';
// router
import { useHistory } from 'react-router-dom';
// bootstrap
import { Card } from 'react-bootstrap';
// custom components
import ModalComponent from '../../components/ModalComponent';
// custom css
import styles from '../../styles/Appointment.module.css';
import { useRedirect } from '../../hooks/useRedirect';


const Appointment = (props) => {
    // to redirect the user if already logged in
    useRedirect("loggedOut");

    const {
        id, treatment, date, time, status, notes, appointmentPage
    } = props

    // Convert the time from integer to a human friendly format
    const displayTime = (time - time%100) / 100 + ":" + (time) % 100 / 50 * 3 + '0'

    const history = useHistory();

    // To display the edit modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    /**
     * When users clicks on edit-button,
     * they are redirected to edit page for the current appointment
     */
    const handleEdit = () => {
        history.push(`/my-appointments/${id}/edit`);
    }

    /**
     * If the user confirms that they want to cancel an appointment
     * this function is called and handles the delete functionality
     */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/my-appointments/${id}/`);
            history.goBack();
        } catch (err) {
            
        }
    }

    return (
        appointmentPage ? (
            /* This is the layout if the appointment is visualized
            as a single object from the appointment page */
            <>
                <div className={styles.AppointmentDetail}>
                    <span
                        onClick={() => history.push("/my-appointments")}
                        aria-label="go back"
                    >
                        <i className="fas fa-arrow-left" />
                    </span>
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
                            <i className="fas fa-trash" />
                        </span>
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
                <ModalComponent
                    heading="Cancel Appointment"
                    message="Do you want to cancel this appointment?"
                    setShow={setShow}
                    action={handleDelete}
                    show={show}
                />
            </>
        ) : (
            /* This layout is for when the component is visualized in a list
            of appointments. So each one of them will be displayed a card */
            <>
                <Card className={styles.AppointmentCard} >
                    <Card.Body>
                        <div className={styles.CardHeader}>
                            {treatment && <Card.Title className="text-center">My &nbsp;{treatment}</Card.Title>}
                        </div>
                        {date && time && <Card.Text>{date} at {displayTime} </Card.Text>}
                        {notes && <Card.Text className="text-center">{notes}</Card.Text>}
                    </Card.Body>
                </Card>
            </>
        )
    )
}

export default Appointment
