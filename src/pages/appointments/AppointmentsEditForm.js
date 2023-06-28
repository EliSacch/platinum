import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
// router
import { useHistory, useParams } from "react-router-dom";
// custom function to calculate time slots
import calculateTimeSlots from "../../utils/calculateTimeSlots";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
// custom css
import styles from "../../styles/AppointmentsCreateEditForm.module.css";
// custom hook to redirect users based on auth status
import { useRedirect } from "../../hooks/useRedirect";


function AppointmentsEditForm({ message, }) {
    // to redirect user if they try to access this page when logged out
    useRedirect("LoggedOut");

    const [appointmentData, setAppointmentData] = useState({
        treatment: "",
        date: "",
        time: "",
        notes: "",
    });

    const { treatment, date, time, notes } = appointmentData;

    const [errors, setErrors] = useState({});
    const history = useHistory();
    // To get the appointment id from the url
    const { id } = useParams();

    // set treatments choices
    const [treatments, setTreatments] = useState({ results: [] });

    useEffect(() => {
        /**
         * This functions retrieves the active treatments,
         * so that they can be displayed in the form.
         */
        const fetchTreatments = async () => {
            try {
                const { data } = await axiosReq.get('/treatments/');
                setTreatments(data);
            } catch (err) {
                
            }
        };

        const initializeForm = async () => {
            try {
                /**
                 * We try to initialize the form with the appintment data.
                 * But if the user is not the owner,
                 * the user is redirected to the homepage.
                 * 
                 */
                const { data } = await axiosReq.get(`/my-appointments/${id}/`);
                const { treatment, date, time, notes, is_owner } = data;
                is_owner ? setAppointmentData(
                    { treatment, date, time, notes }
                ) : history.push('/');
            } catch (err) {
                history.push("/my-appointments/");
            }
        };
        fetchTreatments();
        initializeForm();

        // These two functions are triggered by a change in history or id
    }, [history, id]);

    /**
     * When the user submits the edit appointment form,
     * the backend validates the data entered.
     * If there are no errors in the form submitted,
     * a new appointment instance is added to the database.
     * @param {submit} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("treatment", treatment);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("notes", notes);

        try {
            await axiosReq.put(`/my-appointments/${id}/`, formData);
            history.push(`/my-appointments/${id}/`);
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    /**
     * Set the handleChange function for controlled form
     * @param {change} event 
     */
    const handleChange = (event) => {
        setAppointmentData({
            ...appointmentData,
            [event.target.name]: event.target.value,
        });
    };


    const textFields = (
        <div className="text-center">
            {/* Treatments is a select form that takes the active treatments as options */}
            <Form.Group className={styles.Input} controlId="treatment">
                <Form.Label className={styles.SelectInputLabel}>Treatment</Form.Label>
                <Form.Control
                    as="select"
                    name="treatment"
                    value={treatment}
                    onChange={handleChange}
                >
                                        {
                        /* We filter the results, to show only the active
                            treatments */
                            treatments.results.filter(
                                res => res.is_active===true
                            ).map((t, i) => (
                                <option
                                    key={i}
                                    value={t.title}>
                                    {t.title}
                                </option>
                                )
                            )
                    }
                </Form.Control>
            </Form.Group>
            {errors.treatment?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Date picker to select the appointment date */}
            <Form.Group className={styles.Input} controlId="date">
                <Form.Label className={styles.SelectInputLabel}>Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.date?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Select form to pick the appointment time.
             Users can select from slots of 30 minutes */}
            <Form.Group className={styles.Input} controlId="time">
                <Form.Label className={styles.SelectInputLabel}>Time</Form.Label>
                <Form.Control
                    as="select"
                    name="time"
                    value={time}
                    onChange={handleChange}
                >
                    {
                        // Get the array of option and display an <option> element for each one
                        calculateTimeSlots(900, 1700, 850).map(option => (
                            <option value={option.value}>{option.label}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
            {errors.time?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Text area input to add notes to the appointment*/}
            <Form.Group controlId="notes" className={styles.Input}>
                <Form.Label className={styles.SelectInputLabel}>Notes</Form.Label>
                <Form.Control
                    as="textarea" rows={5}
                    type="text"
                    placeholder="notes"
                    name="notes"
                    value={notes}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.notes?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            {/* Form action buttons */}
            <Button
                className={styles.FormBtn}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={styles.FormBtn} type="submit">
                Save
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                </Alert>
            ))}
        </div>
    );

    return (
        <section className={styles.OffsetTop}>
            <h1>Edit your appointment</h1>
            {/* If there an active treatment that can be booked online
            we show the form, otherwise the user is told that 
            the online booking is not available and 
            they need to contact us to edit the appointment */}
            {treatments.results.length ? (
                <Form
                    onSubmit={handleSubmit}
                    className={styles.Form}
                >
                    <Container>{textFields}</Container>
                </Form>
            ) : (
                <p>{message}</p>
            )}
        </section>
    );
}

export default AppointmentsEditForm;